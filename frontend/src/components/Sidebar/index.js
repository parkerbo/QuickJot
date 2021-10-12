import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import "./Sidebar.css";
function Sidebar() {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
		const [showMenu, setShowMenu] = useState(false);

		const openMenu = () => {
			if (showMenu) return;
			setShowMenu(true);
		};

		useEffect(() => {
			if (!showMenu) return;

			const closeMenu = () => {
				setShowMenu(false);
			};

			document.addEventListener("click", closeMenu);

			return () => document.removeEventListener("click", closeMenu);
		}, [showMenu]);

		const logout = (e) => {
			e.preventDefault();
			dispatch(sessionActions.logout());
            window.location.href = "/";
		};
	return (
		<div className="sidebar">
			<h1 onClick={openMenu}>
				<i className="fas fa-user-circle" />
				{sessionUser.username}
			</h1>
			<div >
				<NavLink to="/notes/new" id="create-new-note">
					<i className="fas fa-pen" style={{ paddingRight: 8 }}></i>
					Create New Note
				</NavLink>
			</div>
			<div>
				<NavLink to="/">
					<i className="fas fa-home"></i> Home
				</NavLink>
			</div>
			<div>
				<NavLink to="/notes">
					<i className="far fa-sticky-note" style={{ paddingRight: 8 }}></i>
					Notes
				</NavLink>
			</div>
			<div>
				<NavLink to="/notebooks">
					<i className="fas fa-book" style={{ paddingRight: 8 }}></i>
					Notebooks
				</NavLink>
			</div>
			<div onClick={logout} id="log-out-div">
				<i className="fas fa-sign-out-alt" style={{ paddingRight: 8 }}></i>
				Sign Out
			</div>
		</div>
	);
}

export default Sidebar;
