import Application from './lib/application';
import start from './lib/start';

export default class Eryue extends Application {
  constructor() {
    super();
    return start();
  }
  static start() {
    return new Eryue();
  }
}


// class App extends Eryue {};
// new App();
// Eryue.start();