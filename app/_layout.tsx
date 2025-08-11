import { HeaderButton } from "@/components/HeaderButton";
import { DB_NAME, createDbIfNeeded } from "@/database/database";
import { Stack, useRouter } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

const MODAL_SCREENS = ["createListScreen", "exportScreen"];

export default function RootLayout() {
  const router = useRouter();

  return (
    <SQLiteProvider databaseName={DB_NAME} onInit={createDbIfNeeded}>
      <Stack
        screenOptions={({ route, navigation }) => {
          const isModal = MODAL_SCREENS.includes(route.name);
          const isIndex = route.name === "index";

          return {
            contentStyle: { backgroundColor: "#f2f2f7" },
            headerStyle: { backgroundColor: "#f6f6f6" },

            headerLeft: () => {
              if (isModal) {
                return (
                  <HeaderButton type="close" onPress={() => router.back()} />
                );
              }
              if (!isIndex && navigation.canGoBack()) {
                return (
                  <HeaderButton type="back" onPress={() => router.back()} />
                );
              }
              return undefined;
            },
          };
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerLargeTitle: true,
            headerLargeTitleShadowVisible: false,
            headerTitle: "Lister",
            headerLargeStyle: { backgroundColor: "#f2f2f7" },
            headerRight: () => (
              <HeaderButton
                type="add"
                onPress={() => router.push("/createListScreen")}
              />
            ),
          }}
        />
        <Stack.Screen name="list/[listId]" />
        <Stack.Screen name="cameraScreen" options={{ headerShown: false }} />
        <Stack.Screen
          name="createListScreen"
          options={{
            presentation: "pageSheet",
            headerTitle: "Create new list",
          }}
        />
        <Stack.Screen
          name="exportScreen"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
      </Stack>
    </SQLiteProvider>
  );
}
