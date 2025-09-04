import { DeviceList } from "@/components/DeviceList";
import { deviceType } from "@/types/deviceType";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

// Mockujemy podkomponenty poprawnie
jest.mock("@/components/DeviceItem", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    DeviceItem: ({ device }: any) => <Text>{device.serial}</Text>,
  };
});

jest.mock("@/components/ListHiddenItem", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    ListHiddenItem: ({ onDelete }: any) => (
      <Text onPress={onDelete}>Delete</Text>
    ),
  };
});

jest.mock("@/components/EmptyList", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    EmptyList: ({ text }: any) => <Text>{text}</Text>,
  };
});

describe("DeviceList", () => {
  const mockDevices: deviceType[] = [
    { id: 1, serial: "ABC123", list_id: 1, created_at: "2025-09-04T00:00:00Z" },
    { id: 2, serial: "XYZ789", list_id: 1, created_at: "2025-09-04T00:00:00Z" },
  ];

  it("renders devices correctly", () => {
    const { getByText } = render(
      <DeviceList
        devices={mockDevices}
        handleDelete={jest.fn()}
        containerHeight={500}
      />
    );

    expect(getByText("ABC123")).toBeTruthy();
    expect(getByText("XYZ789")).toBeTruthy();
  });

  it("renders empty list component when no devices", () => {
    const { getByText } = render(
      <DeviceList devices={[]} handleDelete={jest.fn()} containerHeight={500} />
    );

    expect(getByText("No Devices")).toBeTruthy();
  });

  it("calls handleDelete when delete button pressed", () => {
    const handleDeleteMock = jest.fn();
    const { getAllByText } = render(
      <DeviceList
        devices={mockDevices}
        handleDelete={handleDeleteMock}
        containerHeight={500}
      />
    );

    const deleteButtons = getAllByText("Delete");
    fireEvent.press(deleteButtons[0]);

    expect(handleDeleteMock).toHaveBeenCalledWith(1);
  });
});
