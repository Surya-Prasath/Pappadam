const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
// const io = new Server(server);
// const { default: swal } = require("sweetalert");

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});
io.on("connection", socket => {
	console.log(`User ${socket.id} connected`);
	socket.on("disconnect", () => {
		console.log(`User ${socket.id} disconnected`);
	});
	socket.on("send-url", (id, room) => {
		io.to(room).emit("recv-url", id);
	});
	socket.on("send-data", (data, room) => {
		io.to(room).emit("recv-data", data);
		console.log(`sent ${data} to ${room}`);
	});
	socket.on("send-seek", (num, room) => {
		io.to(room).emit("recv-seek", num);
	});
	socket.on("send-rate", (rate, room) => {
		io.to(room).emit("recv-rate", rate);
	});

	socket.on("join-room", room => {
		socket.join(room);
		console.log(`joined ${room}`);
	});
});

server.listen(process.env.PORT || 5000, () => {
	console.log(`Server started on port 5000`);
});
