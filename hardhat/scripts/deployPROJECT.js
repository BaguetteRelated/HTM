// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const LEARNWEB3MUMBAI = "0x1119e27ccd2a9be3b16c0e4e6d82665c86c8c160"

async function main() {

  const ProjectContractFactory = await hre.ethers.getContractFactory("Project")

  const ProjectContract = await ProjectContractFactory.deploy(LEARNWEB3MUMBAI)
  await ProjectContract.deployed()
  console.log("Project : ", ProjectContract.address)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
