// Carousel JavaScript for SellonX

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousels
    initSponsoredAdsCarousel();
});

// Initialize sponsored ads carousel
function initSponsoredAdsCarousel() {
    const carousel = document.getElementById('sponsoredAdsCarousel');
    const prevBtn = document.getElementById('sponsoredPrev');
    const nextBtn = document.getElementById('sponsoredNext');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    let items = carousel.querySelectorAll('.carousel-item');
    
    // If no items, exit
    if (items.length === 0) return;
    
    // Set up auto-rotation
    let autoRotateInterval;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Handle index bounds
        if (index < 0) index = items.length - 1;
        if (index >= items.length) index = 0;
        
        currentIndex = index;
        
        // Calculate translation amount
        const translateX = -currentIndex * 100;
        
        // Apply translation to all items
        items.forEach(item => {
            item.style.transform = `translateX(${translateX}%)`;
        });
    }
    
    // Show first slide
    showSlide(0);
    
    // Set up event listeners for controls
    prevBtn.addEventListener('click', function() {
        showSlide(currentIndex - 1);
        resetAutoRotate();
    });
    
    nextBtn.addEventListener('click', function() {
        showSlide(currentIndex + 1);
        resetAutoRotate();
    });
    
    // Function to start auto-rotation
    function startAutoRotate() {
        autoRotateInterval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 5000); // Rotate every 5 seconds
    }
    
    // Function to reset auto-rotation
    function resetAutoRotate() {
        clearInterval(autoRotateInterval);
        startAutoRotate();
    }
    
    // Start auto-rotation
    startAutoRotate();
    
    // Pause auto-rotation when hovering over carousel
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoRotateInterval);
    });
    
    // Resume auto-rotation when mouse leaves carousel
    carousel.addEventListener('mouseleave', () => {
        startAutoRotate();
    });
    
    // Handle touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoRotateInterval);
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoRotate();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for a swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left, show next slide
            showSlide(currentIndex + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right, show previous slide
            showSlide(currentIndex - 1);
        }
    }
}