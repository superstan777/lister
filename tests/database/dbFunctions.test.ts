// tests/database/dbFunctions.test.ts
import { database } from "@/database/database";
import {
  addDevice,
  addList,
  deleteDevice,
  deleteList,
  getDevices,
  getLists,
} from "@/database/dbFunctions";

jest.mock("@/database/database", () => ({
  database: {
    runAsync: jest.fn(),
    getAllAsync: jest.fn(),
  },
}));

describe("dbFunctions - lists and devices", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- Lists tests ---
  test("addList trims the name and inserts into DB", async () => {
    await addList("   My List   ");

    expect(database.runAsync).toHaveBeenCalledWith(
      "INSERT INTO lists (name) VALUES (?)",
      ["My List"]
    );
  });

  test("getLists returns lists from DB", async () => {
    (database.getAllAsync as jest.Mock).mockResolvedValue([
      { id: 1, name: "Test List" },
    ]);

    const lists = await getLists();

    expect(database.getAllAsync).toHaveBeenCalledWith("SELECT * FROM lists");
    expect(lists).toEqual([{ id: 1, name: "Test List" }]);
  });

  test("deleteList calls delete query", async () => {
    await deleteList(123);

    expect(database.runAsync).toHaveBeenCalledWith(
      "DELETE FROM lists WHERE id = ?;",
      [123]
    );
  });

  // --- Devices tests ---
  test("getDevices returns devices for a given listId", async () => {
    (database.getAllAsync as jest.Mock).mockResolvedValue([
      {
        id: 1,
        list_id: 2,
        serial: "ABC123",
        created_at: "2023-08-10T12:00:00Z",
      },
    ]);

    const devices = await getDevices(2);

    expect(database.getAllAsync).toHaveBeenCalledWith(
      "SELECT * FROM devices WHERE list_id = ?;",
      [2]
    );
    expect(devices).toEqual([
      {
        id: 1,
        list_id: 2,
        serial: "ABC123",
        created_at: "2023-08-10T12:00:00Z",
      },
    ]);
  });

  test("addDevice inserts device into DB", async () => {
    await addDevice(2, "XYZ789");

    expect(database.runAsync).toHaveBeenCalledWith(
      "INSERT INTO devices (list_id, serial) VALUES (?, ?);",
      [2, "XYZ789"]
    );
  });

  test("deleteDevice calls delete query", async () => {
    await deleteDevice(5);

    expect(database.runAsync).toHaveBeenCalledWith(
      "DELETE FROM devices WHERE id = ?;",
      [5]
    );
  });
});
