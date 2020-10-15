import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [rooms,setRooms] = useState([])
    const [{user},dispatch] = useStateValue()
     useEffect(()=>{
        db.collection('rooms').onSnapshot(snapshot=>{
            setRooms(snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data(),
            })))
        })
    })
    return (
        <div className='sidebar'>
           <div className="sidebar__header">
               <Avatar src={user?.photoURL} />
               <div className="sidebar__headerRight">
                   <IconButton>
                       <DonutLargeIcon  className="sidebar__icon"/>
                   </IconButton>
                   <IconButton>
                       <ChatIcon className="sidebar__icon"/>
                   </IconButton>
                   <IconButton>
                       <MoreVertIcon className="sidebar__icon"/>
                   </IconButton>
               </div>
           </div>
           <div className="sidebar__search">
               <div className="sidebar__searchInput">
                   <SearchIcon/>
                   <input type="text" placeholder="Search or start chat"/>
               </div>
           </div>
         <div className="sidebar__chats">
             <SidebarChat addNewChat/>
             {rooms.map(room=>(
                 <SidebarChat key={room.id} id={room.id} name={room.data.rooms}/>
             ))}
           
         </div>
         
        </div>
    )
}

export default Sidebar
