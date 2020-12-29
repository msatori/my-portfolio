// ------------- IMPORTS------------- //


// ------------- VARIABLES  FOR SCROLLING------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive) 
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = $(".background").length;

// ------------- VARIABLES  FOR CARDS------------- //

var card = document.querySelector(".card");
var cardImage = document.querySelector(".card-img");
var cardTitle= document.querySelector(".card-title");

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScroll(evt) {
  if (isFirefox) {
    //Set delta for Firefox
    delta = evt.detail * (-120);
  } else if (isIe) {
    //Set delta for IE
    delta = -evt.deltaY;
  } else {
    //Set delta for all other browsers
    delta = evt.wheelDelta;
  }

  if (ticking != true) {
    if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
      }
      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
}

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

// ------------- SLIDE MOTION ------------- //
function nextItem() {
  var $previousSlide = $(".background").eq(currentSlideNumber - 1);
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
}

function previousItem() {
  var $currentSlide = $(".background").eq(currentSlideNumber);
  $currentSlide.removeClass("down-scroll").addClass("up-scroll");
}



function enterCard() {

  anime.remove(cardImage);
  anime({
    targets: cardImage,
    easing: 'linear',
    translateY: '-65px',
    scaleX: '1.5',
    scaleY: '1.3',
    duration: 200
  });

  anime.remove(cardTitle);
  anime({
    targets: cardTitle,
    translateX: '-55',
    color: [
      {value: '#fff'}
    ],
    easing: 'linear',
    duration: 200,
    complete: function() {
      card5.classList.add('active');
    }
  });

}

function leaveCard() {

  anime.remove(cardImage);
  anime({
    targets: cardImage,
    translateY: '0',
    scaleX: '1',
    scaleY: '1',
    elasticity: 100
  });

  anime.remove(cardTitle);
  anime({
    targets: cardTitle,
    translateX: '0',
    color: [
      {value: '#000'}
    ],
    elasticity: 100
  });

  card5.classList.remove('active');

}


card5.addEventListener('mouseenter', enterCard, false);
card5.addEventListener('mouseleave', leaveCard. false);