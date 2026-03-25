"/**
 * Lazy Loading System for Mural Gallery
 * Uses Intersection Observer API for efficient image loading
 */

class LazyLoader {
  constructor(options = {}) {
    this.options = {
      root: null,
      rootMargin: '50px', // Pre-load images 50px before they enter viewport
      threshold: 0.01,
      loadFirstN: 6, // Load first 6 images immediately
      ...options
    };
    
    this.images = [];
    this.loadedCount = 0;
    this.observer = null;
    
    this.init();
  }
  
  init() {
    // Get all images with data-src attribute
    this.images = document.querySelectorAll('img[data-src]');
    
    if (this.images.length === 0) {
      console.log('No images to lazy load');
      return;
    }
    
    console.log(`Initializing lazy loading for ${this.images.length} images`);
    
    // Load first N images immediately (above the fold)
    this.loadFirstImages();
    
    // Set up Intersection Observer for remaining images
    this.setupObserver();
    
    // Observe all images that haven't been loaded yet
    this.observeImages();
  }
  
  loadFirstImages() {
    const firstImages = Array.from(this.images).slice(0, this.options.loadFirstN);
    
    firstImages.forEach(img => {
      this.loadImage(img, true);
    });
    
    console.log(`Loaded first ${firstImages.length} images immediately`);
  }
  
  setupObserver() {
    // Create Intersection Observer
    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          this.loadImage(img);
          observer.unobserve(img); // Stop observing once loaded
        }
      });
    }, this.options);
  }
  
  observeImages() {
    // Start observing images after the first N
    Array.from(this.images).slice(this.options.loadFirstN).forEach(img => {
      this.observer.observe(img);
    });
  }
  
  loadImage(img, isFirstLoad = false) {
    const src = img.getAttribute('data-src');
    
    if (!src || img.classList.contains('lazy-loaded')) {
      return;
    }
    
    // Add loading class for blur effect
    img.classList.add('lazy-loading');
    
    // Create new image to preload
    const tempImg = new Image();
    
    tempImg.onload = () => {
      // Set the actual image source
      img.src = src;
      
      // Remove loading class and add loaded class
      img.classList.remove('lazy-loading');
      img.classList.add('lazy-loaded');
      
      // Remove data-src attribute
      img.removeAttribute('data-src');
      
      this.loadedCount++;
      
      if (!isFirstLoad) {
        console.log(`Lazy loaded image ${this.loadedCount}/${this.images.length}`);
      }
      
      // Trigger Locomotive Scroll update if available
      if (window.scroll && typeof window.scroll.update === 'function') {
        window.scroll.update();
      }
    };
    
    tempImg.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      img.classList.remove('lazy-loading');
      img.classList.add('lazy-error');
    };
    
    // Start loading the image
    tempImg.src = src;
  }
  
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Initialize lazy loading when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.lazyLoader = new LazyLoader();
  });
} else {
  window.lazyLoader = new LazyLoader();
}
"