import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, NavLink} from "react-router-dom";
import { getNotes } from "../../../store/notes";
import { getNotebooks } from "../../../store/notebooks";
import date from "date-and-time";
import NoteDetail from "../NotesDetail";
import "./NotesBrowser.css"
const NotesBrowser = () => {
	const dispatch = useDispatch();
	 const userId = useSelector((state) => state.session.user.id);
	  const notes = useSelector((state) => {
			return state.notes.list;
		});
	const notebooks = useSelector((state) => {
		return state.notebooks.list;
	});
	useEffect(() => {
		dispatch(getNotes(userId));
		dispatch(getNotebooks(userId));
	}, [dispatch, userId]);

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
					const currentTime = new Date();
					const noteTime = new Date(note.updatedAt);
					const noteTimeElapsed = date.subtract(currentTime,noteTime).toSeconds();
					let noteDateFormatted;

					if (noteTimeElapsed < 60){
						noteDateFormatted = "a few seconds ago"
					} else if( noteTimeElapsed < 360){
						noteDateFormatted = "a few minutes ago"
					} else if (noteTimeElapsed < 3600){
						noteDateFormatted = `${Math.floor(date.subtract(currentTime,noteTime).toMinutes())} minutes ago`;
					} else if (noteTimeElapsed < 86400){
						noteDateFormatted = `${Math.floor(date.subtract(currentTime,noteTime).toHours())} hours ago`;
					} else if (noteTimeElapsed < 172800) {
						noteDateFormatted = 'yesterday'
					} else {
						noteDateFormatted = date.format(noteTime,"MMM DD, 'YY - hh:mm A")
					}
						return (
							<NavLink
								key={note.id}
								to={`/notes/${note.id}`}
								activeClassName="selected"
							>
								<div className="note-card">
									<h3>{note.title === "" ? "Untitled" : note.title}</h3>
									<h4>{note.content}</h4>
									<h5>{noteDateFormatted}</h5>
								</div>
							</NavLink>
						);
				})}
			</div>
			<div id="main-note-content">
				<Route path="/notes/:noteId">
					<NoteDetail notes={notes} notebooks={notebooks} />
				</Route>
			</div>
		</main>
	);
};

export default NotesBrowser;
