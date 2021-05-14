module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
      'body': ['Sarina'],
      'display': ['Poppins'],
      },
      screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
      'minmd': {'min': '767px'},
      "mdmd": {"max": "768px"}, 
      "mxmd": {"max" : "1150"}
      },
      height: {
        "10v": "10vh",
        "15vh": "15vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "85vh": "85vh",
        "90v": "90vh",
        "95vh": "95vh",
        "100v": "100vh",
        "95": "95%",
        "10%": "10%",
        "15%": "15%",
        "20%": "20%",
        "30%": "30%",
        "40%": "40%",
        "70%": "70%",
        "80%" : "80%",
        "90%": "90%"
      },
      width: {
        "100vh": "100vh",
        "95%": "95%",
        "30%": "30%",
        "70%": "70%"
      },
      minHeight: {
        "5%": "5%",
        "10%": "10%",
        "20%": "20%",
        "30%": "30%",
        "70%": "70%",
        "90%": "90%"
      },
      minWidth: {
        "1/3": "30%",
        "1/5": "50%"
      },
      margin: {
        "120": "30rem"
      },
      backgroundImage: {
        "test": "url('https://media.istockphoto.com/videos/confident-man-smiling-video-id1125805085?s=640x640)"
      },
      lineHeight: {
        '1': '0.1rem'
      },
      textColor: {
        "orange": "#ffa500"
      },
      backgroundColor: {
        "purple-100": "#5F6697",
        "purple-200": "#3F3653",
        "purple-300": "#171130",
        "offWhite": "#f8f8ff"
      },
      inset: {
        "84": "21.8rem",
        "6/2": "60%",
        "86": "23.8rem",
        "100": "27.8rem"
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['responsive', 'hover', 'focus', 'active']
    },
  },
  plugins: [],
}
