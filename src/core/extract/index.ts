import { type Feed, type Secret } from "@/core/type";
import { extractGtfs } from "./gtfs";
import { extractGtfsRt } from "./gtfs-rt";

export async function extract({
  feed,
  storage,
  secrets,
  gtfsRtParse,
}: {
  feed: Feed;
  storage: string;
  secrets: Secret[];
  gtfsRtParse?: boolean;
}) {
  switch (feed.spec) {
    case "gtfs": {
      return extractGtfs({
        feed,
        storage,
        secrets,
      });
    }
    case "gtfs-rt": {
      return extractGtfsRt({
        feed,
        storage,
        secrets,
        parse: gtfsRtParse,
      });
    }
    default: {
      return { id: feed.id, urls: {} };
    }
  }
}
