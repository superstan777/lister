// DeviceItem.test.tsx
import { render } from "@testing-library/react-native";
import React from "react";
import { DeviceItem } from "../../components/DeviceItem";

// Mock funkcji formatDate, zwracamy ISO string dla testów
jest.mock("@/utility/formatDate", () => ({
  formatDate: jest.fn((date: Date) => date.toISOString()),
}));

describe("DeviceItem", () => {
  const mockDevice = {
    serial: "123ABC",
    created_at: "2023-08-10T12:00:00Z",
    id: 1,
    list_id: 5,
  };

  it("renders device serial", () => {
    const { getByText } = render(<DeviceItem device={mockDevice} />);
    expect(getByText("123ABC")).toBeTruthy();
  });

  it("renders formatted date", () => {
    const { getByText } = render(<DeviceItem device={mockDevice} />);
    expect(
      getByText(new Date(mockDevice.created_at).toISOString())
    ).toBeTruthy();
  });
});
