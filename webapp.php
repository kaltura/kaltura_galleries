<!doctype html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<?php

	require_once("kcl_php5/KalturaClient.php"); 
	
	//define constants in ksu-settings.php
  include "ksu-settings.php";

	//Construction of Kaltura objects for session initiation
	$config           = new KalturaConfiguration(KALTURA_PARTNER_ID);
	$client           = new KalturaClient($config);
	$ks               = $client->session->start(KALTURA_PARTNER_WEB_SERVICE_SECRET, KALTURAPARTNER_USER, KalturaSessionType::USER);
	//$ks               = $client->session->start(KALTURA_PARTNER_WEB_SERVICE_ADMIN_SECRET, $partnerUserID, KalturaSessionType::ADMIN);
?>
<head>
  <meta charset="utf-8">

  <!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
       Remove this if you use the .htaccess -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title></title>
  <meta name="description" content="">
  <meta name="author" content="">

  <!-- Mobile viewport optimized: j.mp/bplateviewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Place favicon.ico and apple-touch-icon.png in the root directory: mathiasbynens.be/notes/touch-icons -->

  <!-- CSS: implied media="all" -->
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="webapp.css">

  <!-- More ideas for your <head> here: h5bp.com/docs/#head-Tips -->

  <!-- All JavaScript at the bottom, except for Modernizr and Respond.
	   Modernizr enables HTML5 elements & feature detects; Respond is a polyfill for min/max-width CSS3 Media Queries -->
	<!--
  <script src="js/libs/modernizr-1.7.min.js"></script>
<script src="js/libs/respond.min.js"></script>
	-->
</head>

<body>

  <div id="container">
    <header>
		<h1>Kaltura HTML5 Video Galleries</h1>
    </header>
    <div id="main" role="main">
  <div id="gallery">
    <div class="video-highlight videobox">
        <div id="video-player"></div>
    </div>
    <div class="infobox videobox">
        <div id="video-description"></div>
    </div>
    <div id="thumbs-viewport">
    	<!--[if lt IE 9]>
	<style type="text/css">
		.thumbnail { display:inline }
		#nav {margin: 32px 0px 15px}
	</style>
	<![endif]-->
        <div id="thumbs-container"></div>
    </div>
    <div id="arrows">
      <span class="arrow" id="up-arrow"><a>&uArr;</a></span>
      <span class="arrow" id="down-arrow"><a>&dArr;</a></span>
    </div>
  </div>

    </div>
    <footer>

    </footer>
  </div> <!--! end of #container -->


  <!-- JavaScript at the bottom for fast page loading -->

  <!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline -->
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/libs/jquery-1.6.1.min.js">\x3C/script>')</script>

<!--[if IE]>
<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<script type="text/javascript" src="https://github.com/douglascrockford/JSON-js/raw/master/json2.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
<script type="text/javascript" src="http://html5.kaltura.org/js"></script>  
<script src="http://apis.kaltura.org/kalturaJsClient/kaltura.min.js.php" language="javascript"></script>

<script type="text/javascript" src="showdown.js"></script>

<script type="text/javascript">
// Kaltura Session Key and Partner ID are provided by PHP Kaltura Client on the Server
var ks = "<?php echo $ks;?>";
var kPartnerId = <?php echo KALTURA_PARTNER_ID; ?>;
var customTag = "vidding";
var wpThemeURL = false;
</script>

<script type="text/javascript" src="user_generated_gallery.js"></script>

  <!-- scripts concatenated and minified via ant build script-->
<!-- No Build Script Used at this time 
  <script src="js/plugins.js"></script>
	<script src="js/script.js"></script>
	-->
  <!-- end scripts-->

	
  <!-- mathiasbynens.be/notes/async-analytics-snippet Change UA-XXXXX-X to be your site's ID -->
	<!--
  <script>
    var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview'],['_trackPageLoadTime']];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
    g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g,s)}(document,'script'));
  </script>
	-->
</body>
</html>
