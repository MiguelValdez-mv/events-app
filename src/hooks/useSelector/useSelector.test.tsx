import { render, act } from "@testing-library/react";

import { useSelector } from ".";
import { KEYS } from "../../constants";

const ticketId = "test-2025";
const mockKey = KEYS.UNITS_BY_TICKET_ID(ticketId);

function setupHook(refreshData: jest.Mock) {
  let result: any = {};

  function HookWrapper() {
    Object.assign(result, useSelector({ ticketId, refreshData }));
    return null;
  }

  render(<HookWrapper />);

  return result;
}

describe("useSelector", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("returns 0 units by default", () => {
    const refreshData = jest.fn();
    const hook = setupHook(refreshData);

    expect(hook.currUnits).toBe(0);
  });

  test("addUnit stores +1 in localStorage and calls refreshData", async () => {
    const refreshData = jest.fn();
    const hook = setupHook(refreshData);

    await act(async () => {
      await hook.addUnit();
    });

    expect(localStorage.getItem(mockKey)).toBe("1");
    expect(refreshData).toHaveBeenCalled();
  });

  test("removeUnit stores -1 in localStorage and calls refreshData if units > 0", async () => {
    localStorage.setItem(mockKey, "3");

    const refreshData = jest.fn();
    const hook = setupHook(refreshData);

    await act(async () => {
      await hook.removeUnit();
    });

    expect(localStorage.getItem(mockKey)).toBe("2");
    expect(refreshData).toHaveBeenCalled();
  });

  test("removeUnit does nothing if units = 0", async () => {
    localStorage.setItem(mockKey, "0");

    const refreshData = jest.fn();
    const hook = setupHook(refreshData);

    await act(async () => {
      await hook.removeUnit();
    });

    expect(localStorage.getItem(mockKey)).toBe("0");
    expect(refreshData).not.toHaveBeenCalled();
  });
});
