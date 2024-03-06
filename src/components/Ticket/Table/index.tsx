import { getTickets } from "@/lib/actions/ticketAction";
import { columns } from "./Columns";
import TicketTableWrapper from "./TicketTableWrapper";

export default async function TicketTable() {
  const tickets = await getTickets();

  return <TicketTableWrapper data={tickets.data} columns={columns} />;
}
