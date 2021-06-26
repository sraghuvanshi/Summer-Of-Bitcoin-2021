const fs = require('fs');
const csv = require('@fast-csv/parse');
const chalk = require('chalk');

var transactions = [];

// parsing csv files with all transactions
csv.parseFile('./data/mempool.csv', {skipLines: 1, headers: false})
    .on('data', row => {
        // Introducing a new parameter - feesToWeight - for sorting transactions in reference to greedy approach
        const feesToWeight = Number(row[1] / row[2]);

        const parent_txids = row[3].split(';');

         // Data structure - transactions - [ratio, txn_id, fees, weight, parent_txn[]]
        transactions.push([feesToWeight, row[0], Number(row[1]), Number(row[2]), parent_txids]);  
    })
    .on('end', () => {
        // Declaring variables
        var writeStream = fs.createWriteStream('./result/block.txt');
        var processedTxns = {};
        var currentWeight = 0;
        var processedEntries = 0;
        var totalFees = 0;

        // Sorting transactions on the basis of fee to weight ratio
        transactions = transactions.sort(function (tA, tB) {
            // If ratio is same
            if(tA[0] === tB[0]) {
                return tA[4].size - tB[4].size;
            }
            return tB[0] - tA[0];
        });
        
        // Traversing and greedily selecting the valid transactions
        transactions.forEach((row) => {  
            //skip if weight exceeds limit
            if(currentWeight + row[3] > 4000000) {
                return;
            }

            // checking if all parents have been validated
            var ParentsProcessed = 1;
            if(row[4].size > 0) {
                row[4].forEach((txn_id) => {
                 
                    if(!processed.hasOwnProperty(txn_id)) {
                        ParentsProcessed = 0;
                        return;
                    }
                })
            }

            // skip if any of the parent transaction is incomplete
            if(!ParentsProcessed) {
                return;
            }

            // storing results
            processedTxns[row[1]] = 1;
            processedEntries += 1;
            currentWeight += row[3];
            totalFees += row[2];
            writeStream.write(`${row[1]}\n`);
        });
        console.log(chalk.bgGreen.black('\nSUCCESS') + 
        chalk.italic(" Block created and stored successfully in ") + 
        chalk.underline.italic.bold('result') + 
        chalk.italic(" folder"));

        // Log the results
        // used chalk module for better representation
        console.log(chalk.bgCyan.black('\nResult:') + 
        " In the procesed Block " +  
        chalk.dim("(./result/block.txt)") +
        "\n\t\tTotal number of transactions processed: " + 
        chalk.green(`${processedEntries.toLocaleString()}`) +
        "\n\t\tTotal weight processed: " +
        chalk.green(`${currentWeight.toLocaleString()}`) +
        "\n\t\tTotal fees collected by the miner: " +
        chalk.green(`${totalFees.toLocaleString()}`) +
        " (satoshis)\n");

        writeStream.end();
    });