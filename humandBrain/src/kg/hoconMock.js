import fs from 'fs';
import path from 'path';
import parseHoconText from 'hocon-parser';

export function extractHoconFromMarkdown(markdown) {
  const match = markdown.match(/```hocon\n([\s\S]*?)\n```/);
  if (!match) {
    throw new Error('No HOCON block found in markdown');
  }
  return match[1];
}

export function parseHocon(hoconText) {
  return parseHoconText(hoconText);
}

export function loadMockHoconFromInAnalyzer() {
  const filePath = path.resolve(
    process.cwd(),
    '..',
    'devDocs',
    'Backend',
    'inAnalyzer.md'
  );
  const markdown = fs.readFileSync(filePath, 'utf-8');
  const hoconText = extractHoconFromMarkdown(markdown);
  return parseHocon(hoconText);
}
