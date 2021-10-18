import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import "./LoginForm.css";
import * as sessionActions from "../../store/session"
import quickJotLogo from "../../images/QuickJot_logo.png";

function LoginFormPage() {
	const demoLogin = (e) => {
		e.preventDefault();
		return dispatch(sessionActions.demoLogin());
	};
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login({ credential, password })).catch(
			async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			}
		);
	};

	return (
		<div id="form-background">
			<div id="log-in-form">
				<img src={quickJotLogo} alt="main-logo" style={{ width: "15%" }} />
				<h1>Quick Jot</h1>
				<h3>Remember everything important.</h3>
				<form onSubmit={handleSubmit}>
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
					<div id="form-input">
						<input
							type="text"
							value={credential}
							placeholder="Email or Username"
							onChange={(e) => setCredential(e.target.value)}
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
					<button type="submit" id="submit-form-button">
						Continue
					</button>
				</form>
				<div id="form-add-links">
					<h3>Don't have an account?</h3>
					<NavLink to="/signup" style={{ color: "#0BC13C", fontSize: 16 }}>
						Create account
					</NavLink>
					<h3 onClick={demoLogin} style={{ color: "#0BC13C" }} id="demo-login">
						Demo Login
					</h3>
				</div>
			</div>
		</div>
	);
}

export default LoginFormPage;
