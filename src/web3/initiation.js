import Web3 from 'web3'

let selectedAccount;
let contract;
let isInitialized = false;

/**
 * @dev This is used to initalise the contract and get the contract object
 * @todo Pass the contract JSON to the function instead of importing here
 * @returns Contract The contract object
 */
export const init = async (contractABI) => {
    let provider = window.ethereum;

    if (typeof provider !== 'undefined') {

        await provider
            .request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                selectedAccount = accounts[0];
            })
            .catch((err) => {
                console.log(err);
            });
        window.ethereum.on('accountsChanged', function (accounts) {
            selectedAccount = accounts[0];
            console.log(`Selected account changed to ${selectedAccount}`);
        });
    }
    const web3 = new Web3(provider);

    //await web3.eth.net.getId()
    const networkId = await web3.eth.net.getId();
    //Check if the contract exists on the network here
    
    contract = await new web3.eth.Contract(contractABI.abi, contractABI.networks[networkId].address);
    isInitialized = true;
    return contract
};

/**
 * @todo Remove this function from this file 
 */
export const getNumber = async () => {
    if (!isInitialized) {
        await init();
    }
    try {
        const number = await contract.methods
            .getSecretNumber()
            .call()
        return number
    } catch (e) {
        console.log(e)
        return 0
    }
}

export default contract