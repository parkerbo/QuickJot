import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { saveNote, getNotes, getOneNote, deleteNote } from "../../../store/notes";
import { useDispatch } from "react-redux";
import "./NotesDetail.css"

const NoteDetail = ({notes}) => {
	const dispatch = useDispatch();
    const history = useHistory();
	const { noteId } = useParams();
    const userId = useSelector((state) => state.session.user.id);
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
	}, [note, dispatch]);

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
        dispatch(getNotes(userId));
        dispatch(getOneNote(note.id));
    }
};

const removeNote = async (e) => {
    e.preventDefault();

    const oldNote = await dispatch(deleteNote(note.id));

    if (oldNote){
        dispatch(getNotes(userId));
        history.push(`/notes/`);
    }
}

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
                <button onClick={removeNote}>Delete Note</button>
			</div>
		</form>
	);
};

export default NoteDetail;
