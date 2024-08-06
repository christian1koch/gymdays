import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { Slot, Stack } from "expo-router";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import * as eva from "@eva-design/eva";
import { default as theme } from "../theme/theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import { store } from "./store";
import { Provider } from "react-redux";
export default function HomeLayout() {
  return (
    <>
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <AutocompleteDropdownContextProvider>
            <SafeAreaProvider>
              <Slot />
            </SafeAreaProvider>
          </AutocompleteDropdownContextProvider>
        </ApplicationProvider>
      </Provider>
    </>
  );
}
