function viewNotes() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  $.get(`/articles/${thisId}`)
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data.note);
      // The title of the article

      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' placeholder='title'>");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body' placeholder='notes'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='saveNote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // console.log(data.note);
        // Place the title of the note in the title input

        console.log($(this).text())
        //only append new notes
        if ($(".note-container h2").text() === data.note.title) {
          return;
        } else {

          $("#noteShow").append(`
          <div class="note-container">
              <h2>${data.note.title}</h2> 
              <p>${data.note.body}</p>
              <div id="x-btn" data-id="${data.note._id}">X</div>
           </div> 
           `);
        }



        console.log()
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

function saveNotes() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  const newNote = {
    // Value taken from title input
    title: $("#titleinput").val(),
    // Value taken from note textarea
    body: $("#bodyinput").val()
  }
  $.post(`/articles/${thisId}`, newNote, (err) => console.log(err))
    // With that done
    .then((data) => {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
}

//delete article
$(document).on('click', '#delete', function () {
  console.log("in the #delete on click")
  var noteid = $(this).attr("data-id");
  var articleid = $(this).attr("data-id");
  
  console.log("note-delete");
  $.ajax({
          method: "DELETE",
          url: "/articles/" + articleid
          // url: "/notes/" + noteid + "/" + articleid
      })
      .done(function (note) {
        console.log("Deleted Article");
          location.reload();
      });
});


// FUNCTIONS ==================
//if you click outside notes, remove it.
$(window).on("click", function (e) {
  if (event.target.closest("#notes")) {
    return;
  }else {
    $("#notes").empty();
  }
});

$(document).on("click", ".addNotes", viewNotes);
$(document).on("click", "#saveNote", saveNotes);
$(document).on("click", "#deleteNote", saveNotes);
$(document).on("click", ".scrapeBtn", function (event) {
  event.preventDefault();
console.log("scrape")
  $.get("/scrape", function (response){
    console.log(response);
    
    location.reload();
  })

});