import { csrfFetch } from "./csrf";
const LOAD = "notes/LOAD";
const ADD_ONE = "notes/ADD_ONE";
const load = (list) => ({
	type: LOAD,
	list,
});

const addOneNote = (note) => ({
	type: ADD_ONE,
	note,
});

export const getNotes = () => async (dispatch) => {
	const response = await fetch(`/api/notes`);

	if (response.ok) {
		const allNotesList = await response.json();
		dispatch(load(allNotesList));
	}
};

export const saveNote = (noteDetails) => async (dispatch) => {
	const response = await csrfFetch(`/api/notes/${noteDetails.noteId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(noteDetails),
	});

	if (response.ok) {
		const newNote = await response.json();
		dispatch(addOneNote(newNote));
		return newNote;
	}
};

export const getOneNote = (id) => async (dispatch) => {
	const response = await fetch(`/api/notes/${id}`);

	if (response.ok) {
		const note = await response.json();
		dispatch(addOneNote(note));
	}
};
const initialState = {
	list: [],
};
const notesReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD: {
			const allNotes = {};
			console.log(action);
			action.list.forEach((note) => {
				allNotes[note.id] = note;
			});
			return {
				...allNotes,
				...state,
				list: action.list,
			};
		}
		default:
			return state;
	}
};

export default notesReducer;
