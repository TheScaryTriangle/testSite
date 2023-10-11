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
            const accountHasVotedCall = await contractObj.methods.hasVoted(await getAccount()).call()

            console.log(accountHasVotedCall)
        } catch (e) {
            console.log(e)
        }
    }

    const sendVote = async (option) => {
        try {
            const account = await getAccount()
            const vote = await contract.methods.vote(0).send({
                from: account,
                // gasPrice: '100000000',
                // gas: '1000000',
            })
            console.log(vote)
        } catch (e) {
            console.log(e)
        }
    }

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
                        <div>
                            Votes: {option.votes.toString()}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}



export default VotingSelection;