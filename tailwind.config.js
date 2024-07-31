/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': {'max': '640px'},
        'xxs': {'max': '400px'},
      },
      boxShadow: {
        'custom': '0px 4px 4px rgba(0, 0, 0, 0.25), -4px 0px 4px rgba(0, 0, 0, 0.25)',
        'custom-bottom': '0px 4px 4px 0px #98989840',
        'custom-top': '0px -4px 4px 0px #98989840',
        'custom-right': '4px 0px 4px 0px #98989840',
        'custom-left': '-4px 0px 4px 0px #98989840',
        'right-bottom-left': '4px 4px 4px 0px #98989840',
        'custom-effect': '4px 0px 4px 0px rgba(152, 152, 152, 0.25), -4px 0px 4px 0px rgba(152, 152, 152, 0.25), 0px 4px 4px 0px rgba(152, 152, 152, 0.25)',

      },
      colors: {
        //common colors
        blue50: "#5A647A",
        blue100: "#0C3D7B",
        lightblue: "#0D50A0",
        gray10: "#333333",
        gray20: "#171717",

        //dark mood
        dark20: "#515155",
        dark50: "#8B8B8C",
        dark70: "#AAAAAB",
        dark100: "#EBEBEB",
        dark300: "#383838",

        darkred300: "#931515",
        darkred80: "#D34444",
        darkred100: "#FF4D4D",

        // green: "#1B7D2B",
        green:"#145A32",
        lightgreen: "#35A448",
        navigationdark: "#919196",
        customPlaceholder: '#AAAAAB',
        lightplaceholder: '##5B5B5B',

        lightwhite: "#FAF9F6",
        //light mood
        light200: "#C5C9D0",
        light70: "#5B5B5B",
        light50: "#818181",
        light20: "#BABABA",

        //main bg colors
        darkblack: "#222222",
        lightgray: "#E0E0E0",
        darkgray: "#4B4B4B",
        reddark: "#AD2626",
        red300: "#931515",
        redlight300:"#E98383",
        reddark300:"#821616",

        redlight80: "#FE3231",
        redlight100: "#FF0000",
        popupdark: "#1E1E1E",
        popuplight: "#F0F0F0",
        yellowlight:"#D8C724",
        yellowdark:"#B2A100",
      },
      backgroundImage: {
        'dark': 'linear-gradient(to bottom right, #3C3B43, #000)',
        'light': 'linear-gradient(to bottom right, #F5F5F5, #fff)',
      },
      height: {
        '13': '54px'
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar': {
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 5px grey',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#777474',
            borderRadius: '10px',
          },
        },
      });
    },
  ],
};
