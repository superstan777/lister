import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { HeaderButton } from "../../components/HeaderButton";

const mockIonicons = jest.fn();
jest.mock("@expo/vector-icons/Ionicons", () => (props: any) => {
  mockIonicons(props);
  return <></>;
});

describe("HeaderButton", () => {
  beforeEach(() => {
    mockIonicons.mockClear();
  });

  it.each([
    ["back", "arrow-back-outline"],
    ["add", "add-outline"],
    ["close", "close-outline"],
  ])("renders correct icon for type=%s", (type, expectedIcon) => {
    render(<HeaderButton type={type as any} />);
    expect(mockIonicons).toHaveBeenCalledWith(
      expect.objectContaining({ name: expectedIcon })
    );
  });

  it("renders default icon when unknown type is passed", () => {
    render(<HeaderButton type={"unknown" as any} />);
    expect(mockIonicons).toHaveBeenCalledWith(
      expect.objectContaining({ name: "arrow-back-outline" })
    );
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <HeaderButton type="back" onPress={onPressMock} />
    );
    fireEvent.press(getByTestId("header-button-back"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("renders correctly without onPress prop", () => {
    const { getByTestId } = render(<HeaderButton type="back" />);
    expect(getByTestId("header-button-back")).toBeTruthy();
  });
});
