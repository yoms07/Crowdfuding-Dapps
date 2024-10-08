import { log } from "@graphprotocol/graph-ts";
import { TopUp } from "../generated/KBToken/KBToken";
import { UserWallet } from "../generated/schema";

export function handleTopUp(event: TopUp): void {
  log.info("Receive TopUp Event", [
    event.params.to.toHex(),
    event.params.amount.toString(),
  ]);
  let userWallet = UserWallet.load(event.params.to);
  if (!userWallet) {
    userWallet = new UserWallet(event.params.to);
    userWallet.balance = 0;
  }

  userWallet.balance += event.params.amount;
  userWallet.save();
}
