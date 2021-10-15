import landingPhoto from "../../images/landing-page-background.webp"
import "./HomePage.css"
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../../store/notes";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
const HomePage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const notes = useSelector((state) => {
			return state.notes.list;
		});
    const history = useHistory();
    const recentNotes = Object.keys(notes).slice(0,4).reduce((res,key) => {
        res[key] = notes[key];
        return res;
    }, []);
    console.log(recentNotes)
    useEffect(() => {
			dispatch(getNotes(sessionUser.id));
		}, [dispatch, sessionUser]);
return (
	<div className="home-page-content">
		<div id="home-page-info">
			<h2>{`Welcome back,  ${sessionUser.username}`}</h2>
		</div>
		<div id="home-photo-div">
			<img src={landingPhoto} alt="Landing Page" />
		</div>
		<div id="home-page-notes">
			<div id="note-home-info">
				<span style={{marginRight: "auto"}}>Recent Notes</span>
				<i className="fas fa-plus-square fa-2x" style={{float:"right", paddingTop: 1, paddingRight: 15}}></i>
			</div>
            <div id="recent-notes">
            {recentNotes.map((note) => {
               return  <div id="note-card" onClick={() => history.push(`/notes/${note.id}`)}>
                   <h2>{note.title}</h2>
                   <h3>{note.content}</h3>
                    </div>
            })}
            </div>
		</div>
	</div>
);
}

export default HomePage;
