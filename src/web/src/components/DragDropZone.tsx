import { Button } from "./Button";
import {
  dragZone,
  dragZoneHighlight,
  fileUpload,
  messaging,
} from "./DragDropZone.css";
import { useCallback, useEffect, useRef } from "react";
import uploadImage from "../assets/upload.svg";

export function DragDropZone({
  setCameraActiveState,
  cameraActive,
  fileSelected,
  disabled,
}: {
  setCameraActiveState: (cb: (state: boolean) => boolean) => void;
  cameraActive: boolean;
  fileSelected: (file: File) => void;
  disabled?: boolean;
}) {
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();

      const file = e.dataTransfer?.files[0];
      if (file) {
        fileSelected(file);
      }
    },
    [fileSelected]
  );

  const preventDefaults = useCallback((e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const highlight = useCallback((e: Event) => {
    if (dropZoneRef.current) {
      dropZoneRef.current.className = dragZoneHighlight;
    }
  }, []);

  const unhighlight = useCallback((e: Event) => {
    if (dropZoneRef.current) {
      dropZoneRef.current.className = dragZone;
    }
  }, []);

  useEffect(() => {
    if (dropZoneRef.current) {
      const dropArea = dropZoneRef.current;
      ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
      });

      ["dragenter", "dragover"].forEach((eventName) => {
        dropArea.addEventListener(eventName, highlight, false);
      });
      ["dragleave", "drop"].forEach((eventName) => {
        dropArea.addEventListener(eventName, unhighlight, false);
      });

      dropArea.addEventListener("drop", onDrop, false);
    }
  });

  return (
    <div className={dragZone} ref={dropZoneRef}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="file"
          id="fileElem"
          accept="image/*,.pdf"
          className={fileUpload}
          onChange={(e) => {
            e.target.files && fileSelected(e.target.files[0]);
          }}
          disabled={disabled}
        />
        <img src={uploadImage} alt="Upload file for processing" width={50} />
        <p className={messaging}>Drag and drop files here</p>
        <p className={messaging}>or</p>
        <Button disabled={disabled}>
          <label htmlFor="fileElem">Browse for a file</label>
        </Button>
        <p className={messaging}>or</p>
        <Button
          onClick={() => setCameraActiveState((state) => !state)}
          disabled={disabled}
        >
          <>{cameraActive ? "Turn off camera" : "Take a photo"}</>
        </Button>
      </form>
    </div>
  );
}
