# React Notes — Lesson 3: State, Event Handlers

**Date:** 09/16/2026
**Project:** Chatbot
**Continues from:** Lesson 2 (Props, starting Chatbot)

---

## Storing the messages in an array

Instead of "manually" storing messages, we're gonna save them in an **array**, and then use **map** to access them using a function on it.

```javascript
const chatMessages = [
  { message: 'Hello Chatbot', sender: 'user' },
  { message: 'Hello! How can I help u', sender: 'robot' }
];
```

```javascript
array.map((variable) => {
  return ...;
});
```

> **What map does** is that he grab a parameter of the list and store it in the value we have on the brakets. And then we return the value.

Little example:

```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map((number) => {
  return number * 2;
});
// doubled = [2, 4, 6]
```

→ map **doesn't modify** the original array, it creates a new one with the returned values.

---

## Storing values from the map

To access a specific value, we have to use a way, because we can't store the full "chatMessage" value.

So instead to store each = sender and message, we need to do:

```jsx
{chatMessages.map((chatMessage) => {
  return (
    <ChatMessage
      message={chatMessage.message}
      sender={chatMessage.sender}
    />
  );
})}
```

Now the html is created from the array. If we add one more object to the array, one more message appears by itself.

---

## Keys

Each item need to have an unique ID (**key**).

```jsx
{chatMessages.map((chatMessage) => {
  return (
    <ChatMessage
      message={chatMessage.message}
      sender={chatMessage.sender}
      key={chatMessage.id}
    />
  );
})}
```

- The key goes in the **component we return inside the map**, not inside the component's own html.
- React uses the key to know which item changed, so it doesn't redraw everything.

Sometimes we won't be able to make the ID unique. To create an unique ID we can use te JS function:

```javascript
crypto.randomUUID()
// '3f7c1a92-0b4e-4c8f-9d2a-6e5b1c0a7f43'
```

```javascript
const chatMessages = [
  { message: 'Hello Chatbot', sender: 'user', id: crypto.randomUUID() },
  { message: 'Hello! How can I help u', sender: 'robot', id: crypto.randomUUID() }
];
```

> Don't use `crypto.randomUUID()` **inside** the map, because then the key changes every time React redraws and it loses the point.

---

## Event Handler

Event Handlers run a function when we interact with the website.

```jsx
onClick={ }   →  camelCase
```

- We don't run the function like `___()`. **We can't use `()`**.
- We give the function, we don't call it. React calls it later when the click happens.

```jsx
function ChatInput() {
  function sendMessage() {
    console.log('Send button clicked');
  }

  return (
    <>
      <input placeholder="Send a message" size="30" />
      <button onClick={sendMessage}>Send</button>
    </>
  );
}
```

```jsx
<button onClick={sendMessage}>Send</button>    // correct
<button onClick={sendMessage()}>Send</button>  // wrong, it runs when the page loads
```

Other common ones: `onChange`, `onKeyDown`, `onMouseOver`. All camelCase.

---

## State

**State is data that is connected to the html.**

If we change a normal variable, the html doesn't change. If we change a state, React updates the html by itself.

### How to convert a variable to state?

By using: `React.useState()` → here we put the info (the starting value).

```jsx
const array = React.useState('');
```

- In the array the first value `[0]`, is the **current data**.
- The `[1]`, is the **function that updates data** (updater function).

```jsx
const array = React.useState('');
const inputText = array[0];
const setInputText = array[1];
```

And with destructuring (Lesson 2 shortcut), the way we normally write it:

```jsx
const [inputText, setInputText] = React.useState('');
```

---

## We shouldn't modify the data directly

- In react we shouldn't update the data directly. If we do it manually, react **won't** update the html.
- We should allways modify a **copy**.

```jsx
// wrong
chatMessages.push(newMessage);

// correct
setChatMessages([...chatMessages, newMessage]);
```

- To copy an array → `...arrayName` (spread).

```javascript
const copy = [...chatMessages];        // same items, new array
const bigger = [...chatMessages, newMessage];  // copy + the new one
```

Same idea with objects:

```javascript
const newObject = { ...oldObject, sender: 'robot' };
```

---

## Full code of the chatbot (Lesson 3)

```html
<!doctype html>
<html>
  <head>
    <title>Chatbot</title>
  </head>
  <body>
    <div class="js-container"></div>

    <script src="https://unpkg.com/supersimpledev/react.js"></script>
    <script src="https://unpkg.com/supersimpledev/react-dom.js"></script>
    <script src="https://unpkg.com/supersimpledev/dayjs.js"></script>
    <script src="https://unpkg.com/supersimpledev/babel.js"></script>

    <script type="text/babel">
      function ChatInput({ chatMessages, setChatMessages }) {
        const [inputText, setInputText] = React.useState('');

        function saveInputText(event) {
          setInputText(event.target.value);
        }

        function sendMessage() {
          const newChatMessages = [
            ...chatMessages,
            {
              message: inputText,
              sender: 'user',
              id: crypto.randomUUID()
            }
          ];

          setChatMessages(newChatMessages);
          setInputText('');
        }

        return (
          <>
            <input
              placeholder="Send a message"
              size="30"
              onChange={saveInputText}
              value={inputText}
            />
            <button onClick={sendMessage}>Send</button>
          </>
        );
      }

      function ChatMessage({ message, sender }) {
        return (
          <div>
            {sender === 'robot' && (
              <img src="Photos/robot.png" width="50" />
            )}
            {message}
            {sender === 'user' && (
              <img src="Photos/fish.jpg" width="50" />
            )}
          </div>
        );
      }

      function ChatMessages({ chatMessages }) {
        return (
          <>
            {chatMessages.map((chatMessage) => {
              return (
                <ChatMessage
                  message={chatMessage.message}
                  sender={chatMessage.sender}
                  key={chatMessage.id}
                />
              );
            })}
          </>
        );
      }

      function App() {
        const [chatMessages, setChatMessages] = React.useState([
          { message: 'Hello Chatbot', sender: 'user', id: 'id1' },
          { message: 'Hello! How can I help u', sender: 'robot', id: 'id2' }
        ]);

        return (
          <>
            <ChatMessages chatMessages={chatMessages} />
            <ChatInput
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
            />
          </>
        );
      }

      const container = document.querySelector('.js-container');
      ReactDOM.createRoot(container).render(<App />);
    </script>
  </body>
</html>
```

### What's happening here

1. `chatMessages` is state, so when it changes React redraws the messages by itself.
2. The input also has it's own state (`inputText`), saved with `onChange`.
3. When we click Send, we make a **copy** of the array with the new message inside, and we give it to `setChatMessages`.
4. The state lives in `App` because both `ChatMessages` and `ChatInput` need it → we pass it down with props.

---

## What's next (Lesson 4 idea)

The chatbot still doesn't answer. Next step is making the robot respond (and probably `useEffect` to scroll down automatically and dayjs to put the time on each message).


NOT RIGHT UPDATE CODE