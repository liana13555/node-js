const fs = require('fs/promises');
const filePath = require('./filePath');

// console.log(__dirname);

const getAll = async () => {
    const data = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(data);
    return products;
}

module.exports = getAll;