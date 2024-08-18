//config
import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

//configurations
import Path from "./utils/paths.js";

//components
import Header from "./components/header/Header.jsx";
import Register from "./components/аuthentication/Register.jsx";
import Login from "./components/аuthentication/Login.jsx"
import Logout from "./components/аuthentication/Logout.jsx";
import Recommend from "./components/аuthentication/Recommend.jsx";

//context
import {LanguageProvider} from "./context/LanguageContext.jsx";
import {AuthProvider} from "./context/authContext.jsx";


function App() {
	return (
		<AuthProvider>
			<LanguageProvider>
				<div id='box'>
					<Header/>
					<Routes>
						<Route path={Path.Register} element={<Register/>}/>
						<Route path={Path.Login} element={<Login/>}/>
						<Route path={Path.Logout} element={<Logout/>}/>
						<Route path={Path.Recommend} element={<Recommend/>}/>
					</Routes>
				</div>
			</LanguageProvider>
		</AuthProvider>
	)
}

export default App;