import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // <--- Esto es lo que activa tu botón de Luna/Sol
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Aquí podrías agregar colores personalizados de AWS más adelante
    },
  },
  plugins: [],
};

export default config;