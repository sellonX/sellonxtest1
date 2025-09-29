// Browse Page JavaScript for SellonX

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize browse page functionality
    initBrowsePage();
    loadBrowseListings();
    initCategoryInteraction();
    initFilterControls();
});

// Initialize browse page
function initBrowsePage() {
    // Get URL parameters to set initial filters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    // If category is specified, highlight it
    if (category) {
        const categoryItems = document.querySelectorAll('.category-item');
        categoryItems.forEach(item => {
            if (item.textContent.trim().toLowerCase().includes(category.toLowerCase())) {
                item.style.backgroundColor = 'rgba(21, 63, 122, 0.1)';
                item.style.color = 'var(--primary-color)';
                item.style.fontWeight = '600';
                
                // Show subcategories if any
                const subcategories = item.nextElementSibling;
                if (subcategories && subcategories.classList.contains('subcategory-list')) {
                    subcategories.style.display = 'block';
                }
            }
        });
    }
}

// Initialize category interaction
function initCategoryInteraction() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle subcategories
            const parent = this.parentElement;
            const subcategories = parent.querySelector('.subcategory-list');
            
            if (subcategories) {
                if (subcategories.style.display === 'block') {
                    subcategories.style.display = 'none';
                } else {
                    subcategories.style.display = 'block';
                }
            }
            
            // Update listings based on selected category
            const categoryName = this.textContent.trim();
            console.log(`Selected category: ${categoryName}`);
            
            // In a real application, this would filter listings by category
            // For now, we'll just log the selection
        });
    });
    
    // Handle subcategory clicks
    const subcategoryLinks = document.querySelectorAll('.subcategory-list a');
    subcategoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const subcategoryName = this.textContent.trim();
            console.log(`Selected subcategory: ${subcategoryName}`);
            
            // In a real application, this would filter listings by subcategory
            // For now, we'll just log the selection
        });
    });
}

// Initialize filter controls
function initFilterControls() {
    // Sort dropdown
    const sortSelect = document.getElementById('sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            console.log(`Sorting by: ${sortValue}`);
            
            // In a real application, this would sort the listings
            // For now, we'll just log the sort value
        });
    }
    
    // Location checkboxes
    const locationCheckboxes = document.querySelectorAll('.location-filter input[type="checkbox"]');
    locationCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const locations = [];
            locationCheckboxes.forEach(cb => {
                if (cb.checked) {
                    locations.push(cb.id.replace('loc', ''));
                }
            });
            
            console.log(`Selected locations: ${locations.join(', ')}`);
            
            // In a real application, this would filter listings by location
            // For now, we'll just log the selected locations
        });
    });
    
    // Pagination
    const paginationLinks = document.querySelectorAll('.pagination a');
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            paginationLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get page number
            const page = this.textContent.trim();
            console.log(`Navigating to page: ${page}`);
            
            // In a real application, this would load the next page of listings
            // For now, we'll just log the page number
        });
    });
}

// Load browse listings
function loadBrowseListings() {
    const browseListings = document.getElementById('browseListings');
    if (!browseListings) return;
    
    // Combine featured and regular listings for browse page
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
        },
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
        },
        {
            image: 'images/listing11.jpg',
            title: 'MacBook Pro M2 - 16GB RAM',
            price: 'रू 210,000',
            location: 'Janakpur',
            date: '4 days ago',
            views: 156
        },
        {
            image: 'images/listing12.jpg',
            title: 'Honda City 2022 Model',
            price: 'रू 3,500,000',
            location: 'Birganj',
            date: '1 week ago',
            views: 302
        },
        {
            image: 'images/listing13.jpg',
            title: 'Graphic Designer Needed',
            price: 'रू 35,000/month',
            location: 'Hetauda',
            date: '2 days ago',
            views: 178
        },
        {
            image: 'images/listing14.jpg',
            title: 'L-Shaped Sofa Set',
            price: 'रू 45,000',
            location: 'Birganj',
            date: '3 days ago',
            views: 89
        },
        {
            image: 'images/listing15.jpg',
            title: 'German Shepherd Puppies',
            price: 'रू 15,000',
            location: 'Janakpur',
            date: '1 day ago',
            views: 267
        },
        {
            image: 'images/listing16.jpg',
            title: '1 Acre Land for Sale',
            price: 'रू 5,000,000',
            location: 'Hetauda',
            date: '5 days ago',
            views: 132
        }
    ];
    
    // Create listing cards
    listings.forEach(listing => {
        const listingCard = document.createElement('div');
        listingCard.className = 'listing-card';
        
        let badgeHtml = '';
        if (listing.badge) {
            badgeHtml = `<span class="listing-badge">${listing.badge}</span>`;
        }
        
        listingCard.innerHTML = `
            <div class="listing-img">
                <img src="${listing.image}" alt="${listing.title}">
                ${badgeHtml}
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
        
        browseListings.appendChild(listingCard);
    });
}