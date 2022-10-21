import { useState, useEffect } from "react";

export type VideoDimensions = { width?: number; height?: number };

const useUserMedia = (
  activate: boolean = false
): [MediaStream | null, VideoDimensions | null] => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [videoDimensions, setVideoDimensions] =
    useState<VideoDimensions | null>(null);

  useEffect(() => {
    const enableStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { min: 1024, ideal: 1280, max: 1920 },
          height: { min: 576, ideal: 720, max: 1080 },
          facingMode: "environment",
        },
      });
      setMediaStream(stream);
      const videoTrack = stream.getVideoTracks()[0];
      const { width, height } = videoTrack.getSettings();
      setVideoDimensions({ width, height });
    };

    if (activate) {
      enableStream();
    } else if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
      setVideoDimensions(null);
    }
  }, [activate]);

  return [mediaStream, videoDimensions];
};

export default useUserMedia;
