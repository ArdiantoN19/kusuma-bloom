import FormAddTicket from "@/components/Admin/Ticket/FormAddTicket";
import TicketTable from "@/components/Admin/Ticket/Table";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tiket",
  description: "Ticket page management for Kusuma Bloom",
};

const Page = () => {
  return (
    <div className="space-y-4 ">
      <div className="flex items-center justify-between space-y-2  mb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Ticket
          </h2>
          <p className="text-sm text-muted-foreground">
            Kelola data tiket disini.
          </p>
        </div>
        <FormAddTicket />
      </div>
      <TicketTable />
    </div>
  );
};

export default Page;
