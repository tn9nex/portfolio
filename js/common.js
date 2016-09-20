$(document).ready(function() {

   // Navigation buttons
   $("#nav-home").click(function() {
      $('html,body').animate({
         scrollTop: $("#heading").offset().top
      }, 1200);
   });

   $("#nav-about").click(function() {
      $('html,body').animate({
         scrollTop: $("#about").offset().top
      }, 1200);
   });

   $("#nav-portfolio").click(function() {
      $('html,body').animate({
         scrollTop: $("#portfolio").offset().top
      }, 1200);
   });

   $("#nav-contact").click(function() {
      $('html,body').animate({
         scrollTop: $("#contact").offset().top
      }, 1200);
   });

   // Page buttons
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

   $("#contact").click(function() {
      $('html,body').animate({
         scrollTop: $("#contact-form").offset().top
      }, 1200);
   });

   //console.log($('#portfolio').innerHeight());
   $('.about-gallery-item').height($('.about-gallery-content-container').innerHeight());


   $('#gallery-bar-container').customGalleryBar();
});
