import React, { useState } from 'react';
import './Sidebar.css';
import SendButton from './Sendbutton';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [message,setmessage]=useState([]);

  const sendMessage=()=>
  {
    if(text.trim() !== '')
    {
      setmessage([...message,text]);
      setText("");
    }

  }

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
              ) : (<p className="message">No messages yet</p>)}
              </div>
             
            <div className="input-container">
              <input
                className="Input"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write something..."
              />
              {/* SendButton ko props pass kar rahe hain */}
              <SendButton sendMessage={sendMessage} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
