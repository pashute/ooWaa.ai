export function inAnalyzer(message) {
  return {
    module: 'inAnalyzer',
    status: 'ok',
    input: message,
  };
}
