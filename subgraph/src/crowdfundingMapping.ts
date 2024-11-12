import { crypto, ByteArray, log } from "@graphprotocol/graph-ts";
import {
  Crowdfunding,
  CrowdfundingContribution,
  CrowdfundingBurning,
  UserWallet,
} from "../generated/schema";
import {
  ContributionAdded,
  Withdraw,
} from "../generated/templates/Crowdfunding/Crowdfunding";

export function handleContributionAdded(event: ContributionAdded): void {
  const userWallet = UserWallet.load(event.params.contribution.contributor);
  const crowdfunding = Crowdfunding.load(event.params.cfAddress);

  userWallet!.balance -= event.params.contribution.amount.toI32();
  crowdfunding!.current += event.params.contribution.amount.toI32();
  crowdfunding!.totalRaised += event.params.contribution.amount.toI32();
  crowdfunding!.isOpen = event.params.isOpen;

  const uniqueIdToHash = `${event.block.timestamp.toString()}_${event.params.contribution.contributor.toHex()}_${event.params.cfAddress.toString()}`;
  const id = crypto.keccak256(ByteArray.fromUTF8(uniqueIdToHash)).toHex();
  const contribution = new CrowdfundingContribution(id);

  contribution.crowdfunding = event.params.cfAddress;
  contribution.amount = event.params.contribution.amount.toI32();
  contribution.contributor = event.params.contribution.contributor.toHex();
  contribution.timestamp = event.params.contribution.timestamp.toI32();

  contribution.save();
  userWallet!.save();
  crowdfunding!.save();
}

export function handleWithdraw(event: Withdraw): void {
  log.info("RECEIVE WITHDRAW: To={}, CFAddress={}, Amount={}", [
    event.params.burning.to.toHex(),
    event.params.cfAddress.toHex(),
    event.params.burning.amount.toString(),
  ]);
  let userWallet = UserWallet.load(event.params.burning.to);
  if (userWallet === null) {
    userWallet = new UserWallet(event.params.burning.to);
    userWallet.balance = 0;
    userWallet.address = event.params.burning.to;
  }
  const crowdfunding = Crowdfunding.load(event.params.cfAddress);

  userWallet.balance += event.params.burning.amount.toI32();
  crowdfunding!.current -= event.params.burning.amount.toI32();

  const uniqueIdToHash = `${event.block.timestamp.toString()}_${event.params.burning.to.toHex()}_${event.params.cfAddress.toString()}`;
  const id = crypto.keccak256(ByteArray.fromUTF8(uniqueIdToHash)).toHex();

  const burning = new CrowdfundingBurning(id);
  burning.crowdfunding = event.params.cfAddress;
  burning.amount = event.params.burning.amount.toI32();
  burning.to = event.params.burning.to.toHex();
  burning.timestamp = event.params.burning.timestamp.toI32();

  burning.save();
  userWallet.save();
  crowdfunding!.save();
}
