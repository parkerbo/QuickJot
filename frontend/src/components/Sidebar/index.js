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
            <NavLink to='/notes'><h4>New Note</h4></NavLink>
			{showMenu && (
						<button onClick={logout}>Log Out</button>
			)}
		</div>
	);
}

export default Sidebar;
