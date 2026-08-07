  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut

  } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCtuEZdgPZfG8YucYXhtEN7xi7-kr3s0-A",
    authDomain: "lab-auth-firebase-b4532.firebaseapp.com",
    projectId: "lab-auth-firebase-b4532",
    storageBucket: "lab-auth-firebase-b4532.firebasestorage.app",
    messagingSenderId: "1090681360898",
    appId: "1:1090681360898:web:8681b764def6497b14cd1b"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

// Test
console.log("Firebase conectado correctamente");
console.log(app);


const formRegistro = document.getElementById("form-registro");

if (formRegistro) {
  formRegistro.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email-registro").value;
    const password = document.getElementById("password-registro").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      alert("Usuario registrado correctamente");

      console.log("Usuario creado:", userCredential.user);

      window.location.href = "index.html";
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
      alert("Error al registrar usuario: " + error.message);
    }
  });
}

// Conexion del Formu
const formLogin = document.getElementById("form-login");

if (formLogin) {
  formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email-login").value;

    const password = document.getElementById("password-login").value;

    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      console.log(
        "Usuario autenticado:",
        userCredential.user
      );

      alert("Inicio de sesión exitoso");
      window.location.href = "dashboard.html";

    } catch (error) {

      console.error(error);
      alert(
        "Correo electrónico o contraseña incorrectos"
      );
    }
  });
}

const usuarioInfo = document.getElementById("usuario-info");
if (usuarioInfo) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioInfo.textContent =
        "Bienvenido: " + user.email;
    } else {
      window.location.href = "index.html";
    }
  });
}

//Cerrar Secion

const btnLogout = document.getElementById("btn-logout");

if (btnLogout) {
  btnLogout.addEventListener("click", async () => {
    try {
      await signOut(auth);
      alert("Sesión cerrada correctamente");
      window.location.href = "index.html";
    } catch (error) {
      console.error(error);
      alert("Error al cerrar sesión");
    }
  });
}