import landingPhoto from "../../images/landing-page-background.webp"
import "./HomePage.css"
import { useSelector, useDispatch } from "react-redux";
import { getNotes,createNote, getOneNote } from "../../store/notes";
import { getNotebooks } from "../../store/notebooks";
import { useEffect, useState } from "react";
import date from "date-and-time";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
const HomePage = () => {
    const dispatch = useDispatch();
    let { setShowModal } = useModal();
    const sessionUser = useSelector((state) => state.session.user);
    const notes = useSelector((state) => {
			return state.notes.list;
		});

     const notebooks = useSelector((state) => {
				return state.notebooks.list;
			});
	const defaultNotebook = notebooks.find(
		(notebook) => notebook.title === "First Notebook"
	);

	const [cNotebook, setcNotebook] = useState("");
	useEffect(() => {
		if (defaultNotebook) {
			setcNotebook(defaultNotebook.id);
		}
	}, [defaultNotebook]);
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
    useEffect(() => {
			dispatch(getNotes(sessionUser.id));
            dispatch(getNotebooks(sessionUser.id));
		}, [dispatch, sessionUser]);

	const createNewNote = async () => {
		const payload = {
			title: "",
			content: "",
			userId: sessionUser.id,
			notebookId: cNotebook,
		};
		const newNote = await dispatch(createNote(payload));

		if (newNote) {
			dispatch(getNotes(sessionUser.id));
			dispatch(getOneNote(newNote.id));
			history.push(`/notes/${newNote.id}`);
		}
	};
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
					onClick={createNewNote}
				></i>
			</div>
			<div id="recent-notes">
				<div id="box">
					{recentNotes.map((note) => {
						const currentTime = new Date();
						const noteTime = new Date(note.updatedAt);
						const noteTimeElapsed = date
							.subtract(currentTime, noteTime)
							.toSeconds();
						let noteDateFormatted;

						if (noteTimeElapsed < 60) {
							noteDateFormatted = "a few seconds ago";
						} else if (noteTimeElapsed < 360) {
							noteDateFormatted = "a few minutes ago";
						} else if (noteTimeElapsed < 3600) {
							noteDateFormatted = `${Math.floor(
								date.subtract(currentTime, noteTime).toMinutes()
							)} minutes ago`;
						} else if (noteTimeElapsed < 86400) {
							noteDateFormatted = `${Math.floor(
								date.subtract(currentTime, noteTime).toHours()
							)} hours ago`;
						} else if (noteTimeElapsed < 172800) {
							noteDateFormatted = "yesterday";
						} else {
							noteDateFormatted = date.format(
								noteTime,
								"MMM DD, 'YY - hh:mm A"
							);
						}
						return (
							<div
								id="note-card"
								key={note.id}
								onClick={() => history.push(`/notes/${note.id}`)}
							>
								<h2>{note.title}</h2>
								<h3>{note.content}</h3>
								<h3 style={{marginTop:"auto"}}>{noteDateFormatted}</h3>
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
						<div id="note-card-link" onClick={createNewNote}>
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
				{notebooks.map((notebook) => {
					return (
						<div id="notebook-card" key={notebook.id}>
							<div onClick={() => history.push(`/notebooks/${notebook.id}`)}>
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
