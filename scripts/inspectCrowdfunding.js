import { getCrowdfundingContract, getJSONFromIPFS } from "./utils";

async function inspectCrowdfunding() {
  const cfAddress = "";

  const contract = await getCrowdfundingContract(cfAddress, signer)

  const title = await contract.title();
  const description = await contract.description();
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
  console.log("Metadata: ", metadata)
}

inspectCrowdfunding().catch(console.error);