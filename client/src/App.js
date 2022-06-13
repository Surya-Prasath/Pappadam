import React, { Fragment } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
// import "./css/App.css";
import Main from "./components/Main";
import HomePage from "./components/HomePage";
import Header from "./components/Header"

const App = () => {
	return (
		<BrowserRouter>
			<Fragment>
				<Header/>
				<Routes>
					<Route path={"/"} element={<HomePage/>} />
					<Route path='/testing' element={<Main feature={"Youtube"}/>} />
				</Routes>
			</Fragment>
		</BrowserRouter>
	);
};

export default App;
