# React Notes — Lesson 5: Proper React Setup

**Date:** 09/17/2026
**Project:** Chatbot → moved to a real project: `react-chatbot`

---

## Why change from the CDN scripts?

Until now (Lessons 1–4) we loaded React straight in the html with `<script>` tags pointing to `unpkg.com` and used `type="text/babel"` so the browser could traslate JSX live. That's fine to learn, but it's slow (Babel traslates in real time, in the browser, every time the page loads) and it's not how real projects are set up. From here we use **Node.js** and **Vite**.

---

## Node.js and npm

**Node** let us run JS outside the browser.

**npm** = node package manager.

→ It's an **external library** itself, and it lets us install external librarys into our projects (like React, but properly, as files in our project instead of a CDN link).

```bash
node -v
npm -v
```

---

## Create-vite

- Helps us to set up a new React project.

```bash
npx create-vite@6.5.0
   ↑              ↑
 execute      specific version
```

- `npx` runs a package without installing it globally first.
- `@6.5.0` pins the exact version of `create-vite` we're using, so the setup doesn't change if a newer version comes out later.

After running it and answering the prompts (project name, React, JavaScript/TypeScript), we get a folder with everything already configured — no CDN scripts needed anymore.

```bash
cd react-chatbot
npm install
npm run dev
```

- `npm install` downloads all the dependencies listed in `package.json`.
- `npm run dev` starts the local dev server (usually `http://localhost:5173`).

---

## With Vite we can directly import pictures

```jsx
import robotPhoto from '../../assets/robot.png';

<img src={robotPhoto} width="50" />
```

→ No more `Photos/robot.png` as a plain string path — Vite handles the image as a real import, so it also works correctly when the project gets built for production.

---

## main.jsx

`main.jsx` gives us some additional checks and warnings (this is where `<React.StrictMode>` usually wraps the app, and where `ReactDOM.createRoot` is called once for the whole project).

```jsx
// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

---

## Moving components to their own files, and `export`

When we move a function to it's own separated file, we need to put `export` in front of the function, so Vite knows we're gonna use it (`import`) on other file in the future.

```jsx
// ChatInput.jsx
export function ChatInput({ chatMessages, setChatMessages }) {
  ...
}
```

```jsx
// App.jsx
import { ChatInput } from './components/ChatInput';
```

- `export function X` (named export) → we import it with `{ }`: `import { ChatInput } from './ChatInput'`.
- `export default function X` (default export) → we import it without `{ }`, and we can even rename it: `import ChatMessages from './ChatMessages'`.

---

## Actual project structure

```
react-chatbot/
└── chatbot/
    ├── documents/
    │   ├── connect-folder-to-github.md
    │   ├── lesson-1-react-basics-jsx.md
    │   ├── lesson-2-props-chatbot.md
    │   └── lesson-3-state-event-handlers.md
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── ChatInput.jsx
    │   │   ├── ChatInput.css
    │   │   ├── ChatMessage.jsx
    │   │   ├── ChatMessage.css
    │   │   ├── ChatMessages.jsx
    │   │   └── ChatMessages.css
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── package-lock.json
    └── eslint.config.js
```

Pushed to GitHub: `github.com/Lyxian0906/React-ChatBot`.

---

## Real code from the project (as it is now)

```jsx
// App.jsx
import { useState } from 'react';
import './App.css';
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';

function App() {
  const [chatMessages, setChatMessages] = useState([
    // We lifted the state up to App component
    {
      message: 'Hello Chatbot',
      sender: 'user',
      id: 'id1',
    },
    {
      message: 'Hello! How can I help u',
      sender: 'robot',
      id: 'id2',
    },
  ]);

  // const [chatMessages, setChatMessages] = array;
  /*
    const chatMessages = array[0];
    const setChatMessages = array[1];
  */

  return (
    <div className="app-container2">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages} // using curly brakets we can save an array into a prop
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
```

```jsx
// ChatInput.jsx
export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInoutText(event) {
    setInputText(event.target.value);
  }

  function sendMessage() {
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
      },
    ];

    setChatMessages(newChatMessages);
    setInputText('');
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message"
        size="30"
        onChange={saveInoutText}
        value={inputText} // If we set now inputText to be empty will make the input clear itself
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
    </div>
  );
}
```

> Note: `App.jsx` imports `ChatInput` with `{ }` (named export) and `ChatMessages` without `{ }` (default export) — both work, they're just two different export styles used on purpose in this project.

---

## What's next

The chatbot is now a proper Vite project with real files, imports and a git repo. Possible next steps from here: making the "robot" actually answer something, adding `dayjs` for message timestamps, and moving on to the course's later lessons (Routing, Automated Testing, React with Backend, Deploy with AWS, React with TypeScript, React with AI).
