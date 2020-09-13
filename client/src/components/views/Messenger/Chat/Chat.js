import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Input from '../Input/Input';
import './Chat.css';
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import TextContainer from "../TextContainer/TextContainer";
import { connect, useDispatch } from "react-redux"
import { getChats, afterPostChatMessage } from "../../../../_actions/chat_actions";

let socket;

function Chat({ chats, user, location }) {
  const [firstname, setFirstName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://192.168.43.36:5000/';
  const dispatch = useDispatch();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    console.log(socket)
    setRoomId(room);
    setFirstName(name)

    const variables = {
      writer: user.userData,
      roomId: room
    }
    console.log('***********')
    console.log(variables)
    if(user.userData !== undefined){
    socket.emit('join', { name,  writer: user.userData._id, room, variables }, (error) => {
      const variables = {
        room: room
      }
      dispatch(getChats(variables))


      if (error) {
        alert(error);
      }
    });
  }else{
    alert("Login First")
  }
    return () => {
      socket.emit('disconnect')
      socket.off();
    }

  }, [ENDPOINT, location.search]);

  useEffect(() => {

    socket.on('message', message => {
      console.log('[...messages]')
      console.log(message)
      // setMessages(messages => [...messages, message]);
      updateChat(message)
    });

    socket.on("roomData",  roomData => {

      console.log('==users')
      console.log(roomData.users)
      setUsers(roomData);
    });
  }, []);

  // const userRoom = users && users.map(user =>

  //   console.log('user----', user.writer.name)
  // )
  const updateChat = (messageFromBackEnd) => {
    dispatch(afterPostChatMessage(messageFromBackEnd));
  }

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      const variables = {
        writer: user.userData._id,
        message: message,
      };
      socket.emit('sendMessage', variables, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={roomId} />
        {user.userData && chats.chats && <Messages messages={chats.chats} userName={user.userData.name} />}
        <Input user={user} message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
       <TextContainer users={users} />
    </div>
  )
}

export default Chat;
