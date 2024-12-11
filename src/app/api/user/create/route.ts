import connectDb from "@/config/databaseConfig";
import User from "@/models/UserModal";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Dynamic execution for the API route
export const dynamic = "force-dynamic";

/**
 * Handles the creation of a new user.
 * @param request - The incoming HTTP request.
 * @returns A response containing the created user or an error message.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    console.log("Incoming request body:", body);

    // Connect to the database
    await connectDb();

    const { email, password } = body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "This user already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    let user = await User.create({ ...body, password: hashedPassword });
    user = user.toObject();
    delete user.password; // Remove the password from the response

    console.log("User created successfully:", user);

    return NextResponse.json(
      { success: true, message: "Registration successful", user },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating user:", err);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
