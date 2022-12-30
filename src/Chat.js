import { Avatar, IconButton } from '@material-ui/core'

import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons';
import MicIcon from "@material-ui/icons/Mic";
import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import './Chat.css'
import db from './Firebase';
import firebase from 'firebase/compat/app';
import { useStateValue } from './StateProvider';

export default function Chat() {
  
  const { roomId } = useParams();
  // console.log(roomId);
  const[roomName, setRoomName] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const[{user}, dispatch] = useStateValue();

  const [seed, setSeed] = useState('');
  
  useEffect(() => {
    setSeed(Math.floor(Math.random()*5000));
  },[]);

  const sendMessage = (e) => {
    e.preventDefault();
    if(input === ""){
      return alert("Please enter your message")
    }
    db.collection("rooms").doc(roomId).collection("message").add({
      name: user.displayName,
      message: input,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    });
    setInput('');
  }

  useEffect(() => {
    if(roomId){
      db.collection("rooms").doc(roomId).onSnapshot(snapshot => {
        setRoomName(snapshot.data().name);
      });
      db.collection('rooms').doc(roomId).collection('message').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => doc.data()));
      })
    }
  },[roomId])
  // console.log(messages);

  return (
    <div className='chat'>
        
        <div className='chat_header'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

          <div className='chat_headerInfo'>
            <h3>{roomName}</h3>
            <p>{
                new Date(messages[messages.length-1]?.timestamp?.seconds*1000).toLocaleTimeString()
                }
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
        
            {
              messages.map(message =>(
                <p className={`chat_message ${user.displayName == message.name && "chat_reciever"}`}>
                <span className='chat_name'>{message.name}</span>
                 {message.message}
                 <span className='chat_timestamp'> 
                 {
                    new Date(message.timestamp?.seconds*1000).
                    toLocaleTimeString()
                 }
                 </span>
             </p>
              ))
            }
            {/* <p className='chat_message'>
               <span className='chat_name'>Dilkhush Meena</span>
                Hey Guys
                <span className='chat_timestamp'> 8:21am</span>
            </p> */}
            {/* <p className='chat_message'>
               <span className='chat_name'>Veeni Mam</span>
                Hii Dilkhush
                <span className='chat_timestamp'> 8:23am</span>
            </p>
            <p className='chat_message 
            chat_reciever'>
               <span className='chat_name'></span>
                Yo guys
                <span className='chat_timestamp'> 8:25am</span>
            </p> */}
        </div>

        <div className='chat_footer'>
            <InsertEmoticon />
            <form>
                <input value={input} onChange={(e) => setInput(e.target.value)} type='text' placeholder='Type a message'/>
                <button type='submit' onClick={sendMessage}>Send a mesaage</button>
            </form>
            <MicIcon />


        </div>

    </div>

  )
}

// export default  Chat();