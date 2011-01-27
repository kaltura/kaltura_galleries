<?php
/**
 * @package WordPress
 * @subpackage Default_Theme
 */
/*
Template Name: Galleries Index
*/ ?>

<!--include external scripts and define constants -->
<?php 
	require_once("kaltura_galleries/kcl_php5/KalturaClient.php"); 
	
	//define constants in ksu-settings.php
  include "kaltura_galleries/ksu-settings.php";

	//define session variables
	$partnerUserID          = 'openvideoconference.tv';

	//Construction of Kaltura objects for session initiation
	$config           = new KalturaConfiguration(KALTURA_PARTNER_ID);
	$client           = new KalturaClient($config);
	$ks               = $client->session->start(KALTURA_PARTNER_WEB_SERVICE_SECRET, $partnerUserID, KalturaSessionType::USER);
	//$ks               = $client->session->start(KALTURA_PARTNER_WEB_SERVICE_ADMIN_SECRET, $partnerUserID, KalturaSessionType::ADMIN);

	$flashVars = array();
	$flashVars["uid"]   = $partnerUserID; 
	$flashVars["partnerId"] 		        = KALTURA_PARTNER_ID;
	$flashVars["subPId"] 		        = KALTURA_PARTNER_ID*100;
	$flashVars["entryId"] 	 = -1;	     
	$flashVars["ks"]   = $ks; 
	$flashVars["conversionProfile"]   = 5; 
	$flashVars["maxFileSize"]   = 250; 
	$flashVars["maxTotalSize"]   = 5000; 
	$flashVars["uiConfId"]   = 11500; 
	$flashVars["jsDelegate"]   = "delegate"; 
?>

<?php get_header(); ?>


<!--[if IE]>
<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"></script>
<script type="text/javascript" src="http://html5.kaltura.org/js"></script>  
<script src="http://apis.kaltura.org/kalturaJsClient/kaltura.min.js.php" language="javascript"></script>


<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/kaltura_galleries/ksu.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/kaltura_galleries/showdown.js"></script>


<script type="text/javascript">

// Kaltura Session Key and Partner ID are provided by PHP Kaltura Client on the Server
var ks = "<?php echo $ks;?>";
var kPartnerId = <?php echo KALTURA_PARTNER_ID ?>;
// set flashVar object
var ksuflashVars = <?php echo json_encode($flashVars); ?>;

</script>


<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/kaltura_galleries/user_generated_gallery.js"></script>


    <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>

    <link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/style.css" type="text/css" media="screen" /> 
    <link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/kaltura_galleries/style.css" type="text/css" media="screen" /> 

	<div id="content" class="narrow">

<div id="tabbers">
		<?php 
			global $post;
			$myposts = get_posts('post_type=gallery&orderby=parent');
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
		<div id="upload-now">
      <p align="right">
			  <a id="start-upload" onclick="showUpload()">Upload a Video</a>
      </p>
		</div>
<div id="gallery" style="visibility:hidden;position:relative;margin-left:auto;margin-right:auto">

    <div class="video-highlight box270">
        <div id="video-player"></div>
    </div>
    <div class="infobox box270">
        <div id="video-description"></div>
    </div>
    <div id="thumbs-viewport">
        <div id="thumbs-container"></div>
    </div>

    <div id="arrows">
      <span class="arrow" id="up-arrow"><a>&uArr;</a></span>
      <span class="arrow" id="down-arrow"><a>&dArr;</a></span>
    </div>

    <div id="upload-dialog">
    </div>

</div>



<div id="ksu" style="display:none;visibility:visible">
  <!---set style to enable widget overlap -->
<style>
#ksu { margin: 0px; overflow:hidden }
#flashContainer{ position:relative; }
#flashContainer span{ color:#333; font-size:16px; }
object, embed{ position:absolute; top:0; left:0; z-index:1001;}
</style>


	<div id="flashContainer">
		<form>
			<input id="browse-button" type="button" value="Select a File">
		</form>
		<div id="uploader"> 
		</div>
    <script type="text/javascript">
			 <!--embed flash object-->
			swfobject.embedSWF("http://www.kaltura.com/kupload/ui_conf_id/11500", "uploader", "200", "30", "9.0.0", "expressInstall.swf", ksuflashVars, ksuparams,ksuattributes);
			//swfobject.embedSWF("./KSU.swf", "uploader", "200", "30", "9.0.0", "expressInstall.swf", flashVars, params,attributes);
    </script>


	</div>
	<br/>

  <div id="progress-bar"></div><br/>
  <div id="flash"></div><br/>

	<div id="userInput">
	  <form>
			<input type="text" value="title here" id="titleInput" /><br />
			<input type="text" value="tags here, comma separated" id="tagsInput" /><br />
      <textarea id="descriptionInput">Please enter a description here.

we recommend using Markdown and writing the credits for your video like this:

[Your Name](http://yourwebsite.com "HoverText!")</textarea><br />
      <input id="save-button" type="button" value="Save" 	onclick="saveEntry()">
      <input id="add-button" type="button" value="Complete Upload" 	onclick="titleAndSaveEntry()">
		</form>
    
  </div>

</div>

  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<div class="post" id="post-<?php the_ID(); ?>">
			<div class="entry">
        <!-- here's everything we need to build this demonstration -->
        <script type="text/javascript">
        var customTag = "<?php $key="custom_tag"; $sources = get_post_custom_values($key); echo $sources[0]; ?>";
        </script>
				<?php the_content(); ?>
			</div>
		</div>
		<?php endwhile; endif; ?>


  </div>
  </div>
	<div id="sidebar">

		<ul>
			<?php dynamic_sidebar('news-sidebar'); ?>
		</ul>
	</div>
<?php get_footer(); ?>
