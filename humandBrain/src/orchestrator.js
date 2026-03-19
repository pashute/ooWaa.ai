import { inAnalyzer } from './modules/inAnalyzer.js';
import { outAnalyzer } from './modules/outAnalyzer.js';
import { flowMngr } from './modules/flowMngr.js';
import { respondMngr } from './modules/respondMngr.js';
import { awareMngr } from './modules/awareMngr.js';
import { strollAnalyzer } from './modules/strollAnalyzer.js';
import { alignMngr } from './modules/alignMngr.js';
import { knowledgeMngr } from './modules/knowledgeMngr.js';

// Todo: For testing only. The actual new chat will be defined in the dashboard features
export function newChat() {
  throw new Error('Not implemented yet');
}

export function orchestrateTestMessage(message) {
  const results = [
    inAnalyzer(message),
    outAnalyzer(message),
    flowMngr(message),
    strollAnalyzer(message),
    respondMngr(message),
    awareMngr(message),
    alignMngr(message),
    knowledgeMngr(message),
  ];

  return {
    type: 'testReceived',
    original: message,
    results,
  };
}
