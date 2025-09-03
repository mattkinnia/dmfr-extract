import type { Feed, ManifestEntry, Secret } from "@/core/type";
import { getAuth } from "./auth";
import { transit_realtime } from "gtfs-realtime-bindings";

export const extractGtfsRt = async ({
  feed,
  storage,
  secrets,
  parse,
}: {
  feed: Feed;
  storage: string;
  secrets: Secret[];
  parse?: boolean;
}) => {
  const keys = (
    [
      "realtime_alerts",
      "realtime_trip_updates",
      "realtime_vehicle_positions",
    ] as const
  ).filter((key) => feed.urls[key]);

  const manifestEntry: ManifestEntry = {
    id: feed.id,
    urls: {},
  };

  for (const key of keys) {
    try {
      const { url, headers } = getAuth({
        feed,
        feedUrl: new URL(feed.urls[key]!),
        secrets,
      });

      const response = await fetch(url, {
        headers,
      });

      if (!response.ok) {
        manifestEntry.urls[key] = {
          error_code: response.status,
          error_text: response.statusText,
        };
        continue;
      }

      let fileData: string | ArrayBuffer = await response.arrayBuffer();
      let filePath: string = `${feed.id}/${key}.pb`;

      if (parse) {
        const json = transit_realtime.FeedMessage.decode(
          new Uint8Array(fileData)
        ).toJSON();

        fileData = JSON.stringify(json);
        filePath = `${feed.id}/${key}.json`;
      }

      const fileHash = new Bun.CryptoHasher("sha256")
        .update(fileData)
        .digest("hex");

      await Bun.write(`${storage}/${filePath}`, fileData);

      manifestEntry.urls[key] = {
        file_path: filePath,
        file_hash: fileHash,
      };
    } catch (error: any) {
      manifestEntry.urls[key] = {
        error_text: error?.message ?? "Error",
      };
      continue;
    }
  }

  return manifestEntry;
};
