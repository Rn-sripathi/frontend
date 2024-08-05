import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import './Home.css';
import gptLogo from '../../assets/cube.svg';
import addBtn from '../../assets/add-30.png';
import msgIcon from '../../assets/message.svg';
import sendBtn from '../../assets/send.svg';
import userIconscg from '../../assets/kindpng_104902.svg';

import { useNavigate } from "react-router-dom";



import useFetchSessions from "../hooks/GetAllSessions";


function Home() {
   const [query, setQuery] = useState('');
   const [chatHistory, setChatHistory] = useState([]);
   const [firstSearch, setFirstSearch] = useState(false);
   const [currentSessionId, setCurrentSessionId] = useState("firstSession");

   const token = localStorage.getItem("token");



   const handleInputChange = (e) => {
      setQuery(e.target.value);
   };

   // Handle search
   const handleSearch = async () => {
      //  e.preventDefault();
      if (query.trim() === '') return; // Avoid empty queries
      try {
         const response = await axios.post("http://localhost:8081/api/query/llmquery", {
            query: query,
            current_session_id: currentSessionId
         }, {
            headers: {
               Authorization: token
            }
         });
         setChatHistory(response.data);
         setQuery(''); // Clear the input field

         if (response.data.length === 1) {
            setFirstSearch(true);
         }
      } catch (error) {
         console.error('Error fetching search results:', error.message);
      }
   };
   // Function to handle Enter key press
   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         handleSearch();
      }
   };

   // Load all the session details
   const { sessionData, dataFetched, error } = useFetchSessions(token, firstSearch);
   console.log("Ansnsnsnsn")
   if (error) console.error(error);

   // Get the latest SessionId.
   useEffect(() => {
      if (dataFetched && sessionData.length > 0) {
         try {
            const newSessionId = sessionData[0].sessionId;
            setCurrentSessionId(newSessionId);
            handleClick(newSessionId);
         } catch (err) {
            console.error(err);
         }
      } else return;
   }, [dataFetched, sessionData]);

   // Transform session data(questions) from objects to string.
   const transformData = (data) => {
      return data.map(session => ({
         sessionId: session.sessionId,
         questions: session.questions.map(q =>
            Object.values(q).filter(value => value === q.question).join('')
         )
      }));
   };
   // console.log(transformData(sessionData));

   // Create new Session & get sessionId.
   const newSession = async () => {
      if (sessionData[sessionData.length - 1].questions.length > 0) {  // Returns the function without exicution if the previous session is empty
         try {
            const response = await axios.post("http://localhost:8081/api/query/createNewSession", {}, {
               headers: {
                  Authorization: token
               }
            })
            setCurrentSessionId(response.data.newSessionId);
            // console.log(response.data.newSessionId);
            setChatHistory([]);
         } catch (err) {
            console.error(`Error Message :\n    ${err}`);
         }
      } else return;
   }

   // Get Session Details.
   const handleClick = async (sessionId) => {
      // console.log(`Session ID clicked: ${sessionId}`);
      // Call your function with the sessionId
      try {
         const response = await axios.post("http://localhost:8081/api/query/getSessionDetails", {
            session_to_change_id: sessionId
         }, {
            headers: {
               Authorization: token
            }
         });
         setChatHistory(response.data);
         setCurrentSessionId(sessionId);
      } catch (err) {
         console.error(`Error Fetching Session Details :\n ${err}`);
      }
   };

   return (
      <div className="App">
         <div className="sideBar">
            <div className="upperSide">
               <div className="upperSideTop">
                  <img src={gptLogo} alt="GPT Logo" className="logo" />
                  <span className="brand">materiAl</span>
               </div>
               <button className="midBtn" onClick={newSession}>
                  <img src={addBtn} alt="new chat" className="addBtn" />
                  Chat
               </button>
               <div className="upperSideBottom">
                  {transformData(sessionData).map((session) => (
                     <button
                        key={session.sessionId}
                        className={`query ${session.sessionId === currentSessionId ? 'active' : ''}`}
                        onClick={() => handleClick(session.sessionId)}
                     >
                        <img src={msgIcon} alt="Query" />
                        {session.questions[0].length > 15 ? `${session.questions[0].substring(0, 20)}...` : session.questions[0]}
                     </button>
                  ))}
               </div>
            </div>
         </div>
         <div className="main">
            <div className="chats">
               <div className='chat-log'>
                  {chatHistory.map((chat, index) => (
                     <>
                        <div key={index} className='chat-message'>
                           <div className='avatar'>
                              <img src={userIconscg} alt="GPT Logo" className="avatar-logo" />
                           </div>
                           <div className='message'>
                              {chat.question}
                           </div>

                        </div>
                        <div key={index} className='chat-message'>
                           <div className='avatar'>
                              <img src={gptLogo} alt="user logo" className="avatar-logo" />
                           </div>
                           <div className='message'>
                              {chat.answer}
                           </div>
                        </div>
                     </>
                  ))}
               </div>
            </div>
            <div className="chatFooter">
               <div >
                  <div className="inp">
                     <textarea

                        placeholder="Type here ......"
                        value={query}
                        onChange={handleInputChange}
                        rows={1} // Start with one row
                        onKeyDown={handleKeyDown} // Capture Enter key press
                     />
                     <button type="submit" onClick={handleSearch} className="send">
                        <img src={sendBtn} alt="send" />
                     </button>
                  </div>
               </div>
               <p>This may produce incorrect results</p>
            </div>
         </div>
      </div>
   );
}

export default Home;