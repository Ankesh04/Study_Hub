import './About.css';
const About = () => {
  return (
    <div className="about-container" style={{ padding: '2rem', maxWidth: '900px', margin: 'auto', lineHeight: '1.8' }}>
      <h1 style={{ color: '#ff6b00', textAlign: 'center', marginBottom: '1rem' }}>About Study Hub</h1>

      <p><strong>Study Hub</strong> is your ultimate digital learning companion. Designed for students, teachers, and institutions, it serves as a centralized platform to access subject resources, assignments, notes, videos, and study materials across different classes.</p>

      <h2 style={{ color: '#333' }}>🎯 Purpose</h2>
      <p>The primary goal of Study Hub is to simplify academic access and improve learning outcomes. Whether you're studying at school or coaching centers, you can rely on Study Hub for organized resources tailored by subject and class.</p>

      <h2 style={{ color: '#333' }}>📌 Goals</h2>
      <ul>
        <li>Provide structured, class-wise learning content</li>
        <li>Encourage self-paced learning through video and downloadable material</li>
        <li>Support teachers with easy sharing of notes and assignments</li>
        <li>Foster collaboration between students via shared resources</li>
      </ul>

      <h2 style={{ color: '#333' }}>💡 Benefits</h2>
      <ul>
        <li>Quick access to all educational materials</li>
        <li>Time-saving search and filtering options</li>
        <li>Mobile-friendly, fast, and intuitive design</li>
        <li>Works as both a study planner and a resource bank</li>
      </ul>

      <h2 style={{ color: '#333' }}>👨‍💻 About Us</h2>
      <p>We are a team of passionate developers and educators committed to making learning easier and smarter. With continuous improvements and feedback-driven updates, Study Hub aims to become the go-to platform for every learner in the digital age.</p>

      <p style={{ textAlign: 'center', marginTop: '2rem', fontWeight: 'bold', color: '#555' }}>
        Empowering every student. One click at a time.
      </p>
    </div>
  );
};

export default About;