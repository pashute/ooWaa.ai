# Dev Flow

**Version:** 1.1.0  
**Last Updated:** 2026-03-19

## ⚠️ DO NOT ERASE until feature/simplePrototype is merged → develop → main (beta release)

### Issue #55 — 6 commits in main NOT in develop (harmless, do not touch)

After merging develop→main on 2026-03-19, `main` is 6 commits ahead of `develop`.
These commits pre-date proper gitflow. They are annotated with `git notes` (run `git log --show-notes` to see).
No action needed — they will naturally merge in when develop next catches up to main.

| Hash      | Commit                                     | Reason                                    |
| --------- | ------------------------------------------ | ----------------------------------------- |
| `35b80cf` | merge: bring develop into main (issue #55) | The catchup merge commit itself           |
| `841259d` | Rename index.js to index.js                | Mistaken move + revert, direct-to-main    |
| `d8e24fd` | Delete issues directory                    | Direct-to-main                            |
| `7a1aef2` | Reopened issue #8                          | Direct-to-main                            |
| `7a1383e` | Merge feature/workspace-setup into develop | GitFlow violation — went to main directly |
| `9c6492b` | Initial commit                             | Pre-gitflow, expected                     |

**To see notes:** `git log --show-notes origin/develop..origin/main`  
**To push notes to remote:** `git push origin refs/notes/commits`
