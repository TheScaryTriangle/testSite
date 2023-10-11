import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

//Web3
import { init } from '../../web3/initiation';
import votingContractAPI from '../../web3/contracts/VotingControler.json'

/**
 * @dev This is the main dashboard for the site.
 *      Default to this page
 */
const Voting = () => {
    const [votes, setVotes] = useState([])

    useEffect(() => {
        setup()
    }, []);

    /**
     * @dev Setup gets the contract into context and the user's balance
     * @todo Move the contract saving into another seperate function
     */
    const setup = async () => {
        try {
            const controlerContract = await init(votingContractAPI, "0xE9282835Cf02C6f95EcBffFea8b16B6Ab7A1C068");
            const contracts = await controlerContract.methods.getAllVotingContracts().call()
            setVotes(contracts)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            {votes.map((contract, i) => {
                return (
                    <div key={i}>
                        <VoteSelection contractData={contract} />
                    </div>
                )
            })}
        </div>
    )
}

const VoteSelection = ({ contractData }) => {
    const containerStyle = {
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        color: 'black',
        display: 'inline-block',
        transition: 'background-color 0.2s',
        margin: '10px',
    };

    const navigateToRoute = `/VotingSelection?address=${contractData.votingContracts}`;

    return (
        <Link to={navigateToRoute}>
            <div
                style={containerStyle}
            >
                <h1>{contractData.name}</h1>
                <p>Contract address:</p>
                <p>{contractData.votingContracts}</p>
            </div>
        </Link>

    );
};


export default Voting;