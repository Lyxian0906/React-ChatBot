# React Notes — Lesson 1: React Basics, JSX

**Date:** 09/14/2025
**Project:** Chatbot
**React version used:** 3.2.1 

---

## Before starting

- React is written with **JavaScript**, but you can also use **TypeScript**.

### React Full Course — what we're gonna learn

- Set up React with JS
- JSX, components
- State, Hooks
- Proper React set up
- Routing
- Automated Testing
- React with Backend
- Deploy React with AWS
- React with TypeScript
- React with AI

---

## External libraries

If inside the `<script>` tag we put a JS website, we can use it as an **external library** instead of creating a file locally.

> **External library** = code that's outside our computer.

**React is an external library** → we can load it's code and use it.

Right for the chatbot proyect, I'm gonna use version **3.2.1** of React.

```html
<script src="script.js"></script>
<script src="https://unpkg.com/supersimpledev/react.js"></script>
<script src="https://unpkg.com/supersimpledev/react-dom.js"></script>
<script src="https://unpkg.com/supersimpledev/dayjs.js"></script>
```

### Why 2 library's of React?

- **react.js** → is designed to be used in websites an mobile apps.
- **react-dom.js** → features specifics to websites.

| Where | What we load |
|---|---|
| For websites | react.js and react-dom.js |
| For mobile | react.js and React Native |

---

## ReactDOM.createRoot()

`ReactDOM.createRoot()` = sets up React.

To set up React, we most give it an **html** element (container). Everything inside will be organized by React.

```html
<body>
  <div class="js-container"></div>
</body>
```

```jsx
const container = document.querySelector('.js-container');
ReactDOM.createRoot(container).render(app);
```

- **Render** = to display something.

---

## Babel external library

- **Babel** = JavaScript compiler.

While using React, we don't use normal JS, we use like an enhaced version of it: **(JSX)** | JS but we can write html on it.

We can create a button inside a const.

```jsx
const button = <button>Send</button>;
```

→ Same as using JS with the DOM, but with JSX it's like a short cut.

**The long way (normal JS + DOM):**

```javascript
const button = document.createElement('button');
button.innerText = 'Send';
document.querySelector('.js-container').appendChild(button);
```

**The JSX way:**

```jsx
const button = <button>Send</button>;
ReactDOM.createRoot(document.querySelector('.js-container')).render(button);
```

---

## Problems with JSX

- Our web browser doesn't understand JSX.
- We need to translate it to normal JS (**Babel**).

### How we can traslate normal JSX into JS with Babel

- We need to suround the thing we want to traslate within a `<script>` tag, and then use the `type="text/babel"`.

```html
<script src="https://unpkg.com/supersimpledev/babel.js"></script>

<script type="text/babel">
  // here we can write JSX and Babel traslates it
  const app = <p>Hello Chatbot</p>;
</script>
```

> Important: the babel.js script must be loaded **before** the `type="text/babel"` script, if not there's nothing to traslate it.

---

## Render

We can display more elements using `<div>` (container).

We can put element inside the same constant if it's not a div.

```jsx
const app = (
  <div>
    <input placeholder="Send a message" />
    <button>Send</button>
  </div>
);

const container = document.querySelector('.js-container');
ReactDOM.createRoot(container).render(app);
```

- If we try to render 2 elements next to each other without a container → it doesn't work.
- Later (Lesson 2) we learn the **Fragment** `<> </>` so we don't need the extra div.

---

## Extra info (useful to remember)

- Inside JSX we use `className` instead of `class`, because `class` is already a reserved word in JS.

```jsx
const app = <div className="chat-message">Hello Chatbot</div>;
```

- We can put JavaScript inside JSX using curly braces `{ }`.

```jsx
const name = 'Lyx';
const app = <p>Hello {name}</p>;
```

- `.render()` only needs to be called once for the app. React takes care of updating what's inside.

---

## Full code of the lesson (starting point of the chatbot)

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
      const app = (
        <div>
          <input placeholder="Send a message" size="30" />
          <button>Send</button>
        </div>
      );

      const container = document.querySelector('.js-container');
      ReactDOM.createRoot(container).render(app);
    </script>
  </body>
</html>
```
