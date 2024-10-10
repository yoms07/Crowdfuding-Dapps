const { uploadJSONToIPFS, getFactoryContract, getProvider } = require("./utils")
const { v4 } = require("uuid")

function getEightDaysFromNow() {
  const now = new Date();
  const eightDaysLater = new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000);
  return eightDaysLater;
}

async function createCrowdfunding() {
  const title = "title";
  const categories = ["Sport", "Technology"];
  const description = "Description";
  const target = 10_000_000;
  const deadline = Math.floor(getEightDaysFromNow().getTime() / 1000);

  const signer = await (await getProvider()).getSigner(19);
  const contract = await getFactoryContract(signer);

  const cid = await uploadJSONToIPFS({
    description,
    random: v4(),
  });

  console.log(cid)

  await contract.createCrowdfunding(
    title,
    description,
    categories,
    cid,
    target,
    deadline
  );
}

createCrowdfunding().catch(console.error);
