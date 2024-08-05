import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material'
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './Chat.css'
import { db } from './firebase';
import { useStateValue } from './StateProvider';

function Chat() {

    const [input, setInput] = useState('');

    const [seed, setSeed] = useState('');

    const { roomId } = useParams();

    const [roomName, setRoomName] = useState('');

    const [messages, setMessages] = useState([]);

    const [{ user }, dispatch] = useStateValue();


    useEffect(() => {

        if (roomId) {

            (async () => {

                const docRef = doc(db, "rooms", roomId)
                const docSnap = await getDoc(docRef)

                setRoomName(docSnap.data().name)

                const mesRef = collection(db, "rooms", roomId, "messages")
                const q = query(mesRef, orderBy("timestamp", "asc"))
                // const mesSnap = await getDocs(q)
                // const docs = mesSnap.docs.map(doc => {
                //     const data = doc.data()
                //     return data


                // })
                // console.log("data", docs)

                // setMessages(docs)

                onSnapshot(q, (snapshot => {
                    // setMessages(snapshot.docs.data())
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                }))

            })()


        }
    }, [roomId])



    useEffect(() => {

        setSeed(Math.floor(Math.random() * 5000))

    }, [roomId])

    const sendMessage = (e) => {

        e.preventDefault();
        // console.log("You typed >>>>", input)
        (async () => {
            await addDoc(collection(db, "rooms", roomId, "messages"), {
                message: input,
                name: user.displayName,
                timestamp: serverTimestamp()
            })
            // document.location.reload(false)
        })()

        setInput('')

    }


    return (
        <div className='chat'>
            <div className='chat__header'>

                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className='chat__headerInfo'>
                    <h3>{roomName}</h3>
                    <p>Last seen at {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>

                <div className='chat__headerRight'>

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
            <div className='chat__body'>
                {
                    messages.map(message => (
                        <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                            <span className='chat__name'>{message.name}</span>

                            {message.message}
                            <span className='chat__timestamp'>
                                {new Date(message?.timestamp?.toDate()).toUTCString()}
                            </span>
                        </p>
                    ))
                }

            </div>
            <div className='chat__footer'>

                <InsertEmoticon />

                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a message' type='text' />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>

                <Mic />

            </div>
        </div>
    )
}

export default Chat