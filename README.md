# Installation

Download the latest version of the theme addin&mdash;Currently [version 0.0.1](https://github.com/kaltura/kaltura_galleries/zipball/v0.0.1).

Unzip the `kaltura_galleries` folder into your theme's folder.

Copy `kaltura_galleries/ksu-setting.sample.php` to `kaltura_galleries/ksu-settings.php` and add your kaltura credentials into `ksu-settings.php`.

In your theme's functions.php, add the following at the end:

    <?php 
      require_once(dirname(__FILE__) . "/kaltura_galleries/wp-functions.php");
    ?>

Copy `kaltura_galleries/single-gallery.php` into your theme's root folder.

# Troubleshooting

Make sure that your theme includes jquery version 1.4.2 or greater.
