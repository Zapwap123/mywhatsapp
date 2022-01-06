import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  MoreVert,
  SearchOutlined,
  Mic as MicIcon,
  InsertEmoticon as InsertEmoticonIcon,
} from "@material-ui/icons";
import {
  onSnapshot,
  doc,
  orderBy,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

import "./Chat.css";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      onSnapshot(doc(db, "rooms", roomId), (snapshot) => {
        setRoomName(snapshot.data().name);
      });

      onSnapshot(
        collection(db, `rooms/${roomId}/messages`),
        orderBy("timestamp", "desc"),
        (snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        }
      );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed >>> ", input);

    addDoc(collection(db, `rooms/${roomId}/messages`), {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className='chat'>
      <div className='chat_header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className='chat_headerInfo'>
          <h3>{roomName}</h3>
          <p>
            Last seen at{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className='chat_headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className='chat_body'>
        {messages.map((message) => (
          <div
            key={message.timestamp}
            className={`chat_message ${
              message.name == user.displayName && "chat_reciever"
            }`}
          >
            <span className='chat_name'>{message.name}</span>
            {message.message}
            <span className='chat_timestamp'>
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </div>
        ))}
      </div>
      <div className='chat_footer'>
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type a message'
            type='text'
          />
          <button onClick={sendMessage} type='submit'>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
