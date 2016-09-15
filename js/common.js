$(document).ready(function() {

   $("#about-me").click(function() {
      $('html,body').animate({
         scrollTop: $("#about").offset().top
      }, 1200);
   });

   $("#explore").click(function() {
      $('html,body').animate({
         scrollTop: $("#portfolio").offset().top
      }, 1200);
   });

   $('#gallery-bar-container').customGalleryBar();
});
