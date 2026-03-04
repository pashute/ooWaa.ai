**Filename:** DevDocs/AiTerms.md  
**Version:** 2.0.0  
**Last Updated:** 2026-02-05

# **AI Buzzwords, Terms and Tools**

## **Table of Contents**

1. Core Model Architectures
2. Language Models & Concepts
3. Training & Optimization
4. Parameter-Efficient Methods
5. Retrieval, Search & Memory
6. Prompting & Agentic AI
7. Text Processing & Generation
8. Multimodal & Generative Models
9. Evaluation, Operations & Deployment
10. Problems and Solutions
11. Tools & Platforms
12. Architecture Patterns & Models
13. Semantic and Logical reasoning tools
---

## **1. Core Model Architectures**

**Terms:** Transformers, GPT, BERT, T5, encoder-decoder, self-attention, multi-head attention, positional encoding, CNN, RNN, LSTM, GRU, Vision Transformers (ViT), mixture of experts (MoE), KV (Key-Vector Memory)

**Transformers:** Neural network architecture using self-attention mechanisms, foundation of modern LLMs. Processes all input positions simultaneously with attention weights between each pair.

**GPT (Generative Pre-trained Transformer):** Family of autoregressive language models from OpenAI. Decoder-only transformers predicting next tokens left-to-right.

**BERT (Bidirectional Encoder Representations from Transformers):** Encoder-only model excelling at understanding tasks. Uses masked language modeling with bidirectional context during pre-training.

**T5 (Text-to-Text Transfer Transformer):** Model treating all NLP tasks as text generation problems. Uses encoder-decoder architecture with unified text-to-text framework.

**Encoder-decoder:** Architecture with separate components for understanding input and generating output. Encoder processes input into representations, decoder generates output from those representations.

**Self-attention:** Mechanism allowing models to weigh importance of different input positions. Computes query-key-value matrices and attention scores between all token pairs.

**Multi-head attention:** Using multiple attention mechanisms in parallel for richer representations. Runs several attention operations simultaneously with different learned projections.

**Positional encoding:** Adding position information to token embeddings in transformers. Adds sinusoidal functions or learned vectors indicating token positions.

**CNN (Convolutional Neural Network):** Architecture excelling at processing grid-like data (images). Applies learned filters across spatial dimensions to detect local patterns. Filters learn to detect features (edges, textures, patterns). Stacking layers builds higher-level representations. Used in ConvE for processing 2D-reshaped embeddings.

**RNN (Recurrent Neural Network):** Architecture for processing sequential data with memory. Maintains hidden state that's updated as each sequential element is processed.

**LSTM (Long Short-Term Memory):** RNN variant better at capturing long-range dependencies. Uses gating mechanisms (forget, input, output gates) to control information flow.

**GRU (Gated Recurrent Unit):** Simplified LSTM variant with fewer parameters. Combines forget and input gates into update gate, reducing complexity.

**Vision Transformers (ViT):** Applying transformer architecture to image recognition. Splits images into patches and treats them as token sequences.

**Mixture of Experts (MoE):** Architecture routing inputs to specialized sub-models. Gating network selects which expert networks to activate for each input. Multiple specialist models with a router that selects which experts activate. More efficient than single large models for same capability.

**KV (Key-Vector Memory):** Working memory mechanism storing key-value pairs for attention. Caches computed key and value tensors for efficient inference.

**Tensor:** Multi-dimensional array: 1D = vector, 2D = matrix, 3D = cube, 4D+ = stacks (used in batched image processing).

### **1.1 Efficient Attention Models**

**Terms:** MLA, V2/R1 (DeepSeek V2/Google DeepMind R1), Latent Vector, KV Cache

**MLA (Multi-head Latent Attention):** DeepSeek V2 / Google DeepMind R1 breakthrough. Instead of giant KV Cache (Key-Value working memory), uses Low-Rank Compression to squash into a tiny Latent Vector, as thumbnail for drilling down location into details.

**V2/R1:** DeepSeek V2 and Google DeepMind R1 architectures implementing MLA.

**Latent Vector:** Compressed representation used in efficient attention. Acts as a compact "thumbnail" that can be expanded to retrieve full details.

**KV Cache:** Key-Value cache storing computed attention values. Traditional approach uses large memory; MLA replaces with compressed latent vectors.

---

## **2. Language Models & Concepts**

**Terms:** LLM, SLM, foundation models, emergent abilities, scaling laws, parameters, embeddings, fine-tuning, transfer learning

**Parameters (B):** "Knobs" a model uses. Measured in billions. More parameters = better reasoning but slower and larger. Range: 7B to 70B for local models.

**LLM (Large Language Model):** Neural networks trained on massive text corpora to understand and generate human-like text. Pre-trains transformers on billions/trillions of tokens with next-token prediction.

**SLM (Small Language Model):** Compact, efficient language models designed for specific tasks or resource-constrained environments. Trained on smaller architectures or distilled from larger models.

**Foundation models:** Large models trained on broad data, adaptable to many downstream tasks. Pre-trained on diverse, large-scale datasets before task-specific fine-tuning.

**Emergent abilities:** Capabilities appearing unexpectedly in sufficiently large models. Arise when scaling model parameters beyond certain thresholds.

**Scaling laws:** Mathematical relationships between model size, data, and performance. Based on empirical observation of power-law relationships in model training. Compute-optimal training balances model size and training data for efficiency.

**Embeddings:** Dense vector representations capturing semantic meaning of text, images, or other data. Neural networks map inputs to fixed-size continuous vectors. Converts text into numerical vectors for retrieval. Used in RAG systems to match queries to relevant content before generating responses.

**Fine-tuning:** Adapting a pre-trained model to specific tasks or domains with additional training. Continues training on task-specific data, often with lower learning rates. Training a pre-existing model on domain-specific data. Smaller models work well with this approach for specialized tasks.

**Transfer learning:** Leveraging knowledge from one task to improve performance on another. Uses pre-trained weights as initialization for new task training.

**Domain-Specific Model:** Model trained or fine-tuned on specialized lexicon/knowledge. "Genius physicist that doesn't know how to tie his shoes."

### **2.1 State of the Art Language Models**

**DeepSeek V1:** First generation DeepSeek model.

**DeepSeek V2:** Second generation with MLA (Multi-head Latent Attention) breakthrough.

**Google DeepMind R2:** Advanced model using RLHF2 (second generation reinforcement learning from human feedback).

**RLHF2:** Second generation RLHF with improved human feedback integration.

---

## **3. Training & Optimization**

**Terms:** Fine-tuning, transfer learning, meta-learning, reinforcement learning (RL), RLHF, PPO, DPO, model alignment, constitutional AI, continual learning, catastrophic forgetting

**Fine-tuning:** Adapting a pre-trained model to specific tasks or domains with additional training. Continues training on task-specific data, often with lower learning rates.

**Transfer learning:** Leveraging knowledge from one task to improve performance on another. Uses pre-trained weights as initialization for new task training.

**Meta-learning:** Learning how to learn; optimizing models for quick adaptation to new tasks. Trains on distribution of tasks to optimize for few-shot adaptation.

**RL (Reinforcement Learning):** Training agents through rewards and penalties for actions. Updates policy networks based on reward signals from environment interactions.

**RLHF (Reinforcement Learning from Human Feedback):** Training method using human preferences to align AI behavior with desired outcomes. Gathers human expectations then trains model e.g. with PPO (Proximal Policy Optimization).

**PPO (Proximal Policy Optimization):** Popular reinforcement learning algorithm for stable training. Clips policy updates to prevent destabilizing large changes.

**DPO (Direct Preference Optimization):** Alignment technique directly optimizing for human preferences without RL. Optimizes likelihood ratio between preferred and rejected responses directly.

**Model alignment:** Ensuring AI systems behave according to human values and intentions. Combines instruction tuning, RLHF, and constitutional constraints.

**Constitutional AI:** Training approach using principles and rules to guide AI behavior and safety. Uses self-critique against constitutional principles during training.

**Continual learning:** Learning new tasks without forgetting previous knowledge. Uses techniques like replay buffers, regularization, or progressive neural networks.

**Catastrophic forgetting:** Loss of previous knowledge when learning new information. Occurs when neural network weights are overwritten during new task training.

**Federated learning:** Training models across decentralized devices while preserving privacy. Uses local training on devices with aggregated weight updates, not raw data sharing.

### **3.1 Continual Learning**

**Terms:** Nested Learning (NL), Continuum Memory, Multi-Time-Scale Updates, HOPE, 3-Tier Learning, Inner/Outer Loop

**NL (Nested Learning):** Solves amnesia with lossless re-training in new domains. Uses Multi-Time-Scale Updates (continuous feedback cycle).

**Continuum Memory:** Persistent memory mechanism for retaining knowledge across learning phases.

**Multi-Time-Scale Updates:** Continuous feedback cycle operating at different temporal scales for learning stability.

**HOPE (Hierarchically Organized Predictive Experts):** Google's hierarchical learning architecture using recursive summarization.

**3-Tier Learning:** Architecture with Fast, Medium, and Slow learners:
- **Fast learners:** Inner-loop, continuously updated  
- **Medium learners:** Consolidated patterns  
- **Slow learners:** Outer loop, stable stored data, rarely updated

**Inner/Outer Loop:** Learning paradigm separating fast adaptation (inner) from slow consolidation (outer).

**Consolidated Patterns:** Medium-tier learned representations stabilized over time.

### **3.2 Self-Learning Optimizers**

**Self-Learning Optimizers:** Systems that automatically adjust learning parameters based on training dynamics.

### **3.3 Anti-Amnesia Techniques**

**Sliding Window:** Maintains recent context within a fixed window size to preserve relevant information.

**Context Augmentation (RAG-based):** Injects past context and relevant information using retrieval-augmented generation to maintain continuity.

**Recursive Summarization:** Hierarchically compresses past information into summaries (used in HOPE) to retain knowledge without full context.

---

## **4. Parameter-Efficient Methods**

**Terms:** PEFT, LoRA, adapter layers, prefix tuning, knowledge distillation, soft prompts, hard prompts

**PEFT (Parameter-Efficient Fine-Tuning):** Family of techniques for adapting models with minimal parameter changes. Updates small subsets of parameters or adds trainable adapter modules.

**LoRA (Low-Rank Adaptation):** Memory-efficient fine-tuning method modifying small subsets of model parameters. Adds trainable low-rank matrices to frozen weight layers.

**Adapter layers:** Small trainable modules inserted into frozen pre-trained models. Adds bottleneck feed-forward layers between transformer blocks.

**Prefix tuning:** Optimizing continuous prompts prepended to inputs. Learns task-specific vectors prepended to key-value pairs in attention.

**Knowledge distillation:** Transferring knowledge from large "teacher" models to smaller "student" models. Trains student to match teacher's output distributions, not just labels.

**Soft prompts:** Learned continuous vectors guiding model behavior. Optimizes embedding-space vectors prepended to input tokens.

**Hard prompts:** Discrete text instructions written by humans. Crafts natural language instructions as model input.

### **4.1 Model Compression & Efficiency**

**Terms:** Model quantization, pruning, distillation, NAS, AutoML, GGUF

**GGUF:** GPT-Generated Unified Format — File format for storing large language models, optimized for local inference. Compresses models through quantization (4-bit, 8-bit instead of 16-bit). Fast to load on CPUs and consumer GPUs. Enables running models like Llama, Mistral locally without high-end hardware.

**Model quantization:** Reducing model size by using lower-precision numbers. Converts weights from FP32 to INT8/INT4 or other reduced precision.

**Pruning:** Removing unnecessary model parameters to reduce size and computation. Identifies and zeros out weights based on magnitude or importance.

**Distillation:** See knowledge distillation above.

**NAS (Neural Architecture Search):** Automated methods for discovering optimal neural network designs. Uses search algorithms (evolutionary, RL, gradient-based) exploring architecture space.

**AutoML:** Automated machine learning pipeline design and optimization. Automates feature engineering, model selection, and hyperparameter tuning.

---

## **5. Retrieval, Search & Memory**

### **5.1 Retrieval & Search**

**Terms:** RAG, embeddings, semantic search, dense retrieval, sparse retrieval, BM25, TF-IDF, cross-encoder, bi-encoder, reranking, retrieval-enhanced models, RRF, SPLADE

**RAG (Retrieval-Augmented Generation):** Technique combining information retrieval with text generation to produce factually grounded responses. Retrieves relevant documents and inserts them into the prompt context. Combines embeddings of a knowledge base with an LLM. Model retrieves relevant context first, then generates grounded answers. Minimizes hallucination.

**Embeddings:** Dense vector representations capturing semantic meaning of text, images, or other data. Neural networks map inputs to fixed-size continuous vectors. Converts text into numerical vectors for retrieval. Used in RAG systems to match queries to relevant content before generating responses.

**Semantic search:** Finding information based on meaning rather than keyword matching. Computes similarity between query and document embeddings.

**Dense retrieval:** Finding relevant information using semantic embeddings ("small thick" vectors). Encodes queries and documents as vectors, then uses similarity metrics.

**Sparse retrieval:** Traditional keyword-based information retrieval ("librarian" approach). Uses inverted indexes with term frequency matching (BM25, TF-IDF, SPLADE).

**BM25 (Best Matching 25):** Classic probabilistic ranking function for document retrieval using sparse vectors (lexical). Scores documents based on term frequency with length normalization.

**TF-IDF (Term Frequency-Inverse Document Frequency):** Weighting scheme for keyword importance. Multiplies term frequency by inverse document frequency.

**SPLADE:** Sparse Lexical and Expansion model for sparse retrieval.

**Cross-encoder:** Model scoring query-document pairs jointly for high accuracy. Concatenates query and document, scoring with single forward pass. Used to re-sort hybrid search results.

**Bi-encoder:** Model encoding queries and documents separately for efficiency. Separate encoders for queries and documents, compared via dot product.

**Reranking:** Reordering initial retrieval results using more sophisticated models. Applies cross-encoders or complex models to top-k initial results.

**RRF (Reciprocal Rank Fusion):** Method to merge results from multiple retrieval systems (e.g., dense + sparse). Takes both results and merges by reciprocal rank scores.

**Retrieval-enhanced models:** Models augmented with retrieval mechanisms for better factuality. Incorporates retrieval results into generation process via RAG or similar.

**Source-Grounding:** Responses tied directly to uploaded materials with citations. Reduces hallucination by constraining answers to known sources.

### **5.2 Vector Databases**

**Terms:** Vector databases, Pinecone, Weaviate, Supabase, FAISS, dense vectors, sparse vectors, hybrid search

**Vector databases:** Specialized storage systems optimized for similarity search on embedded data. Index high-dimensional vectors with approximate nearest neighbor algorithms.

**Pinecone:** Managed vector database supporting dense + sparse hybrid search. Uses cross-encoder and RRF under the hood for optimal results.

**Weaviate:** Modular vector database with hybrid search built-in. Available as self-hosted (free) or cloud ($25/mo).

**Supabase:** Everything-in-one platform combining SQL + Vectors. Has built-in AI Assistant that writes your SQL.

**FAISS (Facebook AI Similarity Search):** Open-source library efficient in dense vectors (meaning, semantic). Optimized for similarity search and clustering of dense vectors.

**Dense vectors:** Semantic embeddings capturing meaning ("small thick" representations). Best for understanding context and semantic similarity.

**Sparse vectors:** High-dimensional vectors with mostly zero values, used for lexical/keyword matching ("librarian" approach). BM25, SPLADE generate sparse representations.

**Hybrid search:** Combining dense and sparse retrieval for best results. Takes both dense (semantic) and sparse (lexical) results and merges with RRF.

### **5.3 Graph Databases**

**Terms:** Neo4j, Memgraph, MAGE, Cypher, knowledge graph storage

**Neo4j:** Disk-based graph database for persistent knowledge graph storage. Best for searching and updating large, persistent KGs with complex queries. Uses Cypher query language.

**Memgraph:** In-memory graph database for real-time knowledge graph operations. Best for storing and retrieving local copy of working KGs to memory with blazing fast performance. Uses Cypher-compatible query language.

**MAGE (Memgraph Advanced Graph Extensions):** Library of graph algorithms for Memgraph. Provides pre-built algorithms for PageRank, community detection, pathfinding, etc.

**Cypher:** Declarative graph query language used by Neo4j and Memgraph. Pattern-matching syntax for traversing and manipulating graph data.

### **5.4 Knowledge Representation & Graph Neural Networks**

**Terms:** Knowledge graphs, KG, graph neural networks (GNN/GCN/RGCN), knowledge base completion, entity linking, memory networks, triples

**Knowledge graphs (KG):** Structured representations of entities and their relationships in a domain. Stores entities as nodes and relationships as edges in graph databases. Unified web; the total collection of nodes, edges, and properties.

**Label:** Entity category; used to classify nodes, such as Person or Pet.

**Property:** Internal data; key-value pairs stored inside a node or edge.

**Schema:** Blueprint of logic; defines which labels can connect to which edges.

**Triple:** Fundamental unit of knowledge graphs: (entity1, relation, entity2). Example: (Jane, knows, Dick). Used for link prediction: given (entity, relation, ?), predict missing entity.

**Knowledge Extraction:** Construction phase; identifying entities and relationships from raw text.

**Entity linking:** Connecting text mentions to knowledge base entities. Uses candidate generation followed by disambiguation using context.

**Graph Traversal:** Pathfinding; hopping from node to node to find connections.

**Symbolic Reasoning:** Logical inference; using the explicit rules of the graph's structure.

**Sub-graph:** Data neighborhood; a smaller cluster of nodes pulled from the whole.

**Transitive Inference:** Chain reaction; if A=B and B=C, then A=C.

**Deductive Reasoning:** Top-down logic; reaching a specific conclusion from general rules.

**Traceability:** The breadcrumb trail; the ability to see every step the AI took to get the answer.

**Graph Neural Networks (GNN):** Networks processing graph-structured data. Uses message passing between nodes to aggregate neighborhood information.

**GCN (Graph Convolutional Network):** Learns node embeddings by aggregating information from neighbors across multiple layers. Each node averages neighbor embeddings (message passing). Combines neighbor info with own embedding via learned weights. Single edge type (treats all edges the same).

**RGCN (Relational Graph Convolutional Network):** Extension of GCN for graphs with **multiple relation types**. Each relation type has separate weight matrix. Aggregates neighbor info separately per relation, then combines. Node updates incorporate different relation types independently. Key difference from GCN: Relation-specific parameters allow different interaction patterns for different edge types.

**Knowledge base completion:** Predicting missing facts in structured knowledge bases. Uses link prediction using embeddings or neural models on knowledge graphs.

**Memory networks:** Architectures with explicit external memory components. Uses attention mechanisms over memory slots to read/write information.

**Knowledge Graph Models:**

**DistMult (Distant Multiplication):** Scores knowledge graph triples using bilinear product: `score = entity1_embedding · relation_embedding · entity2_embedding`. Fast and simple. Works well for symmetric relations. Use: link prediction in KGs.

**ComplEx (Complex Embeddings):** Extension of DistMult using complex-valued embeddings (real + imaginary parts). Handles asymmetric relations better than DistMult. Use: link prediction, more expressive than DistMult.

**ConvE (Convolutional 2D Knowledge Graph Embeddings):** Reshapes embeddings into 2D tensors, applies 2D convolutions (CNN) before scoring. More expressive than DistMult/ComplEx. Captures complex interaction patterns. Generally higher accuracy on link prediction.

---

## **6. Prompting & Agentic AI**

### **6.1 Prompting Techniques**

**Terms:** Prompt engineering, few-shot learning, zero-shot learning, in-context learning, chain-of-thought, prompt chaining, prompt compression, ReAct, reflection, self-critique

**Prompt engineering:** Crafting effective input instructions to elicit desired responses from AI models. Involves iterative refinement of instruction phrasing, examples, and formatting.

**Few-shot learning:** Teaching models new tasks with only a handful of examples. Includes example input-output pairs in the prompt context.

**Zero-shot learning:** Performing tasks without any training examples, using only instructions. Provides clear task descriptions without demonstration examples.

**In-context learning:** Learning from examples provided within the prompt itself. Models recognize patterns in prompt examples without weight updates.

**Chain-of-thought:** Prompting technique encouraging models to show reasoning steps before conclusions. Includes "let's think step by step" or shows example reasoning chains.

**Prompt chaining:** Connecting multiple prompts in sequence for complex tasks. Uses output from one prompt as input to subsequent prompts.

**Prompt compression:** Reducing prompt length while preserving information. Uses summarization, embedding compression, or removing redundant tokens.

**ReAct (Reasoning and Acting):** Framework interleaving reasoning traces with tool actions. Prompts model to alternate between thought, action, and observation steps.

**Reflection:** Models critiquing and improving their own outputs. Prompts model to review and revise its previous responses.

**Self-critique:** Models evaluating their responses for quality and accuracy. Generates response then evaluates it against criteria or rubrics.

### **6.2 Agentic AI & Tool Use**

**Terms:** Agentic AI, tool use, function calling, plan-and-execute, vibe coding

**Agentic AI:** AI systems that can plan, use tools, and take actions autonomously. Combines LLMs with planning algorithms and tool-calling capabilities.

**Tool use:** AI models invoking external functions, APIs, or software. Generates structured function calls that are executed by external systems.

**Function calling:** Structured way for models to request external tool execution. Models output JSON schemas matching available function signatures.

**Plan-and-execute:** Agent paradigm separating planning from action execution. First generates action plan, then executes steps sequentially.

**Vibe coding:** AI-assisted computer development workflow. Uses AI agents to write, test, and iterate on code with minimal human intervention. Agentic coding capabilities with integrated AI chat and code generation.

---

## **7. Text Processing & Generation**

### **7.1 Text Processing**

**Terms:** Tokenization, BPE, context window, coreference resolution, named entity recognition (NER)

**Tokenization:** Breaking text into discrete units (tokens) for model processing. Applies learned or rule-based algorithms to split text into subwords/words.

**Token:** Semantic fragment; the basic unit for measuring processing cost.

**BPE (Byte Pair Encoding):** Common tokenization method merging frequent character sequences. Iteratively merges most frequent adjacent byte/character pairs.

**Context window:** Maximum amount of text a model can process at once. Fixed-size limit on input sequence length due to architecture constraints. Context window - Active memory; the total space available for LLM processing.

**Coreference resolution:** Identifying when different expressions refer to the same entity. Clusters mentions using neural models trained on annotated data.

**Named Entity Recognition (NER):** Identifying and classifying named entities in text. Uses token classification with sequence labeling models (CRF, LSTM, transformers).

### **7.2 Text Generation & Sampling**

**Terms:** Temperature, top-k sampling, top-p sampling, nucleus sampling, beam search, greedy decoding, hallucination mitigation, grounding

**Temperature:** Parameter controlling randomness in model output generation. Scales logits before softmax (higher = more random, lower = more deterministic).

**Top-k sampling:** Selecting next token from k most likely options. Filters to top-k tokens by probability, then samples from that subset.

**Top-p sampling:** Selecting from smallest set of tokens whose cumulative probability exceeds p. Uses cumulative probability threshold filtering before sampling.

**Nucleus sampling:** Alternative name for top-p sampling.

**Beam search:** Generating multiple candidate sequences and selecting the best. Maintains k best partial sequences at each step, expanding all candidates.

**Greedy decoding:** Always selecting the most likely next token during generation. Takes argmax of probability distribution at each step.

**Hallucination mitigation:** Techniques to reduce AI generation of false or unsupported information. Uses RAG, verification steps, confidence scoring, or constrained decoding.

**Grounding:** Connecting model outputs to verifiable sources or real-world facts. Uses citing sources, retrieval augmentation, or external fact-checking.

### **7.3 NLP Tasks**

**Terms:** Sentiment analysis, question answering, summarization, paraphrasing, machine translation, code generation, code completion

**Sentiment analysis:** Determining emotional tone or opinion in text. Uses classification models trained on labeled sentiment data.

**Question answering:** Generating answers to questions from context or knowledge. Uses extractive span selection or generative models conditioned on question-context pairs.

**Summarization:** Condensing long texts into shorter versions preserving key information. Uses extractive selection of key sentences or abstractive generation with seq2seq models.

**Paraphrasing:** Restating text with different words while preserving meaning. Uses seq2seq models trained on paraphrase pairs or back-translation.

**Machine translation:** Automatically translating text between languages. Uses encoder-decoder models trained on parallel corpora.

**Code generation:** Creating programming code from natural language descriptions. Uses LLMs trained on code repositories generating code from docstrings/comments.

**Code completion:** Suggesting code continuations while programming. Uses language models trained on code predicting next tokens in context.

---

## **8. Multimodal & Generative Models**

### **8.1 Multimodal AI**

**Terms:** Multimodal models, vision-language models, CLIP, text-to-image, image-to-text, diffusion models, SORA, audio generation, video generation, 3D generation, speech recognition, text-to-speech

**Multimodal models:** AI systems processing multiple data types (text, image, audio, etc.). Uses shared embedding spaces or cross-attention between modality-specific encoders.

**Vision-language models:** Models understanding both images and text simultaneously. Uses joint training on image-text pairs with contrastive or generative objectives.

**CLIP (Contrastive Language-Image Pre-training):** Model learning visual concepts from text descriptions. Uses contrastive learning matching image and text embeddings.

**Text-to-image:** Generating images from textual descriptions. Uses diffusion models or GANs conditioned on text embeddings.

**Image-to-text:** Generating textual descriptions of images. Uses vision encoder feeding into language model decoder.

**Diffusion models:** Generative models creating images by iteratively denoising random data. Trains to reverse gradual noise addition process.

**SORA:** OpenAI's text-to-video generation model. Uses diffusion transformers trained on video-text pairs.

**Audio generation:** Creating synthetic audio from descriptions or other inputs. Uses diffusion or autoregressive models generating audio waveforms/spectrograms.

**Video generation:** Creating video content from text or other modalities. Extends image diffusion to temporal dimension or frame prediction.

**3D generation:** Creating three-dimensional models and scenes from descriptions. Uses neural radiance fields, diffusion models, or GAN-based 3D synthesis.

**ASR (Automatic Speech Recognition):** Converting spoken language to text. Uses encoder models (CNN, transformer) trained on audio-transcript pairs.

**TTS (Text-to-Speech):** Converting written text to spoken audio. Uses neural vocoders and mel-spectrogram prediction from text.

### **8.2 Generative Models**

**Terms:** GAN, VAE, diffusion models

**GAN (Generative Adversarial Network):** Two competing networks for generating realistic synthetic data. Generator creates samples while discriminator distinguishes real from fake.

**VAE (Variational Autoencoder):** Generative model learning compressed data representations. Encoder maps to latent distribution, decoder reconstructs from samples.

---

## **9. Evaluation, Operations & Deployment**

### **9.1 Evaluation & Metrics**

**Terms:** Evaluation metrics, perplexity, BLEU, ROUGE, benchmark datasets, leaderboards, ablation studies

**Evaluation metrics:** Quantitative measures of model performance. Computes scores comparing model outputs to references or human judgments.

**Perplexity:** Metric measuring how well a model predicts text; lower is better. Exponential of average negative log-likelihood on test data.

**BLEU:** Metric comparing generated text to reference translations. Computes n-gram overlap with brevity penalty.

**ROUGE:** Metric evaluating text summarization quality through overlap measures. Measures recall of n-grams and longest common subsequences.

**Benchmark datasets:** Standardized test sets for comparing model capabilities. Curates diverse task-specific datasets with evaluation protocols.

**Leaderboards:** Rankings comparing model performance on benchmarks. Aggregates scores across tasks with standardized evaluation.

**Ablation studies:** Experiments isolating contributions of specific model components. Systematically removes or modifies components and measures impact.

### **9.2 Operations & Deployment**

**Terms:** MLOps, LLMOps, CI/CD, MLFlow, DVC, W&B

**MLOps (Machine Learning Operations):** Practices for deploying and maintaining machine learning systems in production. Uses CI/CD pipelines, monitoring, versioning, and infrastructure automation.

**LLMOps:** MLOps specifically for large language model applications. Uses specialized tooling for prompt management, evaluation, and LLM orchestration.

**CI/CD (Continuous Integration & Continuous Delivery/Deployment):** DevOps practice for automated testing and deployment. Automates pipelines that build, test, and deploy code changes.

---

## **10. Problems and Solutions**

| Problem | Solution |
| ----- | ----- |
| Server/local resource limits | Model quantization, SLMs, edge deployment, MoE |
| Amnesia (catastrophic forgetting) | Nested Learning, continual learning, memory networks, sliding window, context augmentation, recursive summarization |
| Hallucination | RAG, grounding, verification steps, confidence scoring |
| Large KV Cache memory | MLA (Multi-head Latent Attention), latent vector compression |
| Context window limits | Sliding window, recursive summarization, RAG |
| Real-time KG access | Memgraph (in-memory) |
| Persistent KG storage | Neo4j (disk-based) |

---

## **11. Tools & Platforms**

### **11.1 MLOps Tools**

**MLFlow:** Tracks versions, usage (params and results) and performance of models. mlflow-js webhooks for node.

**DVC (Data Version Control):** OSS Digital Version Control - configuration tracking of large data: GB of json/images. dvc.js used to trigger data sync of js-heavy data pipelines like in Vibe.

**W&B (Weights and Biases):** Model visualization dashboard. wandb webhooks.

### **11.2 Vector Database Tools**

**Pinecone:** Managed. Production hybrid search, enterprise.

**FAISS:** OSS Library. Dense vector similarity, research.

**Weaviate:** OSS/Cloud. Modular hybrid search.

**Supabase:** Managed. SQL + Vectors, full-stack apps.

**Milvus:** OSS. Large-scale vector search.

**Qdrant:** OSS. High-performance filtering.

**Chroma:** OSS. LLM applications, simple setup.

### **11.3 Graph Database Tools**

**Neo4j:** OSS/Enterprise. Persistent KG storage, complex queries.

**Memgraph:** OSS/Enterprise. Real-time in-memory KG operations.

**MAGE:** OSS Library. Graph algorithms for Memgraph.

### **11.4 AI Coding Assistants**

**TRAE:** ByteDance's AI coding assistant IDE. Agentic coding capabilities with integrated AI chat and code generation.

**Traycer:** AI debugging and code tracing tool. Helps trace code execution and identify bugs using AI analysis.

**Roo Code (formerly Roo Cline):** VS Code extension for AI-assisted coding. Combines agentic coding with multiple AI model support and tool use.

**Cline:** VS Code AI coding assistant with autonomous capabilities. Executes multi-step coding tasks with file editing, terminal commands, and browser use.

**Cursor:** AI-first code editor built on VS Code. Provides inline AI suggestions, chat, and codebase-aware assistance.

**GitHub Copilot:** GitHub's AI pair programmer. Suggests code completions and entire functions based on context.

### **11.5 Dev Tools & Testing Frameworks**

**TDD (Test-Driven Development):** Development methodology writing tests before code. Red-green-refactor cycle ensures code meets requirements.

**Jest:** Facebook's testing framework with built-in mocking and assertions. React apps, general JS/TS.

**Mocha:** Flexible test framework, pairs with assertion libraries (Chai). Node.js, customizable setups.

**Vitest:** Vite-native testing framework, Jest-compatible API. Vite projects, fast execution.

**Jasmine:** Behavior-driven testing framework, no dependencies. Angular, standalone testing.

**BDD (Behavior-Driven Development):** Extension of TDD using natural language specifications. Writes tests in Given-When-Then format for stakeholder readability.

**Cucumber.js:** Gherkin syntax for human-readable tests. Cross-team collaboration, acceptance tests.

**DDD (Domain-Driven Design):** Software design approach focusing on core domain logic. Architectural pattern emphasizing bounded contexts and ubiquitous language.

**Puppeteer:** Google's headless Chrome automation. Controls Chrome/Chromium via DevTools Protocol. Web (Chrome).

**Playwright:** Microsoft's cross-browser automation. Supports Chrome, Firefox, Safari, and Edge. Web (Cross-browser).

**Cypress:** Developer-friendly E2E testing. Real-time reloading and time-travel debugging. Web.

**Appium:** Cross-platform mobile automation. Uses WebDriver protocol for native and hybrid apps. Mobile (Android/iOS).

**nut.js:** Desktop automation library. Controls mouse, keyboard, and screen for desktop apps. Desktop (Windows/Mac/Linux).

---

## **12. Architecture Patterns & Models**

### **12.1 Architecture Patterns**

**Local + Cloud Hybrid:** Run small local model for validation/checking against domain KG. Escalate to cloud LLM for novel problems or topic changes.

**Multi-Agent:** Several specialized small models collaborating. Each handles domain-specific subset of task.

**Embeddings + Local Model:** Use embeddings to retrieve from knowledge base, feed context to local SLM for grounded answers. Minimal hallucination.

### **12.2 Knowledge Graph & Retrieval Workflow**

**Guided exploration:** Global and local search through structured data.

**Ingestion Stage:** Initial stage; loading document into KG and embedding nodes.

**Property Graph:** Node-text pairs; usually entered when node created in KG.

**Embedding Model:** External translator; converts human text into high-dimensional math.

**Vectorization:** Numerical transformation; the act of producing a vector array.

**Vector Property:** Numerical coordinate; stored inside the node for semantic search.

**Cosine Similarity:** Distance calculation; measuring how close two meanings are mathematically.

**Semantic Search:** Meaning-based retrieval; finding data without needing exact keywords.

**Retrieved Text:** Reconstructed context; the human words pulled from the node.

**RAG Payload:** Contextual bundle; the combined data sent to the LLM.

**Structured Query:** Using Cypher to traverse defined relationships.

### **12.3 The BidiLayerSwap Model**

A relational graph architecture combining bidirectional message passing with dynamic connection parametrization and expert selection.

### Components

**Term-Base Layer (Entity Layer)**
- Stores entity embeddings 
- Selected/gated by MoE mechanism (different experts activate for different entities)
- Receives and sends information via connection layer
- "Everything connected to everything"

**Connection Layer (Relation Layer)**
- Parametrized to allow sequential routing through different relation types
- A sequence of passes can start with one relation type, transition to another, then use results from other relations
- Each relation type has distinct learned parameters (like RGCN)

**Message Passing (Bidirectional contextual)**
- Forward pass: entities aggregate information from connections
- Backward pass: connections aggregate information from entities
- Multiple sequential passes allow iterative refinement
- Each pass can route through different relation types based on context

### Contextual Behavior Examples

The model handles conditional outputs based on a shopping list state and context:

**Example 1: List-dependent output**
- Input: list contains: [milk, cheese, return the can]
- Through connection sequence: identify milk & cheese → apply relation transformations
- Output: predict tuna (inverse relation, compositional)

**Example 2: Narrative with conditional action**
- "The boy drove the car to the supermarket holding a tuna can"
- Context from list determines action: bought or returned 
- Context determines object bought: cheese, milk, or both
- Single entity/action structure, context-parametrized output
- Output: [boy, sequence: [droveto(supermarket), planned(buy, return), bought(milk, cheese), returned(tuna)]
- Result: B droveto S, B planned buy, B planned return, B bought milk, B bought cheese, B returned tuna

**Example 3: Context-dependent entity type**
- "This is a chair or a small table"
- Same entity embedding
- Classification depends on: location (near table/bed), environment (other chairs/trays), usage (sitting human/objects)
- Connection layer routes through different relation contexts to determine type

### Why BidiLayerSwap Works

1. **Bidirectional flow** enables complex dependencies (entities influence connections, connections influence entities)
2. **MoE on term-base** scales efficiently — only relevant experts activate
3. **Parametrized connection sequences** allow modular reasoning through different relation types
4. **Context routing** naturally handles conditional outputs without separate models
5. **Sequential learning** along with the static resolutions
6. **Everything connects to Everything**
7. **Multi-pass architecture** iteratively refines representations based on accumulated highly contextualized testing

### **12.4 The "Genius Physicist" Setup**

A domain-specific model that's expert in one area but limited in others.

**Components:**
- **Local Model:** Mixtral 7B or Mistral 7B
- **Domain Knowledge:** Lexicon KG (string manipulation, text processing, gematria, RTL/LTR languages, basic CS concepts)
- **Validation Layer:** Embeddings of lexicon for coherence/validity checks
- **Escalation:** Cloud LLM (Gemini/Claude) for novel topic branches
- **Storage:** Local in-session, cloud KG for persistent reference

---

## **13. Cloud & Local Language Models**

### **13.1 Large Language Models (Cloud-based)**

**OpenAI GPT-4o mini:** Proprietary. Estimated 8B-20B parameters. General purpose. Excellent reasoning across domains.

**Anthropic Claude Haiku:** Proprietary. Estimated ~8B parameters. Fast, focused on clarity. Smallest in Claude family.

**Google Gemini 3:** Latest version, improved reasoning and multimodal understanding. Proprietary sizing, cloud-only.

**Google Gemini 2.0 Flash:** Optimized variant used by NotebookLM, lighter than standard Gemini.

### **13.2 Small Language Models (Locally-runnable, Open-source)**

**Mistral 7B:** 7B parameters. ~4-15GB on disk. Good speed/quality balance. General purpose.

**Llama 2 7B:** 7B parameters. ~4-15GB on disk. Meta's open-source standard. Good foundation model.

**CodeLlama 7B:** 7B parameters. ~4-15GB on disk. Specialized for code generation and manipulation.

**Mixtral (by Mistral):** 7-8B effective, uses MoE architecture (8 experts, 2 active). Better reasoning than single 7B. Similar footprint, faster inference.

**Qwen 7B:** 7B parameters. Competitive with Mistral. Good quality, open-source.

**TinyLlama:** 1.1B parameters. Extremely lightweight. Fast everywhere. Limited reasoning capability. Good for simple classification/regex tasks only.

### **13.3 Tools & Platforms**

**NotebookLM:** Google's document-centric AI assistant. Powered by Gemini 3. Upload sources (PDFs, Docs, URLs, transcripts). Generates grounded Q&A, Audio Overviews, Video Overviews, Mind Maps, Reports, Flashcards, Quizzes, Infographics, Slide Decks, Data Tables.

**Gemini:** Google's flagship conversational LLM. Multimodal (text, code, audio, images). Real-time search integration. Full general knowledge.

**Claude (Anthropic):** LLM available via web chat, API, or Claude Code (CLI tool for agentic coding). Haiku, Sonnet, Opus variants.

**Google Codespaces:** Cloud-based development environment. Code lives in cloud, must push to GitHub to persist.

---

## **Quick Reference Tables**

### **Vector Database Comparison (Long-term Hybrid Storage for KGs)**

| Feature | Pinecone | Weaviate | Supabase |
| ----- | ----- | ----- | ----- |
| **Philosophy** | "Pure Speed." Managed cloud only. | "Modular." Hybrid search built-in. | "Everything-in-one." SQL + Vectors. |
| **Cost** | Usage-based ($50/mo min). Can get expensive fast. | Free (self-host) or $25/mo (cloud). | Free tier is great; Pro starts at $25/mo. |
| **AI Assistant** | Has basic query help. | Excellent documentation and "Weaviate-GPT." | Built-in "AI Assistant" that writes your SQL. |

### **Graph Database Comparison**

| Feature | Memgraph | Neo4j |
| ----- | ----- | ----- |
| **Use Case** | Real-time, in-memory KG operations | Persistent, large-scale KG storage |
| **Philosophy** | "Speed first." In-memory for real-time queries. | "Scale first." Disk-based for durability. |
| **Best For** | Local working copy of KGs, real-time updates | Searching & updating persistent KGs |
| **Performance** | Blazing fast (RAM-speed) | Fast (SSD-speed) |
| **Storage** | In-memory (with persistence options) | Disk-based with caching |
| **Query Language** | Cypher-compatible | Cypher |
| **Algorithms** | MAGE library | GDS (Graph Data Science) library |
| **Cost** | Free (self-host) or Enterprise | Free Community or Enterprise |

### **AI Coding Assistant Comparison**

| Feature | TRAE | Cline | Roo Code | Cursor |
| ----- | ----- | ----- | ----- | ----- |
| **Type** | Standalone IDE | VS Code Extension | VS Code Extension | Standalone IDE |
| **Agentic** | Yes | Yes | Yes | Partial |
| **Multi-model** | Limited | Yes | Yes | Yes |
| **File Editing** | Yes | Yes | Yes | Yes |
| **Terminal Access** | Yes | Yes | Yes | Yes |
| **Cost** | Free | Free (BYO API key) | Free (BYO API key) | Free tier + $20/mo Pro |

### **E2E Testing Tools**

| Tool | Platform | Description |
| ----- | ----- | ----- |
| **Puppeteer** | Web (Chrome) | Google's headless Chrome automation. Controls Chrome/Chromium via DevTools Protocol. |
| **Playwright** | Web (Cross-browser) | Microsoft's cross-browser automation. Supports Chrome, Firefox, Safari, and Edge. |
| **Cypress** | Web | Developer-friendly E2E testing. Real-time reloading and time-travel debugging. |
| **Appium** | Mobile (Android/iOS) | Cross-platform mobile automation. Uses WebDriver protocol for native and hybrid apps. |
| **nut.js** | Desktop (Windows/Mac/Linux) | Desktop automation library. Controls mouse, keyboard, and screen for desktop apps. |

### **TDD Frameworks for JS**

| Framework | Description | Best For |
| ----- | ----- | ----- |
| **Jest** | Facebook's testing framework with built-in mocking and assertions | React apps, general JS/TS |
| **Mocha** | Flexible test framework, pairs with assertion libraries (Chai) | Node.js, customizable setups |
| **Vitest** | Vite-native testing framework, Jest-compatible API | Vite projects, fast execution |
| **Jasmine** | Behavior-driven testing framework, no dependencies | Angular, standalone testing |

### **BDD Frameworks for JS**

| Framework | Description | Best For |
| ----- | ----- | ----- |
| **Cucumber.js** | Gherkin syntax for human-readable tests | Cross-team collaboration, acceptance tests |
| **Jest + jest-cucumber** | Jest with Cucumber-style syntax | Jest projects needing BDD |
| **Mocha + Chai** | Mocha with Chai's expect/should assertions | Expressive BDD-style assertions |

### **Model Comparison Table**

| Model | Type | Size | Parameters | Local? | Best For |
|-------|------|------|-----------|--------|----------|
| Mixtral | MoE | ~7-8B eff. | 7-8B | ✅ | Domain reasoning, local inference |
| Mistral 7B | Standard | 4-15GB | 7B | ✅ | General local tasks |
| Llama 2 7B | Standard | 4-15GB | 7B | ✅ | Foundation model, fine-tuning |
| CodeLlama 7B | Specialized | 4-15GB | 7B | ✅ | Code generation, text manipulation |
| Qwen 7B | Standard | 4-15GB | 7B | ✅ | General local tasks, competitive |
| TinyLlama | Standard | <1GB | 1.1B | ✅ | Ultra-lightweight, simple tasks only |
| GPT-4o mini | Cloud | Proprietary | 8B-20B est. | ❌ | Complex reasoning, multi-domain |
| Claude Haiku | Cloud | Proprietary | ~8B est. | ❌ | Fast responses, clarity |
| Gemini 2.0 Flash | Cloud | Proprietary | Unknown | ❌ | NotebookLM, source grounding |
| Gemini 3 | Cloud | Proprietary | Unknown | ❌ | Advanced reasoning, multimodal |

### **Vector Database Tools**

| Tool | Type | Best For |
| ----- | ----- | ----- |
| **Pinecone** | Managed | Production hybrid search, enterprise |
| **FAISS** | OSS Library | Dense vector similarity, research |
| **Weaviate** | OSS/Cloud | Modular hybrid search |
| **Supabase** | Managed | SQL + Vectors, full-stack apps |
| **Milvus** | OSS | Large-scale vector search |
| **Qdrant** | OSS | High-performance filtering |
| **Chroma** | OSS | LLM applications, simple setup |

---

# 13. Reasoning, Semantic and Logical Tools
## 13.1  current technologies
1. Symbolic and logic
1.1 Symbolic NLP - ???  
1.2 Formal Logic - ???  
1.3 3 DRT (Discourse Representation Theory):  mental models (a man, is walking)  
1.4 Combinatory Categorial Grammar (CCG): function word map  
1.5 DCG  Definite Clause Grammar - ??? 

DSPy  Declerative Self Relying Python - language to control AI. 

## 13.2  Grammar
13.2.1 LM AI tools
- HEBREW.AI / YAP (Yet Another Parser) — Israeli academic project, Tel Aviv University.
- YAP - A 5-gram language model designed to predict the next word from user input.
- Gram model - number of words for next word prediction. Used in early autocorrect and autocomplete

13.2.2  Rule based Grammar analyzers
- **NER** - Named Entity Recognition
- **AMR** parsers (Abstract Meaning Representation) — deeper semantic graphs. (often skipping tense,number,article)
- Flair - Strong NER (rule based?)
- Amrlib - Python. Translates NL texts to AMR graph and back. 
- 
- WordNet (via NLTK) — lexical relations, synonyms, hypernyms.
- spaCy + sense2vec — word sense disambiguation.

- **compromise.js**  - english only rule based with lexicon/thesaurus grammar and syntax analyzer. 
- **natural.js** - node js 
- spaCy — fast, production-grade. Gives you POS tags, dependency trees, noun chunks out of the box. Python.
- HebSpacy 
- AlephBert - Hebrew grammar AI
- DictaBert
- Stanza - Stanford Python Syntax / Grammar  parser.   
    - Older version:  Stanford CoreNLP  (Stanford is in California)
- PEIRCE - github.com/neuro-symbolic-ai/peirce
- Isabelle - Solver framework and language (Interactive Theorem Prover ITP)
  - Uses languages defining recursive logic functions:
  - Haskell, SML (Standard Meta Language), OCAML (OO Catigorical Abstract-Machine Language)

13.2.3 Hebrew grammar analysis
- See [Hebrew NLP resources on Github](https://github.com/AdamKaabyia/Resources)
- 

## 13.3 Old obsolete technologies: 
- OpenCOG  (patents, Ben Goerzel): - Unceartain truths, in "AtomSpace" 
  - PLN - Probabilistic Logic Networks.
  - Cognitive Schematics  (uncertain truth values)
- SOAR - University of Michigan human-like cognition model. Boolean production tools  
- AOR-t - Anatomical Ontology-Guided Reasoning. ??mistake??
- CyC  40 years. Works on specific knowledge. Early assistant bots with alternative terms for guessing.  
- [Intelligate](https://patents.google.com/patent/US20080154581A1/en?q=(intelligate)&oq=intelligate) Idea I checked and apoproved for buying by MLL. 
- NeuroSymbolic AI - DeepProbLog  NTSO,
- HTM Numenta - Hierarchical Temporal Memory handles sparse temporal representations in a biologically-inspired way. 


