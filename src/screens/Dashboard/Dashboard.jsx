import React, { useEffect, useState } from 'react';

//Web3
import { init, getNumber } from '../../web3/initiation';
import { useContractContext } from '../../context/contractContext';
import { getOwner } from '../../web3/owner';
import { useWeb3React } from '@web3-react/core'
import TokenFunctions from '../../web3/TokenFunctions';
import tokenContractABI from '../../web3/contracts/Token.json'

//Formik
import { useFormik } from 'formik';
import * as Yup from 'yup';


import { sendEther } from '../../web3/sendEth';
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

    // Define the Formik form
    const formik = useFormik({
        initialValues: {
            toAddress: '',
            transferAmount: '',
        },
        validationSchema: Yup.object().shape({
            toAddress: Yup.string()
            .matches(/^0x[0-9a-fA-F]{40}$/, 'Invalid Ethereum address')
            .required('Ethereum address is required'),          
            transferAmount: Yup.number()
                .typeError('Transfer amount must be a number')
                .required('Transfer amount is required')
                .positive('Transfer amount must be positive')
                .max(
                    currentBalance,
                    `Transfer amount must be less than or equal to ${currentBalance}`
                ),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                // Perform the transfer
                const { toAddress, transferAmount } = values;
                const response = await TokenFunctions.transfer({
                  contract,
                  to: toAddress,
                  amount: transferAmount,
                  from: account, // Pass the 'from' parameter
                });
                // Handle the response as needed
                console.log('Transfer response:', response);
                // Reset the form
                resetForm();
              } catch (error) {
                console.error('Transfer error:', error);
              }              
        },
    });

    return (
        <div>
            <div>Current balance: {currentBalance}</div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="toAddress">To Address:</label>
                    <input
                        type="text"
                        id="toAddress"
                        name="toAddress"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.toAddress}
                    />
                    {formik.touched.toAddress && formik.errors.toAddress && (
                        <div className="error">{formik.errors.toAddress}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="transferAmount">Transfer Amount:</label>
                    <input
                        type="number"
                        id="transferAmount"
                        name="transferAmount"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.transferAmount}
                    />
                    {formik.touched.transferAmount && formik.errors.transferAmount && (
                        <div className="error">{formik.errors.transferAmount}</div>
                    )}
                </div>
                <button type="submit">Transfer</button>
            </form>
        </div>
    )
}

export default Dashboard;