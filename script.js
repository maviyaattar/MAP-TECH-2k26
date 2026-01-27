// =====================================================
// Firebase Configuration
// =====================================================
const firebaseConfig = {
    apiKey: "AIzaSyAjDdnn_0_K0iQkSCLd5RcgMrP-DOjrzzU",
    authDomain: "map-tech2k26.firebaseapp.com",
    projectId: "map-tech2k26",
    storageBucket: "map-tech2k26.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
let db, storage;
try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    storage = firebase.storage();
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization error:', error);
}

// =====================================================
// DOM Elements
// =====================================================
const registrationForm = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');
const scrollToTopBtn = document.getElementById('scrollToTop');
const fileInput = document.getElementById('paymentScreenshot');
const fileLabel = document.querySelector('.file-upload-label');
const fileName = document.querySelector('.file-name');
const logo = document.getElementById('logo');

// =====================================================
// Logo Fallback
// =====================================================
logo.addEventListener('error', function() {
    // If logo.png is not found, show a placeholder
    console.log('Logo image not found, using placeholder');
});

// =====================================================
// File Upload Handling
// =====================================================
fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    
    if (file) {
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            showFileError('File size should not exceed 5MB');
            fileInput.value = '';
            return;
        }
        
        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            showFileError('Please upload a valid image (JPG, PNG) or PDF file');
            fileInput.value = '';
            return;
        }
        
        // Clear any error messages
        clearFileError();
        
        // Display file name
        fileName.textContent = `Selected: ${file.name}`;
        fileLabel.style.borderColor = '#10b981';
        fileLabel.style.background = '#f0fdf4';
        
        // Add checkmark icon
        const icon = fileLabel.querySelector('i');
        icon.className = 'fas fa-check-circle';
        icon.style.color = '#10b981';
    }
});

function showFileError(message) {
    clearFileError();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'file-error-message';
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.85rem;
        margin-top: 8px;
        padding: 10px;
        background: #fef2f2;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        animation: shake 0.5s;
    `;
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    const fileGroup = document.querySelector('.file-upload-group');
    fileGroup.appendChild(errorDiv);
}

function clearFileError() {
    const existingError = document.querySelector('.file-error-message');
    if (existingError) {
        existingError.remove();
    }
}

// Drag and Drop for File Upload
fileLabel.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.style.borderColor = '#8b5cf6';
    this.style.background = '#faf5ff';
});

fileLabel.addEventListener('dragleave', function(e) {
    e.preventDefault();
    this.style.borderColor = '#6366f1';
    this.style.background = '#f8fafc';
});

fileLabel.addEventListener('drop', function(e) {
    e.preventDefault();
    this.style.borderColor = '#6366f1';
    this.style.background = '#f8fafc';
    
    const file = e.dataTransfer.files[0];
    if (file) {
        fileInput.files = e.dataTransfer.files;
        fileInput.dispatchEvent(new Event('change'));
    }
});

// =====================================================
// Form Validation & Submission with Firebase
// =====================================================
registrationForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validate all fields
    if (!validateForm()) {
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('.submit-button');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        // Get form data
        const formData = {
            instituteName: document.getElementById('instituteName').value,
            department: document.getElementById('department').value,
            participantName: document.getElementById('participantName').value,
            whatsappNumber: document.getElementById('whatsappNumber').value,
            email: document.getElementById('email').value,
            eventSelection: document.getElementById('eventSelection').value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        // Upload payment screenshot first
        const fileInput = document.getElementById('paymentScreenshot');
        const file = fileInput.files[0];
        
        if (file) {
            const storageRef = storage.ref();
            const fileName = `${Date.now()}_${file.name}`;
            const fileRef = storageRef.child(`payments/${fileName}`);
            
            // Upload file
            await fileRef.put(file);
            
            // Get download URL
            const downloadURL = await fileRef.getDownloadURL();
            formData.paymentScreenshot = downloadURL;
            formData.paymentFileName = fileName;
        }
        
        // Store in Firestore
        await db.collection('registrations').add(formData);
        
        console.log('Registration successful:', formData);
        
        // Hide form and show success message
        registrationForm.style.display = 'none';
        successMessage.classList.add('show');
        
        // Smooth scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add confetti effect
        createConfetti();
        
    } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again or contact support.');
        
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

function validateForm() {
    let isValid = true;
    const inputs = registrationForm.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        } else {
            clearError(input);
            
            // Additional validations
            if (input.type === 'email') {
                if (!isValidEmail(input.value)) {
                    showError(input, 'Please enter a valid email address');
                    isValid = false;
                }
            }
            
            if (input.type === 'tel') {
                if (!isValidPhone(input.value)) {
                    showError(input, 'Please enter a valid phone number');
                    isValid = false;
                }
            }
        }
    });
    
    return isValid;
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    
    // Remove existing error
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error class and message
    input.style.borderColor = '#ef4444';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.85rem;
        margin-top: 5px;
        display: flex;
        align-items: center;
        gap: 5px;
    `;
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    formGroup.appendChild(errorDiv);
    
    // Add shake animation
    input.style.animation = 'shake 0.5s';
    setTimeout(() => {
        input.style.animation = '';
    }, 500);
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    input.style.borderColor = 'transparent';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s+()-]{10,}$/;
    return phoneRegex.test(phone);
}

// =====================================================
// Smooth Scrolling
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =====================================================
// Scroll to Top Button
// =====================================================
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =====================================================
// Input Animations
// =====================================================
const formInputs = document.querySelectorAll('.form-group input, .form-group select');

formInputs.forEach(input => {
    // Add focus effect
    input.addEventListener('focus', function() {
        this.closest('.form-group').classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.closest('.form-group').classList.remove('focused');
    });
    
    // Real-time validation feedback
    input.addEventListener('input', function() {
        if (this.value.trim()) {
            clearError(this);
        }
    });
});

// =====================================================
// Confetti Effect for Success
// =====================================================
function createConfetti() {
    const colors = ['#2563eb', '#0891b2', '#0d9488', '#10b981', '#3b82f6'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        const animationDuration = 2 + Math.random() * 2;
        const leftPosition = Math.random() * 100;
        const rotation = Math.random() * 360;
        const finalRotation = 360 + Math.random() * 360;
        const translateX = -50 + Math.random() * 100;
        
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${leftPosition}%;
            opacity: 1;
            transform: rotate(${rotation}deg);
            z-index: 10000;
            pointer-events: none;
        `;
        
        // Create individual animation for each confetti
        const keyframeName = `confettiFall${i}`;
        const keyframes = `
            @keyframes ${keyframeName} {
                to {
                    top: 100vh;
                    opacity: 0;
                    transform: rotate(${finalRotation}deg) translateX(${translateX}px);
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
        
        confetti.style.animation = `${keyframeName} ${animationDuration}s linear forwards`;
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
            style.remove();
        }, 4000);
    }
}

// =====================================================
// Page Load Animation
// =====================================================
window.addEventListener('load', function() {
    // Fade in all sections
    const sections = document.querySelectorAll('section, header, footer');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// =====================================================
// Interactive Hover Effects
// =====================================================
const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
    group.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    group.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// =====================================================
// Prevent Form Resubmission on Page Reload
// =====================================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// =====================================================
// Console Welcome Message
// =====================================================
console.log('%c🚀 Welcome to MAP-TECH 2K26!', 'font-size: 20px; font-weight: bold; color: #60A5FA;');
console.log('%c✨ State Level Technical Event', 'font-size: 14px; color: #3B82F6;');
console.log('%c💡 Maulana Azad Polytechnic, Solapur', 'font-size: 12px; color: #64748b;');

// =====================================================
// Accessibility Enhancements
// =====================================================
// Add keyboard navigation hints
document.addEventListener('keydown', function(e) {
    // Press 'R' to scroll to registration
    if (e.key === 'r' || e.key === 'R') {
        const registrationSection = document.getElementById('registration');
        if (registrationSection) {
            registrationSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Press 'T' to scroll to top
    if (e.key === 't' || e.key === 'T') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Press 'A' to scroll to about
    if (e.key === 'a' || e.key === 'A') {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Announce keyboard shortcuts on page load
setTimeout(() => {
    console.log('%c⌨️ Keyboard Shortcuts:', 'font-weight: bold;');
    console.log('  • Press "R" to jump to registration');
    console.log('  • Press "A" to jump to about section');
    console.log('  • Press "T" to scroll to top');
}, 1000);
