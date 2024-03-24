export type PayloadBodyMemberUser = {
  image: string;
  userId: string;
};

export type ResponseMemberUser = {
  id: string;
  discount: number;
  acceptedBy: string;
  verifiedAt: Date;
  created_at: Date;
  updated_at: Date;
} & PayloadBodyMemberUser;

export interface IMemberUser {
  checkAvailableMemberUserById: (userId: string) => Promise<void>;
  addMemberUser: (data: PayloadBodyMemberUser) => Promise<void>;
  getMemberUserById: (userId: string) => Promise<ResponseMemberUser>;
}
