const { Web3 } = require('web3');
const contractABI = require('./abi');
const contractConfig = require('./config');


const web3 = new Web3(contractConfig.network);
const contract = new web3.eth.Contract(contractABI, contractConfig.address);

async function callContractFunction(functionName, args = []) {
    try {
        if (typeof contract.methods[functionName] !== 'function') {
            throw new Error(`Function ${functionName} does not exist in the contract`);
        }
        const result = await contract.methods[functionName](...args).call();
        return result;
    } catch (error) {
        console.error(`Error calling contract function ${functionName}:`, error);
        throw error;
    }
}

module.exports = {
    callContractFunction
};