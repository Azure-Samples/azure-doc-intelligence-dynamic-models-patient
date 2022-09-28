import { FC } from "react";
import { img } from "./FileToUpload.css";

type Props = {
  file: File;
  width?: number;
  height?: number;
};

const FileToUpload: FC<Props> = ({ file, width, height }) => {
  const url = URL.createObjectURL(file);
  return <img src={url} title="Image to upload" className={img} width={width} height={height} />;
};

export default FileToUpload;
