const { abi } = require("./artifacts/contracts/KBToken.sol/KBToken.json")
const { ethers } = require("hardhat")

const main = async () => {

  const signer = await ethers.provider.getSigner(0)
  const contract = new ethers.Contract("0x5FC8d32690cc91D4c39d9d3abcBD16989F875707", abi, signer);



  // await contract.connect(ethers.getDefaultProvider());

  await contract.addListener("TopUp", function (event) {
    console.log("SAMPE SINII")
    console.log(event)
  })

  contract.on("TopUp", (to, amount) => {
    console.log("SAMPE SINI")
  })


  console.log("RUNNING")
  const tx = await contract.topUp("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", 10000);

}

const mainRPC = async () => {
  const provider = new ethers.JsonRpcProvider("http://0.0.0.0:8545")

  const signer = await provider.getSigner(0)
  const contract = new ethers.Contract("0x5FC8d32690cc91D4c39d9d3abcBD16989F875707", abi, signer);



  // await contract.connect(ethers.getDefaultProvider());

  await contract.addListener("TopUp", function (event) {
    console.log("SAMPE SINII")
    console.log(event)
  })

  contract.on("TopUp", (to, amount) => {
    console.log("SAMPE SINI")
  })


  console.log("RUNNING")
  const tx = await contract.topUp("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", 10000);

}

mainRPC().catch(console.error)