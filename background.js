$('button').each(function () { 
  console.log("Youtube");
});

/*
$('.expando-button').each(function () {
  $(this).trigger('click');
  $(this).children('.ytp-button').trigger('click');
  console.log("Youtube button");
});
*/
//$('.expando-button').eq(1).trigger('click');
//$('.expando-button').eq(1).trigger('click');

$('.expando-button').eq(2).trigger('click');


setTimeout(
  function() 
  {
    

  }, 20000);  

$('iframe').each(function(){
    var iframe = $(this).contents();
    console.log("outter iframe");
    iframe.find('iframe').each(function () {
      console.log("inner frame");
    });
});
