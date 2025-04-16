import { useGetTickets } from "./hooks/useGetTickets";
import { TicketDetails } from "./components/TicketDetails";
import { Ticket } from "./types";

export default () => {
  const { tickets, refreshData } = useGetTickets();

  return (
    <div>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Title</th>

            <th>Type</th>

            <th>Release Date</th>

            <th>Selector</th>

            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {tickets?.map((ticket: Ticket) => (
            <TicketDetails
              key={ticket.id}
              ticket={ticket}
              refreshData={refreshData}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
