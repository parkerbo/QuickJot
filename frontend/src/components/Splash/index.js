import "./Splash.css";

function Splash() {

	return (
		<div className="splash-content">
			<h1>Tame your work, organize your life</h1>
			<h2>
				Remember everything and tackle any project with your notes, tasks, and
				schedule all in one place.
			</h2>
			<p>
				<a href="/signup" id="sign-up-splash">
					Sign up for free
				</a>
			</p>
			<p>
				<a href="/login" id="log-in-splash">
					Already have an account? Log in
				</a>
			</p>
		</div>
	);
}

export default Splash;
