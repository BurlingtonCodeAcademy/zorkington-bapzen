const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

// remember the StateMachine lecture
// https://bootcamp.burlingtoncodeacademy.com/lessons/cs/state-machines
let states = {
  'roomOne': { canChangeTo: [ 'roomTwo' ] },
  'roomTwo': { canChangeTo: [ 'roomThree' ] },
  'roomThree': { canChangeTo: [ 'roomOne' ] }
};

let currentState = "green";

let street = {
  sign: 'lorem ipsum asdfa'

}

let stairway = {
  sign: "Welcome to the classroom. To enter please enter code 12345"
}

function enterState(newState) {
  let validTransitions = states[currentState].canChangeTo;
  if (validTransitions.includes(newState)) {
    currentState = newState;
  } else {
    throw 'Invalid state transition attempted - from ' + currentState + ' to ' + newState;
  }
}

async function streetSide(){
  const streetMessage = 'We are where we started standing on the street.'
  let input = await ask(streetMessage)
  if(input=== 'return to foyer'){
    await foyer()
  }
  if(input === 'go to Mr. Mikes'){
   await  pizzaShop()
  }
}

async function foyer(){
  //change to state 
  //if chain of possible actions within room
  const foyerMessage = 'Welcome to the foyer. A small room with a staircase which you are standing at the bottom of. There is a newstand '
  console.log(foyerMessage)
  let inputFoyer = await ask('What would you like to do?')
  if(inputFoyer === 'take stairs'){
    await stairwayUp()
  } if (inputFoyer === 'exit to street'){
    await streetSide()
  }
}


async function stairwayUp() {
  const stairwayMessage = 'You\'ve gone up the stiars and reached a door with a sign '
 
  let inputStairway = await ask(stairwayMessage)
  if (inputStairway === 'read sign'){
    console.log(stairway.sign)
  }
  if(inputStairway === 'enter code 12345'){
    await classroom()
  }
}

  //if statements for possible actions


async function classroom(){
  const classroomMessage = 'You\'ve entered the classroom. Bob is teaching because you are late'
 let inputClass = await ask(classroomMessage)
  // if statement allowing actions and results ---if(input === 'action'){result}
  if(inputClass === 'sit and listen'){

  }
if(inputClass === 'go back down stairs'){
await foyer()
}
}

async function pizzaShop(){
  const pizzaMessage = 'you have entered the pizza shop'
  let input = await ask(pizzaMessage)
  if (input === 'eat pizza'){
process.exit();
  }
  if(input === 'go back to street'){
    await streetSide()
  }
}


async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;
  let input = await ask(welcomeMessage);
if (input === 'read sign'){
  console.log(street.sign)
  let input = await ask('Now what?')
  
} if (input === "proceed to foyer"){
  console.log("anyting")
  await foyer()
}
  process.exit();
}


start();
