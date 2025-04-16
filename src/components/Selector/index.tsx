import { KEYS } from "../../constants";

export type SelectorTypeProps = {
  ticketId: string;
  refreshData: () => void;
};

export function Selector({ ticketId, refreshData }: SelectorTypeProps) {
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
      String(currUnits + 1)
    );

    await refreshData();
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <button onClick={addUnit}>+</button>

      <h1>{currUnits}</h1>

      <button onClick={removeUnit}>-</button>
    </div>
  );
}
