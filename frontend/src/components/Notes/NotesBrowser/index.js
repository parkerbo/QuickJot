import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, NavLink } from "react-router-dom";
import { getNotes } from "../../../store/notes";
import NoteDetail from "../NotesDetail";
import CreateNote from "../CreateNote";
import "./NotesBrowser.css"
const NotesBrowser = () => {
	const dispatch = useDispatch();
	  const notes = useSelector((state) => {
			return state.notes.list;
		});

	useEffect(() => {
		dispatch(getNotes());
	}, [dispatch]);

	if (!notes) {
		return null;
	}

	return (
		<main>
			<div id="notes-browser">
				<div id="notes-browser-title">
					<h2>
						<i className="fas fa-sticky-note" style={{ paddingRight: 10 }}></i>
						Notes
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
							{" "}
							<div className="note-card">
								<h3>{note.title}</h3>
								<h4>{note.content}</h4>
							</div>
						</NavLink>
					);
				})}
			</div>
			<div id="main-note-content">
				<Route path="/notes/:noteId">
					<NoteDetail notes={notes}/>
				</Route>
				<Route path="/notes/new">
				<CreateNote />
				</Route>
			</div>
		</main>
	);
};

export default NotesBrowser;
