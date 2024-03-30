"use server";

import { transactionService } from "./TransactionService";

export const checkValidTokenAction = async (token: string) => {
  try {
    await transactionService.checkValidSnapToken(token);
    return true;
  } catch (error) {
    return false;
  }
};
