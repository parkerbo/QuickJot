import "./Splash.css";
import { NavLink } from "react-router-dom";
import splashPhoto from "../../images/splash-page-main-photo.png"
function Splash() {

	return (
		<div className="splash-content">
			<h1>Tame your work, organize your life</h1>
			<h2>
				Remember everything and tackle any project with your notes, tasks, and
				schedule all in one place.
			</h2>
			<p>
				<NavLink to="/signup" id="sign-up-splash">
					Sign up for free
				</NavLink>
			</p>
			<p>
				<NavLink to="/login" id="log-in-splash">
					Already have an account? Log in
				</NavLink>
			</p>
			<div id="splash-photo-div">
				<img src={splashPhoto} id="splash-photo" alt="Main Splash"/>
				<div id="splash-column-text">
					<h3>WORK ANYWHERE</h3>
					<p>
						Keep important info handy—your notes sync automatically to all your
						devices.
					</p>
					<h3>TURN TO-DO INTO DONE</h3>
					<p>
						Bring your notes, tasks, and schedules together to get things done
						more easily.
					</p>
					<h3>FIND THINGS FAST</h3>
					<p>
						Get what you need, when you need it with powerful, flexible search
						capabilities.
					</p>
				</div>
			</div>
		</div>
	);
}

export default Splash;
