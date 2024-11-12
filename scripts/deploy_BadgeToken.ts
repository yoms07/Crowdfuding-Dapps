import hre from "hardhat";
async function main() {
  const BadgeToken = await hre.ethers.getContractFactory("BadgeToken");
  const badgeToken = await BadgeToken.deploy("Jason", "JSN");

  const response = await badgeToken.waitForDeployment();
  console.log(await response.getAddress());
}

main();
