import React from 'react';
import { Link } from 'react-router-dom';
import Path from '../paths';

function NotFoundPage() {
	return (
		<div className="not-found">
			<h1 className="not-found-code">404</h1>
			<p className="not-found-message">
				Page not found. Go back to the{' '}
				<Link to={Path.Home} className="home-link">homepage</Link>.
			</p>
		</div>
	);
}

export default NotFoundPage;
