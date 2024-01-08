import { cookies } from "next/headers.js";
import { NextResponse } from "next/server.js";

export async function POST() {
  try {
    const cookieStore = cookies();
    cookieStore.delete("token");

    // Log successful logout
    console.log("User logged out successfully");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error.message);

    return NextResponse.json({
      success: false,
      error: "An unexpected error occurred during logout.",
    });
  }
}
