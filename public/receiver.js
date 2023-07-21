(function () {
  let senderID;
  const socket = io();
  let fileReceived = false; // Flag variable to track file reception

  function generateID() {
    return `${Math.trunc(Math.random() * 999)}-${Math.trunc(Math.random() * 999)}-${Math.trunc(Math.random() * 999)}`;
  }

  document.querySelector("#receiver-start-con-btn").addEventListener("click", function () {
    senderID = document.querySelector("#join-id").value;
    console.log(senderID);
    if (senderID.length === 0) {
      return;
    }
    let joinID = generateID();
    socket.emit("receiver-join", {
      uid: joinID,
      sender_uid: senderID
    });
    document.querySelector(".join-screen").classList.remove("active");
    document.querySelector(".fs-screen").classList.add("active");
  });

  let fileshare = {};

  socket.on("fs-meta", function (metadata) {
    fileshare.metadata = metadata;
    fileshare.transmitted = 0;
    fileshare.buffer = [];

    let el = document.createElement("div");
    el.classList.add("item");
    el.innerHTML = `
      <div class="progress">0%</div>
      <div class="filename">${metadata.name}</div>
    `;
    document.querySelector(".file-list").appendChild(el);

    fileshare.progress_node = el.querySelector(".progress");
    socket.emit("fs-start", {
      uid: senderID
    });
  });

  socket.on("fs-chunk", function (buffer) {
    fileshare.buffer.push(buffer);
    fileshare.transmitted += buffer.byteLength;
    fileshare.progress_node.innerText = `${Math.trunc((fileshare.transmitted / fileshare.metadata.total_buffer_size) * 100)}%`;
    if (fileshare.transmitted === fileshare.metadata.total_buffer_size) {
      fileReceived = true;
      console.log("File received successfully!"); // Set the flag to indicate file reception
      download(new Blob(fileshare.buffer), fileshare.metadata.filename);
      fileshare = {};
    } else {
      socket.emit("fs-start", {
        uid: senderID
      });
    }
  });

  // Function to check if the file is received or not
  function checkFileReceived() {
    if (fileReceived) {
      console.log("File received successfully!");
    } else {
      console.log("File not received yet.");
    }
  }

  // Example usage of the checkFileReceived() function
  setTimeout(checkFileReceived, 5000); // Check file reception status after 5 seconds
})();
