"use client";

import { Cloud, HardDrive, MemoryStick, Network } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { usePollingResource } from "@/hooks/use-polling-resource";
import type { SystemInfo } from "@/lib/types/status";

function uptimeCalc(uptime: number) {
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);

  return `${hours}h ${minutes}m`;
}

function formatBytes(value: number | undefined, decimals = 0) {
  if (!Number.isFinite(value ?? Number.NaN)) {
    return "Loading...";
  }

  return `${((value ?? 0) / 1_000_000_000).toFixed(decimals)} GB`;
}

function formatUsedBytes(total: number | undefined, available: number | undefined) {
  if (!Number.isFinite(total ?? Number.NaN) || !Number.isFinite(available ?? Number.NaN)) {
    return "Loading...";
  }

  return `${(((total ?? 0) - (available ?? 0)) / 1_000_000_000).toFixed(0)} GB`;
}

function formatUsage(total: number | undefined, available: number | undefined) {
  if (
    !Number.isFinite(total ?? Number.NaN) ||
    !Number.isFinite(available ?? Number.NaN) ||
    !total
  ) {
    return 0;
  }

  return (((total ?? 0) - (available ?? 0)) / total) * 100;
}

async function fetchServerStatus(signal: AbortSignal) {
  const res = await fetch("https://srv.leafmc.cc:8000/api/status", {
    signal,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Status request failed with ${res.status}`);
  }

  return (await res.json()) as SystemInfo;
}

export function ServerStatus() {
  const query = usePollingResource<SystemInfo>(fetchServerStatus, {
    intervalMs: 2000,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:items-start gap-5">
      <div className="w-full md:col-span-3 bg-background rounded-lg border border-border">
        <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
          <Cloud className="size-4" />
          <span className="text-sm font-mono">HOST.md</span>
        </h2>
        <div className="flex flex-col px-5 py-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              OS
            </p>
            <p className="text-right truncate text-ellipsis">
              {query.data?.host.os ?? "Loading..."}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              Hostname
            </p>
            <p className="text-right truncate text-ellipsis">
              {query.data?.host.hostname ?? "Loading..."}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              Uptime
            </p>
            <p className="text-right truncate text-ellipsis">
              {Number.isFinite(query.data?.host.uptime)
                ? uptimeCalc(query.data!.host.uptime)
                : "Loading..."}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-background rounded-lg border border-border">
        <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
          <HardDrive className="size-4" />
          <span className="text-sm font-mono">STORAGE.md</span>
        </h2>
        <div className="flex flex-col px-5 py-3 border-b border-border">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              Total
            </p>
            <p className="text-right truncate text-ellipsis">
              {formatBytes(query.data?.storage["OS"]?.total)}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              Available
            </p>
            <p className="text-right truncate text-ellipsis">
              {formatBytes(query.data?.storage["OS"]?.available)}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              Used
            </p>
            <p className="text-right truncate text-ellipsis">
              {formatUsedBytes(
                query.data?.storage["OS"]?.total,
                query.data?.storage["OS"]?.available,
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-5 pb-3">
          <Progress
            className="mt-3"
            value={formatUsage(
              query.data?.storage["OS"]?.total,
              query.data?.storage["OS"]?.available,
            )}
          />
        </div>
      </div>
      <div className="w-full md:col-span-1 bg-background rounded-lg border border-border">
        <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
          <MemoryStick className="size-4" />
          <span className="text-sm font-mono">MEMORY.md</span>
        </h2>
        <div className="flex flex-col px-5 py-3 border-b border-border">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              Total
            </p>
            <p className="text-right truncate text-ellipsis">
              {formatBytes(query.data?.memory.total)}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              Available
            </p>
            <p className="text-right truncate text-ellipsis">
              {formatBytes(query.data?.memory.available)}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              Used
            </p>
            <p className="text-right truncate text-ellipsis">
              {formatUsedBytes(query.data?.memory.total, query.data?.memory.available)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-5 pb-3">
          <Progress
            className="mt-3"
            value={formatUsage(query.data?.memory.total, query.data?.memory.available)}
          />
        </div>
      </div>
      <div className="w-full md:col-span-1 bg-background rounded-lg border border-border">
        <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
          <Network className="size-4" />
          <span className="text-sm font-mono">NETWORK.md</span>
        </h2>
        <div className="flex flex-col px-5 py-3 border-b border-border">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              DL Total
            </p>
            <p className="text-right truncate text-ellipsis">
              {formatBytes(query.data?.network.rx, 2)}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              UL Total
            </p>
            <p className="text-right truncate text-ellipsis">
              {formatBytes(query.data?.network.tx, 2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
