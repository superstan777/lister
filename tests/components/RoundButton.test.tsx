import Ionicons from "@expo/vector-icons/Ionicons";
import { fireEvent, render } from "@testing-library/react-native";
import type { ComponentProps } from "react";
import React from "react";
import { RoundButton } from "../../components/RoundButton";

const mockIonicons = jest.fn((props) => {
  return <></>;
});

jest.mock(
  "@expo/vector-icons/Ionicons",
  () => (props: ComponentProps<typeof Ionicons>) => {
    return mockIonicons(props);
  }
);

describe("RoundButton", () => {
  beforeEach(() => {
    mockIonicons.mockClear();
  });

  it.each([
    ["scan", "barcode-outline"],
    ["export", "share-outline"],
    ["close", "close-outline"],
  ])(
    "passes correct name prop to Ionicons for type=%s",
    (type, expectedIcon) => {
      render(<RoundButton type={type as any} placement="left" />);
      expect(mockIonicons).toHaveBeenCalledWith(
        expect.objectContaining({ name: expectedIcon })
      );
    }
  );

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <RoundButton type="scan" placement="right" onPress={onPressMock} />
    );
    fireEvent.press(getByTestId("round-button-scan"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["left", { position: "absolute", left: 30, bottom: 30 }],
    ["right", { position: "absolute", right: 30, bottom: 30 }],
    ["mid", { position: "absolute", left: "50%", marginLeft: -35, bottom: 30 }],
  ])("applies correct style for placement=%s", (placement, expectedStyle) => {
    const { getByTestId } = render(
      <RoundButton type="scan" placement={placement as any} />
    );
    const button = getByTestId("round-button-scan");

    const style = Array.isArray(button.props.style)
      ? button.props.style.find((s: any) => s.position === "absolute")
      : button.props.style;

    expect(style).toMatchObject(expectedStyle);
  });
});
