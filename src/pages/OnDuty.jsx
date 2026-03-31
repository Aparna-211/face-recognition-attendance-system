import { useState } from 'react';
import { getStudents, saveOD } from '../utils/storage';

export default function OnDuty() {
  const students = getStudents();
  const [studentId, setStudentId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState('');

  function handleOD() {
    const student = students.find((s) => s.studentId === studentId);
    if (!student) {
      setStatus('Student not found.');
      return;
    }

    saveOD({
      name: student.name,
      studentId: student.studentId,
      date,
      status: 'On Duty',
    });

    setStatus(`OD marked for ${student.name} on ${date}.`);
    setStudentId('');
  }

  return (
    <section>
      <h2 className="page-title">On Duty (OD)</h2>
      <p className="page-subtitle">Mark a student as On Duty for a specific date</p>

      <div className="card form-card">
        {students.length === 0 ? (
          <div className="empty-state">
            <p>No students registered yet.</p>
          </div>
        ) : (
          <>
            <label>Select Student ID</label>
            <select value={studentId} onChange={(e) => setStudentId(e.target.value)}>
              <option value="">Choose student</option>
              {students.map((s) => (
                <option key={s.studentId} value={s.studentId}>
                  {s.studentId} - {s.name}
                </option>
              ))}
            </select>

            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

            <button className="btn btn-primary" onClick={handleOD}>Mark OD</button>
            <div className="status-text">{status}</div>
          </>
        )}
      </div>
    </section>
  );
}
