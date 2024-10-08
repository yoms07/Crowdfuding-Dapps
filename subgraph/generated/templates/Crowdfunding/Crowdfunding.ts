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

export class ContributionAdded extends ethereum.Event {
  get params(): ContributionAdded__Params {
    return new ContributionAdded__Params(this);
  }
}

export class ContributionAdded__Params {
  _event: ContributionAdded;

  constructor(event: ContributionAdded) {
    this._event = event;
  }

  get cfAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get contribution(): ContributionAddedContributionStruct {
    return changetype<ContributionAddedContributionStruct>(
      this._event.parameters[1].value.toTuple(),
    );
  }

  get isOpen(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class ContributionAddedContributionStruct extends ethereum.Tuple {
  get contributor(): Address {
    return this[0].toAddress();
  }

  get amount(): BigInt {
    return this[1].toBigInt();
  }

  get timestamp(): BigInt {
    return this[2].toBigInt();
  }
}

export class Withdraw extends ethereum.Event {
  get params(): Withdraw__Params {
    return new Withdraw__Params(this);
  }
}

export class Withdraw__Params {
  _event: Withdraw;

  constructor(event: Withdraw) {
    this._event = event;
  }

  get cfAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get burning(): WithdrawBurningStruct {
    return changetype<WithdrawBurningStruct>(
      this._event.parameters[1].value.toTuple(),
    );
  }
}

export class WithdrawBurningStruct extends ethereum.Tuple {
  get to(): Address {
    return this[0].toAddress();
  }

  get amount(): BigInt {
    return this[1].toBigInt();
  }

  get timestamp(): BigInt {
    return this[2].toBigInt();
  }
}

export class Crowdfunding__burningsResult {
  value0: Address;
  value1: BigInt;
  value2: BigInt;

  constructor(value0: Address, value1: BigInt, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }

  getTo(): Address {
    return this.value0;
  }

  getAmount(): BigInt {
    return this.value1;
  }

  getTimestamp(): BigInt {
    return this.value2;
  }
}

export class Crowdfunding__contributionsResult {
  value0: Address;
  value1: BigInt;
  value2: BigInt;

  constructor(value0: Address, value1: BigInt, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }

  getContributor(): Address {
    return this.value0;
  }

  getAmount(): BigInt {
    return this.value1;
  }

  getTimestamp(): BigInt {
    return this.value2;
  }
}

export class Crowdfunding__getContributionsResultValue0Struct extends ethereum.Tuple {
  get contributor(): Address {
    return this[0].toAddress();
  }

  get amount(): BigInt {
    return this[1].toBigInt();
  }

  get timestamp(): BigInt {
    return this[2].toBigInt();
  }
}

export class Crowdfunding extends ethereum.SmartContract {
  static bind(address: Address): Crowdfunding {
    return new Crowdfunding("Crowdfunding", address);
  }

  addContribution(by: Address, amount: BigInt): BigInt {
    let result = super.call(
      "addContribution",
      "addContribution(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(by),
        ethereum.Value.fromUnsignedBigInt(amount),
      ],
    );

    return result[0].toBigInt();
  }

  try_addContribution(
    by: Address,
    amount: BigInt,
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "addContribution",
      "addContribution(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(by),
        ethereum.Value.fromUnsignedBigInt(amount),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  burnings(param0: BigInt): Crowdfunding__burningsResult {
    let result = super.call(
      "burnings",
      "burnings(uint256):(address,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );

    return new Crowdfunding__burningsResult(
      result[0].toAddress(),
      result[1].toBigInt(),
      result[2].toBigInt(),
    );
  }

  try_burnings(
    param0: BigInt,
  ): ethereum.CallResult<Crowdfunding__burningsResult> {
    let result = super.tryCall(
      "burnings",
      "burnings(uint256):(address,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Crowdfunding__burningsResult(
        value[0].toAddress(),
        value[1].toBigInt(),
        value[2].toBigInt(),
      ),
    );
  }

  contributionAllowed(amount: BigInt): BigInt {
    let result = super.call(
      "contributionAllowed",
      "contributionAllowed(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(amount)],
    );

    return result[0].toBigInt();
  }

  try_contributionAllowed(amount: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "contributionAllowed",
      "contributionAllowed(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(amount)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  contributions(param0: BigInt): Crowdfunding__contributionsResult {
    let result = super.call(
      "contributions",
      "contributions(uint256):(address,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );

    return new Crowdfunding__contributionsResult(
      result[0].toAddress(),
      result[1].toBigInt(),
      result[2].toBigInt(),
    );
  }

  try_contributions(
    param0: BigInt,
  ): ethereum.CallResult<Crowdfunding__contributionsResult> {
    let result = super.tryCall(
      "contributions",
      "contributions(uint256):(address,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Crowdfunding__contributionsResult(
        value[0].toAddress(),
        value[1].toBigInt(),
        value[2].toBigInt(),
      ),
    );
  }

  current(): BigInt {
    let result = super.call("current", "current():(uint256)", []);

    return result[0].toBigInt();
  }

  try_current(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("current", "current():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  deadline(): BigInt {
    let result = super.call("deadline", "deadline():(uint256)", []);

    return result[0].toBigInt();
  }

  try_deadline(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("deadline", "deadline():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  factoryAddress(): Address {
    let result = super.call("factoryAddress", "factoryAddress():(address)", []);

    return result[0].toAddress();
  }

  try_factoryAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "factoryAddress",
      "factoryAddress():(address)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getContributions(): Array<Crowdfunding__getContributionsResultValue0Struct> {
    let result = super.call(
      "getContributions",
      "getContributions():((address,uint256,uint256)[])",
      [],
    );

    return result[0].toTupleArray<Crowdfunding__getContributionsResultValue0Struct>();
  }

  try_getContributions(): ethereum.CallResult<
    Array<Crowdfunding__getContributionsResultValue0Struct>
  > {
    let result = super.tryCall(
      "getContributions",
      "getContributions():((address,uint256,uint256)[])",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTupleArray<Crowdfunding__getContributionsResultValue0Struct>(),
    );
  }

  getTarget(): BigInt {
    let result = super.call("getTarget", "getTarget():(uint256)", []);

    return result[0].toBigInt();
  }

  try_getTarget(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getTarget", "getTarget():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  isOpen(): boolean {
    let result = super.call("isOpen", "isOpen():(bool)", []);

    return result[0].toBoolean();
  }

  try_isOpen(): ethereum.CallResult<boolean> {
    let result = super.tryCall("isOpen", "isOpen():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  metadataCID(): string {
    let result = super.call("metadataCID", "metadataCID():(string)", []);

    return result[0].toString();
  }

  try_metadataCID(): ethereum.CallResult<string> {
    let result = super.tryCall("metadataCID", "metadataCID():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  startAt(): BigInt {
    let result = super.call("startAt", "startAt():(uint256)", []);

    return result[0].toBigInt();
  }

  try_startAt(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("startAt", "startAt():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  starter(): Address {
    let result = super.call("starter", "starter():(address)", []);

    return result[0].toAddress();
  }

  try_starter(): ethereum.CallResult<Address> {
    let result = super.tryCall("starter", "starter():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  target(): BigInt {
    let result = super.call("target", "target():(uint256)", []);

    return result[0].toBigInt();
  }

  try_target(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("target", "target():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenAddress(): Address {
    let result = super.call("tokenAddress", "tokenAddress():(address)", []);

    return result[0].toAddress();
  }

  try_tokenAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall("tokenAddress", "tokenAddress():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
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

  get _starter(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _metadataCID(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _target(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _deadline(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get _tokenAddress(): Address {
    return this._call.inputValues[4].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddContributionCall extends ethereum.Call {
  get inputs(): AddContributionCall__Inputs {
    return new AddContributionCall__Inputs(this);
  }

  get outputs(): AddContributionCall__Outputs {
    return new AddContributionCall__Outputs(this);
  }
}

export class AddContributionCall__Inputs {
  _call: AddContributionCall;

  constructor(call: AddContributionCall) {
    this._call = call;
  }

  get by(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class AddContributionCall__Outputs {
  _call: AddContributionCall;

  constructor(call: AddContributionCall) {
    this._call = call;
  }

  get contributionAdded(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class EditCrowdfundingCall extends ethereum.Call {
  get inputs(): EditCrowdfundingCall__Inputs {
    return new EditCrowdfundingCall__Inputs(this);
  }

  get outputs(): EditCrowdfundingCall__Outputs {
    return new EditCrowdfundingCall__Outputs(this);
  }
}

export class EditCrowdfundingCall__Inputs {
  _call: EditCrowdfundingCall;

  constructor(call: EditCrowdfundingCall) {
    this._call = call;
  }

  get _target(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _deadline(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class EditCrowdfundingCall__Outputs {
  _call: EditCrowdfundingCall;

  constructor(call: EditCrowdfundingCall) {
    this._call = call;
  }
}

export class EditMetadataCIDCall extends ethereum.Call {
  get inputs(): EditMetadataCIDCall__Inputs {
    return new EditMetadataCIDCall__Inputs(this);
  }

  get outputs(): EditMetadataCIDCall__Outputs {
    return new EditMetadataCIDCall__Outputs(this);
  }
}

export class EditMetadataCIDCall__Inputs {
  _call: EditMetadataCIDCall;

  constructor(call: EditMetadataCIDCall) {
    this._call = call;
  }

  get newCID(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class EditMetadataCIDCall__Outputs {
  _call: EditMetadataCIDCall;

  constructor(call: EditMetadataCIDCall) {
    this._call = call;
  }
}

export class RemoveContributionCall extends ethereum.Call {
  get inputs(): RemoveContributionCall__Inputs {
    return new RemoveContributionCall__Inputs(this);
  }

  get outputs(): RemoveContributionCall__Outputs {
    return new RemoveContributionCall__Outputs(this);
  }
}

export class RemoveContributionCall__Inputs {
  _call: RemoveContributionCall;

  constructor(call: RemoveContributionCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class RemoveContributionCall__Outputs {
  _call: RemoveContributionCall;

  constructor(call: RemoveContributionCall) {
    this._call = call;
  }
}