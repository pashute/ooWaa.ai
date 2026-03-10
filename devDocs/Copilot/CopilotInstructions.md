# Copilot Instructions (Long Responses)
**Version:** 1.0.0  
**Last Updated:** 2026-02-04
## Working Context First
- Always ask what I’m working on at the start of a new task.
- Ask for the GitHub Project item link and the related issue/PR link (if any).
- If I provide a Project item or issue link, treat it as the source of truth for scope.

## Long Discussions
- Use [devDocs/Copilot/chats.md](devDocs/Copilot/chats.md) to keep a running summary of long discussions.
- When a discussion gets long or complex, summarize decisions, open questions, and next steps there.
- Keep summaries concise and actionable.

## Commits and Pushes
When I ask you to commit:
1. if I didn't also say to push, verify if I meant commit and push.

2. You can use devDocs/Copilot/devflow.md for all of the following if needed. You may write and erase it at will. 
Keep them in github for development consistency. 

3. Remember your suggested summary intended for the commit. 
4. ask which Project item to associate, and ask if i'm closing the issue.  
- I'll supply a link to a proj issue . 
4.1 When asking for issue and subject, suggest the current issue and propose a commit message that includes the issue link plus your short summary.

5. Read the link: the name parent, content and comments. 
6. summarize the two as the commit comment (with a link to the proj item, its name and comments, and your original summary)  

4. Supply a comment for the  issue.  
- Give it to me in markdown (in the chat not in the file)
so that i can copy it easily from the chat's vscode copilot interface 
into the github item comment.
- Use the issue file path given by the user
- Use the filename paths for fixes with the following path format:
```
    [filename.row:char](https://github.com/username/projname/edit/branchname/pathandfilename)
    [TechSetup.256:0](https://github.com/pashute/ooWaa.ai/edit/Feature/workspace-setup/devDocs/Copilot/TechSetup.md]    
```
- Comment format in markdown:  

- Project Changes:
- Issue: [#36](https://github.com/users/pashute/projects/1/views/1?pane=issue&itemId=154241894&issue=pashute%7CooWaa.ai%7C36)):
- Status:  Done and Closed /  Keep Open
- Changes for:
    - **Project:** e.g. oowaa.ai
    - **Issue:** e.g. [#36 Techsetup.md changes](https://github.com/users/pashute/projects/1/views/1?pane=issue&itemId=154241894&issue=pashute%7CooWaa.ai%7Cnn)  
    - **Branch:** e.g. Feature/workspace-setup
    - **Commit:** e.g. [b8f3b60](https://github.com/pashute/ooWaa.ai/commit/b8f3b60)
- 1. **Project Changes**
     - [v] e.g. Updated with Traycer
     - [v] e.g. Compared and completed 
- 2. **File Changes:**  
    e.g. cosmetics: 
    - [TechSetup.md:256.0](https://github.com/pashute/ooWaa.ai/blob/feature/wspStup/devDocs/Copilot/TechSetup.md)
    - [chats.md:13.44](https://github.com/pashute/ooWaa.ai/blob/feature/workspace-setup/devDocs/Copilot/chats.md)
    e.g. fixed part of [bug42] stuck same thread
    - [index.jsx:11.0](https://github.com/pashute/ooWaa.ai/blob/feature/wspStup/src/humANDai/index.jsx)
5. If it is the closing of a parent with subprojects, also add the instruction to move them all with a remark in each to see parent comment. 
