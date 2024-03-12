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
