JSON to TypeScript Type Generator
=============

This npm package allows you to generate TypeScript type declarations from JSON data with customizable type names.

Installation
=============
Using npm:

npm install --save-dev json-to-ts-types

npm install -g json-to-ts-types

Using yarn:

yarn add --dev package-name

yarn global add json-to-ts-types

Usage
=============
After installing the package globally, you can use it from any directory on your system.

Run the package with the following command:


jttt <inputPath> <outputPath> <typeName>

Replace <inputPath> with the path to the input JSON file, <outputPath> with the desired path for the TypeScript type file to be generated, and <typeName> with the name you want to assign to the TypeScript type.

Example
=============

Suppose you have a JSON file named data.json containing the following data:


{
  "name": "Robert Anthony Plant",
  "age": 75,
  "address": {
    "city": "West Bromwich",
    "country": "Great Britain"
  }
}
To generate a TypeScript type declaration for this data, run the following command:


jttt data.json types.ts LedZeppelin

This will create a TypeScript file named types.ts with the following type declaration:


export type LedZeppelin = 'name' | 'age' | 'address.city' | 'address.country';

Notes
=============

Ensure that Node.js is installed on your system.
You must have appropriate permissions to execute the script and read/write files in the specified directories.