import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import bcrypt from "bcrypt";

import { getCurrentUser } from "@/lib/actions/user.actions";

export async function POST(request: Request) {
  const body = await request.json();

  const { username, password } = body;

  // Check user in DB
  const currentUser = await getCurrentUser(username);
  if (!currentUser) {
    return NextResponse.json({
      message: "User not found!"
    }, {
      status: 401
    })
  }
  if (!bcrypt.compareSync(password, currentUser.password)) {
    return NextResponse.json({
      message: "Password invalid!"
    }, {
      status: 401
    })
  }

  // Create JWT and pass to cookie
  const secretKey = process.env.JWT_SECRET_KEY || "MY_TOKEN_SECRET";
  const cookieName = process.env.COOKIE_NAME || "PMK_Mapbox_Cookie";
  const MAX_AGE = 60 * 60;

  const token = sign({ username }, secretKey, { expiresIn: MAX_AGE });

  const serializedCookie = serialize(cookieName, token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/"
  })

  const response = {
    message: "Authenticated",
    currentUser
  }

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Set-Cookie": serializedCookie
    }
  });
}