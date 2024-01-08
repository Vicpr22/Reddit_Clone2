import { prisma } from "@/lib/prisma.jsx";
import { NextResponse } from "next/server.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request, response) {
  try {
    const cookieStore = cookies();
    const { username, password } = await request.json();

    const user = await prisma.user.findFirst({ where: { username } });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User not found. Please register",
      });
    }

    const isPasswordVerified = await bcrypt.compare(password, user.password);

    if (!isPasswordVerified) {
      return NextResponse.json({
        success: false,
        error: "Username and/or password is not valid.",
      });
    }

    delete user.password;
    // create the token that we can send in the cookie
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    cookieStore.set("token", token);
    return NextResponse.json({ success: true, user, token });
  } catch (error) {
    console.error("Login error:", error.message);

    return NextResponse.json({
      success: false,
      error: "An unexpected error occurred during login.",
    });
  }
}
