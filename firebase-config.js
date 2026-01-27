// =====================================================
// Firebase Configuration
// =====================================================
// ⚠️ SECURITY WARNING:
// 1. NEVER commit production Firebase credentials to version control
// 2. Use environment variables or secure configuration management
// 3. Set up proper security rules in Firebase Console
// 4. Keep your API keys restricted in Firebase Console settings
//
// To use this application with your own Firebase project:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project or select an existing one
// 3. Go to Project Settings > General > Your apps
// 4. Click "Add app" and select "Web" (</>) 
// 5. Copy the firebaseConfig object
// 6. Replace the configuration below with your own
// 7. Enable Firestore Database and Storage in Firebase Console

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase initialized successfully');
    
    // Initialize Firestore
    window.db = firebase.firestore();
    
    // Initialize Storage
    window.storage = firebase.storage();
    
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
    console.warn('⚠️ Please configure Firebase in firebase-config.js');
}
