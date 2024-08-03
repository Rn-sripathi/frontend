import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Home.css';
import gptLogo from '../../assets/cube.svg';
import addBtn from '../../assets/add-30.png';
import msgIcon from '../../assets/message.svg';
import sendBtn from '../../assets/send.svg';
import userIconscg from '../../assets/kindpng_104902.svg';

function Home() {
  const [inputValue, setInputValue] = useState('');
  const [sessions, setSessions] = useState([{ id: 1, queries: [], chatLog: [], firstQuery: '' }]);
  const [currentSessionId, setCurrentSessionId] = useState(1);
  const textareaRef = useRef(null);

  // Handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      const newMessage = { sender: 'user', message: inputValue };

      // Call the LLM API to get a response
      // Function to call the API with retry mechanism
      const callApiWithRetry = async (retries = 3, delay = 2000) => {
        for (let i = 0; i < retries; i++) {
          try {
            const response = await axios.post(
              'https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct', // Replace with your Inference API endpoint
              {
                inputs: inputValue,
                parameters: {
                  max_length: 100 // Adjust this based on your requirements
                }
              },
              {
                headers: {
                  'Authorization': 'Bearer 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', // Replace with your API token
                  'Content-Type': 'application/json',
                },
              }
            );
            console.log('API response:', response.data); // Debugging line
            return { sender: 'gpt', message: response.data[0].generated_text.trim() };
          } catch (error) {
            console.error('Error fetching response from Inference API:', error);
            if (error.response && error.response.data.error.includes('currently loading')) {
              if (i < retries - 1) {
                console.log(`Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
              } else {
                return { sender: 'gpt', message: 'Error: Model is currently loading. Please try again later.' };
              }
            } else {
              if (error.response) {
                return { sender: 'gpt', message: `Error: ${error.response.data.error}` };
              } else if (error.request) {
                return { sender: 'gpt', message: 'Error: No response received from the server.' };
              } else {
                return { sender: 'gpt', message: `Error: ${error.message}` };
              }
            }
          }
        }
      };



      const responseMessage = await callApiWithRetry();
      setSessions(prevSessions => prevSessions.map(session => 
        session.id === currentSessionId 
          ? { 
              ...session, 
              chatLog: [...session.chatLog, newMessage, responseMessage], // Append new message and response
              queries: [inputValue, ...session.queries],
              firstQuery: session.firstQuery || inputValue // Set firstQuery if not already set
            }
          : session
      ));
      setInputValue(''); // Clear input field
    } else {
      alert('Input cannot be empty');
    }
  };

  // Handle new chat creation
  const handleNewChat = () => {
    const newSessionId = sessions.length + 1;
    setSessions([...sessions, { id: newSessionId, queries: [], chatLog: [], firstQuery: '' }]);
    setCurrentSessionId(newSessionId);
  };

  // Switch to a different session
  const handleSessionClick = (sessionId) => {
    setCurrentSessionId(sessionId);
  };

  // Resize textarea based on content
  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Resize textarea whenever inputValue changes
  useEffect(() => {
    resizeTextarea();
  }, [inputValue]);
  
  // Handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const currentSession = sessions.find(session => session.id === currentSessionId);

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="GPT Logo" className="logo" />
            <span className="brand">materiAl</span>
          </div>
          <button className="midBtn" onClick={handleNewChat}>
            <img src={addBtn} alt="new chat" className="addBtn" />
            Chat
          </button>
          <div className="upperSideBottom">
            {sessions.map((session) => (
              <button 
                key={session.id} 
                className={`query ${session.id === currentSessionId ? 'active' : ''}`} 
                onClick={() => handleSessionClick(session.id)}
              >
                <img src={msgIcon} alt="Query" />
                {session.firstQuery.length > 15 ? `${session.firstQuery.substring(0, 20)}...` : session.firstQuery || `Session ${session.id}`}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          <div className='chat-log'>
            {currentSession.chatLog.map((chat, index) => (
              <div key={index} className='chat-message'>
                <div className='avatar'>
                  {chat.sender !== 'gpt' && <img src={userIconscg} alt="user logo" className="avatar-logo" />}
                  {chat.sender === 'gpt' && <img src={gptLogo} alt="GPT Logo" className="avatar-logo" />}
                </div>
                <div className='message'>
                  {chat.message}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="chatFooter">
          <form onSubmit={handleSubmit}>
            <div className="inp">
              <textarea
                ref={textareaRef}
                placeholder="Type here ......"
                value={inputValue}
                onChange={handleInputChange}
                rows={1} // Start with one row
              />
              <button type="submit" className="send">
                <img src={sendBtn} alt="send" />
              </button>
            </div>
          </form>
          <p>This may produce incorrect results</p>
        </div>
      </div>
    </div>
  );
}

export default Home;