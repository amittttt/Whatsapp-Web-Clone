import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import db from './Firebase';
import './SidebarChat.css';

function SidebarChat({id,name, addNewChat }) {
  
  const [seed, setSeed] = useState("");
  const [lastmessage, setLastMessage] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
    db.collection("rooms").doc(id).collection("message").orderBy("timestamp","desc").onSnapshot(snapshot => setLastMessage(snapshot.docs.map(doc => doc.data())))
  },[]);

  const createChat = () => {
    const roomName = prompt('Please enter name for chat');
    alert(roomName);
    if(roomName){
        db.collection('rooms').add({
        name:roomName
      })
    }
  };

  // console.log(lastmessage);
  
  return !addNewChat ? (

    <Link to={`/room/${id}`}>
        <div className='sidebarChat'>
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
          
          <div className='sidebarChat_info'>
            <h2>{ name }</h2>
            <p>{ lastmessage[0]?.message }</p>
          </div>
          
        </div>
    </Link>
  ): (
    <div onClick={createChat} className='sidebarChat'>
       <h2>Add new chat</h2>
    </div>
  );
}

export default SidebarChat