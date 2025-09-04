// components/ListHiddenItem.test.tsx
import { ListHiddenItem } from "@/components/ListHiddenItem";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

const mockIonicons = jest.fn();

// Mock Ionicons na pusty fragment i łapanie propsów
jest.mock("@expo/vector-icons/Ionicons", () => (props: any) => {
  mockIonicons(props);
  return <></>;
});

describe("ListHiddenItem", () => {
  beforeEach(() => {
    mockIonicons.mockClear();
  });

  it("renders without crashing", () => {
    const onDelete = jest.fn();
    const { getByTestId } = render(<ListHiddenItem onDelete={onDelete} />);
    expect(getByTestId("hidden-button")).toBeTruthy();
  });

  it("passes correct props to Ionicons", () => {
    render(<ListHiddenItem onDelete={() => {}} />);
    expect(mockIonicons).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "trash-outline",
        size: 24,
        color: "black",
      })
    );
  });

  it("calls onDelete when button is pressed", () => {
    const onDelete = jest.fn();
    const { getByTestId } = render(<ListHiddenItem onDelete={onDelete} />);
    fireEvent.press(getByTestId("hidden-button"));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
