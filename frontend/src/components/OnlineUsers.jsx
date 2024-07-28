import { io } from "socket.io-client";
import React, { useEffect, useMemo } from 'react';
import { useRecoilState } from "recoil";
import { onlineUsersData } from "../atom/onlineUsersAtom";

const socket = io.connect("http://localhost:3001");

const OnlineUsers = React.memo(() => {
    const [onlineUsersList, setOnlineUsersList] = useRecoilState(onlineUsersData);

    useEffect(() => {
        socket.on("online-users", (data) => {
            setOnlineUsersList(data);
        });
        return () => {
            socket.off("online-users"); //run before component removed from the ui
        };
    }, [onlineUsersList]); //tracking onlineUsers array

    const memoizedUsers = useMemo(() => {
        return onlineUsersList.map((user, index) => (
            <div key={index} className="">
                {index + 1}.&nbsp;
                <span>{user}</span>
            </div>
        ));
    }, [onlineUsersList]);

    return (
        <>
            <div className="p-3 w-72">
                <h3 className="font-bold pb-2">Online Users Socket Id [{Math.floor(onlineUsersList.length / 2)}]</h3>
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