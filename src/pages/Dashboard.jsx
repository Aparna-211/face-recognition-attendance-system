import StatCard from '../components/StatCard';
import { getStudents, getAttendance } from '../utils/storage';

export default function Dashboard() {
  const students = getStudents();
  const attendance = getAttendance();
  const today = new Date().toISOString().slice(0, 10);
  const presentToday = attendance.filter((r) => r.date === today).length;
  const percentage = students.length ? Math.round((presentToday / students.length) * 100) : 0;

  return (
    <section>
      <h2 className="page-title">Dashboard</h2>
      <p className="page-subtitle">Overview of attendance statistics</p>

      <div className="stats-grid">
        <StatCard title="Total Students" value={students.length} subtitle="Registered students" />
        <StatCard title="Present Today" value={presentToday} subtitle={today} />
        <StatCard title="Attendance %" value={`${percentage}%`} subtitle="Today's attendance rate" />
      </div>
    </section>
  );
}
