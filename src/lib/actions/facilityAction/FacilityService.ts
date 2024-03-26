import {
  IFacilityService,
  PayloadBodyFacility,
  ResponseFacility,
} from "@/types/facilityAction";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";

class FacilityService implements IFacilityService {
  constructor(private readonly prismaFacility: PrismaClient["facility"]) {}

  async addFacility(data: PayloadBodyFacility): Promise<ResponseFacility> {
    const facility = await this.prismaFacility.create({
      data,
    });

    return facility;
  }

  async getFacilityById(id: string): Promise<ResponseFacility> {
    const facility = await this.prismaFacility.findFirst({
      where: {
        id,
      },
    });

    if (!facility) {
      throw new Error("Fasilitas tidak ditemukan");
    }

    return facility;
  }

  async updateImageFacilityById(id: string, image: string): Promise<void> {
    await this.prismaFacility.update({
      where: {
        id,
      },
      data: {
        image,
      },
    });
  }

  async getFacilities(): Promise<ResponseFacility[]> {
    const facilities = await this.prismaFacility.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        updated_at: "desc",
      },
    });
    return facilities as ResponseFacility[];
  }

  async getFacilitiesWithParams(params: string): Promise<ResponseFacility[]> {
    const facilities = await this.prismaFacility.findMany({
      where: {
        name: {
          contains: params,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        updated_at: "desc",
      },
    });
    return facilities as ResponseFacility[];
  }

  async getFacilityDetail(slug: string): Promise<ResponseFacility> {
    const facilities = await this.prismaFacility.findFirst({
      where: {
        name: slug,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return facilities as ResponseFacility;
  }

  async updateFacilityById(
    id: string,
    data: PayloadBodyFacility
  ): Promise<ResponseFacility> {
    const facility = await this.prismaFacility.update({
      where: {
        id,
      },
      data,
    });

    return facility;
  }

  async deleteFacilityById(id: string): Promise<void> {
    await this.prismaFacility.delete({
      where: {
        id,
      },
    });
  }
}

export const facilityService = new FacilityService(prisma.facility);
