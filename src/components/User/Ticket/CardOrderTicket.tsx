"use client";

import React, { useEffect, useReducer, useState } from "react";
import FormOrderTicket from "./FormOrderTicket";
import { ResponseTicket } from "@/types/ticketAction";
import { getActiveTicketAction } from "@/lib/actions/ticketAction";
import { toast } from "sonner";

const CardOrderTicket = () => {
  const [activeTicket, setActiveTicket] = useState<ResponseTicket | null>(null);
  useEffect(() => {
    (async () => {
      const response = await getActiveTicketAction();
      if (response.status !== "success") {
        toast.error(response.message);
      } else {
        if (response.data) setActiveTicket(response.data);
      }
    })();
  }, []);

  return (
    <>
      <FormOrderTicket activeTicket={activeTicket} />
    </>
  );
};

export default CardOrderTicket;
