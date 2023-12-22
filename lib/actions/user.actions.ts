"use server";

import User from "../models/user.model";
import { connectDatabase } from "../mongoose";

export async function getCurrentUser(username: string) {
  connectDatabase();
  try {
    const user = await User.findOne({ "username": username });
    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    console.error("Failed to fetch user", error.message);
  }
}