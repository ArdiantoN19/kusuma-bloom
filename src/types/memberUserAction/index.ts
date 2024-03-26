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

export type PayloadVerifyMemberUser = {
  userId: string;
  acceptedBy: string;
};

export type PayloadDeleteMemberUser = PayloadVerifyMemberUser;

export interface IMemberUser {
  checkAvailableMemberUserById: (userId: string) => Promise<void>;
  addMemberUser: (data: PayloadBodyMemberUser) => Promise<void>;
  getMemberUserById: (userId: string) => Promise<ResponseMemberUser>;
  verifyMemberUser: (data: PayloadVerifyMemberUser) => Promise<void>;
  deleteMemberUser(data: PayloadDeleteMemberUser): Promise<void>;
}
