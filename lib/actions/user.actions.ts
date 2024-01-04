"use server";

import { database } from "../database";

export const getUserByEmail = async (email: string) => {
  try {
    const user = database.user.findUnique({ where: { email } })

    return user;
  } catch (error) {
    console.log(error);
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = database.user.findUnique({ where: { id } })

    return user;
  } catch (error) {
    console.log(error);
  }
}