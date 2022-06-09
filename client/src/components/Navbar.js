import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<div className='container-fluid'>
				<Link className='navbar-brand' to='/'>
					ParallelPlayer
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNavAltMarkup'
					aria-controls='navbarNavAltMarkup'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
					<div className='navbar-nav'>
						<Link className='nav-link active' to='/'>
							Home
						</Link>
						<Link className='nav-link' to='/youtube'>
							Youtube
						</Link>
						<Link className='nav-link' to='/spotify'>
							Spotify
						</Link>
					</div>
				</div>
				<form className='room-bar d-flex input-group'>
					<input
						type='search'
						id='room'
						value=''
						className='room-input form-control'
						placeholder='Enter custom room'
					/>
					<button
						id='room-btn'
						className='btn btn-outline-success'
						type='button'>
						Join
					</button>
				</form>
			</div>
		</nav>
	);
};

export default Navbar;
