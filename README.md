<h1 align="center">
	Summer Of Bitcoin 2021 
</h1>

This is my submission for the summer of bitcoin challenge 2021, built using NodeJS (JavaScript).

## Problem Statement

**Summer of Bitcoin 2021** - Challenge - Task 1

**Problem Statement** - The miners (crypto) would like to include the transactions in a block that maximize their total fees. Therefore develope a program to output the transaction id's, separated by newlines, which make a valid block, maximizing the fee to the miner. Transactions MUST appear in order i.e. no transaction should appear before one of its parent teansaction, if any.

## Understanding The Problem Statement

**Keynote 1**: The best way to achieve maximum fees with minimized weight would be by applying Knapsack algorithm for implementating a Greedy based technique.

**Keynote 2**: The transactions are sorted on the basis of the ratio of `fee/weight`.

**Keynote 3**: If there are two transactions having the same `fee/weight` ratio, we can then sort them on the basis of the number of their required parent transactions.

## Evaluating the solution

These instructions will get you a copy of the project up and running on your local machine for testing, evaluation and contribution purposes.

### Prerequisites

The only prerequisites for this project is [NodeJS](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) (Node Package Manager). Hence, before starting please make sure that Node.js (v12.16.0 or above) and NPM (v6.13.4 or above) are installed in your machine.
If not installed already, follow the instructions below:

```bash
# Check if Node.js and NPM is already installed
$ node -v
$ npm -v
```

If respective version numbers are displayed, then they are already installed and you are good to go. Otherwise head over to [Node.js Download Page](https://nodejs.org/en/download/) and [NPM Download instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and download the latest version. Then, to check if installed successfully, follow the above mentioned step.

### Installing and Running project locally

Fork this repository and then clone that to your local machine. Follow the steps given below to run the project locally:

Step 1. **Installing dependencies**: <br> Run `npm install` in the project folder from your terminal to install all project dependencies. <br> <br>
Step 2. **Running code**: <br>Run `node index.js` - It will generate a new `block.txt` file in the `Result` folder containing the processed transactions.

### Final code output

On successful execution of the above listed steps, the following output is obtained:

```
SUCCESS Block created and stored successfully in result folder

Result: In the procesed Block (./result/block.txt)
                Total number of transactions processed: 3,217
                Total weight processed: 3,999,784
                Total fees collected by the miner: 5,817,973 (satoshis)
```
