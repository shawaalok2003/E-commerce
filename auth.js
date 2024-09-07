// Firebase configuration
const firebaseConfig = {
    authDomain: "E-commerce.firebaseapp.com",
    projectId: "e-commerce-48711",
    storageBucket: "e-commerce-48711.appspot.com",
    appId: "808418254220"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert("Registration successful");
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert("Login successful");
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
}
