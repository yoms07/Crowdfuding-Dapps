// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class ConfigChanged extends ethereum.Event {
  get params(): ConfigChanged__Params {
    return new ConfigChanged__Params(this);
  }
}

export class ConfigChanged__Params {
  _event: ConfigChanged;

  constructor(event: ConfigChanged) {
    this._event = event;
  }

  get param0(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class CrowdfundingCreated extends ethereum.Event {
  get params(): CrowdfundingCreated__Params {
    return new CrowdfundingCreated__Params(this);
  }
}

export class CrowdfundingCreated__Params {
  _event: CrowdfundingCreated;

  constructor(event: CrowdfundingCreated) {
    this._event = event;
  }

  get starter(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get title(): string {
    return this._event.parameters[1].value.toString();
  }

  get description(): string {
    return this._event.parameters[2].value.toString();
  }

  get categories(): Array<string> {
    return this._event.parameters[3].value.toStringArray();
  }

  get newCfAddress(): Address {
    return this._event.parameters[4].value.toAddress();
  }

  get ipfsHash(): string {
    return this._event.parameters[5].value.toString();
  }

  get target(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }

  get deadline(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class KBFactory extends ethereum.SmartContract {
  static bind(address: Address): KBFactory {
    return new KBFactory("KBFactory", address);
  }

  cfList(param0: BigInt): Address {
    let result = super.call("cfList", "cfList(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0),
    ]);

    return result[0].toAddress();
  }

  try_cfList(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("cfList", "cfList(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  createCrowdfunding(
    title: string,
    shortDescription: string,
    categories: Array<string>,
    metadataCID: string,
    target: BigInt,
    deadline: BigInt,
  ): Address {
    let result = super.call(
      "createCrowdfunding",
      "createCrowdfunding(string,string,string[],string,uint256,uint256):(address)",
      [
        ethereum.Value.fromString(title),
        ethereum.Value.fromString(shortDescription),
        ethereum.Value.fromStringArray(categories),
        ethereum.Value.fromString(metadataCID),
        ethereum.Value.fromUnsignedBigInt(target),
        ethereum.Value.fromUnsignedBigInt(deadline),
      ],
    );

    return result[0].toAddress();
  }

  try_createCrowdfunding(
    title: string,
    shortDescription: string,
    categories: Array<string>,
    metadataCID: string,
    target: BigInt,
    deadline: BigInt,
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "createCrowdfunding",
      "createCrowdfunding(string,string,string[],string,uint256,uint256):(address)",
      [
        ethereum.Value.fromString(title),
        ethereum.Value.fromString(shortDescription),
        ethereum.Value.fromStringArray(categories),
        ethereum.Value.fromString(metadataCID),
        ethereum.Value.fromUnsignedBigInt(target),
        ethereum.Value.fromUnsignedBigInt(deadline),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  donate(cfAddress: Address, amount: BigInt): BigInt {
    let result = super.call("donate", "donate(address,uint256):(uint256)", [
      ethereum.Value.fromAddress(cfAddress),
      ethereum.Value.fromUnsignedBigInt(amount),
    ]);

    return result[0].toBigInt();
  }

  try_donate(cfAddress: Address, amount: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("donate", "donate(address,uint256):(uint256)", [
      ethereum.Value.fromAddress(cfAddress),
      ethereum.Value.fromUnsignedBigInt(amount),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getAllCrowdfundingAddress(): Array<Address> {
    let result = super.call(
      "getAllCrowdfundingAddress",
      "getAllCrowdfundingAddress():(address[])",
      [],
    );

    return result[0].toAddressArray();
  }

  try_getAllCrowdfundingAddress(): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall(
      "getAllCrowdfundingAddress",
      "getAllCrowdfundingAddress():(address[])",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }

  isCFExist(cfAddress: Address): boolean {
    let result = super.call("isCFExist", "isCFExist(address):(bool)", [
      ethereum.Value.fromAddress(cfAddress),
    ]);

    return result[0].toBoolean();
  }

  try_isCFExist(cfAddress: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("isCFExist", "isCFExist(address):(bool)", [
      ethereum.Value.fromAddress(cfAddress),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  withdraw(to: Address, cfAddress: Address, amount: BigInt): BigInt {
    let result = super.call(
      "withdraw",
      "withdraw(address,address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(to),
        ethereum.Value.fromAddress(cfAddress),
        ethereum.Value.fromUnsignedBigInt(amount),
      ],
    );

    return result[0].toBigInt();
  }

  try_withdraw(
    to: Address,
    cfAddress: Address,
    amount: BigInt,
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "withdraw",
      "withdraw(address,address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(to),
        ethereum.Value.fromAddress(cfAddress),
        ethereum.Value.fromUnsignedBigInt(amount),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CreateCrowdfundingCall extends ethereum.Call {
  get inputs(): CreateCrowdfundingCall__Inputs {
    return new CreateCrowdfundingCall__Inputs(this);
  }

  get outputs(): CreateCrowdfundingCall__Outputs {
    return new CreateCrowdfundingCall__Outputs(this);
  }
}

export class CreateCrowdfundingCall__Inputs {
  _call: CreateCrowdfundingCall;

  constructor(call: CreateCrowdfundingCall) {
    this._call = call;
  }

  get title(): string {
    return this._call.inputValues[0].value.toString();
  }

  get shortDescription(): string {
    return this._call.inputValues[1].value.toString();
  }

  get categories(): Array<string> {
    return this._call.inputValues[2].value.toStringArray();
  }

  get metadataCID(): string {
    return this._call.inputValues[3].value.toString();
  }

  get target(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get deadline(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }
}

export class CreateCrowdfundingCall__Outputs {
  _call: CreateCrowdfundingCall;

  constructor(call: CreateCrowdfundingCall) {
    this._call = call;
  }

  get cfAddress(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}

export class DonateCall extends ethereum.Call {
  get inputs(): DonateCall__Inputs {
    return new DonateCall__Inputs(this);
  }

  get outputs(): DonateCall__Outputs {
    return new DonateCall__Outputs(this);
  }
}

export class DonateCall__Inputs {
  _call: DonateCall;

  constructor(call: DonateCall) {
    this._call = call;
  }

  get cfAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class DonateCall__Outputs {
  _call: DonateCall;

  constructor(call: DonateCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetConfigCall extends ethereum.Call {
  get inputs(): SetConfigCall__Inputs {
    return new SetConfigCall__Inputs(this);
  }

  get outputs(): SetConfigCall__Outputs {
    return new SetConfigCall__Outputs(this);
  }
}

export class SetConfigCall__Inputs {
  _call: SetConfigCall;

  constructor(call: SetConfigCall) {
    this._call = call;
  }

  get cfgAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetConfigCall__Outputs {
  _call: SetConfigCall;

  constructor(call: SetConfigCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get cfAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}
