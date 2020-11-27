import dotEnv from 'dotenv';
import fs from 'fs';
import os from 'os';

/**
 * Key=Value配置
 */
const INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;

export default function dotEnvReplace(args: string[], filePath?: string, encoding?: BufferEncoding | null) {
  filePath = filePath || '.env';
  if (!fs.existsSync(filePath)) {
    console.log('.env not found!');
    return;
  }
  if (!args || args.length <= 0) {
    console.log('Nothing to do!');
    return;
  }
  const keyValues: {key: string, value: string}[] = [];
  for (const arg of args) {
    if (arg && INI_KEY_VAL.test(arg)) {
      const kv = arg.split('=');
      const value = arg.slice(kv[0].length + 1, arg.length).trim();
      keyValues.push({key: kv[0].trim(), value});
    }
  }
  if (keyValues.length <= 0) {
    console.log('Nothing to do!');
    return;
  }
  const parsed = dotEnv.parse(fs.readFileSync(filePath, { encoding: encoding }))

  keyValues.map((row) => {
    if (parsed[row.key]) {
      parsed[row.key] =  row.value;
    }
  });

  saveConfigToFile(parsed, filePath);
}

function saveConfigToFile(config: {[index: string]: string}, filePath: string) {
  let data = '';
  Object.keys(config).forEach(function (key) {
    data += key + '=' + config[key] + os.EOL;
  });
  fs.writeFileSync(filePath, data);
  console.log('env replace success!');
}