import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, NavLink, useParams, useHistory } from "react-router-dom";
import { getNotebookNotes } from "../../../store/notes";
import Modal from "../../Modal";
import NoteDetail from "../../Notes/NotesDetail";
import { useModal } from "../../../context/ModalContext";
import { getNotebooks, getCurrentNotebook, editNotebook, deleteNotebook } from "../../../store/notebooks";

const NotebookBrowser = () => {
    const {notebookId} = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	let { showEditModal, setShowEditModal } = useModal();
	const userId = useSelector((state) => state.session.user.id);
	const notes = useSelector((state) => {
		return state.notes.list;
	});
	const notebooks = useSelector((state) => {
		return state.notebooks.list;
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
	if (!notes ) {
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
			setNotebookTitle("")
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
						<i className="fas fa-book-open" style={{ paddingRight: 10 }}></i>
						{currentNotebook.title}
					</h2>
					<span>{notes.length} notes</span>
					<span id="edit-notebook-span"
						style={{ float: "right", marginRight: 10 }}
						onClick={toggleModal}
					>
						Edit Notebook
					</span>
					<Modal
						show={showEditModal}
						onClose={() => setShowEditModal(false)}
						title={`Edit "${currentNotebook.title}"`}
					>
						<h5 style={{ margin: 0, fontWeight: 0 }}>
							Edit your notebook name, or delete it.<h6 style={{margin:0, fontSize: 13, color: "red"}}>
								Warning: Deleting a notebook will delete all associated notes.
						</h6></h5>
						<form onSubmit={handleEditNotebook}>
							<input
								type="text"
								placeholder="Enter New Notebook Name"
								onChange={(e) => setNotebookTitle(e.target.value)}
								required
								value={notebookTitle}
							/>
							<div id="modal-buttons">
								<button onClick={() => setShowEditModal(false)} id="modal-cancel">Cancel</button>
								<button type="submit" id="modal-edit" disabled={!(notebookTitle.length > 0)}>Edit</button>
								<button onClick={removeNotebook} id="modal-delete">Delete</button>
							</div>
						</form>
					</Modal>
				</div>
				{notes.map((note) => {
					return (
						<NavLink
							key={note.id}
							to={`/notebooks/${currentNotebook.id}/notes/${note.id}`}
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
				<Route path="/notebooks/:notebookId/notes/:noteId">
					<NoteDetail notes={notes} notebooks={notebooks} />
				</Route>
			</div>
		</main>
	);
};

export default NotebookBrowser;
