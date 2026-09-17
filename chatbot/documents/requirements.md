# Requirements — React Chatbot Project

Everything needed to clone, open and run this project on a new machine.

---

## Tools to install

| Tool | Notes |
|---|---|
| **Node.js** | Needed to run npm/npx and the Vite dev server. Install the current LTS version from [nodejs.org](https://nodejs.org). Check it with `node -v`. |
| **npm** | Comes bundled with Node.js. Check it with `npm -v`. |
| **Git** | To clone/push the repo. |
| **VS Code** (or any editor) | Project screenshots use VS Code. |
| **A browser** | Chrome/Edge/Firefox — anything modern (needed for `crypto.randomUUID()`, which requires `https` or `localhost`). |

---

## Project setup (Vite)

This project was created with:

```bash
npx create-vite@6.5.0
```

To recreate a project the same way from scratch:

```bash
npx create-vite@6.5.0 my-project-name
cd my-project-name
npm install
```

Choose **React** as the framework and **JavaScript** as the variant when prompted (this project doesn't use TypeScript yet — that's a later lesson).

---

## Getting this exact project running

```bash
git clone https://github.com/Lyxian0906/React-ChatBot.git
cd React-ChatBot/react-chatbot/chatbot
npm install
npm run dev
```

Then open the local address the terminal prints (usually `http://localhost:5173`).

---

## package.json — key dependencies

These are the kind of dependencies a Vite + React project needs (check the actual `package.json` in the repo for exact installed versions):

```json
{
  "dependencies": {
    "react": "^19.x",
    "react-dom": "^19.x"
  },
  "devDependencies": {
    "vite": "^6.5.0",
    "@vitejs/plugin-react": "^4.x",
    "eslint": "^9.x"
  }
}
```

---

## Useful scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the local dev server with hot reload. |
| `npm run build` | Builds the project for production into `dist/`. |
| `npm run preview` | Serves the production build locally, to test it before deploying. |
| `npm run lint` | Runs ESLint over the project (if configured). |

---

## Notes / gotchas

- `crypto.randomUUID()` only works over `https` or on `localhost` — Vite's dev server runs on `localhost`, so it's fine during development, but check this if the project is ever opened as a plain `file://` html again (like in Lessons 1–4).
- Named vs default exports matter when importing: `export function X` needs `import { X }`, `export default function X` needs `import X` (no braces). Mixing them up is a common error when moving components into their own files.
- Hooks (`useState`, `useEffect`, `useRef`) must be imported from `'react'` directly in a Vite project (`import { useState } from 'react'`), instead of writing `React.useState(...)` like in the CDN version from earlier lessons — both work, but the plain CDN scripts (`react.js`, `react-dom.js`, `babel.js`) are no longer needed here.
