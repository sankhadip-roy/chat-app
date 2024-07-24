import { io } from "socket.io-client";
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Input } from "@material-tailwind/react";
import '.././App.css'

import OnlineUsers from "./OnlineUsers";

//recoil related import
import { useRecoilValue } from 'recoil';
import { userloggedin } from '../atom/userAtom'

const socket = io.connect("http://localhost:3001");

export default function App() {
    const [msg, setmsg] = useState('');
    const [data_rcv, setdata_rcv] = useState([]);

    const loggedUser = useRecoilValue(userloggedin);
    const [username, setusername] = useState('anonymous'); //used to set atom value initially then if the user want to change the name he/she can


    const sendMessage = () => {
        if (username && msg) {
            const createdTime = Date.now();
            let usernameCondition = "";
            if (loggedUser != 'anonymous-not-loggedin') {
                usernameCondition = loggedUser;
            }
            else {
                usernameCondition = username + ' (not loggedin)';
            }
            socket.emit('send_message', {
                username: usernameCondition,
                message: msg,
                createdTime: createdTime
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

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    return (
        <>
            <div>
                {loggedUser == 'anonymous-not-loggedin' ? (
                    <div>
                        &nbsp;&nbsp; <a href="http://localhost:5173/register">Register</a> &nbsp;&nbsp;
                        <a href="http://localhost:5173/login">Login</a>
                    </div>
                ) : (
                    <div>&nbsp; &nbsp; User logged in as : {loggedUser}</div>
                )}


                <div className=" flex">
                    <div>
                        <OnlineUsers />
                    </div>

                    <div className='p-3 w-72'>
                        <h3 className="font-bold p-2">Send Your Message</h3>

                        {loggedUser == 'anonymous-not-loggedin' ? (
                            <div>
                                <div>&nbsp; Message without signing in</div>
                                <div className="p-2">
                                    <Input label="Set custom username" value={username} onChange={(e) => setusername(e.target.value)} />
                                </div>
                            </div>
                        ) : (
                            <div>&nbsp; User logged in as : {loggedUser}</div>
                        )}


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
};
