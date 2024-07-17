import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gray: "rgba(var(--gray))",
        slate: "rgba(var(--slate))",
        primary: "rgba(var(--primary))",
      },
    },
  },
  plugins: [],
};
export default config;
