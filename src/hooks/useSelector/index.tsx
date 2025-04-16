import { KEYS } from "../../constants";

export function useSelector({
  ticketId,
  refreshData,
}: {
  ticketId: string;
  refreshData: () => void;
}) {
  const currUnits = Number(
    localStorage.getItem(KEYS.UNITS_BY_TICKET_ID(ticketId)) || "0"
  );

  const addUnit = async () => {
    localStorage.setItem(
      KEYS.UNITS_BY_TICKET_ID(ticketId),
      String(currUnits + 1)
    );

    await refreshData();
  };
  const removeUnit = async () => {
    if (currUnits === 0) return;

    localStorage.setItem(
      KEYS.UNITS_BY_TICKET_ID(ticketId),
      String(currUnits - 1)
    );

    await refreshData();
  };

  return { currUnits, addUnit, removeUnit };
}
