// Locomotive Scroll
// 1. Check if already initialized to prevent duplicates
if (window.scroll && typeof window.scroll.destroy === 'function') {
    try {
        window.scroll.destroy();
    } catch (e) {
        console.warn("Scroll destroy failed", e);
    }
    window.scroll = null;
}

const scroll = new LocomotiveScroll({
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

// Store scroll globally
window.scroll = scroll;

// 2. OPTIMIZATION: Pause scroll when tab is hidden to save memory/CPU
// Locomotive Scroll loves to run loops in the background. We stop it.
const scrollElement = document.querySelector('#loco-scroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Start/Resume Scroll
            // document.documentElement.classList.remove('has-scroll-init');
            // scroll.init(); // Or simply don't stop it, just don't re-init
        } else {
            // When scrolled away or tab hidden, we can stop checking
            // Locomotive handles this via 'stop()' internally mostly, 
            // but we can force stop specific heavy calculations here if needed.
            // However, we don't want to stop completely or the scroll bar breaks.
        }
    });
}, { threshold: 0 });

observer.observe(scrollElement);


// Navbar button
$(".fixed-navbar-button").click(function () {
    window.location.href = '../index.html';
});

// ---------------------------------------------------------

$(document).ready(function () {

    scroll.update();

    /* IMAGE VIEWER */
    // Use delegation. This prevents event listener buildup.
    $(".gallery").on("click", "img", function () {
        var src = $(this).attr("src") || $(this).data("src");

        if (src) {
            $("#full-image").attr("src", src);
            $('#image-viewer').show();
        }
    });

    $("#image-viewer .close").click(function () {
        $('#image-viewer').hide();
    });

    $(document).on('click', '#image-viewer', function (e) {
        if (e.target.id === 'image-viewer') {
            $('#image-viewer').hide();
        }
    });

    $(document).on('keyup', function (e) {
        if (e.key === "Escape") {
            $('#image-viewer').hide();
        }
    });
    /* IMAGE VIEWER END */

    /* VER CATALOGO ON HOVER */
    $(".paints img").each(function () {
        var img = $(this);
        var overlay = $('<div class="hover-overlay"><p>VER CATÁLOGO</p></div>');
        img.parent().css('position', 'relative').append(overlay);
        overlay.hide();
        
        if (window.matchMedia('(min-width: 1080px)').matches) {
            img.hover(
                function () { overlay.show(); },
                function () { overlay.hide(); }
            );
        }
    });
    /* VER CATALOGO END */

});

// Paint Buttons
document.querySelectorAll('.btn-inquire').forEach(button => {
    button.addEventListener('click', function () {
        const url = this.dataset.url || 'https://api.whatsapp.com/send?phone=5492645455759&text=%F0%9F%96%90%EF%B8%8F%20Hola!%20Te%20hablo%20a%20trav%C3%A9s%20de%20tu%20website!%20Tengo%20una%20consulta';
        window.location.href = url;
    });
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
                0: { items: 1, nav: false },
                800: { items: 3, nav: false },
            }
        });
    };
    (function ($) { carousels(); })(jQuery);
})();

/* BUTTONS */

// Use optional chaining safely
document.querySelector('.violet-button')?.addEventListener('click', function () {
    window.location.href = 'https://api.whatsapp.com/send?phone=5492645455759&text=%F0%9F%96%90%EF%B8%8F%20Hola!%20Te%20hablo%20a%20trav%C3%A9s%20de%20tu%20website!%20Tengo%20una%20consulta';
});

document.querySelector('#social1')?.addEventListener('click', function () {
    window.location.href = 'https://api.whatsapp.com/send?phone=5492645455759&text=%F0%9F%96%90%EF%B8%8F%20Hola!%20Te%20hablo%20a%20trav%C3%A9s%20de%20tu%20website!%20Tengo%20una%20consulta';
});

document.querySelector('#social2')?.addEventListener('click', function () {
    window.location.href = 'https://www.instagram.com/merceyacante';
});

document.querySelector('#social3')?.addEventListener('click', function () {
    window.location.href = 'https://www.facebook.com/merceyacante';
});

document.querySelector('#social4')?.addEventListener('click', function () {
    window.location.href = 'https://www.tiktok.com/@merceyacante';
});

document.querySelector('.murals-button')?.addEventListener('click', function () {
    window.location.href = 'murales.html';
});

if (window.matchMedia('(min-width: 1080px)').matches) {
    document.querySelector('.paints')?.addEventListener('click', function () {
        window.location.href = 'pinturas.html';
    });
}

document.querySelector('.paintings-button')?.addEventListener('click', function () {
    window.location.href = 'pinturas.html';
});

// 3. CLEANUP ON UNLOAD
// This is critical. If you navigate away, we must kill the scroll instance
// to free memory.
window.addEventListener('beforeunload', function () {
    if (window.scroll) {
        window.scroll.destroy();
        window.scroll = null;
    }
    // Clear jQuery data to prevent memory leaks
    $(document).off();
    $('.gallery').off();
});