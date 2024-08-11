import React from 'react';
import Path from './../../paths.js'
import {Link} from "react-router-dom";

export default function Header() {
	return (
		<header>
			<nav>
				<div className="nav-left">

					<Link to={Path.Home}>Home</Link>
					<Link to={Path.Home}>Books</Link>
					<Link to={Path.Home}>Movies</Link>
					<Link to={Path.Home}>Podcasts</Link>
				</div>
				<div className="favorites-container">
					<h1 className="favorites-text">My Favorites</h1>
				</div>
				<div className="nav-right">
					<Link className='' to={Path.Login}>Login</Link>
					<Link className={Path.Register} to={Path.Register}>Register</Link>
					<Link className='' to={Path.Home}>Logout</Link>
				</div>
			</nav>
		</header>
	)
}