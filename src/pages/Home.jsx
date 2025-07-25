import './Home.css';
import { Link } from 'react-router-dom';

<Link to="/login">
  <button className="get-started-btn">Get Started</button>
</Link>

const Home = () => {
  return (
    <div className="home-container">
      {/* Row 1 */}
      <div className="home-row">
        <div className="home-left">
          <h1 className="home-title">Welcome to Study Hub</h1>
          <p className="home-subtitle">
            Your all-in-one platform for learning and study support. Access class-wise notes, resources, and video content to enhance your academic journey.
          </p>
          <Link to="/login">
            <button className="get-started-btn">Get Started</button>
          </Link>
        </div>
        <div className="home-right">
          <img src="/images/study2.png" alt="Study Illustration" className="hero-img" />
        </div>
      </div>

      {/* Row 2 */}
      <div className="home-row feature-box">
        <div className="home-right">
          <img src="/images/class-wise-notes.png" alt="Notes" className="feature-img" />
        </div>
        <div className="home-left">
          <h3 className="feature-title">Class-wise Notes</h3>
          <p>Organized and reliable notes for every subject and class level. Download, revise, and stay ahead.</p>
        </div>
      </div>

      {/* Row 3 */}
      <div className="home-row feature-box">
        <div className="home-left">
          <h3 className="feature-title">Video Tutorials</h3>
          <p>Access curated educational videos to visualize and understand concepts more effectively.</p>
        </div>
        <div className="home-right">
          <img src="/images/vd2.png" alt="Videos" className="feature-img" />
        </div>
      </div>

      {/* Row 4 */}
      <div className="home-row feature-box">
        <div className="home-right">
          <img src="/images/r.jpg" alt="Resources" className="feature-img" />
        </div>
        <div className="home-left">
          <h3 className="feature-title">Study Resources</h3>
          <p>Find study planners, guides, and practice sets to improve your performance.</p>
        </div>
      </div>

      <div className="home-stats">
        <h2>Join 10,000+ learners using Study Hub</h2>
        <p>
          We aim to empower students with easy-to-access, quality educational content — wherever and whenever they need it.
        </p>
        <Link to="/login">
            <button className="get-started-btn">Get Started</button>
          </Link>
      </div>
      
    </div>
  );
};

export default Home;