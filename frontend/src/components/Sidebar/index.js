import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNotebooks } from "../../store/notebooks";
import * as sessionActions from "../../store/session";
import "./Sidebar.css";
function Sidebar() {
    const sessionUser = useSelector((state) => state.session.user);
    const userId = useSelector((state) => state.session.user.id);
    const notebooks = useSelector((state) => {
			return state.notebooks.list;
		});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNotebooks(userId));
    }, [dispatch, userId]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        window.location.href = "/";
    };
    const Notebooks = (props) => {
        const [isOpen, setIsOpen] = useState(false);
        const {children} = props;
        const caret = isOpen ? 'down' : 'right';

        const toggleNotebooks = () => {
        setIsOpen(!isOpen);
    }
    return (
			<span style={{marginLeft: -5, paddingTop: 10}} id="toggle-notebooks">
				<span onClick={toggleNotebooks}>
					<i className={`fas fa-caret-${caret}`} style={{ paddingRight: 8 }}></i>
					<i className="fas fa-book" style={{ paddingRight: 8 }}></i>
					Notebooks
				</span>
				<div style={{ marginLeft: 10 }}>{isOpen ? children : null}</div>
			</span>
		);
    }
    const Notebook = ({notebook}) => {
        return (
            <span style={{fontSize: 15, display: "block"}}>
                <i className="fas fa-book-open" style={{ paddingRight: 8 }}></i>
                <NavLink to={`/notebooks/${notebook.id}`}>
                {notebook.title}
                </NavLink>
            </span>
        );
    }

	return (
		<div className="sidebar">
			<h1>
				<i className="fas fa-user-circle" />
				{sessionUser.username}
			</h1>
			<div>
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
			<Notebooks>
				{notebooks.map((notebook) => (
					<Notebook notebook={notebook} key={notebook.id} />
				))}
				<span style={{ fontSize: 15, color: "#00a82d" }}>
					<i className="fas fa-plus-circle" style={{ paddingRight: 8 }}></i>
					Create New Notebook
				</span>
			</Notebooks>
			<div onClick={logout} id="log-out-div">
				<i className="fas fa-sign-out-alt" style={{ paddingRight: 8 }}></i>
				Sign Out
			</div>
		</div>
	);
}

export default Sidebar;
