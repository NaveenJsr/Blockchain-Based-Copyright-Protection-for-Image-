const { error } = require("console");
const hre = require("hardhat");

async function main(){
  const Copyright = await hre.ethers.getContractFactory("Copyright");
  const copyright = await Copyright.deploy();

  await copyright.deployed();

  console.log("Library deployed to: ", copyright.address);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});