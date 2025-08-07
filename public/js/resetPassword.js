document.getElementById('resetPasswordForm').addEventListener('submit', async e => {
  e.preventDefault();
  const password = e.target.password.value;
  const token = e.target.token.value;

  const res = await fetch('/api/password/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, token })
  });

  const data = await res.json();
  if (data.status === 'success') {
      alert('Contraseña cambiada. Redirigiendo al login...');
      window.location.href = '/login';
    } else {
      alert(data.error || data.message || 'Error al restablecer la contraseña');
    }
  });