import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import Splash from "./components/Splash";
import SignupFormPage from "./components/SignUpForm";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import NotesBrowser from "./components/Notes/NotesBrowser";

function App() {
  const sessionUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			{!sessionUser && <Navigation isLoaded={isLoaded} />}
			{sessionUser && <Sidebar />}
			{isLoaded && (
				<Switch>
					<Route exact path="/">
						{!sessionUser && <Splash />}
					</Route>
					<Route path="/login">
						<LoginFormPage />
					</Route>
					<Route path="/signup">
						<SignupFormPage />
					</Route>
					<Route path="/notes">
						<NotesBrowser />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
