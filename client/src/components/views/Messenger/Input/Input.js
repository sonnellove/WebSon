import React from 'react';

import './Input.css';

function Input({ user, setMessage, sendMessage, message }) {

  const onSubmit = (e) => {
    e.preventDefault()
    if(user.userData.isAuth){
      sendMessage(e)
    }else{
      alert("Login First")
    }
  }
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={user.userData.isAuth ? event => event.key === 'Enter' ? sendMessage(event) : null : false}
      />
      <button className="sendButton" onClick={onSubmit}>Send</button>
    </form>
  )
}

export default Input;