import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { Slot, Stack } from "expo-router";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import * as eva from "@eva-design/eva";
import { default as theme } from "../theme/theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme, View } from "react-native";
import { store } from "./store";
import { Provider } from "react-redux";
import { TamaguiProvider, createTamagui } from "@tamagui/core";
import config from "./../tamagui.config";
import { PortalProvider } from "@tamagui/portal";
import { Theme } from "tamagui";
import { CustomPortalProvider } from "libs/utils/portal/PortalContext";

const tamaguiConfig = createTamagui(config);

export default function HomeLayout() {
	const colorScheme = useColorScheme();
	return (
		<>
			<Provider store={store}>
				<CustomPortalProvider>
					<TamaguiProvider
						defaultTheme={colorScheme!}
						config={tamaguiConfig}
					>
						<ThemeProvider
							value={
								colorScheme === "dark"
									? DarkTheme
									: DefaultTheme
							}
						>
							<PortalProvider shouldAddRootHost>
								<IconRegistry icons={EvaIconsPack} />
								<ApplicationProvider
									{...eva}
									theme={{ ...eva.light, ...theme }}
								>
									<AutocompleteDropdownContextProvider>
										<SafeAreaProvider>
											<Slot />
										</SafeAreaProvider>
									</AutocompleteDropdownContextProvider>
								</ApplicationProvider>
							</PortalProvider>
						</ThemeProvider>
					</TamaguiProvider>
				</CustomPortalProvider>
			</Provider>
		</>
	);
}
