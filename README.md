# MAP-TECH 2K26 Registration Website

A modern, fully responsive single-page registration website for MAP-TECH 2K26 - State Level Technical Event at Maulana Azad Polytechnic, Solapur.

## Event Details

- **Event Name**: MAP-TECH 2K26
- **Event Date**: 10 February 2026
- **Location**: Maulana Azad Polytechnic, Solapur
- **Registration Fee**: ₹60 per participant

## Features

### Hero Section
- Professional gradient background with smooth fade-in animation
- College logo with glowing accents and pulse animation
- Event title, subtitle, and date prominently displayed
- Animated "Register Now" scroll button with bounce effect

### About Event Section
- Professional description of the state-level technical event
- Three exciting categories:
  - **Paper Presentation**: Share research and innovative solutions
  - **Poster Presentation**: Visual communication of technical concepts
  - **Technical Quiz**: Test technical knowledge

### Registration Form
- **Glassmorphism Design**: Beautiful card-based UI with backdrop blur
- **Form Fields**:
  - Name of Institute
  - Department/Group (dropdown with 5 options)
  - Participant Full Name
  - WhatsApp Number
  - Email ID
  - Event Selection (checkboxes for Paper, Poster, Quiz)
  - Payment Screenshot Upload (max 5MB)

### Payment Integration
- **Payment Instructions Section** with QR code scanner
- UPI Payment Details:
  - UPI ID: meraj.pathan1@ibl
  - Name: MERAJ USMAN PATHAN
  - Amount: ₹60
- Direct UPI payment link for mobile devices
- QR code for scanning and payment

### Firebase Integration
- Form data stored in Firestore collection: `registrations`
- Payment screenshots uploaded to Firebase Storage: `payments/`
- Real-time form validation
- Loading spinner during submission
- Success message after completion

### Design Features
- **Professional Blue + White + Gold Color Palette**
- Smooth scroll animations and transitions
- Button hover effects with shadow glow
- Input field focus effects with animated borders
- Mobile-first responsive design
- Intersection Observer for scroll-based animations
- Sticky navigation bar with backdrop blur

## Files

- `index.html` - Main HTML structure
- `styles.css` - Complete styling with modern CSS (Blue + Gold theme)
- `script.js` - Firebase integration and form handling
- `logo.png` - Event logo (150x150px)
- `scanner.png` - UPI QR code for payments (300x300px)

## Installation

1. Clone the repository
2. Open `index.html` in a modern web browser
3. The website is ready to use - no build process required

## Usage

1. Navigate to the website
2. Scroll through the Hero and About sections
3. Complete the payment via UPI
4. Fill in the registration form
5. Upload payment screenshot
6. Submit to complete registration

## Firebase Configuration

The website uses Firebase for:
- **Firestore**: Storing registration data
- **Storage**: Storing payment screenshots
- **Analytics**: Tracking user engagement

Configuration is already set up in `script.js` with the provided credentials.

## Form Validation

- Required field validation
- Email format validation
- Phone number format validation
- File size validation (max 5MB)
- File type validation (images only)
- At least one event must be selected

## Responsive Design

Fully responsive with breakpoints:
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: 375px - 767px
- Small Mobile: Below 375px

## Technologies Used

- HTML5
- CSS3 (Glassmorphism, Gradients, Animations)
- JavaScript (ES6+ Modules)
- Firebase (Firestore, Storage, Analytics)
- Font Awesome Icons
- Google Fonts (Poppins)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Screenshots

### Desktop View
![Desktop View](https://github.com/user-attachments/assets/ce41f0ec-97e9-449b-800a-8069efa95c2b)

### Mobile View
![Mobile View](https://github.com/user-attachments/assets/eb4b496b-8b0a-49fb-ba26-5e054151971c)

## Credits

**Designed & Developed by Maviya**