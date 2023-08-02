
const socket = io();

const roomID = document.getElementById("room").value;
const join = document.getElementById("join");
const out = document.getElementById("output");
const download = document.getElementById("download-btn");
let recievedData = {};

function downloadFile(data, filename) {
    const blob = new Blob([data]);
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  
    // Clean up the object URL after download
    URL.revokeObjectURL(url);
  }

socket.on('file',({data,filename}) =>{
    const file = new File([data],filename)
    console.log(file.length);   
    console.log("file recieved")


})

join.addEventListener("click", () =>{
  console.log("joined ");
    socket.emit('joinRoom',roomID)
})

download.addEventListener("click", () =>{
  downloadFile(recievedData.data, recievedData.filename)
})