import { useEffect, useRef } from "react";
import { Button } from "./Button";
import Icon from "@mdi/react";
import { mdiCameraIris } from "@mdi/js";
import { hidden } from "../main.css";

export default function CameraFeed({
  mediaStream,
  captureImage,
}: {
  mediaStream: MediaStream | null;
  captureImage: (file: File) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play();
    }
    if (videoRef.current && !mediaStream) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
  }, [mediaStream, videoRef]);

  return (
    <>
      <video ref={videoRef} className={mediaStream ? "" : hidden} />
      {mediaStream && (
        <div>
          <Button
            onClick={() => {
              const video = videoRef.current;
              const canvas = canvasRef.current;
              if (canvas && video) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext("2d");
                if (context) {
                  context.drawImage(
                    video,
                    0,
                    0,
                    video.videoWidth,
                    video.videoHeight
                  );

                  canvas.toBlob((blob) => {
                    if (blob) {
                      const file = new File([blob], "image.png", {
                        type: "image/png",
                      });
                      captureImage(file);
                    }
                  });
                }
              }
            }}
          >
            <>
              <Icon path={mdiCameraIris} size={1} />
              <br />
              Take a picture
            </>
          </Button>

          <canvas ref={canvasRef} className={hidden} />
        </div>
      )}
    </>
  );
}
