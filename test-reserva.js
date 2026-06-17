const fetch = require('node-fetch');
async function test() {
  const url = 'https://script.google.com/macros/s/AKfycbypyD3o7hZnLe0p2GMM-Hn5cYZRUV5EB6SvUgtN_L7nVM9y5xeujp6IGZ4XaGtfOVU/exec';
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'reservar', numero: 42, nombre: 'Inteligencia Artificial', telefono: '0800-ROBOT' })
  });
  const text = await res.text();
  console.log(text);
}
test();
