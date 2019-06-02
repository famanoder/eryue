import Application from './application';

function start(callback) {
    const app = new Application();
    app.useAll();
    app.listen(1234, p => {
        console.log(p)
    });
    return app;
}

export default class Eryue {
  constructor() {
    return start();
  }
};