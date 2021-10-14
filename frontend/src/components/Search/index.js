import "./Search.css";
import { useEffect, useRef, useState} from "react";
import { useSelector } from "react-redux";
const Search = (props) => {
    const ref = useRef();
    const [searchQuery, setSearchQuery] = useState("a");
    const queryNotes = (notes, searchQuery) => {
       if (!searchQuery){
           return null
       }

       return props.notes.filter((note) => {
           const noteTitle = note.title.toLowerCase();
           return noteTitle.includes(searchQuery);
       })
   }
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
			<div className="search-bar-div" onClick={(e) => e.stopPropagation()}>
					<input
						type="text"
						placeholder="Search"
						className="search-input-field"
                        ref={ref}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
					/>

				<div className="search-results-div">{filteredNotes? (<>Notes</>): null}
                {filteredNotes ? filteredNotes.map(note => {
                    return <li>{note.title}</li>
                }): null}</div>
			</div>
		</div>
	);
}

export default Search;
