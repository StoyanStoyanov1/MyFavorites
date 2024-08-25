import React, {Component} from "react";
import {Link} from "react-router-dom";
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

		return {
			hasError: true,
		};
	}

	componentDidCatch(error, errorInfo) {
		console.log('componentDidCatch', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="not-found">
					<h1 className="not-found-code">Something went wrong</h1>
					<p className="not-found-message">
						An unexpected error occurred. Please try refreshing the page, or go back to the{' '}
						<Link to={Path.Home} className="home-link">homepage</Link>.
					</p>
				</div>
			);
		}

		return this.props.children;
	}
}