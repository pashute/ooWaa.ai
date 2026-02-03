a tdd bdd/ddd langchain/langgraph memgraph app that does the following;

1. manage mini discussions breaking the input into strolls 
1.1 Stroll - a discussion with one or more user-app iterations on a single main-topic thread of discussion.
1.2 A stroll's topic may have subtopics and side topics all in a single discussion thread. 
1.3 Branching off from the main topic starts a new stroll. 

***Components:***  Note: in the patent application the knowledge is stored as a knowledge base, there is no need to single out only one possible implementation. 
2. ***Discussion KG*** The discusson Knowledge Graph holds the context of the discussion: 
2.1 Content:  Fields of knowledge, current topic, upcoming topics discussed, links into the chat's text, key phrases, terminology and decisions, tools used, assosiated topics, and associated stored discussions. 
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

3.6 Reorganize the input text into sections according to the detected threads but quote exactly. Bring in relevant context from the discussion kg, but mark it clearly. 


- **Thread scores:** Score each thread for:
  -- Clarity - The need for alignment with the user
  -- Importance to main topic  
  -- Complexity of expected response
- 
**Thread prioritization:** Prioritize the threads according to the scores and current discussion context: 
  -- ***Fast reply:** Simple threads that can be merged into the next reply
  -- ***Critical:*** High priority threads that need to be dealt with immediatedly.
  -- ***Important:*** Alert the user in the next reply, with details deffered..  

  -- ***Organize:*** Merge with the existing planned strolls, modifying the existing plan as needed. Mark changes as suggestions for alignment with the user. 


- Creates a list of one or more strolls to be discussed according to the threads detected. 
- Merges the planned strolls into the current stroll plan. 
- Outputs a structured HUCON report 

Cthe program has an analysis module that analyzes each input and each output (having self awareness)  and outputs a structured report merging into the discussion kg. There is a knowledge module that looks for previous discussions about the topic and knowledge domain, and loads that. It also notes other possible modules to load and what the params for loading that module would be.  
The response constructor adds to the conversation kg which holds the context - fields of knowledge current topic upcoming topics and already discussed topics. 
It works with 