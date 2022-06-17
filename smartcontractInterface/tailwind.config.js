module.exports = {
  content: ["./src/**/*.{js,jsx,ts}"],
  theme: {
    extend: {
      height: theme => ({
        'screen/2': '50vh',
        'screen/3': 'calc(100vh / 3)',
        'screen/4': 'calc(100vh / 4)',
        'screen/5': 'calc(100vh / 5)',
        'screen-custom': 'calc(100vh - 80px)',
      }),
      aspectRatio: {
        '4/1': '4 / 1',
        '4/2': '4 / 2',
      },
      flex: {
        '2': '2 2 0%'
      }
    },
  },
  plugins: [],
}
