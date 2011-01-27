# Installation

Copy `kaltura_galleries/ksu-setting.sample.php` to `kaltura_galleries/ksu-settings.php` and add your kaltura credentials into `ksu-settings.php`.

Unzip the kaltura_galleries folder into your theme's folder.

In your theme's functions.php, add the following at the end:

    <?php 
      require_once(dirname(__FILE__) . "/kaltura_galleries/wp-functions.php");
    ?>

Copy `kaltura_galleries/single-gallery.php` into your theme's root folder.
