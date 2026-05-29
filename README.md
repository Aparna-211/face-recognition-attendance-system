# 🎓 FaceAttend AI — Face Recognition Attendance System

> A browser-based, real-time face recognition attendance portal built with JavaScript and face-api.js.  
> No server required. Runs entirely in the browser.

---

## 📌 Overview

**FaceAttend AI** is a web application that automates student attendance using facial recognition technology. Students register once with their photo, and the system identifies them in real time via webcam — no manual roll calls needed.

Built as an academic project to explore real-world applications of computer vision and AI in educational environments.

---

## ✨ Features

- 📷 **Real-time face detection** via webcam using face-api.js
- 🧠 **Face recognition** using pre-trained deep learning models (SSD MobileNet + FaceNet)
- 📝 **Student registration** — enroll with a photo, name, and ID
- ✅ **Automated attendance marking** — recognized faces are logged instantly
- 💾 **Browser-based storage** — attendance records saved in localStorage
- ⚡ **No backend required** — fully client-side, runs in any modern browser
- 🖥️ **Clean, responsive UI** built with HTML, CSS, and JavaScript

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| AI / Face Recognition | [face-api.js](https://github.com/justadudewhohacks/face-api.js) |
| ML Models | SSD MobileNetV1, FaceLandmark68Net, FaceRecognitionNet |
| Build Tool | Vite |
| Storage | Browser localStorage |

---

## 📁 Project Structure

```
face-recognition-attendance-system/
├── public/
│   └── models/              # face-api.js model weights (not included — see setup)
├── src/
│   └── main.js              # Core app logic
├── index.html               # Entry point
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or above)
- A modern browser (Chrome recommended for webcam support)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Aparna-211/face-recognition-attendance-system.git
cd face-recognition-attendance-system

# 2. Install dependencies
npm install

# 3. Download face-api.js model files
# Get them from: https://github.com/justadudewhohacks/face-api.js/tree/master/weights
# Place the following files inside /public/models/:
#   - ssd_mobilenetv1_model-weights_manifest.json + shard files
#   - face_landmark_68_model-weights_manifest.json + shard files
#   - face_recognition_model-weights_manifest.json + shard files

# 4. Start the development server
npm run dev
```

Open your browser at `http://localhost:5173`

---

## 🧪 How to Use

1. **Register a student** — Enter name, ID, and capture a face photo
2. **Mark attendance** — Open the attendance page; the webcam scans and matches registered faces automatically
3. **View records** — Attendance logs are displayed in the dashboard

---

## ⚠️ Known Limitations

- Model files are not included in the repo due to file size (~30MB). They must be downloaded separately (see setup above).
- Recognition accuracy depends on lighting conditions and webcam quality.
- Data is stored in browser localStorage — clearing browser data will erase records. A backend database is planned for a future version.

---

## 🔮 Future Improvements

- [ ] Add backend (Node.js / Python Flask) with a real database (MongoDB / PostgreSQL)
- [ ] Export attendance records to CSV / Excel
- [ ] Admin dashboard with analytics
- [ ] Mobile-responsive camera support
- [ ] Multi-class / multi-subject attendance tracking

---

## 👩‍💻 Author

**Aparna Sriram**  
B.Tech AI & Data Science | Kings College of Engineering  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/aparna-sriram-ab59b633a)  
[![GitHub](https://img.shields.io/badge/GitHub-Aparna--211-black?style=flat&logo=github)](https://github.com/Aparna-211)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
