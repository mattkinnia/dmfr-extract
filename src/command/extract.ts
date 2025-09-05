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
import consola from "consola";

export default async function run(argv: string[]) {
  const cli = meow(
    `
    Usage

      $ dmfr-extract extract [options] <path>

    Options

      --secrets             Path to secrets
      --storage             Path to storage directory (default: "out")
      --feed-spec           Extract feeds by spec
      --feed-operator-id    Extract feeds by operator id
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
        feedSpec: {
          type: "string",
          choices: ["gtfs", "gtfs-rt"],
        },
        feedOperatorId: {
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

  const { storage, feedSpec, feedOperatorId, feedId, gtfsRtParse } = cli.flags;

  if (feedSpec) {
    dmfr.feeds = getFeedsBySpec({
      dmfr,
      spec: feedSpec,
    });
  }

  if (feedOperatorId) {
    dmfr.feeds = getFeedsByOperatorId({
      dmfr,
      operatorId: feedOperatorId,
    });
  }

  if (feedId) {
    const feed = getFeedById({
      dmfr,
      id: feedId,
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

  consola.start(`Extracting ${feeds.length} feed(s)`);

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

  consola.success("Done");
}
