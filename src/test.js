export default class Test {
  constructor(message) {
    this.message = message;
    console.log('Test Class Constructor');
  }

  init() {
    console.log(`hello ${this.message}`);
  }
}
