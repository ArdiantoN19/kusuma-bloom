"use server";

import { ResponseUserAction, PayloadBodyUser } from "@/types/userAction";
import { userService } from "./UserService";
import bcryptPasswordHash from "@/utils/bcryptPasswordHash";

export const addUserAction = async (
  data: PayloadBodyUser
): Promise<ResponseUserAction> => {
  try {
    await userService.checkAvailableEmail(data.email);
    data.password = await bcryptPasswordHash.hash(data.password);
    const user = await userService.addUser(data);
    return {
      status: "success",
      message: "User berhasil ditambahkan",
      data: {
        id: user.id,
      },
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, user gagal didapatkan",
      };
    }
    return {
      status: "fail",
      message: error.message,
    };
  }
};

export const getUsersAction = async (
  idToExclude: string
): Promise<ResponseUserAction> => {
  try {
    const users = await userService.getUsers(idToExclude);
    return {
      status: "success",
      message: "Users berhasil didapatkan",
      data: users,
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, user gagal didapatkan",
      };
    }
    return {
      status: "fail",
      message: error.message,
    };
  }
};

export const updateImageUserByIdAction = async (
  id: string,
  image: string
): Promise<ResponseUserAction> => {
  try {
    const user = await userService.getUserById(id);
    await userService.updateImageUserById(user.id, image);
    return {
      status: "success",
      message: "Image user berhasil diubah",
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, ubah image user gagal",
      };
    }
    return {
      status: "fail",
      message: error.message,
    };
  }
};

export const updateUserByIdAction = async (
  id: string,
  data: PayloadBodyUser
): Promise<ResponseUserAction> => {
  try {
    const user = await userService.getUserById(id);
    data.password = await bcryptPasswordHash.hash(data.password);
    await userService.updateUserById(user.id, data);
    return {
      status: "success",
      message: "User berhasil diubah",
      data: {
        id: user.id,
      },
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, user gagal diubah",
      };
    }
    return {
      status: "fail",
      message: error.message,
    };
  }
};

export const deleteUserByIdAction = async (id: string) => {
  try {
    await userService.getUserById(id);
    await userService.deleteUserById(id);
    return {
      status: "success",
      message: "User berhasil dihapus",
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, user gagal dihapus",
      };
    }
    return {
      status: "fail",
      message: error.message,
    };
  }
};
