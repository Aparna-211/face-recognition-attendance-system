import * as faceapi from 'face-api.js';

let modelsLoaded = false;

export async function loadModels() {
  if (modelsLoaded) return;

  const MODEL_URL = '/models';
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
  ]);

  modelsLoaded = true;
}

export async function getFaceDescriptorFromVideo(video) {
  const detection = await faceapi
    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();

  return detection || null;
}

export function findBestMatch(liveDescriptor, students) {
  if (!liveDescriptor || students.length === 0) return null;

  const labeled = students
    .filter((s) => Array.isArray(s.descriptor))
    .map(
      (s) =>
        new faceapi.LabeledFaceDescriptors(s.name, [new Float32Array(s.descriptor)])
    );

  if (labeled.length === 0) return null;

  const matcher = new faceapi.FaceMatcher(labeled, 0.5);
  return matcher.findBestMatch(liveDescriptor.descriptor);
}
