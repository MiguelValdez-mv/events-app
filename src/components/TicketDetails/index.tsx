import { Ticket } from "../../types";
import { Selector } from "../Selector";
import { Modal } from "../Modal";
import { useState } from "react";

export type TicketDetailsProps = {
  ticket: Ticket;
  refreshData: () => void;
};

export function TicketDetails({ ticket, refreshData }: TicketDetailsProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => setIsOpenModal((prev) => !prev);

  return (
    <>
      <Modal isOpen={isOpenModal} closeModal={toggleModal}>
        {null}
      </Modal>

      <tr onClick={toggleModal}>
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
    </>
  );
}
