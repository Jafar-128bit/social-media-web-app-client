import './messageText.css';

type Prop = {
    message: string;
    messageType: "error" | "warning" | "info" | "normal";
}

const MessageText = ({messageType, message}: Prop) => {
    return <p className={`messageText ${messageType}`}>
        * {message}
    </p>
}

export default MessageText;