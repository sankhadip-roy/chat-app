import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3001");
useEffect(() => {
    socket.on("online-users", (data) => {
        setOnlineUsers(data);
    });
    return () => {
        socket.off("online-users");
    };
}, []);