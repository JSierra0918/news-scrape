function viewNotes (){
     // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  $.get(`/articles/${thisId}`)
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data.note);
      // The title of the article
    
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='saveNote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        console.log(data.note);
        // Place the title of the note in the title input

        $("#noteShow").append(`
        <div class="note-container">
            <h2>${data.note.title}</h2> 
            <p>${data.note.body}</p>
            <div id="x-btn">X</div>
         </div> 
         `);
        // $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        // $("#bodyinput").val(data.note.body);

        //create a div where it shows all notes added to the article.
      } 

      if (data.notes) {
        
        data.notes.forEach(element => {
         
          $("#titleOutput").val(data.note.title);
          $("#bodyOutput").val(data.note.body);  
        });
      }
    });
}

function saveNotes (){
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    const newNote = {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
    $.post(`/articles/${thisId}`, newNote, (err)=> console.log(err))
      // With that done
      .then((data)=> {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
}


//on click note button
$(document).on("click",".addNotes", viewNotes);
$(document).on("click","#saveNote", saveNotes);
$(document).on("click","#deleteNote", saveNotes);
$(document).on("click",".scrapeBtn", function (event){
  event.preventDefault();

  
});
