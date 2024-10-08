import { v4 } from "uuid";
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
  crowdfunding!.isOpen = event.params.isOpen;

  const contribution = new CrowdfundingContribution(v4());
  contribution.amount = event.params.contribution.amount;
  contribution.contributor = event.params.contribution.contributor.toHex();
  contribution.timestamp = event.params.contribution.timestamp;

  contribution.save();
  userWallet!.save();
  crowdfunding!.save();
}

export function handleWithdraw(event: Withdraw): void {
  const userWallet = UserWallet.load(event.params.burning.to);
  const crowdfunding = Crowdfunding.load(event.params.cfAddress);

  userWallet!.balance += event.params.burning.amount.toI32();
  crowdfunding!.current -= event.params.burning.amount.toI32();

  const burning = new CrowdfundingBurning(v4());
  burning.amount = event.params.burning.amount;
  burning.to = event.params.burning.to.toHex();
  burning.timestamp = event.params.burning.timestamp;

  burning.save();
  userWallet!.save();
  crowdfunding!.save();
}
