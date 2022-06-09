import React from "react";
// const { io } = require("socket.io-client");
import "./player";
import "../css/Youtube.css";

const Youtube = () => {
	return (
		<div classNameName='ytplayer frame'>
			<div className='url-bar input-group mb-3'>
				<input
					type='search'
					id='url'
					className='url-input form-control'
					placeholder='Enter youtube url'
				/>
				<button id='url-btn' className='btn btn-dark' type='button'>
					Play
				</button>
			</div>

			<div id='player'></div>

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
				<div className='playPause btn-group' role='group'>
					<button type='button' className='btn btn-dark' id='play'>
						<i className='fa fa-solid fa-play'></i>
					</button>
					<button type='button' className='btn btn-dark' id='pause'>
						<i className='fa fa-solid fa-pause'></i>
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
