import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TicketDetails } from ".";
import { Ticket } from "../../types";
import { KEYS } from "../../constants";

const mockTicket: Ticket = {
  id: "1",
  title: "Ticket title",
  type: "Type",
  description: "Description.",
  releaseDate: 1607554800000,
  price: 10,
  currency: "USD",
  units: 0,
};

describe("TicketDetails", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("abre el modal, hace click en Add y actualiza localStorage", async () => {
    const refreshData = jest.fn();

    render(
      <table>
        <tbody>
          <TicketDetails ticket={mockTicket} refreshData={refreshData} />
        </tbody>
      </table>
    );

    await userEvent.click(screen.getByText(/Ticket title/i));

    expect(
      screen.getByText(/Name: Ticket title - Type: Type/)
    ).toBeInTheDocument();

    await userEvent.click(screen.getByText(/Add/i));

    await waitFor(() => {
      expect(
        screen.queryByText(/Name: Ticket title - Type: Type/)
      ).not.toBeInTheDocument();
    });

    const key = KEYS.UNITS_BY_TICKET_ID(mockTicket.id);
    expect(localStorage.getItem(key)).toBe("1");

    expect(refreshData).toHaveBeenCalled();
  });
});
