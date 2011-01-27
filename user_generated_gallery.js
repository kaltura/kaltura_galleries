// Console Trap!
if (!window.console) {
  window.console = new function() {
    this.log = function(str) {};
    this.dir = function(str) {};
    };
  }

var kWidgetId = "_22646",
    kPartnerId = 22646,
    thumbHeight = 135,
    thumbWidth = 240,
    posterHeight = 270,
    posterWidth = 480,
    previousDescription = undefined,
    thumbnailTop = undefined,
    currentPage = 1,
    mediaRSS,
    descriptionsDB,
    descriptionsArray,
    galleryClips = new Array(),
    kConfig,
    kClient,
    galleryItems = new Array(),
    totalPages;
    // customTag is set by single-gallery.php


// Call up all published items in Kaltura account with the custom tag
function loadGalleryItems() {
  kConfig = new KalturaConfiguration(parseInt(kPartnerId));
  kClient = new KalturaClient(kConfig);
  kClient.setKs(ks);

  $.ajax({
    type: "GET",
    async: false,
    url: "http://www.openvideoconference.org/wp-content/themes/ovcclassic/kaltura_galleries/get_gallery.php", 
    data: ({ customTag: customTag }), 
    success: function(data){
      galleryItems = JSON.parse(data).objects;
      galleryItems = galleryItems.sort(function(a,b){return b.rank-a.plays;});
      galleryItems = galleryItems.sort(function(a,b){return b.plays-a.plays;});
      totalPages = parseInt(galleryItems.length / 8) + 1;
      if (galleryItems.length == 8) { totalPages = 1; }
      }
    });
  }

function displayGallery() {
  $.each( galleryItems, function( index, video ) {
    // Get the url of the thumbnail from Kaltura
    // Set the poster
    thumbnailImageURL = 'http://cdnakmi.kaltura.com/p/' + kPartnerId + '/sp/' +
                        kPartnerId + '00/thumbnail/entry_id/' + video.id + '/width/' +
                        thumbWidth + '/height/' + thumbHeight;

    // This is the div we want to add in for each Thumbnail
    divText = "<div class='thumbnail' id='" + index + "'>" +
              "  <img src='" + thumbnailImageURL + "'>" +
              "</div>";

    // Add in the div
    $('#thumbs-container').append(divText);
  });

  //Make thumbnail divs hoverable
  $('.thumbnail').mouseenter( function(){
    previewVideo(this.id);
    }); 
  $('.thumbnail').mouseleave( function(){
    $('#video-description').html(previousDescription);
    });

  // Make thumbnail divs clickable
  $('.thumbnail').click( function(){
    loadVideo(this.id);
    });

  // Bind the Scroll Buttons
  $('#up-arrow').click( function() {
    scrollUp();
    });
  $('#down-arrow').click( function() {
    scrollDown();
    });
  }

function loadVideo(videoId){
  var converter = new Showdown.converter();
  var descriptionText = '## ' + galleryItems[videoId].name + '\n\n' + galleryItems[videoId].description;
  var text = converter.makeHtml(descriptionText);
  $('#video-description').html(text);
  previousDescription = text;

  mw.ready( function(){
    mw.load( 'EmbedPlayer', function(){
      $j( '#video-player' ).html(
        $j('<video />')
          .css({
            'width' : 480,
            'height' : 270
            })
          .attr({
            'kentryid' : galleryItems[videoId].id,
            'kwidgetid' : kWidgetId,
            'kpartnerid' : kPartnerId
            })
        );
      // Rewrite all the players on the page
      $j.embedPlayers();
      });
    });
  console.log("displaying " + galleryItems[videoId].name);
  }

function checkArrows(page) {
  if (totalPages === 1) {
    $('#up-arrow').hide();
    $('#down-arrow').hide();
    }
  else {
    if (page == 1) { // we're on the first page
      $('#up-arrow').hide();
      $('#down-arrow').show();
      }
    else if (page == totalPages) { // we're on the last page
      $('#up-arrow').show();
      $('#down-arrow').hide();
      }
    else {      // we're neither on the first or last page
      $('#down-arrow').show();
      $('#up-arrow').show();
      }
    }
  }


var scrollFactor = 272;
function scrollUp () {
  $('#thumbs-container').animate({
    top: "+="+scrollFactor+"px",
    }, 750);
  currentPage = currentPage - 1;
  checkArrows(currentPage);
  }

function scrollDown () {
  $('#thumbs-container').animate({
    top: "-="+scrollFactor+"px",
    }, 750);
  currentPage = currentPage + 1;
  checkArrows(currentPage);
  }

function showUpload() {
  $('#ksu').dialog('open');
  }

function previewVideo(videoId){
  var converter = new Showdown.converter();
  var title = galleryItems[videoId].name;
  var description = galleryItems[videoId].description;

  var descriptionText = '## ' + title + '\n\n' + description;
  var text = converter.makeHtml(descriptionText);
  $('#video-description').html(text);
  }

// spinner based on http://kilianvalkhof.com/2010/css-xhtml/css3-loading-spinners-without-images
var Spinner = function ( target, options ) {
  this.options = options;
  this.target = target;
  this.build();
  }

Spinner.prototype.build = function ( ) {

    // build the spinner and insert it into the target
    var spinnerContent = '';
    var barSpacingDegrees = ( 360 / this.options.numberOfSpokes );
    var barOpacityDelta = ( 1 / this.options.numberOfSpokes );
    for (i=1;i<=this.options.numberOfSpokes;i++) {
      spinnerContent += '<div class="bar' + i + '" style="' + 
                        'width:10px;height:30px;background:'+this.options.color+';position:absolute;top:35px;left:45px;' +
                        '-moz-border-radius:20px;-webkit-border-radius:20px;border-radius:20px;' +
                        '-moz-transform:rotate(' + (i) * barSpacingDegrees + 'deg) translate(0, -40px);' + 
                        '-webkit-transform:rotate(' + (i) * barSpacingDegrees + 'deg) translate(0, -40px);' + 
                        'opacity:' + (i) * barOpacityDelta + ';">&nbsp;</div>';
      }

    //  calculate the appropriate offset to center the spinner
    var targetWidth = parseInt(document.defaultView.getComputedStyle(document.getElementById(this.target)).getPropertyValue('width'));
    var targetHeight = parseInt(document.defaultView.getComputedStyle(document.getElementById(this.target)).getPropertyValue('height'));
    var fromTop = ( targetHeight / 2 ) - ( this.options.size / 2) - (49);
    var fromLeft = ( targetWidth / 2 ) - ( this.options.size / 2) - (24);
    spinnerContent = "<div class='spinner' style='z-index:2000;display:inline;position:absolute;width:100px;height:100px;margin:24px;top:"+fromTop+"px;left:"+fromLeft+"px'>" + spinnerContent + "</div>" + document.getElementById(this.target).innerHTML;
    document.getElementById(this.target).innerHTML = spinnerContent;

    // rotate the spinner
    this.rotate();
    return this;
    }

Spinner.prototype.rotate = function () {
  var rotationDegrees = 0;
  var rotationStep = ( 360 / this.options.numberOfSpokes );
  var rotationTarget = document.querySelector( '#' + this.target + ' .spinner' );
  console.log(this.target);
  var scale = this.options.size/100
  function step() {
    if (rotationDegrees>=360) { rotationDegrees = 0 };
    rotationDegrees+=rotationStep;
    rotationTarget.style.MozTransform = 'rotate('+rotationDegrees+'deg) scale('+scale+')';
    rotationTarget.style.WebkitTransform = 'rotate('+rotationDegrees+'deg) scale('+scale+')';
    }
  this.spinning = setInterval(step, 150);
  return this;
  }

Spinner.prototype.remove = function () {
  clearInterval(this.spinning);
  document.getElementById( this.target ).removeChild(document.querySelector('#' + this.target + ' .spinner'));
  return this;
  }


var spinOpts = {
  color: "white",
  numberOfSpokes: 11,
  size: 100 // 100 px is the only working size at this moment
  }


init = function() {
  $('#ksu').dialog({ title: "Upload a Video", 
                     autoOpen: false,
                     width: 650,
                     height: 450,});

  loadGalleryItems();
  displayGallery();
  loadVideo(0);
  checkArrows(currentPage);
  }

//window.onload = function(){ spinner = new Spinner('gallery', spinOpts);};
var spinner;
$(function(){
  spinner = new Spinner('content', spinOpts);
  init();
  setTimeout('spinner.remove()', 3000);
  $('#gallery').css("visibility","visible");
  });
