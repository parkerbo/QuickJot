import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, NavLink, useParams } from "react-router-dom";
import { getNotebookNotes } from "../../../store/notes";
import { getNotebooks } from "../../../store/notebooks";

const NotebookBrowser = () => {
    const {notebookId} = useParams();
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.session.user.id);
	const notes = useSelector((state) => {
		return state.notes.list;
	});
    const notebooks = useSelector((state) => {
			return state.notebooks.list;
		});
    const notebook = notebooks.find((notebook) => notebook.id === +notebookId);
	const [notebookTitle, setNotebookTitle] = useState("");
	useEffect(() => {
		dispatch(getNotebookNotes(notebookId, userId));
        dispatch(getNotebooks(userId));
		if(notebook){
		setNotebookTitle(notebook.title)
		}
	}, [dispatch, notebookId, userId]);

	if (!notes) {
		return null;
	}

	return (
		<main>
			<div id="notes-browser">
				<div id="notes-browser-title">
					<h2>
						<i className="fas fa-sticky-note" style={{ paddingRight: 10 }}></i>
						{notebookTitle}
					</h2>
					<span>{notes.length} notes</span>
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
