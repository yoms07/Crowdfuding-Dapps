import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const KBConfigModule = buildModule("KBConfigModule", (m) => {
  const kbConfig = m.contract("KBConfig");
  return { kbConfig };
});

export default KBConfigModule;
