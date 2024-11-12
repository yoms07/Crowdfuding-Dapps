import { ignition, ethers } from "hardhat";
import { time, getStorageAt } from "@nomicfoundation/hardhat-network-helpers";
import KBTokenModule from "../ignition/modules/KBToken";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import KBFactoryModule from "../ignition/modules/KBFactory";
import { expect } from "chai";

describe("Crowdfunding", async function () {
  async function deploy(parameters: any) {
    return ignition.deploy(KBTokenModule, {
      parameters,
    });
  }
  const getDeployerAccounts = async () => {
    const [tokenDeployer, factoryDeployer] = await ethers.getSigners();
    return {
      tokenDeployer,
      factoryDeployer,
    };
  };
  async function deployFactory() {
    const { kbFactory, kbToken } = await ignition.deploy(KBFactoryModule);
    const tokenAddress = await kbToken.getAddress();
    const cfOwner1 = await ethers.provider.getSigner(2);
    const cfOwner2 = await ethers.provider.getSigner(3);
    const factoryOwner = await ethers.provider.getSigner(4);
    return {
      kbFactory,
      kbToken,
      cfOwner1,
      cfOwner2,
      factoryOwner,
      tokenAddress,
    };
  }

  describe("Constructor", async function () {
    it("Should set the right properties", async function () {
      const { tokenAddress, factoryOwner, cfOwner1 } = await loadFixture(
        deployFactory
      );

      const oneWeekInSecond = 7 * 24 * 60 * 60;
      const now = await time.latest();
      const deadline = now + oneWeekInSecond;
      const cf = await ethers.deployContract(
        "Crowdfunding",
        [
          cfOwner1.address,
          "Title",
          ["charity", "natural-disaster"],
          1_000_000,
          deadline,
          tokenAddress,
        ],
        {
          signer: factoryOwner,
        }
      );

      const categories = await cf.getCategories();
      expect(await cf.title()).equal("Title");
      expect(await cf.getCategories()).eql(["charity", "natural-disaster"]);
      expect(await cf.deadline()).equal(deadline);
      // expect(await cf.target()).equal(1_000_000);
      expect(await cf.current()).equal(0);
      expect(await cf.tokenAddress()).equal(tokenAddress);
      expect(await cf.starter()).equal(cfOwner1.address);
      expect(await cf.isOpen()).equal(true);

      const data = await getStorageAt(await cf.getAddress(), 0);
      console.log(data);
    });

    it("Should not deploy deadline before now", async function () {
      const { tokenAddress, cfOwner1, factoryOwner } = await loadFixture(
        deployFactory
      );

      const now = await time.latest();

      expect(
        ethers.deployContract(
          "Crowdfunding",
          [
            cfOwner1.address,
            "Title",
            ["charity", "natural-disaster"],
            1_000_000,
            now - 1,
            tokenAddress,
          ],
          {
            signer: factoryOwner,
          }
        )
      ).to.be.reverted;
    });
  });
});
