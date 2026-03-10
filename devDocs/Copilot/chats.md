## Issue #20 — devdocs organization and completion

**Version:** 1.1.0  
**Last Updated:** 2026-03-10

Source: https://github.com/pashute/ooWaa.ai/issues/20
Branch: feature/workspace-setup
Date: 2026-02-04

### Instructions (verbatim summary)
1. Read instructions; report anything that needs attendance.
1.1 If permission is needed, write “PERMISSION NEEDED! For #x.y” and ask if unattended permission is possible.
1.2 Copy instructions into this file and track progress here.
2. TechSetup and other setups:
2.1 Delete “Next Steps” section from TechSetup.
2.2 Compare devDocs/PromptAnalyzer.md with devDocs/Backend/archived/PromptAnalyzer.md; update archive, delete DevDocs file.
2.3 Same for QPromptAnalyzer in DevDocs and devDocs/Frontend; update Frontend, then delete DevDocs file. Then delete all .md files from devDocs/ except TechSetup (don’t touch subdirectories yet).
2.4 Compare TechSetup with setup files in devDocs/Frontend and devDocs/Backend; merge into TechSetup.
2.5 Confirm sections now in TechSetup; delete the two front/backend setup .md files.
3. Add version control to all remaining .md files so PRs auto-increment document versions (e.g., 1.3.1 → 1.3.2).
4. DB updates:
4.1 Remove mongo/pinecone/postg from TechSetup.
4.2 Remove mongo/pinecone/postg from all config files.
4.3 Configure Memgraph for real-time data handling.
4.4 Integrate Supabase as persistent data layer.
5. Placeholder code:
5.1 Define React Native placeholder UI; BDD/TDD with Cucumber + Jest.
5.2 Implement NATS test message roundtrip UI ↔ backend; TDD in both directions.
5.2b1 Add orchestrator roundtrip test remark (testSent/testReceived).
5.2b2 Implement backend orchestration test message routing.
5.3 Define mock KG (from QPromptAnalyzer example HOCON), retrieve from Memgraph with LangChain; TDD.
2b3.1 Add components list to devDocs/Backend/features.brain.md.
2b3.2 Add version headers to frontend/backend feature docs.
6. LangGraph state loop: requested → merged → analyzed → responded → requested.
8. Establish CI/CD pipelines using GitHub Actions.
9. Deploy Dockerized build to cloud/prod.

## New tasks (telegraphic)
- Add HOCON parser to TechSetup + project deps.
- Add Cucumber (BDD) test for HOCON parse/validate.
- Add Jest TDD for HOCON parse.
- Add mock tool (Neo4j/Cypher) for KG tests.
- Create mock KG from HOCON via Neo4j/Cypher.
- Find aiTerms.md in git history (restore if found).

### Attendance / permission notes
- PERMISSION NEEDED! For #3: GitHub Action to auto-bump doc versions
- PERMISSION NEEDED! For #4.2/#4.4: Keep "postg" references for Supabase?
- Missing: devDocs/PromptAnalyzer.md, devDocs/Frontend/QPromptAnalyzer.md
- No frontend setup file found

### Progress log
- 2026-02-04: Read issue #20 and captured instructions here.
- 2026-02-04: Identified missing devDocs/PromptAnalyzer.md and missing devDocs/Frontend/QPromptAnalyzer.md.
- 2026-02-04: Prepared to update TechSetup, remove Next Steps, and clean DB mentions.
- 2026-02-04: Updated TechSetup with Memgraph/Supabase, removed Next Steps, removed PostgreSQL/MongoDB mention.
- 2026-02-04: Marked devDocs/QUICKSTART.md and devDocs/chats.md as deprecated (pending deletion).
- 2026-02-04: Marked devDocs/Backend/humandBrainTech.md as deprecated (pending deletion).
- 2026-02-04: Added version headers (1.0.0) to all key .md files.
- 2026-02-04: Created GitHub Action workflow for auto-bumping doc versions on PR updates.
- 2026-02-04: Added neo4j-driver and @supabase/supabase-js to humandBrain dependencies.
- 2026-02-04: Updated .env.example with Memgraph and Supabase configuration.
- 2026-02-04: Added Cucumber to humANDai; created BDD feature + step definitions for placeholder UI.
- 2026-02-04: Created Jest unit tests for App.js (placeholder UI).
- 2026-02-04: Added orchestrator components and test remark to humandBrainFeatures.
- 2026-02-04: Added version headers to frontend/backend feature docs.
- 2026-02-04: Updated markdown references to new features docs in README files.
- 2026-02-04: Added backend module stubs and Cucumber BDD tests for modules and orchestrator flow.
- 2026-02-04: Implemented backend NATS test roundtrip; removed frontend NATS UI/client tests (backend-only).
- 2026-02-04: Added e2e test -> app -> nats -> (msg1) be: orch, fans out to [inAnalyzer, outAnalyzer, flowMngr, respondMngr, awareMngr] and comes back (placeholder test).
- 2026-02-04: Added backend logger BDD (Cucumber) + Jest tests.
- 2026-02-04: Added HOCON parser + mock KG (Neo4j/Cypher) with BDD + Jest tests.
- 2026-03-10: Added e2e-testing-works BDD feature (humANDai): New Chat button → /api/newChat → orchestrator.newChat() throws "Not implemented yet" → 501. All 4 humANDai Cucumber scenarios pass.
- 2026-03-10: Updated comment on newChat stub in App.js, server.js, orchestrator.js: "For testing only. The actual new chat will be defined in the dashboard features."

### Current status
- #1: done
- #1.1: done
- #1.2: done
- #2.1: done
- #2.2: done (archived version already correct)
- #2.3: done (files deleted from DevDocs root)
- #2.4: done (backend setup merged; no frontend setup file found)
- #2.5: done (backend setup file deleted)
- #3: done (version headers added; GitHub Action created)
- #4: done (4.1 done; 4.2 clean; 4.3/4.4 Memgraph/Supabase configured)
- #5.1: done (placeholder UI with BDD/TDD tests)
- #5.2: done (NATS roundtrip test implemented)
- #5.2b1/b2: done (newChat stub in orchestrator + /api/newChat endpoint in server.js)
- #5.3: done (HOCON -> Neo4j/Cypher mock KG)
- #5.4: done (e2e-testing-works: New Chat button → /api/newChat → orchestrator.newChat() → 501 "Not implemented yet"; proves full e2e chain is wired)
- #6/#8/#9: pending


### Run in Release Mode

- `npm run start --workspace=humandBrain`
