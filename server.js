const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});


const onStart = (socket)=>{
	socket.on("join-room", room => {
		socket.join(room);
	});
	socket.emit("chat-bot", "Welcome to chat")
	socket.broadcast.emit("chat-bot", "A user has joined the chat")
}


io.on("connection", socket => {

	socket.on("disconnect", () => {
		io.emit("userLeft", "User has left")
	});

	socket.on("send-url", (id, room) => {
		io.to(room).emit("recv-url", id);
	});
	socket.on("send-data", (data, room) => {
		io.to(room).emit("recv-data", data);
	});
	socket.on("send-seek", (num, room) => {
		io.to(room).emit("recv-seek", num);
	});
	socket.on("send-rate", (rate, room) => {
		io.to(room).emit("recv-rate", rate);
	});
	socket.on("buffer-send", (play, room) => {
		io.to(room).emit("buffer-recv", play);
	});

	onStart(socket);
});

server.listen(5000 , () => {
	console.log(`Server started on port 5000`);
});
