import { getTicketsAction } from "@/lib/actions/ticketAction";
import { columns } from "./Columns";
import TicketTableWrapper from "./TicketTableWrapper";

export default async function TicketTable() {
  const tickets = await getTicketsAction();

  return <TicketTableWrapper data={tickets.data} columns={columns} />;
}
