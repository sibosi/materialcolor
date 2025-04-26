import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        selfprimary: {
          DEFAULT: "var(--selfprimary)",
          100: "var(--selfprimary-100)",
          200: "var(--selfprimary-200)",
          300: "var(--selfprimary-300)",
          400: "var(--selfprimary-400)",
          500: "var(--selfprimary-500)",
          600: "var(--selfprimary-600)",
          700: "var(--selfprimary-700)",
          800: "var(--selfprimary-800)",
          900: "var(--selfprimary-900)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
