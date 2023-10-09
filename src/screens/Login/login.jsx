import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core'

/**
 * @dev Use this as the login page if the user dosen't have a wallet provider
 * @returns Login page
 */
const Login = () => {
    const { activate } = useWeb3React();

    const Injected = new InjectedConnector({
        supportedChainIds: [1, 3, 4, 5, 42, 1337]
    });

    return (
        <div>
            <button onClick={() => { activate(Injected) }}><h1>Connect wallet</h1></button>
        </div>
    )
}

export default Login;