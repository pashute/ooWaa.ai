// Deprecated: NATS is backend-only. This client is intentionally unused.
export function sendTestMessage() {
  throw new Error('NATS is backend-only. Use backend NATS tests.');
}
