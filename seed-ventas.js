

const URL = 'https://script.google.com/macros/s/AKfycbxjuu3UuJUEAwsi34cszPPBxGkO3Yk-Oqhv84TpQi8DnZeHdMgm5qJrjFzYmgp9LkQ/exec';

async function seed() {
  const TOTAL_TO_SEED = 970;
  const CONCURRENCY = 15; // Google Apps Script allows up to 30 concurrent connections
  
  console.log(`Comenzando a cargar ${TOTAL_TO_SEED} ventas de prueba...`);
  
  // Vamos a elegir números al azar para no tener todos seguidos (o podemos hacerlo secuencial del 1 al 970)
  // Lo haremos secuencial para asegurar que se llenan
  
  let current = 1;
  
  while (current <= TOTAL_TO_SEED) {
    const batch = [];
    
    for (let i = 0; i < CONCURRENCY && current <= TOTAL_TO_SEED; i++) {
      const numero = current;
      const nombre = `Test Usuario ${numero}`;
      const telefono = `11223344${numero}`;
      
      const req = fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'reservar', numero, nombre, telefono })
      }).then(res => res.json())
        .then(data => {
          if (data.success) {
            console.log(`✅ Número ${numero} reservado.`);
            // Opcional: confirmar pago para que figure como Vendido (puedes descomentar la siguiente parte)
            
            return fetch(URL, {
              method: 'POST',
              headers: { 'Content-Type': 'text/plain;charset=utf-8' },
              body: JSON.stringify({ action: 'confirmar', numero })
            }).then(r => r.json()).then(d => {
               if(d.success) console.log(`💰 Número ${numero} vendido.`);
               else console.log(`⚠️ Error confirmando número ${numero}:`, d.error);
            });
            
          } else {
            console.log(`⚠️ Error en número ${numero}:`, data.error);
          }
        })
        .catch(err => console.log(`❌ Error de red en número ${numero}:`, err));
        
      batch.push(req);
      current++;
    }
    
    // Esperar a que termine el lote actual
    await Promise.all(batch);
  }
  
  console.log('✅ Carga de ventas finalizada. Puedes probar la app.');
}

seed();
