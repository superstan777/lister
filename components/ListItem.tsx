import { listType } from "@/types/listType";
import { formatDate } from "@/utility/formatDate";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

type ListItemProps = {
  list: listType;
};

export const ListItem = ({ list }: ListItemProps) => {
  const formattedDate = formatDate(new Date(list.created_at));

  return (
    <Link
      href={{
        pathname: "/list/[listId]",
        params: { listId: list.id, name: list.name },
      }}
      style={styles.wrapper}
    >
      <View>
        <Text style={styles.title}>{list.name}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 15,
  },

  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
});
