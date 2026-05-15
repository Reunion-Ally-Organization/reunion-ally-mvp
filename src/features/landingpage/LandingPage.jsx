import "../landingpage/LandingPage.css";

const LandingPage = () => {
    return (
        <div id="landing-page">
            <header>
                <nav id="navigation-bar">
                    <a href="/dashboard">Dashboard</a>
                    <a href="/manage">Manage Event</a>
                    <a href="/help">Help</a>

                    <button id="signUp-button" className="navigation-buttons">Sign Up</button>
                    <button id="login-button" className="navigation-buttons">Login</button>
                </nav>
            </header>

            <div id="hero-image">
                <img src="https://placehold.co/1260x600" alt="People enjoying a reunion dinner"/>
            </div>
        </div>
  );
};

export default LandingPage;