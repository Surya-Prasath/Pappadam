import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import Spotify from "./components/Spotify";
import "./css/App.css";

const App = () => {
	return (
		<Router>
			<Fragment>
				<Routes>
					<Route path='/' element={<Landing />} />
					<Route path='/player' element={<Player />} />
					<Route path='/spotify' element={<Spotify />} />
				</Routes>
			</Fragment>
		</Router>
	);
};

export default App;
