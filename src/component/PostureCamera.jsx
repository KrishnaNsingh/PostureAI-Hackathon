import { useEffect, useRef, useState } from "react";

export default function PostureCamera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("Initializing...");

  useEffect(() => {
    let detector;

    const init = async () => {
      const tf = window.tf;
      const posedetection = window.poseDetection;
      

      await tf.setBackend("webgl");
      await tf.ready();
      

      detector = await posedetection.createDetector(
        posedetection.SupportedModels.MoveNet,
        {
          modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        }
      );

      const video = videoRef.current;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      video.srcObject = stream;
      await video.play();

      detect(detector);
    };

    const detect = async (detector) => {
      const video = videoRef.current;

      const loop = async () => {
        if (video.readyState === 4) {
          const poses = await detector.estimatePoses(video);

          if (poses.length > 0) {
            const posture = checkPosture(poses[0]);
            setStatus(posture);
            drawPose(poses[0], posture);
          }
        }

        requestAnimationFrame(loop);
      };

      loop();
    };

    init();
  }, []);

  const checkPosture = (pose) => {
    const keypoints = pose.keypoints;

    const nose = keypoints.find(k => k.name === "nose");
    const leftShoulder = keypoints.find(k => k.name === "left_shoulder");
    const rightShoulder = keypoints.find(k => k.name === "right_shoulder");

    if (!nose || !leftShoulder || !rightShoulder) return "Detecting...";

    const mid = (leftShoulder.x + rightShoulder.x) / 2;

    return (nose.x - mid > 40) ? "Slouching ❌" : "Good Posture ✅";
  };

  const drawPose = (pose, posture) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, 640, 480);

    pose.keypoints.forEach((kp) => {
      if (kp.score > 0.5) {
        ctx.beginPath();
        ctx.arc(kp.x, kp.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = posture.includes("Good") ? "lime" : "red";
        ctx.fill();
      }
    });
  };

  return (
    <div className="relative">
      <video ref={videoRef} className="w-full rounded-xl" />
      <canvas ref={canvasRef} width="640" height="480" className="absolute top-0 left-0" />
      <div className="absolute top-2 left-2 bg-black px-3 py-1 rounded text-white">
        {status}
      </div>
    </div>
  );
}