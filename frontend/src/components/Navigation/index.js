import React from "react";
import * as sessionActions from "../../store/session";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import quickJotLogo from '../../images/QuickJot_logo.png'

function Navigation({ isLoaded }) {
    const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
const demoLogin = (e) => {
	e.preventDefault();
	return dispatch(sessionActions.demoLogin());
};
	let sessionLinks;
	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
	} else {
		sessionLinks = (
			<>
				<li>
					<NavLink to="/login">Log In</NavLink>
				</li>
				<li onClick={demoLogin} id="demo-login">
					Demo
				</li>
				<li id="nav-bar-sign-up">
					<NavLink to="/signup">Sign Up</NavLink>
				</li>
			</>
		);
	}

	return (
		<div className="nav-bar">
			<div id="nav-logo">
				<img src={quickJotLogo} alt="Quick Jot Logo" />
			</div>
			<NavLink exact to="/">
				<h1>QuickJot</h1>
			</NavLink>
			<Link
				to={{
					pathname: "http://www.linkedin.com/in/parkerbolick/",
				}}
				target="_blank"
			>
				<i
					className="fab fa-linkedin footer-icon"
					style={{ padding: "30px 10px 20px 30px"  }}
				></i>
			</Link>

			<Link
				to={{
					pathname: "http://www.github.com/parkerbo",
				}}
				target="_blank"
			>
				<i
					className="fab fa-github footer-icon"
					style={{ padding: "30px 0px 30px 10px" }}
				></i>
			</Link>
			<ul className="nav-bar-links">{isLoaded && sessionLinks}</ul>
		</div>
	);
}

export default Navigation;
