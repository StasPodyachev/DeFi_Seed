import { ethers, waffle } from "hardhat"
import { BigNumber, constants, utils, Wallet, ContractTransaction } from "ethers"
import { TestERC20 } from "../typechain/TestERC20"
import { Factory } from "../typechain/Factory"
import { ALP } from "../typechain/ALP"
import { expect, use } from "chai"
import { alpFixture, resolverFixture } from "./shared/fixtures"
import { TestExtraProtocol } from "../typechain/TestExtraProtocol"
import { AddressResolver } from "../typechain"
import { BIG_1E18 } from "../scripts/constants"

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T

const createFixtureLoader = waffle.createFixtureLoader

describe("ALP", () => {
  let wallet: Wallet, other: Wallet

  let token0: TestERC20
  let token1: TestERC20
  let token2: TestERC20
  let extraProtocol: TestExtraProtocol

  let factory: Factory
  let alp: ALP
  let alpToken1: ALP

  let loadFixture: ReturnType<typeof createFixtureLoader>
  let createAlp: ThenArg<ReturnType<typeof alpFixture>>["createAlp"]
  const GAS_STATS: any = []

  const gasInfo = async (tx: ContractTransaction, name: string) => {
    const receipt = await tx.wait()
    GAS_STATS.push({ name, gasPrice: tx.gasPrice?.toString(), gasUsed: receipt.gasUsed.toString(), gasLimit: tx.gasLimit.toString(), totalPrice: tx.gasPrice?.mul(receipt.gasUsed).toString() })
  }

  before("create fixture loader", async () => {
    ;[wallet, other] = await (ethers as any).getSigners()
    loadFixture = createFixtureLoader([wallet, other])
  })

  after("gas stats", () => {
    console.log(GAS_STATS)
  })



  beforeEach("deploy fixture", async () => {
    let resolver: AddressResolver
      ; ({ token0, token1, token2, factory, extraProtocol, createAlp, resolver } =
        await loadFixture(async () => {
          const { resolver } = await resolverFixture()
          const { token0, token1, token2, factory, extraProtocol, createAlp } =
            await alpFixture(resolver)
          return {
            token0,
            token1,
            token2,
            factory,
            extraProtocol,
            createAlp,
            resolver,
          }
        }))

    alp = await createAlp(token0)

    await resolver.importAddresses(
      [
        utils.formatBytes32String("D4X"),
        utils.formatBytes32String("ExtraProtocol"),
      ],
      [wallet.address, extraProtocol.address]
    )

    await extraProtocol.rebuildCache()
    await alp.rebuildCache()


    alpToken1 = await createAlp(token1)

    await token0.approve(alp.address, constants.MaxUint256)
    await token1.approve(alp.address, constants.MaxUint256)
    await token2.approve(alp.address, constants.MaxUint256)

    await token0.approve(extraProtocol.address, constants.MaxUint256)
    await token1.approve(extraProtocol.address, constants.MaxUint256)
    await token2.approve(extraProtocol.address, constants.MaxUint256)

    await token0.connect(other).approve(alp.address, constants.MaxUint256)
    await token1.connect(other).approve(alp.address, constants.MaxUint256)
    await token2.connect(other).approve(alp.address, constants.MaxUint256)

    // await token0.transfer(alp.address, constants.MaxUint256.div(1e8))
    await token0.transfer(other.address, constants.MaxUint256.div(1e8))
    await token1.transfer(other.address, constants.MaxUint256.div(1e8))
  })

  it("constructor initializes immutables", async () => {
    expect(await alp._factory()).to.eq(
      factory.address,
      "factory addresses not equals"
    )
    expect(await alp._token()).to.eq(
      token0.address,
      "token addresses not equals"
    )
  })

  describe("#deposit", () => {
    it("success cases", async () => {
      const amount: number = 1000
      const oldBalance = await token0.balanceOf(wallet.address)

      // await expect(alp.deposit(amount))
      //   .to.emit(alp, "Deposit")
      //   .withArgs(wallet.address, amount)



      const tx = await alp.deposit(amount)
      gasInfo(tx, "Deposit");

      await extraProtocol["deposit(uint256,uint256,address)"](1000, 1, token0.address)

      await extraProtocol["deposit(uint256,address)"](1500, token0.address)

      await token0.transfer(extraProtocol.address, 1e6)

      let balance = await alp.balanceOf(wallet.address)
      expect(amount).to.eq(balance)
    })

    // 916666666666666666666
    // 1000000000000000000000

    it("fails when value is 0", async () => {
      await expect(alp.deposit(0)).to.be.revertedWith("ZERO_DEPOSIT")
    })

    it("fails when staking paused", async () => {
      alp.pause()
      await expect(alp.deposit(10)).to.be.revertedWith("CONTRACT_IS_STOPPED")
    })

    it("fails when token is not approved", async () => {
      await token0.approve(alp.address, 0)
      await expect(alp.deposit(10)).to.be.reverted
    })
  })

  describe("#withdraw", () => {
    it("check balances after withdraw", async () => {
      const amount = 10

      // const printBalances = async () => {
      //   let balance = await alp.balanceOf(wallet.address)
      //   let balanceOther = await alp.balanceOf(other.address)
      //   let total = await alp.getTotalPooled()
      //   let shares0 = await alp.sharesOf(wallet.address)
      //   let shares1 = await alp.sharesOf(other.address)

      //   console.log({
      //     balance0: balance.toString(),
      //     balance1: balanceOther.toString(),
      //     shares0: shares0.toString(),
      //     shares1: shares1.toString(),
      //     total: total.toString(),
      //   })
      // }

      const oldBalance = await token0.balanceOf(wallet.address)

      // n

      await alp.deposit(amount)
      //await printBalances()

      await extraProtocol["deposit(uint256,address)"](2, token0.address)
      //await printBalances()

      await alp.connect(other).deposit(amount)
      await extraProtocol["deposit(uint256,address)"](4, token0.address)

      // await printBalances()

      // await expect(alp.withdraw(14))
      //   .to.emit(alp, "Withdraw")
      //   .withArgs(wallet.address, 14)

      const tx = await alp.withdraw(1)
      gasInfo(tx, "Withdraw");


      let balance = await token0.balanceOf(wallet.address)

      expect(oldBalance.sub(6)).to.eq(balance)
    })

    it("fails when insufficient balance for token", async () => {
      await expect(alp.withdraw(10)).to.be.revertedWith(
        "ALP: We don't have shares in pool"
      )
    })

    it("fails when value is 0", async () => {
      await expect(alp.withdraw(0)).to.be.revertedWith("ALP: value cannot be 0")
    })

    it("fails when burn amount exceeds balance", async () => {
      await alp.deposit(10)

      await expect(alp.withdraw(20)).to.be.revertedWith(
        "BURN_AMOUNT_EXCEEDS_BALANCE"
      )
    })
  })

  describe("#requestReserve", () => {
    it("success cases", async () => {
      const amount: number = 10
      const leverage: number = 10

      await alp.deposit(100000)

      const oldBalance = await token0.balanceOf(wallet.address)

      await alp.requestReserve(leverage, amount)

      const val = amount * (leverage - 1)
      const balance = await token0.balanceOf(wallet.address)

      expect(oldBalance.add(val)).to.eq(balance)
    })

    it("fails when leverage is too much", async () => {
      await expect(alp.requestReserve(1000, 10)).to.be.revertedWith(
        "ALP: too much leverage"
      )
    })

    it("fails when insufficient funds in reserve", async () => {
      await expect(alp.requestReserve(10, 10)).to.be.revertedWith(
        "ALP: Insufficient in reserve"
      )
    })

    it("fails when amount is 0", async () => {
      await expect(alp.requestReserve(10, 0)).to.be.revertedWith(
        "ALP: amount can't be 0"
      )
    })

    it("fails when caller is not d4x", async () => {
      await expect(alp.connect(other).requestReserve(10, 0)).to.be.revertedWith(
        "ALP: Caller is not d4x"
      )
    })
  })

  describe("#addAvailableTokens", () => {
    it("success cases", async () => {
      await expect(
        alp.addAvailableTokens([token1.address, token2.address])
      ).to.emit(alp, "TokensUpdate")

      let tokens = await alp.getAvailableTokens()
      expect(2).to.eq(tokens.length)

      expect(token1.address).to.eq(tokens[0])
      expect(token2.address).to.eq(tokens[1])

      await alp.addAvailableTokens([token0.address])
      tokens = await alp.getAvailableTokens()
      expect(2).to.eq(tokens.length)
      expect(token1.address).to.eq(tokens[0])
      expect(token2.address).to.eq(tokens[1])

      await expect(
        alp.addAvailableTokens([ethers.constants.AddressZero])
      ).to.emit(alp, "TokensUpdate")

      tokens = await alp.getAvailableTokens()
      expect(3).to.eq(tokens.length)

      expect(token1.address).to.eq(tokens[0])
      expect(token2.address).to.eq(tokens[1])
      expect(ethers.constants.AddressZero).to.eq(tokens[2])
    })
  })

  describe("#removeAvailableTokens", () => {
    it("success cases", async () => {
      await alp.addAvailableTokens([token1.address, token2.address])
      await expect(
        alp.removeAvailableTokens([ethers.constants.AddressZero])
      ).to.emit(alp, "TokensUpdate")

      let tokens = await alp.getAvailableTokens()
      expect(2).to.eq(tokens.length)

      await alp.removeAvailableTokens([token1.address])
      tokens = await alp.getAvailableTokens()
      expect(1).to.eq(tokens.length)
      expect(token2.address).to.eq(tokens[0])
    })
  })

  describe("#isTokenAvailable", () => {
    it("success cases", async () => {
      await alp.addAvailableTokens([token1.address, token2.address])
      let ok = await alp.isTokenAvailable(token1.address)
      expect(true).to.eq(ok)

      ok = await alp.isTokenAvailable(token0.address)
      expect(false).to.eq(ok)
    })
  })

  describe("alpToken properties", () => {
    it("success cases", async () => {
      const name = await alp.name()
      expect("").to.eq(name)
      expect(name).to.eq(await alp.symbol())
      expect(18).to.eq(await alp.decimals())
    })
  })

  describe("#transfer", () => {
    it("success cases", async () => {
      await alp.deposit(10)

      await alp.transfer(other.address, 10)

      let balance = await alp.balanceOf(wallet.address)
      let balanceOther = await alp.balanceOf(other.address)

      expect(0).to.eq(balance)
      expect(10).to.eq(balanceOther)
    })
  })

  describe("#transferFrom", () => {
    it("success cases", async () => {
      await alp.deposit(10)

      await alp.approve(other.address, 10)
      await alp.connect(other).transferFrom(wallet.address, other.address, 10)

      let balance = await alp.balanceOf(wallet.address)
      let balanceOther = await alp.balanceOf(other.address)

      expect(0).to.eq(balance)
      expect(10).to.eq(balanceOther)
    })

    it("fails if TRANSFER_AMOUNT_EXCEEDS_ALLOWANCE ", async () => {
      await expect(
        alp.transferFrom(wallet.address, other.address, 10)
      ).to.be.revertedWith("TRANSFER_AMOUNT_EXCEEDS_ALLOWANCE")
    })
  })

  describe("#totalSupply", () => {
    it("success cases", async () => {
      await alp.deposit(10)

      const value = await alp.totalSupply()
      expect(10).to.eq(value)
    })
  })

  describe("#getTotalPooled", () => {
    it("success cases", async () => {
      await alp.deposit(10)

      const value = await alp.getTotalPooled()
      expect(10).to.eq(value)
    })
  })

  describe("#balanceOf", () => {
    it("success cases", async () => {
      await alp.deposit(10)

      const value = await alp.balanceOf(wallet.address)
      expect(10).to.eq(value)
    })
  })

  describe("#increaseAllowance", () => {
    it("success cases", async () => {
      await alp.increaseAllowance(other.address, 10)

      const value = await alp.allowance(wallet.address, other.address)

      expect(10).to.eq(value)
    })
  })

  describe("#decreaseAllowance", () => {
    it("success cases", async () => {
      await alp.increaseAllowance(other.address, 10)
      await alp.decreaseAllowance(other.address, 1)

      const value = await alp.allowance(wallet.address, other.address)

      expect(9).to.eq(value)
    })

    it("fails if DECREASED_ALLOWANCE_BELOW_ZERO", async () => {
      await expect(alp.decreaseAllowance(other.address, 11)).to.be.revertedWith(
        "DECREASED_ALLOWANCE_BELOW_ZERO"
      )
    })
  })
})
