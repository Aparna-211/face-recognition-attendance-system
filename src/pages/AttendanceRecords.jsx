import { getAttendance } from '../utils/storage';

export default function AttendanceRecords() {
  const records = [...getAttendance()].reverse();

  return (
    <section>
      <h2 className="page-title">Attendance Records</h2>
      <p className="page-subtitle">{records.length} total records</p>

      <div className="card">
        {records.length === 0 ? (
          <div className="empty-state">
            <div>
              <h3>No records yet</h3>
              <p>Attendance records will appear here after recognition.</p>
            </div>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Student ID</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={`${record.studentId}-${index}`}>
                    <td>{record.name}</td>
                    <td>{record.studentId}</td>
                    <td>{record.date}</td>
                    <td>{record.time}</td>
                    <td>{record.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
