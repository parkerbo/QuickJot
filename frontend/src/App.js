import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import Splash from "./components/Splash";
import SignupFormPage from "./components/SignUpForm";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import NotesBrowser from "./components/Notes/NotesBrowser";
import { getNotebooks } from "./store/notebooks";
import NotebookBrowser from "./components/Notebooks/NotebookBrowser";
import HomePage from "./components/HomePage";

function App() {
  const sessionUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();
	const [isLoaded, setIsLoaded] = useState(false);
	 const notebooks = useSelector((state) => {
			return state.notebooks.list;
		});
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
		if(sessionUser){
		dispatch(getNotebooks(sessionUser.id));
		}
	}, [dispatch]);

	return (
		<>
			{sessionUser && <Sidebar />}
			{isLoaded && (
				<Switch>
					<Route exact path="/">
						{!sessionUser && <Navigation isLoaded={isLoaded} />}
						{!sessionUser && <Splash />}
						{sessionUser && <HomePage />}
					</Route>
					<Route path="/login">
						<LoginFormPage />
					</Route>
					<Route path="/signup">
						<SignupFormPage />
					</Route>
					<Route path="/notes">
						{sessionUser ? <NotesBrowser /> : history.push("/")}
					</Route>
					<Route path="/notebooks/:notebookId">
						{sessionUser ?<NotebookBrowser notebooks={notebooks} />: history.push("/")}

					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
