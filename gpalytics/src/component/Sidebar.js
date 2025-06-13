import React, { useState } from 'react';
import './Sidebar.css';
import SendButton from './Sendbutton';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [message, setMessage] = useState([]);

  const sendMessage = async () => {
    if (text.trim() !== '') {
      const userMessage = text;
      setMessage(prev => [...prev, `🧑 ${userMessage}`]);
      setText("");

      try {
        const res = await fetch('http://localhost:5000/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: userMessage }),
        });

        const data = await res.json();
        const botResponse = data.response || "❌ Unable to process query.";
        setMessage(prev => [...prev, `🤖 ${botResponse}`]);
      } catch (e) {
        console.error(e);
        setMessage(prev => [...prev, "🤖 Server Error."]);
      }
    }
  };

  return (
    <>
      <div className='chat-button'>
        <button onClick={() => setIsOpen(true)}>📋</button>
      </div>

      <div className={`chat-sidebar ${isOpen ? 'open' : ''}`}>
        {isOpen && (
          <>
            <div className="close-btn" onClick={() => setIsOpen(false)}>X</div>
            <p className='paragraph'>Ask Me Anything....🤖</p>

            <div className="messages">
              {message.length > 0 ? (
                message.map((msg, index) => <p key={index} className="message">{msg}</p>)
              ) : (
                <p className="message">No messages yet</p>
              )}
            </div>

            <div className="input-container">
              <input
                className="Input"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write something..."
                onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
              />
              <SendButton sendMessage={sendMessage} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
