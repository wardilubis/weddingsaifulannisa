// Fungsi untuk mengambil nilai parameter dari URL
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Mengambil nilai parameter "nama" dari URL
var nama = getParameterByName('nama');

// Mengisi heading dengan nilai parameter "nama"
if (nama) {
  document.getElementById('nama-undangan').textContent = nama;
}