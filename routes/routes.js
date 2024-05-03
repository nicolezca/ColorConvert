// routes.js
const express = require('express');
const router = express.Router();
const colorConvert = require('color-convert');

router.get('/', (req, res) => {
    res.render('index', { result: null });
});

router.post('/color', (req, res) => {
    const colorInput = req.body.color;

    // Intentar analizar los valores ingresados
    let colorValues;
    if (colorInput.startsWith("#")) {
        // Si la entrada comienza con "#" asumimos que es un valor hexadecimal
        colorValues = colorConvert.hex.rgb(colorInput); // Convertir a RGB
    } else if (colorInput.startsWith("rgba")) {
        colorValues = colorInput.match(/\d+(\.\d+)?/g).map(Number); // Analizar RGBA
    } else {
        colorValues = colorInput.split(',').map(value => parseFloat(value.trim())); // Analizar otros formatos
    }

    // Verificar si se ingresaron suficientes valores para determinar el formato
    if (colorValues.length === 3) {
        // Si hay tres valores, asumimos que es RGB
        const rgb = colorValues;
        const hsl = colorConvert.rgb.hsl(...rgb);
        const hsv = colorConvert.rgb.hsv(...rgb);
        const cmyk = colorConvert.rgb.cmyk(...rgb);
        const lab = colorConvert.rgb.lab(...rgb); // Convertir a LAB
        const xyz = colorConvert.rgb.xyz(...rgb); // Convertir a XYZ
        const hex = colorConvert.rgb.hex(...rgb); // Convertir a Hexadecimal
        const result = { rgb: rgb, hsl: hsl, hsv: hsv, cmyk: cmyk, lab: lab, xyz: xyz, hex: hex };
        return res.render('index', { result: result });
    } else if (colorValues.length === 4) {
        // Si hay cuatro valores, puede ser RGBA o CMYK
        if (colorInput.startsWith("rgba")) {
            // Si la entrada comienza con "rgba", asumimos que es RGBA
            const rgba = colorValues;
            const rgb = rgba.slice(0, 3); // Extraer RGB de RGBA
            const hsl = colorConvert.rgb.hsl(...rgb);
            const hsv = colorConvert.rgb.hsv(...rgb);
            const cmyk = colorConvert.rgb.cmyk(...rgb);
            const lab = colorConvert.rgb.lab(...rgb); // Convertir a LAB
            const xyz = colorConvert.rgb.xyz(...rgb); // Convertir a XYZ
            const hex = colorConvert.rgb.hex(...rgb); // Convertir a Hexadecimal
            const result = { rgb: rgb, hsl: hsl, hsv: hsv, cmyk: cmyk, lab: lab, xyz: xyz, rgba: rgba, hex: hex };
            return res.render('index', { result: result });
        } else {
            // De lo contrario, asumimos que es CMYK
            const cmyk = colorValues;
            const rgb = colorConvert.cmyk.rgb(...cmyk);
            const hsl = colorConvert.rgb.hsl(...rgb);
            const hsv = colorConvert.rgb.hsv(...rgb);
            const lab = colorConvert.rgb.lab(...rgb); // Convertir a LAB
            const xyz = colorConvert.rgb.xyz(...rgb); // Convertir a XYZ
            const hex = colorConvert.rgb.hex(...rgb); // Convertir a Hexadecimal
            const result = { rgb: rgb, hsl: hsl, hsv: hsv, cmyk: cmyk, lab: lab, xyz: xyz, hex: hex };
            return res.render('index', { result: result });
        }
    } else if (colorValues.length === 6) {
        // Si hay seis valores, asumimos que es RGB
        const rgb = colorValues.slice(0, 3);
        const hsl = colorConvert.rgb.hsl(...rgb);
        const hsv = colorConvert.rgb.hsv(...rgb);
        const cmyk = colorConvert.rgb.cmyk(...rgb);
        const lab = colorConvert.rgb.lab(...rgb); // Convertir a LAB
        const xyz = colorConvert.rgb.xyz(...rgb); // Convertir a XYZ
        const hex = colorConvert.rgb.hex(...rgb); // Convertir a Hexadecimal
        const result = { rgb: rgb, hsl: hsl, hsv: hsv, cmyk: cmyk, lab: lab, xyz: xyz, hex: hex };
        return res.render('index', { result: result });
    } else if (colorValues.length === 5) {
        // Si hay cinco valores, asumimos que es HSL o HSV
        // Esto es porque HSL y HSV tienen solo tres componentes, pero CMYK tiene cuatro
        // Entonces, si hay cinco componentes, determinamos si es HSL o HSV
        const saturation = colorValues[1];
        const lightnessValue = colorValues[2];
        const saturationIsPercentage = saturation >= 0 && saturation <= 100;
        const lightnessIsPercentage = lightnessValue >= 0 && lightnessValue <= 100;
        if (saturationIsPercentage && lightnessIsPercentage) {
            // Si el segundo y tercer valores están en el rango de 0 a 100, asumimos que es HSL
            const hsl = colorValues;
            const rgb = colorConvert.hsl.rgb(...hsl);
            const hsv = colorConvert.rgb.hsv(...rgb);
            const cmyk = colorConvert.rgb.cmyk(...rgb);
            const lab = colorConvert.rgb.lab(...rgb); // Convertir a LAB
            const xyz = colorConvert.rgb.xyz(...rgb); // Convertir a XYZ
            const hex = colorConvert.rgb.hex(...rgb); // Convertir a Hexadecimal
            const result = { rgb: rgb, hsl: hsl, hsv: hsv, cmyk: cmyk, lab: lab, xyz: xyz, hex: hex };
            return res.render('index', { result: result });
        } else {
            // De lo contrario, asumimos que es HSV
            const hsv = colorValues;
            const rgb = colorConvert.hsv.rgb(...hsv);
            const hsl = colorConvert.rgb.hsl(...rgb);
            const cmyk = colorConvert.rgb.cmyk(...rgb);
            const lab = colorConvert.rgb.lab(...rgb); // Convertir a LAB
            const xyz = colorConvert.rgb.xyz(...rgb); // Convertir a XYZ
            const hex = colorConvert.rgb.hex(...rgb); // Convertir a Hexadecimal
            const result = { rgb: rgb, hsl: hsl, hsv: hsv, cmyk: cmyk, lab: lab, xyz: xyz, hex: hex };
            return res.render('index', { result: result });
        }
    } else {
        // Si no hay suficientes valores, mostrar un mensaje de error
        return res.render('index', { result: null });
    }
});

module.exports = router;
