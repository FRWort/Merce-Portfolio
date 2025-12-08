// Locomotive Scroll
const scroll = new LocomotiveScroll ({
    el: document.querySelector('#loco-scroll'),
    inertia: 0,
    smooth: true,
    getDirection: true,
    smartphone: {
      smooth: true,
      inertia: 0,
      getDirection: true,
    },
    tablet: {
      smooth: true,
      inertia: 0,
      getDirection: true,
    },
});

// Useful function for sticky navbars with Locomotive scroll
const navBar = document.querySelector("header");

scroll.on("scroll", (position) => {
    
    if (position.scroll.y > 500) {
      navBar.classList.add("secondary-nav");
    } else {
      navBar.classList.remove("secondary-nav");

    }
});

$(".menu").click(function(){
  $(this).parent().toggleClass("close");
});
// ---------------------------------------------------------

$(document).ready(function () {

  /* IMAGE VIEWER */
  // Fixed selector: Combine with comma inside the string
  $(".gallery img").click(function () {
    // Double click action: Show the full image
    $("#full-image").attr("src", $(this).attr("src"));
    $('#image-viewer').show();
  });
  $("#image-viewer .close").click(function () {
    $('#image-viewer').hide();
  });

  $(document).on('click', '#image-viewer', function (e) {
    if (e.target.id === 'image-viewer') {
      $('#image-viewer .close').trigger('click');
    }
  });

  // Soporte para ESC
  $(document).on('keyup', function (e) {
    if (e.key === "Escape") {
      $('#image-viewer .close').trigger('click');
    }
  });
  /* IMAGE VIEWER END */

  /* VER CATALOGO ON HOVER */
  $(".paints img").each(function () {
    var img = $(this);
    var overlay = $('<div class="hover-overlay"><p>VER CATÁLOGO</p></div>');

    // Append overlay to the image's parent (e.g., a container div)
    img.parent().css('position', 'relative').append(overlay);

    // Hide overlay initially
    overlay.hide();

    // Show on hover
    img.hover(
      function () {
        overlay.show();
      },
      function () {
        overlay.hide();
      }
    );
  });
  /* VER CATALOGO END */

});

(function () {
  "use strict";

  var carousels = function () {
    $(".owl-carousel1").owlCarousel({
      loop: true,
      center: true,
      margin: 0,
      autoplay: true,
      responsiveClass: true,
      nav: true,
      responsive: {
        0: {
          items: 1,
          nav: true
        },
        800: {
          items: 3,
          nav: false
        },
      }
    });
  };

  (function ($) {
    carousels();
  })(jQuery);
})();

document.querySelector('.violet-button').addEventListener('click', function () {
  window.location.href = 'https://api.whatsapp.com/send?phone=5492645455759&text=%F0%9F%96%90%EF%B8%8F%20Hola!%20Te%20hablo%20a%20trav%C3%A9s%20de%20tu%20website!%20Tengo%20una%20consulta';
});

document.querySelector('.murals-button').addEventListener('click', function () {
  window.location.href = 'murales.html';
});

document.querySelector('.paints').addEventListener('click', function () {
  window.location.href = 'pinturas.html';
});

/*
// Fixed with https://bobbyhadz.com/blog/javascript-getboundingclientrect-is-not-a-function
function isElementVisible(el) {
  var rect     = el.getBoundingClientRect(),
      vWidth   = window.innerWidth || document.documentElement.clientWidth,
      vHeight  = window.innerHeight || document.documentElement.clientHeight,
      efp      = function (x, y) { return document.elementFromPoint(x, y) };     

  // Return false if it's not in the viewport
  if (rect.right < 0 || rect.bottom < 0 
          || rect.left > vWidth || rect.top > vHeight)
      return false;

  // Return true if any of its four corners are visible
  return (
        el.contains(efp(rect.left,  rect.top))
    ||  el.contains(efp(rect.right, rect.top))
    ||  el.contains(efp(rect.right, rect.bottom))
    ||  el.contains(efp(rect.left,  rect.bottom))
  );
}

const eledetected = document.getElementsByClassName("detect");

// Change on scroll -> Search for other function (when not scrolled, not detected) DOMContentLoaded??
scroll.on('scroll', (obj) => {

  var elements = document.getElementsByClassName("detect");
  for (i = 0; i < elements.length; i++) {
    if (isElementVisible(elements[i])) {
      elements[i].classList.add("detected");
      console.log("Added");
    } else {
      elements[i].classList.remove("detected");
      console.log("Removed");
    }
  }
  
});
*/