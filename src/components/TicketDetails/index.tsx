import { Ticket } from "../../types";
import { Selector } from "../Selector";
import { Modal } from "../Modal";
import { useSelector } from "../../hooks/useSelector";
import { useModal } from "../../hooks/useModal";

export type TicketDetailsProps = {
  ticket: Ticket;
  refreshData: () => void;
};

export function TicketDetails({ ticket, refreshData }: TicketDetailsProps) {
  const { isOpen, openModal, closeModal } = useModal();

  const selector = useSelector({ ticketId: ticket.id, refreshData });

  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <h1>
          Name: {ticket.title} - Type: {ticket.type}
        </h1>

        <h1>{ticket.description}</h1>

        <button
          onClick={() => {
            selector.addUnit();
            closeModal();
          }}
        >
          Add
        </button>
      </Modal>

      <tr onClick={openModal}>
        <td>{ticket.title}</td>

        <td>{ticket.type}</td>

        <td>{new Date(ticket.releaseDate).toDateString()}</td>

        <td>
          <Selector {...selector} />
        </td>

        <td>
          {ticket.price} {ticket.currency}
        </td>
      </tr>
    </>
  );
}
