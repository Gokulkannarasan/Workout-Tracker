// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyApPVC2A6zhe9NXDwa4blN10eX5tenGANc",
    authDomain: "workout-tracker-a98ac.firebaseapp.com",
    projectId: "workout-tracker-a98ac",
    storageBucket: "workout-tracker-a98ac.appspot.com",
    messagingSenderId: "665514636984",
    appId: "1:665514636984:web:8941fae52093884c52e64d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app); //  Export Firestore for `interaction.js`

//  Login Function (Now Globally Accessible)
window.login = function () {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful!");
            window.location.href = "home_page.html";  
        })
        .catch((error) => {
            alert("Login failed: " + error.message);
        });
};

// Signup Function
window.signup = function () {
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Signup successful! Now login.");
            window.location.href = "login.html";  
        })
        .catch((error) => {
            alert(error.message);
        });
};

// Logout Function
window.logout = function () {
    signOut(auth).then(() => {
        alert("Logged out successfully!");
        window.location.href = "login.html"; 
    }).catch((error) => {
        alert("Logout failed: " + error.message);
    });
};

// Protect Pages (Ensure User is Logged In)
window.checkLogin = function() {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = "login.html";  
        }
    });
};
