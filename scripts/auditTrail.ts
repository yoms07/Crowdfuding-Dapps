import hre from "hardhat";
import DeployedAddress from "../ignition/deployments/chain-31337/deployed_addresses.json";

console.log(
  `
Auditing for crowdfunding on address 0x0520E90CfAF2A47a71Ca9Eb446664c35014F832d
        Title: Bantu Korban Banjir di Kalimantan Selatan
        Description: Penggalangan dana untuk menyediakan kebutuhan darurat bagi korban banjir di Kalimantan Selatan.
        Categories: Bencana Alam
        Target: Rp. 250,000,000
        StartAt: 2024-11-02T08:26:34.000Z
Deadline: 2024-11-22T08:26:25.000Z
        Total Raised: Rp. 250,000,000
        Current Fund: Rp. 249,000,000
Contribution List: 
        #1}
                 By: 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
                 Amount: Rp. 20,000
                 Timestamp: 2024-11-02T08:29:22.000Z
        #2}
                 By: 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
                 Amount: Rp. 500,000
                 Timestamp: 2024-11-02T08:42:00.000Z
        #3}
                 By: 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
                 Amount: Rp. 200,000
                 Timestamp: 2024-11-02T09:42:20.000Z
        #4}
                 By: 0xdD2FD4581271e230360230F9337D5c0430Bf44C0
                 Amount: Rp. 1,000,000
                 Timestamp: 2024-11-03T04:43:50.000Z
        #5}
                 By: 0xdD2FD4581271e230360230F9337D5c0430Bf44C0
                 Amount: Rp. 30,000,000
                 Timestamp: 2024-11-03T04:44:03.000Z
        #6}
                 By: 0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097
                 Amount: Rp. 1,000,000
                 Timestamp: 2024-11-03T04:48:04.000Z
        #7}
                 By: 0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097
                 Amount: Rp. 20,000,000
                 Timestamp: 2024-11-03T04:48:13.000Z
        #8}
                 By: 0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097
                 Amount: Rp. 20,000,000
                 Timestamp: 2024-11-03T04:48:40.000Z
        #9}
                 By: 0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097
                 Amount: Rp. 177,280,000
                 Timestamp: 2024-11-03T04:49:12.000Z
Withdraw List: 
        #1}
                 To: 0xcd3b766ccdd6ae721141f452c550ca635964ce71
                 Amount: Rp. 1,000,000
                 Timestamp: 2024-11-03T04:59:12.000Z
  `
);

const auditTrail = async () => {
  const factory = await hre.ethers.getContractAt(
    "KBFactory",
    DeployedAddress["KBFactoryModule#KBFactory"]
  );
  const allCrowdfundingAddresses = await factory.getAllCrowdfundingAddress();
  console.info("Performing audit trail for: ", allCrowdfundingAddresses);
  for (const cfAddress of allCrowdfundingAddresses) {
    console.log(`Auditing for crowdfunding on address ${cfAddress}`);
    const crowdfunding = await hre.ethers.getContractAt(
      "Crowdfunding",
      cfAddress
    );
    const title = await crowdfunding.title();
    const description = await crowdfunding.shortDescription();
    const categories = await crowdfunding.getCategories();
    const target = await crowdfunding.getTarget();
    const startAt = await crowdfunding.startAt();
    const deadline = await crowdfunding.deadline();
    const totalRaised = await crowdfunding.totalRaised();
    const currentFund = await crowdfunding.current();

    const contributions = await crowdfunding.getContributions();
    const burnings = await crowdfunding.getBurnings();

    console.log(`\tTitle: ${title}`);
    console.log(`\tDescription: ${description}`);
    console.log(`\tCategories: ${categories}`);
    console.log(`\tTarget: Rp. ${target.toLocaleString()}`);
    console.log(`\tStartAt: ${new Date(Number(startAt) * 1000).toISOString()}`);
    console.log(
      `\Deadline: ${new Date(Number(deadline) * 1000).toISOString()}`
    );
    console.log(`\tTotal Raised: Rp. ${totalRaised.toLocaleString()}`);
    console.log(`\tCurrent Fund: Rp. ${currentFund.toLocaleString()}`);

    console.log("Contribution List: ");
    contributions.forEach((contrib, i) => {
      console.log(`\t#${i + 1}}`);
      console.log(`\t\t By: ${contrib[0]}`);
      console.log(`\t\t Amount: Rp. ${contrib[1].toLocaleString()}`);
      console.log(
        `\t\t Timestamp: ${new Date(Number(contrib[2]) * 1000).toISOString()}`
      );
    });

    console.log("Withdraw List: ");
    burnings.forEach((bruning, i) => {
      console.log(`\t#${i + 1}`);
      console.log(`\t\t to: ${bruning[0]}`);
      console.log(`\t\t Amount: Rp. ${bruning[1].toLocaleString()}`);
      console.log(
        `\t\t Timestamp: ${new Date(Number(bruning[2]) * 1000).toISOString()}`
      );
    });
  }
};

// auditTrail().catch(console.error);
