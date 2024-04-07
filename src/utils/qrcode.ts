import QRCode from "qrcode";
import jsQR from "jsqr";

export const generateQRCode = (text: string): string => {
  const options: Record<string, any> = {
    errorCorrectionLevel: "H",
    quality: 0.3,
    margin: 1,
    width: 250,
    type: "image/webp",
    color: {
      dark: "#00bd71",
      light: "#ffffff",
    },
  };

  let qrCode: string = "";
  QRCode.toDataURL(text, options, (err, url) => {
    if (err) {
      console.error(err);
      return;
    }
    qrCode = url;
  });
  return qrCode;
};

const checkDeviceSupport = () => {
  if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
    return true;
  }
  throw new Error("Browser not supported");
};

export const scanQRCode = async (
  container: HTMLDivElement,
  data: (value: string) => void
) => {
  try {
    checkDeviceSupport();

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });
    const video = document.createElement("video");
    video.srcObject = stream;
    video.setAttribute("playsinline", "true");
    container.appendChild(video);
    await video.play();

    // create canvas to grab frames from video stream
    const canvasElement = document.createElement("canvas");
    const canvas = canvasElement.getContext("2d") as CanvasRenderingContext2D;
    canvasElement.width = video.videoWidth;
    canvasElement.height = video.videoHeight;

    // start scanning from video stream to scan qr code
    const scanFrame = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.drawImage(
          video,
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );
        const imageData = canvas.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          // Stop video stream
          stream.getTracks().forEach((track) => track.stop());
          container.removeChild(video);
          return data(code.data);
        } else {
          requestAnimationFrame(scanFrame);
        }
      } else {
        requestAnimationFrame(scanFrame);
      }
    };
    return scanFrame();
  } catch (error: any) {
    console.error("Error when accessing camera", error.message ?? error);
  }
};
