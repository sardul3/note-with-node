

const fs = require("fs");

var fetchNotes = ()=>{
	try{
	var notesString = fs.readFileSync("notes-app.json");
	return JSON.parse(notesString);
	}
	catch(e){
		return [];
	}
};

var readNotes = (notes)=>{
	fs.writeFileSync("notes-app.json", JSON.stringify(notes));
};

var addNote = (title,body) => {
	//console.log("Adding notes is now connected!", title, body);
	var notes = fetchNotes();
	var note = {
		title:title,
		body:body
	};

var duplicateNotes = notes.filter((note)=>{
	return note.title === title;
});

if(duplicateNotes.length === 0){
	notes.push(note);
	readNotes(notes);
	console.log("-----------------");
	console.log("Note added successfully");
	console.log("Title: " +note.title+ "\n" + "Body: " + note.body);
	console.log("-----------------");
}
else{
	console.log("Duplicate Entry found!");
}


};


var getAll = () => {
	return fetchNotes();

};

var getNote = (title) => {
	var notes = fetchNotes();
	var foundNote = notes.filter((note)=> note.title === title);
	return foundNote[0];
};

var removeNote = (title) => {

	var notes = fetchNotes();
	var toBeRemoved = notes.filter((note)=> note.title !== title); 
		
	readNotes(toBeRemoved);

	return notes.length !== toBeRemoved.length;

};

module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote
};



// ARROW FUNCTION
// module.exports.add = (a,b) => {};


