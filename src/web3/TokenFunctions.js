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
        console.log(to)
        console.log(amount)
        console.log(from)
        const transferCall = await contract.methods.transfer(
            to, 
            amount
        ).send({
            from: "0x2402d75abb28464C8Fd76ce28215fFc9D8197A85",
            // gas: 1500000,
            // gasPrice: '20000000000'
        });
        console.log(transferCall)
        return transferCall;
    } catch (e) {
        return e
    }
}

export default {
    getBalance,
    transfer,
}