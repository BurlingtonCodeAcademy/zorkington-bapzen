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
	street: { canMoveTo: [ 'foyer', 'muddy' ] },
	foyer: { canMoveTo: [ 'stairs', 'street' ] },
	muddy: { canMoveTo: [ 'street', 'pizza' ] },
	pizza: { canMoveTo: [ 'muddy' ] }
};




const objects = {
	sign: 'no',
	newspaper: 'yes'
};

// let currentState = 'green';
let curRoom;
// const foyerMessage = 'welcome to the foyer';

const player = {
	name: null,
	currentRoom: null,
	inventory: [ 'pocket watch', 'map' ],
	status: [],
	
	// enter: (room) => {
		
	// 	//if (roomCanGoTo['street'].includes(room)) {
      
  //     player.currentRoom = room.toString();
  //      curRoom = room.toString();
  //      console.log({player})
  //      console.log(curRoom)
  //     console.log(this.name + ' ' + this.description);
      
	// 	} else {
	// 		console.log('I can not go to that room');
	// 		console.log(player.currentRoom.roomCanGoTo);
	// 		console.log(room);
	// 		play();
	// 	}
	// 	return curRoom
	// },
	read: () => {
		return player.currentRoom.sign;
	},
	take: (item) => {
		if (curRoom.inventory.includes(item)) {
		player.inventory.push(item);
		curRoom.inventory.pop();
		console.log('You have taken the ' + item + '.');
		} else {
			console.log('\nThat would be selfish. How will other students find their way?');
		}
	},
	drop: (item) => {
		player.inventory.pop();
		street.inventory.push(item);
	},
	open: (door) => {
		if (curRoom.lock === true) {
			console.log(curRoom.lockMsg);
		} else {
			console.log('\nThe door opens....');
			return 
		};
	},
	combo: (keycombo) => {
		if (keycombo === curRoom.lockCombo) {
			curRoom.lock = false;
			console.log(curRoom.unlockMsg);
			curRoom = 'foyer';
		} else {
			console.log(curRoom.tryLockMsg);
		}
	}
};

const actions = {
	read: [ 'read', 'view' ],
	take: [ 'take', 'grab' ],
	drop: [ 'drop', 'let go' ],
	accept: [ 'yes', 'i would' ],
	enter: [ 'enter', 'open', 'code' ]
};

let street = {
	name: '182 Main St.',
	description:
		'You are standing on Main Street between Church and South Winooski. There is a door here. A keypad sits on the handle. On the door is a handwritten sign.',
	lockMsg: 'The door is locked. There is a keypad on the door handle.',
	tryLockMsg: 'The door remains locked. Try again.',
	unlockMsg: '\nSuccess! The door opens. \nYou enter the foyer and the door shuts behind you...',
	lock: true,
	lockCombo: '12345',
	sign:
		'The sign says "Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code "12345".',
	takeSign: 'That would be selfish. How will other students find their way?',
	inventory: [],	//This inventory initialized without 'sign' so that there is none to take.
	roomCanGoTo: [ 'foyer', 'pizza place' ]
};

let foyer = {
	name: 'Foyer',
	description: 'Welcome to the foyer, there is a newstand with the latest 7days and a stairway up to class',
	inventory: [ 'newspaper', 'shoes', 'sign' ],
	roomCanGoTo: [ 'stairway', 'street' ],
  sign: 'Class in progress up stairs',
  }

let classroom = {
	name: 'Classroom',
	description: 'BCA Class, "Abandon all hope, ye who enter here."',
	inventory: [ 'chairs', 'knowledge' ],
	roomCanGoTo: [ 'stairway' ]
};

let pizzaplace = {
	name: "Mr. Mike's",
	description: 'Pizza place next door',
	inventory: [ 'pizza' ],
	roomCanGoTo: [ 'street' ]
};

let stairway = {
	sign: 'Welcome to the classroom. To enter please enter code 12345',
	roomCanGoTo: [ 'foyer', 'classroom' ]
};

//rooms look up
const roomLookUp = {
	'street': street,
	'foyer': foyer,
  //'muddy': muddy,
  'stairway': stairway,
  'pizzaplace': pizzaplace,
  'classroom': classroom
};

const roomCanGoTo = {
	'street': [ 'pizza place', 'foyer'],
  'foyer': [ 'stairway', 'street' ],
  'classroom': ['stairway'],
  'stairway': ['classroom', 'foyer'],
  'pizzaplace': ['street']
};

// function enterState(newState) {
	// let validTransitions = states[currentState].canChangeTo;
	// if (validTransitions.includes(newState)) {
		// currentState = newState;
	// } else {
		// throw 'Invalid state transition attempted - from ' + currentState + ' to ' + newState;
	// }
// }


function enter(roomObj, room) {
if (roomObj.roomCanGoTo){
	player.currentRoom = roomLookUp.room;
  console.log(roomObj.roomCanGoTo)
	console.log({player})
	console.log({roomObj})
	entry = (roomObj.name + ' ' + roomObj.description);
return entry;
} else {
  console.log('You can not get there from here.')
  play()
}
}


async function play() {
	let input = await ask('\n>');
	let inputClean = input.toLowerCase();
	let inputArray = inputClean.split(' ');
	let useAction = inputArray[0];
	let useItem = inputArray[1];
	console.log(inputArray);

	if (actions['read'].includes(useAction)) {
		//read an item
		console.log(player.read());
		play();
	} else if (actions['take'].includes(useAction)) {
		//add object to player inventory and remove it from room inventory
		player.take(useItem);
		// console.log({ player });
		// console.log({ street });
		play();
	}
	 else if (actions['enter'].includes(useAction)) {
  //enter a room
		if (useItem !== 'code') {
		player.open(useItem);
		} else if (useItem === 'code') {
			let keycombo = await (ask ('Enter the secret code: '));
			player.combo(keycombo);
		}
		
  	// if (roomCanGoTo[currentRoom].includes(useItem)){
		//   console.log(enter(roomLookUp[useItem], useItem));
		// 
  	// {
  	//   console.log('You cant get there from here')
  	// }
  //console.log(roomLookUp[useItem]);
  //enter(roomLookUp.useItem);
  //console.log(entry);
    //let useItem = input.toString

    
		play();
	} else if (inputClean === 'exit') {
		//exit statemnt
		console.log(
			`Thank you for playing
    Good Bye`
		);
		process.exit();
	} else {
		console.log("I don't know how to  " + inputArray[0]);
		console.log({ player });
		play();
	}
}

async function start() {
	console.log(`182 Main Street 
  You are standing on Main Street between Church and South Winooski.
  There is a door here. A keypad sits on the handle.
  On the door is a handwritten sign.`);
	player.name = null;
	let userName = await ask(`Oh wait 
  First what is your name? \n`);
	player.name = userName;
	console.log(`Alright ${userName} welcome to your first day of class.`);

	// if answer is affirmative go inside if not('gargle') repeat question
	let input = await ask('type yes to start your day\n');
	if (input === 'yes') {
		curRoom = street;
		player.currentRoom = street;
		play();
	} else {
		console.log("I don't know how to " + input);
	}
}

start();

//------------------------------------old functions
// async function streetSide() {
// const streetMessage = 'We are where we started standing on the street.'
// let input = await ask(streetMessage)
// if (input === 'return to foyer') {
// foyer()
// }
// if (input === 'go to Mr. Mikes') {
// pizzaShop()
// }
// }
//
//
//
// async function foyerEntry(){
// change to state
// if chain of possible actions within room
// const foyerMessage = 'Welcome to the foyer. A small room with a staircase which you are standing at the bottom of. There is a newstand '
//
// let input = await ask(foyerMessage)
// if(input === 'take stairs'){
// stairwayUp()
// } if (input === 'exit to street'){
// streetSide()
// }
//
// }
//
//
// async function stairwayUp() {
// const stairwayMessage = 'You\'ve gone up the stiars and reached a door with a sign '
// console.log(stairwayMessage)
// let input = await ask(stairwayMessage)
// if (input === 'read sign') {
// console.log(stairway.sign)
// }
// if (input === 'enter code 12345') {
// classroom()
// }
// }
//
//if statements for possible actions
//
//
// async function classRoom() {
// const classroomMessage = 'You\'ve entered the classroom. Bob is teaching because you are late'
// let input = await ask(classroomMessage)
//if statement allowing actions and results ---if(input === 'action'){result}
// if (input === 'sit and listen') {
//
// }
// if(input === 'go back down stairs'){
// foyerEntry()
// }
// }
//
// async function pizzaShop() {
// const pizzaMessage = 'you have entered the pizza shop'
// let input = await ask(pizzaMessage)
// if (input === ''){
// console.log('')
// }
// }

// async function game() {
// command = await ask('Do something!');
// }
