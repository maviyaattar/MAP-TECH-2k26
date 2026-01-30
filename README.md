# MAPTECH-2K26 Registration Website

A modern, responsive one-page registration website for the MAPTECH-2K26 college technical event.

## Features

- **Modern Design**: Implements glassmorphism, neumorphism, and gradient UI concepts
- **Responsive Layout**: Optimized for both desktop and mobile devices
- **Interactive Form**: Real-time validation with smooth animations and inline error messages
- **UPI Payment Integration**: Direct UPI payment link with QR code for easy payments
- **Native File Upload**: Uses device's native file picker for payment proof upload - no external redirects
- **Upload on Submission**: Files are uploaded to Cloudinary during form submission for better UX
- **Inline Field Validation**: Error messages appear directly below each field for better UX
- **Visual Feedback**: Color-coded fields (red for errors, green for valid inputs)
- **Robust Validation**: All fields are mandatory with comprehensive validation
  - Full Name: Must be at least 8 characters and contain both first and last names
  - No file size restrictions for payment proof uploads
- **Auto-complete**: Smart institute name suggestions
- **Smooth Scrolling**: Seamless navigation between sections
- **Accessibility**: Keyboard shortcuts and screen reader friendly
- **Micro-animations**: Engaging hover effects and transitions
- **WhatsApp Notifications**: Automated notification system (placeholder for backend integration)

## Files

- `index.html` - Main registration page with UPI payment and Cloudinary file upload integration
- `confirmation.html` - Registration confirmation page
- `thankyou.html` - Thank you page after successful registration
- `admin.html` - Admin dashboard to view registrations and verify payment proofs
- `logo.jpg` - Event logo
- `scanner.jpg` - UPI payment QR code
- `favicon.svg` / `favicon.ico` - Website favicon

## Usage

1. Open `index.html` in a modern web browser
2. Fill in all the required registration form fields:
   - Institute Name (mandatory)
   - Department (mandatory)
   - Full Name (mandatory, minimum 8 characters, must contain both first and last names)
   - WhatsApp Number (mandatory, 10 digits starting with 6-9)
   - Email (mandatory, valid format)
   - Event/Workshop selection (mandatory)
3. Make payment via UPI:
   - Scan the QR code with any UPI app
   - Or click "Pay ₹60 via UPI" button to open UPI payment link
   - Complete the payment of ₹60
4. Upload Payment Proof:
   - Click "Click to Upload Payment Proof" button (opens native file picker - no external redirect)
   - Select or take a photo of your payment confirmation screenshot from your UPI app
   - Ensure the screenshot shows transaction details including transaction ID, amount, and date
   - File preview will be displayed (no file size restrictions)
5. Submit the registration form
   - The payment proof will be uploaded to Cloudinary during submission
   - Progress bar shows upload and submission status
6. You will receive a WhatsApp notification: "Your registration is processing."
7. View your confirmation on the thank you page
8. Admin can verify submissions using the uploaded screenshots in the admin dashboard

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
- Cloudinary (File Upload & Management via REST API)
- Native File API (FileReader for preview)
- UPI Payment Integration
- Font Awesome Icons
- Google Fonts (Poppins, Orbitron)

## Configuration

### Cloudinary Setup

The application uses Cloudinary for managing payment proof uploads:
- Cloud Name: `dgt4rfzqb`
- Upload Preset: `maptech_preset` (unsigned)
- Folder: `maptech_payments`
- No file size restrictions

**Security Note**: The Cloudinary upload preset should be configured in the Cloudinary dashboard with:
- Unsigned upload enabled
- Appropriate upload limits to prevent abuse
- Restricted file formats (images only)
- Folder restriction to `maptech_payments`

### UPI Payment

Payment is made via UPI link:
```
upi://pay?pa=9765993135@ptaxis&pn=MAPTECH2K26&am=60&cu=INR&tn=MAPTECH%202K26
```

Users can scan the QR code (`scanner.jpg`) or click the payment button to initiate UPI payment.

## Security Notes

**Important Security Considerations**:

1. **Payment Verification**: Admin must manually verify payment proofs uploaded by users before approving registrations
2. **File Upload Security**: Cloudinary handles file validation and security. Configure the upload preset with appropriate restrictions in the Cloudinary dashboard
3. **UPI Payment Validation**: The UPI payment address (9765993135@ptaxis) is hardcoded. Ensure payment screenshots are verified to match expected transaction details
4. **Database Security**: Firebase Firestore rules should be configured to restrict write access
5. **HTTPS Required**: Always use HTTPS in production to protect sensitive data
6. **WhatsApp Integration**: Currently a placeholder - implement proper backend API with authentication for production
7. **Admin Dashboard**: Consider adding authentication and payment status update functionality for the admin panel

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Credits

**Branding by Maviya**