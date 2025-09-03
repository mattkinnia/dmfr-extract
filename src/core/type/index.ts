export * from "@/core/dmfr/json-schema/dmfr.schema-v0.6.0";

export interface Secret {
  feed_id: string;
  feed_secret: string;
}

export interface ManifestEntry {
  id: string;
  urls: {
    [key: string]:
      | {
          file_path?: string;
          file_hash?: string;
        }
      | {
          error_code?: number;
          error_text?: string;
        };
  };
}

export interface Manifest {
  feeds: ManifestEntry[];
  extracted_at: Date;
}
