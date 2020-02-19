/** You have a good start to this program with a few bugs to work out. Taking and dropping things is a little funky and you should check out those actions.
 *  It looks like you have completed most of the stories in a way and added a few extra rooms and actions, great job. You are almost there for functionality.
 *  Once you work out some of the bugs mentioned in the comments then you should be right where you need to be. It looks like you have a pretty good understanding
 *  of the topics discussed in week 2 and how to use objects, you just have a few kinks to work out. Also, you have some good comments, but a few more describing
 *  objects, blocks of code, functions, etc would be good to improve readability. **/
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
	return new Promise((resolve, reject) => {
		readlineInterface.question(questionText, resolve);
	});
}

// State machine for room transitions
/** This 'pathStates' and 'objects' objects are unused in your code, remember to remove unused code for better readability and organization **/
let pathStates = {
	street: { canMoveTo: ['foyer', 'muddy'] },
	foyer: { canMoveTo: ['stairs', 'street'] },
	muddy: { canMoveTo: ['street', 'pizza'] },
	pizza: { canMoveTo: ['muddy'] }
};

const objects = {
	sign: 'no',
	newspaper: 'yes'
};

// global variable for holding room state:
let curRoom;


const player = {
	name: null,
	currentRoom: null,
	inventory: ['pocket watch', 'map'],
	status: [],

	/** Careful using fat arrow syntax in object literals like this. The way you have it now works fine, but if you were to use the 'this' keyword, you
	 *  begin to get some weird behavior because of the way 'this' works with arrow functions. You can read more about arrow functions here (https://stackoverflow.com/questions/36717376/arrow-function-in-object-literal) and here (https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/)**/
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
	drop: (item) => {
		if (player.inventory.includes(item)) {
			player.inventory.pop();	/** Careful here, if the item you are trying to remove is not the last item in the inventory, then you will be popping the wrong item **/
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
/** This set of objects is a good example where you can define a Room class and then create new instances of room by passing in the values you have passed to
 *  each of the objects below, but this works fine the way it is! I also like that you have sort of worked your state machine into your objects with a
 *  roomCanGoTo property, but you aren't using it in the rest of your code! Bummer! **/
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

//rooms look up
const roomLookUp = {
	muddys: muddys,
	street: street,
	foyer: foyer,
	stairway: stairway,
	pizzaplace: pizzaplace,
	classroom: classroom
};

/** Looks like you have a few redundant state machine objects throughout your code **/
const canEnterFrom = {
	street: ['pizzaplace', 'foyer', 'muddys'],
	foyer: ['stairway', 'street'],
	classroom: ['stairway'],
	stairway: ['classroom', 'foyer'],
	pizzaplace: ['street'],
	muddys: ['street']
};

// Lookup for path of allowed access to rooms
/** Nice use of a state machine object **/
const roomCanGoTo = {
	street: ['pizzaplace', 'foyer', 'muddys'],
	foyer: ['stairway', 'street'],
	classroom: ['stairway'],
	stairway: ['classroom', 'foyer'],
	pizzaplace: ['street'],
	muddys: ['street']
};

// Begin async function for game play
async function play() {
	let input = await ask('\n>');
	let inputClean = input.toLowerCase();	/** Nice input sanitization **/
	let inputArray = inputClean.split(' ');
	/** These variable names are a little confusing and you are getting these from specific indices in the inputArray which calls for weird behavior if the
	 *  user enters some action that should be allowed, but entered in an unexpected way. **/
	let useAction = inputArray[0];
	let useItem = inputArray[1];
	let fromRoom = inputArray[3];	/** maybe this would be better named as toRoom? Is this the room you want to be moving to? **/

	if (player.status.includes('hunger')) {
		console.log('Hunger begins to mount')
	}

	/** For your read and take actions, maybe add an and operator (&&) to check if the input includes 'read' AND it includes another word like sign, or paper.
	 *  Otherwise, these checks will become true no matter what you are trying to read or take and will default to trying to read and take the sign. **/
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
		/** Your program is crashing here when trying to enter the foyer using command 'enter foyer' when I type: enter to the foyer, this spits back 'cannot go
		 *  there from here. Instead of getting the room using a specific index of the inputArray, try using inputArray[inputArray.length - 1]. This will get the
		 *  last word in the inputArray so that the input doesn't have to be so specific. Also, this check is looking in roomCanGoTo for fromRoom which will be
		 *  'foyer' and you can't go from foyer to foyer, so it thinks it is an invalid transition. Edit: I see what you are trying to achieve here, but it is pretty
		 *  non-intuitive. If I type 'enter foyer from street' this works, just very specific and I think I could only get this because I am looking at your code. **/
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
	/** Check out your drop function, and see what happens when you try to drop the pocket watch **/
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
		console.log("I don't know how to  " + inputArray[0]);

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
