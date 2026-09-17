# React Notes — Lesson 4: CSS with React, Hooks (last of chatbot)

**Date:** 09/17/2026
**Project:** Chatbot
**Continues from:** Lesson 3 (State, Event Handlers)

---

## className

In order to create a **class** we can't use `class`, since React has it as a reserved word. We use **className** instead.

```jsx
<div className="chat-input">
  <input placeholder="Send a message" />
  <button className="send-button">Send</button>
</div>
```

```css
.chat-input {
  display: flex;
}
```

- We can't style **Fragments** (`<> </>`), since a Fragment doesn't create a real html element — there's nothing there for CSS to attach to. If we need to style a group of elements, we need a real tag (a `<div>`) instead of a Fragment.

---

## Ternary Operator

```javascript
value1 ? value2 : value3
```

- If `value1` is true → the result is `value2`.
- If `value1` is false → the result is `value3`.

It's like the `&&` from Lesson 2, but with an "else" included.

```jsx
{sender === 'robot' ? (
  <img src="Photos/robot.png" width="50" className="avatar" />
) : (
  <img src="Photos/fish.jpg" width="50" className="avatar" />
)}
```

---

## Overflow: scroll (explained in CSS)

```css
.chat-messages {
  overflow: scroll;
  scrollbar-width: none;
}
```

- `overflow: scroll` → lets the container scroll when the content is too big to fit.
- `scrollbar-width: none` → hides the scrollbar (Firefox). For Chrome/Safari we'd also need `::-webkit-scrollbar { display: none; }`.

---

## Hooks

Hooks let us insert React features into our component.

→ We should put them at the **top** of a component, and they shouldn't go **inside anything** (loops, `if`, functions).

```jsx
function App() {
  // ✅ correct — hooks at the top
  const [chatMessages, setChatMessages] = React.useState([...]);
  React.useEffect(() => { ... }, []);

  // ❌ wrong — hook inside a condition
  if (chatMessages.length > 0) {
    React.useEffect(() => { ... }, []);
  }

  return (...);
}
```

### React.useEffect

```jsx
React.useEffect(() => { }, [chatMessages]);
```

- React will use it **after** a component is created, and **every time** a component is updated (re-rendered).
- The array at the end (`[chatMessages]`) is the list of things it watches — the function only runs again if one of those values changed. An empty array `[]` means "run once, only when the component is first created."

```jsx
function ChatMessages({ chatMessages }) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [chatMessages]);

  return (
    <div className="chat-messages" ref={containerRef}>
      {chatMessages.map((chatMessage) => (
        <ChatMessage
          message={chatMessage.message}
          sender={chatMessage.sender}
          key={chatMessage.id}
        />
      ))}
    </div>
  );
}
```

→ This way, every time `chatMessages` changes (a new message is sent), the effect runs and scrolls down automatically.

### React.useRef

`useRef` automatically saves an html/dom element from the component.

```jsx
useRef(null)
       ↑
  first value, empty
```

```jsx
const containerRef = React.useRef(null);

<div ref={containerRef}>...</div>
```

- We give the ref to the element with the `ref={}` prop.
- After that, `containerRef.current` is the actual DOM element — that's how we can read `scrollHeight` or set `scrollTop` on it directly, without touching `document.querySelector`.
- Unlike state, changing a ref does **not** make React re-render the component — it's just a "box" that holds a value across renders.

---

## Flexbox = containers (code)

- Create a **container** around elements.
- Add `display: flex;` to the container.
- Use **flexbox features** (`flex-direction`, `justify-content`, `align-items`, `gap`...).

```css
.chat-input {
  display: flex;
  gap: 8px;
}
```

**flex-grow** makes an element grow and take remaining space.

```css
.chat-input input {
  flex-grow: 1; /* the input takes all the space left, the button stays its normal size */
}
```

---

## Full chatbot styling example

```jsx
// ChatMessages.jsx
export default function ChatMessages({ chatMessages }) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [chatMessages]);

  return (
    <div className="chat-messages" ref={containerRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <div key={chatMessage.id} className="chat-message">
            {chatMessage.sender === 'robot' ? (
              <img src="Photos/robot.png" width="50" className="avatar" />
            ) : (
              <img src="Photos/fish.jpg" width="50" className="avatar" />
            )}
            {chatMessage.message}
          </div>
        );
      })}
    </div>
  );
}
```

```css
/* ChatMessages.css */
.chat-messages {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: scroll;
  scrollbar-width: none;
  height: 400px;
}
```

```css
/* ChatInput.css */
.chat-input {
  display: flex;
  gap: 8px;
}

.chat-input input {
  flex-grow: 1;
}
```

---

## What's next (Lesson 5)

The chatbot logic and styling are done. Next step is **Proper React Setup** — moving away from the CDN scripts (react.js, babel.js loaded straight in the html) into a real project with Node.js, npm and Vite.
