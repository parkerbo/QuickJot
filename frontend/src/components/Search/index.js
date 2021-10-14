import "./Search.css";
import { useEffect, useRef } from "react";
const Search = (props) => {
    const ref = useRef();
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
					/>

				<div className="search-results-div">Search results go here</div>
			</div>
		</div>
	);
}

export default Search;
