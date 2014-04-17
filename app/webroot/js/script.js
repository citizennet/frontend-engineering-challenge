/********************************************************
 *
 * Custom Javascript code for TravelFly Ghost theme
 * Written by Themelize.me (http://themelize.me)
 *
 *******************************************************/
/*exported disqus_identifier */
/*global  RetinaImage */
$(document).ready(function() {
  "use strict";
  
  // --------------------------------
  // Custom code
  // --------------------------------
  
  // Share widget popups
  // --------------------------------
  $('[data-toggle=share]').each(function() {
  var
    shareWidth = $(this).attr('data-share-window-w') || 400,
    shareHeight = $(this).attr('data-share-window-h') || 300,
    shareURL = $(this).attr('href') +'?'+ encodeURI($(this).attr('data-share-query'));

    $(this).on('click', function() {
      window.open(shareURL, 'share', 'width='+ shareWidth +',height='+ shareHeight);
      return false;
    });
  });
  
  // --------------------------------
  // Plugins
  // --------------------------------

  // Infinite Scroll
  // --------------------------------
  $('[data-toggle=infinitescroll]').each(function() {
    var target = $(this).data('target') || '#posts';
    
    $(target).infinitescroll({
      navSelector: $(this).data('next-selector'),
      nextSelector: $(this).data('next-selector'),
      itemSelector: '.post',
      dataType: 'html',
      maxPage: parseInt($(this).data('max-page')),
      loading: {
        finishedMsg: 'No more posts to load.',
        img: 'data:image/gif;base64,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' //@todo
      },
    },
    function(newElements){
      $(newElements).find('.post-feature-media').featuredMedia();
      
      // Rerun fitVids
      if (jQuery().fitVids) {
        $(newElements).fitVids();
      }
      
      // Rerun retina
      $(newElements).find('img').each(function(){
        var r = new RetinaImage(this);
        r = r+1;
      });
    }).addClass('infinite-scroll');
    
    $(this).hide();
  });
  
  // Bootstrap tooltip
  // @see: http://getbootstrap.com/javascript/#tooltips
  // --------------------------------
  // invoke by adding data-toggle="tooltip" to a tags (this makes it validate)
  if(jQuery().tooltip) {
    $('body').tooltip({
      selector: "[data-toggle=tooltip]",
      container: "body"
    });
  }
  
  
  // --------------------------------
  // Ghost helpers
  // Some may be removed as Ghost evolves
  // --------------------------------
  
  // Commenting via Disqus
  // --------------------------------
  $('.post-comments').hide();
  $('[data-toggle=disqus-comments]').each(function() {
    $('.post-comments').show();
    var disqus_shortname = $(this).data('disqus-shortname');
    var disqus_identifier = $(this).data('disqus-identifier');
    $(this).attr('data-ident', disqus_identifier); //do something with disqus_identifier to make JSHint happy
    
    (function() {
      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
  });
  
  // Remove invalid attr from iframes
  // --------------------------------
  $('iframe').removeAttr('frameborder scrolling');
  
  // Featured post media
  // --------------------------------
  $('.post-feature-media').featuredMedia();
  
  // Plugin: FitVids.js
  // --------------------------------
  if (jQuery().fitVids) {
    $(".post").fitVids();
  }
});

/**
 * Find media (images, video, etc) in posts to use as "featured" media
 */
jQuery.fn.extend({
  featuredMedia: function () {
    var featuredMediaType;
    
    $(this).hide();
    $(this).each(function() {
      featuredMediaType = '';
      
      // @media: anything tagged with .featured-media
      if ($(this).find('.featured-media').length > 0) {
        
        $(this).html($(this).find('.featured-media:eq(0)')).fadeIn();
        featuredMediaType = 'custom';
      }
      else {
        // @media: image
        if ($(this).find('img').length > 0) {
          var featureImg;
          if ($(this).find('img.featured-img').size() > 0) {
            featureImg = $(this).find('img.featured-img');
          }
          else {
            featureImg = $(this).find('img:eq(0)');
          }
          featureImg.addClass('post-feature-media-img');
          var featureImgContent = $('<a></a>').attr('href', $(this).data('url')).attr('title', $(this).data('title')).addClass('post-feature-media').html(featureImg);
          $(this).replaceWith(featureImgContent);
          featuredMediaType = 'image';
        }
        // @media: Video
        if ($(this).find('.fluid-width-video-wrapper').length > 0) {
          $(this).html($(this).find('.fluid-width-video-wrapper:eq(0)')).fadeIn();
          featuredMediaType = 'video';
        }
        // @media: Twitter embed
        if ($(this).find('.twitter-tweet').length > 0) {
          $(this).html($(this).find('.twitter-tweet:eq(0)')).fadeIn();
          $('<script>').attr({
            type: 'text/javascript',
            src: 'http://platform.twitter.com/widgets.js'
          }).appendTo($(this));
          featuredMediaType = 'tweet';
        }
        // @media: Facebook status embed
        if ($(this).find('.fb-post').length > 0) {
          // Facebook haven't made embedded posts responsive yet!!
          $(this).find('.fb-post').removeAttr("data-width").css({"overflow-x": "auto", "max-width": "100%"});
          $(this).html($(this).find('.fb-post:eq(0)')).fadeIn();
          $(this).before('<div id="fb-root"></div>');
          $(this).before('<script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1"; fjs.parentNode.insertBefore(js, fjs); }(document, "script", "facebook-jssdk"));</script>');
          featuredMediaType = 'fb-status';
        }
        // @media:  SoundCloud or anything else in iFrame
        else if ($(this).find('iframe').length > 0) {
          $(this).html($(this).find('iframe:eq(0)')).fadeIn();
          featuredMediaType = 'sound';
        }
      }
      
      // None = hide
      if ($(this).find('.featured-media, img, .fluid-width-video-wrapper, .twitter-tweet, .fb-post, iframe').length === 0) {
        $(this).remove();
      }
      
      // Add media type class to parent
      if (featuredMediaType !== '') {
        $(this).parents('.post').addClass('featured-media-'+ featuredMediaType);
      }
    });
  }
});