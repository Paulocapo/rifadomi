async function test() {
  const url = 'https://script.google.com/macros/s/AKfycbxjuu3UuJUEAwsi34cszPPBxGkO3Yk-Oqhv84TpQi8DnZeHdMgm5qJrjFzYmgp9LkQ/exec';

  console.log("Testing confirmar...");
  let res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action: 'confirmar', numero: 1 })
  });
  console.log("Confirmar response:", await res.text());

  console.log("Testing liberar...");
  res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action: 'liberar', numero: 1 })
  });
  console.log("Liberar response:", await res.text());
}
test();
