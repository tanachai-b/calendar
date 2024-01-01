import type { Config } from "tailwindcss";

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
      colors: {
        bg: "#101010",
        bg_hover: "#181818",
        border: "#303030",
        text_white: "#f0f0f0",
        text_grey: "#808080",
        text_red: "#ff0000",
        highlight_yellow: "#ffc000",
      },
      fontFamily: {
        default: ["__Inter_e66fe9", "__Noto_Sans_Thai_e8ac70"],
        looped: ["__Inter_e66fe9", "__Noto_Serif_Thai_93ff82"],
        looped2: ["__Inter_e66fe9", "__Noto_Sans_Thai_Looped_040fb1"],
      },
    },
  },
  plugins: [],
};
export default config;
