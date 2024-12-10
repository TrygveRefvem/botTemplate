import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      colors: {
        brand: {
          primary: "#00205B",
          secondary: "#FFFFFF",
          accent: "#00205B",
          background: "#FFFFFF",
          foreground: "#00205B",
          muted: "#F4F4F4",
          border: "#E5E5E5"
        },
        background: "#FFFFFF",
        foreground: "#00205B",
        card: {
          DEFAULT: "#00205B",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#00205B",
          foreground: "#FFFFFF",
        },
        primary: {
          DEFAULT: "#00205B",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FFFFFF",
          foreground: "#00205B",
        },
        muted: {
          DEFAULT: "#F4F4F4",
          foreground: "#00205B",
        },
        accent: {
          DEFAULT: "#00205B",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#ff4444",
          foreground: "#FFFFFF",
        },
        border: "#E5E5E5",
        input: "#F4F4F4",
        ring: "#FF5F35"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
