module.exports = {
  // port: 8080,
  // favicon: '',
  staticOption: {
    root: 'static'
  },
  // https: {
  //   key: '',
  //   cert: ''
  // },
  onlisten(port) {
    console.log('an app listening on ' + port);
  }
}