const STUDENTS_KEY = 'fa_students';
const ATTENDANCE_KEY = 'fa_attendance';
const OD_KEY = 'fa_od';

export function getStudents() {
  return JSON.parse(localStorage.getItem(STUDENTS_KEY) || '[]');
}

export function saveStudent(student) {
  const students = getStudents();
  students.push(student);
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
}

export function getAttendance() {
  return JSON.parse(localStorage.getItem(ATTENDANCE_KEY) || '[]');
}

export function saveAttendance(record) {
  const records = getAttendance();
  records.push(record);
  localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(records));
}

export function getOD() {
  return JSON.parse(localStorage.getItem(OD_KEY) || '[]');
}

export function saveOD(record) {
  const records = getOD();
  records.push(record);
  localStorage.setItem(OD_KEY, JSON.stringify(records));
}

export function isAlreadyMarkedToday(studentId) {
  const today = new Date().toISOString().slice(0, 10);
  return getAttendance().some((r) => r.studentId === studentId && r.date === today);
}
