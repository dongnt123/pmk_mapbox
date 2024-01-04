"use server";

import { database } from "../database";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await database.account.findFirst({ where: { userId } });

    return account;
  } catch (error) {
    console.error(error);
  }
}