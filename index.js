const fs = require('fs');
const csv = require('@fast-csv/parse');

csv.parseFile('./data/mempool.csv', {skipLines: 1, headers: false})
    .on('data', row => {
        const feesToWeight = Number(row[1] / row[2]);
        const parentTransactions = row[3].split(';');
       
        const currentTransaction = [feesToWeight, row[0], Number(row[1]), Number(row[2]), parentTransactions];
    });