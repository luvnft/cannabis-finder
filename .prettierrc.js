module.exports = {
  semi: false,
  singleQuote: false,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  trailingComma: "es5",
  bracketSpacing: true,
  arrowParens: "always",
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss", // Should be last in the list
  ],
  // @trivago/prettier-plugin-sort-imports configuration
  importOrder: [
    "^react$",
    "^next(/.*)?$",
    "<THIRD_PARTY_MODULES>",
    "^@/components/(.*)$",
    "^@/lib/(.*)$",
    "^@/styles/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  // prettier-plugin-tailwindcss doesn't need additional configuration
  // it automatically sorts classes based on Tailwind's recommended order
}
