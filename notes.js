const fs = require('fs');
const chalk = require('chalk');

let addNotes = (title, body) => {
    const notes = loadNotes(); // notes= array of objects
    // const duplicateNotes = notes.filter((note)=> note.title === title)
    const duplicateNote = notes.find((note)=> note.title === title) // find doesn't give an array just a single result of the first element matching the condition

    if(!duplicateNote){
        notes.push({    // pushing the new object
            title:title,
            body:body
        });
        console.log("Success - Note added")
    }
    else{
        console.log("Duplicate - Note can't be added");
    }
        saveNotes(notes); // sending updated array
}


let saveNotes = (notes) => {    // notes= upadted array of objects
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

let loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON); //returning the array of object
    }
    catch(err){
        return [];
    }
}

let listNotes = ()=> {
    console.log(chalk.green.inverse('Your Notes'));
    const notes = loadNotes();
    return notes.forEach(note => console.log(note.title));
}

let readNote = (title) => {
    let notes = loadNotes();
    const noteFound =  notes.find((note)=> note.title === title)
    if(noteFound){
        console.log(chalk.green(noteFound.title))
        console.log(noteFound.body)
    }
    else{
        console.log(chalk.red.inverse('No note found'))
    }
    
}

let removeNotes = (title) => {
    let allNotes = loadNotes(); // array of all the objects
    const notesToKeep = allNotes.filter((note)=> note.title !== title)

    if(allNotes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Removed the note, check the notes.json file'));
        saveNotes(notesToKeep)
    }
    else{
        console.log(chalk.red.inverse('No note found!!!!!'))
    }
}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}