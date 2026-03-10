import { extractHoconFromMarkdown, parseHocon, loadMockHoconFromInAnalyzer } from '../src/kg/hoconMock.js';
import fs from 'fs';
import path from 'path';

describe('HOCON mock parser', () => {
  it('extracts HOCON block from inAnalyzer.md', () => {
    const markdown = fs.readFileSync(
      path.resolve(process.cwd(), '..', 'DevDocs', 'Backend', 'inAnalyzer.md'),
      'utf-8'
    );
    const hoconText = extractHoconFromMarkdown(markdown);
    expect(hoconText).toContain('prompt_analysis');
  });

  it('parses HOCON into JSON', () => {
    const parsed = loadMockHoconFromInAnalyzer();
    expect(parsed.prompt_analysis.themes.length).toBeGreaterThan(0);
  });

  it('parses raw HOCON text', () => {
    const parsed = parseHocon('foo: "bar"');
    expect(parsed.foo).toBe('bar');
  });
});
