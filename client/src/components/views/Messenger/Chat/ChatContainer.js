import React from 'react'
import Chat from './Chat'
import { connect, useDispatch } from "react-redux"

function ChatContainer({ user, chats, location }) {
    const dispatch = useDispatch();
    // const { name, room } = queryString.parse(location.search);
    return (
        <>
            {user.userData && <Chat location={location} chats={chats} user={user}/>}
        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
        chats: state.chat
    }
}

export default connect(mapStateToProps)(ChatContainer);
