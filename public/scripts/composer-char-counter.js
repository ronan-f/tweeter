$(document).ready(function() {
  $('textarea').on('keyup', function(){
    let counter = 140;
    let length = $(this).val().length;
    length = counter - length;
    $('.counter').text(length);
  })
});