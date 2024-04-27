import { io } from "socket.io-client";
import { useState, useEffect } from 'react'
import './App.css'
import { Button, Input } from "@material-tailwind/react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setusername] = useState('');
  const [msg, setmsg] = useState('');
  const [data_rcv, setdata_rcv] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([])

  const sendMessage = () => {
    if (username && msg) {
      const createdTime = Date.now();
      socket.emit('send_message', {
        username: username,
        message: msg,
        createdTime: createdTime
      });
      setmsg('');
    }
  }
  useEffect(() => {
    socket.on("online-users", (data) => {
      setOnlineUsers(data);
    });
    return () => {
      socket.off("online-users");
    };
  }, []);

  useEffect(() => {
    socket.on("recive_message", (data) => {
      setdata_rcv((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      socket.off("recive_message");
    };
  }, []);

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <>
      <div>

        <div className=" flex">

          <div className="p-3 w-72">
            <h3 className="font-bold pb-2">Online Users Socket Id</h3>
            <div className="rounded-md  overflow-y-auto max-h-64" style={{
              border: '1px solid black',
              padding: '10px'
            }}>
              {onlineUsers.map((user, index) => (
                <div key={index} className="">
                  {index + 1}.&nbsp;
                  <span >{user}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='p-3 w-72'>
            <h3 className="font-bold p-2">Send your Message</h3>
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
                <span>[{formatDate(msg.createdTime)}]</span> &nbsp;
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
