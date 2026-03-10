import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readYamlConfig = async (fileName) => {
  const filePath = path.join(__dirname, fileName);
  const contents = await fs.readFile(filePath, 'utf8');
  return parse(contents);
};

export const loadBrainConfig = () => readYamlConfig('brain.config.yaml');
