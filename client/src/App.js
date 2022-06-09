import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Youtube from "./components/Youtube";
import Spotify from "./components/Spotify";
import "./css/App.css";

const App = () => {
	return (
		<Router>
			<Fragment>
				<Navbar />
				<Routes>
					<Route path='/' element={<Landing />} />
					<Route path='/youtube' element={<Youtube />} />
					<Route path='/spotify' element={<Spotify />} />
				</Routes>
			</Fragment>
		</Router>
	);
};

export default App;
