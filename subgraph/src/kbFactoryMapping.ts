import { log } from "@graphprotocol/graph-ts";
import {
  Crowdfunding as CrowdfundingTemplate,
  CrowdfundingMetadata as CrowdfundingMetadataTemplate,
} from "../generated/templates";
import { CrowdfundingCreated } from "../generated/KBFactory/KBFactory";
import { Crowdfunding } from "../generated/schema";

export function handleCrowdfundingCreated(event: CrowdfundingCreated): void {
  log.info(
    "Receive CrowdfundingCreated: Title={}, Description={}, Categories={}, Target={}, Deadline={}, CID={}",
    [
      event.params.title,
      event.params.description,
      event.params.categories.join(","),
      event.params.target.toString(),
      event.params.deadline.toString(),
      event.params.ipfsHash.toString(),
    ]
  );
  let crowdfunding = new Crowdfunding(event.params.newCfAddress);
  crowdfunding.current = 0;
  crowdfunding.target = event.params.target.toI32();
  crowdfunding.deadline = event.params.deadline.toI32();
  crowdfunding.ipfsURI = event.params.ipfsHash;
  crowdfunding.description = event.params.description;
  crowdfunding.categories = event.params.categories;
  crowdfunding.title = event.params.title;
  crowdfunding.isOpen = true;

  CrowdfundingTemplate.create(event.params.newCfAddress);
  CrowdfundingMetadataTemplate.create(event.params.ipfsHash);
  crowdfunding.save();
}
