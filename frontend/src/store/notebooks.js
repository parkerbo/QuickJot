import { csrfFetch } from "./csrf";
const LOAD = "notebooks/LOAD";
const LOAD_NOTEBOOK = "notebooks/LOAD_NOTEBOOK";
const ADD_ONE = "notebooks/ADD_ONE";
const REMOVE = "notebooks/REMOVE";

const load = (list) => ({
	type: LOAD,
	list,
});
const loadCurrentNotebook = (currentNotebook) => ({
	type: LOAD_NOTEBOOK,
	currentNotebook,
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
export const getCurrentNotebook = (notebookId) => async (dispatch) => {
	const response = await fetch(`/api/notebooks/current/${notebookId}`);

	if (response.ok) {
		const currentNotebook = await response.json();
		dispatch(loadCurrentNotebook(currentNotebook));
	}
};
export const createNotebook = (notebookDetails) => async (dispatch) => {
	const response = await csrfFetch(`/api/notebooks/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(notebookDetails),
	});
	if (response.ok) {
		const newNotebook = await response.json();
		dispatch(addOneNotebook(newNotebook));
		return newNotebook;
	}
};

export const editNotebook = (notebookDetails) => async (dispatch) => {
	const response = await csrfFetch(`/api/notebooks/${notebookDetails.notebookId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(notebookDetails),
	});

	if (response.ok) {
		const newNotebook = await response.json();
		dispatch(addOneNotebook(newNotebook));
		return newNotebook;
	}
};

// export const getOneNote = (id) => async (dispatch) => {
// 	const response = await fetch(`/api/notes/${id}`);

// 	if (response.ok) {
// 		const note = await response.json();
// 		dispatch(addOneNote(note));
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
	currentNotebook: []
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
		case LOAD_NOTEBOOK: {
			const currentNotebook = action.currentNotebook;
			return {
				...state,
				currentNotebook: currentNotebook
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
