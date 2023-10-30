import React, {
  Ref,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const ImgCropper = forwardRef((props, ref) => {
  const { aspectRatio, lockAspectRatio, src } = props;
  const cropperRef = useRef(null);
  const [cropper, setCropper] = useState();

  useImperativeHandle(ref, () => ({
    getCropData: () => {
      if (typeof cropper !== 'undefined') {
        return cropper.getCroppedCanvas().toDataURL();
      }
      return '';
    },
  }));

  return lockAspectRatio ? (
    <Cropper
      src={src}
      style={{ height: 400, width: '100%' }}
      initialAspectRatio={aspectRatio}
      aspectRatio={aspectRatio}
      background
      autoCropArea={1}
      guides
      ref={cropperRef}
      scalable={false}
      movable={false}
      zoomable={false}
      zoomOnTouch={false}
      onInitialized={(instance) => {
        setCropper(instance);
      }}
    />
  ) : (
    <Cropper
      src={src}
      style={{ height: 400, width: '100%' }}
      background
      autoCropArea={1}
      guides
      ref={cropperRef}
      scalable={false}
      movable={false}
      zoomable={false}
      zoomOnTouch={false}
      onInitialized={(instance) => {
        setCropper(instance);
      }}
    />
  );
});

export default ImgCropper;
