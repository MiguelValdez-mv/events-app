import { Ticket } from "../../types";
import { Selector } from "../Selector";

export type TicketDetailsProps = {
  ticket: Ticket;
  refreshData: () => void;
};

export function TicketDetails({ ticket, refreshData }: TicketDetailsProps) {
  return (
    <tr>
      <td>{ticket.title}</td>

      <td>{ticket.type}</td>

      <td>{new Date(ticket.releaseDate).toDateString()}</td>

      <td>
        <Selector ticketId={ticket.id} refreshData={refreshData} />
      </td>

      <td>
        {ticket.price} {ticket.currency}
      </td>
    </tr>
  );
}
