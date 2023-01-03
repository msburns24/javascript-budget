class MyClass {
  constructor () {
    this.prop1 = "Property 1";
    this.prop2 = "Property 2";
  }

  printProps () {
    console.log(this.prop1);
    console.log(this.prop2);
  }

  static showOff () {
    console.log("I'm pretty cool, eh?");
  }
}

let myNewClass = new MyClass();

MyClass.showOff();