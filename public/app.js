$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append(
      `<p data-id='${data[i]._id}'> <button type="button" class="btn btn-primary note-button" data-id="${data[i]._id}" data-toggle="modal" data-target="#noteModal">Notes</button>
      <a href='${data[i].link}'>
      ${data[i].headline}</a>
     <br />
      ${data[i].summary}
      </p><hr />`);
  }
});

$(document).on("click", ".note-button", function() {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function(data) {
      $("#noteModal .modal-title").text(data.headline);
      $(".modal-body").html(`
        <h5>Title:</h5>
        <input id='titleinput' name='title'>
        <h5>Notes:</h5>
        <textarea id='bodyinput' name='body'></textarea>
      `);
      $("#save-note").attr("data-id", thisId);
      console.log(thisId);
      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    });
});

$(document).on("click", "#save-note", function() {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .then(function(data) {
      console.log(data);
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// function buildNoteModal (id, headline) {
//   let modal = `<button type="button" class="btn btn-primary note-button" data-toggle="modal" data-target="#exampleModal">
//   Notes
//   </button>
//   <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//     <div class="modal-dialog" role="document">
//       <div class="modal-content">
//         <div class="modal-header">
//           <h5 class="modal-title" id="exampleModalLabel">${headline}</h5>
//           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//             <span aria-hidden="true">&times;</span>
//           </button>
//         </div>
//         <div class="modal-body">
//           ...
//         </div>
//         <div class="modal-footer">
//           <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//           <button type="button" data-id="${id}" class="btn btn-primary">Save changes</button>
//         </div>
//       </div>
//     </div>
//   </div>`;

//   return modal;
// }