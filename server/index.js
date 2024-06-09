const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const socket = require('socket.io');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connnection failed"));

app.get('/', (req, res) => {
  res.send('Welcome !\n Ayush Tripathi');
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});


const io = socket(server,{
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    }  
});
global.onlineUser = new Map();
io.on('connections',(socket)=>{
    console.log('connected');
    global.chatSocket = socket;
    socket.on('add-user',(data)=>{
        console.log(data);
        onlineUser.set(data,socket.id);
    })
    socket.on('send-message',(data)=>{
        console.log(data);
        // io.to(onlineUser.get(data.to)).emit('receive-message',data);
        const sendUserSocket = onlineUser.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit('msg-recieved', data.msg);
        }
    })
    socket.on('disconnect',()=>{
        console.log('disconnected');
    })
})