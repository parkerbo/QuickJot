import React from "react";
import * as sessionActions from "../../store/session";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

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
			<NavLink exact to="/">
				<h1>QuickJot</h1>
			</NavLink>
			<ul className="nav-bar-links">{isLoaded && sessionLinks}</ul>
		</div>
	);
}

export default Navigation;
