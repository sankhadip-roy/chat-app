import styles from './styles.module.css';
import MessagesRecieved from './messages';
import SendMessage from './send-message';

const Chat = ({ username, room, socket }) => {
    return (
        <div className={styles.chatContainer}>
            <div>
                <MessagesRecieved socket={socket} />
                <SendMessage socket={socket} username={username} room={room} />
            </div>
        </div>
    );
};

export default Chat;