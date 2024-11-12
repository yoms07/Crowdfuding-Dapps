const { getProvider, getFactoryContract } = require("./utils")

async function donate() {
  const cfAdress = "0x8398bcd4f633c72939f9043db78c574a91c99c0a"
  const amount = 5000

  const signer = await (await getProvider()).getSigner(19)
  const factoryContract = await getFactoryContract(signer)

  await factoryContract.withdraw(signer.address, cfAdress, amount);
}

donate().catch(console.error);