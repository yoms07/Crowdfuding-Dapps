import { Bytes, dataSource, json, JSONValue } from "@graphprotocol/graph-ts";
import { CrowdfundingMetadata } from "../generated/schema";

export function handleMetadata(content: Bytes): void {
  let crowdfundingMetadata = new CrowdfundingMetadata(dataSource.stringParam());
  const value = json.fromBytes(content).toObject();

  if (value) {
    const description = value.get("description");

    if (description) {
      crowdfundingMetadata.description = description.toString();
    }

    crowdfundingMetadata.save();
  }
}
