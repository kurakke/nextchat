import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Home() {
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);

  const handleSendMessage = () => {
    socket.emit("sendYahharo", { message: message });
    setMessage("");
  };
  socket.on("receiveYahharo", (data) => {
    console.log(data);
    setList([...list, data]);
  });
  const yahharo = "yahharo-";
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h2>チャット</h2>
        <div className={styles.chatInputButton}>
          <input
            type="text"
            placeholder="チャット"
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <button onClick={() => handleSendMessage()}>送信</button>
        </div>
        {list.map((item, index) => (
          <div className={styles.chatArea} key={index}>
            {item.message}
          </div>
        ))}
      </div>
    </div>
  );
}
