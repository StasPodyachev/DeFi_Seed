import { HardhatRuntimeEnvironment } from "hardhat/types"
import {
  AAVE_ETH_SUPPLY,
  AAVE_ORACLE,
  AAVE_POOL_ADDRESSES,
  FACTORY_ADDRESSES,
  RESOLVER_ADDRESSES,
  TOKENS as TOKENS_CONST,
} from "./constants"

import { AddressResolver, ALP, BorrowFund, IFactory } from "../typechain"
import { IDeployment, writeDeployData } from "./utils"
import { utils } from "ethers"
import fs from "fs-extra"

const hre: HardhatRuntimeEnvironment = require("hardhat")

let CHAIN_ID: any
let TOKENS: any

let deployments: IDeployment
let deployJsonPath: string

const contracts: any = [
  {
    contractName: "Factory",
    f: factory,
    import: true,
  },
  {
    contractName: "BorrowFund",
    f: borrowFund, // for mixin
    import: true,
  },
]

async function prepare() {
  CHAIN_ID = await hre.getChainId()
  TOKENS = TOKENS_CONST[CHAIN_ID]
  deployJsonPath = `./deployment/${process.env.NODE_ENV}/${hre.network.name}/deployment-${process.env.VERSION}.json`
  deployments = fs.readJsonSync(deployJsonPath)
}

export async function main() {
  await prepare()

  const IMPORT_ADDRESSES: string[][] = [[], []]
  const MIXIN_CONTRACT_ADDRESSES: string[] = []

  for (let i in contracts) {
    const contract = contracts[i]

    if (contract.networks && !contract.networks[CHAIN_ID]) continue

    console.log(`configuring ${contract.contractName} started`)

    const addresses = await contract.f()

    if (contract.import) {
      IMPORT_ADDRESSES[0].push(utils.formatBytes32String(contract.contractName))
      IMPORT_ADDRESSES[1].push(deployments[contract.contractName].address)

      // console.log("IMP", contract.contractName)
    }

    if (addresses) {
      // console.log("MIXIN:", contract.contractName)
      MIXIN_CONTRACT_ADDRESSES.push(...addresses)
    }

    console.log(`${contract.contractName} configured success`)
    console.log("-------------------------------------------")
  }

  const resolver = (await hre.ethers.getContractAt(
    "AddressResolver",
    RESOLVER_ADDRESSES[CHAIN_ID]
  )) as AddressResolver

  console.log("AddressResolver success import addresses")

  console.log(MIXIN_CONTRACT_ADDRESSES)

  await resolver.rebuildCaches(MIXIN_CONTRACT_ADDRESSES)

  console.log("MIXIN_CONTRACT_ADDRESSES success")

  // await approveForDev(deployments[deployNames.D4X].address)
}

async function factory() {
  const factory = (await hre.ethers.getContractAt(
    "Factory",
    FACTORY_ADDRESSES[CHAIN_ID]
  )) as IFactory

  const tokens = []

  for (const key in TOKENS) {
    TOKENS[key].symbol = key
    tokens.push(TOKENS[key])
  }

  const mixins: any = []

  for (const i in tokens) {
    const token = tokens[i]
    const availableTokens = tokens
      .filter((v) => v.symbol != token.symbol)
      .map((v) => v.address)

    const alpAddr = await createAlp(
      factory,
      token.address,
      `df${token.symbol}`,
      token.decimals,
      availableTokens
    )
    mixins.push(alpAddr)
  }

  return mixins
}

async function createAlp(
  factory: IFactory,
  token: string,
  name: string,
  decimals: number,
  availableTokens: string[]
) {
  // TODO: add blockchain check

  if (deployments[`ALP-${name}`] && deployments[`ALP-${name}`].address) {
    return deployments[`ALP-${name}`].address
  }

  console.log(`Deploying ALP: ${name} ...`)
  console.log({
    name,
    availableTokens,
  })

  let tx = await factory.createAlp(token, name, decimals) // DAI/USDT

  const result = await tx.wait()

  const alpAddress = result.events?.[2].args?.alp as string

  await writeDeployData(`ALP-${name}`, alpAddress, deployJsonPath)

  const alpAddr = await factory.getAlp(token)
  const alp = (await hre.ethers.getContractAt("ALP", alpAddr)) as ALP

  console.log(`ALP: ${name} WTF`)

  await alp.addAvailableTokens(availableTokens)

  console.log(`ALP: ${name} deployed success!`)

  // await approveForDev(alpAddr)

  return alpAddr
}

async function borrowFund() {
  const borrowFundDeployed = deployments["BorrowFund"]

  const borrowFund = (await hre.ethers.getContractAt(
    "BorrowFund",
    borrowFundDeployed.address
  )) as BorrowFund

  await borrowFund.setAavePool(AAVE_POOL_ADDRESSES[CHAIN_ID])
  await borrowFund.setOracle(AAVE_ORACLE[CHAIN_ID])
  await borrowFund.setWrappedTokenGatewayV3(AAVE_ETH_SUPPLY[CHAIN_ID])

  return [borrowFund.address]
}
