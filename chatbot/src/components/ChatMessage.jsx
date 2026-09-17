import robotPic from '../assets/connor.webp'
import userPic from '../assets/fish.jpg'
import './ChatMessage.css';

export function ChatMessage({ message, sender }) {
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
                            <img src={robotPic} className="image-robot" />
                        )}
                        <div className="message">{message}</div>
                        {sender === "user" && (
                            <img src={userPic} className="image-user" />
                        )}
                    </div>
                );
            }