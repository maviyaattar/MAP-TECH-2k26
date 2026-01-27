// =====================================================
// Firebase Configuration and Initialization
// =====================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAjDdnn_0_K0iQkSCLd5RcgMrP-DOjrzzU",
    authDomain: "map-tech2k26.firebaseapp.com",
    projectId: "map-tech2k26",
    storageBucket: "map-tech2k26.firebasestorage.app",
    messagingSenderId: "344931361614",
    appId: "1:344931361614:web:d8a3d1141bbf325e41341f",
    measurementId: "G-7CX80DHB6S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

// =====================================================
// DOM Elements
// =====================================================
const registrationForm = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');
const scrollToTopBtn = document.getElementById('scrollToTop');
const fileInput = document.getElementById('paymentScreenshot');
const fileName = document.querySelector('.file-name');
const submitButton = document.querySelector('.submit-button');

// =====================================================
// Scroll to Top Button
// =====================================================
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =====================================================
// File Upload Handler
// =====================================================
fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        // Validate file size (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            alert('File size exceeds 5MB. Please choose a smaller file.');
            fileInput.value = '';
            fileName.textContent = '';
            return;
        }
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file (JPG, PNG, etc.)');
            fileInput.value = '';
            fileName.textContent = '';
            return;
        }
        
        fileName.textContent = file.name;
    }
});

// =====================================================
// Form Validation
// =====================================================
function validateForm(formData) {
    const errors = [];
    
    // Check if at least one event is selected
    if (!formData.events || formData.events.length === 0) {
        errors.push('Please select at least one event');
    }
    
    // Validate WhatsApp number
    const whatsapp = formData.whatsappNumber;
    if (!/^[0-9+\s-]{10,}$/.test(whatsapp)) {
        errors.push('Please enter a valid WhatsApp number');
    }
    
    // Validate email
    const email = formData.email;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Please enter a valid email address');
    }
    
    return errors;
}

// =====================================================
// Form Submission Handler
// =====================================================
registrationForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    try {
        // Get form data
        const instituteName = document.getElementById('instituteName').value.trim();
        const department = document.getElementById('department').value;
        const participantName = document.getElementById('participantName').value.trim();
        const whatsappNumber = document.getElementById('whatsappNumber').value.trim();
        const email = document.getElementById('email').value.trim();
        const paymentFile = fileInput.files[0];
        
        // Get selected events
        const eventCheckboxes = document.querySelectorAll('input[name="events"]:checked');
        const selectedEvents = Array.from(eventCheckboxes).map(cb => cb.value);
        
        // Prepare form data for validation
        const formData = {
            instituteName,
            department,
            participantName,
            whatsappNumber,
            email,
            events: selectedEvents
        };
        
        // Validate form
        const errors = validateForm(formData);
        if (errors.length > 0) {
            alert('Please fix the following errors:\n' + errors.join('\n'));
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            return;
        }
        
        // Upload payment screenshot to Firebase Storage
        let paymentScreenshotURL = '';
        if (paymentFile) {
            const timestamp = Date.now();
            const storageRef = ref(storage, `payments/${timestamp}_${paymentFile.name}`);
            const snapshot = await uploadBytes(storageRef, paymentFile);
            paymentScreenshotURL = await getDownloadURL(snapshot.ref);
        }
        
        // Prepare data for Firestore
        const registrationData = {
            instituteName,
            department,
            participantName,
            whatsappNumber,
            email,
            events: selectedEvents,
            paymentScreenshotURL,
            registrationFee: 60,
            timestamp: new Date().toISOString(),
            status: 'pending'
        };
        
        // Save to Firestore
        const docRef = await addDoc(collection(db, 'registrations'), registrationData);
        
        console.log('Registration successful! Document ID:', docRef.id);
        
        // Hide form and show success message
        registrationForm.style.display = 'none';
        successMessage.classList.add('show');
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset form after delay
        setTimeout(() => {
            registrationForm.reset();
            fileName.textContent = '';
        }, 1000);
        
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred during registration. Please try again. Error: ' + error.message);
    } finally {
        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
    }
});

// =====================================================
// Smooth Scroll for Navigation Links
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
// Input Focus Glow Effects
// =====================================================
const inputs = document.querySelectorAll('input, select');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// =====================================================
// Intersection Observer for Scroll Animations
// =====================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('.about-section, .registration-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// =====================================================
// Logo Error Handler
// =====================================================
const logo = document.getElementById('logo');
logo.addEventListener('error', function() {
    console.warn('Logo image not found, using placeholder');
    // Keep the existing placeholder or default styling
});

console.log('MAP-TECH 2K26 Registration System Initialized Successfully');
