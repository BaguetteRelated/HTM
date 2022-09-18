// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const [KofiCoinContractFactory, BallotContractFactory, KofiNFT1155ContractFactory] = await Promise.all([
    hre.ethers.getContractFactory("KofiCoin"),
    hre.ethers.getContractFactory("Ballot"),
    hre.ethers.getContractFactory("KofiNFT1155")
  ])

  const [KofiCoinContract, BallotContract, KofiNFT1155Contract] = await Promise.all([
    KofiCoinContractFactory.deploy(),
    BallotContractFactory.deploy(),
    KofiNFT1155ContractFactory.deploy()
  ])

  await Promise.all([
    KofiCoinContractFactory.deployed(),
    BallotContractFactory.deployed(),
    KofiNFT1155ContractFactory.deployed()
  ])

  console.log("KofiCoin : ", KofiCoinContract.address);
  console.log("Ballot : ", BallotContract.address);
  console.log("KofiNFT1155 : ", KofiNFT1155Contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
