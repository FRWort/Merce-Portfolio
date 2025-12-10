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


$(".menu").click(function(){
  $(this).parent().toggleClass("close");
});
// ---------------------------------------------------------

$(document).ready(function () {

  scroll.update(); // Fix for last section getting cutted

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
    // Only add hover functionality on screens wider than 900px (desktop/tablet landscape)
    if (window.matchMedia('(min-width: 1080px)').matches) {
      // Show on hover
      img.hover(
        function () {
          overlay.show();
        },
        function () {
          overlay.hide();
        }
      );
    }
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
      nav: false,
      responsive: {
        0: {
          items: 1,
          nav: false
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

/* BUTTONS */

document.querySelector('.violet-button').addEventListener('click', function () {
  window.location.href = 'https://api.whatsapp.com/send?phone=5492645455759&text=%F0%9F%96%90%EF%B8%8F%20Hola!%20Te%20hablo%20a%20trav%C3%A9s%20de%20tu%20website!%20Tengo%20una%20consulta';
});

document.querySelector('.murals-button').addEventListener('click', function () {
  window.location.href = 'murales.html';
});

if (window.matchMedia('(min-width: 1080px)').matches) {
  document.querySelector('.paints').addEventListener('click', function () {
    window.location.href = 'pinturas.html';
  });
}

document.querySelector('.paintings-button').addEventListener('click', function () {
  window.location.href = 'pinturas.html';
});
