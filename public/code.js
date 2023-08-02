const socket = io();

const join = document.getElementById("join");
const  fileInput = document.getElementById("input-file");

function generateID() {
  return `${Math.trunc(Math.random() * 999)}-${Math.trunc(Math.random() * 999)}-${Math.trunc(Math.random() * 999)}`;
}
let RoomID = generateID();
document.querySelector("#join-id").innerHTML = 
`<b>Room ID</b>
<span>${RoomID}</span>`



function sendFile(file, RoomID){
  console.log(RoomID)
  const reader = new FileReader();
  reader.onload = (event) =>{
    const binaryData = event.target.result;
    socket.emit('file', { data: binaryData, filename: file.name,RoomID });
  }
  reader.readAsArrayBuffer(file);
}

fileInput.addEventListener("change", (event) => {
  console.log("file recieved input")
  const file = event.target.files[0];
  
  sendFile(file,roomID);
})

