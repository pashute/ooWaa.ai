export function buildMockCypher(parsed) {
  const promptAnalysis = parsed.prompt_analysis || parsed;
  const themes = promptAnalysis.themes || [];
  const promptItems = promptAnalysis.prompt || [];

  const statements = [];
  statements.push('MERGE (p:Prompt {name: "mock"})');

  promptItems.forEach((item, index) => {
    const value = typeof item === 'string' ? item : JSON.stringify(item);
    statements.push(
      `MERGE (pi:PromptItem {name: ${JSON.stringify(value)}})`
    );
    statements.push('MATCH (p:Prompt {name: "mock"}), (pi:PromptItem {name: ' + JSON.stringify(value) + '}) MERGE (p)-[:HAS_ITEM]->(pi)');
  });

  themes.forEach((theme) => {
    statements.push(
      `MERGE (t:Theme {name: ${JSON.stringify(theme)}})`
    );
    statements.push('MATCH (p:Prompt {name: "mock"}), (t:Theme {name: ' + JSON.stringify(theme) + '}) MERGE (p)-[:HAS_THEME]->(t)');
  });

  return statements;
}
