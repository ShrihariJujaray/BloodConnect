import React, { useState } from "react";
import "./ChatBox.css"; // We'll style it separately

const ChatBox = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { type: "ai", text: "Hi there! How can I help you today?" },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Push user message
    const newMessages = [...messages, { type: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate AI response (replace this with actual API call)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "This is a dummy response 😄" },
      ]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat-box-container">
      <div className="chat-header">
        <span>AI Chat Assist</span>
        <button onClick={onClose}>✖</button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
