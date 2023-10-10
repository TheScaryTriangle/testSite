import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

//Web3
import { init, getAccount } from '../../web3/initiation';
import votingContractAPI from '../../web3/contracts/Voting.json'

/**
 * @dev This is the main dashboard for the site.
 *      Default to this page
 */
const VotingSelection = () => {
    const [votingOptions, setVotingOptions] = useState([])
    const [contract, setContract] = useState(null)

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const contractAddress = queryParams.get('address');

    useEffect(() => {
        setup()
    }, []);

    /**
     * @dev Setup gets the contract into context and the user's balance
     * @todo Move the contract saving into another seperate function
     */
    const setup = async () => {
        try {
            const contractObj = await init(votingContractAPI);
            setContract(contractObj)
            const choicesCall = await contractObj.methods.getAllChoices().call()
            setVotingOptions(choicesCall)
        } catch (e) {
            console.log(e)
        }
    }

    const sendVote = async (option) => {
        try {
            console.log(votingOptions[option])
            const account = await getAccount()
            console.log(await getAccount())
            contract.methods.vote(0).send({
                from: await getAccount(),
                // gasPrice: '100000000',
                // gas: '1000000',
            })
        } catch (e) {
            console.log(e)
        }
    }
    console.log(contract)

    return (
        <div>
            <h2>Options:</h2>
            {votingOptions.map((option, i) => {
                return (
                    <div key={i}>
                        {option.name}
                        <button
                            type="button"
                            onClick={() => sendVote(i)}
                        >
                            Click Me
                        </button>
                    </div>
                );
            })}
        </div>
    )
}



export default VotingSelection;