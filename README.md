# MAPTECH-2K26 Registration Website

A modern, responsive one-page registration website for the MAPTECH-2K26 college technical event.

## Features

- **Modern Design**: Implements glassmorphism, neumorphism, and gradient UI concepts
- **Responsive Layout**: Optimized for both desktop and mobile devices
- **Interactive Form**: Real-time validation with smooth animations and inline error messages
- **UPI Payment Integration**: Direct UPI payment link with QR code scanner for ₹60 registration fee
- **Screenshot Upload**: Users upload payment screenshot for manual verification
- **Manual Verification Process**: Admin manually verifies payment screenshots before approval
- **WhatsApp Confirmation**: Users receive confirmation messages on WhatsApp after admin verification
- **Inline Field Validation**: Error messages appear directly below each field for better UX
- **Visual Feedback**: Color-coded fields (red for errors, green for valid inputs)
- **Robust Validation**: All fields are mandatory with comprehensive validation
- **Auto-complete**: Smart institute name suggestions
- **Smooth Scrolling**: Seamless navigation between sections
- **Accessibility**: Keyboard shortcuts and screen reader friendly
- **Micro-animations**: Engaging hover effects and transitions

## Files

- `index.html` - Main registration page with UPI payment QR code and screenshot upload
- `confirmation.html` - Registration confirmation page showing pending verification status
- `thankyou.html` - Thank you page after successful registration submission
- `admin.html` - Admin dashboard to view registrations and verify payment screenshots
- `logo.jpg` - Event logo (also used as QR code placeholder)
- `favicon.svg` / `favicon.ico` - Website favicon

## Usage

1. Open `index.html` in a modern web browser
2. Fill in all the required registration form fields:
   - Institute Name (mandatory)
   - Department (mandatory)
   - Full Name (mandatory)
   - WhatsApp Number (mandatory, 10 digits starting with 6-9)
   - Email (mandatory, valid format)
   - Event/Workshop selection (mandatory)
3. Scan the QR code or click "Pay Now via UPI" to make payment of ₹60
   - UPI payment link opens your preferred payment app
   - Complete the payment in your UPI app
4. Upload a screenshot of the completed payment transaction
   - Screenshot must be clear and show transaction details
   - File size limit: 500KB (images will be automatically validated)
5. Submit the registration form for verification
6. Wait for admin verification (within 24 hours)
7. Receive confirmation message on WhatsApp after admin verifies your payment
8. View your confirmation details on the thank you page

## Admin Dashboard

The admin dashboard (`admin.html`) allows administrators to:
- View all registration submissions
- View payment screenshots submitted by users
- Verify or reject payment submissions
- Track verification statistics (Total, Pending, Verified)
- Export registration data to CSV
- Filter registrations by various criteria

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
- UPI Payment Integration (Direct Payment Links)
- Font Awesome Icons
- Google Fonts (Poppins, Orbitron)

## Payment Process

This implementation uses a manual verification workflow:

1. **User Payment**: Users scan QR code or use direct UPI link to pay ₹60
2. **Screenshot Upload**: Users upload screenshot of completed payment (max 500KB)
3. **Admin Verification**: Admin manually verifies each payment screenshot
4. **WhatsApp Confirmation**: Users receive confirmation on WhatsApp after verification

**Important Setup Notes**:
- ⚠️ **Replace QR Code**: The current QR code is a placeholder (logo.jpg). Replace it with an actual UPI payment QR code image before production use.
- ⚠️ **Update UPI ID**: Change the UPI ID from `maptech2k26@upi` to your actual UPI ID in index.html.
- ⚠️ **File Size Limit**: Screenshot uploads are limited to 500KB to stay within Firestore document size limits.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Credits

**Branding by Maviya**