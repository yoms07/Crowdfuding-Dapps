// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  DataSourceTemplate,
  DataSourceContext,
  Address,
} from "@graphprotocol/graph-ts";

export class CrowdfundingMetadata extends DataSourceTemplate {
  static create(cid: string): void {
    DataSourceTemplate.create("CrowdfundingMetadata", [cid]);
  }

  static createWithContext(cid: string, context: DataSourceContext): void {
    DataSourceTemplate.createWithContext(
      "CrowdfundingMetadata",
      [cid],
      context,
    );
  }
}

export class Crowdfunding extends DataSourceTemplate {
  static create(address: Address): void {
    DataSourceTemplate.create("Crowdfunding", [address.toHex()]);
  }

  static createWithContext(address: Address, context: DataSourceContext): void {
    DataSourceTemplate.createWithContext(
      "Crowdfunding",
      [address.toHex()],
      context,
    );
  }
}
