/**
 * Google Apps Script para recibir leads y guardarlos en Google Sheets.
 *
 * Pasos:
 * 1) Crea una hoja de cálculo y abre Extensiones > Apps Script.
 * 2) Pega este archivo completo.
 * 3) Reemplaza SHEET_NAME si quieres otro nombre.
 * 4) Deploy > New deployment > Web app.
 * 5) Execute as: Me. Who has access: Anyone.
 * 6) Copia la URL y pégala en assets/js/config.js.
 */

const SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    const payload = JSON.parse(e.postData.contents || '{}');

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Fecha', 'Nombre', 'Empresa', 'Email', 'Telefono', 'Mensaje']);
    }

    sheet.appendRow([
      payload.Fecha || '',
      payload.Nombre || '',
      payload.Empresa || '',
      payload.Email || '',
      payload.Telefono || '',
      payload.Mensaje || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
