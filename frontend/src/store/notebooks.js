import { csrfFetch } from "./csrf";
const LOAD = "notebooks/LOAD";
const ADD_ONE = "notebooks/ADD_ONE";
const REMOVE = "notebooks/REMOVE";

const load = (list) => ({
	type: LOAD,
	list,
});

const addOneNotebook = (notebook) => ({
	type: ADD_ONE,
	notebook,
});

const remove = (notebookId) => ({
	type: REMOVE,
	notebookId,
});

export const getNotebooks = (userId) => async (dispatch) => {
	const response = await fetch(`/api/notebooks/${userId}`);

	if (response.ok) {
		const allNotebooksList = await response.json();
		dispatch(load(allNotebooksList));
	}
};


// export const saveNote = (noteDetails) => async (dispatch) => {
// 	const response = await csrfFetch(`/api/notes/${noteDetails.noteId}`, {
// 		method: "PUT",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(noteDetails),
// 	});

// 	if (response.ok) {
// 		const newNote = await response.json();
// 		dispatch(addOneNote(newNote));
// 		return newNote;
// 	}
// };

// export const getOneNote = (id) => async (dispatch) => {
// 	const response = await fetch(`/api/notes/${id}`);

// 	if (response.ok) {
// 		const note = await response.json();
// 		dispatch(addOneNote(note));
// 	}
// };

// export const createNote = (noteDetails) => async (dispatch) => {
// 	const response = await csrfFetch(`/api/notes/`, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(noteDetails),
// 	});
// 	if (response.ok) {
// 		const newNote = await response.json();
// 		dispatch(addOneNote(newNote));
// 		return newNote;
// 	}
// };

// export const deleteNote = (noteId) => async (dispatch) => {
// 	const response = await csrfFetch(`/api/notes/${noteId}`, {
// 		method: "DELETE",
// 	});
// 	if (response.ok) {
// 		const oldNote = await response.json();
// 		dispatch(remove(oldNote));
// 		return oldNote;
// 	}
// };
const initialState = {
	list: [],
};
const notebooksReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD: {
			const allNotebooks = {};
			console.log(action);
			action.list.forEach((notebook) => {
				allNotebooks[notebook.id] = notebook;
			});
			return {
				...allNotebooks,
				...state,
				list: action.list,
			};
		}
		case REMOVE: {
			const newState = { ...state };
			delete newState[action.notebookId];
			return newState;
		}
		default:
			return state;
	}
};

export default notebooksReducer;
