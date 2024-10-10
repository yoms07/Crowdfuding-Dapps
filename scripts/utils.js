const { abi: CrowdfundingABI } = require("../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json")
const { abi: FactoryABI } = require("../artifacts/contracts/KBFactory.sol/KBFactory.json")
const DeployedAddress = require("../ignition/deployments/chain-31337/deployed_addresses.json")
const { ethers } = require("ethers")


exports.uploadJSONToIPFS = async function (json) {
  const { create } = await import("kubo-rpc-client")
  const { fromString: uint8ArrayFromString } = await import("uint8arrays")
  const client = create({ url: "http://0.0.0.0:5001/api/v0" });
  const { cid } = await client.add({
    content: uint8ArrayFromString(JSON.stringify(json)),
  });
  return cid.toString();
}
exports.getJSONFromIPFS = async function (cid) {
  const { create } = await import("kubo-rpc-client")
  const all = await import("it-all")
  const { concat: uint8ArrayConcat } = await import("uint8arrays/concat")
  const { toString: uint8ArrayToString } = await import("uint8arrays/to-string")

  const client = create({ url: "http://0.0.0.0:5001/api/v0" });

  const data = uint8ArrayConcat(await all.default(client.cat(cid)));
  const json = JSON.parse(uint8ArrayToString(data));

  return json;
}
exports.getCrowdfundingContract = async function (address, signer) {
  return new ethers.Contract(address, CrowdfundingABI, signer);
}

exports.getFactoryContract = async function (signer) {
  return new ethers.Contract(
    DeployedAddress["KBFactoryModule#KBFactory"],
    FactoryABI,
    signer
  );
}

exports.getProvider = async function () {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  return provider;
}



