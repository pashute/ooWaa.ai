import express from 'express';
import { orchestrateTestMessage, newChat } from '../orchestrator.js';

const app = express();
app.use(express.json());

// Todo: For testing only. The actual new chat will be defined in the dashboard features
app.post('/api/newChat', (_req, res) => {
  try {
    newChat();
  } catch (err) {
    res.status(501).json({ error: err.message });
  }
});

app.post('/api/message', (req, res) => {
  const result = orchestrateTestMessage(req.body.message);
  res.json(result);
});

export { app };

export function startServer(port = 3000) {
  return app.listen(port, () => {
    console.log(`humandBrain API gateway listening on port ${port}`);
  });
}
