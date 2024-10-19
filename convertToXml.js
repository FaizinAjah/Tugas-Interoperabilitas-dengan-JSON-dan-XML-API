const axios = require('axios');
const xmlbuilder = require('xmlbuilder');

// URL API yang ingin diambil
const apiUrl = 'http://localhost:3001/films';

// Fungsi untuk mengambil data dari API dan mengubahnya menjadi XML
async function fetchAndConvertToXml() {
    try {
        // Mengambil data dari API JSON
        const response = await axios.get(apiUrl);
        const films = response.data;

        // Membuat XML dari data JSON
        const xml = xmlbuilder.create('films');
        films.forEach(film => {
            xml.ele('film', { id: film.id })
                .ele('title', film.title)
                .up()
                .ele('director', film.director)
                .up();
        });

        // Menyimpan hasil XML ke dalam file (opsional)
        console.log(xml.end({ pretty: true }));
        
        // Jika ingin menyimpan ke file XML, gunakan fs (File System)
        const fs = require('fs');
        fs.writeFileSync('films.xml', xml.end({ pretty: true }));

    } catch (error) {
        console.error('Error fetching data from API:', error.message);
    }
}

// Memanggil fungsi
fetchAndConvertToXml();
