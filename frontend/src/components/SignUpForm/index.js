import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import quickJotLogo from "../../images/QuickJot_logo.png";

function SignupFormPage() {
	const dispatch = useDispatch();
	const demoLogin = (e) => {
		e.preventDefault();
		return dispatch(sessionActions.demoLogin());
	};
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors([]);
			return dispatch(
				sessionActions.signup({ email, username, password })
			).catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
		}
		return setErrors([
			"Confirm Password field must be the same as the Password field",
		]);
	};

	return (
		<div id="form-background">
			<div id="log-in-form">
				<img src={quickJotLogo} alt="main-logo" style={{ width: "15%" }} />
				<h1>Quick Jot</h1>
				<h3 style={{padding: 0}}>Remember everything important.</h3>
				<form onSubmit={handleSubmit}>
					<ul id="form-errors">
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
					<div id="form-input">
						<input
							type="text"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div id="form-input">
						<input
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
					<div id="form-input">
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div id="form-input">
						<input
							type="password"
							placeholder="Confirm password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
					<button type="submit" id="submit-form-button">
						Sign Up
					</button>
				</form>
				<div id="form-add-links" style={{paddingTop: 10}}>
					<h3>Already have an account?</h3>
					<NavLink to="/login" style={{ color: "#0BC13C", fontSize: 16 }}>
						Log in
					</NavLink>
					<h3 onClick={demoLogin} style={{ color: "#0BC13C" }} id="demo-login">
						Demo Login
					</h3>
				</div>
			</div>
		</div>
	);
}

export default SignupFormPage;
