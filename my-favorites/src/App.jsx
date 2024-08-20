//config
import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

//configurations
import Path from "./paths.js";

//components
import Header from "./components/header/Header.jsx";
import Register from "./components/аuthentication/Register.jsx";
import Login from "./components/аuthentication/Login.jsx"
import Logout from "./components/аuthentication/Logout.jsx";
import Recommend from "./components/аuthentication/Recommend.jsx";
import Footer from "./components/footer/Footer.jsx";
import Contents from "./components/contents/Contents.jsx";
import ContentDetails from "./components/contents/ContentDetails.jsx";
import ContentInfo from "./components/contents/ContentInfo.jsx";

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
						<Route path={Path.Books} element={<Contents/>}/>
						<Route path={Path.ContentDetail} element={<ContentDetails/>}/>
						<Route path={Path.ContentInfo} element={<ContentInfo/>}/>
					</Routes>
					<Footer/>
				</div>
			</LanguageProvider>
		</AuthProvider>
	)
}

export default App;