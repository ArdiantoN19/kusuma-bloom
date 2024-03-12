import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const responseJson = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      {
        status: "fail",
        message: responseJson.error.message,
      },
      { status: response.status }
    );
  }

  return NextResponse.json(
    {
      status: "success",
      message: "Image berhasil diunggah",
      data: responseJson.secure_url,
    },
    { status: 201 }
  );
}
