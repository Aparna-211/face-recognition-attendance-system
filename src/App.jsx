import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RegisterStudent from './pages/RegisterStudent';
import LiveRecognition from './pages/LiveRecognition';
import Dashboard from './pages/Dashboard';
import AttendanceRecords from './pages/AttendanceRecords';
import OnDuty from './pages/OnDuty';
import Team from './pages/Team';

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-wrap">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterStudent />} />
          <Route path="/recognition" element={<LiveRecognition />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/records" element={<AttendanceRecords />} />
          <Route path="/od" element={<OnDuty />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </main>
    </div>
  );
}
