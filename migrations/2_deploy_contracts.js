const contract = artifacts.require("./SecretNumber.sol");
const token = artifacts.require("./Token.sol")

const voting = artifacts.require("./VotingControler.sol")
const vote = artifacts.require("./Voting.sol")

module.exports = function (deployer) {
	// deployer.deploy(contract, "0x2402d75abb28464C8Fd76ce28215fFc9D8197A85", "10");
	// deployer.deploy(token,100);
	deployer.deploy(voting);
	deployer.deploy(vote);
}
