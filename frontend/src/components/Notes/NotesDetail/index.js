import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneNote } from "../../../store/notes";
import { useDispatch } from "react-redux";
import "./NotesDetail.css"

const NoteDetail = () => {
	const dispatch = useDispatch();
	const { noteId } = useParams();
	const note = useSelector((state) => state.notes[noteId]);


	useEffect(() => {
		dispatch(getOneNote(noteId));
	}, [noteId]);

	if (!note) {
		return null;
	}

	let content = null;

		content = (<>
					<h2>{note.title}</h2>
					<h5>{note.content}</h5>
                    </>
		);


	return (
		<div className="note-detail">
			{content}
		</div>
	);
};

export default NoteDetail;
