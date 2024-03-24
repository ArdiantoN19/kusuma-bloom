"use server";

import { PayloadBodyMemberUser } from "@/types/memberUserAction";
import { memberUserService } from "./MemberUserService";

export const getMemberUserByIdAction = async (userId: string) => {
  try {
    const memberUser = await memberUserService.getMemberUserById(userId);
    return {
      status: "success",
      message: "Member user berhasil didapatkan",
      data: memberUser,
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, member user gagal didapatkan",
      };
    }
    return {
      status: "fail",
      message: error.message,
    };
  }
};

export const addMemberUserAction = async (data: PayloadBodyMemberUser) => {
  try {
    await memberUserService.checkAvailableMemberUserById(data.userId);
    await memberUserService.addMemberUser(data);
    return {
      status: "success",
      message:
        "Member user berhasil ditambahkan, masuk ke dalam tahap verifikasi oleh admin",
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, member user gagal ditambahkan",
      };
    }
    return {
      status: "fail",
      message: error.message,
    };
  }
};

// const print: <T>(arg: T) => T = (arg) => arg
// function fPrint<T>(arg: T): T {
//     return arg
// }
// print<string>('halo')
