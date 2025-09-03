import type { Feed, ManifestEntry, Secret } from "@/core/type";
import { getAuth } from "./auth";
import { getFromZip } from "@/core/utils";
import { Buffer } from "node:buffer";

export const extractGtfs = async ({
  feed,
  storage,
  secrets,
}: {
  feed: Feed;
  storage: string;
  secrets: Secret[];
}) => {
  const keys = (["static_current"] as const).filter((key) => feed.urls[key]);

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

      let fileData = Buffer.from(await response.arrayBuffer());
      let filePath = `${feed.id}/${key}.zip`;

      const nested = url.href.split("#")[1];

      if (nested && nested.endsWith(".zip")) {
        fileData = Buffer.from(getFromZip(fileData, nested));
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
