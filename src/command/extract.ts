import meow from "meow";
import {
  getFeedById,
  getFeeds,
  getFeedsByOperatorId,
  getFeedsBySpec,
  loadDmfr,
  loadSecrets,
} from "@/core/dmfr";
import { extract } from "@/core/extract";
import type { Manifest } from "@/core/type";

export default async function run(argv: string[]) {
  const cli = meow(
    `
    Usage

      $ dmfr-extract extract [options] <path>

    Options

      --secrets             Path to secrets
      --storage             Path to storage directory (default: "out")
      --spec                Extract feeds by spec
      --operator-id         Extract feeds by operator id
      --feed-id             Extract feeds by id
      --[no-]gtfs-rt-parse  Parse GTFS-RT Protocol Buffers into JSON

    Examples

      $ dmfr-extract extract dmfr.json
    `,
    {
      importMeta: import.meta,
      argv,
      flags: {
        secrets: {
          type: "string",
        },
        storage: {
          type: "string",
          default: "out",
        },
        spec: {
          type: "string",
          choices: ["gtfs", "gtfs-rt"],
        },
        operatorId: {
          type: "string",
        },
        feedId: {
          type: "string",
        },
        gtfsRtParse: {
          type: "boolean",
        },
      },
    }
  );

  if (!cli.input[0]) {
    cli.showHelp(0);
    return;
  }

  const dmfr = await loadDmfr({
    path: cli.input[0],
  });

  const { storage, spec, operatorId, feedId, gtfsRtParse } = cli.flags;

  if (spec) {
    dmfr.feeds = getFeedsBySpec({
      dmfr,
      spec,
    });
  }

  if (operatorId) {
    dmfr.feeds = getFeedsByOperatorId({
      dmfr,
      operatorId,
    });
  }

  if (feedId) {
    const feed = getFeedById({
      dmfr,
      feedId,
    });

    dmfr.feeds = feed ? [feed] : [];
  }

  const feeds = getFeeds({
    dmfr,
  });

  const secrets = cli.flags.secrets
    ? await loadSecrets({
        path: cli.flags.secrets,
      })
    : [];

  const manifest: Manifest = {
    feeds: [],
    extracted_at: new Date(),
  };

  for (const feed of feeds) {
    const manifestEntry = await extract({
      feed,
      storage,
      secrets,
      gtfsRtParse,
    });

    manifest.feeds.push(manifestEntry);
  }

  await Bun.write(`${storage}/manifest.json`, JSON.stringify(manifest));
}
