import { prisma } from "@/lib/prisma.jsx";
import { NextResponse } from "next/server.js";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    const cookieStore = cookies(req);
    const token = cookieStore.get("token");

    // Check if the user is authenticated
    if (!token) {
      return NextResponse.json({
        success: false,
        error: "Authentication required. Please log in.",
      });
    }

    // Verify the JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user data using the decoded token
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.userId },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User not found. Please log in again.",
      });
    }

    // Remove sensitive information from the user object
    delete user.password;

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Profile fetch error:", error.message);

    return NextResponse.json({
      success: false,
      error: "An unexpected error occurred while fetching the profile.",
    });
  }
}
