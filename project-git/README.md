# Git and GitHub Project

Below is a list of basic Git commands.

## Starting a Git and GitHub Project
| Command | Explanation |
|--------|-------------|
| **git config --global user.name "username"** | sets the Git username for the machine |
| **git config --global user.email "name@email.com"** | sets the Git email for the machine |
| **git init** | initializes a Git project |
| **git add .** or **git add index.html** | stages files for commit |
| **git commit -m "message"** | commits changes with a message |
| **git remote add** | adds a remote repository (GitHub/GitLab) |

## Collaborating on a Git Project
| Command | Explanation |
|--------|-------------|
| **git clone** | clones/copies a remote repository |
| **git status** | shows modified or staged files |
| **git log** | shows the commit history |
| **git remote -v** | displays the project's remote repositories |
| **git push** | sends changes to the remote repository |
| **git pull** | fetches and merges changes from the remote |

## Going Back in Time
| Command | Explanation |
|--------|-------------|
| **git revert ID** | undoes the changes of a specific commit by creating a new one |
| **git reset --hard ID** | removes all commits after the specified commit ID |
| **git commit --amend -m "update"** | edits the last commit message |

# Additional Resources

- `README.md`
- `.gitignore` (e.g., `/folder`, `file.txt`, `*.js`, `*/js`)

> Sincerely, @mateusmaciel460.