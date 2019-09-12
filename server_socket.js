const server = require("http").createServer();

let users = [];

const io = require("socket.io")(server, {
  path: "/",
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

io.on("connection", socket => {
  console.log(users);
  users.push({ id: socket.id, object: socket });

  socket.on("onRecive", data => {
    console.log(data);
    if (users.length > 0) {
      for (let i = 0; i < users.length; i++) {
        console.log(users[i].id);
        io.to(users[i].id).emit("onRecive", data);
      }
    }
  });

  socket.on("disconnect", reason => {});
});

// setTimeout(() => {
//   for (let index = 0; index < users; index++) {
//     console.log(i);
//     io.to(users[i].id).emit("message", "for your eyes only");
//   }
// }, 1000);

server.listen(3000);
