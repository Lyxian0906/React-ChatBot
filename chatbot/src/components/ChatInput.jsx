import { useState} from 'react'
import {Chatbot} from 'supersimpledev' 

export function ChatInput({ chatMessages, setChatMessages }) {
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
