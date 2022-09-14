import { Button } from "./Button";
import { dragZone, fileUpload } from "./DragDropZone.css";
import Icon from "@mdi/react";
import { mdiCamera, mdiCameraOff } from "@mdi/js";
import { useEffect, useRef } from "react";

export function DragDropZone({
  setCameraActiveState,
  cameraActive,
  fileSelected,
}: {
  setCameraActiveState: (cb: (state: boolean) => boolean) => void;
  cameraActive: boolean;
  fileSelected: (file: File) => void;
}) {
  const dropZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dropZoneRef.current) {
      const dropArea = dropZoneRef.current;
      ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
      });

      // Highlight drop area when item is dragged over it
      ["dragenter", "dragover"].forEach((eventName) => {
        dropArea.addEventListener(eventName, highlight, false);
      });
      ["dragleave", "drop"].forEach((eventName) => {
        dropArea.addEventListener(eventName, unhighlight, false);
      });

      // Handle dropped files
      dropArea.addEventListener(
        "drop",
        (e) => {
          e.preventDefault();

          const file = e.dataTransfer?.files[0];
          if (file) {
            fileSelected(file);
          }
        },
        false
      );

      function preventDefaults(e: Event) {
        e.preventDefault();
        e.stopPropagation();
      }

      function highlight(e: Event) {
        dropArea.classList.add("highlight");
      }

      function unhighlight(e: Event) {
        dropArea.classList.remove("highlight");
      }
    }
  });

  return (
    <div className={dragZone} ref={dropZoneRef}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="file"
          id="fileElem"
          accept="image/*"
          className={fileUpload}
        />
        <label htmlFor="fileElem">Drop file here</label>
        <br />
        <Button onClick={() => setCameraActiveState((state) => !state)}>
          <>
            <Icon path={cameraActive ? mdiCamera : mdiCameraOff} size={1} />
            <br />
            {cameraActive ? "Turn off camera" : "Use the Camera"}
          </>
        </Button>
      </form>
    </div>
  );
}
