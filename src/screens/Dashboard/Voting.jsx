import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

//Web3
import { init, getNumber } from '../../web3/initiation';
import { useContractContext } from '../../context/contractContext';
import { useWeb3React } from '@web3-react/core'
import TokenFunctions from '../../web3/TokenFunctions';
import tokenContractABI from '../../web3/contracts/Token.json'
import votingContractAPI from '../../web3/contracts/VotingControler.json'

//Formik
import { useFormik } from 'formik';
import * as Yup from 'yup';

/**
 * @dev This is the main dashboard for the site.
 *      Default to this page
 */
const Voting = () => {
    const [votes, setVotes] = useState([])
    const { setContract, contract } = useContractContext(); // Use the context hook to access setContract

    useEffect(() => {
        setup()
    }, []);

    /**
     * @dev Setup gets the contract into context and the user's balance
     * @todo Move the contract saving into another seperate function
     */
    const setup = async () => {
        try {
            const controlerContract = await init(votingContractAPI);
            const contracts = await controlerContract.methods.getAllVotingContracts().call()
            console.log(contracts)
            setVotes(contracts)
        } catch (e) {
            console.log(e)
        }
    }



    return (
        <div>
            {votes.map((contract) => {
                return (
                    <VoteSelection contractData={contract} />
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

    const navigateToRoute = `/VotingSelection?${contractData.votingContracts}`;

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