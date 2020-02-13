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

function enterState(newState) {
  let validTransitions = states[currentState].canChangeTo;
  if (validTransitions.includes(newState)) {
    currentState = newState;
  } else {
    throw 'Invalid state transition attempted - from ' + currentState + ' to ' + newState;
  }
}



async function foyer(){
  //change to state 
  //if chain of possible actions within room
  const foyerMessage = 'Welcome to the foyer. A small room with a staircase which you are standing at the bottom of. There is a newstand '
  console.log(foyerMessage)
  let input = await ask('What would you like to do?')
}


async function stairwayUp() {
  const stairwayMessage = 'You\'ve gone up the stiars and reached a door with a sign '
  console.log(stairwayMessage)
  let input = await ask(stairwayMessage)
}

  //if statements for possible actions


async function classroom(){
  const classroomMessage = 'You\'ve entered the classroom. Bob is teaching because you are late'
 let input = await ask(classroomMessage)
  // if statement allowing actions and results ---if(input === 'action'){result}
}



async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;
  let input = await ask(welcomeMessage);
if (input === 'read sign'){
  console.log(street.sign)
} if (input === "proceed to foyer"){
  foyer()
}
  process.exit();
}


start();
