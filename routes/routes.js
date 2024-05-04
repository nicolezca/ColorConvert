const express = require('express');
const router = express.Router();
const colorConvert = require('color-convert');

router.get('/', (req, res) => {
    res.render('index', { result: null });
});

router.post('/color', (req, res) => {
    let { color, fromFormat, toFormat } = req.body;
    let rgb = null;

    // Verificar si el formato de origen es hexadecimal
    if (fromFormat === 'hex') {
        // Eliminar el carácter "#" del color y convertirlo a RGB
        color = color.replace('#', '');
        color = color.match(/.{1,2}/g).map(val => parseInt(val, 16));
        fromFormat = 'rgb';
        rgb = color;
    } else if (fromFormat === 'hsl' || fromFormat === 'hsv' || fromFormat === 'cmyk' || fromFormat === 'lab' || fromFormat === 'xyz') {
        // Si el formato de origen es HSL, HSV, CMYK, LAB o XYZ, convertirlo a RGB
        color = color.split(',').map(val => parseFloat(val));
        rgb = colorConvert[fromFormat].rgb(color);
        fromFormat = 'rgb';
    } else {
        // Si el formato de origen no es hexadecimal, dividir el color en sus componentes
        color = color.split(',').map(val => parseFloat(val));
        rgb = color;
    }

    // Verificar si el formato de origen es válido
    if (!(fromFormat in colorConvert)) {
        console.log('Formato de origen:', fromFormat);
        return res.status(400).send('Formato de origen no válido');
    }

    const results = {};

    if (toFormat) {
        // Si se especifican formatos de destino, convertir el color a esos formatos
        if (Array.isArray(toFormat)) {
            // Si toFormat es un array, iterar sobre cada formato de destino
            toFormat.forEach(format => {
                if (format === 'rgb') {
                    // Si el formato de destino es "rgb", guardar el color en results
                    results[format] = rgb;
                } else if (format in colorConvert[fromFormat]) {
                    // Si el formato de destino es válido, realizar la conversión
                    results[format] = colorConvert[fromFormat][format](rgb);
                } else {
                    console.log('Formato de destino no válido:', format);
                }
            });
        } else {
            // Si toFormat es un solo formato, convertir el color a ese formato
            if (toFormat === 'rgb') {
                // Si el formato de destino es "rgb", guardar el color en results
                results[toFormat] = rgb;
            } else if (toFormat in colorConvert[fromFormat]) {
                // Si el formato de destino es válido, realizar la conversión
                results[toFormat] = colorConvert[fromFormat][toFormat](rgb);
            } else {
                console.log('Formato de destino no válido:', toFormat);
            }
        }
    }

    res.render('index', { result: results, rgb: rgb });
});

module.exports = router;
