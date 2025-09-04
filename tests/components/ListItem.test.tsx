import { render } from "@testing-library/react-native";
import React from "react";
import { ListItem } from "../../components/ListItem";

import { formatDate } from "@/utility/formatDate";

jest.mock("expo-router", () => {
  return {
    Link: ({ children, href, style }: any) => (
      <>{children}</> // ignorujemy nawigację w testach, renderujemy dzieci
    ),
  };
});

// Mock Ionicons, żeby uniknąć warningów o act()
jest.mock("@expo/vector-icons/Ionicons", () => {
  return (props: any) => {
    return <></>; // nic nie renderujemy, albo <View /> jeśli chcesz
  };
});

describe("ListItem component", () => {
  const exampleList = {
    id: 42,
    name: "Test List",
    created_at: "2025-08-12T10:00:00Z",
  };

  it("renders list name and formatted date", () => {
    const { getByText } = render(<ListItem list={exampleList} />);

    expect(getByText("Test List")).toBeTruthy();

    const expectedDate = formatDate(new Date(exampleList.created_at));
    expect(getByText(expectedDate)).toBeTruthy();
  });
});
