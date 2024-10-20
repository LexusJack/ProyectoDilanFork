document.addEventListener('DOMContentLoaded', () => {
  const loginIcon = document.getElementById('loginIcon');
  const logoutIcon = document.getElementById('logoutIcon');
  const welcomeMessage = document.getElementById('welcomeMessage');
  const lastConnection = document.getElementById('lastConnection');

  // Verificar si el usuario está autenticado con localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    const { username, lastLogin } = user;

    // Mostrar mensaje de bienvenida y última conexión
    if (welcomeMessage && lastConnection) {
      welcomeMessage.textContent = `Bienvenido, ${username}!`;
      lastConnection.textContent = `Última conexión: ${lastLogin || 'Primera vez en la plataforma.'}`;
    }

    loginIcon.style.display = 'none'; // Ocultar login
    logoutIcon.style.display = 'inline'; // Mostrar logout
  } else {
    loginIcon.style.display = 'inline'; // Mostrar login si no hay sesión
    logoutIcon.style.display = 'none'; // Ocultar logout si no hay sesión
  }

  // Lógica para cerrar sesión
  logoutIcon.addEventListener('click', () => {
    localStorage.removeItem('user'); // Eliminar usuario de localStorage
    window.location.href = 'login.html'; // Redirigir al login
  });
});

// Función para iniciar sesión y redirigir a histologia.html
function iniciarSesion(username) {
  const user = {
    username: username,
    lastLogin: new Date().toLocaleString() // Última conexión
  };

  localStorage.setItem('user', JSON.stringify(user)); // Guardar en localStorage
  window.location.href = 'histologia.html'; // Redirigir a histología
}

// Simular el inicio de sesión desde el botón de login
function handleLogin() {
  const usernameInput = document.getElementById('usernameInput').value; // Suponiendo que tengas un campo de input
  if (usernameInput) {
    iniciarSesion(usernameInput); // Iniciar sesión con el nombre del usuario ingresado
  } else {
    alert('Por favor, ingresa un nombre de usuario.');
  }
}
