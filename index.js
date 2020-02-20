const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
	return new Promise((resolve, reject) => {
		readlineInterface.question(questionText, resolve);
	});
}


// Declare global variable for holding room state:
let curRoom;


//Declare player object for inventory, status, and action methods
const player = {
	name: null,
	currentRoom: null,
	inventory: ['pocket watch', 'map'],
	status: [],

	// method to allow for player to switch room contexts:
	enter: (room) => {

		player.currentRoom = room;
		curRoom = player.currentRoom;
		console.log(curRoom.name + '\n' + curRoom.description);
	},

	attend: () => {
		player.inventory.push('knowledge')
		player.status.push('hunger')
		classroom.inventory.pop()
	},

	read: () => {
		return player.currentRoom.sign;
	},

	// take an item from a room inventory:
	take: (item) => {
		if (curRoom.inventory.includes(item)) {
			player.inventory.push(item);
			curRoom.inventory.pop();
			console.log('You have taken the ' + item + '.');
			if (item === 'newspaper') {
				console.log('You pick up the paper and leaf through it \nlooking for comics and ignoring the articles, just like everybody else does.');
			}
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
	// method to allow player to drop items in any room by input and leave item in the room's inventory:
	drop: (item) => {
		if (player.inventory.includes(item)) {
			let itemIdx = player.inventory.findIndex(thing => thing === item);
			player.inventory.splice(itemIdx, 1);
			curRoom.inventory.push(item);
			console.log('You just dropped the ' + item);
			if (classroom.inventory.includes('tea')) {
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
		console.log(curRoom.name + '\n' + curRoom.description);
		return curRoom;
	},
	// method to process combination lock key-in
	combo: (keycombo, newRoom) => {
		if (keycombo === newRoom.lockCombo) {
			newRoom.lock = false;
			console.log(newRoom.unlockMsg);
			curRoom = roomLookUp[newRoom.unlockRoom];
			console.log(curRoom.name + '\n' + curRoom.description);
		} else {
			console.log(newRoom.tryLockMsg);
		}
	},
	show: (thing) => {
		console.log('You are carrying: \n' + player.inventory.join(', '));
	}
};

// object is used for action lookup of allowable commands
const actions = {
	read: ['read', 'view'],
	take: ['take', 'grab', 'buy'],
	drop: ['drop', 'let go', 'give'],
	accept: ['yes', 'i would'],
	enter: ['enter', 'open', 'code'],
	show: ['i', 'inventory'],
	attend: ['attend', 'participate', 'join']
};

// Begin objects to define rooms:
let street = {
	name: '182 Main St.',
	description:
		'You are standing on Main Street between Church and South Winooski. There is a door here. A keypad sits on the handle. On the door is a handwritten sign.',
	sign:
		`The sign says "Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code "12345".
		Once you have unlocked the door proceed through the foyer and up the stairs`,
	takeSign: 'That would be selfish. How will other students find their way?',
	inventory: [], //This inventory initialized without 'sign' so that there is none to take.
	roomCanGoTo: ['foyer', 'pizza place', 'muddys'],
	lock: false
};

let foyer = {
	name: 'Foyer',
	description:
		'You are in a foyer. Or maybe it\'s an antechamber. \nOr a vestibule. Or an entryway. Or an atrium. Or a narthex.\n But let\'s forget all that fancy flatlander vocabulary,\n and just call it a foyer. In Vermont, this is pronounced "FO-ee-yurr".\nA copy of Seven Days lies in a corner.',
	inventory: ['newspaper', 'shoes', 'sign'],
	roomCanGoTo: ['stairway', 'street'],
	sign: 'Class in progress up stairs',
	unlockRoom: 'foyer',
	lockMsg: 'The door is locked. There is a keypad on the door handle.',
	tryLockMsg: 'Bzzzzt! The door is still locked.',
	unlockMsg: '\nSuccess! The door opens. \nYou enter the foyer and the door shuts behind you...',
	lock: true,
	lockCombo: '12345'
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
	its right off the street after you leave the foyer
	Remember to attend class if you want to gain any knowledge."`,
	inventory: ['chairs', 'knowledge'],
	roomCanGoTo: ['stairway'],
	lock: false
};

let pizzaplace = {
	name: "Mr. Mike's",
	description: 'Pizza place next door',
	inventory: ['pizza'],
	roomCanGoTo: ['street'],
	lock: false
};

let stairway = {
	name: 'Stairway',
	description:
		`You have entered the stairway connecting the classroom and foyer,
	If you want to attend class, enter the classroom from stairway and attend class`,
	sign: 'Welcome to the classroom. Class is in session, please enter and quietly and prepare to have your mind blown',
	roomCanGoTo: ['foyer', 'classroom'],
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
};

//rooms look up to convert user input to a room object:
const roomLookUp = {
	muddys: muddys,
	street: street,
	foyer: foyer,
	stairway: stairway,
	pizzaplace: pizzaplace,
	classroom: classroom
};

// Lookup for path of allowed access to rooms
const roomCanGoTo = {
	street: ['pizzaplace', 'foyer', 'muddys'],
	foyer: ['stairway', 'street'],
	classroom: ['stairway'],
	stairway: ['classroom', 'foyer'],
	pizzaplace: ['street'],
	muddys: ['street']
};

// Begin async function for game play
// Initialize the input variable set to sanitize and parse input:
async function play() {
	let input = await ask('\n>');
	let inputClean = input.toLowerCase();
	let inputArray = inputClean.split(' ');
	let useAction = inputArray[0];
	let useItem = inputArray[1];
	let fromRoom = inputArray[3];

	//Begin the if...else logic which is driven by command input compared to methods in player object, primarily.
	
	if (player.status.includes('hunger')) {
		console.log('Hunger begins to mount')
	}

	if (actions['read'].includes(useAction)) {
		//read an item
		console.log(player.read());
		play();
	} else if (actions['take'].includes(useAction)) {
		//add object to player inventory and remove it from room inventory
		player.take(useItem);
		play();
	} else if (actions['enter'].includes(useAction)) {
		//enter a room
		//Logic uses second keyword of user input to index the roomCanGoTo lookup of allowable paths.
		// It compares the lock status of each room as well to produce the allowed path.
		if (roomCanGoTo[fromRoom].includes(useItem) && roomLookUp[useItem].lock === false) {
			player.enter(roomLookUp[useItem]);
		} else if (roomCanGoTo[fromRoom].includes(useItem) && roomLookUp[useItem].lock === true) {
			console.log(roomLookUp[useItem].lockMsg);
			let keycombo = await ask('Enter the secret code: ');
			player.combo(keycombo, roomLookUp[useItem]);
		} else {
			console.log("You can't get there from here.");
			play();
		}
		play();
	} else if (actions['show'].includes(useAction)) {
		player.show();
		play();
	} else if (actions['attend'].includes(useAction)) {
		player.attend()
		play()
	}
	else if (actions['drop'].includes(useAction)) {
		player.drop(useItem);
		play();
	} else if (inputClean === 'exit') {
		//exit statemnt
		console.log(
			`Thank you for playing!
Good Bye`
		);
		process.exit();

	} else {
		console.log("I don't know how to  " + inputArray[0]);  // Catch-all for unrecognized commands

		play();
	}
}

// Begin async function to start the game
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
	let input = (await ask('type yes to start your day\n')).trim();
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
