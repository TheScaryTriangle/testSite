import React, { useEffect, useState } from 'react';

//Web3
import { init, getNumber } from '../../web3/initiation';
import { useContractContext } from '../../context/contractContext';
import { useWeb3React } from '@web3-react/core'
import TokenFunctions from '../../web3/TokenFunctions';
import tokenContractABI from '../../web3/contracts/Token.json'

import TokenTransfer from '../../components/TokenTransfer';

/**
 * @dev This is the main dashboard for the site.
 *      Default to this page
 */
const Dashboard = () => {
    const [currentBalance, setCurrentBalance] = useState(0)
    const { setContract, contract } = useContractContext(); // Use the context hook to access setContract
    const { active, chainId, account } = useWeb3React();

    useEffect(() => {
        setup()
    }, []);

    /**
     * @dev Setup gets the contract into context and the user's balance
     * @todo Move the contract saving into another seperate function
     */
    const setup = async () => {
        try {
            const contract = await init(tokenContractABI);
            setContract(contract)
            const userBalance = await TokenFunctions.getBalance(
                contract,
                account
            )
            setCurrentBalance(userBalance.toString());
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <div>Current balance: {currentBalance}</div>
            <TokenTransfer
                currentBalance={currentBalance}
                contract={contract}
                account={account}
            />
        </div>
    )
}

export default Dashboard;