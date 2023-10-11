import Web3 from 'web3'

let contract;
let isInitialized = false;

/**
 * @dev This is used to initalise the contract and get the contract object
 * @todo Pass the contract JSON to the function instead of importing here
 * @returns Contract The contract object
 */
export const init = async (contractABI, altAddress) => {
    let provider = window.ethereum;
    // const web3 = new Web3(provider);
    const web3 = new Web3("HTTP://127.0.0.1:7545");
    console.log(web3)

    let contractAddress;

    if (altAddress) {
        contractAddress = altAddress; // Use the altAddress if provided
    } else {
        const networkId = await web3.eth.net.getId();
        contractAddress = contractABI.networks[1337].address;
        console.log(contractAddress)
    }

    // Check if the contract exists on the network here
    contract = new web3.eth.Contract(contractABI.abi, contractAddress);
    isInitialized = true;
    console.log(contract)
    return contract;
};

export const getAccount = async () => {
    let provider = window.ethereum;
    let selectedAccount;

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
    return selectedAccount
}


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