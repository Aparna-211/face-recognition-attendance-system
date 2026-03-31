import { useEffect, useRef, useState } from 'react';
import { loadModels, getFaceDescriptorFromVideo, findBestMatch } from '../utils/face';
import { getStudents, saveAttendance, isAlreadyMarkedToday } from '../utils/storage';

export default function LiveRecognition() {
  const videoRef = useRef(null);
  const [status, setStatus] = useState('Loading recognition system...');

 useEffect(() => {
  let stream;

  async function init() {
    try {
      setStatus('Loading recognition system...');

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setStatus('Camera API is not supported in this browser.');
        return;
      }

     // await loadModels();

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

      setStatus('Camera ready. Stand in front of the camera.');
    } catch (error) {
      console.error('Camera error:', error);
      setStatus(`Camera access failed: ${error.message}`);
    }
  }

  init();

  return () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };
}, []);

  async function handleRecognize() {
    const students = getStudents();
    if (students.length === 0) {
      setStatus('No students registered yet.');
      return;
    }

    setStatus('Recognizing face...');
    const detection = await getFaceDescriptorFromVideo(videoRef.current);
    if (!detection) {
      setStatus('No face detected.');
      return;
    }

    const match = findBestMatch(detection, students);
    if (!match || match.label === 'unknown') {
      setStatus('Unknown face. Attendance not marked.');
      return;
    }

    const matchedStudent = students.find((s) => s.name === match.label);
    if (!matchedStudent) {
      setStatus('Match found but student data missing.');
      return;
    }

    if (isAlreadyMarkedToday(matchedStudent.studentId)) {
      setStatus(`Attendance already marked today for ${matchedStudent.name}.`);
      return;
    }

    const now = new Date();
    saveAttendance({
      name: matchedStudent.name,
      studentId: matchedStudent.studentId,
      date: now.toISOString().slice(0, 10),
      time: now.toLocaleTimeString(),
      status: 'Present',
    });

    setStatus(`Face recognized: ${matchedStudent.name}. Attendance marked successfully.`);
  }

  return (
    <section>
      <h2 className="page-title">Live Recognition</h2>
      <p className="page-subtitle">Stand in front of the camera for automatic face recognition</p>

      <div className="card camera-card">
        <video ref={videoRef} autoPlay muted playsInline className="camera-frame" />
        <button className="btn btn-primary" onClick={handleRecognize}>Recognize Face</button>
        <div className="status-text">{status}</div>
      </div>
    </section>
  );
}
