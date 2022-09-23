import useUserMedia from "../hooks/useUserMedia";
import { useCallback, useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiUpload } from "@mdi/js";
import { Button } from "../components/Button";
import CameraFeed from "../components/CameraFeed";
import { DragDropZone } from "../components/DragDropZone";
import FileToUpload from "../components/FileToUpload";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [cameraActive, setCameraActive] = useState(false);
  const [mediaStream, videoDimensions] = useUserMedia(cameraActive);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (fileToUpload) {
      setCameraActive(false);
    }
  }, [fileToUpload]);

  const uploadFile = useCallback(async () => {
    if (fileToUpload) {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", fileToUpload);

      const res = await fetch("/api/new-patient/upload-file", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const { patientId } = await res.json();
        navigate(`/verify/${patientId}`);
      } else {
        console.error("Upload failed");
        const resText = await res.text();
        console.error(resText);
      }
    }
  }, [fileToUpload]);

  return (
    <>
      <DragDropZone
        cameraActive={cameraActive}
        setCameraActiveState={setCameraActive}
        fileSelected={setFileToUpload}
      />
      <CameraFeed mediaStream={mediaStream} captureImage={setFileToUpload} />
      {fileToUpload && (
        <>
          <FileToUpload
            file={fileToUpload}
            width={videoDimensions?.width}
            height={videoDimensions?.height}
          />
          <Button onClick={uploadFile}>
            <>
              <Icon path={mdiUpload} size={1} />
            </>
          </Button>
        </>
      )}
    </>
  );
}

export default Upload;
