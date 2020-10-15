import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import db from './firebase'
import { Link } from 'react-router-dom'
function SidebarChat({addNewChat,id,name}) {
    const [seed,setSeed] = useState("")
    const [messages,setMessages] = useState([]) 
    const addRoom=()=>{
        const roomName = prompt("Please enter the chat room")
        if(roomName){
        db.collection('rooms').add({
            rooms:roomName,
        })
        }
    }
    useEffect(()=>{
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot=>{
                setMessages(snapshot.docs.map(doc=>doc.data()))
            })
        }

    },[])
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
    },[])
    return !addNewChat? (
        <Link to={`/rooms/${id}`}>
          <div className='sidebarChat'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat__info">
    <h3>{name}</h3>
    <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
      
    ):(
        <div onClick={addRoom} className='sidebarChat'>
            <h2 >Add new chat</h2>
        </div>
    )
}

export default SidebarChat
