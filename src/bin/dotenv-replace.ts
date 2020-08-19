#!/usr/bin/env node
import dotEnvReplace from '../index';
import yargs from 'yargs';
const options = yargs
  .usage('Usage: $0 -f <file> -e <encoding> key1=value1 key2=value2')
  .option("f", { alias: "file", describe: ".env file path", type: "string", demandOption: false })
  .option("e", { alias: "encoding", describe: "file encoding", type: "string", demandOption: false })
  .argv;

dotEnvReplace(process.argv.slice(2), options.f, options.e as any);