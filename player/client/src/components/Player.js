import React, { Fragment, useEffect, useState } from "react";
import { io } from "socket.io-client";
import ReactPlayer from "react-player/vimeo";
import Navbar from "./Navbar";
import SearchUrl from "./SearchUrl";
import "../css/Youtube.css";

const socket = io.connect("http://localhost:5000");

//Declaring states for different events for the player
const Player = () => {
	const [room, setRoom] = useState("");

	const [state, setState] = useState({
		url: "https://vimeo.com/296300999",
		pip: false,
		playing: false,
		controls: true,
		light: false,
		volume: 0.8,
		muted: false,
		played: 0,
		loaded: 0,
		duration: 0,
		playbackRate: 1.0,
		loop: false,
		volumeOpen: false,
		dropdownOpen: false,
		fullscreen: false,
	});

	//state to update current playing time of the video.
	//setSecPlayed is updated in the handleProgress()
	const [secPlayed, setSecPlayed] = useState(0);

	//idk wt it is but helps in seeking of the video in the handleSeekMouseUp()
	const ref = React.createRef();

	const joinRoom = () => {
		socket.emit("join-room", room);
		localStorage.setItem("last-room", room);
		alert(`You've joined the room ${room}`);
	};

	//URL gets updated in the connected players, but gets reverted to the initial state when click played on screen
	const handleUrlChange = e => {
		setState({ ...state, url: e.target.value });
	};

	const handleUrlClick = () => {
		console.log(`send-url${state.url}`);
		socket.emit("send-url", state.url, room);
	};

	const handlePlayPause = () => {
		setState({ ...state, playing: !state.playing });
		// socket.emit("send-data", state.playing, room);
	};

	//When video played, the "send-data" is sent to the server and is then emitted to all connected clients.
	const handlePlay = () => {
		console.log("onPlay");
		socket.emit("send-data", { state: "play", time: secPlayed }, room);
	};

	const handlePause = () => {
		console.log("onPause");
		socket.emit("send-data", { state: "pause", time: secPlayed }, room);
	};

	const handleVolumeChange = e => {
		setState({ ...state, volume: parseFloat(e.target.value) });
	};

	const handleSetPlaybackRate = e => {
		setState({ ...state, playbackRate: parseFloat(e.target.value) });
	};

	const handleOnPlaybackRateChange = speed => {
		setState({ ...state, playbackRate: parseFloat(speed) });
	};

	const handleSeekMouseDown = e => {
		setState({ ...state, seeking: true });
	};

	const handleSeekChange = e => {
		setState({ ...state, played: parseFloat(e.target.value) });
	};

	const handleSeekMouseUp = e => {
		setState({ ...state, seeking: false });
		//executes seek idk how
		ref.current.seekTo(parseFloat(e.target.value));
	};

	const handleProgress = stateIn => {
		console.log("onProgress", stateIn);
		if (!state.seeking) {
			setState({ ...state, ...stateIn });
		}
		//stateIn returns several properties, we take playedseconds from it to update the seconds played
		//NOTE: the handleProgress is called after every second
		setSecPlayed(e => (e = stateIn.playedSeconds));
	};

	const handleEnded = () => {
		console.log("onEnded");
		setState({ ...state, playing: false });
	};

	const handleDuration = duration => {
		console.log("onDuration", duration);
		setState({ ...state, duration });
	};

	const handleOnSeek = e => {
		console.log(`OnSeek ${e}`);
		socket.emit("send-seek", e, room);
	};

	useEffect(() => {
		socket.on("recv-url", urlid => {
			console.log(`recv-url ${urlid}`);
			setState({ ...state, url: urlid });
		});
	}, [socket]);

	useEffect(() => {
		//the "send-data" from a client that is received in the server side is then emitted to all of the clients in the name of "recv-data" and the data is stored in the data object
		socket.on("recv-data", data => {
			if (data.state === "play") {
				alert(`datatime: ${data.time}, secPlayed: ${secPlayed}`);
				//main logic to impement seek:
				//if difference btw the time when pause/play is fired and the current time is more than one, then seek the video to data.time(i.e., the time when play is fired)
				//This logic can work because a seek function consists of a pause, buffer and lastly a play state, so when play state is attained, the video can be seeked
				if (Math.abs(data.time - secPlayed) > 1)
					ref.current.seekTo(parseFloat(data.time));
				setState({ ...state, playing: true });
			} else if (data.state === "pause") {
				setState({ ...state, playing: false });
			}
		});
	}, [socket]);

	return (
		<Fragment>
			<Navbar
				handleRoomChange={e => {
					setRoom(e.target.value);
				}}
				handleRoomClick={joinRoom}
				room={room}
			/>
			<div className='ytplayer frame'>
				<SearchUrl
					url={state.url}
					handleUrlChange={handleUrlChange}
					handleUrlClick={handleUrlClick}
				/>
				<ReactPlayer
					ref={ref}
					url={state.url}
					controls={state.controls}
					playing={state.playing}
					volume={state.volume}
					width={1280}
					height={540}
					onPause={handlePause}
					onPlay={handlePlay}
					playbackRate={state.playbackRate}
					onPlaybackRateChange={handleOnPlaybackRateChange}
					onSeek={handleOnSeek}
					onEnded={handleEnded}
					onProgress={handleProgress}
					onDuration={handleDuration}
					onReady={handlePlayPause}
					onError={e => console.log("onError", e)}
					onBuffer={() => console.log("onBuffer")}
					config={{
						youtube: {
							playerVars: { showinfo: 1 },
						},
					}}
				/>

				{/* <div id='progress'> */}
				{/* <div id='bar'> */}
				<input
					className='progress'
					type='range'
					min={0}
					max={0.999999}
					step='any'
					value={state.played}
					onMouseDown={handleSeekMouseDown}
					onChange={handleSeekChange}
					onMouseUp={handleSeekMouseUp}
				/>
				{/* </div> */}
				{/* </div> */}

				<div className='ctrls'>
					<div className='playPause btn' role='group'>
						<button
							type='button'
							className='btn btn-dark'
							id='play'
							onClick={handlePlayPause}>
							{
								state.playing
									? "Pause"
									: // <i className='fa fa-solid fa-pause'></i>
									  "Play"
								// <i className='fa fa-solid fa-play'></i>
							}
						</button>
					</div>
					<div class='vol-rate'>
						<div class='vol'>
							<label for='volume'>Vol:</label>
							<input
								id='volume'
								class='form-range'
								type='range'
								min={0}
								max={1}
								step='any'
								value={state.volume}
								onChange={handleVolumeChange}
							/>
							<span class='val vol'></span>
						</div>
						<div class='playback-rate '>
							<select
								id='rate'
								class='btn-dark form-select'
								aria-label='Default select example'
								onClick={handleSetPlaybackRate}>
								<option value={2}>2</option>
								<option value={1.5}>1.5</option>
								<option value={1} selected>
									1
								</option>
								<option value={0.5}>0.5</option>
								<option value={0.25}>0.25</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Player;
