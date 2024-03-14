"use server";

import {
  PayloadBodyFacility,
  ResponseFacilityAction,
} from "@/types/facilityAction";
import { facilityService } from "./FacilityService";

export const addFacilityAction = async (
  data: PayloadBodyFacility
): Promise<ResponseFacilityAction> => {
  try {
    const facility = await facilityService.addFacility(data);
    return {
      status: "success",
      message: "Fasilitas berhasil ditambahkan",
      data: {
        id: facility.id,
      },
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, fasilitas gagal ditambahkan",
      };
    }
    return {
      status: "fail",
      message: error.message,
    };
  }
};

export const updateImageFacilityByIdAction = async (
  id: string,
  image: string
): Promise<ResponseFacilityAction> => {
  try {
    const facility = await facilityService.getFacilityById(id);
    await facilityService.updateImageFacilityById(facility.id, image);
    return {
      status: "success",
      message: "Image fasilitas berhasil diubah",
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, Image fasilitas gagal diubah",
      };
    }
    return {
      status: "fail",
      message: error.message,
    };
  }
};

export const getFacilitiesAction =
  async (): Promise<ResponseFacilityAction> => {
    try {
      const facility = await facilityService.getFacilities();
      return {
        status: "success",
        message: "Fasilitas berhasil didapatkan",
        data: facility,
      };
    } catch (error: any) {
      if ("code" in error) {
        return {
          status: "fail",
          message: "Terjadi kesalahan, fasilitas gagal didapatkan",
        };
      }
      return {
        status: "fail",
        message: error.message,
      };
    }
  };

export const updateFacilityByIdAction = async (
  id: string,
  data: PayloadBodyFacility
): Promise<ResponseFacilityAction> => {
  try {
    const facility = await facilityService.getFacilityById(id);
    await facilityService.updateFacilityById(facility.id, data);
    return {
      status: "success",
      message: "Fasilitas berhasil diubah",
      data: {
        id: facility.id,
      },
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, fasilitas gagal diubah",
      };
    }
    return {
      status: "fail",
      message: error.message,
    };
  }
};

export const deleteFacilityByIdAction = async (
  id: string
): Promise<ResponseFacilityAction> => {
  try {
    await facilityService.getFacilityById(id);
    await facilityService.deleteFacilityById(id);
    return {
      status: "success",
      message: "Fasilitas berhasil dihapus",
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, fasilitas gagal dihapus",
      };
    }
    return {
      status: "fail",
      message: error.message,
    };
  }
};
