"use client";

import { Activity, EthernetPort, Link2, Milestone, type LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

import { usePollingResource } from "@/hooks/use-polling-resource";
import type {
  MinecraftServerOnlineStatus,
  MinecraftServerStatusResponse,
} from "@/lib/types/mcsrvstat";
import { cn } from "@/lib/utils";

export function ServerResponseItem(props: {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  content: string;
  leftClassName?: string;
  rightClassName?: string;
}) {
  return (
    <>
      <div
        className={cn(
          "w-full px-4 py-2 gap-3 flex items-center",
          props.leftClassName,
        )}
      >
        <props.icon className="size-4" />
        <p className="text-sm">{props.title}</p>
      </div>
      <div
        className={cn(
          "w-full px-4 py-2 flex items-center",
          props.rightClassName,
        )}
      >
        <p className="text-sm">{props.content}</p>
      </div>
    </>
  );
}

async function getMinecraftServerStatus(signal: AbortSignal) {
  const data = await fetch("https://api.mcsrvstat.us/3/leafmc.cc", {
    signal,
    cache: "no-store",
  });

  if (!data.ok) {
    throw new Error(`Minecraft status request failed with ${data.status}`);
  }

  return (await data.json()) as MinecraftServerStatusResponse;
}

export function MinecraftServer() {
  const query = usePollingResource<MinecraftServerStatusResponse>(
    getMinecraftServerStatus,
    {
      intervalMs: 10 * 60 * 1000,
    },
  );

  const isOnline = query.data?.online ?? false;

  return (
    <div className="grid grid-cols-1">
      <div className="p-5 pt-3 group/server">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-primary font-bold dark:font-semibold flex items-center gap-3">
            <Activity className="size-5 text-cyan-500" />
            <span className="transition-colors duration-300">LeafMC Server</span>
          </h3>
        </div>
        <div className="grid grid-cols-2 rounded-md border border-border overflow-clip bg-background transition-colors duration-500">
          <ServerResponseItem
            icon={Link2}
            leftClassName="bg-muted/10 border-r border-b border-border"
            rightClassName="border-b border-border"
            title="Hostname"
            content={query.data?.hostname ?? "Loading..."}
          />
          <ServerResponseItem
            icon={EthernetPort}
            leftClassName="bg-muted/10 border-r border-b border-border"
            rightClassName="border-b border-border"
            title="Port"
            content={query.data?.port?.toString() ?? "Loading..."}
          />
          <ServerResponseItem
            icon={Milestone}
            leftClassName="bg-muted/10 border-r md:border-b-0 border-border"
            rightClassName=""
            title="Version"
            content={
              isOnline
                ? (query.data as MinecraftServerOnlineStatus).version
                : query.isLoading
                  ? "Loading..."
                  : "Offline"
            }
          />
        </div>
      </div>
    </div>
  );
}
