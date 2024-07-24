import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Exercise from "./checklist-page/exercise";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import GymDay from "./checklist-page/gym-day/gym-day";
import { gymDataMock, gymDataMocks } from "./checklist-page/data";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { default as theme } from "./theme/theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import GimDayList from "./checklist-page/gym-day-list/gym-day-list";

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <AutocompleteDropdownContextProvider>
          <View className="flex-1 items-center justify-center bg-slate-200">
            {/* <GimDayList gymDays={gymDataMocks} /> */}
            <GymDay {...gymDataMock} />
            {/* <Exercise /> */}
            <StatusBar style="auto" />
          </View>
        </AutocompleteDropdownContextProvider>
      </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
