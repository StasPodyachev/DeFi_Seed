import { HardhatRuntimeEnvironment } from "hardhat/types"
import promptSync from "prompt-sync"
import fs from "fs-extra"

import { RESOLVER_ADDRESSES, TOKENS } from "./constants"

import {
  IDeployment,
  createFileIfNotExists,
  delay,
  writeDeployData,
} from "./utils"

import { main as verify } from "./verify"
import { main as configure } from "./configure"

const hre: HardhatRuntimeEnvironment = require("hardhat")

const prompt = promptSync()

export interface ContractDeploy {
  contractName: string
  nameFile?: string
  args?: any
  networks?: any
}

let CHAIN_ID: any
let deployments: IDeployment
let deployJsonPath: string

const resolver = () => [RESOLVER_ADDRESSES[CHAIN_ID]]

const contracts: ContractDeploy[] = [
  {
    contractName: "BorrowFund",
    args: () => [...resolver(), TOKENS[CHAIN_ID].WETH.address],
  },
]

async function run() {
  await deploy()

  console.log("***********************************************************")

  await configure()

  console.log("***********************************************************")
  await delay(5000)
  await verify()
}

async function prepare() {
  CHAIN_ID = await hre.getChainId()

  console.log({ chainId: CHAIN_ID })

  deployJsonPath = `./deployment/${process.env.NODE_ENV}/${hre.network.name}/deployment-${process.env.VERSION}.json`
  deployments = fs.readJsonSync(deployJsonPath)
}

async function deploy() {
  await prepare()

  for (let i in contracts) {
    const contract = contracts[i]

    if (contract.networks && !contract.networks[CHAIN_ID]) continue

    console.log(`deploying ${contract.contractName} started`)

    await deployContract(
      contract.contractName,
      contract.nameFile,
      typeof contract?.args === "function" ? contract.args() : contract.args
    )

    console.log(`${contract.contractName} deployed success`)
    console.log("-------------------------------------------")
  }

  await delay(15000)
}

export async function deployContract(
  contractName: string,
  nameFile?: string,
  args?: any
) {
  const contractFactory = await hre.ethers.getContractFactory(
    nameFile ?? contractName
  )

  console.log(`Contract for deployment Started`)

  let contract

  if (args) {
    contract = await contractFactory.deploy(...args)
  } else {
    contract = await contractFactory.deploy()
  }

  deployments = await writeDeployData(
    contractName,
    contract.address,
    deployJsonPath
  )

  console.log("Contract Deployment Ended")
  console.log("***************************************")
}

async function main() {
  // const provider = hre.getProvider('mumbai');

  // console.log(provider);

  const networks = hre.config.networks

  // console.log(networks)
  let choices: any = []
  for (const key in networks) {
    if (key != "localhost" && key != "hardhat") {
      choices.push(key)
    }
  }

  // const choices = networks.map((network)=> network.name)

  // Prompt for the selection
  console.log("Select multiple network for deploy (space-separated):")
  choices.forEach((choice: string, index: number) => {
    console.log(`${index + 1}. ${choice}`)
  })
  const selectionInput = prompt("Enter the numbers of your choices: ")
  const selectedIndices = selectionInput
    .split(" ")
    .map((index: string) => Number(index.trim()) - 1)
    .filter((index: number) => index >= 0 && index < choices.length)
  const selectedNetworks = selectedIndices.map(
    (index: number) => choices[index]
  )

  console.log(`You selected: ${selectedNetworks.join(", ")}`)

  for (const i in selectedNetworks) {
    const network = selectedNetworks[i]

    console.log(`Deploying for ${network} ...`)

    // try {
    const deployJsonPath = `./deployment/${process.env.NODE_ENV}/${network}/deployment-${process.env.VERSION}.json`

    await createFileIfNotExists(deployJsonPath, JSON.stringify({}))
    hre.changeNetwork(network)

    await run()
    console.log(`Deployed for ${network}`)
    // } catch (e: any) {
    //   console.error(`Error deploy for ${network} ${e}`)
    // }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
