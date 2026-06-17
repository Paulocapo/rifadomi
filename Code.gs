// ============================================================
//  RIFA BENÉFICA – SORTEO CORDERO
//  Google Apps Script – Code.gs
//  Publicar como: "Web App" → Acceso: "Cualquier usuario"
// ============================================================

// ─── CONFIGURACIÓN ──────────────────────────────────────────
var SPREADSHEET_ID = '1s_CgvnsSWzRNumOqSZVuvTSL2qRTZ2IPzUPKcOUrqrk';
var SHEET_NAME     = 'Numeros';

// Índices de columnas (base 1 para getRange, base 0 para arrays)
var COL_NUMERO    = 1;
var COL_ESTADO    = 2;
var COL_NOMBRE    = 3;
var COL_TELEFONO  = 4;
var COL_TIMESTAMP = 5;



// ─── GET: Devuelve todos los números con su estado ───────────
function doGet(e) {
  try {
    var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    var data  = sheet.getDataRange().getValues();

    var numbers = [];
    for (var i = 1; i < data.length; i++) { // saltar fila de encabezados
      var row = data[i];
      numbers.push({
        numero:    row[COL_NUMERO - 1],
        estado:    row[COL_ESTADO - 1],
        nombre:    row[COL_NOMBRE - 1]    || '',
        telefono:  row[COL_TELEFONO - 1]  || '',
        timestamp: row[COL_TIMESTAMP - 1] ? String(row[COL_TIMESTAMP - 1]) : ''
      });
    }

    var response = JSON.stringify({ success: true, data: numbers });
    return ContentService.createTextOutput(response)
             .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    var errResponse = JSON.stringify({ success: false, error: err.toString() });
    return ContentService.createTextOutput(errResponse)
             .setMimeType(ContentService.MimeType.JSON);
  }
}

// ─── POST: Maneja reservas y acciones de admin ───────────────
function doPost(e) {
  try {
    var params = JSON.parse(e.postData.contents);
    var action = params.action || 'reservar';

    switch (action) {
      case 'reservar':
        return handleReservar(params);
      case 'confirmar':
        return handleConfirmar(params);
      case 'liberar':
        return handleLiberar(params);
      default:
        return jsonResponse({ success: false, error: 'Acción desconocida: ' + action });
    }

  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

// ─── ACCIÓN: Reservar un número ──────────────────────────────
function handleReservar(params) {
  var numero   = parseInt(params.numero);
  var nombre   = params.nombre   || '';
  var telefono = params.telefono || '';

  if (numero === undefined || numero === null || isNaN(numero) || !nombre || !telefono) {
    return jsonResponse({ success: false, error: 'Faltan datos obligatorios.' });
  }

  var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  var row   = findRow(sheet, numero);

  if (!row) {
    return jsonResponse({ success: false, error: 'Número no encontrado.' });
  }

  var currentState = sheet.getRange(row, COL_ESTADO).getValue();
  if (currentState !== 'Libre') {
    return jsonResponse({ success: false, error: 'El número ya está ' + currentState + '.' });
  }

  // Escribir datos y cambiar estado
  sheet.getRange(row, COL_ESTADO).setValue('Reservado');
  sheet.getRange(row, COL_NOMBRE).setValue(nombre);
  sheet.getRange(row, COL_TELEFONO).setValue(telefono);
  sheet.getRange(row, COL_TIMESTAMP).setValue(new Date().toLocaleString('es-AR'));

  return jsonResponse({ success: true, message: 'Número ' + numero + ' reservado exitosamente.' });
}

// ─── ACCIÓN: Confirmar pago (Reservado → Vendido) ────────────
function handleConfirmar(params) {
  var numero = parseInt(params.numero);
  if (numero === undefined || numero === null || isNaN(numero)) return jsonResponse({ success: false, error: 'Número inválido.' });

  var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  var row   = findRow(sheet, numero);

  if (!row) return jsonResponse({ success: false, error: 'Número no encontrado.' });

  var currentState = sheet.getRange(row, COL_ESTADO).getValue();
  if (currentState !== 'Reservado') {
    return jsonResponse({ success: false, error: 'El número no está en estado Reservado.' });
  }

  sheet.getRange(row, COL_ESTADO).setValue('Vendido');
  return jsonResponse({ success: true, message: 'Pago confirmado para número ' + numero + '.' });
}

// ─── ACCIÓN: Liberar un número ───────────────────────────────
function handleLiberar(params) {
  var numero = parseInt(params.numero);
  if (numero === undefined || numero === null || isNaN(numero)) return jsonResponse({ success: false, error: 'Número inválido.' });

  var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  var row   = findRow(sheet, numero);

  if (!row) return jsonResponse({ success: false, error: 'Número no encontrado.' });

  sheet.getRange(row, COL_ESTADO).setValue('Libre');
  sheet.getRange(row, COL_NOMBRE).setValue('');
  sheet.getRange(row, COL_TELEFONO).setValue('');
  sheet.getRange(row, COL_TIMESTAMP).setValue('');

  return jsonResponse({ success: true, message: 'Número ' + numero + ' liberado.' });
}

// ─── UTILIDAD: Encontrar fila por número ────────────────────
function findRow(sheet, numero) {
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (parseInt(data[i][COL_NUMERO - 1]) === numero) {
      return i + 1; // +1 porque getRange es base 1
    }
  }
  return null;
}

// ─── UTILIDAD: Crear respuesta JSON ──────────────────────────
function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
           .setMimeType(ContentService.MimeType.JSON);
}

// ─── INICIALIZACIÓN: Poblar el Sheet con los 100 números ─────
// Ejecutar UNA SOLA VEZ desde el editor de Apps Script
function initSheet() {
  var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // Limpiar todo
  sheet.clearContents();

  // Encabezados
  sheet.getRange(1, 1, 1, 5).setValues([['Numero', 'Estado', 'Nombre', 'Telefono', 'Timestamp']]);

  // Formatear encabezados
  var headerRange = sheet.getRange(1, 1, 1, 5);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4a148c');
  headerRange.setFontColor('#ffffff');

  // Poblar 100 filas
  var rows = [];
  for (var i = 1; i <= 100; i++) {
    rows.push([i, 'Libre', '', '', '']);
  }
  sheet.getRange(2, 1, 100, 5).setValues(rows);

  // Formato condicional: Libre=verde, Reservado=amarillo, Vendido=rojo
  var dataRange = sheet.getRange(2, 1, 100, 5);

  // Auto-ajustar columnas
  sheet.autoResizeColumns(1, 5);

  SpreadsheetApp.flush();
  Logger.log('✅ Sheet inicializado con 100 números.');
}
