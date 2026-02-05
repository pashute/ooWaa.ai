# Copilot Instructions (Long Responses)
**Version:** 1.0.1  
**Last Updated:** 2026-02-05
## Working Context First
- Always ask what I’m working on at the start of a new task.
- Ask for the GitHub Project item link and the related issue/PR link (if any).
- If I provide a Project item or issue link, treat it as the source of truth for scope.
- When I say "open" or "open it," open the file in the editor/explorer; do not print file contents unless I ask.

## Dev Flow
Use devflow.md to store  
- current iteration's name 
- iteration's issues (with link) and in them
- issue's milestone and commits (with extremely short descripition)

## Long Discussions Breakdown
- Use [DevDocs/Copilot/chats.md](DevDocs/Copilot/chats.md) to keep a running summary of long discussions.
- When a discussion gets long or complex, summarize decisions, open questions, and next steps there.
- Keep summaries concise and actionable.

## Commits and Pushes
When I ask you to commit:
1. if I didn't also say to push, verify if I meant commit and push.

2. You can use DevDocs/Copilot/devflow.md for all of the following if needed. You may write and erase it at will. 
Keep them in github for development consistency. 

3. Remember your suggested summary intended for the commit. 
4. ask which Project item to associate, and ask if i'm closing the issue.  
- I'll supply a link to a proj issue . 

5. Read the link: Get the name, parent, content and comments, milestone and subissues. 
6. summarize the two as the commit comment (with a link to the proj item, its name and comments, and your original summary)  

4. Supply a comment for the  issue.  
- Give it to me in markdown in DevDocs/Copilot/draft.md

- Use the issue url given by the user
- Use the filename url for fixes with the following path format:
```
    [filename.row:char](https://github.com/username/projname/edit/branchname/pathandfilename)
    [TechSetup.256:0](https://github.com/pashute/ooWaa.ai/edit/Feature/workspace-setup/DevDocs/Copilot/TechSetup.md]    
```
- Comment format in markdown:  

- Project Changes:
- Issue: [#36](https://github.com/users/pashute/projects/1/views/1?pane=issue&itemId=154241894&issue=pashute%7CooWaa.ai%7C36)):
- Status:  Done and Closed /  Keep Open
- Changes for:
    - **Project:** e.g. oowaa.ai
    - **Issue:** e.g. [#36 Techsetup.md changes](https://github.com/users/pashute/projects/1/views/1?pane=issue&itemId=154241894&issue=pashute%7CooWaa.ai%7Cnn)  
    [Subissues: a, b, c]
      
    - **Branch:** e.g. Feature/workspace-setup
    - **Commit:** e.g. [b8f3b60](https://github.com/pashute/ooWaa.ai/commit/b8f3b60)
- 1. **Project Changes**
     - [v] e.g. Updated with Traycer
     - [v] e.g. Compared and completed 
- 2. **File Changes:**  
    e.g. Cosmetics: 
    - [TechSetup.md:256.0](https://github.com/pashute/ooWaa.ai/blob/feature/wspStup/DevDocs/Copilot/TechSetup.md)
    - [chats.md:13.44](https://github.com/pashute/ooWaa.ai/blob/feature/workspace-setup/DevDocs/Copilot/chats.md)
    e.g. fixed part of [bug42] stuck on same thread: 
    - [index.jsx:11.0](https://github.com/pashute/ooWaa.ai/blob/feature/wspStup/src/humANDai/index.jsx)

