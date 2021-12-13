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
          normal: "#ffffff",
          ctitle: "#d2d2d3fc",
          followbtn: '#CFCFCF'

        },
        black: {
          background: '#181818',
          border: '#ffffff0f',
          followbutton: '#434343',
          btnicon: '#313131'
        },
        gray: {
          background: '#9F9F9F',
          primary: '#9D9DAA',
          button: '#696969',
          info: '#6A757A',
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
        },
        pink: {
          primary: "#EC4B89"
        }
      }
    },
    variants: {
      extend: {
        display: ['group-hover'],
      }
    }
  };

