# Introduction

This software is a theme addin that allows you to display galleries of Kaltura hosted videos in a wordpress blog.  To use this theme addin you just install it into your theme directory and tag the videos you want to group together on the KMC.

# Installation

1. Download the latest version of the theme addin&mdash;Currently [version 0.0.1](https://github.com/kaltura/kaltura_galleries/zipball/v0.0.1).
2. Unzip the `kaltura_galleries` folder into your theme's folder.
3. Copy `kaltura_galleries/ksu-setting.sample.php` to `kaltura_galleries/ksu-settings.php` and add your kaltura credentials into `ksu-settings.php`.
4. In your theme's functions.php, add the following at the end:

    <?php 
      require_once(dirname(__FILE__) . "/kaltura_galleries/wp-functions.php");
    ?>

5. Copy `kaltura_galleries/single-gallery.php` into your theme's root folder.

# Usage

Once you have successfully installed the addin, you will have a new custom post type on your main `wp-admin` page.  The galleries work by querying the Kaltura server to retreive all videos (up to 300) with a specific tag that you set on your videos in the Kaltura KMC.

1. Upload your media to the Kaltura server via the KMC or the `Upload a Video` button in an existing gallery.
1. Once you're in your wordpress administration, click `Galleries` and then `Add New`.
2. Title your gallery and (optionally) add a text description of the gallery contents.
3. Add a `Custom Field` to the gallery post with the name `custom_tag` and set the value of the custom field to the tag you set in the KMC.
> You may insert more than one tag, comma separated, in the `custom_tag` field to make the gallery include all videos with any one of the tags you have placed in `custom_tag`.

# Troubleshooting

Make sure that your theme includes jquery version 1.4.2 or greater.

If you have further problems with this addin, please [file an issue](https://github.com/kaltura/kaltura_galleries/issues).
