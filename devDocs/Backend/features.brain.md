**Version:** 1.0.0  
**Last Updated:** 2026-02-04

# humandBrain Features

## Components
## Comprehension bases: 
- ***Personas lexicon:*** Roles and traits, topics and emotions, sources, phrases, preferences, people, and environments. 

- ***Experience Lexicons:*** Long term memory of discussions and associations, by topic and domain. 

- ***Knowledge Lexicons:*** Shared knowledge buildup and approved or verified terminology and logic. 


## Functional modules
- **api/server**: thin Express HTTP gateway (`POST /api/message`) — receives frontend requests and dispatches to orchestrator
- **orchestrator**: routes NATS messages and coordinates module flow

- **inAnalyzer**: input analysis module
- **outAnalyzer**: output analysis module
- **strollAnalyzer**: strolls analysis module

- **flowMngr**: manages discussion flow/state transitions: creates discussion rounds and moves through them. (threads, strolls, sections and response parts) 
Note: 
// Todo: Future: also request parts. 

- **respondMngr**: manages discussion flow, awareness and response building,  and dispatches the respons

- **awareMngr**: Manages contextual clarity, cohesion, comprehnsiveness and appropriate terminology. 
detects knowledge gaps and ambiguities. 

- **alignMngr**: Manages probing, active listening, and parameter filling. 

**knowledgeMngr:** Manages the shared knowledge buildup and retrieval. 


## Test Remarks
1. Logger initial test: (placeholder): This is the first test to be run. 

2. NATS initial test: UI sends `testSent` via `POST /api/message`; gateway calls orchestrator which forwards to all modules; responses aggregated into `testReceived` back to UI.
3. API gateway test (`tests/api/`): Supertest hits `POST /api/message`, verifies 200 + `testReceived` type.
4. NATS messaging test (`tests/messages/`): mocked NATS roundtrip via `sendTestMessage`; live roundtrip skipped unless `NATS_SERVER` env is set.