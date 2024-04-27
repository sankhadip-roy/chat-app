import { io } from "socket.io-client";
import { useState, useEffect } from 'react'
import './App.css'
import { Button, Input } from "@material-tailwind/react";

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
      <div>
        <div className='p-3 w-72'>
          <h3 className="font-bold  p-2">Send your Message</h3>
          <div className="p-2">
            <Input label="Username" value={username} onChange={(e) => setusername(e.target.value)} />
          </div>
          <div className="p-2">
            <Input label='Message' value={msg} onChange={(e) => setmsg(e.target.value)} />
          </div>
          <div className="p-2">
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-bold  pb-2">Chat Room</h3>
          <div className="rounded-md" style={{
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
        </div>
      </div>
    </>
  )
}

export default App;
