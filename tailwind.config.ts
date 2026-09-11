import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ice: {
          "000": "#FFFFFF",
          "050": "#F6FBFB",
          "100": "#F2F9FA",
          "200": "#ECF7F8",
          "300": "#DCEBF1",
          "400": "#C7DEE8",
          "500": "#C0D9E2",
        },
        sky: {
          "300": "#A4D5ED",
          "400": "#7FC4E2",
          "500": "#66B8D6",
          "600": "#5AA3C4",
        },
        steel: {
          "500": "#4A8DB5",
          "600": "#426E8C",
          "700": "#35566E",
        },
        navy: {
          "700": "#2A4C6E",
          "800": "#1C3350",
          "900": "#100F2F",
          "950": "#0D192D",
        },
        good: "#1FA971",
      },
      fontFamily: {
        display: ["var(--font-display)", "Segoe UI", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        content: "1120px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(66,110,140,.06), 0 8px 28px rgba(66,110,140,.08)",
        cta: "0 10px 30px rgba(16,15,47,.22)",
        glow: "0 0 0 1px rgba(104,186,217,.40), 0 8px 32px rgba(66,110,140,.16)",
      },
    },
  },
  plugins: [],
};

export default config;
