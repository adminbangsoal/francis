module.exports = {
  plugins: [
    "prettier-plugin-organize-attributes",
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss",
  ],
  tailwindAttributes: [
    "enter",
    "enterFrom",
    "enterTo",
    "leave",
    "leaveFrom",
    "leaveTo",
    ".*Variants.*",
    ".*Mapping.*",
  ],
  tailwindFunctions: ["clsx", "cn", "cva", "join"],
};
