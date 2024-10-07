import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const GravityModule = buildModule("GravityModule", (m) => {
  const gravity = m.contract("Gravity");

  return { gravity };
});

export default GravityModule;
