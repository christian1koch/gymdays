import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    eslintPluginUnicorn.configs["flat/recommended"],
    ...compat.extends("eslint:recommended"),
    {
        languageOptions: {
            globals: globals.node,
            ecmaVersion: 12,
            sourceType: "module",
        },
        rules: {
            "no-console": "error",
            "unicorn/better-regex": "warn",
            "unicorn/prevent-abbreviations": "off",
        },
    },
];
