"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface PollingOptions {
  intervalMs: number;
  enabled?: boolean;
}

interface PollingState<T> {
  data: T | undefined;
  error: Error | null;
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
}

export function usePollingResource<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  { intervalMs, enabled = true }: PollingOptions,
): PollingState<T> {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const controllerRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);
  const hasLoadedRef = useRef(false);
  const isFetchingRef = useRef(false);

  const run = useCallback(
    async ({ background = false }: { background?: boolean } = {}) => {
      if (background && isFetchingRef.current) {
        return;
      }

      const nextRequestId = requestIdRef.current + 1;
      requestIdRef.current = nextRequestId;

      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      if (!background && !hasLoadedRef.current) {
        setIsLoading(true);
      }

      isFetchingRef.current = true;
      setIsFetching(true);

      try {
        const nextData = await fetcher(controller.signal);

        if (controller.signal.aborted || requestIdRef.current !== nextRequestId) {
          return;
        }

        setData(nextData);
        setError(null);
        hasLoadedRef.current = true;
      } catch (cause) {
        if (controller.signal.aborted || requestIdRef.current !== nextRequestId) {
          return;
        }

        const nextError =
          cause instanceof Error ? cause : new Error("Request failed");
        setError(nextError);
      } finally {
        if (requestIdRef.current === nextRequestId) {
          setIsLoading(false);
          setIsFetching(false);
          isFetchingRef.current = false;

          if (controllerRef.current === controller) {
            controllerRef.current = null;
          }
        }
      }
    },
    [fetcher],
  );

  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      return;
    }

    let intervalId: number | undefined;

    const startPolling = () => {
      if (intervalMs <= 0) return;

      intervalId = window.setInterval(() => {
        if (document.visibilityState !== "visible") {
          return;
        }

        void run({ background: true });
      }, intervalMs);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void run({ background: true });

        if (!intervalId) {
          startPolling();
        }

        return;
      }

      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }
    };

    void run();
    startPolling();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }

      document.removeEventListener("visibilitychange", handleVisibilityChange);
      controllerRef.current?.abort();
      controllerRef.current = null;
      isFetchingRef.current = false;
    };
  }, [enabled, intervalMs, run]);

  return {
    data,
    error,
    isLoading,
    isFetching,
    refetch: () => void run({ background: false }),
  };
}
