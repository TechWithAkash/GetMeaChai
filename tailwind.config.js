/** @type {import('tailwindcss').Config} */
module.exports = {
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
      fontFamily:{
        'abc': ["Archivo Black", "sans-serif"],
        'Poppins': ['Poppins','sans-serif'],
        'Inter': ['Inter','sans-serif'],
        'Montserrat': ['Montserrat','sans-serif'],
        'Roboto': ['Roboto','sans-serif'],

      }
    },
  },
  plugins: [],
};
