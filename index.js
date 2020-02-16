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

	enter: (room) => {
		//if (roomCanGoTo['street'].includes(room)) {

		player.currentRoom = room;
		curRoom = player.currentRoom;
		// console.log({ player })
		// console.log(curRoom)
		console.log(curRoom.name + '\n' + curRoom.description);
	},
	read: () => {
		return player.currentRoom.sign;
	},
	take: (item) => {
		if (curRoom.inventory.includes(item)) {
			player.inventory.push(item);
			curRoom.inventory.pop();
			console.log('You have taken the ' + item + '.');
			if (player.inventory.includes('pizza')) {
					console.log(
						`You have won the Game! 
						After taking the pizza you realize it\'s what you have always needed.`
					);
					process.exit();
				}
		} else {
			console.log('\nThat would be selfish. How will other students find their way?');
		}
	},
	drop: (item) => {
		if (player.inventory.includes(item)) {
			player.inventory.pop();
			curRoom.inventory.push(item);
			console.log('You just dropped the ' + item);
			if (classroom.inventory.includes('tea')){
				console.log(
					`Bob grabs the tea and consumes it in one giant gulp.
					With newfound vigor he exclaims
					"You will forever be my favorite student
					If you are hungry try going to the street and then the pizzaplace
					They have great slices"`)
			}
		} else {
			console.log("Can't drop what you don't have.");
		}
	},
	open: (door) => {
		// } else {
		console.log(curRoom.name + '\n' + curRoom.description);
		return curRoom;
	},
	combo: (keycombo) => {
		if (keycombo === curRoom.lockCombo) {
			curRoom.lock = false;
			console.log(curRoom.unlockMsg);
			curRoom = roomLookUp[curRoom.unlockRoom];
			console.log(curRoom.name + '\n' + curRoom.description);
		} else {
			console.log(curRoom.tryLockMsg);
		}
	},
	show: (thing) => {
		console.log('You are carrying: \n' + player.inventory.join(', '));
	}
};

const actions = {
	read: [ 'read', 'view' ],
	take: [ 'take', 'grab' ],
	drop: [ 'drop', 'let go', 'give' ],
	accept: [ 'yes', 'i would' ],
	enter: [ 'enter', 'open', 'code' ],
	show: [ 'i', 'inventory' ]
};

let street = {
	name: '182 Main St.',
	description:
		'You are standing on Main Street between Church and South Winooski. There is a door here. A keypad sits on the handle. On the door is a handwritten sign.',
	lockMsg: 'The door is locked. There is a keypad on the door handle.',
	tryLockMsg: 'Bzzzzt! The door is still locked.',
	unlockMsg: '\nSuccess! The door opens. \nYou enter the foyer and the door shuts behind you...',
	lock: true,
	lockCombo: '12345',
	unlockRoom: 'foyer',
	sign:
		`The sign says "Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code "12345".
		Once you have unloced the door proceed through the foyer and up the stairs`,
	takeSign: 'That would be selfish. How will other students find their way?',
	inventory: [], //This inventory initialized without 'sign' so that there is none to take.
	roomCanGoTo: [ 'foyer', 'pizza place', 'muddys' ]
};

let foyer = {
	name: 'Foyer',
	description:
		'You are in a foyer. Or maybe it\'s an antechamber. \nOr a vestibule. Or an entryway. Or an atrium. Or a narthex.\n But let\'s forget all that fancy flatlander vocabulary,\n and just call it a foyer. In Vermont, this is pronounced "FO-ee-yurr".\nA copy of Seven Days lies in a corner.',
	inventory: [ 'newspaper', 'shoes', 'sign' ],
	roomCanGoTo: [ 'stairway', 'street' ],
	sign: 'Class in progress up stairs',
	lock: false
};

let classroom = {
	name: 'Classroom',
	description: 
	`Bob is leading class
	it appears as if he may need tea at any moment.
	and in this moment you realize how hungry you are.
	Convieniently Bob then mentions we are breaking for lunch...
	which probably means he is ready for tea
	He adds, 
	"If you want to be my favorite student and earn my knowledge of the best pizza around get me some tea from muddys
	its right off the street after you leave the foyer"`,
	inventory: [ 'chairs', 'knowledge' ],
	roomCanGoTo: [ 'stairway' ],
	lock: false
};

let pizzaplace = {
	name: "Mr. Mike's",
	description: 'Pizza place next door',
	inventory: [ 'pizza' ],
	roomCanGoTo: [ 'street' ],
	lock: false
};

let stairway = {
	name: 'Stairway',
	description: 'You have entered the stairway connecting the classroom and foyer',
	sign: 'Welcome to the classroom. Class is in session, please enter and quietly and prepare to have your mind blown',
	roomCanGoTo: [ 'foyer', 'classroom' ],
	lock: false
};
let muddys = {
	name: 'Muddys',
	description: 
	`Welcome to Muddys. 
	We sell tea, and coffee.`,
	sign: 'Come on in for warm beverages',
	roomCanGoTo: ['street'],
	lock: false,
	inventory: ['coffee', 'tea']
}

//rooms look up
const roomLookUp = {
	muddys: muddys,
	street: street,
	foyer: foyer,
	//'muddy': muddy,
	stairway: stairway,
	pizzaplace: pizzaplace,
	classroom: classroom
};

const roomCanGoTo = {
	street: [ 'pizzaplace', 'foyer', 'muddys' ],
	foyer: [ 'stairway', 'street' ],
	classroom: [ 'stairway' ],
	stairway: [ 'classroom', 'foyer' ],
	pizzaplace: [ 'street' ],
	muddys: ['street']
};

// function enterState(newState) {
// let validTransitions = states[currentState].canChangeTo;
// if (validTransitions.includes(newState)) {
// currentState = newState;
// } else {
// throw 'Invalid state transition attempted - from ' + currentState + ' to ' + newState;
// }
// }

async function play() {
	let input = await ask('\n>');
	let inputClean = input.toLowerCase();
	let inputArray = inputClean.split(' ');
	let useAction = inputArray[0];
	let useItem = inputArray[1];
	let fromRoom = inputArray[3];
	//console.log(inputArray);

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
	} else if (actions['enter'].includes(useAction)) {
		//enter a room
		// console.log({ player })
		if (roomCanGoTo[fromRoom].includes(useItem) && curRoom.lock === false) {
			player.enter(roomLookUp[useItem]);
		} else if (roomCanGoTo[fromRoom].includes(useItem) && curRoom.lock === true) {
			console.log(curRoom.lockMsg);
			let keycombo = await ask('Enter the secret code: ');
			player.combo(keycombo);
			// } else {
			// 	player.open(curRoom);

			// play();
		} else {
			console.log("You can't get there from here.");
			play();
		}
		// if (player.inventory.includes('pizza')) {
		// 	console.log(
		// 		`You have won the Game! 
		// 		After taking the pizza you realize it\'s what you have always needed.`
		// 	);
		// 	process.exit();
		// }
		play();
	} else if (actions['show'].includes(useAction)) {
		player.show();
		play();
	} else if (actions['drop'].includes(useAction)) {
		player.drop(useItem);
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

		play();
	}
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
		console.log('You sit and think hey i should probably read that sign')
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
