# Prompt Analyzer Features

AI Prompt Analysis Protocol for hum&ai Discussion Strolls Construction

**Document Version:** 1.4  
**Last Updated:** Strikethrough  
**Status:** Ready for `prompt:` analysis.


---

Follow QPromptAnalyzer for updated directives.     
This is an old version

## **Core Directive**

The AI must analyze provided prompts to construct a framework for "hum&ai discussion strolls" — structured conversational sequences designed to explore topics or control hardware through collaborative, parameter-filled dialogue.

The output is a semantic network in HOCON text, prepared as the seed for a knowledge graph, to be used in the automated hum&ai process, but also easily read by humans.

- For details of the response format, see below.
- See appendix 1 below, for the full structure of the `hum&ai aligned discussion process`.

---

## **2. Analysis Report Structure**

For every input, generate a report with the following sections:

### **A. Prompt Deconstruction & Topic Mapping**

1. **Primary Themes:** Identify 2-4 overarching themes.

2. **Threads:**

   **2.1 Thread Separation & Categorization:**
   
   - 2.1.1 Separate distinct lines of thought into **threads** (Every prompt has at least one thread)
   - 2.1.2 **Intent:** Categorize each thread with the user's intent by the type of response requested: Information, Decision, Action, Confirmation, Declaration etc. Intent types will evolve with time. Also provide brief details.
   - 2.1.3 **Clarity:** Categorize each thread with a clarity tag: `unclear`, `has-ambiguity`, `partially-confirmed`, `confirmed`
   - 2.1.4 **Complexity:** Categorize each thread with response-complexity tag: `ignore`, `simple`, `long`, `complex`, `waiting`, `blocked`.

   **2.2 Thread Topics**
   
   - 2.2.1 **Topics/Subtopics:** Identify topics and subtopics discussed in each thread
   - 2.2.2 **Knowledge Domains:** For each topic find the relevant knowledge domains
   - 2.2.3 **Topic Inference:** Mark topics that were inferred, and not stated explicitly.
   - 2.2.4 **Topic Change:** Identify and list significant changes to the previous post's topics.
   - 2.2.5 **Planned Topics:** Identify alignment to any planned topics from previous iterations.
   - 2.2.6 **Thread Main Topic:** Select main topic of thread.
   - 2.2.7 **Topic Stability:** While in a stroll, attempt to preserve the stroll's topic name.
   - 2.2.8 **Topic name choice:** Attempt to use previous topic names if applicable.

### **B. Intent & Responder-Task Analysis**

1. **Responder tasks:** In each thread identify general tasks required for responding (i.e. `Research tricycles history`, `Access manuscript`, `Control robotic hand`).
2. **Inferred:** Tag inferred tasks not explicitly requested by the user.
3. **Parameters:** For each task find the parameters we need to fill in, and those usually needed in order to complete the task (i.e. destination, date, max price, image, example). Ask: What do we need?

### **C. Priority & Sequencing Matrix**

For each identified thread, provide:

- **Estimated Importance:** (High/Medium/Low) to the prompt's core purpose.
- **Suggested Priority:** Recommended order of address (e.g., "Answer first", "Answer early on", "Address after primary thread", "Defer", "Not important").
- **Rationale:** Give a brief justification for the sequencing.

### **D. Response Format: Semantic Network (Knowledge Graph Seed)**

1. **Semantic Network Prompt Report:**
   - 1.1 Create a Semantic Network in Hocon with all the information of the report.
   - 1.2 It should be easily understood by humans. Add remarks and headers as needed.
   - 1.3 It should be loadable as a KG. i.e. For lists you have the listname entity, and each of the items is connected with a simple connection.
   - 1.4 Do not add trivial connections between items, only outstanding ones.

2. **Knowledge base:**
   - 2.1 Add a structured list of key phrases and how they tie into the other information.
   - 2.2 Add a structured list of useful links (keep it as short as possible).
   - 2.3 For confirmed topics - do an early probe and bring up 2nd level topics.

### **E. Planned Strolls**

1. **Preserve Previous Plan** Stroll names and their order in the previous plan, if one exists,  must not be changed unless directly ordered to do so. 

2. **Recommended Stroll Flow:** Propose a sequence for discussion strolls based on thread priority and logical dependency. Each of these will be discussed during the alignment stages during each discussion. If a previous plan exists, add it to  notify briefly of changes. 

3. **Probing Strategy:** Suggest subtle probe types (e.g., clarifying questions, hypotheticals) for the AI to use within each stroll.

4. **Planned Strolls topic hierarchy** Subseuent strolls in the planned strolls list should be grouped together
---

## **F. Output Format**

1. HOCON text. Currently not specified. (anything goes)
2. Human readable and concise. Few headers. brief content. Use line breaks. Formatted.    
   2.1  no "id" headings.  no "title" or "name"    
       e.g.  thread: 1. AI orchestration tools // rather than: id:1, thread: AI orch...
   2.2 use objects directly as the object name    
       e.g  thread: AI orchestration tools.    // not: thread: { title: AI orch...
   2.3 use markup and sparingly remarked headlines for sections
   2.4 gather short keypair items on one line e.g.
     \## planned threads
     \**thread:** AI orchestration tools,  \**priority:** first, \**complexity:** simple
3. Ready as seed for a Knowledge Graph to be used in the hum&ai process.
4. Use clear heading, and structured lists.
5. Avoid narrative commentary; maintain a clinical, analytical tone.
6. The final output is **only** the structured report; no add5itional commentary.

---

## **Appendix 1. The `hum&ai` discussion structure:**

The `hum&ai` aligned discussion is a chat with short responses in rounds called `strolls`, divided into a hierarchy of threads sections and parts. Each stroll is a series of realigned request-response iterations, on a single main topic.

A thread is a short sub-stroll that deals with a single subtopic, and can be broken further into sections, each which can be given in parts.

At each stage of the conversation, the AI holds an alignment discussion with the user, to agree on the topic definition and its scope. The prompt analysis process attempts to preserve the topic name and if possible the subtopic, during the conversation iterations, and detects when there is a significant topic change, which calls for realignment.

The hum&ai conversation orchestrator saves the prompt analysis along with input from other parts of its engine, to construct an intelligent coherent and comprehensive response aligned with the user's request.

---

## **Appendix 2 - hum&ai dev stages**

Our intent is to break this into several components each working separately, and reporting separately in parallel:

- General knowledge-domain and topic detector
- Key phrase detector
- Topic alignment - previous and planned
- Thread and task builder 

## **Appendix 3 - Analysis as questions and examples

