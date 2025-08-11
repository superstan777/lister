import { deviceType } from "@/types/deviceType";
import { listType } from "@/types/listType";
import { database } from "./database";

// Lists functions

export const getLists = async (): Promise<listType[]> => {
  try {
    const lists = await database.getAllAsync<listType>("SELECT * FROM lists");
    return lists;
  } catch (error) {
    throw error;
  }
};

export const addList = async (listName: string) => {
  try {
    await database.runAsync("INSERT INTO lists (name) VALUES (?)", [
      listName.trim(),
    ]);
    console.log(`List ${listName} has been added`);
  } catch (error) {
    console.error("Error adding device:", error);
  }
};

export const deleteList = async (id: number) => {
  try {
    await database.runAsync(`DELETE FROM lists WHERE id = ?;`, [id]);
    console.log(`List with id ${id} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting device:", error);
  }
};

// Devices functions
export const getDevices = async (listId: number): Promise<deviceType[]> => {
  try {
    const devices = await database.getAllAsync<deviceType>(
      `SELECT * FROM devices WHERE list_id = ?;`,
      [listId]
    );
    return devices;
  } catch (error) {
    throw error; // rzucamy dalej
  }
};

export const addDevice = async (listId: number, serial: string) => {
  try {
    await database.runAsync(
      `INSERT INTO devices (list_id, serial) VALUES (?, ?);`,
      [listId, serial]
    );
    console.log(`Device added to list ${listId} with serial ${serial}.`);
  } catch (error) {
    console.error("Error adding device:", error);
  }
};

export const deleteDevice = async (id: number) => {
  try {
    await database.runAsync(`DELETE FROM devices WHERE id = ?;`, [id]);
    console.log(`Device with id ${id} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting device:", error);
  }
};
