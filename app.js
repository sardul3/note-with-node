
console.log("add -- to add notes"+ "\n"+ "remove -- to delete a note");


const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes.js");

var titleSpecs = {
			describe: "Tile of the note",
			alias : "t",
			demand : true
			  }

const argv = yargs
	.command("add", "Add a new note",
{
		title:titleSpecs,
		body:{
			describe: "Body/Contents for the note",
			demand :false,
			alias :"b"
			 }
})
	.command("list", "Lists all the available notes")
	.command("read", "Opens up an specific note",{
		title:titleSpecs
		})
	.command("remove", "Deletes a note from the notes folder",
		{title:titleSpecs
		})
			.help()
			.argv;
//console.log(argv);

// Gives back the command typed in the cmd/bash
//var command = process.argv[2];
var command = argv._[0];

if(command === "list"){
	allNotes = notes.getAll();

	console.log(`Displaying $(allNotes.length) note(s)..`);
	for(var i = 0; i < allNotes.length; i++){
		console.log("------------------------------------------");
		console.log("Title: " + allNotes[i].title +"\n"+ "Body:" +allNotes[i].body);
		console.log("------------------------------------------");
	}
	
}
else if(command === "add"){
	notes.addNote(argv.title, argv.body);
	
} 
else if(command === "remove"){
	var removeNotes = notes.removeNote(argv.title);
	
	var message = removeNotes ? "Note was removed" : "No deletion";
	console.log(message);	
}
else if(command === "read"){
	var note = notes.getNote(argv.title);
	var message = note ? "Title: "+note.title+"\n"+ "Body: "+ note.body : "Note not found";
	console.log(message);
}
else if(command === "help"){
	console.log("add -- to add notes"+ "\n"+ "remove -- to delete a note");
}
else{
	console.log("Command not found!");
}



//fs.appendFile("Sagar.txt", "is here");
//console.log(os.userInfo.username;
//console.log(os.uptime()/3600 + " hours");

