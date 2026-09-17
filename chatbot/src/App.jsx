import { useState} from 'react'
import './App.css'
import { ChatInput } from './components/ChatInput'
import  ChatMessages  from './components/ChatMessages'

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
