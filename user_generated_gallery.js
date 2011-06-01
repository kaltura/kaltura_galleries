mw.setConfig("EmbedPlayer.EnableIframeApi", false);
mw.setConfig('jQueryUISkin', 'kdark');

// Console Trap!
if (!window.console) {
  window.console = new function() {
    this.log = function(str) {};
    this.dir = function(str) {};
    };
  }

var kWidgetId = "_22646",
    kPartnerId = 22646,
    thumbHeight = 131,
    thumbWidth = 233,
    posterHeight = 264,
    posterWidth = 466,
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
			if ( $j("#video-player_iframe") ) { $j( '#video-player_iframe' ).remove(); }
			
			kalturaIframeEmbed('video-player', {
				entry_id: galleryItems[videoId].id,
				wid: '_' + kPartnerId,
				p: kPartnerId
			}, {
				width: posterWidth,
				height: posterHeight
			} );
		  // Rewrite all the players on the page
		  //$j.embedPlayers();
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


var scrollFactor = thumbHeight*2;
function scrollUp () {
  $('#thumbs-container').animate({
    top: "+="+scrollFactor+"px"
    }, 750);
  currentPage = currentPage - 1;
  checkArrows(currentPage);
  }

function scrollDown () {
  $('#thumbs-container').animate({
    top: "-="+scrollFactor+"px"
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

// Call up all published items in Kaltura account with the custom tag
function loadGalleryItems() {
  kConfig = new KalturaConfiguration(parseInt(kPartnerId));
  kClient = new KalturaClient(kConfig);
  kClient.setKs(ks);

  $.ajax({
    type: "GET",
    async: false,
    url: wpThemeURL + "/kaltura_galleries/get_gallery.php", 
    data: ({ customTag: customTag }), 
    success: function(data){
      galleryItems = JSON.parse(data).objects;
      galleryItems = galleryItems.sort(function(a,b){return b.rank-a.plays;});
      galleryItems = galleryItems.sort(function(a,b){return b.plays-a.plays;});
      totalPages = parseInt(galleryItems.length / 8) + 1;
      if (galleryItems.length == 8) { totalPages = 1; }
	displayGallery();
	loadVideo(0);
	checkArrows(currentPage);
      }
    });
  }


  /*
  $('#ksu').dialog({ title: "Upload a Video", 
                     autoOpen: false,
                     width: 650,
                     height: 450,});
                     */


$(function(){
  loadGalleryItems();
  $('#gallery').css("visibility","visible");
  });
