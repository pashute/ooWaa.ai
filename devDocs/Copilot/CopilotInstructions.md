# Copilot Instructions (Long Responses)

**Version:** 2.0.0  
**Last Updated:** 2026-03-18

## Working Context First

- Always ask what the developer is working on at the start of a new task. Don't just read the task and start doing. Unless instructed in advance with something like "just go ahead". or "no need for confirmation".
- Ask for the GitHub Project item link and the related issue/PR link (if any).
- If the developer provided a Project item or issue link, treat it as the source of truth for scope.

## Long Discussions

- Use [devDocs/Copilot/chats.md](devDocs/Copilot/chats.md) to keep a running summary of long discussions.
- When a discussion gets long or complex, summarize decisions, open questions, and next steps there.
- Keep summaries concise and actionable.
- tick off or delete what was already discussed.

## Commits and Pushes

When the developer asks you to commit:

1. if the developer didn't also say to push, verify if the developer meant commit and push.

2. Use [devDocs/Copilot/devflow.md](devDocs/Copilot/devflow.md) for all of the following if needed. You may write and erase it at will.

3. Keep chats.md and devflow.md in github for development consistency.

4. You also have draft.md which you can use for anything, erase and rewrite it at will. its yours. The developer does care if you save it in git or not. Better yes so we have it for next features.

5. When commiting:

- ask developer which Project task (github project issue) to associate with the commit.
- write the summary in the commit message.
- and ask developer if we're closing the issue.
- ask for the github task (issue) link if not given

## Closing issues

6. If the developer asks to close the current issue:

### 6.1 Issue verification

- Issues are closed only upon developer request
- Verify with the developer that the correct issue number and name are being closed.
- Read the link: the name, parent, content and comments.
- Verify that all was done.
- Verify that all was checked in.

### 6.2 Commit comment

Summarize github task, and summarize the commits for this task, without detail. The commit message should be short.

### 6.3 Issue comment

Supply the developer with a comment for the issue closure.

- Give it to the developer in raw markdown (in the chat not in the file)
  so that developer can easily copy it from the chat's vscode copilot interface into the github item comment.
- Use the issue file path given by the user
- Use the filename paths for fixes with the following path format:

```
    [filename.row:char](https://github.com/username/projname/edit/branchname/pathandfilename)
    [TechSetup.256:0](https://github.com/pashute/ooWaa.ai/edit/Feature/workspace-setup/devDocs/Copilot/TechSetup.md]
```

- Comment format in markdown:

- Project Changes:
- Issue: [#36](https://github.com/users/pashute/projects/1/views/1?pane=issue&itemId=154241894&issue=pashute%7CooWaa.ai%7C36)):
- Status: Done and Closed / Keep Open
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
