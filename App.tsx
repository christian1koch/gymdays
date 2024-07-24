import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Exercise from "./checklist-page/exercise";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import GymDay from "./checklist-page/gym-day/gym-day";
import { gymDataMock } from "./checklist-page/data";

export default function App() {
  return (
    <AutocompleteDropdownContextProvider>
      <View className="flex-1 items-center justify-center bg-slate-200">
        <GymDay
          name={gymDataMock.name}
          date={gymDataMock.date}
          exercises={gymDataMock.exercises}
        />
        {/* <Exercise /> */}
        <StatusBar style="auto" />
      </View>
    </AutocompleteDropdownContextProvider>
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
