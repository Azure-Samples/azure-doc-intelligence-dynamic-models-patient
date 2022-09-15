import useUserMedia from "../hooks/useUserMedia";
import { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiCamera, mdiCameraOff, mdiUpload } from "@mdi/js";
import { Button } from "../components/Button";
import CameraFeed from "../components/CameraFeed";
import { DragDropZone } from "../components/DragDropZone";
import FileToUpload from "../components/FileToUpload";

function Root() {
  const [cameraActive, setCameraActive] = useState(false);
  const [mediaStream, videoDimensions] = useUserMedia(cameraActive);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  useEffect(() => {
    if (fileToUpload) {
      setCameraActive(false);
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
          <FileToUpload file={fileToUpload} width={videoDimensions?.width} height={videoDimensions?.height} />
          <Button onClick={() => {}}>
            <>
              <Icon path={mdiUpload} size={1} />
            </>
          </Button>
        </>
      )}
    </>
  );
}

export default Root;
