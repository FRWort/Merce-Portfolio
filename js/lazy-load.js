/* js/lazy-load.js */

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Select only images that have NOT been loaded yet
    const lazyImages = document.querySelectorAll('img.lazy-loading');

    if (!lazyImages.length) return;

    // 2. Use IntersectionObserver
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');

                if (src) {
                    // Switch to real source
                    img.src = src;
                    
                    // Visual update
                    img.classList.remove('lazy-loading');
                    img.classList.add('lazy-loaded');

                    // Stop watching this specific image (SAVES RAM)
                    observer.unobserve(img);
                    
                    // Remove data attribute to clean up DOM
                    img.removeAttribute('data-src');
                }
            }
        });
    }, {
        root: null,
        rootMargin: '200px', // Load 200px before view (buffer helps smoothness)
        threshold: 0
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // 3. Optional: Stop observing everything if the user leaves the page
    // This helps browser memory when switching tabs
    window.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Do nothing specific here, the browser handles freezing the loop.
            // But keep the observer alive for when they return.
        }
    });
});