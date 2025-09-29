// Listings JavaScript for SellonX

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize listings functionality
    initListingsInteraction();
});

// Initialize listings interaction
function initListingsInteraction() {
    // Add click event to all listing cards
    const listingCards = document.querySelectorAll('.listing-card');
    
    listingCards.forEach(card => {
        card.addEventListener('click', function() {
            // Get listing title
            const title = this.querySelector('.listing-title').textContent;
            
            // In a real application, we would redirect to the listing detail page
            // For now, we'll just log the click
            console.log(`Clicked on listing: ${title}`);
            
            // Simulate redirection to listing detail page
            // window.location.href = `listing-detail.html?title=${encodeURIComponent(title)}`;
            
            // For demo purposes, show a message
            showListingMessage(`You clicked on "${title}". In the full application, this would take you to the listing detail page.`);
        });
    });
}

// Show listing message
function showListingMessage(message) {
    // Check if message container exists, if not create it
    let messageContainer = document.querySelector('.listing-message-container');
    
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.className = 'listing-message-container';
        document.body.appendChild(messageContainer);
        
        // Style the message container
        messageContainer.style.position = 'fixed';
        messageContainer.style.bottom = '20px';
        messageContainer.style.left = '50%';
        messageContainer.style.transform = 'translateX(-50%)';
        messageContainer.style.zIndex = '2000';
        messageContainer.style.width = '80%';
        messageContainer.style.maxWidth = '500px';
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = 'listing-message';
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.padding = '15px 20px';
    messageElement.style.backgroundColor = 'rgba(21, 63, 122, 0.9)';
    messageElement.style.color = 'white';
    messageElement.style.borderRadius = '4px';
    messageElement.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    messageElement.style.animation = 'fadeInUp 0.3s ease';
    messageElement.style.textAlign = 'center';
    
    // Add close button
    const closeButton = document.createElement('span');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '5px';
    closeButton.style.right = '10px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '20px';
    
    closeButton.addEventListener('click', function() {
        messageContainer.removeChild(messageElement);
    });
    
    messageElement.appendChild(closeButton);
    messageElement.style.position = 'relative';
    
    // Add to container
    messageContainer.appendChild(messageElement);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode === messageContainer) {
            messageElement.style.animation = 'fadeOutDown 0.3s ease';
            setTimeout(() => {
                if (messageElement.parentNode === messageContainer) {
                    messageContainer.removeChild(messageElement);
                }
            }, 300);
        }
    }, 5000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOutDown {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(20px); }
}
`;
document.head.appendChild(style);

// Function to filter listings (to be implemented in browse.html)
function filterListings(category, location, sortBy) {
    console.log(`Filtering listings: Category=${category}, Location=${location}, SortBy=${sortBy}`);
    
    // In a real application, this would filter the listings based on the parameters
    // For now, we'll just log the filter parameters
}

// Function to search listings (to be implemented)
function searchListings(query, location) {
    console.log(`Searching listings: Query=${query}, Location=${location}`);
    
    // In a real application, this would search the listings based on the query and location
    // For now, we'll just log the search parameters
}