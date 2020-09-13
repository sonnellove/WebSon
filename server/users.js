const users = [];

const addUser = ({ socketId, name, roomId, writer }) => {
  name = name.trim().toLowerCase();
  roomId = roomId.trim().toLowerCase();

  const existingUser = users.find((user) => user.roomId === roomId && user.name === name);

  if(!name || !roomId) return { error: 'Username and roomId are required.' };
  
  if(existingUser){
      const index = users.findIndex((user) => user.writer.name === writer.name);
      if(index !== -1) users.splice(index, 1)[0];
  } 

  const user = { socketId, name, roomId, writer };

  users.push(user);

  return { user };

}

const removeUser = (socketId) => {
  const index = users.findIndex((user) => user.socketId === socketId);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (socketId) => users.find((user) => user.socketId === socketId);

const getUsersInRoom = (roomId) => users.filter((user) => user.roomId === roomId);

const Allusers = () => users
module.exports = { addUser, removeUser, getUser, getUsersInRoom, Allusers};