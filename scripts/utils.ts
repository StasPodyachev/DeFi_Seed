/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HardhatRuntimeEnvironment } from "hardhat/types"
// import deployment from "../deployment/deployments.json"
// import { BridgeUpgradeable } from "../typechain";
import { BigNumber } from "ethers"
import fs from "fs-extra"
import path from "path"

// const deployments: IDeployment = deployment

export interface IDeployment {
  [key: string]: {
    // proxy?: string
    // implementation?: Array<string>
    address: string
    creationTime?: number
    block?: number
    // updatedTime?: Array<number>
  }
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function createFileIfNotExists(filePath: string, data: string) {
  try {
    await fs.access(filePath) // Check if the file exists
  } catch (error: any) {
    if (error.code === "ENOENT") {
      const directoryPath = path.dirname(filePath)

      // File doesn't exist, create it
      await fs.ensureDir(directoryPath)
      await fs.writeFile(filePath, data)
      console.log(`Created file: ${filePath}`)
    }
  }
}

export async function recordAllDeployments(
  contractName: string,
  implementationAddr: string,
  path: string
) {
  const deployments: any = fs.readJsonSync(path)

  deployments[contractName] = {
    // proxy: proxyAddr,
    // implementation: [implementationAddr],
    address: implementationAddr,
    creationTime: Date.now(),
    // updatedTime: [Date.now()],
  }

  return deployments
}

export async function writeFile(path: string, data: any) {
  fs.writeFileSync(path, JSON.stringify(data))
}

export async function writeDeployData(
  contractName: string,
  address: string,
  path: string
): Promise<IDeployment> {
  const writeData = await recordAllDeployments(contractName, address, path)

  fs.writeFileSync(path, JSON.stringify(writeData))

  return writeData
}

// export async function verify(
//   proxyAddr: string,
//   hre: HardhatRuntimeEnvironment
// ) {
//   const implementationAddr =
//     await hre.upgrades.erc1967.getImplementationAddress(proxyAddr);
//   console.log("Contract Verification Started", implementationAddr);
//   try {
//     await hre.run("verify:verify", {
//       address: implementationAddr,
//     });
//   } catch (err) {
//     console.error(err);
//   }
//   console.log("Contract Verification Ended");
// }

export const toHex = (
  covertThis: BigNumber | number | string,
  padding: any,
  hre: HardhatRuntimeEnvironment
): string => {
  //This checks if padding < convertThis, then error is not thrown in ethers-v5
  if (hre.ethers.utils.hexlify(covertThis).length > 2 * padding + 2)
    return hre.ethers.utils.hexlify(covertThis)

  return hre.ethers.utils.hexZeroPad(
    hre.ethers.utils.hexlify(covertThis),
    padding
  )
}

export const createResourceID = (
  contractAddress: string,
  chainID: number,
  hre: HardhatRuntimeEnvironment
): string => {
  return toHex(contractAddress + toHex(chainID, 0, hre).substr(2), 32, hre)
}
