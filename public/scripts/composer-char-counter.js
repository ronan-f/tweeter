$(document).ready(function() {
  $('textarea').on('keyup', function(){
    $('.error').hide(); //Hide error message when user continues input

    let length = $(this).val().length;
    let thisCounter = $(this).siblings('.counter');
    let counterVal = 140 - length;

    if(counterVal < 0){
      thisCounter.css('color', 'red');
    } else {
      thisCounter.css('color', 'black');
    }
    thisCounter.text(counterVal);
  })
})