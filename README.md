# dmfr-extract

A small command-line utility for extracting [GTFS](https://gtfs.org) feeds described by a [Distributed Mobility Feed Registry (DMFR)](https://github.com/transitland/distributed-mobility-feed-registry) to your local file system or S3-compatible storage.

## Installation

Using Bun:

```bash
bun install

bun ./bin/dmfr-extract extract dmfr.json
```

Using Docker:

```bash
docker build -t dmfr-extract:latest .

docker run --rm \
  -v "$(pwd)":/data \
  dmfr-extract:latest \
  extract /data/dmfr.json
```

## Build

Build a standalone binary with Bun:

```bash
bun run build
```

This produces a single executable at `dist/dmfr-extract`.

Run the compiled binary directly:

```bash
./dist/dmfr-extract extract dmfr.json
```

## CLI Usage

### `extract`

```bash
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
```

## DMFR

You can author your own DMFR using the [DMFR schema](https://dmfr.transit.land/json-schema/dmfr.schema.json).

Below is a minimal example:

```jsonc
// dmfr.json
{
  "$schema": "https://dmfr.transit.land/json-schema/dmfr.schema-v0.6.0.json",
  "feeds": [
    {
      "spec": "gtfs",
      "id": "f-example~01",
      "urls": {
        "static_current": "http://example.com/gtfs.zip"
      }
    },
    {
      "spec": "gtfs-rt",
      "id": "f-example~01~rt",
      "urls": {
        "realtime_vehicle_positions": "http://api.example.com/v1/realtime_vehicle_positions",
        "realtime_trip_updates": "http://api.example.com/v1/realtime_trip_updates",
        "realtime_alerts": "http://api.example.com/v1/realtime_alerts"
      },
      "authorization": {
        "type": "header",
        "param_name": "X-Api-Key"
      }
    }
  ],
  "operators": [
    {
      "onestop_id": "o-example~01",
      "name": "Example Operator",
      "associated_feeds": [
        { "feed_onestop_id": "f-example~01" },
        { "feed_onestop_id": "f-example~01~rt" }
      ]
    }
  ]
}
```

## Secrets

Some feeds require authentication. Provide a secrets file with the `--secrets` flag.

Below is a minimal example:

```jsonc
// secrets.json
[
  {
    "feed_id": "f-example~01~rt",
    "feed_secret": "secret-value"
  }
]
```

## Output

Files are written under `--storage` (default `out`).

Below is a minimal example:

```text
out/
  f-example~01/
    static_current.zip
  f-example~01~rt/
    realtime_vehicle_positions.pb
    realtime_trip_updates.pb
    realtime_alerts.pb
  manifest.json
```

```jsonc
// out/manifest.json
{
  "feeds": [
    {
      "id": "f-example~01",
      "urls": {
        "static_current": {
          "file_path": "f-example~01/static_current.zip",
          "file_hash": "e3b0c442..."
        }
      }
    },
    {
      "id": "f-example~01~rt",
      "urls": {
        "realtime_vehicle_positions": {
          "file_path": "f-example~01~rt/realtime_vehicle_positions.pb",
          "file_hash": "e3b0c442..."
        },
        "realtime_trip_updates": {
          "file_path": "f-example~01~rt/realtime_trip_updates.pb",
          "file_hash": "e3b0c442..."
        },
        "realtime_alerts": {
          "file_path": "f-example~01~rt/realtime_alerts.pb",
          "file_hash": "e3b0c442..."
        }
      }
    }
  ],
  "extracted_at": "YYYY-MM-DDTHH:MM:SSZ"
}
```

## S3-compatible storage

Path arguments accept the `s3://` protocol. Configure the standard S3 variables in your environment:

- `S3_ACCESS_KEY_ID`
- `S3_SECRET_ACCESS_KEY`
- `S3_REGION`
- `S3_ENDPOINT` (e.g. for providers like MinIO or Cloudflare R2)
- `S3_BUCKET`
- `S3_SESSION_TOKEN`

## Related

- [Distributed Mobility Feed Registry (DMFR)](https://github.com/transitland/distributed-mobility-feed-registry): Guidelines for publishing machine‑readable lists of transit feeds.

- [Transitland Atlas](https://github.com/transitland/transitland-atlas): Open catalog of transit data feeds and operators.
