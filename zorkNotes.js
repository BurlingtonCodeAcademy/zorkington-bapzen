const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => { readlineInterface.question(questionText, resolve); })
}

let pathStates = {
    'street': {canMoveTo: ['foyer', 'muddy']},
    'foyer': {canMoveTo: ['stairs', 'street']},
    'muddy': {canMoveTo: ['street', 'pizza']},
    'pizza': {canMoveTo: ['muddy']}
}

let player = {

    inventory: ['paper', 'milk', 'key'],
    cash: 5,
    status: 'hangry'

}

let street = {

    name: '182 Main St.',

    description: 'You are standing on Main Street between Church and South Winooski. There is a door here. A keypad sits on the handle. On the door is a handwritten sign.',

    lock: true,

    sign: 'The sign says "Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code "12345".',

    takeSign: 'That would be selfish. How will other students find their way?',

    door: function(room) {
        text = this.name + '\n' + this.description;
        // return text;
        console.log(text);
    },
}

//     lock: function(room) {
//         let lockStatus = true;
//         combo = 
//         if (combo === 12345) {
//             lockStatus = false;
//             console.log('Unlocked.');
//         } else {
//             lockstatus = true;
//             console.log('Nope.');
//         }
//     }
// }


let foyer = {

    name: 'foyer',
    description: '',
    door: function(room) {
        text = this.name + '\n' + this.description;
        // return text;
        console.log(text);
    }

}

let classroom = {
    name: 'Classroom',
    description: 'BCA Class, "Abandon all hope, ye who enter here."',
    door: function(room) {
        text = this.name + '\n' + this.description;
        // return text;
        console.log(text);
    }

}

let pizzaplace = {
    name: 'Mr. Mike\'s',
    description: 'Pizza place next door',
    door: function(room) {
        text = this.name + '\n' + this.description;
        // return text;
        console.log(text);
    }

}

function enter (room) {
    if (pathStates[currentState].canMoveTo.includes(room)) {
        console.log('Change from ' + currentState);
        currentState = room;
        console.log('Current state is ' + currentState);
    } else {
        console.log('invalid state transition attempted')
        // note state is not changed
    }
    text = this.name + '\n' + this.description;
    // return text;
    console.log(text);

};



zork();

async function zork() {

let room = 'street';
currentState = room;

enter(room);

//street.door();
//street.lock();
let nextRoom = await ask('Move to...  ');

//await ask('Type in the combination: ');
foyer.door();
pizzaplace.door();
classroom.door();
// moveTo = (await ask('Move to...  ')).toLowerCase();
// enter(moveTo);

process.exit();

};
