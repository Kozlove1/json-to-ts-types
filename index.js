#!/usr/bin/env node

const fs = require('fs');

// Путь к исходному JSON файлу
const inputPath = process.argv[2]

// Путь к файлу, в который будет записан тип TypeScript
const outputPath = process.argv[3]

// Имя типа, которое будет задано типу
const typeName = process.argv[4]

// Функция для чтения JSON файла и создания типа
function processJSONFile(inputFilePath, outputTypePath, typeName) {
  // Читаем исходный JSON файл
    fs.readFile(inputFilePath, 'utf8', (err, data) => {
        if (err) {
        console.error('Error reading input JSON file:', err)
        return
        }

        try {
        // Преобразуем содержимое файла в объект JSON
        const jsonData = JSON.parse(data)

        // Получаем плоские ключи с помощью библиотеки flat
        const flattenedData = flattenObject(jsonData)

        // Генерируем тип TypeScript на основе ключей
        const typeDeclaration = generateTypeDeclaration(typeName, flattenedData)

        // Записываем тип TypeScript в новый файл
        fs.writeFile(outputTypePath, typeDeclaration, (err) => {
            if (err) {
            console.error('Error writing TypeScript type file:', err)
            return
            }
            console.log('TypeScript type file created successfully:', outputTypePath)
        })
        } catch (parseError) {
        console.error('Error parsing input JSON file:', parseError)
        }
    })
}

// Функция для генерации типа TypeScript на основе ключей
function generateTypeDeclaration(typeName, data, prefix = '') {
    let declaration = `export type ${typeName} = `
    for (const key in data) {
        const fullKey = prefix ? `${prefix}.${key}` : key
        if (typeof data[key] === 'object' && data[key] !== null) {
        // Рекурсивно обрабатываем вложенные объекты
        declaration += generateTypeDeclaration(typeName, data[key], fullKey)
        } else {
        // Добавляем текущий ключ к объявлению типа
        declaration += `'${fullKey}' | `
        }
    }
    declaration = declaration.slice(0, -3)
    return declaration
}

//Функция для выравнивания объекта в один уровень путем добавления точек к ключам.
function flattenObject(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, key) => {
        const fullKey = prefix ? `${prefix}.${key}` : key
        if (typeof obj[key] === 'object' && obj[key] !== null) {
        const flattenedChild = flattenObject(obj[key], fullKey)
        Object.assign(acc, flattenedChild)
        } else {
        acc[fullKey] = obj[key]
        }
        return acc
    }, {})
}

// Проверка наличия аргументов командной строки
if (!inputPath || !outputPath || !typeName) {
    console.error('Usage: node yourFileName.js <inputPath> <outputPath> <typeName>');
    process.exit(1);
}

processJSONFile(inputPath, outputPath, typeName)
