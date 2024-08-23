import { Component } from "react";
import { Link } from "react-router-dom";
import Path from "../paths.js";

export default class ErrorBoundary extends Component {
	constructor() {
		super();
		this.state = {
			hasError: false,
		};
	}

	static getDerivedStateFromError(err) {
		console.log('getDerivedStateFromError');
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.log('componentDidCatch', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="error-container">
					<h1 className="error-code">404</h1>
					<p className="error-message">
						This page doesn't exist. Go back to the{' '}
						<Link to={Path.Home} className="home-link">homepage</Link> or search for what you need.
					</p>
				</div>
			);
		}

		return this.props.children;
	}
}
