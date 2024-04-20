import { generateQRCode } from "@/utils/qrcode";
import { useEffect, useState } from "react";

const useQRCode = (id: string) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>(
    "/images/logo-telaga-kusuma.png"
  );
  useEffect(() => {
    const url = generateQRCode(id);
    setQrCodeUrl(url);
  }, [id]);

  return [qrCodeUrl];
};

export default useQRCode;
