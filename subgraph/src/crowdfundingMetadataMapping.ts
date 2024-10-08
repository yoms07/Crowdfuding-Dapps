import { Bytes, dataSource, json } from "@graphprotocol/graph-ts";
import { CrowdfundingMetadata } from "../generated/schema";

export function handleMetadata(content: Bytes): void {
  let crowdfundingMetadata = new CrowdfundingMetadata(dataSource.stringParam());
  const value = json.fromBytes(content).toObject();

  if (value) {
    const title = value.get("title");
    const description = value.get("description");
    const categories = value.get("categories");

    if (title && description && categories) {
      crowdfundingMetadata.title = title.toString();
      crowdfundingMetadata.description = description.toString();
      crowdfundingMetadata.categories = categories
        .toArray()
        .map((c) => c.toString());
    }

    crowdfundingMetadata.save();
  }
}
