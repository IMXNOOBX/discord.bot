import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  { ignores: [".build/"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    files: ["**/*.js"],
    rules: {
      "no-unused-vars": ["error", { "caughtErrors": "none" }],
    }
  }
];
