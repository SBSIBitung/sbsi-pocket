function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('SBSI Pocket - DPC Kota Bitung')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function prosesAudit(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0]; // Mengambil sheet pertama
  
  // Logika Perhitungan (Masa Kerja x 12 bulan untuk gaji)
  var selisihGaji = (Number(data.umk) - Number(data.gaji)) * (Number(data.masaKerja) * 12);
  var selisihThr = (Number(data.umk) * Number(data.masaKerja)) - Number(data.thrDiterima);
  var selisihKomp = (Number(data.umk) * Number(data.masaKerja)) - Number(data.kompDiterima);
  var totalTuntutan = selisihGaji + selisihThr + selisihKomp;
  
  sheet.appendRow([new Date(), data.nama, data.masaKerja, selisihGaji, selisihThr, selisihKomp, totalTuntutan]);
  
  return {
    gaji: selisihGaji.toLocaleString('id-ID'),
    thr: selisihThr.toLocaleString('id-ID'),
    komp: selisihKomp.toLocaleString('id-ID'),
    total: totalTuntutan.toLocaleString('id-ID')
  };
}
