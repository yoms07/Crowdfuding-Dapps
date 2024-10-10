const { getCrowdfundingContract, getJSONFromIPFS, getProvider } = require("./utils")

async function inspectCrowdfunding() {
  const cfAddress = "0x8398bCD4f633C72939F9043dB78c574A91C99c0A";

  const signer = await (await getProvider()).getSigner(0);
  const contract = await getCrowdfundingContract(cfAddress, signer);

  const title = await contract.title();
  const description = await contract.shortDescription();
  const categories = await contract.getCategories();
  const target = await contract.getTarget();
  const current = await contract.current();
  const deadline = await contract.deadline();
  const isOpen = await contract.isOpen();
  const metadataCID = await contract.metadataCID();

  const metadata = await getJSONFromIPFS(metadataCID);

  console.log("Title: ", title);
  console.log("Description: ", description);
  console.log("Categories: ", categories);
  console.log("Target: ", target);
  console.log("Current: ", current);
  console.log("Deadline: ", deadline);
  console.log("IsOpen: ", isOpen);
  console.log("Metadata: ", metadata);
}

inspectCrowdfunding().catch(console.error);
