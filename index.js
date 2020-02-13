const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

// remember the StateMachine lecture
// https://bootcamp.burlingtoncodeacademy.com/lessons/cs/state-machines

// State machine for room transitions
let pathStates = {

  'street': { canMoveTo: ['foyer', 'muddy'] },
  'foyer': { canMoveTo: ['stairs', 'street'] },
  'muddy': { canMoveTo: ['street', 'pizza'] },
  'pizza': { canMoveTo: ['muddy'] }

};


let currentState = "green";

let street = {

  name: '182 Main St.',
  description: 'You are standing on Main Street between Church and South Winooski. There is a door here. A keypad sits on the handle. On the door is a handwritten sign.',
  lock: true,
  sign: 'The sign says "Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code "12345".',
  takeSign: 'That would be selfish. How will other students find their way?'
}

let foyer = {

  name: 'foyer',
  description: '',
}

let classroom = {
  name: 'Classroom',
  description: 'BCA Class, "Abandon all hope, ye who enter here."'
}

let pizzaplace = {
  name: 'Mr. Mike\'s',
  description: 'Pizza place next door'
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

async function streetSide() {
  const streetMessage = 'We are where we started standing on the street.'
  let input = await ask(streetMessage)
  if (input === 'return to foyer') {
    foyer()
  }
  if (input === 'go to Mr. Mikes') {
    pizzaShop()
  }
}

async function foyerEntry() {
  //change to state 
  //if chain of possible actions within room
  const foyerMessage = 'Welcome to the foyer. A small room with a staircase which you are standing at the bottom of. There is a newstand '
  console.log(foyerMessage)
  let input = await ask('What would you like to do?')
  if (input === 'take stairs') {
    stairwayUp()
  } if (input === 'exit to street') {
    street()
  }
}


async function stairwayUp() {
  const stairwayMessage = 'You\'ve gone up the stiars and reached a door with a sign '
  console.log(stairwayMessage)
  let input = await ask(stairwayMessage)
  if (input === 'read sign') {
    console.log(stairway.sign)
  }
  if (input === 'enter code 12345') {
    classroom()
  }
}

//if statements for possible actions


async function classRoom() {
  const classroomMessage = 'You\'ve entered the classroom. Bob is teaching because you are late'
  let input = await ask(classroomMessage)
  // if statement allowing actions and results ---if(input === 'action'){result}
  if (input === 'sit and listen') {

  }
  if (input === 'go back down stairs') {
    foyer()
  }
}

async function pizzaShop() {
  const pizzaMessage = 'you have entered the pizza shop'
  let input = await ask(pizzaMessage)
}

// async function game() {
  // command = await ask('Do something!');
// }

async function start() {

  let streetInput = await ask(street.description + '\n');

  if (streetInput === 'read sign') {
    console.log(street.sign + '\n');
  };

  streetInput = await (ask('What next? '));

  if (streetInput === 'check lock') {
    if (street.lock === true) {
      console.log("Door is locked");
    };

  streetInput = await (ask('What next? '));

    if (streetInput === "proceed to foyer") {
      foyerEntry();
    
  };
  
  
  }
  process.exit();
}


start();
