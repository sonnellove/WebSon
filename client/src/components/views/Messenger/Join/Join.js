// import React, { useState, useEffect } from 'react';
// import { Link, withRouter } from "react-router-dom";
// import { connect, useDispatch } from "react-redux"

// import './Join.css';
// import { getChats } from '../../../../_actions/chat_actions';
// import { getJoinRooms } from '../../../../_actions/joinroom_actions';

// function Join({history, joins, user }) {
//   const dispatch = useDispatch();
//   const [name, setName] = useState('');
//   const [room, setRoom] = useState('n');

//   useEffect(() => {
//     if (user.userData) {
//       setName(user.userData.name)
//     }
//   }, [user.userData])

//   useEffect(() => {
//     dispatch(getJoinRooms())
//   }, [])

//   const onSubmit = (e) => {
//     e.preventDefault()
//     if(!room){
//       alert('Fill in the Blank')
//     // }else if(user.userData.isAuth){
//     //   history.push(`/chat?name=${name}&room=${room}`);
//     }else {
//       alert('Under Maintenance')
//     }
//   }
//   return (
//     <div className="joinOuterContainer">
//       {user.userData &&
//         <div className="joinInnerContainer">
//           <h1 className="heading">Join</h1>
//           {/* <div>
//           <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
//         </div> */}
//           <div>
//             <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
//           </div>
//           <div onClick={onSubmit}>
//             <button className={'button mt-20'} type="submit">Create Room</button>
//           </div>
//           <div className="joinSideContainer">
//             {joins.rooms && joins.rooms.map((room, i) =>
//               <React.Fragment key={i}>
//                 <h3><Link to={`/chat?name=${name}&room=${room.room}`}>Room: {room.room}</Link></h3>
//               </React.Fragment>
//             )}
//           </div>
//         </div>
//       }
//     </div>
//   );
// }

// const mapStateToProps = state => {
//   return {
//     user: state.user,
//     joins: state.join
//   }
// }

// export default connect(mapStateToProps)(withRouter(Join));




import React from 'react'

function Join() {
  return (
    <div>
      Not Done Yet!
    </div>
  )
}

export default Join
