function showAlert(message, type = 'success') {
  const alertPlaceholder = document.getElementById('alertPlaceholder');
  alertPlaceholder.innerHTML = `
    <div class="alert alert-${type}" role="alert">
      ${message}
    </div>
  `;
  setTimeout(() => {
    alertPlaceholder.innerHTML = '';
  }, 3000);
}

// Registro
document.getElementById('registerForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const user = Object.fromEntries(formData);

  try {
    const res = await fetch('/api/sessions/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    const data = await res.json();

    if (data.status === 'success') {
      const container = document.querySelector('main');
        container.innerHTML = `
          <div class="alert alert-warning text-center">
            <h4 class="mb-3">Usuario registrado</h4>
            <h5 class="mb-3">Bienvenido ${user.email}</h5>
            <p class="form-link"><a href="/login">Inicia sesión aquí</a></p>
          </div>
        `;  
      setTimeout(() => {
        window.location.href = '/login';
      }, 5500);
    } else {
      showAlert('Error: ' + data.error, 'danger');
    }
  } catch (err) {
    showAlert('Error inesperado durante el registro.', 'danger');
  }
});

// Login
document.getElementById('loginForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const user = Object.fromEntries(formData);

  const res = await fetch('/api/sessions/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
    credentials: 'include'
  });
  console.log('Respuesta del servidor:', res);

  const data = await res.json();

  if (data.token) {
    localStorage.setItem('token', data.token);
    document.cookie = `token=${data.token}; path=/; SameSite=Lax;`;
  
    window.location.href = '/cart';
  } else {
    const container = document.querySelector('main');
    container.innerHTML = `
      <div class="alert alert-warning text-center">
        <h4 class="mb-3">Usuario no registrado</h4>
        <p class="form-link"><a href="/login">Iniciar sesión</a></p>
        <p class="form-link">¿No tenés cuenta? <a href="/register">Registrate</a></p>
      </div>
    `;
    return;
  }
});

async function loadUser() {
  const token = localStorage.getItem('token');
  if (!token) {
    showNotLoggedInMessage();
    return;
  }
  try {
    const res = await fetch('/api/sessions/current', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    if (!res.ok) {
      showNotLoggedInMessage();
      return;
    }
    const data = await res.json();
    if (data.user) {
      const { email, first_name, last_name, age, role } = data.user;
      document.getElementById('user-info')?.classList.remove('d-none');
      document.getElementById('userEmail').innerText = 'Email: ' + email;
      document.getElementById('userName').innerText = 'Nombre: ' + first_name + ' ' + last_name;
      document.getElementById('userAge').innerText = 'Edad: ' + age;
      document.getElementById('userRole').innerText = 'Rol: ' + role;
    } else {
      showNotLoggedInMessage();
    }
  } catch (err) {
    showNotLoggedInMessage();
  }
}
const loadCart = async (cartId, token) => {
  const res = await fetch(`/api/cart/${cartId}`, {
    headers: { Authorization: 'Bearer ' + token }
  });
  const data = await res.json();
};

function showNotLoggedInMessage() {
  const container = document.querySelector('main');
  container.innerHTML = `
    <div class="alert alert-warning text-center">
      <h4 class="mb-3">Usuario no logueado</h4>
      <p class="form-link"><a href="/login">Iniciar sesión</a></p>
      <p class="form-link">¿No tenés cuenta? <a href="/register">Registrate</a></p>
    </div>
    `;
} 

// Logout
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  window.location.href = '/logout';
});

window.onload = () => {
  if (window.location.pathname === '/profile') {
    loadUser();
  }
};