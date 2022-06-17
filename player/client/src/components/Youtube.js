import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import "../css/Youtube.css";

const Youtube = () => {
	const [state, setState] = useState({
		url: "https://www.youtube.com/watch?v=Go8nTmfrQd8",
		pip: false,
		playing: false,
		controls: false,
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

	const load = url => {
		setState({
			...state,
			url,
			played: 0,
			loaded: 0,
			pip: false,
		});
	};

	const handleUrlChange = e => {
		setState({ ...state, url: e.target.value });
	};

	const handlePlayPause = () => {
		setState({ ...state, playing: !state.playing });
		// if (state.playing) {
		// 	socket.emit(
		// 		"send-data",
		// 		{
		// 			state: "play",
		// 			time: player.getCurrentTime(),
		// 		},
		// 		room
		// 	);
		// } else {
		// 	socket.emit(
		// 		"send-data",
		// 		{
		// 			state: "pause",
		// 			time: player.getCurrentTime(),
		// 		},
		// 		room
		// 	);
		// }
	};

	return (
		<div className='ytplayer frame'>
			<div className='url-bar input-group mb-3'>
				<input
					type='search'
					id='url'
					className='url-input form-control'
					placeholder='Enter youtube url'
					onChange={handleUrlChange}
				/>
				{/* <button
					id='url-btn'
					className='btn btn-dark'
					type='button'
					onClick={handleUrlSubmit}>
					Play
				</button> */}
			</div>

			<ReactPlayer
				url={state.url}
				playing={state.playing}
				config={{
					youtube: {
						playerVars: { showinfo: 1 },
					},
				}}
			/>

			{/* <div id='player'></div> */}

			<div id='progress'>
				<div id='bar'>
					<span className='dot'></span>
				</div>
			</div>
			{/* <!-- <input id="progress" type="range" min="0" max="100" step="0.01" value="0" /> --> */}

			<div className='time'>
				<p id='current-time'>00:00</p>
				<p id='total-time'></p>
			</div>

			<div className='ctrls'>
				<div className='playPause btn' role='group'>
					<button
						type='button'
						className='btn btn-dark'
						id='play'
						onClick={() => handlePlayPause()}>
						{
							state.playing
								? "Pause"
								: // <i className='fa fa-solid fa-pause'></i>
								  "Play"
							// <i className='fa fa-solid fa-play'></i>
						}
					</button>
				</div>
				<div className='vol-rate'>
					<div className='vol'>
						<label for='volume'>Vol:</label>
						<input
							id='volume'
							className='form-range'
							type='range'
							min='0'
							max='100'
							step='1'
							value='50'
						/>
						<span className='val vol'></span>
					</div>
					<div className='playback-rate '>
						<select
							id='rate'
							className='btn-dark form-select'
							aria-label='Default select example'>
							<option value='2'>2</option>
							<option value='1.5'>1.5</option>
							<option value='1' selected>
								1
							</option>
							<option value='0.5'>0.5</option>
							<option value='0.25'>0.25</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Youtube;
