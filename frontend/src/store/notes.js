const LOAD = "notes/LOAD";
const load = (list) => ({
	type: LOAD,
	list,
});

export const getNotes = () => async (dispatch) => {
	const response = await fetch(`/api/notes`);

	if (response.ok) {
		const allNotesList = await response.json();
		dispatch(load(allNotesList));
	}
};
const initialState = {
  list: []
};
const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const allNotes = {};
      console.log(action)
      action.list.forEach(note => {
        allNotes[note.id] = note;
      });
      return {
        ...allNotes,
        ...state,
        list: action.list
      };
    }
    default:
      return state;
    }
}

export default notesReducer;
