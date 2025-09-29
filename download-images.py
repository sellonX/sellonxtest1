import os
import requests
from urllib.parse import urlparse

# Create images directory if it doesn't exist
if not os.path.exists('images'):
    os.makedirs('images')

# List of image URLs and their destination filenames
images = [
    # Background images
    ('https://images.unsplash.com/photo-1556745757-8d76bdb6984b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', 'hero-bg.jpg'),
    ('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', 'page-bg.jpg'),
    ('https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', 'post-ad-bg.jpg'),
    ('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', 'browse-bg.jpg'),
    
    # Sponsored ads
    ('https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'sponsored1.jpg'),
    ('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'sponsored2.jpg'),
    ('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'sponsored3.jpg'),
    
    # Listing images
    ('https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'listing1.jpg'),
    ('https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'listing2.jpg'),
    ('https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'listing3.jpg'),
    ('https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'listing4.jpg'),
    ('https://images.unsplash.com/photo-1558981403-c5f9c76c8933?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'listing5.jpg'),
    ('https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'listing6.jpg'),
    ('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'listing7.jpg'),
    ('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'listing8.jpg'),
    ('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'listing9.jpg'),
    ('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'listing10.jpg'),
    ('https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'listing11.jpg'),
    ('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'listing12.jpg'),
    ('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'listing13.jpg'),
    ('https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'listing14.jpg'),
    ('https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'listing15.jpg'),
    ('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'listing16.jpg'),
]

# Download each image
for url, filename in images:
    try:
        print(f"Downloading {filename}...")
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        with open(os.path.join('images', filename), 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")

print("All downloads completed!")