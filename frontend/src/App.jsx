import { io } from "socket.io-client";
import { useState, useEffect } from 'react'
import './App.css'

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setusername] = useState('');
  const [msg, setmsg] = useState('');

  const [data_rcv, setdata_rcv] = useState([]);
  const sendMessage = () => {
    if (username && msg) {
      socket.emit('send_message', {
        username: username,
        message: msg
      });
      setmsg('');
    }
  }
  useEffect(() => {
    socket.on("recive_message", (data) => {
      setdata_rcv((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      socket.off("recive_message");
    };
  }, []);
  return (
    <>
      <div className='App'>
        <div className='typeMessage'>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setusername(e.target.value)} /> <br />
          <input type="text" placeholder='Write your message' value={msg} onChange={(e) => setmsg(e.target.value)} />
          <button onClick={sendMessage}>Send</button>
        </div>
        <h3>Chat Room</h3>
        <div style={{
          border: '1px solid black',
          padding: '10px'
        }}>
          {data_rcv.map((msg, i) => (
            <div key={i}>
              {i + 1}.&nbsp;
              <span>{msg.username}</span> : &nbsp;
              <span>{msg.message}</span>
            </div>
          ))}
        </div>
      </div >
    </>
  )
}

export default App;
