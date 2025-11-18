// Add lazy loading to all images for better performance
document.addEventListener('DOMContentLoaded', function() {
  // Get all images on the page
  const images = document.querySelectorAll('img');

  images.forEach(function(img) {
    // Skip if already has loading attribute
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }

    // Skip if already has decoding attribute
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
  });
});
