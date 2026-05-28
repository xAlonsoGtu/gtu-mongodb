// Importamos librerias
import * as fs from "fs";
import Excel from 'exceljs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

//Obtenemmos url actual y directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePathOrig = path.join(__dirname, '..', '..');
const filePath = path.join(filePathOrig, 'temp');

//Creamos nuevo objeto repository
const XlsService = {}

// Función para escribir xls
async function writeXls(){
    // Declaramos nombre del archivo y ubicación final
    var name = "Movies_" + Date.now() + ".xlsx";
    const exportPath = path.resolve(filePath, name);

    try{
        // Creamos objeto excel
        const workbook = new Excel.Workbook();

        // Agregamos hoja de trabajo
        const worksheet = workbook.addWorksheet('Peliculas');

        // Definimos las columnas del archivo
        const countriesColumns = [
            { key: 'title', header: 'Titulo'},
            { key: 'year', header: 'Año' }
        ];

        // Agregamos encabezados en la hoja de trabajo
        worksheet.columns = countriesColumns;

        // Agregamos filas de datos en la hoja de trabajo
        worksheet.addRow({ title: 'Película 1', year: 1950 });
        worksheet.addRow({ title: 'Película 2', year: 1951 });
        
        // Guardamos archivo excel en la ubicación indicada
        await workbook.xlsx.writeFile(exportPath);
    }catch(e){
        console.log(e);
    }

    return name;
}

// Función para leer xls
async function readXls(filename) {
    // Declaramos lista
    var aData = new Array();

    // Declaramos ubicación del archivo
    const importPath = path.resolve(filePath, filename);
    
    try{
        // Iniciamos objeto Excel
        const workbook = new Excel.Workbook();

        // Leemos archivo
        await workbook.xlsx.readFile(importPath);
        
        // Obtenemos la primera hoja
        const worksheet = workbook.getWorksheet(1); 

        // Iteramos sobre las filas
        worksheet.eachRow((row, rowNumber) => {
            console.log(`Fila ${rowNumber}:`, row.values);

            // Agregamos fila al arreglo
            aData.push(row.values);
        });        
    }catch(e){
        console.log(e);
    }

    return aData;
}

XlsService.exportar = async() => {
    // Ejecutamos función para escribir
    var result = await writeXls();
    return result;
}


XlsService.importar = async(fileName) => {
    // Ejecutamos función para leer
    var result = await readXls(fileName);
    return result;
}

export default XlsService;