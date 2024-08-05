import { Avatar } from '@mui/material'
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from './firebase';
import './SidebarChat.css'

function SidebarChat({ id, name, addNewChat }) {


    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('')

    useEffect(() => {
        if (id) {
            const idRef = collection(db, "rooms", id, "messages")
            const q = query(idRef, orderBy("timestamp", "desc"))
            onSnapshot(q, (snapshot => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
            }))
        }
    })

    useEffect(() => {

        setSeed(Math.floor(Math.random() * 5000))

    }, [id])

    const createChat = () => {
        const roomName = prompt("Please enter name for chat room");
        if (roomName) {
            // do something clever stuff.....

            (async () => {

                await addDoc(collection(db, 'rooms'), {
                    name: roomName

                })
                // window.location.reload(true)

            })()
        }
    }
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className='sidebarChat__info'>
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>

    ) : (

        <div onClick={createChat}
            className='sidebarChat'>
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat