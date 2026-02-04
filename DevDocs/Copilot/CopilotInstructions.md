# Copilot Instructions (Long Responses)

## Working Context First
- Always ask what I’m working on at the start of a new task.
- Ask for the GitHub Project item link and the related issue/PR link (if any).
- If I provide a Project item or issue link, treat it as the source of truth for scope.

## Long Discussions
- Use [DevDocs/Copilot/chats.md](DevDocs/Copilot/chats.md) to keep a running summary of long discussions.
- When a discussion gets long or complex, summarize decisions, open questions, and next steps there.
- Keep summaries concise and actionable.

## Commits and Pushes
When I ask you to commit:
1. if I didn't also say to push, verify if I meant commit and push.

2. You can use DevDocs/devflow.md for all of the following if needed. You may write and erase it at will. 
Keep them in github for development consistency. 

3. Remember your suggested summary intended for the commit. 
4. ask which Project item to associate, and ask if i'm closing the issue.  
- I'll supply a link to a proj item. 

5. Read the link: the name parent, content and comments. 
6. summarize the two as the commit comment (with a link to the proj item, its name and comments, and your original summary)  

4. Supply a prompt for me to supply my github site copilot assistant. Needs to be in markdown  so that i can copy it easily from the chat's vscode interface into the github website copilot prompt. 
- to move to done and close, or leave open
- to add as a comment or closing comment to the item,with: 
- a link to the commit
- what in the projtask was accomplished
- a short summary of changes with file locations.
e.g. cosmetics: 
path/pith/puth/filea.js:230.27
path/ping/pong/fileb.js:240.0

5. If it is the closing of a parent with subprojects, also add the instruction to move them all with a remark in each to see parent comment. 
