
"use server"

import dbConnect from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!name || !email || !password) {
        return { error: "Missing fields" };
    }

    try {
        await dbConnect();

        // Check existing
        const existing = await User.findOne({ email });
        if (existing) {
            return { error: "Email already taken" };
        }

        const hashed = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            full_name: name,
            email,
            password_hash: hashed
        });

        return { success: true };

    } catch (e: any) {
        console.error(e);
        return { error: e.message };
    }
}
