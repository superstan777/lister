import { deleteDevice, getDevices } from "@/database/dbFunctions";
import { deviceType } from "@/types/deviceType";
import { useCallback, useState } from "react";

export const useDevices = (listId: number) => {
  const [devices, setDevices] = useState<deviceType[]>([]);

  const loadData = useCallback(async () => {
    try {
      const result = await getDevices(listId);
      setDevices(result);
    } catch {
      setDevices([]);
    }
  }, [listId]);

  const handleDelete = useCallback(async (id: number) => {
    await deleteDevice(id);
    setDevices((prev) => prev.filter((d) => d.id !== id));
  }, []);

  return { devices, loadData, handleDelete, setDevices };
};
