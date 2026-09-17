# Connect an existing local folder to a GitHub repo

Use this when you have a project folder on a PC (no `.git` yet, or wrong remote) and want to link it to an existing GitHub repository.

## 1. Set the remote

```bash
git init                     # only if the folder has no .git yet
git remote add origin https://github.com/USERNAME/REPO.git
```

If a remote already exists but points elsewhere:

```bash
git remote set-url origin https://github.com/USERNAME/REPO.git
```

## 2. Fetch the remote historyS

```bash
git fetch origin
```

## 3. Merge your local files with the remote

If you get an error like _"untracked working tree files would be overwritten"_ when trying `git checkout`, it means local files share names with files already on GitHub. Pick one:

**A) Keep your local files (most common)**

```bash
git add .
git commit -m "Local changes from this PC"
git branch -m main
git pull origin main --allow-unrelated-histories
```

Resolve any merge conflicts (look for `<<<<<<<` markers), then:

```bash
git add .
git commit -m "Merge remote and local"
git push origin main
```

**B) Discard local files, use what's on GitHub**

```bash
git stash --include-untracked
git checkout -b main origin/main
```

(Local files are stashed, not deleted — `git stash pop` to bring them back, `git stash drop` to discard.)

## 4. Normal daily workflow (both PCs)

```bash
git pull            # get latest changes before working
# ...edit files...
git add .
git commit -m "message"
git push             # send changes up
```

## 5. First-time setup on a new PC

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

Use a **Personal Access Token** or **SSH key** for authentication (GitHub no longer accepts plain passwords).

## Stuck in a text editor (Vim) after pull/merge?

A blank-ish screen with `~` down the left = Vim, asking for a commit message.

- **Save & exit:** `Esc` → type `:wq` → `Enter`
- **Exit without saving:** `Esc` → type `:q!` → `Enter`
- **Stuck in a pager** (like `git log`): press `q`
