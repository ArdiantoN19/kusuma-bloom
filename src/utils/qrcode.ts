import QRCode from "qrcode";

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
