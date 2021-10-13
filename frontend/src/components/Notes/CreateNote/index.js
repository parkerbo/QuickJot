import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createNote, getNotes, getOneNote } from "../../../store/notes";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const CreateNote = ({notebooks}) => {
	const dispatch = useDispatch();
    const history = useHistory();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
    const userId = useSelector((state) => state.session.user.id);

	const updateTitle = (e) => setTitle(e.target.value);
	const updateContent = (e) => setContent(e.target.value);
    const updatecNotebook = (e) => setcNotebook(e.target.value);
    const defaultNotebook = notebooks.find((notebook) => notebook.title === "First Notebook")

    const [cNotebook, setcNotebook] = useState(defaultNotebook.id);


	const handleSaveNote = async (e) => {
		e.preventDefault();

		const payload = {
			title: title,
			content: content,
            userId: userId,
            notebookId: cNotebook,

		};
		const newNote = await dispatch(createNote(payload));

		if (newNote) {
			dispatch(getNotes(userId));
			dispatch(getOneNote(newNote.id));
            history.push(`/notes/${newNote.id}`);
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
            <div id="note-form-notebooks">
            <select onChange={updatecNotebook} >
                {notebooks.map(notebook =>
                    <option key={notebook.id} value={notebook.id}>{notebook.title}</option>)}
            </select>
            </div>
			<div id="note-form-buttons">
				<div id="save-note-button-div">
					<button type="submit" id="save-note-button">
						Save Note
					</button>
				</div>
			</div>
		</form>
	);
};

export default CreateNote;
