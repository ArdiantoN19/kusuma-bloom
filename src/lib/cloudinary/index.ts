import crypto from "crypto";

export async function uploadImageCloudinary(image: FileList) {
  const formData = new FormData();
  if (image[0]) {
    formData.append("file", image[0]);
  }

  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
  );
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  const responseJson = await response.json();
  return responseJson.data;
}

function generateCloudinarySignature(
  params: Record<string, any>,
  apiSecret: string
) {
  // Sort parameters alphabetically
  const sortedParams = Object.keys(params).sort();

  // Create string with parameter/value pairs joined by '&'
  const paramString = sortedParams
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  // Append API secret
  const paramStringWithSecret = paramString + apiSecret;

  // Generate SHA-1 hash
  const sha1Hash = crypto
    .createHash("sha1")
    .update(paramStringWithSecret)
    .digest("hex");

  return sha1Hash;
}

export const deleteImageFromCloudinary = async (publicId: string) => {
  const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string;
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const params = {
    public_id: publicId,
    timestamp,
  };

  const signature = generateCloudinarySignature(params, apiSecret);
  const data = {
    public_id: publicId,
    signature,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string,
    timestamp,
  };

  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // const responseJson = await response.json();
  // console.log({ responseJson, response });
};

export const getPublicIdFromUrl = (url: string): string => {
  const urls = url.split("/");
  return urls[urls.length - 1].split(".")[0];
};

// Call the function with the public ID of the image you want to delete
// deleteImageFromCloudinary('public_id_of_image_to_delete');
