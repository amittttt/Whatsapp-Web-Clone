import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import "./Sidebar.css";
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from './Firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase/compat/app';

export default function Sidebar() {

    const [rooms, setRooms] = useState([]);

    const[{user}, dispatch] = useStateValue();

    useEffect(() => {
      db.collection('rooms').onSnapshot((snapshot) => {
        setRooms(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })))
      })
    },[])
    
    console.log(rooms);

    return(
        <div className='sidebar'>
            <div className='sidebar_header'>
                <Avatar src={user.photoURL} onClick={ e => firebase.auth().signOut()} />

                <div className="sidebar__headerRight">
                    <IconButton>
                       <DonutLargeIcon />
                    </IconButton>
                    
                    <IconButton>
                      <ChatIcon />
                    </IconButton>
                    
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                </div>

            </div>
            
            <div className='sidebar_search'>
                <div className='sidebar_searchContainer'>
                    <SearchOutlined />
                    <input type="text" placeholder='Search or start new chat' />
                </div>
            </div>

            <div className='sidebar_chats'>
                <SidebarChat addNewChat/>
                {
                    rooms.map(room => {
                       return <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                    })
                }
                {/* <SidebarChat />
                <SidebarChat /> */}
            </div>
            {/* <h1>Sidebar</h1> */}
        
        </div>
    )
}