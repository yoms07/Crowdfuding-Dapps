import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import KBTokenModule from "./KBToken";
import KBConfigModule from "./KBConfig";
const KBFactoryModule = buildModule("KBFactoryModule", (m) => {
  const { kbToken } = m.useModule(KBTokenModule);
  const { kbConfig } = m.useModule(KBConfigModule);
  const owner = m.getAccount(1);
  const cfOwner = m.getAccount(19);

  const kbFactory = m.contract("KBFactory", [kbToken], {
    from: owner,
  });

  const setConfig = m.call(kbFactory, "setConfig", [kbConfig], {
    from: owner,
  });

  return { kbToken, kbFactory };
});

export default KBFactoryModule;
