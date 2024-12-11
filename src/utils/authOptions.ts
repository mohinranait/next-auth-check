import connectDb from "@/config/databaseConfig";
import User from "@/models/UserModal";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";


export const authOptions : NextAuthOptions = {
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60,
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Missing credentials");
                }
        
                await connectDb();
        
                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error("User not found");
                }
        
                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }

                console.log("Login User", user);
                
        
                return {
                    id: user._id.toString(),
                    name: `${user.name.firstName} ${user.name.lastName}`,
                    email: user.email,
                };
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
}