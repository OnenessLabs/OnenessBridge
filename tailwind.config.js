module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    // "./src/views/*.{vue,js,ts,jsx,tsx}",
    // "./src/views/**/*.{vue,js,ts,jsx,tsx}",
    // "./src/components/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
        'md': '768px',
        // => @media (min-width: 768px) { ... }
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
        "3xl": "1920px",
        "4xl": "2560px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
