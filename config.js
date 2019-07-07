module.exports = {
  // port: 8080,
  // favicon: '',
  staticOption: {
    root: 'static'
  },
  cookies: {
    maxAge: 30 * 60 * 1000,
    signed: true,
    httpOnly: true,
    keys: ['ensure a secure cookie.']
  },
  // https: {
  //   key: '',
  //   cert: ''
  // },
  onlisten(port) {
    console.log('an app listening on ' + port);
  }
}