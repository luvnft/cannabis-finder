import { FlatCompat } from "@eslint/eslintrc"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "prettier" // Add prettier to avoid conflicts
  ),
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    rules: {
      // Enforce consistent import order
      "import/order": "off", // We'll use prettier-plugin-sort-imports for this
      // Additional rules you might want to add
      "no-unused-vars": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Enforce using TypeScript's optional chaining
      "@typescript-eslint/prefer-optional-chain": "warn",
    },
  },
]

export default eslintConfig
