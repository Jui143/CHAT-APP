import React, { useState, useRef, useEffect } from "react";
import "../Styles/Chat.css";
import Navbar from "../Components/Navbar";

export default function Chat() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Add user message
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "I'm a bot! How can I help?", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="chat-container">
        {/* Chat Messages */}
        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="chat-footer">
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button className="send-btn" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}
