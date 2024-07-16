import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "dark-gray": "#131313",
        "dark-slate": "#2e333d",
        "dark-blue": "#6B8Afd",
        "light-gray": "#F5F5F5",
        "light-slate": "#D0D4DB",
        "light-blue": "#A3C0FF",
      },
    },
  },
  plugins: [],
};
export default config;
