import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: "rgba(var(--gray))",
        slate: "rgba(var(--slate))",
        slateSecondary: "rgb(var(--slate-secondary))",
        primary: "rgba(var(--primary))",

        color: "rgba(var(--color))",
        colorSecondary: "rgba(var(--color-secondary))",
      },
    },
  },
  plugins: [],
} satisfies Config;
