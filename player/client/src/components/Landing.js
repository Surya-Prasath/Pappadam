import React from "react";
import { Link } from "react-router-dom";
import "../css/Landing.css";

const Landing = () => {
	return (
		<section className='landing'>
			<div className='landing-inner'>
				<h1 className='title'>Parallel Player</h1>
				<p className='lead'>Vibe Togther</p>
				<div className='buttons'>
					<Link to='/player' className='btn btn-primary'>
						Player
					</Link>
					<Link to='/spotify' className='btn btn-light'>
						Spotify
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Landing;
