import { io } from "socket.io-client";
import React, { useState, useEffect, useMemo } from 'react';
const socket = io.connect("http://localhost:3001");

const OnlineUsers = React.memo(() => {
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        socket.on("online-users", (data) => {
            setOnlineUsers(data);
        });
        return () => {
            socket.off("online-users");
        };
    }, []);

    const memoizedUsers = useMemo(() => {
        return onlineUsers.map((user, index) => (
            <div key={index} className="">
                {index + 1}.&nbsp;
                <span>{user}</span>
            </div>
        ));
    }, [onlineUsers]);

    return (
        <>
            <div className="p-3 w-72">
                <h3 className="font-bold pb-2">Online Users Socket Id [{onlineUsers.length}]</h3>
                <div className="rounded-md  overflow-y-auto max-h-64" style={{
                    border: '1px solid black',
                    padding: '10px'
                }}>
                    {memoizedUsers}
                </div>
            </div>
        </>
    )
});

export default OnlineUsers;