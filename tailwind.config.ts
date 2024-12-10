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
          primary: "#FF5F35",
          secondary: "#2A2E29",
          accent: "#FF5F35",
          background: "#FFFFFF",
          foreground: "#2A2E29",
          muted: "#F4F4F4",
          border: "#E5E5E5"
        },
        background: "#FFFFFF",
        foreground: "#2A2E29",
        card: {
          DEFAULT: "#2A2E29",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#2A2E29",
          foreground: "#FFFFFF",
        },
        primary: {
          DEFAULT: "#FF5F35",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#2A2E29",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F4F4F4",
          foreground: "#2A2E29",
        },
        accent: {
          DEFAULT: "#FF5F35",
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
