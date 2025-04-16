import { useGetTickets } from "./hooks/useGetTickets";
import { TicketDetails } from "./components/TicketDetails";
import { Ticket } from "./types";
import { Modal } from "./components/Modal";
import { useModal } from "./hooks/useModal";

export default () => {
  const { tickets, refreshData } = useGetTickets();
  const { isOpen, openModal, closeModal } = useModal();

  const showCTA = tickets.some((ticket) => ticket.units >= 1);

  return (
    <div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Title</th>

              <th>Unit</th>

              <th>Toal Price</th>
            </tr>
          </thead>

          <tbody>
            {tickets
              ?.filter((ticket) => ticket.units >= 1)
              .map((ticket) => (
                <tr>
                  <td>{ticket.title}</td>

                  <td>{ticket.units}</td>

                  <td>
                    {ticket.units * ticket.price} {ticket.currency}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <h1>
          Total:{" "}
          {tickets.reduce((acum, curr) => acum + curr.units * curr.price, 0)}
        </h1>
      </Modal>

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

      {showCTA && <button onClick={openModal}>Cart</button>}
    </div>
  );
};
