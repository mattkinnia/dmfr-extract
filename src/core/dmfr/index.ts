import type { Dmfr, Feed, Secret, Spec } from "@/core/type";
import { loadJsonFromFile } from "@/core/utils";

export const loadDmfr = ({ path }: { path: string }) =>
  loadJsonFromFile<Dmfr>(path);

export const loadSecrets = ({ path }: { path: string }) =>
  loadJsonFromFile<Secret[]>(path);

export const getFeeds = ({ dmfr }: { dmfr: Dmfr }) => {
  return dmfr.feeds ?? [];
};

export const getFeedById = ({ dmfr, id }: { dmfr: Dmfr; id: string }) => {
  return getFeeds({ dmfr }).find((feed) => {
    return feed.id === id || feed.supersedes_ids?.includes(id);
  });
};

export const getFeedsBySpec = ({
  dmfr,
  spec,
}: {
  dmfr: Dmfr;
  spec: Spec | string;
}) => {
  return getFeeds({ dmfr }).filter((feed) => {
    return feed.spec === spec;
  });
};

export const getOperators = ({ dmfr }: { dmfr: Dmfr }) => {
  const rootOperators = dmfr.operators ?? [];
  const feedOperators = getFeeds({ dmfr }).flatMap((f) =>
    (f.operators ?? []).map((o) => {
      return {
        ...o,
        associated_feeds: [
          ...(o.associated_feeds ?? []),
          {
            feed_onestop_id: f.id,
          },
        ],
      };
    })
  );

  const merged = [...rootOperators, ...feedOperators];
  const unique = new Map(merged.map((o) => [o.onestop_id, o]));

  return Array.from(unique.values());
};

export const getOperatorById = ({
  dmfr,
  operatorId,
}: {
  dmfr: Dmfr;
  operatorId: string;
}) => {
  return getOperators({ dmfr }).find((operator) => {
    return (
      operator.onestop_id === operatorId ||
      operator.supersedes_ids?.includes(operatorId)
    );
  });
};

export const getFeedsByOperatorId = ({
  dmfr,
  operatorId,
}: {
  dmfr: Dmfr;
  operatorId: string;
}) => {
  const operator = getOperatorById({
    dmfr,
    operatorId,
  });

  if (!operator) {
    return [];
  }

  const feedIds =
    operator.associated_feeds?.flatMap((f) =>
      f.feed_onestop_id ? [f.feed_onestop_id] : []
    ) ?? [];

  const feeds: Feed[] = [];

  for (const feedId of feedIds) {
    const feed = getFeedById({
      dmfr,
      id: feedId,
    });

    if (!feed) {
      continue;
    }

    feeds.push(feed);
  }

  return feeds;
};
