import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNotebooks, createNotebook } from "../../store/notebooks";
import { getNotes } from "../../store/notes";
import * as sessionActions from "../../store/session";
import Modal from "../Modal";
import Search from "../Search";
import { useModal } from "../../context/ModalContext";
import "./Sidebar.css";

function Sidebar() {
	const sessionUser = useSelector((state) => state.session.user);
	const history = useHistory();
	const userId = useSelector((state) => state.session.user.id);
	const notebooks = useSelector((state) => {
		return state.notebooks.list;
	});
	const notes = useSelector((state) => {
		return state.notes.list;
	});
	const dispatch = useDispatch();
	let { showModal, setShowModal } = useModal();
	const [showSearch, setShowSearch] = useState(false);
	const [notebookName, setNotebookName] = useState("");
	useEffect(() => {
		dispatch(getNotebooks(userId));
		dispatch(getNotes(userId));
	}, [dispatch, userId, notebookName]);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
	};

	const toggleModal = (e) => {
		e.stopPropagation();
		e.preventDefault();
		setShowModal(true);
	};

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
			<span style={{ marginLeft: -5, paddingTop: 3, paddingBottom:10 }} id="toggle-notebooks">
				<span onClick={toggleNotebooks}>
					<i
						className={`fas fa-caret-${caret}`}
						style={{ paddingRight: 8 }}
					></i>
					<i className="fas fa-book" style={{ paddingRight: 8 }}></i>
					Notebooks
				</span>
				<div id="notebooks-container side-bar-link" style={{ marginLeft: 10 }}>
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
			<Search
				show={showSearch}
				onClose={() => setShowSearch(false)}
				notes={notes}
				notebooks={notebooks}
			/>
			<Modal
				show={showModal}
				onClose={() => setShowModal(false)}
				title="Create new notebook"
			>
				<h5 style={{ margin: 0 }}>
					Notebooks are useful for grouping notes around a common topic.
				</h5>
				<form onSubmit={handleSaveNotebook}>
					<label for="notebook-name">Name</label>
					<input
						name="notebook-name"
						type="text"
						placeholder="Notebook name"
						onChange={(e) => setNotebookName(e.target.value)}
						required
						value={notebookName}
					/>
					<div id="modal-buttons">
						<button onClick={() => setShowModal(false)} id="modal-cancel">Cancel</button>
						<button type="submit" id="modal-create" disabled={!(notebookName.length > 0)}>Create</button>
					</div>
				</form>
			</Modal>
			<h1 style={{ marginLeft: 10 }}>
				<i className="fas fa-user-circle" style={{ paddingRight: 10 }} />
				{sessionUser.username}
			</h1>
			<div className="side-bar-search" onClick={() => setShowSearch(true)}>
				<i className="fas fa-search icon"></i>
				<div className="input-field">
					<span style={{ marginLeft: 35, fontSize: 17 }}>Search</span>
				</div>
			</div>
			<NavLink to="/notes/new" id="create-new-note">
				<div id="side-bar-link">
					<i className="fas fa-pen" style={{ paddingRight: 8 }}></i>
					Create New Note
				</div>
			</NavLink>

			<NavLink exact to="/" activeClassName="side-bar-selected">
				<div id="side-bar-link">
					<i className="fas fa-home"></i> Home
				</div>
			</NavLink>

			<NavLink to="/notes" activeClassName="side-bar-selected">
				<div id="side-bar-link">
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
			<div onClick={logout} id="log-out-div side-bar-link" >
				<i className="fas fa-sign-out-alt" style={{ paddingRight: 8 }}></i>
				Sign Out
			</div>
		</div>
	);
}

export default Sidebar;
