// Authentication JavaScript for SellonX

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize auth components
    initAuthTabs();
    initAuthForms();
});

// Initialize authentication tabs
function initAuthTabs() {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            authTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all forms
            authForms.forEach(form => form.classList.remove('active'));
            
            // Show the corresponding form
            const tabName = this.getAttribute('data-tab');
            document.getElementById(tabName + 'Form').classList.add('active');
        });
    });
}

// Initialize authentication forms
function initAuthForms() {
    // Login form
    const loginForm = document.querySelector('#loginForm form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Validate inputs
            if (!email || !password) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Here we would normally call Supabase for authentication
            // For now, we'll simulate a successful login
            simulateLogin(email, password);
        });
    }
    
    // Sign up form
    const signupForm = document.querySelector('#signupForm form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            const termsAgree = document.getElementById('termsAgree').checked;
            
            // Validate inputs
            if (!name || !email || !password || !confirmPassword) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showMessage('Passwords do not match', 'error');
                return;
            }
            
            if (!termsAgree) {
                showMessage('Please agree to the Terms and Conditions', 'error');
                return;
            }
            
            // Here we would normally call Supabase for registration
            // For now, we'll simulate a successful registration
            simulateSignup(name, email, password);
        });
    }
    
    // Forgot password form
    const forgotPasswordForm = document.querySelector('#forgotPasswordForm form');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('resetEmail').value;
            
            // Validate input
            if (!email) {
                showMessage('Please enter your email address', 'error');
                return;
            }
            
            // Here we would normally call Supabase for password reset
            // For now, we'll simulate a successful password reset request
            simulatePasswordReset(email);
        });
    }
    
    // Forgot password link
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hide all forms
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            
            // Show forgot password form
            document.getElementById('forgotPasswordForm').classList.add('active');
        });
    }
    
    // Back to login link
    const backToLoginLink = document.getElementById('backToLoginLink');
    if (backToLoginLink) {
        backToLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hide all forms
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            
            // Show login form
            document.getElementById('loginForm').classList.add('active');
            
            // Update tabs
            document.querySelectorAll('.auth-tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('data-tab') === 'login') {
                    tab.classList.add('active');
                }
            });
        });
    }
}

// Simulate login (to be replaced with Supabase integration)
function simulateLogin(email, password) {
    console.log(`Login attempt with email: ${email}`);
    
    // Simulate API call
    setTimeout(() => {
        // For demonstration, we'll consider any login as successful
        const user = {
            id: 'user-123',
            email: email,
            name: 'Demo User'
        };
        
        // Save user to localStorage (simulating session)
        localStorage.setItem('sellonx_user', JSON.stringify(user));
        
        // Show success message
        showMessage('Login successful! Redirecting...', 'success');
        
        // Close modal and refresh page after a delay
        setTimeout(() => {
            document.getElementById('authModal').style.display = 'none';
            document.body.style.overflow = '';
            updateUIAfterLogin(user);
        }, 1500);
    }, 1000);
}

// Simulate signup (to be replaced with Supabase integration)
function simulateSignup(name, email, password) {
    console.log(`Signup attempt with email: ${email}`);
    
    // Simulate API call
    setTimeout(() => {
        // For demonstration, we'll consider any signup as successful
        showMessage('Account created successfully! Verification email sent.', 'success');
        
        // Switch to login form after a delay
        setTimeout(() => {
            // Hide all forms
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            
            // Show login form
            document.getElementById('loginForm').classList.add('active');
            
            // Update tabs
            document.querySelectorAll('.auth-tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('data-tab') === 'login') {
                    tab.classList.add('active');
                }
            });
            
            // Pre-fill email
            document.getElementById('loginEmail').value = email;
        }, 2000);
    }, 1000);
}

// Simulate password reset (to be replaced with Supabase integration)
function simulatePasswordReset(email) {
    console.log(`Password reset attempt for email: ${email}`);
    
    // Simulate API call
    setTimeout(() => {
        // For demonstration, we'll consider any request as successful
        showMessage('Password reset link sent to your email!', 'success');
        
        // Switch back to login form after a delay
        setTimeout(() => {
            // Hide all forms
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            
            // Show login form
            document.getElementById('loginForm').classList.add('active');
            
            // Update tabs
            document.querySelectorAll('.auth-tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('data-tab') === 'login') {
                    tab.classList.add('active');
                }
            });
        }, 2000);
    }, 1000);
}

// Show message to user
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

// Update UI after login
function updateUIAfterLogin(user) {
    // Update login button to show user name
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.textContent = user.name;
        loginBtn.classList.add('logged-in');
    }
    
    // Update post ad button behavior
    const postAdBtns = document.querySelectorAll('#postAdBtn, #postAdBtnBottom');
    postAdBtns.forEach(btn => {
        if (btn) {
            btn.removeEventListener('click', null);
            btn.addEventListener('click', function() {
                // Redirect to post ad page when logged in
                window.location.href = 'post-ad.html';
            });
        }
    });
}

// Check if user is logged in on page load
function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('sellonx_user'));
    if (user) {
        updateUIAfterLogin(user);
    }
}

// Call checkLoginStatus on page load
window.addEventListener('load', checkLoginStatus);

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