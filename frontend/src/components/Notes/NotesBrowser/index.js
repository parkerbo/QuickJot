import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getNotes } from "../../../store/notes";
import "./NotesBrowser.css"
const NotesBrowser = () => {
	const dispatch = useDispatch();
	  const notes = useSelector((state) => {
			return state.notes.list;
		});
console.log(notes)
	useEffect(() => {
		dispatch(getNotes());
	}, []);

	if (!notes) {
		return null;
	}

	return (
		<div id="notes-browser">
			<h2>Notes:</h2>
			<div>
				{notes.map((note) => {
					return (
						<h3 key={note.id}>{note.title}</h3>
					)
				})}
			</div>
			</div>
	);
};

export default NotesBrowser;
