FROM oven/bun:alpine

RUN apk add --no-cache ca-certificates && update-ca-certificates

WORKDIR /opt/dmfr-extract

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile --production

COPY . .

WORKDIR /data

ENTRYPOINT ["bun", "/opt/dmfr-extract/bin/dmfr-extract"]
