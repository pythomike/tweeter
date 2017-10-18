$(function() {
  var charMax = 140;
  $('textarea').on('keyup', function() {
    var counter = charMax - $(this).val().length;
    $(".counter").text(counter); 
    if($(this).val().length>140){
      $(".counter").css('color', 'red');
    }else{
      $(".counter").css('color','black');
    }
  });
});

