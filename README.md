# MAPTECH-2K26 Registration Website

A modern, responsive one-page registration website for the MAPTECH-2K26 college technical event.

## Features

- **Modern Design**: Implements glassmorphism, neumorphism, and gradient UI concepts
- **Responsive Layout**: Optimized for both desktop and mobile devices
- **Firebase Integration**: Real-time data storage with Firestore and file uploads with Storage
- **Interactive Form**: Real-time validation with smooth animations
- **Auto-complete**: Smart institute name suggestions
- **File Upload**: Drag-and-drop payment screenshot upload with validation
- **Smooth Scrolling**: Seamless navigation between sections
- **Accessibility**: Keyboard shortcuts and screen reader friendly
- **Micro-animations**: Engaging hover effects and transitions

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/maviyaattar/MAP-TECH-2k26.git
cd MAP-TECH-2k26
```

### 2. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Go to Project Settings > General > Your apps
4. Click "Add app" and select "Web" (</>)
5. Copy the `firebaseConfig` object
6. Open `firebase-config.js` and replace the placeholder config with your own
7. Enable **Firestore Database**:
   - Go to Firestore Database in Firebase Console
   - Click "Create database"
   - Start in production mode or test mode
   - Create a collection named `registrations`
8. Enable **Storage**:
   - Go to Storage in Firebase Console
   - Click "Get started"
   - Use default settings

### 3. Firestore Security Rules (Optional)
For production, set up proper security rules in Firestore:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /registrations/{document} {
      allow read: if request.auth != null;
      allow write: if true; // Adjust based on your needs
    }
  }
}
```

### 4. Storage Security Rules (Optional)
For production, set up proper security rules in Storage:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /payment-screenshots/{filename} {
      allow read: if request.auth != null;
      allow write: if request.resource.size < 5 * 1024 * 1024 
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

### 5. Run the Website
Simply open `index.html` in a modern web browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

## Files

- `index.html` - Main HTML structure with Hero, About, and Registration sections
- `styles.css` - Complete styling with modern CSS techniques
- `script.js` - Interactive functionality, form validation, and Firebase integration
- `firebase-config.js` - Firebase configuration file (needs to be configured)
- `logo.svg` - Event logo (replace with custom logo.png if desired)

## How It Works

1. User fills out the registration form with their details
2. User uploads a payment screenshot (up to 5MB)
3. On submission:
   - Form data is validated
   - Payment screenshot is uploaded to Firebase Storage
   - Registration data (including screenshot URL) is saved to Firestore
   - Success message is displayed with confetti animation

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
- Vanilla JavaScript (ES6+)
- Firebase Firestore (Database)
- Firebase Storage (File uploads)
- Font Awesome Icons
- Google Fonts (Poppins, Orbitron)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Credits

**Branding by Maviya**