import React from 'react';

import Message from './Message/Message';

import './Messages.css';

const Messages = ({ userName, messages  }) => (
  <div className="messages">
    {messages.map((chat, i) => <div key={i}><Message text={chat.message} userName={userName} name={chat.writer.name}/></div>)}
  </div>
);

export default Messages;