import Web3 from "web3";

export const getBalance = async (contract, address) => {
    try {
        const balance = await contract.methods.balanceOf(address).call();
        return balance;
    } catch (e) {
        return e
    }
};

export const transfer = async ({ contract, to, amount, from }) => {
    try {
        console.log(from)
        const test = await contract.methods.mint(1).send({
            from: from,
            // gas: 1500000,
            // gasPrice: '20000000000'
        })
        // const transferCall = await contract.methods.transfer(
        //     to, 
        //     amount
        // ).send({
        //     from: from,
        //     // gas: 1500000,
        //     // gasPrice: '20000000000'
        // });
        // console.log(transferCall)
        // return transferCall;
        return test
    } catch (e) {
        return e
    }
}

export const mint = async ({ contract, amount, from }) => {
    console.log(contract)
    try {
        const test = await contract.methods.mint(1).send({
            from: from,
            // gas: 1500000,
            // gasPrice: '20000000000'
        })
        return test
    } catch (e) {
        return e
    }
}


export default {
    getBalance,
    transfer,
    mint
}