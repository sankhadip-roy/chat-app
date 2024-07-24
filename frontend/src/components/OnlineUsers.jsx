import { io } from "socket.io-client";
import { useState, useEffect } from 'react';
const socket = io.connect("http://localhost:3001");

export default function OnlineUsers() {
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        socket.on("online-users", (data) => {
            setOnlineUsers(data);
        });
        return () => {
            socket.off("online-users");
        };
    }, []);

    return (
        <>
            <div className="p-3 w-72">
                <h3 className="font-bold pb-2">Online Users Socket Id [{onlineUsers.length}]</h3>
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
        </>
    )
};