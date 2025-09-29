// Main JavaScript file for SellonX

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initModals();
    loadMockData();
    
    // Update todo.md status
    updateTodoStatus();
});

// Initialize modal functionality
function initModals() {
    // Get all modals
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Login button opens auth modal
    const loginBtn = document.getElementById('loginBtn');
    const authModal = document.getElementById('authModal');
    
    if (loginBtn && authModal) {
        loginBtn.addEventListener('click', function() {
            authModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    }
    
    // Post Ad buttons
    const postAdBtns = document.querySelectorAll('#postAdBtn, #postAdBtnBottom');
    const postAdModal = document.getElementById('postAdModal');
    const goToLoginBtn = document.getElementById('goToLoginBtn');
    
    postAdBtns.forEach(btn => {
        if (btn && postAdModal) {
            btn.addEventListener('click', function() {
                // Check if user is logged in (for now, always show login required)
                postAdModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        }
    });
    
    // Go to login from post ad modal
    if (goToLoginBtn && authModal && postAdModal) {
        goToLoginBtn.addEventListener('click', function() {
            postAdModal.style.display = 'none';
            authModal.style.display = 'block';
        });
    }
    
    // Close buttons for all modals
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });
}

// Load mock data for demonstration
function loadMockData() {
    // Load sponsored ads
    loadSponsoredAds();
    
    // Load featured listings
    loadFeaturedListings();
    
    // Load recent listings
    loadRecentListings();
}

// Load sponsored ads data
function loadSponsoredAds() {
    const sponsoredAdsCarousel = document.getElementById('sponsoredAdsCarousel');
    if (!sponsoredAdsCarousel) return;
    
    const sponsoredAds = [
        {
            image: 'images/sponsored1.jpg',
            title: 'Premium Smartphone Sale',
            description: 'Get up to 30% off on the latest smartphones',
            link: '#'
        },
        {
            image: 'images/sponsored2.jpg',
            title: 'Real Estate Open House',
            description: 'Luxury apartments available in prime locations',
            link: '#'
        },
        {
            image: 'images/sponsored3.jpg',
            title: 'Job Fair 2025',
            description: 'Find your dream job at the biggest job fair in Birganj',
            link: '#'
        }
    ];
    
    // Create carousel items
    sponsoredAds.forEach(ad => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        
        carouselItem.innerHTML = `
            <img src="${ad.image}" alt="${ad.title}">
            <div class="carousel-item-content">
                <h3>${ad.title}</h3>
                <p>${ad.description}</p>
            </div>
        `;
        
        sponsoredAdsCarousel.appendChild(carouselItem);
    });
}

// Load featured listings
function loadFeaturedListings() {
    const featuredListings = document.getElementById('featuredListings');
    if (!featuredListings) return;
    
    const listings = [
        {
            image: 'images/listing1.jpg',
            title: 'iPhone 14 Pro Max - Like New',
            price: 'रू 120,000',
            location: 'Birganj',
            badge: 'Featured',
            date: '2 days ago',
            views: 245
        },
        {
            image: 'images/listing2.jpg',
            title: '3 BHK Apartment for Rent',
            price: 'रू 25,000/month',
            location: 'Hetauda',
            badge: 'Featured',
            date: '1 week ago',
            views: 187
        },
        {
            image: 'images/listing3.jpg',
            title: 'Dell XPS 15 - i9, 32GB RAM',
            price: 'रू 175,000',
            location: 'Janakpur',
            badge: 'Featured',
            date: '3 days ago',
            views: 320
        },
        {
            image: 'images/listing4.jpg',
            title: 'Sony PlayStation 5 with 2 Controllers',
            price: 'रू 65,000',
            location: 'Birganj',
            badge: 'Featured',
            date: '1 day ago',
            views: 198
        }
    ];
    
    // Create listing cards
    listings.forEach(listing => {
        const listingCard = document.createElement('div');
        listingCard.className = 'listing-card';
        
        listingCard.innerHTML = `
            <div class="listing-img">
                <img src="${listing.image}" alt="${listing.title}">
                <span class="listing-badge">${listing.badge}</span>
            </div>
            <div class="listing-content">
                <h3 class="listing-title">${listing.title}</h3>
                <div class="listing-price">${listing.price}</div>
                <div class="listing-location">
                    <i class="fas fa-map-marker-alt"></i> ${listing.location}
                </div>
                <div class="listing-meta">
                    <span><i class="far fa-clock"></i> ${listing.date}</span>
                    <span><i class="far fa-eye"></i> ${listing.views} views</span>
                </div>
            </div>
        `;
        
        featuredListings.appendChild(listingCard);
    });
}

// Load recent listings
function loadRecentListings() {
    const recentListings = document.getElementById('recentListings');
    if (!recentListings) return;
    
    const listings = [
        {
            image: 'images/listing5.jpg',
            title: 'Royal Enfield Classic 350',
            price: 'रू 450,000',
            location: 'Birganj',
            date: '12 hours ago',
            views: 78
        },
        {
            image: 'images/listing6.jpg',
            title: 'Samsung 55" 4K Smart TV',
            price: 'रू 85,000',
            location: 'Hetauda',
            date: '1 day ago',
            views: 124
        },
        {
            image: 'images/listing7.jpg',
            title: 'Wooden Dining Table Set',
            price: 'रू 35,000',
            location: 'Janakpur',
            date: '2 days ago',
            views: 96
        },
        {
            image: 'images/listing8.jpg',
            title: 'Accounting Job - Full Time',
            price: 'रू 30,000/month',
            location: 'Birganj',
            date: '3 hours ago',
            views: 215
        },
        {
            image: 'images/listing9.jpg',
            title: 'Canon EOS 5D Mark IV',
            price: 'रू 195,000',
            location: 'Hetauda',
            date: '5 hours ago',
            views: 67
        },
        {
            image: 'images/listing10.jpg',
            title: 'Commercial Space for Rent',
            price: 'रू 45,000/month',
            location: 'Birganj',
            date: '1 day ago',
            views: 143
        }
    ];
    
    // Create listing cards
    listings.forEach(listing => {
        const listingCard = document.createElement('div');
        listingCard.className = 'listing-card';
        
        listingCard.innerHTML = `
            <div class="listing-img">
                <img src="${listing.image}" alt="${listing.title}">
            </div>
            <div class="listing-content">
                <h3 class="listing-title">${listing.title}</h3>
                <div class="listing-price">${listing.price}</div>
                <div class="listing-location">
                    <i class="fas fa-map-marker-alt"></i> ${listing.location}
                </div>
                <div class="listing-meta">
                    <span><i class="far fa-clock"></i> ${listing.date}</span>
                    <span><i class="far fa-eye"></i> ${listing.views} views</span>
                </div>
            </div>
        `;
        
        recentListings.appendChild(listingCard);
    });
}

// Update todo.md status
function updateTodoStatus() {
    console.log("Project setup in progress...");
}