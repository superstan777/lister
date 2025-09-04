import { getQrData, setQrData } from "../../utility/qrCache";

describe("qrCache module", () => {
  beforeEach(() => {
    setQrData("");
  });

  test("should return empty string initially", () => {
    expect(getQrData()).toBe("");
  });

  test("should store and retrieve QR data", () => {
    const data = "some qr code data";
    setQrData(data);
    expect(getQrData()).toBe(data);
  });

  test("should overwrite previous data", () => {
    setQrData("first");
    setQrData("second");
    expect(getQrData()).toBe("second");
  });
});
