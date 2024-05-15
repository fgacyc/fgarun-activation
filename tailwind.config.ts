import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sf: ["'SF Pro Display'", ...fontFamily.sans],
        sans: ["var(--font-sans)", ...fontFamily.sans],
        revelia: ["Revelia", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
