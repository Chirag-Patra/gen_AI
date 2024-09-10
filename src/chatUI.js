import React, { useState } from 'react';
import './chatUI.css';
import './normalize.css';
import bot from '../src/spinnerLogo.png';
import user from '../src/user.jpg';
import axios from 'axios';

const ChatUI = () => {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]); // State to keep track of chat messages
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to track loading state

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!input.trim()) return; // Prevent empty messages

    const newChatLog = [...chatLog, { sender: 'user', message: input }];// Add user's message to chat log
    setChatLog(newChatLog);
    
    setInput(''); // Clear the input field

    setIsLoading(true); // Set loading state to true

    try {
      // Simulate API call
      const res = await axios.post('http://localhost:5000/get_response', { input });
      const botResponse = res.data.response;

      // Add bot's response to chat log
      setChatLog([...newChatLog, { sender: 'bot', message: botResponse }]);
    } catch (err) {
      setError('Error communicating with backend');
      console.error(err);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  }

  const handleNewChat = () => {
    setChatLog([]); // Clear chat log
    setError(''); // Clear any existing error message
  };

  return (
    <div className="App">
      
      {/* <aside className='sidemenu'>
        <h1>SideBar</h1>
        
         
      </aside>  */}
      
      <section className='chatbox'> 
      <button className="new-chat-button" onClick={handleNewChat} style={{width:'200px',height:'50px',position:'fixed',bottom: '15px',left: '30px'}}>
         + New Chat
        </button>
       
        
        <div className='chat_log'>
          {chatLog.map((chat, index) => (
            <div key={index} className={`chat_message ${chat.sender === 'bot' ? 'ai' : ''}`}>
              <div className='chat_message_center'>
                <div className='avatar'>
                  <img 
                    src={chat.sender === 'bot' ? bot : user} 
                    className={chat.sender === 'bot' ? 'bot' : 'user'} 
                    alt={chat.sender === 'bot' ? "Bot Avatar" : "User Avatar"}  
                    width={chat.sender === 'bot' ? 35 : 42} 
                    height={chat.sender === 'bot' ? 35 : 42} 
                  />
                </div>
                <div className='message'>
                  {chat.message}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chat_message ai">
              <div className='chat_message_center'>
                <div className='avatar'>
                  <img src={bot} className='bot' alt="Bot Avatar" width={35} height={35} />
                </div>
                <div className='message'>
                  <div className="loading-indicator">Loading...</div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="chat_text_input">
          <form onSubmit={handleSubmit}>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className='chat_input'
              placeholder='Type your message here'
              rows="1"
            />
          </form>
        </div>
        {error && <p className="error-message">{error}</p>}
      </section>
    </div>
  );
};

export default ChatUI;