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

const chat = (socket)=>{
	//sending others message
	socket.on("message", (room, message)=>{
		socket.to(room).emit("chat-bot", message);
	})


}

io.on("connection", socket => {

	//joining room
	socket.on("join-room", (room, prevRoom) => {
		//leaving previous room
		socket.leave(prevRoom)
		console.log("Left "+prevRoom)
		//joining new room
		socket.join(room);
		console.log("Joined "+room)

		socket.emit("chat-bot", "Joined "+room)
	});

	chat(socket)

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
});

server.listen(5000 , () => {
	console.log(`Server started on port 5000`);
});
