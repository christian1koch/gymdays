import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { Slot, Stack } from "expo-router";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import * as eva from "@eva-design/eva";
import { default as theme } from "../theme/theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function HomeLayout() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <AutocompleteDropdownContextProvider>
          <SafeAreaProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            ></Stack>
          </SafeAreaProvider>
        </AutocompleteDropdownContextProvider>
      </ApplicationProvider>
    </>
  );
}
