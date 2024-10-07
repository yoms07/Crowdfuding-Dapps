import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const KBTokenModule = buildModule("KBTokenModule", (m) => {
  const account = m.getAccount(0);
  const kbToken = m.contract("KBToken", [], {
    from: account,
  });
  return { kbToken };
});

export default KBTokenModule;
