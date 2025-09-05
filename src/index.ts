import meow from "meow";
import extract from "@/command/extract";

const cli = meow(
  `
  Usage

    $ dmfr-extract <command>
  `,
  {
    importMeta: import.meta,
  }
);

const rawArgv = process.argv.slice(2);
const command = rawArgv[0];

switch (command) {
  case "extract":
    await extract(rawArgv.slice(1));
    break;

  default:
    cli.showHelp(0);
    break;
}
