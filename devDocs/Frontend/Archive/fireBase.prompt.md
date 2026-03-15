a tdd bdd/ddd langchain/langgraph memgraph app that does the following;

1. manage mini discussions breaking the input into strolls   
1.1 Stroll - a discussion with one or more user-app iterations on a single main-topic thread of discussion.  
1.2 A stroll's topic may have subtopics and side topics all in a single discussion thread.   
1.3 Branching off from the main topic starts a new stroll.   

***Components:***  Note: in the patent application the knowledge is stored as a knowledge base, there is no need to single out only one possible implementation.   
2. ***Discussion KG*** The discusson Knowledge Graph holds the context of the discussion:   
2.1 Content:  Fields of knowledge, current topic, upcoming topics discussed, links into the chat's text, key phrases, terminology and decisions,   tools used, assosiated topics, and associated stored discussions.   
2.2 Discussion flow: planned strolls with their sections and parts, the current stroll, current section and part, current thread, alignment points with the user.  

2.1 The KG is persisted in Memgraph and stored in Supabase.   

***Analysis modules***  
3 **PromptAnalyzer:** Analyze each input, comparing with the existing kg that holds the past conversaton.   
3.1. **Topic detection:** Checks existing conversation, detecting topic continuation, shift, sidetracking, branching or breaking.   
3.2. **Threads - Content dissection:** Summarizes the main threads of the input, each as a main topic with possible subtopics.  

3.3. **Thread merging:** Merges new threads into existing threads in the discussion kg if they are similar enough, marking changes and additions.  

3.4. For new and changed threads:   
- **Sections and parts - thread dissection:**   
  -- Detect sections - subtopics, give each a number and name.  
  -- For long topics, suggest breaking into parts, and give part number and name.   
  -- Merge into existing sections and parts if similar enough  

3.5 **Thread intent type:** Detect the intent type of each thread: command, comparison, correction, clarification, small-talk, etc.  

3.6 Reorganize the input text into sections according to the detected threads but quote exactly. Bring in relevant context from the discussion kg,   but mark it clearly. 


- **Thread scores:** Score each thread for:   
  -- Clarity - The need for alignment with the user  
  -- Importance to main topic    
  -- Complexity of expected response  
- 
**Thread prioritization:** Prioritize the threads according to the scores and current discussion context:   
  -- ***Fast reply:** Simple threads that can be merged into the next reply  
  -- ***Critical:*** High priority threads that need to be dealt with immediatedly.  
  -- ***Important:*** Alert the user in the next reply, with details deffered..    

  -- ***Organize:*** Merge with the existing planned strolls, modifying the existing plan as needed. Mark changes as suggestions for alignment   with the user.   


- Creates a list of one or more strolls to be discussed according to the threads detected.   
- Merges the planned strolls into the current stroll plan.   
- Outputs a structured HUCON report   

Cthe program has an analysis module that analyzes each input and each output (having self awareness)  and outputs a structured report merging into the discussion kg. There is a knowledge module that looks for previous discussions about the topic and knowledge domain, and loads that. It also notes other possible modules to load and what the params for loading that module would be.    
The response constructor adds to the conversation kg which holds the context - fields of knowledge current topic upcoming topics and already   discussed topics.   
It works with memgraph as the graph db and supabase as the persistent storage.   
The program is implemented in a react native frontend and a nodejs backend. The program is tested with bdd using cucumber and tdd using jest.

there are three types of knowledge bases:  
1. Personas lexicon: Roles and traits, topics and emotions, sources, phrases, preferences, people, and environments.   
2. Experience Lexicons: Long term memory of discussions and associations, by topic and domain.   
3. Knowledge Lexicons: Shared knowledge buildup and approved or verified  

The "brain" backend has the following modules:  
- orchestrator: routes NATS messages and coordinates module flow  
- inAnalyzer: input analysis module  
- outAnalyzer: output analysis module   
- strollAnalyzer: strolls analysis module  
- flowMngr: manages discussion flow/state transitions: creates discussion rounds and moves through them. (threads, strolls, sections and response parts)   
- respondMngr: manages discussion flow, awareness and response building,  and dispatches the response  
- awareMngr: Manages contextual clarity, cohesion, comprehensiveness and appropriate terminology. detects knowledge gaps and ambiguities.  
- alignMngr: Manages probing, active listening, and parameter filling.  
- knowledgeMngr: Manages the shared knowledge buildup and retrieval.  

---

The UI has a text input area for the user to enter their prompt, and a display area to show the AI's response. The UI sends the user's prompt to the backend orchestrator which initeas  NATS messaging to the components.  

---

The main panel shows the ongoing discussion, with a sidebar of the discussion flow in a collapsible directory-tree like interface. which shows the previous, current and planned parts of the discussion.  

Clicking on a topic in the tree brings up the relevant part of the discussion in the main panel.but also sets the state so that when moving to the info  tab, it shows the relevant info for that topic.  

The info tab has two choice buttons on top: "Discussion Context" and "Knowledge".  

The "Discussion Context" view shows a choice of files and tables forms and documents that have been stored by the chat for this particular section of discussion. On top you can choose the topic from a dropdown which shows the current topic and the previous topics tree in the discussion.  

The "Knowledge" view shows a choice of knowledge bases that have been stored by the chat for this particular section of discussion. On top you can choose the topic from a dropdown which shows the current topic and the previous topics tree in the discussion. and you can also choose the knowledge base from a dropdown which shows the different knowledge bases stored for this topic.  

there is a choice of views with three icon buttons on top: "Graph View", "Knowledge map", and "Table view"

The following is a hocon mockup of the discussion kg:

```hocon
// tbd take this from inAnalyzer.md
```

```
prompt_analysis: {
  prompt: [ Hasmonean brothers war example, 2024.07.26_17.25, {link: cht17.p31.6}],
  themes: [ Brother's War history, Greek sources, Herodotus revisited ], 
  knowledge: {
    hasmonean: [ Roman era Jewish history, Roman law, Hasmonean brothers wars ],
    manuscripts: [ Codecology, Philology, Ancient Greek, Roman area manuscripts, 
                   Greek Historions, Herodotos]
   } // ---
   threads: [
    1. Remark about friends health, {
      is: [ clear, Background talk, simple, merge into next topic ],
      topics: [ (Social Rapport) ], 
      status: [done, trivial, {merged: cht17.p31.7}, {ignored: cht17.p31.8}] 
    },  
    2. Brother's War history, {
      is: [ clear, info request, simple (ai result), answer first ],
      topics: [ **Current research**, 
                1.1 Background, 1.1.1 In Judea, 1.1.2 Roman law,  
                1.2 War description, 1.3 Research dispute ] ,
      status: [planned, simple] 
    },
    3. Greek sources including Herodotos, {
      is: [ has-ambiguity, research request, complex (involves ocr),     
                  address after primary thread ], 
      topics: [ **Brothers war research**,  see strolls ],      
      status: [ suggest ], // tasks: after align 
      strolls: [
        3.1 Sum of Greek sources, {
                is: [ clear, info request, complex (multiple sources) ],
                domains: Greek manuscripts
                status: [suggest] ,
                tasks: {
                    flags: [Tentative list], 
                    sequence: [ get sources,  aggregate, cleanup ]}
         },
         3.2 Possible dive in, {
            is: [ clear, study, complex (ai, ocr, eternal tools), needs confirmation ],
            domains: [ hasmonean, manuscripts ],
            status: [ suggest ],
            tasks: {
                    flags: [ **BRANCH!**, Tentative list], 
                    sequence: [
                       Confirm tools, Confirm sources, Aggregate text. 
                       Analyze. Get research docs, 
                       Create thread plan, Execute thread plan]}
         }, 
         3.3 Herodotus revisited, {
               is: [ has-ambiguity, analysis request, complex, needs alignment ]}
]}]}
