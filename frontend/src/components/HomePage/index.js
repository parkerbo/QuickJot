import landingPhoto from "../../images/landing-page-background.webp"
import "./HomePage.css"
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../../store/notes";
import { getNotebooks } from "../../store/notebooks";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
const HomePage = () => {
    const dispatch = useDispatch();
    let { showModal, setShowModal } = useModal();
    const sessionUser = useSelector((state) => state.session.user);
    const notes = useSelector((state) => {
			return state.notes.list;
		});
     const notebooks = useSelector((state) => {
				return state.notebooks.list;
			});
        const toggleModal = (e) => {
					e.stopPropagation();
					e.preventDefault();
					setShowModal(true);
				};
    const history = useHistory();
    const recentNotes = Object.keys(notes).slice(0,4).reduce((res,key) => {
        res[key] = notes[key];
        return res;
    }, []);
    console.log(recentNotes)
    useEffect(() => {
			dispatch(getNotes(sessionUser.id));
            dispatch(getNotebooks(sessionUser.id));
		}, [dispatch, sessionUser]);
        console.log(notes.length)
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
				<span style={{ marginRight: "auto" }}>Recent Notes</span>
				<i
					id="new-note-hover"
					className="fas fa-plus-square fa-2x"
					style={{ float: "right", paddingTop: 1, paddingRight: 15 }}
					onClick={() => history.push("/notes/new")}
				></i>
			</div>
			<div id="recent-notes">
				<div id="box">
					{recentNotes.map((note) => {
						return (
							<div
								id="note-card"
								onClick={() => history.push(`/notes/${note.id}`)}
							>
								<h2>{note.title}</h2>
								<h3>{note.content}</h3>
							</div>
						);
					})}
					{notes.length > 0 ? (
						<div id="note-card-link" onClick={() => history.push("/notes")}>
							<i
								className="fas fa-sticky-note fa-4x"
								style={{ color: "#04A72E", marginTop: -20 }}
							></i>
							<h2>{`Notes (${notes.length})`}</h2>
						</div>
					) : (
						<div id="note-card-link" onClick={() => history.push("/notes/new")}>
							<i
								className="fas fa-plus-square fa-4x"
								style={{ color: "#04A72E", marginTop: -20 }}
							></i>
							<h2
								style={{ textAlign: "center", fontSize: 20 }}
							>{`Create new note`}</h2>
						</div>
					)}
				</div>
			</div>
		</div>
		<div id="home-page-notebooks">
			<div id="note-home-info">
				<span style={{ marginRight: "auto" }}>Your Notebooks</span>
				<i
					id="new-note-hover"
					className="fas fa-plus-square fa-2x"
					style={{ float: "right", paddingTop: 1, paddingRight: 15 }}
					onClick={toggleModal}
				></i>
			</div>
            <div id="show-home-notebooks">
                {notebooks.map(notebook => {
                    return (
											<div id="notebook-card">
												<div
													onClick={() =>
														history.push(`/notebooks/${notebook.id}`)
													}
												>
													<i
														className="fas fa-book-open fa-2x"
														style={{
															padding: 8,
															display: "inline",
															color: "#04A72E",
														}}
													></i>
													<span
														style={{
															fontSize: 20,
															padding: 10,
															marginBottom: 10,
														}}
													>
														{notebook.title}
													</span>
												</div>
											</div>
										);
                })}
            </div>
		</div>
	</div>
);
}

export default HomePage;
