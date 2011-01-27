// setup kaltura javascript client 

//var kUploadConfiguration,
//    kClient,
//    kAddEntryId;
//kUploadConfiguration = new KalturaConfiguration(kPartnerId), // set in the php file
//kClient = new KalturaClient(kUploadConfiguration);
//kClient.setKs(ks); //set in the php file


function hideSpinner() {
  $("#flash").show();
  }

function showSpinner() {
  $("#flash").hide();
  }

function saveDescription(kEntryId,description,name) {
    //alert(description)
   var data = "name="+name+"&kEntryId="+kEntryId+"&description="+description;
     console.log(data);
  $.ajax({type:"POST", 
          url:"http://www.openvideoconference.org/user_generated_gallery/db.php",
          async:false,
          data: "name="+name+"&kEntryId="+kEntryId+"&description="+description, 
          success: function(msg){console.log("saved description to entryID: "+msg)}})
		flashAdvice("Thank you for your upload.\n You may now close this dialog.");
}

  var app;
	var delegate = {};
  var title;
  var tags;
  var description;
  var name;
  var kAddEntryId;


	//KUploader callbacks
	delegate.readyHandler = function()
	{
		app = document.getElementById("uploader");
    uploaderIsReady();
	}

	delegate.selectHandler = function()
	{
		console.log("selectHandler()");
		console.log(app.getTotalSize());
    upload();
    $('#browse-button').attr("disabled", "true");
    $('#progress-bar').progressbar({ value: 0 });
	}

	delegate.singleUploadCompleteHandler = function(args)
	{
		console.log("singleUploadCompleteHandler", args[0].title);
	}

	delegate.allUploadsCompleteHandler = function()
	{
		console.log("title: " + title + " & tags: " + tags);
    console

   if (title && tags && description) {
   //if (title && tags) {
      console.log("we have the metadata");
      setTitle(title);
      setTagsFromForm();
      console.log("we will save");
      addEntries();
      }
    else {
      flashAdvice("please describe your video");
      $("#save-button").hide();
      $("#add-button").show();
      }
	}

	delegate.entriesAddedHandler = function(entries)
	{
    console.log(entries[0].entryId);
    kAddEntryId = (entries[0].entryId);
    //while kAdd
    flashAdvice("please wait while your video is saved");
    setTimeout("saveDescription(kAddEntryId, description, name)",5000);
	}

	delegate.progressHandler = function(args)
	{ 
    var uploadProgress = ( args[0] / args[1] ) * 100;
    $("#progress-bar").progressbar( "option", "value", uploadProgress );
//		console.log(args[2].title + ": " + args[0] + " / " + args[1]);
	}

	delegate.uiConfErrorHandler = function()
	{
		console.log("ui conf loading error");
	}

	//KUplaoder API calls

	function upload()
	{
		app.upload();
	}

	function setTags(tags, startIndex, endIndex)
	{
		app.setTags(tags, startIndex, endIndex);
	}

	function addTags(tags, startIndex, endIndex)
	{
		app.addTags(tags, startIndex, endIndex);
	}
	function setTitle(title, startIndex, endIndex)
	{
		app.setTitle(title, startIndex, endIndex);
	} 

	function getFiles()
	{
		var files = app.getFiles();
		console.log(files[0].title);
	}

	function addEntries()
	{
		app.addEntries();
	}

	function stopUploads()
	{
		app.stopUploads();
	}

	function setMaxUploads(value)
	{
		app.setMaxUploads(value);
	}

	function browse()
	{
		app.browse();
	}

	function setPartnerData(value)
	{
		app.setPartnerData(value);
	}

	//End of KUploder API calls
	//--------------------------------------------------------------------

	function setMediaType(mediaType)
	{
//		var mediaType = mediaTypeInput.value;
		app.setMediaType(mediaType);
	}

	function addTagsFromForm()
	{
		//var tags = document.getElementById("tagsInput").value.split(",");
	  var tags = "ovctvugc, 2010, " + document.getElementById("tagsInput").value
    tags = tags.split(",");	
    //var startIndex //= parseInt(tagsStartIndex.value);
		//var endIndex //= parseInt(tagsEndIndex.value);
		addTags(tags, startIndex, endIndex);
	}

	function setTagsFromForm()
	{
		var tags = "ovctvugc, 2010, " + document.getElementById("tagsInput").value
    tags = tags.split(",");
		//var startIndex = parseInt(tagsStartIndex.value);
		//var endIndex = parseInt(tagsEndIndex.value);
		setTags(tags, 0, 0);
	}

	function setTitleFromForm()
	{
		//var startIndex //= parseInt(titleStartIndex.value);
		//var endIndex //= parseInt(titleEndIndex.value);
		setTitle(titleInput.value, 0, 0);
	}

  function saveTags(tags)
	{
    console.log(tags);
		var tagsArray = tags.split(",");
		//var startIndex = parseInt(tagsStartIndex.value);
		//var endIndex = parseInt(tagsEndIndex.value);
		setTags(tagsArray, 0, 0);
	}


  function saveTitle(title)
	{
		//var startIndex //= parseInt(titleStartIndex.value);
		//var endIndex //= parseInt(titleEndIndex.value);
		setTitle(title, 0, 0);
	}


	function removeFilesFromForm()
	{
		var startIndex = parseInt(removeStartIndex.value);
		var endIndex = parseInt(removeEndIndex.value);
		app.removeFiles(startIndex, endIndex)
		console.log(app.getTotalSize());
	}

	function setGroupId(value)
	{
		app.setGroupId(value);
	}

	function setPermissions(value)
	{
		app.setPermissions(value);
	}

	function setSiteUrl(value)
	{
		app.setSiteUrl(value);
	}

	function setScreenName(value)
	{
		app.setScreenName(value);
	}



	var tagsInput;
	var tagsStartIndex;
	var tagsEndIndex;

	var titleInput;
	var titleStartIndex;
	var titleEndIndex;

	var removeStartIndex;
	var removeEndIndex;
	var maxUploadsInput;

	var partnerDataInput;

	var groupId;
	var permissions;
	var screenName;
	var siteUrl;

  var ksuparams = {
				allowScriptAccess: "always",
				allowNetworking: "all",
				wmode: "transparent"

			};
var ksuattributes  = {
				id: "uploader",
				name: "KUpload"
			};
	$(function()
	{

      $("#add-button").hide();
		  
    tagsInput = document.getElementById("tagsInput");
		tagsStartIndex = 0; //document.getElementById("tagsStartIndex");
		tagsEndIndex = 0; //document.getElementById("tagsEndIndex");

		titleInput = document.getElementById("titleInput");
		titleStartIndex = 0; //document.getElementById("titleStartIndex");
		titleEndIndex = 0; //document.getElementById("titleEndIndex");

//		removeStartIndex = document.getElementById("removeStartIndex");;
//		removeEndIndex = document.getElementById("removeEndIndex");

//		maxUploadsInput = document.getElementById("maxUploadsInput");
//		partnerDataInput = document.getElementById("partnerDataInput");

//		groupId = document.getElementById("groupId");
//		permissions = document.getElementById("permissions");
//		screenName = document.getElementById("screenName");
//		siteUrl = document.getElementById("siteUrl");
	});




function uploaderIsReady() {
  console.log(app);
	setMediaType("video");
  }

function saveEntry() {

  title = titleInput.value;
  name = title;
  tags = tagsInput.value;
  description = $('#descriptionInput')[0].value;
  console.log(tags);
  saveTitle(title);
  saveTags(tags);
  console.log("titled: " + title + " & tagged: + tags");
  $('#save-button').attr("disabled", "true");
  }

function titleAndSaveEntry() {

  saveEntry();
  setTagsFromForm();
  addEntries();
  }

function flashAdvice( advice ) {
  $("#flash").hide();
  $("#flash").html("<p>" + advice + "</p>");
  $("#flash").show();
  }


