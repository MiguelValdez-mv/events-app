export type SelectorTypeProps = {
  currUnits: number;
  addUnit: () => void;
  removeUnit: () => void;
};

export function Selector({
  currUnits,
  addUnit,
  removeUnit,
}: SelectorTypeProps) {
  return (
    <div
      style={{ display: "flex", flexDirection: "row" }}
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={addUnit}>+</button>

      <h1 style={{ paddingRight: 16, paddingLeft: 16 }}>{currUnits}</h1>

      <button onClick={removeUnit}>-</button>
    </div>
  );
}
