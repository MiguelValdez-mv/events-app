import { useEffect, useState } from "react";

import { Ticket } from "../../types";
import { KEYS } from "../../constants";

const API_URL = "https://my-json-server.typicode.com/davidan90/demo/tickets";

export function useGetTickets() {
  const [tickets, setTickets] = useState<Array<Ticket>>([]);

  const refreshData = async () => {
    const response = await fetch(API_URL);
    const data = (await response.json())
      .map((ticket: Ticket) => ({
        ...ticket,
        units: Number(
          localStorage.getItem(KEYS.UNITS_BY_TICKET_ID(ticket.id)) || "0"
        ),
      }))
      .sort((a: Ticket, b: Ticket) => a.releaseDate - b.releaseDate);

    setTickets(data);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return { tickets, refreshData };
}
