module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "1337"
    }
  },
  contracts_directory: './contracts/',
  contracts_build_directory: './src/web3/contracts',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 1773
      },
      version:'0.8.9'
    },
  }
}
