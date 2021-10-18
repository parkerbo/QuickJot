import { csrfFetch } from "./csrf";
const LOAD = "notes/LOAD";
const ADD_ONE = "notes/ADD_ONE";
const REMOVE = "notes/REMOVE"

const load = (list) => ({
	type: LOAD,
	list,
});

const addOneNote = (note) => ({
	type: ADD_ONE,
	note,
});

const remove = (noteId) => ({
    type: REMOVE,
    noteId
})

export const getNotes = (userId) => async (dispatch) => {
	const response = await fetch(`/api/notes/${userId}`);

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

export const createNote = (noteDetails) => async (dispatch) => {
	const response = await csrfFetch(`/api/notes/`, {
		method: "POST",
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

export const deleteNote = (noteId) => async (dispatch) => {
	const response = await csrfFetch(`/api/notes/${noteId}`, {
		method: "DELETE"
	});
	if (response.ok) {
		const oldNote = await response.json();
		dispatch(remove(oldNote));
		return oldNote;
	}
};

export const getNotebookNotes = (notebookId, userId) => async (dispatch) => {
	const response = await fetch(`/api/notebooks/${notebookId}/notes/${userId}`);

	if (response.ok) {
		const allNotebooksList = await response.json();
		dispatch(load(allNotebooksList));
	}
};

const initialState = {
	list: [],
};
const notesReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD: {
			const allNotes = {};
			action.list.forEach((note) => {
				allNotes[note.id] = note;
			});
			return {
				...allNotes,
				...state,
				list: action.list,
			};
		}
		case REMOVE: {
			const newState = { ...state };
			delete newState[action.noteId];
			return newState;
		}
		default:
			return state;
	}
};

export default notesReducer;
