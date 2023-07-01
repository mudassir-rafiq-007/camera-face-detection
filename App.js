import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import * as ExpoCamera from "expo-camera";
import * as FaceDetector from "expo-face-detector";

export default function App() {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [micPermission, setMicPermission] = useState(false);

  function requestPermissions() {
    ExpoCamera.requestCameraPermissionsAsync().then((response) => {
      if (response.granted) {
        setCameraPermission(true);
        ExpoCamera.requestMicrophonePermissionsAsync().then((response) => {
          if (response.granted) {
            setMicPermission(true);
          }
        });
      }
    });
  }

  useEffect(() => {
    requestPermissions();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {micPermission && cameraPermission ? (
        <ExpoCamera.Camera
          style={{ flex: 1 }}
          type={ExpoCamera.CameraType.front}
          onFacesDetected={(faces) => console.log(faces)}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.accurate,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
            runClassifications: FaceDetector.FaceDetectorClassifications.none,
            tracking: true,
          }}
        ></ExpoCamera.Camera>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Permission not granted</Text>
        </View>
      )}
    </View>
  );
}
