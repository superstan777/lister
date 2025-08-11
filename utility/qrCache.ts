let qrDataStore: string | null = null;

export const setQrData = (data: string) => {
  qrDataStore = data;
};

export const getQrData = () => qrDataStore;
