import { Fixture, MockProvider } from "ethereum-waffle"
import { Factory } from "../../typechain/Factory"
import { ethers } from "hardhat"
import { TestERC20 } from "../../typechain/TestERC20"
import { BigNumber, constants, utils, Wallet } from "ethers"
import { Exchange } from "../../typechain/Exchange"
import { UniswapExchange } from "../../typechain/UniswapExchange"
import { ALP } from "../../typechain/ALP"
import { CurveExchange } from "../../typechain/CurveExchange"
import { D4X } from "../../typechain/D4X"
import { TestPool } from "../../typechain/TestPool"
import { TestSwapRouter02 } from "../../typechain/TestSwapRouter02"
import { TestKeeperRegistryBase } from "../../typechain/TestKeeperRegistryBase"
import { LiquidationKeeper } from "../../typechain/LiquidationKeeper"
import { CreditKeeper } from "../../typechain/CreditKeeper"
import { FundKeeper } from "../../typechain/FundKeeper"
import { TestQuoterV2 } from "../../typechain/TestQuoterV2"
import { AaveProtocol } from "../../typechain/AaveProtocol"
import { TestExtraProtocol } from "../../typechain/TestExtraProtocol"
import { AddressResolver } from "../../typechain/AddressResolver"
import { InsuranceFund } from "../../typechain/InsuranceFund"
import { MockCurve } from "../../typechain/MockCurve"
import { TestChainlinkEconomics } from "../../typechain/TestChainlinkEconomics"
import { BIG_1E18 } from "../../scripts/constants"
import { FundGelato } from "../../typechain/FundGelato"
import { CreditGelato } from "../../typechain/CreditGelato"
import { MockGelatoTreasury } from "../../typechain/MockGelatoTreasury"



interface FactoryFixture {
  factory: Factory
}

interface AddressResolverFixture {
  resolver: AddressResolver
}

interface InsuranceFundFixture {
  iFund: InsuranceFund
}

export async function resolverFixture(): Promise<AddressResolverFixture> {
  const resolverFactory = await ethers.getContractFactory("AddressResolver")
  const resolver = (await resolverFactory.deploy()) as AddressResolver

  return { resolver }
}

interface LiquidationKeeperFixture {
  liquidationKeeper: LiquidationKeeper
}


export async function liquidationKeeperFixture(
  resolver: AddressResolver
): Promise<LiquidationKeeperFixture> {
  const factory = await ethers.getContractFactory("LiquidationKeeper")
  const liquidationKeeper = (await factory.deploy(resolver.address)) as LiquidationKeeper

  await resolver.importAddresses(
    [utils.formatBytes32String("LiquidationKeeper")],
    [liquidationKeeper.address]
  )

  return { liquidationKeeper }
}

interface FundGelatoFixture {
  fundGelato: FundGelato,
  creditGelato: CreditGelato,
  iFund: InsuranceFund,
  token0: TestERC20,
  token1: TestERC20,
  token2: TestERC20

}


export async function fundGelatoFixture(
  resolver: AddressResolver,
  wallet: Wallet,
  provider: MockProvider
): Promise<FundGelatoFixture> {
  const fundGelatoFactory = await ethers.getContractFactory("FundGelato")
  const fundGelato = (await fundGelatoFactory.deploy(resolver.address)) as FundGelato
  const { token0, token1, token2 } = await tokensFixture()

  await fundGelato.setEstimateGasPerform(1000000)
  await fundGelato.setToken(token0.address)
  await fundGelato.setNativeToken(token1.address)


  const { factory } = await factoryFixture(resolver)

  const { exchange: uniswapExchange, swapRouter } =
    await uniswapExchangeFixture([wallet], provider)

  await factory.registerExchange(0, uniswapExchange.address)

  const { iFund } = await iFundFixture(resolver)

  const creditGelatoFactory = await ethers.getContractFactory("CreditGelato")
  const creditGelato = (await creditGelatoFactory.deploy(resolver.address)) as CreditGelato


  await creditGelato.setCoin(token0.address, 0, 0);
  await creditGelato.setCoin(token1.address, 0, 0);


  const trasuryFactory = await ethers.getContractFactory("MockGelatoTreasury")
  const treasury = (await trasuryFactory.deploy()) as MockGelatoTreasury


  await fundGelato.setTreasury(treasury.address)

  await resolver.importAddresses(
    [utils.formatBytes32String("FundKeeper")],
    [fundGelato.address]
  )

  await resolver.importAddresses(
    [utils.formatBytes32String("D4X")],
    [fundGelato.address]
  )

  await resolver.importAddresses(
    [utils.formatBytes32String("CreditKeeper")],
    [creditGelato.address]
  )

  await resolver.rebuildCaches([
    iFund.address,
    fundGelato.address,
    creditGelato.address
  ])

  await token0.transfer(swapRouter.address, constants.MaxUint256.div(10))
  await token1.transfer(swapRouter.address, constants.MaxUint256.div(10))
  await token2.transfer(swapRouter.address, constants.MaxUint256.div(10))

  await factory.createAlp(token2.address, "token2", 18)
  await factory.createAlp(token0.address, "token0", 18)

  await token2.approve(iFund.address, ethers.constants.MaxUint256)
  await token0.approve(iFund.address, ethers.constants.MaxUint256)

  await iFund.depositCredit(token0.address, BIG_1E18)
  await iFund.depositCredit(token2.address, BIG_1E18.mul(2))

  return { fundGelato, creditGelato, iFund, token0, token1, token2 }
}


interface CreditGelatoFixture {
  creditGelato: CreditGelato,
  iFund: InsuranceFund,
  token0: TestERC20
}


export async function creditGelatoFixture(
  resolver: AddressResolver,
  wallet: Wallet,
  provider: MockProvider
): Promise<CreditGelatoFixture> {
  const creditGelatoFactory = await ethers.getContractFactory("CreditGelato")
  const creditGelato = (await creditGelatoFactory.deploy(resolver.address)) as CreditGelato
  const { token0, token1, token2 } = await tokensFixture()

  // await fundGelato.setEstimateGasPerform(1000000)
  // await fundGelato.setToken(token0.address)
  // await fundGelato.setNativeToken(token1.address)

  await creditGelato.setCoin(token0.address, 0, 0);
  await creditGelato.setCoin(token1.address, 0, 0);

  const { factory } = await factoryFixture(resolver)

  const { exchange: uniswapExchange, swapRouter } =
    await uniswapExchangeFixture([wallet], provider)

  await factory.registerExchange(0, uniswapExchange.address)

  const { iFund } = await iFundFixture(resolver)

  //await factory.connect(factory.address).addToken(token2.address)

  await resolver.importAddresses(
    [utils.formatBytes32String("FundKeeper")],
    [creditGelato.address]
  )

  await resolver.importAddresses(
    [utils.formatBytes32String("CreditKeeper")],
    [creditGelato.address]
  )

  await resolver.importAddresses(
    [utils.formatBytes32String("D4X")],
    [creditGelato.address]
  )

  await resolver.rebuildCaches([
    iFund.address,
    creditGelato.address
  ])

  await token0.transfer(swapRouter.address, constants.MaxUint256.div(10))
  await token1.transfer(swapRouter.address, constants.MaxUint256.div(10))
  await token2.transfer(swapRouter.address, constants.MaxUint256.div(10))

  await factory.createAlp(token2.address, "token2", 18)
  await factory.createAlp(token0.address, "token0", 18)

  await token2.approve(iFund.address, ethers.constants.MaxUint256)
  await token0.approve(iFund.address, ethers.constants.MaxUint256)

  await iFund.depositCredit(token0.address, BIG_1E18)
  await iFund.depositCredit(token2.address, BIG_1E18.mul(2))

  return { creditGelato, iFund, token0 }
}


interface CreditKeeperFixture {
  creditKeeper: CreditKeeper
}


export async function creditKeeperFixture(
  resolver: AddressResolver
): Promise<CreditKeeperFixture> {
  const tokenFactory = await ethers.getContractFactory("TestERC20")
  const link = (await tokenFactory.deploy(
    BigNumber.from(2).pow(255)
  )) as TestERC20

  const Lib = await ethers.getContractFactory("Utils");
  const lib = await Lib.deploy();
  await lib.deployed();

  const factory = await ethers.getContractFactory("CreditKeeper", {
    // libraries: {
    //   Utils: lib.address,
    // },
  })
  const creditKeeper = (await factory.deploy(resolver.address)) as CreditKeeper

  await resolver.importAddresses(
    [utils.formatBytes32String("CreditKeeper")],
    [creditKeeper.address]

  )

  return { creditKeeper }
}


interface FundKeeperFixture {
  linkKeeper: FundKeeper,
  keeperRegistry: TestKeeperRegistryBase
  link: TestERC20
}


export async function linkKeeperFixture(
  resolver: AddressResolver
): Promise<FundKeeperFixture> {

  const tokenFactory = await ethers.getContractFactory("TestERC20")
  const link = (await tokenFactory.deploy(
    BigNumber.from(2).pow(255)
  )) as TestERC20

  const testKeeperFactory = await ethers.getContractFactory("TestKeeperRegistryBase")
  const keeperRegistry = (await testKeeperFactory.deploy()) as TestKeeperRegistryBase

  // const Lib = await ethers.getContractFactory("Utils");
  // const lib = await Lib.deploy();
  // await lib.deployed();

  const factory = await ethers.getContractFactory("FundKeeper", {
    // libraries: {
    //   Utils: lib.address,
    // },
  })

  const linkKeeper = (await factory.deploy(resolver.address, keeperRegistry.address)) as FundKeeper

  const chainlinkEconomicsFactory = await ethers.getContractFactory("TestChainlinkEconomics")
  const chainlinkEconomics = (await chainlinkEconomicsFactory.deploy(link.address, link.address)) as TestChainlinkEconomics

  await resolver.importAddresses(
    [utils.formatBytes32String("FundKeeper"),
    utils.formatBytes32String("ChainlinkEconomics"),
    utils.formatBytes32String("LinkToken")],
    [linkKeeper.address, chainlinkEconomics.address, link.address]
  )




  //await linkKeeper.setChainlinkEconomics(chainlinkEconomics.address)
  await linkKeeper.setMinCountTx(1)
  await linkKeeper.setMaxCountTx(1)
  // await linkKeeper.setEstimateGasLiquidation(1)
  // await linkKeeper.setEstimateGasLinkFund(1)
  // await linkKeeper.setEstimateGasCreditRefund(1)



  return { linkKeeper, keeperRegistry, link }
}



export async function iFundFixture(
  resolver: AddressResolver
): Promise<InsuranceFundFixture> {
  const iFundFactory = await ethers.getContractFactory("InsuranceFund")
  const iFund = (await iFundFactory.deploy(resolver.address)) as InsuranceFund

  //await iFund.keeperSupport(true)

  await resolver.importAddresses(
    [utils.formatBytes32String("InsuranceFund")],
    [iFund.address]
  )

  return { iFund }
}

export async function factoryFixture(
  resolver: AddressResolver
): Promise<FactoryFixture> {
  const factoryFactory = await ethers.getContractFactory("Factory")
  const factory = (await factoryFactory.deploy()) as Factory

  await factory.setResolver(resolver.address)
  await resolver.importAddresses(
    [utils.formatBytes32String("Factory")],
    [factory.address]
  )

  return { factory }
}

interface TokensFixture {
  token0: TestERC20
  token1: TestERC20
  token2: TestERC20
}

export async function tokensFixture(): Promise<TokensFixture> {
  const tokenFactory = await ethers.getContractFactory("TestERC20")
  const tokenA = (await tokenFactory.deploy(
    BigNumber.from(2).pow(255)
  )) as TestERC20
  const tokenB = (await tokenFactory.deploy(
    BigNumber.from(2).pow(255)
  )) as TestERC20
  const tokenC = (await tokenFactory.deploy(
    BigNumber.from(2).pow(255)
  )) as TestERC20

  const [token0, token1, token2] = [tokenA, tokenB, tokenC].sort(
    (tokenA, tokenB) =>
      tokenA.address.toLowerCase() < tokenB.address.toLowerCase() ? -1 : 1
  )

  return { token0, token1, token2 }
}

interface ExchangeFixture {
  exchange: Exchange
}

async function exchangeFixture(): Promise<ExchangeFixture> {
  const exchangeFactory = await ethers.getContractFactory("Exchange")
  const exchange = (await exchangeFactory.deploy()) as Exchange

  return { exchange }
}


interface UniswapExchangeFixture {
  exchange: UniswapExchange
  swapRouter: TestSwapRouter02
  quoter: TestQuoterV2
}

export const uniswapExchangeFixture: Fixture<
  UniswapExchangeFixture
> = async () => {
  const router02Factory = await ethers.getContractFactory("TestSwapRouter02")
  const exchangeFactory = await ethers.getContractFactory("UniswapExchange")

  const swapRouter = (await router02Factory.deploy()) as TestSwapRouter02

  const quoterFactory = await ethers.getContractFactory("TestQuoterV2")
  const quoter = (await quoterFactory.deploy()) as TestQuoterV2

  const exchange = (await exchangeFactory.deploy(
    swapRouter.address,
    quoter.address
  )) as UniswapExchange

  return {
    exchange,
    swapRouter,
    quoter
  }
}

interface CurveExchangeFixture {
  exchange: CurveExchange,
  curve: MockCurve,
  tricrypto: MockCurve
}

export async function curveExchangeFixture(token0: TestERC20, token1: TestERC20, token2: TestERC20): Promise<CurveExchangeFixture> {
  const exchangeFactory = await ethers.getContractFactory("CurveExchange")

  const exchange = (await exchangeFactory.deploy()) as CurveExchange

  const curveFactory = await ethers.getContractFactory("MockCurve")
  const curve = (await curveFactory.deploy(
    [token0.address, token1.address, token2.address]
  )) as MockCurve

  const tricrypto = (await curveFactory.deploy(
    [token0.address, token1.address, token2.address]
  )) as MockCurve

  // await exchange.setAlgo([[token0.address, token1.address], [token1.address, token0.address]], [[curve.address], [curve.address]], [3, 3])

  const tokens = [token0.address, token1.address, token2.address]
  const pools = [curve.address]
  const pool_sizes = [3]
  const pool_underlying = [false]

  const routes = [
    [[0, 1], [0]],
    [[1, 2], [0]],
    [[0, 2], [0]],
    // [[wallet.address, token1.address], [token1.address]],
  ]


  await exchange.setAlgo(tokens, pools, pool_sizes, pool_underlying, [{
    routes: [0, 1],
    pools: [0]
  }, {
    routes: [1, 2],
    pools: [0]
  }, {
    routes: [0, 2],
    pools: [0]
  }])

  return {
    exchange,
    curve,
    tricrypto
  }
}

type TokensAndFactoryFixture = FactoryFixture & TokensFixture

interface ALPFixture extends TokensAndFactoryFixture {
  extraProtocol: TestExtraProtocol
  createAlp(firstToken?: TestERC20, secondToken?: TestERC20): Promise<ALP>
}

export async function alpFixture(
  resolver: AddressResolver
): Promise<ALPFixture> {

  const { token0, token1, token2 } = await tokensFixture()
  const { token0: token3 } = await tokensFixture()

  const { factory } = await factoryFixture(resolver)
  const { extraProtocol, testPool } = await extraProtocolFixture(resolver)


  const AlpDeployerFactory = await ethers.getContractFactory("TestAlpDeployer")
  const ALPFactory = await ethers.getContractFactory("ALP")

  return {
    token0,
    token1,
    token2,
    factory,
    extraProtocol,
    createAlp: async (firstToken = token0) => {
      // const alpDeployer = (await AlpDeployerFactory.deploy()) as TestAlpDeployer

      const tx = await factory.createAlp(firstToken.address, "", 18)

      // const tx = await alpDeployer.deploy(factory.address, firstToken.address)

      const receipt = await tx.wait()
      const poolAddress = receipt.events?.[2].args?.alp as string

      const alp = ALPFactory.attach(poolAddress) as ALP
      await alp.setExtraProtocol(extraProtocol.address)

      return alp
    },
  }
}

interface D4XFixture extends TokensAndFactoryFixture {
  d4x: D4X
  factory: Factory
  curveExchange: CurveExchange
  uniswapExchange: UniswapExchange
  swapRouter: TestSwapRouter02
  liquidationKeeper: LiquidationKeeper
  creditKeeper: CreditKeeper
  linkKeeper: FundKeeper
  extraProtocol: TestExtraProtocol
  iFund: InsuranceFund
  keeperRegistry: TestKeeperRegistryBase
  link: TestERC20
  token0credit: TestERC20
  token1credit: TestERC20
  token2credit: TestERC20
  aaveProtocol: AaveProtocol
  curve: MockCurve
  token3: TestERC20
  quoter: TestQuoterV2
}

export async function d4xFixture(
  resolver: AddressResolver,
  wallet: Wallet,
  provider: MockProvider
): Promise<D4XFixture> {
  const { token0, token1, token2 } = await tokensFixture()
  const { token0: token3, token1: token4, token2: token5 } = await tokensFixture()

  const { token0: atoken0, token1: atoken1 } = await tokensFixture()
  const { token0: token0credit, token1: token1credit, token2: token2credit } = await tokensFixture()

  //const { exchange } = await exchangeFixture()
  const { exchange: uniswapExchange, swapRouter, quoter } =
    await uniswapExchangeFixture([wallet], provider)

  const { exchange: curveExchange, curve } =
    await curveExchangeFixture(token0, token1, token2)

  const { extraProtocol, testPool, aaveProtocol } = await extraProtocolFixture(resolver)
  const { factory } = await factoryFixture(resolver)

  await testPool.setAToken(token0.address, atoken0.address)
  await testPool.setAToken(token1.address, atoken1.address)

  const { liquidationKeeper } = await liquidationKeeperFixture(resolver)
  const { linkKeeper, keeperRegistry, link } = await linkKeeperFixture(resolver)

  const { creditKeeper } = await creditKeeperFixture(resolver)


  const { iFund } = await iFundFixture(resolver)

  // await iFund.setFactory(factory.address)
  // await iFund.setLINK(link.address)
  // await iFund.setCreditKeeper(creditKeeper.address)
  // await iFund.setFundKeeper(linkKeeper.address)



  await creditKeeper.setCoin(link.address, constants.One, constants.One)

  const d4xFactory = await ethers.getContractFactory("D4X")
  const d4x = (await d4xFactory.deploy(resolver.address)) as D4X

  await factory.registerExchange(0, uniswapExchange.address)
  await factory.registerExchange(1, curveExchange.address)

  await token0.transfer(swapRouter.address, constants.MaxUint256.div(10))
  await token1.transfer(swapRouter.address, constants.MaxUint256.div(10))
  await token2.transfer(swapRouter.address, constants.MaxUint256.div(10))
  await link.transfer(swapRouter.address, constants.MaxUint256.div(10))
  await token0credit.transfer(swapRouter.address, constants.MaxUint256.div(10))
  await token1credit.transfer(swapRouter.address, constants.MaxUint256.div(10))
  await token2credit.transfer(swapRouter.address, constants.MaxUint256.div(10))

  await token0.transfer(curve.address, constants.MaxUint256.div(10))
  await token1.transfer(curve.address, constants.MaxUint256.div(10))
  await token2.transfer(curve.address, constants.MaxUint256.div(10))

  await token0.transfer(iFund.address, BIG_1E18.mul(1000))
  await token1.transfer(iFund.address, BIG_1E18.mul(1000))
  await token2.transfer(iFund.address, BIG_1E18.mul(1000))


  await token0credit.transfer(wallet.address, BIG_1E18.mul(100))
  await token1credit.transfer(wallet.address, BIG_1E18.mul(100))
  await token2credit.transfer(wallet.address, BIG_1E18.mul(100))

  await resolver.importAddresses(
    [
      utils.formatBytes32String("D4X"),
      utils.formatBytes32String("ExtraProtocol"),
      utils.formatBytes32String("LiquidationKeeper")
    ],
    [d4x.address, extraProtocol.address, liquidationKeeper.address]
  )

  await resolver.rebuildCaches([
    d4x.address,
    iFund.address,
    extraProtocol.address,
    aaveProtocol.address,
    liquidationKeeper.address
  ])

  return {
    token0,
    token1,
    token2,
    link,
    factory,
    d4x,
    curveExchange,
    uniswapExchange,
    extraProtocol,
    swapRouter,
    liquidationKeeper,
    linkKeeper,
    creditKeeper,
    iFund,
    keeperRegistry,
    token0credit,
    token1credit,
    token2credit,
    aaveProtocol,
    curve,
    token3,
    quoter
  }
}

interface AaveProtocolFixture {
  aaveProtocol: AaveProtocol
  testPool: TestPool
}

export async function aaveProtocolFixture(
  resolver: AddressResolver
): Promise<AaveProtocolFixture> {
  const aaveProtocolFactory = await ethers.getContractFactory("AaveProtocol")
  const aaveProtocol = (await aaveProtocolFactory.deploy(
    resolver.address
  )) as AaveProtocol

  const testPoolFactory = await ethers.getContractFactory("TestPool")
  const testPool = (await testPoolFactory.deploy()) as TestPool

  await aaveProtocol.setAavePool(testPool.address)
  return {
    aaveProtocol,
    testPool,
  }
}

interface ExtraProtocolFixture extends AaveProtocolFixture {
  extraProtocol: TestExtraProtocol
}

export async function extraProtocolFixture(
  resolver: AddressResolver
): Promise<ExtraProtocolFixture> {
  const extraProtocolFactory = await ethers.getContractFactory(
    "TestExtraProtocol"
  )
  const extraProtocol = (await extraProtocolFactory.deploy(
    resolver.address
  )) as TestExtraProtocol

  const { aaveProtocol, testPool } = await aaveProtocolFixture(resolver)

  await extraProtocol.setProtocols([aaveProtocol.address])

  await resolver.importAddresses(
    [utils.formatBytes32String("ExtraProtocol")],
    [extraProtocol.address]
  )

  return {
    extraProtocol,
    aaveProtocol,
    testPool,
  }
}
