const hre = require("hardhat")

import { IDeployment } from "./utils"
import { DEPLOY_NAMES, TOKENS } from "./constants"
import fs from "fs-extra"
import { ContractDeploy } from "./deploy"

let CHAIN_ID: any
let deployments: IDeployment

let deployJsonPath: string

const resolver = () => [deployments[DEPLOY_NAMES.ADDRESS_RESOLVER].address]

const contracts: ContractDeploy[] = [
  {
    contractName: "BorrowFund",
    args: () => [...resolver(), TOKENS[CHAIN_ID].WETH.address],
  },
  {
    contractName: "ALP-dfGHO",
    args: resolver,
  },
]
async function prepare() {
  CHAIN_ID = await hre.getChainId()
  deployJsonPath = `./deployment/${process.env.NODE_ENV}/${hre.network.name}/deployment-${process.env.VERSION}.json`
  deployments = fs.readJsonSync(deployJsonPath)
}

export async function main() {
  await prepare()
  for (let i in contracts) {
    const contract = contracts[i]

    if (contract.networks && !contract.networks[CHAIN_ID]) continue

    const address = deployments[contract.contractName].address

    console.log(`verify ${contract.contractName}`)

    try {
      await hre.run("verify:verify", {
        address,
        constructorArguments:
          typeof contract?.args === "function"
            ? contract.args()
            : contract.args ?? [],
        noCompile: true,
      })
    } catch (e) {
      console.log("EEROR")
      console.error(e)
    }
  }
}

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error)
//     process.exit(1)
//   })
