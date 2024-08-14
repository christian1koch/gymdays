import { config } from "@tamagui/config/v3";
import { createTamagui } from "tamagui"; // or '@tamagui/core'
import { tokens } from "@tamagui/config/v3";
import * as themes from "./theme";

const tamaguiConfig = createTamagui({ ...config, tokens, themes });

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module "tamagui" {
	interface TamaguiCustomConfig extends Conf {}
}
