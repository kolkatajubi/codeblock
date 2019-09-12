var socket = require("socket.io-client")("http://localhost:3000");
socket.on("connect", function() {
  console.log("connected");
});
socket.on("event", function(data) {
  console.log("event" + JSON.stringify(data, null, 3));
});

socket.on("onRecive", function(data) {
  //   console.log("Messsage Recived ===>" + JSON.stringify(data, null, 3));
  if (data.id == "a") {
    console.log("message recieved" + JSON.stringify(data));
    setTimeout(() => {
      socket.emit("onRecive", {
        id: "b",
        message: " hello  from a " + new Date().getTime()
      });
    }, 5000);
  }
});

setInterval(() => {
  socket.emit("onRecive", { id: "b", message: " hi " + new Date().getTime() });
}, 10000);

socket.on("disconnect", function() {});
