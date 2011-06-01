<?php
/**
 * @package WordPress
 * @subpackage Default_Theme
 */
/*
Template Name: Gallery Index
*/ ?>

<!--include external scripts and define constants -->
<?php

	require_once("kaltura_galleries/kcl_php5/KalturaClient.php"); 
	
	//define constants in ksu-settings.php
  include "kaltura_galleries/ksu-settings.php";

	//Construction of Kaltura objects for session initiation
	$config           = new KalturaConfiguration(KALTURA_PARTNER_ID);
	$client           = new KalturaClient($config);
	$ks               = $client->session->start(KALTURA_PARTNER_WEB_SERVICE_SECRET, KALTURAPARTNER_USER, KalturaSessionType::USER);
	//$ks               = $client->session->start(KALTURA_PARTNER_WEB_SERVICE_ADMIN_SECRET, $partnerUserID, KalturaSessionType::ADMIN);
?>

<?php get_header(); ?>

<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/style.css" type="text/css" media="screen" /> 
<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/kaltura_galleries/style.css" type="text/css" media="screen" /> 

<div id="content" class="narrow">
  <div>
		<?php 
			global $post;
			$myposts = get_posts('post_type=videos&orderby=parent');
		?>
		<ul id="gallery-tabs">
		<?php foreach($myposts as $post): ?>
			<?php setup_postdata($post); ?>
			<li>
					<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
			</li>
		<?php endforeach; ?>
		</ul>
  </div><br/>

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

  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<div class="post" id="post-<?php the_ID(); ?>">
			<div class="entry">
        <!-- here's everything we need to build this demonstration -->
        <script type="text/javascript">
		  var customTag = "<?php $sources = get_post_custom_values('gallery_tags'); echo $sources[0]; ?>",
		  wpThemeURL = "<?php bloginfo('template_url'); ?>";
        </script>
				<?php the_content(); ?>
			</div>
		</div>
	<?php endwhile; endif; ?>

</div>

<!--[if IE]>
<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<script type="text/javascript" src="https://github.com/douglascrockford/JSON-js/raw/master/json2.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
<script type="text/javascript" src="http://html5.kaltura.org/js"></script>  
<script src="http://apis.kaltura.org/kalturaJsClient/kaltura.min.js.php" language="javascript"></script>

<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/kaltura_galleries/showdown.js"></script>

<script type="text/javascript">
// Kaltura Session Key and Partner ID are provided by PHP Kaltura Client on the Server
var ks = "<?php echo $ks;?>";
var kPartnerId = <?php echo KALTURA_PARTNER_ID; ?>;
</script>

<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/kaltura_galleries/user_generated_gallery.js"></script>

<?php get_footer(); ?>
