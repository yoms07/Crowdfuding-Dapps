const DeployedAddress = require("./ignition/deployments/chain-31337/deployed_addresses.json")
const fs = require("fs")
const main = async () => {
  const addressConfig = {
    "kbToken": DeployedAddress["KBTokenModule#KBToken"],
    "kbFactory": DeployedAddress["KBFactoryModule#KBFactory"],
    "kbConfig": DeployedAddress["KBConfigModule#KBConfig"]
  }

  fs.writeFileSync("../frontend/src/config/contract_address.json", JSON.stringify(addressConfig, null, 2))

  console.log(`New Token address: ${DeployedAddress["KBTokenModule#KBToken"]}`)

}

main();
