const { getProvider, getFactoryContract, getTokenContract } = require("./utils")

async function donate() {
  const cfAdress = "0x8398bCD4f633C72939F9043dB78c574A91C99c0A"
  const amount = 10000000

  const signer = await (await getProvider()).getSigner(18)
  const factoryContract = await getFactoryContract(signer)
  const tokenContract = await getTokenContract(signer)

  let tx = await tokenContract.approve(cfAdress, amount);
  await tx.wait();
  await factoryContract.donate(cfAdress, amount);
}

donate().catch(console.error);