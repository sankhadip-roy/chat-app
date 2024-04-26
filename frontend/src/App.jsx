import { io } from "socket.io-client";
import { useState, useEffect } from 'react'
import './App.css'
const socket = io.connect("http://localhost:3001");


function App() {
  const [username, setusername] = useState('');
  const [msg, setmsg] = useState('');

  const [data_rcv, setdata_rcv] = useState([]);
  const sendMessage = () => {
    socket.emit('send_message', {
      username: username,
      message: msg
    });
  }
  useEffect(() => {
    try {
      socket.on("recive_message", (data) => {
        setdata_rcv((state) => [
          ...state,
          {
            username: data.username,
            message: data.message
          }
        ])
      });
    } catch (error) {
      console.log(error)
    }
  }, [socket])
  return (
    <>
      <div className='App'>
        <div className='typeMessage'>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setusername(e.target.value)} /> <br />
          <input type="text" placeholder='Write your message' value={msg} onChange={(e) => setmsg(e.target.value)} />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div>
          {data_rcv.map((msg, i) => (
            <div>
              {i}.
              <span>{msg.username}</span> :
              <span>{msg.message}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
