$(document).ready(function() {
  $('textarea').on('keyup', function(){
    let length = $(this).val().length;
    let thisCounter = $(this).siblings('.counter');
    length = 140 - length;

    if(length < 0){
      thisCounter.css('color', 'red');
    } else {
      thisCounter.css('color', 'black');
    }
    thisCounter.text(length);
  })
});