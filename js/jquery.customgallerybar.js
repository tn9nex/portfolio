(function($)
{
   $.customGalleryBar = function(element, options)
   {
      var defaults = {};
      var galleryBar = this;

      galleryBar.settings = {};

      var $element = $(element), element = element;
      var galleryItemSize;
      var galleryBarContentHeight;
      var previousDotIndex;

      galleryBar.init = function()
      {
         var settings = $.extend({}, defaults, options);
      }

      // Build galleryBar
      galleryBar.buildGallery = function()
      {
         galleryBar.getGalleryItemSize();
         galleryBar.buildGalleryNavBar();
         galleryBar.setGalleryContentWrapperHeight();
         galleryBar.generateColorOverlay();
      }

      galleryBar.buildGalleryNavBar = function()
      {
         for(var i = 0; i < galleryItemSize; i++)
         {
            $element.find('.gallery-bar').append($('<div>', {'class': 'gallery-dot'}));
         }

         galleryBar.setGalleryNavBarItemHeight();
         galleryBar.setGalleryItemActive(0);
      }

      galleryBar.changeContentItem = function(currentClickedItem)
      {
         galleryBar.moveToGalleryContent(currentClickedItem);
         galleryBar.setGalleryItemActive(currentClickedItem);
         galleryBar.colorStreamEffect();
      }

      galleryBar.setGalleryItemActive = function(galleryCurrentItem)
      {
         $element.find('.gallery-dot').removeClass('active');
         $element.find('.gallery-dot').eq(galleryCurrentItem).addClass('active');
      }

      galleryBar.setGalleryNavBarItemHeight = function()
      {
         console.log('enter');
         galleryBarContentHeight = $element.find('.about-gallery-content-container').outerHeight();

         galleryBarDotItemHeight = galleryBarContentHeight / galleryItemSize;
         $element.find('.gallery-dot').height(galleryBarDotItemHeight);
         $element.find('.gallery-bar').parent().height(galleryBarContentHeight);
         $element.find('.gallery-bar').height(galleryBarContentHeight - galleryBarDotItemHeight);
      }

      galleryBar.getGalleryItemSize = function()
      {
         galleryItemSize = $element.find('.about-gallery-item').length;
      }

      galleryBar.setGalleryContentWrapperHeight = function()
      {
         var contentWrapperHeight = 0;

         for(var i = 0; i < galleryItemSize; i++)
         {
            contentWrapperHeight += $element.find('.about-gallery-item').eq(i).outerHeight(true);
         }

         $element.find('.about-gallery-content-wrapper').outerHeight(contentWrapperHeight);
      }

      galleryBar.moveToGalleryContent = function(galleryCurrentItem)
      {
         $element.find('.about-gallery-item').removeClass('active');
         $element.find('.about-gallery-item').eq(galleryCurrentItem).addClass('active');

         var contentItemPosition = parseInt($element.find('.about-gallery-item').outerHeight()) * galleryCurrentItem;

         $element.find('.about-gallery-content-wrapper').css(
         {
            '-webkit-transform': 'translateY(-'+contentItemPosition+'px)',
            '-ms-transform': 'translateY(-'+contentItemPosition+'px)',
            'transform': 'translateY(-'+contentItemPosition+'px)'
         });
      }

      galleryBar.colorStreamEffect = function()
      {
         var currentDot = $element.find('.gallery-dot').index($element.find('.gallery-dot.active'));

         if(previousDotIndex == 'undefined' || previousDotIndex == null)
            previousDotIndex = 0;

         if(previousDotIndex != currentDot)
         {
            $element.find('.gallery-dot-overlay').removeClass('animate');

            if (currentDot !== -1)
            {
               var overlayDistanceTraveled = $element.find('.gallery-dot').outerHeight() * currentDot;

               /*if (currentDot - previousDotIndex === 1)
               {
                  $element.find('.gallery-dot-overlay').css(
                  {
                     '-webkit-transform': 'translateY('+overlayDistanceTraveled+'px)',
                     '-ms-transform': 'translateY('+overlayDistanceTraveled+'px)',
                     'transform': 'translateY('+overlayDistanceTraveled+'px)'
                  }).addClass('animate');
               }
               else if (currentDot - previousDotIndex === 2)
               {
                  $element.find('.gallery-dot-overlay').css(
                  {
                     '-webkit-transform': 'translateY('+overlayDistanceTraveled+'px)',
                     '-ms-transform': 'translateY('+overlayDistanceTraveled+'px)',
                     'transform': 'translateY('+overlayDistanceTraveled+'px)'
                  }).addClass('animate');
               }
               else
               {
                  $element.find('.gallery-dot-overlay').css(
                  {
                     '-webkit-transform': 'translateY('+overlayDistanceTraveled+'px)',
                     '-ms-transform': 'translateY('+overlayDistanceTraveled+'px)',
                     'transform': 'translateY('+overlayDistanceTraveled+'px)'
                  }).addClass('animate');
               }*/

               if(previousDotIndex > currentDot)
               {
                  $element.find('.gallery-dot-overlay').css(
                  {
                     '-webkit-transform': 'translateY('+overlayDistanceTraveled+'px)',
                     '-ms-transform': 'translateY('+overlayDistanceTraveled+'px)',
                     'transform': 'translateY('+overlayDistanceTraveled+'px)'
                  }).addClass('animateUp');
               }

               if(previousDotIndex < currentDot)
               {
                  $element.find('.gallery-dot-overlay').css(
                  {
                     '-webkit-transform': 'translateY('+overlayDistanceTraveled+'px)',
                     '-ms-transform': 'translateY('+overlayDistanceTraveled+'px)',
                     'transform': 'translateY('+overlayDistanceTraveled+'px)'
                  }).addClass('animateDown');
               }

            }

            previousDotIndex = currentDot;
         }
      }

      galleryBar.generateColorOverlay = function()
      {
         $element.find('.gallery-bar').append($('<div>', {'class': 'gallery-dot-overlay'}));
      }

      galleryBar.dotOverlayAnimationEnd = function()
      {
         console.log('triggered');
         $element.find('.gallery-dot-overlay').removeClass('animateUp').removeClass('animateDown');
      }

      galleryBar.init();
      galleryBar.buildGallery();

      $element.find('.gallery-dot').on('click', function()
      {
         currentClickedItem = $('.gallery-dot').index($(this));
         galleryBar.changeContentItem(currentClickedItem);
      });

      $element.find('.gallery-dot-overlay')[0].addEventListener('webkitAnimationEnd', galleryBar.dotOverlayAnimationEnd);

      $element.find('.gallery-dot-overlay')[0].addEventListener('animationend', galleryBar.dotOverlayAnimationEnd);

      $(window).resize(function(e)
	   	{
		  	clearTimeout(resizeTimer);

		  	resizeTimer = setTimeout(function()
		  	{
            galleryBar.setGalleryNavBarItemHeight();
	        	windowResize();
		  	}, 250);
		});
   }

   $.fn.customGalleryBar = function(options)
   {
      return this.each(function() {
         if(undefined == $(this).data('customGalleryBar')) {
            var customGalleryBar = new $.customGalleryBar(this, options);

            $(this).data('customGalleryBar', customGalleryBar);
         }
      });
   };
})(jQuery)
