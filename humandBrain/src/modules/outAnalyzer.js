export function outAnalyzer(message) {
  return {
    module: 'outAnalyzer',
    status: 'ok',
    input: message,
  };
}
