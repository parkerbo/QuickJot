import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNotebooks, createNotebook } from "../../store/notebooks";
import * as sessionActions from "../../store/session";
import Modal from "../Modal";
import { useModal } from "../../context/ModalContext";
import "./Sidebar.css";

function Sidebar() {
	const sessionUser = useSelector((state) => state.session.user);
	const history = useHistory();
	const userId = useSelector((state) => state.session.user.id);
	const notebooks = useSelector((state) => {
		return state.notebooks.list;
	});
	const dispatch = useDispatch();
	let { showModal, setShowModal } = useModal();
	useEffect(() => {
		dispatch(getNotebooks(userId));
	}, [dispatch, userId]);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
		window.location.href = "/";
	};

	const toggleModal = (e) => {
		e.stopPropagation();
		e.preventDefault();
		setShowModal(true);
	};
	const [notebookName, setNotebookName] = useState("");
	const handleSaveNotebook = async (e) => {
		e.preventDefault();

		const payload = {
			title: notebookName,
			userId: userId,
		};
		const newNotebook = await dispatch(createNotebook(payload));

		if (newNotebook) {
			dispatch(getNotebooks(userId));
			setShowModal(false);
			setNotebookName("");
			history.push(`/notebooks/${newNotebook.id}`);
		}
	};
	const Notebooks = (props) => {
		const [isOpen, setIsOpen] = useState(false);
		const { children } = props;
		const caret = isOpen ? "down" : "right";

		const toggleNotebooks = (e) => {
			e.preventDefault();
			e.stopPropagation();
			setIsOpen(!isOpen);
		};

		return (
			<span style={{ marginLeft: -5, paddingTop: 10 }} id="toggle-notebooks">
				<span onClick={toggleNotebooks}>
					<i
						className={`fas fa-caret-${caret}`}
						style={{ paddingRight: 8 }}
					></i>
					<i className="fas fa-book" style={{ paddingRight: 8 }}></i>
					Notebooks
				</span>
				<div id="notebooks-container" style={{ marginLeft: 10 }}>
					{isOpen ? children : null}
				</div>
			</span>
		);
	};

	const Notebook = ({ notebook }) => {
		return (
			<span style={{ fontSize: 15, display: "block" }}>
				<i className="fas fa-book-open" style={{ paddingRight: 8 }}></i>
				<NavLink to={`/notebooks/${notebook.id}`}>{notebook.title}</NavLink>
			</span>
		);
	};

	return (
		<div className="sidebar">
			<Modal
				show={showModal}
				onClose={() => setShowModal(false)}
				title="Create new notebook"
			>
				<h5 style={{ margin: 0 }}>
					Notebooks are useful for grouping notes around a common topic.
				</h5>
				<form onSubmit={handleSaveNotebook}>
					<input
						type="text"
						placeholder="Notebook name"
						onChange={(e) => setNotebookName(e.target.value)}
						required
						value={notebookName}
					/>
					<div>
						<button onClick={() => setShowModal(false)}>Cancel</button>
						<button type="submit">Submit</button>
					</div>
				</form>
			</Modal>
			<h1 style={{marginLeft: 10}}>
				<i className="fas fa-user-circle" style={{paddingRight: 10}}/>
				{sessionUser.username}
			</h1>
			<div className="side-bar-search">
				<i className="fas fa-search icon"></i>
				<input type="text" placeholder="Search" className="input-field" />
			</div>
			<NavLink to="/notes/new" id="create-new-note">
				<div>
					<i className="fas fa-pen" style={{ paddingRight: 8 }}></i>
					Create New Note
				</div>
			</NavLink>

			<NavLink exact to="/" activeClassName="side-bar-selected">
				<div>
					{" "}
					<i className="fas fa-home"></i> Home
				</div>
			</NavLink>

			<NavLink to="/notes" activeClassName="side-bar-selected">
				<div>
					{" "}
					<i className="far fa-sticky-note" style={{ paddingRight: 8 }}></i>
					Notes
				</div>
			</NavLink>

			<Notebooks>
				{notebooks.map((notebook) => (
					<Notebook notebook={notebook} key={notebook.id} />
				))}
				<span style={{ fontSize: 15, color: "#00a82d" }} onClick={toggleModal}>
					<i className="fas fa-plus-circle" style={{ paddingRight: 8 }}></i>
					New Notebook
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
