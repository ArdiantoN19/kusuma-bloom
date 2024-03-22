import { getVouchersAction } from "@/lib/actions/voucherAction";
import VoucherTableWrapper from "./VoucherTableWrapper";
import { columns } from "./Columns";

export default async function VoucherTable() {
  const tickets = await getVouchersAction();

  return <VoucherTableWrapper data={tickets.data} columns={columns} />;
}
