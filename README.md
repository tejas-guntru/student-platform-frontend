# Frontend collaboration guide

## Person 1: Frontend developer

### First-time setup

Install Git and Node.js, then open PowerShell and run:

```powershell
git clone https://github.com/tejas-guntru/student-platform-frontend.git
cd student-platform-frontend
npm ci
```

Ask the project owner for the required `.env.local` settings privately. Login and other features also need a working backend.

Start the frontend:

```powershell
npm run dev
```

Open http://localhost:3000. Press **Ctrl+C** to stop it.

### Every time you work

Open PowerShell inside your `student-platform-frontend` folder.

Before editing, download the latest code:

```powershell
git switch main
git pull --ff-only origin main
```

Edit the files. When finished, check the build:

```powershell
npm run build
```

If the build passes, save and upload your changes:

```powershell
git add .
git diff --cached --stat
git commit -m "Describe what you changed"
git push origin main
```

Tell the project owner that your changes are pushed.

Never commit `.env.local`, passwords, or API keys. If Git reports a conflict or rejects a command, stop and send the owner the output.

## Person 2: Project owner

### Use your configured integration folder

Your subtree setup is in:

```powershell
cd C:\Users\NITYARADHANA\student-platform-sync
```

Use this folder for the commands below.

### Receive frontend changes

First, check that your working folder is clean:

```powershell
git status
```

If it reports uncommitted changes, save those before continuing.

Update the original project, then import the frontend developer’s changes:

```powershell
git switch main
git pull --ff-only origin main
git subtree pull --prefix=frontend frontend-origin main
```

The imported files appear inside `frontend/`.

Check the frontend:

```powershell
cd frontend
npm ci
npm run build
cd ..
```

If everything looks correct, upload the combined project:

```powershell
git push origin main
```

**Pushing to the original project’s `main` can trigger its configured CI and deployment.**

### Send your own frontend changes back

If you edit frontend files in `student-platform-sync`, commit them:

```powershell
git add frontend
git commit -m "Describe the frontend update"
```

Import any changes the frontend person pushed before sending yours:

```powershell
git subtree pull --prefix=frontend frontend-origin main
```

Then update both repositories:

```powershell
git subtree push --prefix=frontend frontend-origin main
git push origin main
```

The frontend person receives your updates by running:

```powershell
git pull --ff-only origin main
```

## Remember

- Frontend developer: normal `git pull` and `git push`.
- Project owner: `git subtree pull` and `git subtree push` for frontend sharing.
- Sync is manual.
- Run commands one at a time. Stop on errors.
- Don’t use force-push for routine syncing.
