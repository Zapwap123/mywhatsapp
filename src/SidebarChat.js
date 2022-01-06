import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import {
  onSnapshot,
  doc,
  orderBy,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import db from "./firebase";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      onSnapshot(
        collection(db, `rooms/${id}/messages`),
        orderBy("timestamp", "asc"),
        (snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        }
      );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      addDoc(collection(db, "rooms"), {
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className='sidebarChat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className='sidebarChat_info'>
          <h2>{name}</h2>
          <p>{messages[messages.length - 1]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className='sidebarChat'>
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
