import './Blog.css';
import { FaLightbulb, FaClock, FaBrain } from 'react-icons/fa';

const blogPosts = [
  {
    id: 1,
    title: "🧠 5 Best Study Techniques to Retain More",
    example: "Example: Instead of rereading a chapter, try explaining it aloud to someone else (Protégé Effect).",
    description: "Explore powerful techniques like retrieval practice, spaced repetition, dual coding, interleaving, and the protégé effect.",
    video: "https://www.youtube.com/embed/p60rN9JEapg",
    iconPosition: 'top-right',
    icon: <FaLightbulb size={60} className="blog-icon top-right" />,
    
  },
  {
    id: 2,
    title: "⏳ 10 Time Management Hacks for Students",
    example: "Example: Use the Pomodoro technique — 25 minutes of study followed by a 5-minute break.",
    description: "Master your time with proven strategies like daily planners, time blocking, the 2-minute rule, and priority mapping.",
    video: "https://www.youtube.com/embed/mNBmG24djoY",
    iconPosition: 'top',
    icon: <FaClock size={60} className="blog-icon top-left" />,
    alignRight: false
  },
  {
    id: 3,
    title: "🧘 Focus Hacks to Improve Exam Prep",
    example: "Example: Practice mindfulness meditation for 10 minutes before starting your studies.",
    description: "Boost your concentration with techniques like digital detox, study zones, and structured daily schedules.",
    video: "https://www.youtube.com/embed/CPxSzxylRCI",
    iconPosition: 'top-right',
    icon: <FaBrain size={60} className="blog-icon top-right" />,
    
  }
];

const Blog = () => {
  return (
    <div className="blog-container">
      <h1 className="blog-title">📘 Study Hub Blog</h1>
      {blogPosts.map((post, index) => (
        <div className={`blog-section ${index % 2 !== 0 ? 'reverse' : ''}`} key={post.id}>
          <div className="blog-video">
            <iframe
              src={post.video}
              title={post.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className={`blog-content ${post.alignRight ? 'text-right' : ''}`}>
            {post.iconPosition === 'top-right' && <div className="icon-wrapper top-right">{post.icon}</div>}
            {post.iconPosition === 'top' && <div className="icon-wrapper top">{post.icon}</div>}
            <h2>{post.title}</h2>
            <p className="example">{post.example}</p>
            <p>{post.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;