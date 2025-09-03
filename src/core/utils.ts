import { unzipSync } from "fflate";

export const loadJsonFromFile = async <T = unknown>(file: string) => {
  // Bun.file has built-in support for s3://
  return (await Bun.file(file).json()) as T;
};

export const getFromZip = (
  source: ArrayBuffer | Uint8Array,
  target: string
) => {
  const bytes = source instanceof Uint8Array ? source : new Uint8Array(source);
  const files = unzipSync(bytes);

  const file = files[target];

  if (!file) {
    throw new Error(`'${target}' not found in zip`);
  }

  return file;
};
