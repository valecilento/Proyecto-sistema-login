document.getElementById('forgotForm').addEventListener('submit', async e => {
  e.preventDefault();
  const email = e.target.email.value;
  const res = await fetch('/api/password/request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  const data = await res.json();
  alert(data.message || 'Revisá la consola para el link');
});