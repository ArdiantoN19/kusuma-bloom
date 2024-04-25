export type PayloadReportType = {
  name: string;
  month: number;
  filename: string;
  size: number;
  userId: string;
};

export interface IReportService {
  addReport(data: PayloadReportType): Promise<void>;
}
