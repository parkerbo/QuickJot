import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { saveNote, getNotes, getOneNote } from "../../../store/notes";
import { useDispatch } from "react-redux";
import "./NotesDetail.css"

const NoteDetail = ({notes}) => {
	const dispatch = useDispatch();
	const { noteId } = useParams();
	const note = notes.find(note => note.id === +noteId)
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")


    const updateTitle = (e) => setTitle(e.target.value);
    const updateContent = (e) => setContent(e.target.value);

	useEffect(() => {
		if (note){
            setTitle(note.title);
            setContent(note.content);
            dispatch(getOneNote(note.id))
        }
	}, [note]);

	if (!note) {
		return null;
	}
const handleSaveNote = async (e) => {
	e.preventDefault();

	const payload = {
		noteId: note.id,
        title: title,
        content: content
	};

	const newNoteSaved = await dispatch(saveNote(payload));

    if(newNoteSaved){
        dispatch(getNotes());
        dispatch(getOneNote(note.id));
    }
};

	return (
		<form className="note-detail" onSubmit={handleSaveNote}>
			<div id="note-form-title">
				<input
					type="text"
					placeholder="Title"
					required
					value={title}
					onChange={updateTitle}
				/>
			</div>
			<div id="note-form-content">
				<textarea
					placeholder="Start writing..."
					required
					value={content}
					onChange={updateContent}
				/>
			</div>
			<div id="note-form-buttons">
				<button type="submit">Save Note</button>
			</div>
		</form>
	);
};

export default NoteDetail;
