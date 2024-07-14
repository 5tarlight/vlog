import type { Config } from "tailwindcss";
import { spacing } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "h1, h2, h3, h4": {
              "scroll-margin-top": spacing[32],
            },
          },
        },
      }),
    },
    variants: {
      typography: ["dark"],
    },
    plugins: [require("@tailwindcss/typography")],
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
