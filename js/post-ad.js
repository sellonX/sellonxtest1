// Post Ad JavaScript for SellonX

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize post ad functionality
    initPostAdForm();
    initCategorySelection();
    initPhotoUpload();
    initFormValidation();
    initCharCounters();
    updatePreview();
});

// Initialize post ad form
function initPostAdForm() {
    // Get all steps
    const steps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step');
    
    // Get navigation buttons
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const submitButton = document.getElementById('submitAd');
    
    // Add event listeners to next buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get current step
            const currentStep = document.querySelector('.form-step.active');
            const currentStepIndex = Array.from(steps).indexOf(currentStep);
            
            // Validate current step
            if (validateStep(currentStepIndex + 1)) {
                // Hide current step
                currentStep.classList.remove('active');
                
                // Show next step
                steps[currentStepIndex + 1].classList.add('active');
                
                // Update step indicators
                stepIndicators[currentStepIndex].classList.add('completed');
                stepIndicators[currentStepIndex + 1].classList.add('active');
                
                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Update preview if moving to step 4
                if (currentStepIndex + 2 === 4) {
                    updatePreview();
                }
            }
        });
    });
    
    // Add event listeners to prev buttons
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get current step
            const currentStep = document.querySelector('.form-step.active');
            const currentStepIndex = Array.from(steps).indexOf(currentStep);
            
            // Hide current step
            currentStep.classList.remove('active');
            
            // Show previous step
            steps[currentStepIndex - 1].classList.add('active');
            
            // Update step indicators
            stepIndicators[currentStepIndex].classList.remove('active');
            stepIndicators[currentStepIndex - 1].classList.remove('completed');
            stepIndicators[currentStepIndex - 1].classList.add('active');
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Add event listener to submit button
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            // Check if terms are agreed
            const termsAgree = document.getElementById('termsAgree');
            
            if (!termsAgree.checked) {
                showMessage('Please agree to the Terms & Conditions', 'error');
                return;
            }
            
            // Simulate form submission
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            
            setTimeout(() => {
                // Show success modal
                const successModal = document.getElementById('successModal');
                if (successModal) {
                    successModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
                
                // Reset button
                submitButton.disabled = false;
                submitButton.innerHTML = 'Submit Ad';
            }, 2000);
        });
    }
    
    // Close success modal
    const closeModal = document.querySelector('#successModal .close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            document.getElementById('successModal').style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const successModal = document.getElementById('successModal');
        if (event.target === successModal) {
            successModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

// Initialize category selection
function initCategorySelection() {
    const categoryCards = document.querySelectorAll('.category-card');
    const subcategorySelection = document.getElementById('subcategorySelection');
    const subcategorySelect = document.getElementById('subcategorySelect');
    const step1Next = document.getElementById('step1Next');
    
    // Category subcategories mapping
    const subcategories = {
        'mobile': ['Mobile Phones', 'Accessories', 'Tablets'],
        'computers': ['Computers & Laptops', 'Computer Accessories', 'Hard Disks, Printers & Monitors'],
        'cars': ['Cars', 'Commercial Vehicles'],
        'motorcycle': ['Motorcycles', 'Scooters'],
        'bicycle': ['Bicycles', 'Bicycle Accessories'],
        'electronics': ['TVs, Video - Audio', 'Kitchen & Other Appliances', 'Cameras & Lenses', 'Games & Entertainment', 'Fridges', 'ACs', 'Washing Machines'],
        'real-estate': ['For Sale: Houses & Apartments', 'For Rent: Houses & Apartments', 'Lands & Plots', 'For Rent: Shops & Offices', 'For Sale: Shops & Offices', 'PG & Guest Houses'],
        'spare-parts': ['Car Parts', 'Motorcycle Parts', 'Other Parts'],
        'jobs': ['Data entry & Back office', 'Sales & Marketing', 'BPO & Telecaller', 'Driver', 'Office Assistant', 'Delivery & Collection', 'Teacher', 'Cook', 'Receptionist & Front office', 'Operator & Technician', 'IT Engineer & Developer', 'Hotel & Travel Executive', 'Accountant', 'Designer', 'Other Jobs'],
        'furniture': ['Sofa & Dining', 'Beds & Wardrobes', 'Home Decor & Garden', 'Kids Furniture', 'Other Household Items'],
        'fashion': ['Men', 'Women', 'Kids'],
        'pets': ['Pet Food & Accessories', 'Dogs', 'Other Pets'],
        'books-sports': ['Books', 'Gym & Fitness', 'Musical Instruments', 'Sports Equipment', 'Other Hobbies'],
        'services': ['Education & Classes', 'Tours & Travel', 'Electronics Repair & Services', 'Health & Beauty', 'Home Renovation & Repair', 'Land', 'Other Services']
    };
    
    // Add event listeners to category cards
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            categoryCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            this.classList.add('selected');
            
            // Get category
            const category = this.getAttribute('data-category');
            
            // Update subcategory select
            if (subcategorySelect && subcategories[category]) {
                // Clear previous options
                subcategorySelect.innerHTML = '';
                
                // Add default option
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Select a subcategory';
                subcategorySelect.appendChild(defaultOption);
                
                // Add subcategory options
                subcategories[category].forEach(subcategory => {
                    const option = document.createElement('option');
                    option.value = subcategory.toLowerCase().replace(/\s+/g, '-');
                    option.textContent = subcategory;
                    subcategorySelect.appendChild(option);
                });
                
                // Show subcategory selection
                subcategorySelection.classList.add('active');
            }
            
            // Check if next button should be enabled
            checkStep1Completion();
        });
    });
    
    // Add event listener to subcategory select
    if (subcategorySelect) {
        subcategorySelect.addEventListener('change', function() {
            checkStep1Completion();
        });
    }
    
    // Function to check if step 1 is complete
    function checkStep1Completion() {
        const selectedCategory = document.querySelector('.category-card.selected');
        const selectedSubcategory = subcategorySelect.value;
        
        if (selectedCategory && selectedSubcategory) {
            step1Next.disabled = false;
        } else {
            step1Next.disabled = true;
        }
    }
}

// Initialize photo upload
function initPhotoUpload() {
    const photoUpload = document.getElementById('photoUpload');
    const photoPreviewContainer = document.getElementById('photoPreviewContainer');
    
    if (!photoUpload || !photoPreviewContainer) return;
    
    // Add event listener to photo upload
    photoUpload.addEventListener('change', function() {
        // Check if files were selected
        if (this.files.length === 0) return;
        
        // Check if maximum number of photos is reached
        const currentPhotos = photoPreviewContainer.querySelectorAll('.photo-preview').length;
        const maxPhotos = 15;
        
        if (currentPhotos + this.files.length > maxPhotos) {
            showMessage(`You can upload a maximum of ${maxPhotos} photos`, 'error');
            return;
        }
        
        // Process each file
        Array.from(this.files).forEach(file => {
            // Check if file is an image
            if (!file.type.startsWith('image/')) {
                showMessage('Please upload only image files', 'error');
                return;
            }
            
            // Create photo preview
            const photoPreview = document.createElement('div');
            photoPreview.className = 'photo-preview';
            
            // Create image element
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            
            // Create remove button
            const removeButton = document.createElement('div');
            removeButton.className = 'remove-photo';
            removeButton.innerHTML = '<i class="fas fa-times"></i>';
            
            // Add event listener to remove button
            removeButton.addEventListener('click', function() {
                photoPreviewContainer.removeChild(photoPreview);
            });
            
            // Append elements to photo preview
            photoPreview.appendChild(img);
            photoPreview.appendChild(removeButton);
            
            // Append photo preview to container
            photoPreviewContainer.appendChild(photoPreview);
        });
        
        // Reset file input
        this.value = '';
    });
}

// Initialize form validation
function initFormValidation() {
    // Step 2 validation
    const adTitle = document.getElementById('adTitle');
    const adDescription = document.getElementById('adDescription');
    const adPrice = document.getElementById('adPrice');
    const step2Next = document.getElementById('step2Next');
    
    if (adTitle && adDescription && adPrice && step2Next) {
        const validateStep2 = function() {
            const titleValid = adTitle.value.trim().length > 0;
            const descriptionValid = adDescription.value.trim().length > 0;
            const priceValid = adPrice.value.trim().length > 0 && !isNaN(adPrice.value);
            const conditionSelected = document.querySelector('input[name="condition"]:checked') !== null;
            
            step2Next.disabled = !(titleValid && descriptionValid && priceValid && conditionSelected);
        };
        
        adTitle.addEventListener('input', validateStep2);
        adDescription.addEventListener('input', validateStep2);
        adPrice.addEventListener('input', validateStep2);
        
        document.querySelectorAll('input[name="condition"]').forEach(radio => {
            radio.addEventListener('change', validateStep2);
        });
    }
    
    // Step 3 validation
    const adLocation = document.getElementById('adLocation');
    const contactName = document.getElementById('contactName');
    const contactPhone = document.getElementById('contactPhone');
    const step3Next = document.getElementById('step3Next');
    
    if (adLocation && contactName && contactPhone && step3Next) {
        const validateStep3 = function() {
            const locationValid = adLocation.value.trim().length > 0;
            const nameValid = contactName.value.trim().length > 0;
            const phoneValid = contactPhone.value.trim().length > 0;
            
            step3Next.disabled = !(locationValid && nameValid && phoneValid);
        };
        
        adLocation.addEventListener('change', validateStep3);
        contactName.addEventListener('input', validateStep3);
        contactPhone.addEventListener('input', validateStep3);
    }
    
    // Step 4 validation
    const termsAgree = document.getElementById('termsAgree');
    const submitAd = document.getElementById('submitAd');
    
    if (termsAgree && submitAd) {
        termsAgree.addEventListener('change', function() {
            submitAd.disabled = !termsAgree.checked;
        });
    }
}

// Initialize character counters
function initCharCounters() {
    const adTitle = document.getElementById('adTitle');
    const adDescription = document.getElementById('adDescription');
    
    if (adTitle) {
        const titleCounter = adTitle.nextElementSibling;
        adTitle.addEventListener('input', function() {
            titleCounter.textContent = `${this.value.length}/${this.maxLength}`;
        });
    }
    
    if (adDescription) {
        const descriptionCounter = adDescription.nextElementSibling;
        adDescription.addEventListener('input', function() {
            descriptionCounter.textContent = `${this.value.length}/${this.maxLength}`;
        });
    }
}

// Update preview in step 4
function updatePreview() {
    // Get selected category and subcategory
    const selectedCategory = document.querySelector('.category-card.selected');
    const subcategorySelect = document.getElementById('subcategorySelect');
    
    // Get form values
    const adTitle = document.getElementById('adTitle');
    const adDescription = document.getElementById('adDescription');
    const adPrice = document.getElementById('adPrice');
    const conditionRadio = document.querySelector('input[name="condition"]:checked');
    const adLocation = document.getElementById('adLocation');
    const adAddress = document.getElementById('adAddress');
    const contactName = document.getElementById('contactName');
    const contactPhone = document.getElementById('contactPhone');
    
    // Update preview elements
    if (selectedCategory && subcategorySelect) {
        const categoryName = selectedCategory.querySelector('h3').textContent;
        const subcategoryName = subcategorySelect.options[subcategorySelect.selectedIndex].text;
        document.getElementById('previewCategory').textContent = `${categoryName} > ${subcategoryName}`;
    }
    
    if (adTitle) {
        document.getElementById('previewTitle').textContent = adTitle.value || 'No title provided';
    }
    
    if (adPrice) {
        document.getElementById('previewPrice').textContent = `रू ${adPrice.value || '0'}`;
    }
    
    if (adDescription) {
        document.getElementById('previewDescription').textContent = adDescription.value || 'No description provided';
    }
    
    if (conditionRadio) {
        document.getElementById('previewCondition').textContent = conditionRadio.value.charAt(0).toUpperCase() + conditionRadio.value.slice(1);
    }
    
    if (adLocation && adAddress) {
        const locationText = adLocation.options[adLocation.selectedIndex].text;
        document.getElementById('previewLocation').textContent = adAddress.value ? `${locationText}, ${adAddress.value}` : locationText;
    }
    
    if (contactName && contactPhone) {
        document.getElementById('previewContact').textContent = `${contactName.value || 'No name'} - ${contactPhone.value || 'No phone'}`;
    }
    
    // Update preview photos
    const photoPreviewContainer = document.getElementById('photoPreviewContainer');
    const previewPhotos = document.getElementById('previewPhotos');
    
    if (photoPreviewContainer && previewPhotos) {
        // Clear previous preview photos
        previewPhotos.innerHTML = '';
        
        // Get all photo previews
        const photoElements = photoPreviewContainer.querySelectorAll('.photo-preview');
        
        if (photoElements.length === 0) {
            previewPhotos.textContent = 'No photos uploaded';
        } else {
            // Create preview photos
            photoElements.forEach(photo => {
                const previewPhoto = document.createElement('div');
                previewPhoto.className = 'preview-photo';
                
                const img = document.createElement('img');
                img.src = photo.querySelector('img').src;
                
                previewPhoto.appendChild(img);
                previewPhotos.appendChild(previewPhoto);
            });
        }
    }
}

// Validate step
function validateStep(stepNumber) {
    switch (stepNumber) {
        case 1:
            const selectedCategory = document.querySelector('.category-card.selected');
            const subcategorySelect = document.getElementById('subcategorySelect');
            
            if (!selectedCategory) {
                showMessage('Please select a category', 'error');
                return false;
            }
            
            if (!subcategorySelect.value) {
                showMessage('Please select a subcategory', 'error');
                return false;
            }
            
            return true;
            
        case 2:
            const adTitle = document.getElementById('adTitle');
            const adDescription = document.getElementById('adDescription');
            const adPrice = document.getElementById('adPrice');
            const conditionRadio = document.querySelector('input[name="condition"]:checked');
            
            if (!adTitle.value.trim()) {
                showMessage('Please enter a title for your ad', 'error');
                adTitle.focus();
                return false;
            }
            
            if (!adDescription.value.trim()) {
                showMessage('Please enter a description for your ad', 'error');
                adDescription.focus();
                return false;
            }
            
            if (!adPrice.value.trim() || isNaN(adPrice.value)) {
                showMessage('Please enter a valid price', 'error');
                adPrice.focus();
                return false;
            }
            
            if (!conditionRadio) {
                showMessage('Please select the condition of your item', 'error');
                return false;
            }
            
            return true;
            
        case 3:
            const adLocation = document.getElementById('adLocation');
            const contactName = document.getElementById('contactName');
            const contactPhone = document.getElementById('contactPhone');
            
            if (!adLocation.value) {
                showMessage('Please select a location', 'error');
                adLocation.focus();
                return false;
            }
            
            if (!contactName.value.trim()) {
                showMessage('Please enter your contact name', 'error');
                contactName.focus();
                return false;
            }
            
            if (!contactPhone.value.trim()) {
                showMessage('Please enter your phone number', 'error');
                contactPhone.focus();
                return false;
            }
            
            return true;
            
        default:
            return true;
    }
}

// Show message
function showMessage(message, type = 'info') {
    // Check if message container exists, if not create it
    let messageContainer = document.querySelector('.message-container');
    
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.className = 'message-container';
        document.body.appendChild(messageContainer);
        
        // Style the message container
        messageContainer.style.position = 'fixed';
        messageContainer.style.top = '20px';
        messageContainer.style.right = '20px';
        messageContainer.style.zIndex = '2000';
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message message-${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.padding = '10px 20px';
    messageElement.style.marginBottom = '10px';
    messageElement.style.borderRadius = '4px';
    messageElement.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    messageElement.style.animation = 'fadeIn 0.3s ease';
    
    // Set color based on type
    if (type === 'error') {
        messageElement.style.backgroundColor = '#f44336';
        messageElement.style.color = 'white';
    } else if (type === 'success') {
        messageElement.style.backgroundColor = '#4CAF50';
        messageElement.style.color = 'white';
    } else {
        messageElement.style.backgroundColor = '#2196F3';
        messageElement.style.color = 'white';
    }
    
    // Add to container
    messageContainer.appendChild(messageElement);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageElement.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            messageContainer.removeChild(messageElement);
        }, 300);
    }, 5000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-10px); }
}
`;
document.head.appendChild(style);