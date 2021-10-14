import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { getNotebookNotes } from "../../../store/notes";
import Modal from "../../Modal";
import { useModal } from "../../../context/ModalContext";
import { getNotebooks, getCurrentNotebook, editNotebook, deleteNotebook } from "../../../store/notebooks";

const NotebookBrowser = ({notebooks, isLoaded}) => {
    const {notebookId} = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	let { showEditModal, setShowEditModal } = useModal();
	const userId = useSelector((state) => state.session.user.id);
	const notes = useSelector((state) => {
		return state.notes.list;
	});
	const currentNotebook = useSelector((state) => {
		return state.notebooks.currentNotebook
	})
	useEffect(() => {
		dispatch(getNotebookNotes(notebookId, userId));
		dispatch(getNotebooks(userId));
		dispatch(getCurrentNotebook(notebookId));
	}, [dispatch, notebookId, userId]);

	const toggleModal = (e) => {
		e.stopPropagation();
		e.preventDefault();
		setShowEditModal(true);
	};
	const [notebookTitle, setNotebookTitle] = useState("");
	if (!notes && !notebooks) {
		return null;
	}
	const handleEditNotebook = async (e) => {
		e.preventDefault();

		const payload = {
			notebookId: currentNotebook.id,
			title: notebookTitle,
		};

		const newNotebook= await dispatch(editNotebook(payload));

		if (newNotebook) {
			dispatch(getNotebooks(userId));
			dispatch(getCurrentNotebook(notebookId));
			setShowEditModal(false);
		}
	};

	const removeNotebook = async (e) => {
		e.preventDefault();

		const oldNotebook = await dispatch(deleteNotebook(currentNotebook.id));

		if (oldNotebook) {
			dispatch(getNotebooks(userId));
			setShowEditModal(false);
			history.push(`/notes/`);
		}
	};


	return (
		<main>
			<div id="notes-browser">
				<div id="notes-browser-title">
					<h2>
						<i className="fas fa-sticky-note" style={{ paddingRight: 10 }}></i>
						{currentNotebook.title}
					</h2>
					<span>{notes.length} notes</span>
					<span
						style={{ float: "right", marginRight: 10 }}
						onClick={toggleModal}
					>
						Edit Notebook
					</span>
					<Modal
						show={showEditModal}
						onClose={() => setShowEditModal(false)}
						title="Edit Notebook"
					>
						<h5 style={{ margin: 0, fontWeight: 0}}>
							Edit your notebook name, or delete it. <strong>Deleting a notebook will delete all associated notes</strong>
						</h5>
						<form onSubmit={handleEditNotebook}>
							<input
								type="text"
								placeholder={currentNotebook.title}
								onChange={e => setNotebookTitle(e.target.value)}
								required
								value={notebookTitle}
							/>
							<div>
								<button onClick={() => setShowEditModal(false)}>Cancel</button>
								<button type="submit">Submit</button>
								<button onClick={removeNotebook}>Delete</button>
							</div>
						</form>
					</Modal>
				</div>
				{notes.map((note) => {
					return (
						<NavLink
							key={note.id}
							to={`/notes/${note.id}`}
							activeClassName="selected"
						>
							<div className="note-card">
								<h3>{note.title}</h3>
								<h4>{note.content}</h4>
								<h5>{note.updatedAt}</h5>
							</div>
						</NavLink>
					);
				})}
			</div>
			<div id="main-note-content">
				{/* <Route path="/notes/:noteId">
					<NoteDetail notes={notes} />
				</Route>
				<Route path="/notes/new">
					<CreateNote />
				</Route> */}
			</div>
		</main>
	);
};

export default NotebookBrowser;
