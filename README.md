# MAPTECH-2K26 Registration Website

A modern, responsive one-page registration website for the MAPTECH-2K26 college technical event.

## Features

- **Modern Design**: Implements glassmorphism, neumorphism, and gradient UI concepts
- **Responsive Layout**: Optimized for both desktop and mobile devices
- **Interactive Form**: Real-time validation with smooth animations
- **Razorpay Integration**: Secure online payment processing via Razorpay gateway
- **Robust Validation**: All fields are mandatory with comprehensive validation
- **Auto-complete**: Smart institute name suggestions
- **Smooth Scrolling**: Seamless navigation between sections
- **Accessibility**: Keyboard shortcuts and screen reader friendly
- **Micro-animations**: Engaging hover effects and transitions

## Files

- `index.html` - Main registration page with Razorpay payment integration
- `confirmation.html` - Registration confirmation page
- `thankyou.html` - Thank you page after successful registration
- `admin.html` - Admin dashboard to view registrations
- `logo.jpg` - Event logo
- `favicon.svg` / `favicon.ico` - Website favicon

## Usage

1. Open `index.html` in a modern web browser
2. Fill in all the required registration form fields:
   - Institute Name (mandatory)
   - Department (mandatory)
   - Full Name (mandatory)
   - WhatsApp Number (mandatory, 10 digits)
   - Email (mandatory, valid format)
   - Event/Workshop selection (mandatory)
3. Click "Pay ₹60 via Razorpay" to initiate payment
4. Complete payment using Razorpay's secure payment gateway
5. After successful payment, submit the registration form
6. View your confirmation on the thank you page

## Keyboard Shortcuts

- Press `R` - Jump to registration section
- Press `T` - Scroll to top

## Customization

### Logo
Replace `logo.svg` with your own `logo.png` file (120x120px recommended)

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
}
```

### Events
Modify event options in `index.html` (Event Selection dropdown)

## Technologies Used

- HTML5
- CSS3 (Glassmorphism, Neumorphism, Gradients)
- Vanilla JavaScript
- Firebase Firestore (Backend Database)
- Razorpay Payment Gateway (Test Mode)
- Font Awesome Icons
- Google Fonts (Poppins, Orbitron)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Credits

**Branding by Maviya**