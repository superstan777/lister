import * as db from "@/database/dbFunctions";
import { useDevices } from "@/hooks/useDevices";
import { deviceType } from "@/types/deviceType";
import { act, renderHook } from "@testing-library/react-native";

jest.mock("@/database/dbFunctions", () => ({
  getDevices: jest.fn(),
  deleteDevice: jest.fn(),
}));

describe("useDevices hook", () => {
  const mockDevices: deviceType[] = [
    {
      serial: "123ABC1",
      created_at: "2023-08-10T12:00:00Z",
      id: 1,
      list_id: 5,
    },
    {
      serial: "123ABC2",
      created_at: "2023-08-10T12:00:00Z",
      id: 2,
      list_id: 5,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (db.getDevices as jest.Mock).mockResolvedValue(mockDevices);
    (db.deleteDevice as jest.Mock).mockResolvedValue(undefined);
  });

  it("loadData powinno ustawić devices po fetchu", async () => {
    const { result } = renderHook(() => useDevices(10));

    await act(async () => {
      await result.current.loadData();
    });

    expect(result.current.devices).toEqual(mockDevices);
  });

  it("handleDelete powinno usunąć device po ID", async () => {
    const { result } = renderHook(() => useDevices(10));

    // ustawiamy początkowy stan
    await act(async () => {
      await result.current.loadData();
    });

    await act(async () => {
      await result.current.handleDelete(1);
    });

    expect(result.current.devices).toEqual([mockDevices[1]]);
    expect(db.deleteDevice).toHaveBeenCalledWith(1);
  });
});
