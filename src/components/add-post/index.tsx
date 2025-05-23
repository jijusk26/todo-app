// import { UploadOutlined } from "@ant-design/icons";
// import { Button, Col, Modal, Row, Slider, Typography, Upload } from "antd";
// import type { RcFile } from "antd/es/upload";
// import { useCallback, useState } from "react";
// import Cropper from "react-easy-crop";
// import getCroppedImg from "../../helpers/image";

// const AddPost = ({
//   onComplete,
// }: {
//   onComplete: (file: File | Blob) => void;
// }) => {
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const onSelectFile = (file: RcFile) => {
//     const reader = new FileReader();
//     reader.addEventListener("load", () => {
//       setImageSrc(reader.result as string);
//       setIsModalVisible(true);
//     });
//     reader.readAsDataURL(file);
//     return false;
//   };

//   const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   }, []);

//   const onCropDone = async () => {
//     if (!imageSrc || !croppedAreaPixels) return;
//     const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
//     onComplete(croppedImage);
//     setIsModalVisible(false);
//   };

//   return (
//     <>
//       <Upload
//         beforeUpload={onSelectFile}
//         showUploadList={false}
//         accept="image/*"
//       >
//         <Button icon={<UploadOutlined />}>
//           <Typography.Text style={{ fontWeight: "700", color: "blue" }}>
//             Post a Photo
//           </Typography.Text>
//         </Button>
//       </Upload>

//       <Modal
//         title="Crop Image"
//         open={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         onOk={onCropDone}
//         okText="Complete"
//       >
//         {imageSrc && (
//           <div style={{ position: "relative", width: "100%", height: 400 }}>
//             <Cropper
//               image={imageSrc}
//               crop={crop}
//               zoom={zoom}

//               onCropChange={setCrop}
//               onZoomChange={setZoom}
//               onCropComplete={onCropComplete}
//             />
//           </div>
//         )}
//         <Row style={{ marginTop: 16 }}>
//           <Col span={6}>Zoom</Col>
//           <Col span={18}>
//             <Slider
//               min={1}
//               max={3}
//               step={0.1}
//               value={zoom}
//               onChange={(val) => setZoom(val)}
//             />
//           </Col>
//         </Row>
//       </Modal>
//     </>
//   );
// };

// export default AddPost;

import { useRef, useState } from "react";
import { Upload, Button, Modal, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Cropper from "react-cropper";
import "./cropper.css";

const FreeCropper = ({ onComplete }: { onComplete: (blob: Blob) => void }) => {
  const [image, setImage] = useState<string>("");
  const [open, setOpen] = useState(false);
  const cropperRef = useRef<HTMLImageElement>(null);

  const handleUpload = (file: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setOpen(true);
    };
    reader.readAsDataURL(file);
    return false; // prevent default upload
  };

  const handleCrop = () => {
    const cropper = (cropperRef.current as any)?.cropper;
    cropper.getCroppedCanvas().toBlob((blob: Blob | null) => {
      if (blob) {
        onComplete(blob);
        setOpen(false);
      }
    });
  };

  return (
    <>
      <Upload
        beforeUpload={handleUpload}
        showUploadList={false}
        accept="image/*"
      >
        <Button
          type="text"
          style={{ marginRight: 10 }}
          icon={<UploadOutlined style={{ color: "blue" }} />}
        >
          <Typography.Text style={{ fontWeight: "700", color: "blue" }}>
            Post a Photo
          </Typography.Text>
        </Button>
      </Upload>

      <Modal
        open={open}
        title="Free Crop Image"
        onCancel={() => setOpen(false)}
        onOk={handleCrop}
        okText="Done"
        width={800}
      >
        <Cropper
          src={image}
          style={{ height: 400, width: "100%" }}
          initialAspectRatio={NaN} // No fixed aspect
          viewMode={1}
          guides={true}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          ref={cropperRef}
        />
      </Modal>
    </>
  );
};

export default FreeCropper;
