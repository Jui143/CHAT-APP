import React, { useState, useRef, useEffect } from "react";
import "../Styles/Chat.css";
import Navbar from "../Components/Navbar";
import { FaUserCircle } from "react-icons/fa";

export default function Chat() {
  const [messages, setMessages] = useState({}); // Store messages for each user
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const chatEndRef = useRef(null);

  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages[selectedUser?.id]]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === "" || !selectedUser) return;

    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedUser.id]: [
        ...(prevMessages[selectedUser.id] || []),
        { text: input, sender: "user" },
      ],
    }));
    setInput("");

    setTimeout(() => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedUser.id]: [
          ...(prevMessages[selectedUser.id] || []),
          { text: "I'm a bot! How can I help?", sender: "bot" },
        ],
      }));
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="chat-container">
        {/* Sidebar */}
        <div className="chat-sidebar">
          <h3 className="mx-auto my-4">Chats</h3>
          {users.map((user) => (
            <div
              key={user.id}
              className={`d-flex align-items-center chat-user ${
                selectedUser?.id === user.id ? "active" : ""
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <FaUserCircle size={28} className="me-3" />
              {user.name}
            </div>
          ))}
        </div>

        {/* No user selected */}
        {!selectedUser ? (
          <div className="chat-main">
            <div className="no-user">
              <img
                className="image-fluid"
                width="500px"
                src="../src/assets/chatimage.png"
                alt="Chat illustration"
              />
              <h1 className="mt-5">To converse with people on Keeda Chat,</h1>
              <h1 className="mt-3">Click on any user on the sidebar</h1>
            </div>
          </div>
        ) : (
          /* Main Chat Section */
          <div className="chat-main">
            <div className="chat-header">
              <h4>{selectedUser.name}</h4>
            </div>

            <div className="chat-body">
              {(messages[selectedUser.id] || []).map((msg, index) => (
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
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(e)}
              />
              <button className="send-btn" onClick={handleSendMessage}>
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
