const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const notes =require('./notes')


// Create add command
yargs.command({
    command: 'add',
    describe: 'Used for adding a note',
    builder:{     
        title:{  // argv argument
            describe: 'Note Title', //not necessary to put here, just for the reference
            demandOption: true, //by default it's false, it helps in requiring title in the request command if no then it gives error//required statement
            type: 'string'
        },
        body:{
            describe:'Note body',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
        notes.addNotes(argv.title, argv.body)
    }
})


//Create remove command
yargs.command({
    command:'remove',
    describe:'used to remove a note',
    builder:{
        title:{
            describe: 'Note Title', 
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNotes(argv.title)
    }
})

//Create list command
yargs.command({
    command:'list',
    description:'used to see the whole list',
    handler(){
        // console.log('Displaying the list')
        notes.listNotes()
    }
})

//Create read command
yargs.command({
    command:'read',
    describe:'used to read a note',
    builder:{
        title:{
            describe: 'Note Title', 
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

yargs.parse(); // goes to all the yargs and parse the arguments


