import { Avatar, Button, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './Chat.css'
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { Link, useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase'
import { useStateValue } from './StateProvider';
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
function Chat() {
    const {roomId} = useParams()
    const [messages,setMessages] = useState([])
    const [roomName,setRoomName] = useState("") 
    const [seed,setSeed] = useState("")
    const [input,setInput] = useState("")
    const [{user},dispatch] = useStateValue()
    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
                setRoomName(snapshot.data().rooms)
            ))

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot=>{
                setMessages(snapshot.docs.map(doc=>doc.data()))
            })
        }
        console.log(roomName)
    },[roomId])

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
    },[roomId])

    const sendMessage=(e)=>{
        e.preventDefault()
        db.collection("rooms").doc(roomId).collection('messages').add({
            name:user?.displayName,
            message:input,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("")
    }
    return (
        <div className="chat">
         <div className="chat__header">
             <Link to="/">
             <ArrowBackIcon/>
             </Link>
            <Avatar src={ `https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="chat__info">
    <h3>{roomName}</h3>
    {/* <p>Last seen {new Date(messages[messages.length-1]?.timestamp).toDateString()}</p> */}
            </div>
            <IconButton>
            <SearchIcon className="chat__icons"/>
            </IconButton>
            <IconButton>
            <AttachFileIcon className="chat__icons"/>
            </IconButton>
            <IconButton>

            <MoreVertIcon className="chat__icons"/>
            </IconButton>
        </div> 
        <div className="chat__body">
            {
                messages.map(message=>(
                    <p className={`chat__message ${message.name===user?.displayName && "chat__reciever"}`}>
                    <span className="chat__name">{message.name}</span> {message.message}
                <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toDateString()}</span>
                </p>
                ))
            }
            
             
           
        </div>
        <div className="chat__footer">
             <IconButton>
            <InsertEmoticonIcon  className="chat__icon"/>

             </IconButton>
             <form >
                 <input value={input} onChange={e=>setInput(e.target.value)} type="text" placeholder="Type a message..."/>
                 <button disabled={!input} onClick={sendMessage} type="submit"><SendIcon className="chat__send"/></button>
             </form>
             {/* <IconButton>

            <MicIcon className="chat__icon"/>
             </IconButton> */}
         </div>
        </div>
    )
}

export default Chat
