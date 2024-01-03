import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStores = cookies();

  const secretKey = process.env.JWT_SECRET_KEY || "MY_TOKEN_SECRET";
  const cookieName = process.env.COOKIE_NAME || "PMK_Mapbox_Cookie";

  const token = cookieStores.get(cookieName);

  if (!token) {
    return NextResponse.json({
      message: "User not authenticated!"
    }, {
      status: 401
    })
  }


  try {
    const { value } = token;
    const decode = verify(value, secretKey);

    return new Response(JSON.stringify(decode), {
      status: 200
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message
    }, {
      status: 401
    })
  }
}