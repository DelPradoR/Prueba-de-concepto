const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs'); // Módulo para manejar archivos

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Ruta para cargar alertas desde el archivo JSON
let alerts = [];
const loadAlertsFromFile = () => {
    if (fs.existsSync('alerts.json')) {
        const data = fs.readFileSync('alerts.json');
        alerts = JSON.parse(data);
    }
};

// Cargar alertas al inicio del servidor
loadAlertsFromFile();

// Ruta para crear una nueva alerta
app.post('/api/alertas', (req, res) => {
    const { message } = req.body;
    const newAlert = { message, createdAt: new Date() };
    alerts.push(newAlert); // Agregar alerta al arreglo
    fs.writeFileSync('alerts.json', JSON.stringify(alerts)); // Guardar en archivo JSON
    res.status(201).json(newAlert); // Responder con la nueva alerta
});

// Ruta para obtener todas las alertas
app.get('/api/alertas', (req, res) => {
    res.json(alerts); // Devolver el arreglo de alertas
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});