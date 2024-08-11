//config
import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

//configurations
import Path from "./paths.js";

//components
import Header from "./components/header/Header.jsx";
import Register from "./components/аuthentication/Register.jsx";
import Login from "./components/аuthentication/Login.jsx"



function  App() {
	return (
		<div id='box'>
		<Header/>
			<Routes>
				<Route path={Path.Register} element={<Register/>}/>
				<Route path={Path.Login} element={<Login/>}/>
			</Routes>
		</div>
	)
}

export default App;