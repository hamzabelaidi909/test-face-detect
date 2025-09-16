import React, { useRef, useEffect, useState } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from 'react-webcam';
import { drawMesh } from "./utilities";
import sound from "../assets/alerte.mp3";
import Red3DButton from './RedButton';
function App({finish,playSound, setPlaySound}) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const faceDetectedRef = useRef(false);
  const noFaceCountRef = useRef(0); 
  const [permissionAudio, setPermissionAudio] = useState(false);
  useEffect(() => {
    let intervalId;
    const loadModel = async () => {
      const net = await facemesh.load({
        inputResolution: { width: 640, height: 480 },
        scale: 0.8
      });
      intervalId = setInterval(() => {
        detect(net);
      }, 100);
    };
    loadModel();

    return () => clearInterval(intervalId); 
  }, []);

  const detect = async (net) => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4 &&
      canvasRef.current
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const face = await net.estimateFaces(video);
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, videoWidth, videoHeight);
      drawMesh(face, ctx);
      if (face.length > 0) {
        faceDetectedRef.current = true;
        noFaceCountRef.current = 0;
      } else {
        if (faceDetectedRef.current) {
          noFaceCountRef.current += 1;
          if (noFaceCountRef.current >= 5) {
            faceDetectedRef.current = false;
            audioRef.current.play();
            setPlaySound(true)
            if (permissionAudio && audioRef.current) {
              audioRef.current.play();
              setPlaySound(true)
            }
          }
        }
      }
    }
  };

  const style = {
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    textAlign: "center",
    width: "640",
    height: " 480",
    zIndex: 9,
  };

  return (
    <>
      <div style={{ margin:"auto", width: 640, height: 480 }}>
        <Webcam ref={webcamRef} style={style} />
        <canvas ref={canvasRef} style={{ ...style, zIndex: 10 }} />
      </div>
      {finish==false?
      <>
      <audio ref={audioRef} src={sound} loop/>
      {playSound?
      <div style={{display: "flex",     marginLeft: "auto",
    marginRight: "auto",  
    justifyContent: "center", 
    alignItems: "center", marginTop:"10px",width: 640}}>
      <Red3DButton onClick={()=>{audioRef.current.pause();setPlaySound(false)}}></Red3DButton></div>:null}</>:null
      
}
    </>
  );
}

export default App;
