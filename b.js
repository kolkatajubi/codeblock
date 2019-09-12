var socket = require("socket.io-client")("http://localhost:3000");
socket.on("connect", function() {
  console.log("connected");
});
let id = "b";
socket.on("event", function(data) {
  console.log("event" + JSON.stringify(data, null, 3));
});

socket.on("onRecive", function(data) {
  //   console.log("Messsage Recived ===>" + JSON.stringify(data, null, 3));
  if (data.id == id) {
    console.log("message recieved" + JSON.stringify(data));
    setTimeout(() => {
      socket.emit("onRecive", {
        id: "a",
        message: " hello  from b" + new Date().getTime()
      });

      socket.emit("onRecive", {
        id: "c",
        message: " hello  from b" + new Date().getTime()
      });
    }, 5000);
  }
});

socket.on("disconnect", function() {});
