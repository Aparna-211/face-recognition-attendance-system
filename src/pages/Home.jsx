import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-badge">AI-Powered Attendance System</div>
      <h2>
        Smart AI Face Recognition <span>Attendance Portal</span>
      </h2>
      <p>
        Effortless, secure, and intelligent attendance tracking powered by facial recognition technology.
      </p>

      <div className="hero-actions">
        <button className="btn btn-primary" onClick={() => navigate('/recognition')}>
          Start Recognition
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/register')}>
          Register Student
        </button>
      </div>
    </section>
  );
}
