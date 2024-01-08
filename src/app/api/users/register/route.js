import { prisma } from "@/lib/prisma.jsx";
import { NextResponse } from "next/server.js";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const cookieStore = cookies();
    const { username, password } = await req.json();

    // Input validation
    if (!username || !password || password.length < 6) {
      return NextResponse.json({
        success: false,
        error:
          "Invalid username or password. Make sure to provide a valid username and a password with at least 6 characters.",
      });
    }

    const _user = await prisma.user.findFirst({
      where: { username },
    });

    if (_user) {
      return NextResponse.json({
        success: false,
        error: "Username already exists. Please choose another one.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    // Log successful registration
    console.log(`User ${username} registered successfully`);

    const token = jwt.sign(
      { userId: user.id, username },
      process.env.JWT_SECRET
    );
    cookieStore.set("token", token);
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Registration error:", error.message);

    return NextResponse.json({
      success: false,
      error: "An unexpected error occurred during registration.",
    });
  }
}
