import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { saveNote, getNotes, getOneNote, deleteNote } from "../../../store/notes";
import { getNotebookNotes } from "../../../store/notes";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { Autosave, useAutosave } from "react-autosave";
import "./NotesDetail.css"

const NoteDetail = ({notes, notebooks}) => {
	const dispatch = useDispatch();
    const history = useHistory();
	const { noteId } = useParams();
    const userId = useSelector((state) => state.session.user.id);
	const currentNotebook = useSelector((state) => state.notebooks.currentNotebook);
	const note = notes.find(note => note.id === +noteId)
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
	const [cNotebook, setcNotebook] = useState("");



    const updateTitle = (e) => setTitle(e.target.value);
    const updateContent = (e) => setContent(e.target.value);
	const updatecNotebook = (e) => setcNotebook(e.target.value);



	useEffect(() => {
		if (note){
            setTitle(note.title);
            setContent(note.content);
			setcNotebook(note.notebookId)
            dispatch(getOneNote(note.id));
        }
	}, [note, dispatch]);

const handleSaveNote = useCallback( async (e) => {


	const payload = {
		noteId: note.id,
        title: title,
        content: content,
		notebookId: cNotebook
	};

	const newNoteSaved = await dispatch(saveNote(payload));

    if(newNoteSaved){
		if(window.location.href.indexOf("notebooks") > -1){
			dispatch(getNotebookNotes(currentNotebook.id, userId));
		} else {
        dispatch(getNotes(userId));
		}
        dispatch(getOneNote(note.id));
    }
}, [content, title, cNotebook]);
useAutosave({ data: content, onSave: handleSaveNote });
const removeNote = async (e) => {
    e.preventDefault();

    const oldNote = await dispatch(deleteNote(note.id));

    if (oldNote){
		if (window.location.href.indexOf("notebooks") > -1) {
			dispatch(getNotebookNotes(currentNotebook.id, userId));
			history.push(`/notebooks/${currentNotebook.id}`);
		} else {
        dispatch(getNotes(userId));
        history.push(`/notes/`);
		}
    }
}
if (!note) {
	return null;
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
			<div id="note-form-notebooks">
				<div id="notebook-dropdown">
					<i className="fas fa-book" />
					<select onChange={updatecNotebook} value={cNotebook}>
						{notebooks.map((notebook) => (
							<option key={notebook.id} value={notebook.id}>
								{notebook.title}
							</option>
						))}
					</select>
				</div>
			</div>
			<div id="note-form-buttons">
				<div id="save-note-button-div">
					<button type="submit" id="save-note-button">
						Save Note
					</button>
				</div>
				<div id="delete-note-button-div">
					<button onClick={removeNote} id="delete-note-button">
						Delete Note
					</button>
				</div>
			</div>
		</form>
	);
};

export default NoteDetail;
