import { BigNumber } from "ethers"

export const BIG_1E18 = BigNumber.from("1000000000000000000")
export const BIG_1E6 = BigNumber.from(1e6)
export const BIG_1E8 = BigNumber.from(1e8)

export const TOKENS: any = {
  11155111: {
    WETH: {
      address: "0x481AcC1F43D16eB689970fe88190F2b6C8432ec3",
      name: "Wrapped Ether",
      symbol: "WETH",
      decimals: 18,
    },
    GHO: {
      address: "0xc4bf5cbdabe595361438f8c6a187bdc330539c60",
      name: "Gho Token",
      symbol: "Gho",
      decimals: 18,
    },
    LINK: {
      address: "0x779877a7b0d9e8603169ddbd7836e478b4624789",
      decimals: 18,
    },
  },
}

/* PROTOCOL ADDRESSES */

export const FACTORY_ADDRESSES: any = {
  11155111: "0x53c362ae2B21489565946D6c000742E0fd033f19",
}

export const RESOLVER_ADDRESSES: any = {
  11155111: "0xfce7165d1C079f3599a57c026Cb8E45894289cD1",
}

// -----------------------------------------------------

export const AAVE_POOL_ADDRESSES = {
  11155111: "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951",
} as any

export const AAVE_ORACLE = {
  11155111: "0x2da88497588bf89281816106C7259e31AF45a663",
} as any

export const AAVE_ETH_SUPPLY = {
  11155111: "0x387d311e47e80b498169e6fb51d3193167d89F7D",
} as any
