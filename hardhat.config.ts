import { HardhatUserConfig, task } from "hardhat/config";
import { v4 } from "uuid";
import "@nomicfoundation/hardhat-toolbox";

import DeployedAddress from "./ignition/deployments/chain-31337/deployed_addresses.json";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs, { ethers }) => {
    const balance = await ethers.provider.getBalance(taskArgs.account);
    console.log(ethers.formatEther(balance), "ETH");
  });

task("topUp", "TopUp Balance")
  .addParam("account", "Topup receiver")
  .addParam("amount", "amount to topup")
  .setAction(async (taskArgs, hre) => {
    const adminSigner = await hre.ethers.provider.getSigner(0);

    const contract = await hre.ethers.getContractAt(
      "KBToken",
      DeployedAddress["KBTokenModule#KBToken"],
      adminSigner
    );
    const numberAmount = parseInt(taskArgs.amount);
    await contract.topUp(taskArgs.account, numberAmount);
    console.log("Success topup");
  });

task("kbbalance")
  .addParam("account", "Account to check")
  .setAction(async (taskArgs, hre) => {
    const signer = await hre.ethers.provider.getSigner(0);
    const contract = await hre.ethers.getContractAt(
      "KBToken",
      DeployedAddress["KBTokenModule#KBToken"],
      signer
    );

    const balance = await contract.balanceOf(taskArgs.account);
    console.log(`Account ${taskArgs.account} balance is ${balance}`);
  });

task("setConfig")
  .addParam("configaddr", "Config address")
  .addParam("factoryaddr", "Factory address")
  .setAction(async (taskArgs, hre) => {
    const signer = await hre.ethers.provider.getSigner(1);
    const contract = await hre.ethers.getContractAt(
      "KBFactory",
      taskArgs.factoryaddr,
      signer
    );
    await contract.setConfig(taskArgs.configaddr);
    console.log("Config set successfully");
  });

task("cflist").setAction(async (taskArgs, hre) => {
  const signer = await hre.ethers.provider.getSigner(0);
  const contract = await hre.ethers.getContractAt(
    "KBFactory",
    DeployedAddress["KBFactoryModule#KBFactory"],
    signer
  );

  const cfList = await contract.getAllCrowdfundingAddress();
  cfList.forEach((cf) => {
    console.log(cf);
  });
});

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  // networks: {
  //   hardhat: {
  //     chainId: 31337,
  //     accounts: accounts,
  //   },
  // },
};

export default config;
