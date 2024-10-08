import {
  Crowdfunding as CrowdfundingTemplate,
  CrowdfundingMetadata as CrowdfundingMetadataTemplate,
} from "../generated/templates";
import { CrowdfundingCreated } from "../generated/KBFactory/KBFactory";
import { Crowdfunding } from "../generated/schema";

export function handleCrowdfundingCreated(event: CrowdfundingCreated): void {
  let crowdfunding = new Crowdfunding(event.params.newCfAddress);
  crowdfunding.current = 0;
  crowdfunding.target = event.params.target;
  crowdfunding.deadline = event.params.deadline;
  crowdfunding.ipfsURI = event.params.ipfsHash;

  CrowdfundingTemplate.create(event.params.newCfAddress);
  CrowdfundingMetadataTemplate.create(event.params.ipfsHash);
  crowdfunding.save();
}
