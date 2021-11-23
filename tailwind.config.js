// text-red-primary -> hex values
// text-gray-base -> hex values
// border-gray-primary -> hex values
// text-blue-primary -> hex values


module.exports = {
    future: {
      removeDeprecatedGapUtilities: true
    },
    fill: (theme) => ({
      'red': theme('colors.red.500'),
    }),
    theme: {
      colors: {
        white: {
          primary: "#e3e3e3",
          normal: "#ffffff"
        },
        black: {
          background: '#181818',
        },
        gray: {
          background: '#9F9F9F',
          primary: '#9D9DAA'
        },
        brown: {
          button: "#776A49"
        },
        red: {
          like: "#E63C27"
        },
        purple: {
          like: "#6469E3"
        },
        yellow: {
          like: "#FFCF00"
        },
        blue: {
          primary: "#1B74BA"
        }
      }
    },
    variants: {
      extend: {
        display: ['group-hover']
      }
    }
  };

