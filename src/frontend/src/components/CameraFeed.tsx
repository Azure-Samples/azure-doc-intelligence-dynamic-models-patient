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
              if (canvasRef.current && videoRef.current) {
                const context = canvasRef.current.getContext("2d");
                if (context) {
                  context.drawImage(videoRef.current, 0, 0, 640, 480);

                  canvasRef.current.toBlob((blob) => {
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
