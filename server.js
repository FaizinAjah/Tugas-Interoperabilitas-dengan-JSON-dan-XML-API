const express = require('express');
const bodyParser = require('body-parser');
const xmlbuilder = require('xmlbuilder');
const app = express();
const port = 3001;

// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Sample data film
let films = [
    { id: 1, title: "Inception", director: "Christopher Nolan" },
    { id: 2, title: "Spirited Away", director: "Hayao Miyazaki" },
    { id: 3, title: "The Godfather", director: "Francis Ford Coppola" },
    { id: 4, title: "Parasite", director: "Bong Joon-ho" },
    { id: 5, title: "The Dark Knight", director: "Christopher Nolan" },
];

// Endpoint GET untuk mendapatkan daftar film
app.get('/films', (req, res) => {
    const acceptHeader = req.headers.accept;
    if (acceptHeader && acceptHeader.includes('application/xml')) {
        // Mengubah data menjadi format XML
        const xml = xmlbuilder.create('films');
        films.forEach(film => {
            xml.ele('film', { id: film.id })
                .ele('title', film.title)
                .up()
                .ele('director', film.director)
                .up();
        });
        res.header('Content-Type', 'application/xml');
        res.send(xml.end({ pretty: true }));
    } else {
        // Mengembalikan data dalam format JSON
        res.json(films);
    }
});

// Endpoint POST untuk menambahkan film baru
app.post('/films', (req, res) => {
    console.log(req.body); // Menampilkan isi permintaan
    const newFilm = req.body;
    newFilm.id = films.length + 1; // Menetapkan ID baru
    films.push(newFilm);
    res.status(201).json(newFilm);
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
