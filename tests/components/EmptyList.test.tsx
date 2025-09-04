// EmptyList.test.tsx
import { render } from "@testing-library/react-native";
import React from "react";
import { EmptyList } from "../../components/EmptyList";

describe("EmptyList", () => {
  it("renders main text", () => {
    const mainText = "No items found";
    const { getByText } = render(<EmptyList text={mainText} />);
    expect(getByText(mainText)).toBeTruthy();
  });

  it("renders bottom text when provided", () => {
    const mainText = "No items found";
    const bottomText = "Try adding some items";
    const { getByText } = render(
      <EmptyList text={mainText} bottomText={bottomText} />
    );
    expect(getByText(bottomText)).toBeTruthy();
  });

  it("does not render bottom text when not provided", () => {
    const mainText = "No items found";
    const { queryByTestId, queryByText } = render(
      <EmptyList text={mainText} />
    );
    // Check that bottom text is not rendered
    expect(queryByText(/./)).not.toBeNull(); // at least mainText exists
    expect(queryByText("Try adding some items")).toBeNull();
  });
});
