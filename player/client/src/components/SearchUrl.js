import React from "react";
import "../css/Youtube.css";

const SearchUrl = ({ url, handleUrlChange, handleUrlClick }) => {
	return (
		<div className='url-bar input-group mb-3'>
			<input
				type='search'
				id='url'
				value={url}
				className='url-input form-control'
				placeholder='Enter youtube url'
				onChange={handleUrlChange}
			/>
			<button
				id='url-btn'
				className='btn btn-dark'
				type='button'
				onClick={handleUrlClick}>
				Play
			</button>
		</div>
	);
};

export default SearchUrl;
