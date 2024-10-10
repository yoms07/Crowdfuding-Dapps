import { create } from "kubo-rpc-client";
import all from "it-all";
import { fromString as uint8ArrayFromString } from "uint8arrays"
import { concat as uint8ArrayConcat } from "uint8arrays/concat";
import { toString as uint8ArrayToString } from "uint8arrays/to-string";
import { ethers } from "hardhat"
import { uploadJSONToIPFS, getJSONFromIPFS, getCrowdfundingContract, getFactoryContract } from "./utils"

import { v4 } from "uuid"

function getEightDaysFromNow() {
  const now = new Date();
  const eightDaysLater = new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000);
  return eightDaysLater;
}

async function createCrowdfunding() {
  const title = "title";
  const categories = ["Sport", "Technology"];
  const description = "Description"
  const target = 10_000_000;
  const deadline = getEightDaysFromNow().getTime() / 1000;

  const signer = await ethers.provider.getSigner(19);
  const contract = await getFactoryContract(signer);

  const cid = await uploadJSONToIPFS({
    title,
    categories,
    description,
    random: v4()
  })

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
