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
import ContentInfo from "./components/contents/ContentInfo.jsx";
import Home from "./components/home/Home.jsx";
import NotFoundPage from "./components/guards/NotFoundPage.jsx";
import EmailForm from './components/email/EmailForm.jsx';

//context
import {LanguageProvider} from "./context/LanguageContext.jsx";
import {AuthProvider} from "./context/authContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import AuthGuard from "./components/guards/AuthGuard.jsx";

function App() {
	return (
		<ErrorBoundary>
			<AuthProvider>
				<LanguageProvider>
					<div id='box'>
						<Header/>
						<Routes>
							<Route path={Path.Home} element={<Home/>}/>
							<Route path={Path.Register} element={<Register/>}/>
							<Route path={Path.Login} element={<Login/>}/>
							<Route path={Path.Books} element={<Contents/>}/>
							<Route path={Path.Movies} element={<Contents/>}/>
							<Route path={Path.Podcasts} element={<Contents/>}/>
							<Route path={Path.Series} element={<Contents/>}/>
							<Route path={Path.EmailForm} element={<EmailForm/>} />
							<Route path={`${Path.MyRecommends}/:userId`} element={<Contents/>}/>
							<Route path={`${Path.MyFavorites}/:userId`} element={<Contents/>}/>
							<Route path={`${Path.Details}/:contentId`} element={<ContentInfo/>}/>
							<Route element={<AuthGuard/>}>
								<Route path={Path.Logout} element={<Logout/>}/>
								<Route path={`${Path.EditRecommend}/:contentId`} element={<Recommend/>}/>
								<Route path={Path.Recommend} element={<Recommend/>}/>
							</Route>
							<Route path="*" element={<NotFoundPage/>}/>
						</Routes>
						<Footer/>
					</div>
				</LanguageProvider>
			</AuthProvider>
		</ErrorBoundary>
	)
}

export default App;