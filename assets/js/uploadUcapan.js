// Fungsi untuk mengambil data ucapan dari file JSON
async function getUcapanData() {
  try {
    const response = await fetch('ucapan.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil data ucapan:', error);
    return [];
  }
}

// Fungsi untuk menyimpan data ucapan ke dalam file JSON
async function saveUcapanData(data) {
  try {
    await fetch('ucapan.json', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Terjadi kesalahan saat menyimpan data ucapan:', error);
  }
}

// Fungsi untuk menampilkan daftar ucapan pada section ucapan list
async function displayUcapanList() {
  try {
    const data = await getUcapanData();
    const ucapanList = document.getElementById('ucapan-list');
    ucapanList.innerHTML = '';

    data.forEach(function(ucapan) {
      const ucapanItem = document.createElement('div');
      ucapanItem.classList.add('ucapan-item');
      ucapanItem.innerHTML = `
        <h3>${ucapan.nama}</h3>
        <p>${ucapan.komentar}</p>
        <p class="konfirmasi">Konfirmasi Kehadiran: ${ucapan.konfirmasi ? 'Ya' : 'Tidak'}</p>
      `;
      ucapanList.appendChild(ucapanItem);
    });
  } catch (error) {
    console.error('Terjadi kesalahan saat menampilkan daftar ucapan:', error);
  }
}

// Fungsi untuk mengunggah ucapan baru
async function uploadUcapan(nama, komentar, konfirmasi) {
  try {
    const data = await getUcapanData();
    const newUcapan = {
      id: data.length + 1,
      nama: nama,
      komentar: komentar,
      konfirmasi: konfirmasi
    };
    data.push(newUcapan);
    await saveUcapanData(data);
    return newUcapan;
  } catch (error) {
    console.error('Terjadi kesalahan saat mengunggah ucapan:', error);
    return null;
  }
}

// Event listener untuk form submit
document.getElementById('form-ucapan').addEventListener('submit', async function(e) {
  e.preventDefault();

  const nama = document.getElementById('nama').value;
  const komentar = document.getElementById('komentar').value;
  const konfirmasi = document.getElementById('konfirmasi').checked;

  // Mengunggah ucapan baru
  const ucapan = await uploadUcapan(nama, komentar, konfirmasi);

  if (ucapan) {
    // Mengosongkan form setelah berhasil mengunggah
    document.getElementById('form-ucapan').reset();

    // Menampilkan daftar ucapan terbaru
    await displayUcapanList();
  }
});

// Menampilkan daftar ucapan saat halaman dimuat
document.addEventListener('DOMContentLoaded', displayUcapanList);