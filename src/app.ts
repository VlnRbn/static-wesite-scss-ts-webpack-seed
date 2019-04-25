// console.log("script started again");
// import '../styles.scss';
import "./styles.scss";

var myObj = {
  name: "velen",
  age: 23,
  address: "this is adderess"
};

function print() {
  console.log("started", this);
}

print.apply(myObj);

var newPrint = print.bind(myObj);

newPrint();

console.log("this is trest again");

const key: keyof typeof myObj = "name";

console.log("key ::", key);
