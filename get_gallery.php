<?php

//if this is a GET, we search for the custom term and return entryIDs
if (isset($_GET['customTag']))
{
  if (!empty($_GET['customTag']))
  {
    $customTag = $_GET['customTag'];
    
    // include the Kaltura API Client Library
    require_once("kcl_php5/KalturaClient.php");
  
    //define constants in ksu-settings.php
    include "ksu-settings.php";

    //define session variables
    $partnerUserID          = 'openvideoconference ADMIN';
  
    //construct Kaltura objects for session initiation
    $config           = new KalturaConfiguration(KALTURA_PARTNER_ID);
    $client           = new KalturaClient($config);
    $ks               = $client->session->start(KALTURA_PARTNER_WEB_SERVICE_ADMIN_SECRET, KALTURA_PARTNER_ID, KalturaSessionType::ADMIN);
    if (!isset($ks)) {
      die("Could not establish Kaltura session.session Please verify that you are using valid Kaltura partner credentials.");
    }

    $client->setKs($ks);
  
    //define listing filter veriables
    $pager = new KalturaFilterPager();
    $pager->pageIndex = "1";
    $pager->pageSize = "500";
    $tag = $customTag;
    $filter = new KalturaMediaEntryFilter();
    $entryFilter->statusEqual = KalturaEntryStatus::READY;
    $entryFilter->orderBy = KalturaBaseEntryOrderBy::CREATED_AT_DESC;
    $filter->tagsAdminTagsMultiLikeOr = $tag;
    
    // retrieve the information from Kaltura and construct the RSS
    $entries = $client->media->listAction($filter, $pager);
    if (!$entries)
      {
        $entries = array();
        }
    echo json_encode($entries);
  }
  else
  {
     echo "<p><i>Incomplete form input.</i></p>";
     }
  }
?>
