# React Notes — Lesson 2: Props, starting Chatbot

**Project:** Chatbot
**Continues from:** Lesson 1 (React Basics, JSX)

---

## Components

- **Component** = a piece of website.
- When building websites is better to split up web into components.

→ If we have nothing inside an input, wee can self close the tag `<input />`.

We can insert a function into the div: `{function()}`

### Component syntax

A component **is creating ur HTML own elements** → **Main Idea of React**.

```jsx
function ChatInput() {
  return (
    <>
      <input placeholder="Send a message" size="30" />
      <button>Send</button>
    </>
  );
}
```

And then we use it like a normal html tag:

```jsx
const app = <ChatInput />;
```

> ### Important
> **Component must start with a capital letter.**
>
> - `<ChatInput />` → React knows it's our component.
> - `<chatInput />` → React thinks it's a normal html tag and it doesn't work.

A component is just a **function that returns JSX**. Rules to remember:

- It has to `return` something (JSX or `null`).
- It can only return **one** element at the top → that's why we use the Fragment.

---

## Fragment `<>` `</>`

It allow us to group elements together without creating an extra div.

```jsx
// with div → an extra div appears in the html
function ChatInput() {
  return (
    <div>
      <input placeholder="Send a message" />
      <button>Send</button>
    </div>
  );
}

// with fragment → clean html, no extra div
function ChatInput() {
  return (
    <>
      <input placeholder="Send a message" />
      <button>Send</button>
    </>
  );
}
```

---

## Place Holder

```jsx
<input placeholder="  " />
```

→ We can also add `size=" "`: how many characters can get into.

```jsx
<input placeholder="Send a message" size="30" />
```

---

## Components are meant to be reused

**Props** = objects, we can access our attributes of the "call".

So the attributes we write when we **call** the component arrive inside the function as an object called `props`.

```jsx
function ChatMessage(props) {
  const message = props.message;

  return (
    <div>
      {message}
      <img src="Photos/fish.jpg" width="50" />
    </div>
  );
}
```

And when we use it:

```jsx
<ChatMessage message="Hello Chatbot" />
<ChatMessage message="Hello! How can I help u" />
```

Here `props` is the object:

```javascript
{ message: 'Hello Chatbot' }
```

Same component, different text → that's the reuse.

### Extra info about props

- We can send more than one prop:

```jsx
function ChatMessage(props) {
  return (
    <div>
      {props.message}
      <img src={props.image} width="50" />
    </div>
  );
}

<ChatMessage message="Hello Chatbot" image="Photos/fish.jpg" />
<ChatMessage message="Hello! How can I help u" image="Photos/robot.png" />
```

- If the value is **not a string**, we need curly braces:

```jsx
<ChatMessage message="Hi" width={50} isUser={true} />
```

- Props are **read only**. Inside the component we don't change them, the one who calls the component decides the value.

---

## Full code of the chatbot (Lesson 2)

```html
<!doctype html>
<html>
  <head>
    <title>Chatbot</title>
  </head>
  <body>
    <div class="js-container"></div>

    <script src="script.js"></script>
    <script src="https://unpkg.com/supersimpledev/react.js"></script>
    <script src="https://unpkg.com/supersimpledev/react-dom.js"></script>
    <script src="https://unpkg.com/supersimpledev/dayjs.js"></script>

    <script src="https://unpkg.com/supersimpledev/babel.js"></script>

    <script type="text/babel">
      function ChatInput() {
        return (
          <>
            <input placeholder="Send a message" size="30" />
            <button>Send</button>
          </>
        );
      }

      function ChatMessage(props) {
        const message = props.message;

        return (
          <div>
            {message}
            <img src="Photos/fish.jpg" width="50" />
          </div>
        );
      }

      const app = (
        <>
          <ChatInput />
          <ChatMessage message="Hello Chatbot" />
          <ChatMessage message="Hello! How can I help u"/>
        </>
      );

      const container = document.querySelector(".js-container");
      ReactDOM.createRoot(container).render(app);
    </script>
  </body>
</html>
```

---

## What's next (Lesson 3 idea)

Right now the messages are written by hand inside `app`. The next step is **State / Hooks**, so when we press Send the message gets added by itself instead of us writing the `<ChatMessage />` every time.
