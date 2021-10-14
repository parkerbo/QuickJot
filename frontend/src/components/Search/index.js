import "./Search.css";
import { useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
const Search = (props) => {
    const ref = useRef();
    const [searchQuery, setSearchQuery] = useState("a");
    const queryNotes = (notes, searchQuery) => {
       if (!searchQuery){
           return null
       }

       return notes.filter((note) => {
           const noteTitle = note.title.toLowerCase();
           return noteTitle.includes(searchQuery.toLowerCase());
       })
   }
   const queryNotebooks = (notebooks, searchQuery) => {
			if (!searchQuery) {
				return null;
			}

			return notebooks.filter((notebook) => {
				const notebookTitle = notebook.title.toLowerCase();
				return notebookTitle.includes(searchQuery.toLowerCase());
			});
		};
   const filteredNotebooks = queryNotebooks(props.notebooks, searchQuery);
   const filteredNotes = queryNotes(props.notes, searchQuery);
   console.log(filteredNotes)
   useEffect(() => {
      if (props.show){
        ref.current.select();
    }
   }, [props])



   if (!props.show) {
			return null;
		}

	return (
		<div className="search-modal" onClick={props.onClose}>
			<div className="search-bar-div" id="side-bar-link" onClick={(e) => e.stopPropagation()}>
				<input
					type="search"
					placeholder="Search"
					className="search-input-field"
					ref={ref}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>

				<div className="search-results-div">
					{filteredNotes ? filteredNotes.length > 0 && <div>Notes</div> : null}
					{filteredNotes
						? filteredNotes.map((note) => {
								return (
									<Link exact to={`/notes/${note.id}`}>
										<li id="note-result-title">{note.title}</li>
									</Link>
								);
						  })
						: null}
					{filteredNotebooks
						? filteredNotebooks.length > 0 && <div>Notebooks</div>
						: null}
					{filteredNotebooks
						? filteredNotebooks.map((notebook) => {
								return (
									<Link exact to={`/notebooks/${notebook.id}`}>
										<li id="note-result-title">{notebook.title}</li>
									</Link>
								);
						  })
						: null}
				</div>
			</div>
		</div>
	);
}

export default Search;
