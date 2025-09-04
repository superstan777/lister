let qrDataStore: string = "";

export const setQrData = (data: string) => {
  if (!data) {
    qrDataStore = "";
    return;
  }

  const lines = data
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (lines.length === 0) {
    qrDataStore = "";
    return;
  }

  const [listName, ...serials] = lines;
  const sortedSerials = serials.sort((a, b) => a.localeCompare(b));

  qrDataStore = [listName, ...sortedSerials].join("\n");
};

export const getQrData = () => qrDataStore;
