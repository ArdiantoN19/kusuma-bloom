export type PayloadBodyFacility = {
  name: string;
  description: string;
  image: string;
  category_age: string;
  capacities: string;
  userId: string;
};

export type ResponseFacility = {
  id: string;
  created_at: Date;
  updated_at: Date;
  user?: {
    name: string;
    image: string;
  };
} & PayloadBodyFacility;

export type ResponseFacilityAction = {
  status: string;
  message: string;
  data?: any;
};

export interface IFacilityService {
  addFacility: (data: PayloadBodyFacility) => Promise<ResponseFacility>;
  getFacilityById: (id: string) => Promise<ResponseFacility>;
  updateImageFacilityById(id: string, image: string): Promise<void>;
  getFacilities(): Promise<ResponseFacility[]>;
  updateFacilityById(
    id: string,
    data: PayloadBodyFacility
  ): Promise<ResponseFacility>;
  deleteFacilityById(id: string): Promise<void>;
}
