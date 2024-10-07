import { HardhatUserConfig, task } from "hardhat/config";
import { v4 } from "uuid";
import "@nomicfoundation/hardhat-toolbox";

// import DeployedAddress from "./ignition/deployments/chain-31337/deployed_addresses.json";

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
      // DeployedAddress["KBTokenModule#KBToken"],
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
      // DeployedAddress["KBTokenModule#KBToken"],
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
    // DeployedAddress["KBFactoryModule#KBFactory"],
    signer
  );

  const cfList = await contract.getAllCrowdfundingAddress();
  cfList.forEach((cf) => {
    console.log(cf);
  });
});

task("inspectcf")
  .addParam("address", "Crowdfunding Address")
  .setAction(async (taskArgs, hre) => {
    const signer = await hre.ethers.provider.getSigner(0);
    const contract = await hre.ethers.getContractAt(
      "Crowdfunding",
      taskArgs.address,
      signer
    );

    const target = await contract.getTarget();
    const current = await contract.current();
    const deadline = await contract.deadline();
    const isOpen = await contract.isOpen();
    const metadataCID = await contract.metadataCID();

    console.log("Target: ", target);
    console.log("Current: ", current);
    console.log("Deadline: ", deadline);
    console.log("IsOpen: ", isOpen);
  });

// task("createcf").setAction(async (taskArgs, hre) => {
//   const signer = await hre.ethers.provider.getSigner(19);
//   const contract = await hre.ethers.getContractAt(
//     "KBFactory",
//     DeployedAddress["KBFactoryModule#KBFactory"],
//     signer
//   );

//   const cfMetadata = {
//     title: "Title",
//     categories: ["Sport", "Technology"],
//     description: "Description",
//     random: v4(),
//   };

//   const { cid } = await createIPFSClient().add(JSON.stringify(cfMetadata));

//   await contract.createCrowdfunding(cid.toString(), 100_000_000, 1734627600);
// });

task("seed").setAction(async (taskArgs, hre) => {
  const account = await hre.ethers.provider.getSigner(19);
  await hre.run("topUp", {
    account: account.address,
    amount: "200000000",
  });
  await hre.run("createcf");
  console.log("New created crowdfunding address: ");
  await hre.run("cflist");
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
