

const express = require('express');
const path  = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
  maxHttpBufferSize: 1e8 // 100 MB
});


app.use(express.static(path.join(__dirname,"/public")));


io.on("connection", (socket) => {
  socket.on('file',({data,filename,roomID})=>{
    io.to(roomID).emit('file',{data,filename,});
  });

  socket.on('joinRoom',(roomID)=>{
    socket.join(roomID);
    console.log(roomID)
  })
});

server.listen(9000,() => console.log('server listening on 9000'));