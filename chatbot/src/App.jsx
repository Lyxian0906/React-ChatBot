import { useState, useEffect, useRef } from 'react'
import {Chatbot} from 'supersimpledev' 
import './App.css'


function ChatInput({ chatMessages, setChatMessages }) {
				const [inputText, setInputText] = useState(""); //the value starts with empty
				function saveInoutText(event) {
					setInputText(event.target.value);
				}

				function sendMessage() {
					const newChatMessages = [
						...chatMessages,
						{
							message: inputText,
							sender: "user",
							id: crypto.randomUUID(),
						},
					];
					//Wesave the new chat messages in the varible
					setChatMessages(newChatMessages);

					const response = Chatbot.getResponse(inputText); //This will gives us a response when we text (responses are in the chatbot.js)
					setChatMessages([
						...newChatMessages,
						{
							message: response,
							sender: "robot",
							id: crypto.randomUUID(),
						},
					]);

					setInputText(""); //This will remove the input text from the text box, but won't update the html
				}
				return (
					<div className="input-container1">
						<input
							placeholder="Send a message"
							size="30"
							onChange={saveInoutText}
							value={inputText} //If we set now inputText to be empty will make the box to be empty
							className="chat-input"
						/>
						<button onClick={sendMessage} className="send-button">
							Send
						</button>
					</div>
				);
			}

			function ChatMessage({ message, sender }) {
				//const {message, sender} = props

				//If sender is robot, we put the image of a , we change the side of the image by putting first the
				//Shortcut below
				/*
							if (sender === "robot") {
								return (
									<div>
										<img src="Photos/connor.webp" width="50" />
										{message}
									</div>
								);
							}
			*/

				//Else we just put the other image
				//&& if the value on the left is true then the result will be the vaule on the right
				return (
					<div
						className={
							sender === "user" ? "chat-message-user" : "chat-message-robot"
						}
					>
						{sender === "robot" && (
							<img src="Photos/connor.webp" className="image-robot" />
						)}
						<div className="message">{message}</div>
						{sender === "user" && (
							<img src="Photos/fish.jpg" className="image-user" />
						)}
					</div>
				);
			}

			function ChatMessages({ chatMessages }) {
				const chatMessagesRef= useRef(null);
				useEffect(() =>{
					const containerElem= chatMessagesRef.current;
					if(containerElem){
						containerElem.scrollTop = containerElem.scrollHeight;
					}
				}, [chatMessages])
				return (
					<div className="chat-messages-container" ref={chatMessagesRef}>
						{chatMessages.map((chatMessage) => {
							return (
								<ChatMessage
									message={chatMessage.message}
									sender={chatMessage.sender}
									key={chatMessage.id}
								/>
							);
						})}
					</div>
				);
			}
      
function App() {
				const [chatMessages, setChatMessages] = useState([
					//We lifted the state up to app component
					{
						message: "Hello Chatbot",
						sender: "user",
						ide: "id1",
					},
					{
						message: "Hello! How can I help u",
						sender: "robot",
						id: "id2",
					},
				]);

				//const [chatMessages, setChatMessages] = array;

				/*
							const chatMessages = array[0];
							const setChatMessages = array[1];
							*/

				return (
					<div className="app-container2">
						<ChatMessages chatMessages={chatMessages} />
						<ChatInput
							chatMessages={chatMessages} //using curly barekts we can save an array into a prop
							setChatMessages={setChatMessages}
						/>
					</div>
				);
			}

export default App
