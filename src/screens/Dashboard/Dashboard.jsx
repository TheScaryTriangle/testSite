import React, { useEffect, useState } from 'react';
import { init, getNumber } from '../../web3/initiation';
import { useContractContext } from '../../context/contractContext';
import { getOwner } from '../../web3/owner';

import TokenFunctions from '../../web3/TokenFunctions';

import tokenContractABI from '../../web3/contracts/Token.json'

const Dashboard = () => {
    const [currentBalance, setCurrentBalance] = useState(0)
    const { setContract, contract } = useContractContext(); // Use the context hook to access setContract

    useEffect(() => {
        setup()
    }, []);

    const setup = async () => {
        try {
            const contract = await init(tokenContractABI);
            setContract(contract)
            const userBalance = await TokenFunctions.getBalance(
                contract,
                "0x2402d75abb28464C8Fd76ce28215fFc9D8197A85"
            )
            console.log(userBalance.toString())
            setCurrentBalance(userBalance.toString());
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            Current balance: {currentBalance}
        </div>
    )
}

export default Dashboard;