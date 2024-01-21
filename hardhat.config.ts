// import "hardhat-typechain";
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan"
import "@typechain/hardhat"
import "hardhat-contract-sizer"
import "hardhat-deploy"
import "hardhat-deploy-ethers"
import "hardhat-abi-exporter"
import "hardhat-gas-reporter"
import "solidity-coverage"
import fs from "fs-extra"
import * as dotenv from "dotenv"
import "hardhat-change-network"

import "@nomiclabs/hardhat-etherscan"
import * as tdly from "@tenderly/hardhat-tenderly"

const envFile = process.env.NODE_ENV_FILE

// Load environment variables from the specified .env file
if (envFile) {
  dotenv.config({ path: envFile })
} else {
  dotenv.config()
}

tdly.setup({
  automaticVerifications: false,
})

const packageJson: any = fs.readJsonSync("package.json")
process.env.VERSION = packageJson.version

const config = {
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_RPC_URL}`,
      accounts: [process.env.DEPLOY_PRIVATE_KEY],
    },
  },
  abiExporter: {
    path: "./data/abi",
    runOnCompile: true,
    clear: false,
    flat: true,
    // only: [],
    // except: []
  },
  gasReporter: {
    coinmarketcap: "",
    currency: "ETH",
  },
  defaultNetwork: "hardhat",
  mocha: {
    timeout: 100000,
  },
  solidity: {
    compilers: [
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.11",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  // contractSizer: {
  //   alphaSort: true,
  //   runOnCompile: true,
  //   disambiguatePaths: false,
  // },
  etherscan: {
    apiKey: {
      optimisticEthereum: process.env.OPTIMISTIC_ETHERSCAN_API_KEY,
      polygonMumbai: process.env.POLYGON_ETHERSCAN_API_KEY,
      optimisticGoerli: process.env.OPTIMISTIC_ETHERSCAN_API_KEY,
    },
  },
  tenderly: {
    project: process.env.TENDERLY_PROJECT ?? "d4x",
    username: process.env.TENDERLY_USERNAME ?? "sneltyn",
    privateVerification: true,
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
}

export default config
