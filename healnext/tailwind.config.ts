import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      spacing: {
        '42': '10.5rem', // Custom spacing for top-42, left-42, etc.
        '94': '23.5rem',
        '100': '26rem' // Custom spacing for top-94, left-94, etc.
      },
      top: {
        '42': '10.5rem', // Custom value specifically for `top-42`
        '94': '23.5rem',
        '100': '26rem', // Custom value specifically for `top-94`
      },
    },
  },
  plugins: [],
};

export default config;
