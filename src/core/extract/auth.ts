import { Type, type Feed, type Secret } from "@/core/type";

export const getFeedSecret = ({
  feed,
  secrets,
}: {
  feed: Feed;
  secrets: Secret[];
}) => {
  const param = feed.authorization?.param_name;
  const value = secrets.find((s) => s.feed_id === feed.id)?.feed_secret;

  return {
    param,
    value,
  };
};

export const getHeaderAuth = ({
  feed,
  feedUrl,
  secrets,
}: {
  feed: Feed;
  feedUrl: URL;
  secrets: Secret[];
}) => {
  const headers = new Headers();

  const secret = getFeedSecret({
    feed,
    secrets,
  });

  if (secret.param && secret.value) {
    headers.set(secret.param, secret.value);
  }

  return { url: feedUrl, headers };
};

export const getBasicAuth = ({
  feed,
  feedUrl,
  secrets,
}: {
  feed: Feed;
  feedUrl: URL;
  secrets: Secret[];
}) => {
  const headers = new Headers();

  const secret = getFeedSecret({
    feed,
    secrets,
  });

  if (secret.value) {
    headers.set("Authorization", `Basic ${secret.value}`);
  }

  return { url: feedUrl, headers };
};

export const getQueryParamAuth = ({
  feed,
  feedUrl,
  secrets,
}: {
  feed: Feed;
  feedUrl: URL;
  secrets: Secret[];
}) => {
  const headers = new Headers();

  const secret = getFeedSecret({
    feed,
    secrets,
  });

  if (secret.param && secret.value) {
    feedUrl.searchParams.set(secret.param, secret.value);
  }

  return { url: feedUrl, headers };
};

export const getPathSegmentAuth = ({
  feed,
  feedUrl,
  secrets,
}: {
  feed: Feed;
  feedUrl: URL;
  secrets: Secret[];
}) => {
  const headers = new Headers();

  const secret = getFeedSecret({
    feed,
    secrets,
  });

  if (secret.param && secret.value) {
    feedUrl.pathname = feedUrl.pathname.replace(
      encodeURIComponent(secret.param),
      encodeURIComponent(secret.value)
    );
  }

  return { url: feedUrl, headers };
};

export const getReplaceUrlAuth = ({
  feed,
  feedUrl,
  secrets,
}: {
  feed: Feed;
  feedUrl: URL;
  secrets: Secret[];
}) => {
  const headers = new Headers();

  const secret = getFeedSecret({
    feed,
    secrets,
  });

  if (secret.value) {
    feedUrl.href = new URL(secret.value).href;
  }

  return { url: feedUrl, headers };
};

export const getAuth = ({
  feed,
  feedUrl,
  secrets,
}: {
  feed: Feed;
  feedUrl: URL;
  secrets: Secret[];
}) => {
  switch (feed.authorization?.type) {
    case Type.Header:
      return getHeaderAuth({
        feed,
        feedUrl,
        secrets,
      });

    case Type.BasicAuth:
      return getBasicAuth({
        feed,
        feedUrl,
        secrets,
      });

    case Type.QueryParam:
      return getQueryParamAuth({
        feed,
        feedUrl,
        secrets,
      });

    case Type.PathSegment:
      return getPathSegmentAuth({
        feed,
        feedUrl,
        secrets,
      });

    case Type.ReplaceURL:
      return getReplaceUrlAuth({
        feed,
        feedUrl,
        secrets,
      });

    default:
      return { url: feedUrl, headers: new Headers() };
  }
};
