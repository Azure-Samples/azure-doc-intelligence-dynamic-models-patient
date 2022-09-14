import { useState, useEffect } from "react";

const useUserMedia = (activate: boolean = false) => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const enableStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setMediaStream(stream);
    };

    if (activate) {
      enableStream();
    } else if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
  }, [activate]);

  return mediaStream;
};

export default useUserMedia;
