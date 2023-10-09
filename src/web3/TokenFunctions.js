export const getBalance = async (contract,address) => {
    try {
        const owner = await contract.methods.balanceOf(address).call();
        return owner;
    } catch (e) {
        return e
    }
};

export const transfer = async (contract, to, amount) => {
    
}

export default {
    getBalance,
}