import { useEffect, useRef, useState } from 'react';
import { loadModels, getFaceDescriptorFromVideo } from '../utils/face';
import { saveStudent, getStudents } from '../utils/storage';

export default function RegisterStudent() {
  const videoRef = useRef(null);
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [status, setStatus] = useState('Loading camera and models...');

  useEffect(() => {
  let stream;

  async function init() {
    try {
      setStatus('Loading camera and models...');

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setStatus('Camera API is not supported in this browser.');
        return;
      }

      await loadModels();

      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setStatus('Camera ready. Look straight and register.');
    } catch (error) {
      console.error('Camera error:', error);
      setStatus(`Unable to access camera: ${error.message}`);
    }
  }

  init();

  return () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };
}, []);

  async function handleRegister() {
    if (!fullName || !studentId) {
      setStatus('Please enter student name and ID.');
      return;
    }

    const existing = getStudents().find((s) => s.studentId === studentId);
    if (existing) {
      setStatus('Student ID already exists.');
      return;
    }

    setStatus('Capturing face...');
    const detection = await getFaceDescriptorFromVideo(videoRef.current);

    if (!detection) {
      setStatus('No face detected. Please align your face properly.');
      return;
    }

    saveStudent({
      name: fullName,
      studentId,
      descriptor: Array.from(detection.descriptor),
      createdAt: new Date().toISOString(),
    });

    setStatus(`Student ${fullName} registered successfully.`);
    setFullName('');
    setStudentId('');
  }

  return (
    <section>
      <h2 className="page-title">Student Registration</h2>
      <p className="page-subtitle">Capture face data to register a new student</p>

      <div className="card camera-card">
        <video ref={videoRef} autoPlay muted playsInline className="camera-frame" />

        <label>Full Name</label>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter student name" />

        <label>Student ID</label>
        <input value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="Enter student ID" />

        <button className="btn btn-primary" onClick={handleRegister}>Capture & Register</button>
        <div className="status-text">{status}</div>
      </div>
    </section>
  );
}
