import { Ticket } from "../../types";
import { Selector } from "../Selector";
import { Modal } from "../Modal";
import { useState } from "react";
import { useSelector } from "../../hooks/useSelector";

export type TicketDetailsProps = {
  ticket: Ticket;
  refreshData: () => void;
};

export function TicketDetails({ ticket, refreshData }: TicketDetailsProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => setIsOpenModal((prev) => !prev);

  const selector = useSelector({ ticketId: ticket.id, refreshData });

  return (
    <>
      <Modal isOpen={isOpenModal} closeModal={toggleModal}>
        <h1>
          Name: {ticket.title} - Type: {ticket.type}
        </h1>

        <h1>{ticket.description}</h1>

        <button
          onClick={() => {
            selector.addUnit();
            setIsOpenModal(false);
          }}
        >
          Add
        </button>
      </Modal>

      <tr onClick={toggleModal}>
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
