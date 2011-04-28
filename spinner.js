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

var spinner;

  //spinner = new Spinner('content', spinOpts);
  //setTimeout('spinner.remove()', 3000);
//window.onload = function(){ spinner = new Spinner('gallery', spinOpts);};
