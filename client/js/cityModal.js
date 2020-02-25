// to place the model title
$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var recipient = button.data('whatever'); // Extract info from data-* attributes
    var modal = $(this);
    modal.find('.modal-title').text(recipient);
  });