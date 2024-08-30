import type { Config } from "drizzle-kit";

export default {
	schema: "./libs/gymdays/features/db/schema.ts",
	dialect: "sqlite",
	out: "./drizzle",
	driver: "expo", // <--- very important
} satisfies Config;
