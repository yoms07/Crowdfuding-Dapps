import { abi as CrowdfundingABI } from "../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json"
import { abi as FactoryABI } from "../artifacts/contracts/KBFactory.sol/KBFactory.json"
import DeployedAddress from "./ignition/deployments/chain-31337/deployed_addresses.json";

export async function uploadJSONToIPFS(json) {
  const client = create({ url: "http://127.0.0.1:5001/api/v0" });
  const { cid } = await client.add({
    content: uint8ArrayFromString(JSON.stringify(json)),
  });
  return cid.toString()
}

export async function getJSONFromIPFS(cid) {
  const client = create({ url: "http://127.0.0.1:5001/api/v0" });

  const data = uint8ArrayConcat(
    await all(client.cat(cid))
  );
  const json = JSON.parse(
    uint8ArrayToString(data)
  );

  return json
}

export async function getCrowdfundingContract(address, signer) {
  const contract = await ethers.getContractAt(CrowdfundingABI, address, signer);
  return contract
}


export async function getFactoryContract(signer) {
  const contract = await ethers.getContractAt(FactoryABI, DeployedAddress["KBFactoryModule#KBFactory"], signer);
  return contract
}