import { Enum, GetEnum, FixedSizeBinary, Binary, SS58String, FixedSizeArray, ResultPayload, TxCallData } from "polkadot-api";
type AnonymousEnum<T extends {}> = T & {
    __anonymous: true;
};
type MyTuple<T> = [T, ...T[]];
type SeparateUndefined<T> = undefined extends T ? undefined | Exclude<T, undefined> : T;
type Anonymize<T> = SeparateUndefined<T extends FixedSizeBinary<infer L> ? number extends L ? Binary : FixedSizeBinary<L> : T extends string | number | bigint | boolean | void | undefined | null | symbol | Uint8Array | Enum<any> ? T : T extends AnonymousEnum<infer V> ? Enum<V> : T extends MyTuple<any> ? {
    [K in keyof T]: T[K];
} : T extends [] ? [] : T extends FixedSizeArray<infer L, infer T> ? number extends L ? Array<T> : FixedSizeArray<L, T> : {
    [K in keyof T & string]: T[K];
}>;
export type I5sesotjlssv2d = {
    "nonce": number;
    "consumers": number;
    "providers": number;
    "sufficients": number;
    "data": Anonymize<I1q8tnt1cluu5j>;
};
export type I1q8tnt1cluu5j = {
    "free": bigint;
    "reserved": bigint;
    "frozen": bigint;
    "flags": bigint;
};
export type Iffmde3ekjedi9 = {
    "normal": Anonymize<I4q39t5hn830vp>;
    "operational": Anonymize<I4q39t5hn830vp>;
    "mandatory": Anonymize<I4q39t5hn830vp>;
};
export type I4q39t5hn830vp = {
    "ref_time": bigint;
    "proof_size": bigint;
};
export type I4mddgoa69c0a2 = Array<DigestItem>;
export type DigestItem = Enum<{
    "PreRuntime": Anonymize<I82jm9g7pufuel>;
    "Consensus": Anonymize<I82jm9g7pufuel>;
    "Seal": Anonymize<I82jm9g7pufuel>;
    "Other": Binary;
    "RuntimeEnvironmentUpdated": undefined;
}>;
export declare const DigestItem: GetEnum<DigestItem>;
export type I82jm9g7pufuel = [FixedSizeBinary<4>, Binary];
export type Icv0uola4fi0sv = Array<Anonymize<I307t06l77a5mn>>;
export type I307t06l77a5mn = {
    "phase": Phase;
    "event": Anonymize<I81evgpvkt084o>;
    "topics": Anonymize<Ic5m5lp1oioo8r>;
};
export type Phase = Enum<{
    "ApplyExtrinsic": number;
    "Finalization": undefined;
    "Initialization": undefined;
}>;
export declare const Phase: GetEnum<Phase>;
export type I81evgpvkt084o = AnonymousEnum<{
    "System": Anonymize<I4ppj6e1tjsmi1>;
    "Scheduler": Anonymize<I9td3rb1rc78be>;
    "Preimage": PreimageEvent;
    "Indices": Anonymize<IndicesEvent>;
    "Balances": Anonymize<Iao8h4hv7atnq3>;
    "TransactionPayment": TransactionPaymentEvent;
    "Staking": StakingEvent;
    "Offences": OffencesEvent;
    "Session": SessionEvent;
    "Grandpa": GrandpaEvent;
    "Treasury": Anonymize<Iceo3qo846468b>;
    "ConvictionVoting": ConvictionVotingEvent;
    "Referenda": Anonymize<Idfraa3b4eu018>;
    "Whitelist": Anonymize<I49uspu4v8kcui>;
    "Parameters": Anonymize<In3t00aurfuda>;
    "Claims": CommonClaimsEvent;
    "Vesting": VestingEvent;
    "Utility": Anonymize<Ivn4fchlcfshh>;
    "Proxy": Anonymize<I38492taogqhfn>;
    "Multisig": Anonymize<Ie2ea4ticfr4gj>;
    "Bounties": BountiesEvent;
    "ChildBounties": ChildBountiesEvent;
    "ElectionProviderMultiPhase": ElectionProviderMultiPhaseEvent;
    "VoterList": BagsListEvent;
    "NominationPools": NominationPoolsEvent;
    "FastUnstake": Anonymize<Ibku5mrlj7cn0g>;
    "ParaInclusion": ParachainsInclusionEvent;
    "Paras": ParachainsParasEvent;
    "Hrmp": ParachainsHrmpEvent;
    "ParasDisputes": ParachainsDisputesEvent;
    "OnDemand": Anonymize<Icuu6jjue8o6eb>;
    "Registrar": CommonParasRegistrarEvent;
    "Slots": CommonSlotsEvent;
    "Auctions": CommonAuctionsEvent;
    "Crowdloan": Anonymize<I14ffo4b61a2g3>;
    "Coretime": PolkadotRuntimeParachainsCoretimeEvent;
    "StateTrieMigration": Anonymize<I61dksvl51aujo>;
    "XcmPallet": Anonymize<I5ce1ru810vv9d>;
    "MessageQueue": Anonymize<I13vul90391uuv>;
    "AssetRate": AssetRateEvent;
}>;
export type I4ppj6e1tjsmi1 = AnonymousEnum<{
    /**
     *An extrinsic completed successfully.
     */
    "ExtrinsicSuccess": Anonymize<Ia82mnkmeo2rhc>;
    /**
     *An extrinsic failed.
     */
    "ExtrinsicFailed": Anonymize<I6ovmp09cui4ob>;
    /**
     *`:code` was updated.
     */
    "CodeUpdated": undefined;
    /**
     *A new account was created.
     */
    "NewAccount": Anonymize<Icbccs0ug47ilf>;
    /**
     *An account was reaped.
     */
    "KilledAccount": Anonymize<Icbccs0ug47ilf>;
    /**
     *On on-chain remark happened.
     */
    "Remarked": Anonymize<I855j4i3kr8ko1>;
    /**
     *An upgrade was authorized.
     */
    "UpgradeAuthorized": Anonymize<Ibgl04rn6nbfm6>;
}>;
export type Ia82mnkmeo2rhc = {
    "dispatch_info": Anonymize<Ic9s8f85vjtncc>;
};
export type Ic9s8f85vjtncc = {
    "weight": Anonymize<I4q39t5hn830vp>;
    "class": DispatchClass;
    "pays_fee": Anonymize<Iehg04bj71rkd>;
};
export type DispatchClass = Enum<{
    "Normal": undefined;
    "Operational": undefined;
    "Mandatory": undefined;
}>;
export declare const DispatchClass: GetEnum<DispatchClass>;
export type Iehg04bj71rkd = AnonymousEnum<{
    "Yes": undefined;
    "No": undefined;
}>;
export type I6ovmp09cui4ob = {
    "dispatch_error": Anonymize<Icb996amjvq1c5>;
    "dispatch_info": Anonymize<Ic9s8f85vjtncc>;
};
export type Icb996amjvq1c5 = AnonymousEnum<{
    "Other": undefined;
    "CannotLookup": undefined;
    "BadOrigin": undefined;
    "Module": Anonymize<Ibbat3eoqff46l>;
    "ConsumerRemaining": undefined;
    "NoProviders": undefined;
    "TooManyConsumers": undefined;
    "Token": TokenError;
    "Arithmetic": ArithmeticError;
    "Transactional": TransactionalError;
    "Exhausted": undefined;
    "Corruption": undefined;
    "Unavailable": undefined;
    "RootNotAllowed": undefined;
}>;
export type Ibbat3eoqff46l = AnonymousEnum<{
    "System": Anonymize<I5o0s7c8q1cc9b>;
    "Scheduler": Anonymize<If7oa8fprnilo5>;
    "Preimage": Anonymize<I1iknkudsdnbks>;
    "Babe": Anonymize<Ib6q602k6o213a>;
    "Timestamp": undefined;
    "Indices": Anonymize<Icq1825fru3di2>;
    "Balances": Anonymize<Idj13i7adlomht>;
    "TransactionPayment": undefined;
    "Authorship": undefined;
    "Staking": Anonymize<I11137r14aka6n>;
    "Offences": undefined;
    "Historical": undefined;
    "Session": Anonymize<I1e07dgbaqd1sq>;
    "Grandpa": Anonymize<I7q8i0pp1gkas6>;
    "AuthorityDiscovery": undefined;
    "Treasury": Anonymize<I36uss0m9fpcsf>;
    "ConvictionVoting": Anonymize<Idfa8k8ikssbsf>;
    "Referenda": Anonymize<I84u4ul208g742>;
    "Origins": undefined;
    "Whitelist": Anonymize<I15nctscutpbeh>;
    "Parameters": undefined;
    "Claims": Anonymize<Ijh2jbbqvb176>;
    "Vesting": Anonymize<Icof2acl69lq3c>;
    "Utility": Anonymize<I8dt2g2hcrgh36>;
    "Proxy": Anonymize<Iuvt54ei4cehc>;
    "Multisig": Anonymize<Ia76qmhhg4jvb9>;
    "Bounties": Anonymize<Ibfvjqqblobf53>;
    "ChildBounties": Anonymize<I4u5ou5u3tthff>;
    "ElectionProviderMultiPhase": Anonymize<Idb84kfjd998sl>;
    "VoterList": Anonymize<Ic35l5bgiij29p>;
    "NominationPools": Anonymize<Ic4cmf9id3qcei>;
    "FastUnstake": Anonymize<Iau9bur8dc3bec>;
    "ParachainsOrigin": undefined;
    "Configuration": Anonymize<In1jctfv299lm>;
    "ParasShared": undefined;
    "ParaInclusion": Anonymize<Iat8btfaeiq1le>;
    "ParaInherent": Anonymize<Idfqgoii3heb2f>;
    "ParaScheduler": undefined;
    "Paras": Anonymize<Ieo97unb4d08rl>;
    "Initializer": undefined;
    "Dmp": undefined;
    "Hrmp": Anonymize<Ibns95nfmm92df>;
    "ParaSessionInfo": undefined;
    "ParasDisputes": Anonymize<Iakburbqot4g58>;
    "ParasSlashing": Anonymize<I1v70p1j0r2q1j>;
    "OnDemand": Anonymize<I8htscm3ert491>;
    "CoretimeAssignmentProvider": Anonymize<Ie3b9qd0nd59gs>;
    "Registrar": Anonymize<I97vkspnd0b8bh>;
    "Slots": Anonymize<Iers095sa65pbg>;
    "Auctions": Anonymize<I4kgo47o2v3701>;
    "Crowdloan": Anonymize<I9o6l1c4r4qc3s>;
    "Coretime": Anonymize<Ifju0orssp9h7o>;
    "StateTrieMigration": Anonymize<I96objte63brjr>;
    "XcmPallet": Anonymize<I87j95aq93d7dq>;
    "MessageQueue": Anonymize<I5iupade5ag2dp>;
    "AssetRate": Anonymize<I3qgd61cgli6cp>;
    "Beefy": Anonymize<Ib6q602k6o213a>;
    "Mmr": undefined;
    "BeefyMmrLeaf": undefined;
}>;
export type I5o0s7c8q1cc9b = AnonymousEnum<{
    /**
     *The name of specification does not match between the current runtime
     *and the new runtime.
     */
    "InvalidSpecName": undefined;
    /**
     *The specification version is not allowed to decrease between the current runtime
     *and the new runtime.
     */
    "SpecVersionNeedsToIncrease": undefined;
    /**
     *Failed to extract the runtime version from the new runtime.
     *
     *Either calling `Core_version` or decoding `RuntimeVersion` failed.
     */
    "FailedToExtractRuntimeVersion": undefined;
    /**
     *Suicide called when the account has non-default composite data.
     */
    "NonDefaultComposite": undefined;
    /**
     *There is a non-zero reference count preventing the account from being purged.
     */
    "NonZeroRefCount": undefined;
    /**
     *The origin filter prevent the call to be dispatched.
     */
    "CallFiltered": undefined;
    /**
     *A multi-block migration is ongoing and prevents the current code from being replaced.
     */
    "MultiBlockMigrationsOngoing": undefined;
    /**
     *No upgrade authorized.
     */
    "NothingAuthorized": undefined;
    /**
     *The submitted code is not authorized.
     */
    "Unauthorized": undefined;
}>;
export type If7oa8fprnilo5 = AnonymousEnum<{
    /**
     *Failed to schedule a call
     */
    "FailedToSchedule": undefined;
    /**
     *Cannot find the scheduled call.
     */
    "NotFound": undefined;
    /**
     *Given target block number is in the past.
     */
    "TargetBlockNumberInPast": undefined;
    /**
     *Reschedule failed because it does not change scheduled time.
     */
    "RescheduleNoChange": undefined;
    /**
     *Attempt to use a non-named function on a named task.
     */
    "Named": undefined;
}>;
export type I1iknkudsdnbks = AnonymousEnum<{
    /**
     *Preimage is too large to store on-chain.
     */
    "TooBig": undefined;
    /**
     *Preimage has already been noted on-chain.
     */
    "AlreadyNoted": undefined;
    /**
     *The user is not authorized to perform this action.
     */
    "NotAuthorized": undefined;
    /**
     *The preimage cannot be removed since it has not yet been noted.
     */
    "NotNoted": undefined;
    /**
     *A preimage may not be removed when there are outstanding requests.
     */
    "Requested": undefined;
    /**
     *The preimage request cannot be removed since no outstanding requests exist.
     */
    "NotRequested": undefined;
    /**
     *More than `MAX_HASH_UPGRADE_BULK_COUNT` hashes were requested to be upgraded at once.
     */
    "TooMany": undefined;
    /**
     *Too few hashes were requested to be upgraded (i.e. zero).
     */
    "TooFew": undefined;
    /**
     *No ticket with a cost was returned by [`Config::Consideration`] to store the preimage.
     */
    "NoCost": undefined;
}>;
export type Ib6q602k6o213a = AnonymousEnum<{
    /**
     *An equivocation proof provided as part of an equivocation report is invalid.
     */
    "InvalidEquivocationProof": undefined;
    /**
     *A key ownership proof provided as part of an equivocation report is invalid.
     */
    "InvalidKeyOwnershipProof": undefined;
    /**
     *A given equivocation report is valid but already previously reported.
     */
    "DuplicateOffenceReport": undefined;
    /**
     *Submitted configuration is invalid.
     */
    "InvalidConfiguration": undefined;
}>;
export type Icq1825fru3di2 = AnonymousEnum<{
    /**
     *The index was not already assigned.
     */
    "NotAssigned": undefined;
    /**
     *The index is assigned to another account.
     */
    "NotOwner": undefined;
    /**
     *The index was not available.
     */
    "InUse": undefined;
    /**
     *The source and destination accounts are identical.
     */
    "NotTransfer": undefined;
    /**
     *The index is permanent and may not be freed/changed.
     */
    "Permanent": undefined;
}>;
export type Idj13i7adlomht = AnonymousEnum<{
    /**
     *Vesting balance too high to send value.
     */
    "VestingBalance": undefined;
    /**
     *Account liquidity restrictions prevent withdrawal.
     */
    "LiquidityRestrictions": undefined;
    /**
     *Balance too low to send value.
     */
    "InsufficientBalance": undefined;
    /**
     *Value too low to create account due to existential deposit.
     */
    "ExistentialDeposit": undefined;
    /**
     *Transfer/payment would kill account.
     */
    "Expendability": undefined;
    /**
     *A vesting schedule already exists for this account.
     */
    "ExistingVestingSchedule": undefined;
    /**
     *Beneficiary account must pre-exist.
     */
    "DeadAccount": undefined;
    /**
     *Number of named reserves exceed `MaxReserves`.
     */
    "TooManyReserves": undefined;
    /**
     *Number of holds exceed `VariantCountOf<T::RuntimeHoldReason>`.
     */
    "TooManyHolds": undefined;
    /**
     *Number of freezes exceed `MaxFreezes`.
     */
    "TooManyFreezes": undefined;
    /**
     *The issuance cannot be modified since it is already deactivated.
     */
    "IssuanceDeactivated": undefined;
    /**
     *The delta cannot be zero.
     */
    "DeltaZero": undefined;
}>;
export type I11137r14aka6n = AnonymousEnum<{
    /**
     *Not a controller account.
     */
    "NotController": undefined;
    /**
     *Not a stash account.
     */
    "NotStash": undefined;
    /**
     *Stash is already bonded.
     */
    "AlreadyBonded": undefined;
    /**
     *Controller is already paired.
     */
    "AlreadyPaired": undefined;
    /**
     *Targets cannot be empty.
     */
    "EmptyTargets": undefined;
    /**
     *Duplicate index.
     */
    "DuplicateIndex": undefined;
    /**
     *Slash record index out of bounds.
     */
    "InvalidSlashIndex": undefined;
    /**
     *Cannot have a validator or nominator role, with value less than the minimum defined by
     *governance (see `MinValidatorBond` and `MinNominatorBond`). If unbonding is the
     *intention, `chill` first to remove one's role as validator/nominator.
     */
    "InsufficientBond": undefined;
    /**
     *Can not schedule more unlock chunks.
     */
    "NoMoreChunks": undefined;
    /**
     *Can not rebond without unlocking chunks.
     */
    "NoUnlockChunk": undefined;
    /**
     *Attempting to target a stash that still has funds.
     */
    "FundedTarget": undefined;
    /**
     *Invalid era to reward.
     */
    "InvalidEraToReward": undefined;
    /**
     *Invalid number of nominations.
     */
    "InvalidNumberOfNominations": undefined;
    /**
     *Items are not sorted and unique.
     */
    "NotSortedAndUnique": undefined;
    /**
     *Rewards for this era have already been claimed for this validator.
     */
    "AlreadyClaimed": undefined;
    /**
     *No nominators exist on this page.
     */
    "InvalidPage": undefined;
    /**
     *Incorrect previous history depth input provided.
     */
    "IncorrectHistoryDepth": undefined;
    /**
     *Incorrect number of slashing spans provided.
     */
    "IncorrectSlashingSpans": undefined;
    /**
     *Internal state has become somehow corrupted and the operation cannot continue.
     */
    "BadState": undefined;
    /**
     *Too many nomination targets supplied.
     */
    "TooManyTargets": undefined;
    /**
     *A nomination target was supplied that was blocked or otherwise not a validator.
     */
    "BadTarget": undefined;
    /**
     *The user has enough bond and thus cannot be chilled forcefully by an external person.
     */
    "CannotChillOther": undefined;
    /**
     *There are too many nominators in the system. Governance needs to adjust the staking
     *settings to keep things safe for the runtime.
     */
    "TooManyNominators": undefined;
    /**
     *There are too many validator candidates in the system. Governance needs to adjust the
     *staking settings to keep things safe for the runtime.
     */
    "TooManyValidators": undefined;
    /**
     *Commission is too low. Must be at least `MinCommission`.
     */
    "CommissionTooLow": undefined;
    /**
     *Some bound is not met.
     */
    "BoundNotMet": undefined;
    /**
     *Used when attempting to use deprecated controller account logic.
     */
    "ControllerDeprecated": undefined;
    /**
     *Cannot reset a ledger.
     */
    "CannotRestoreLedger": undefined;
    /**
     *Provided reward destination is not allowed.
     */
    "RewardDestinationRestricted": undefined;
    /**
     *Not enough funds available to withdraw.
     */
    "NotEnoughFunds": undefined;
    /**
     *Operation not allowed for virtual stakers.
     */
    "VirtualStakerNotAllowed": undefined;
}>;
export type I1e07dgbaqd1sq = AnonymousEnum<{
    /**
     *Invalid ownership proof.
     */
    "InvalidProof": undefined;
    /**
     *No associated validator ID for account.
     */
    "NoAssociatedValidatorId": undefined;
    /**
     *Registered duplicate key.
     */
    "DuplicatedKey": undefined;
    /**
     *No keys are associated with this account.
     */
    "NoKeys": undefined;
    /**
     *Key setting account is not live, so it's impossible to associate keys.
     */
    "NoAccount": undefined;
}>;
export type I7q8i0pp1gkas6 = AnonymousEnum<{
    /**
     *Attempt to signal GRANDPA pause when the authority set isn't live
     *(either paused or already pending pause).
     */
    "PauseFailed": undefined;
    /**
     *Attempt to signal GRANDPA resume when the authority set isn't paused
     *(either live or already pending resume).
     */
    "ResumeFailed": undefined;
    /**
     *Attempt to signal GRANDPA change with one already pending.
     */
    "ChangePending": undefined;
    /**
     *Cannot signal forced change so soon after last.
     */
    "TooSoon": undefined;
    /**
     *A key ownership proof provided as part of an equivocation report is invalid.
     */
    "InvalidKeyOwnershipProof": undefined;
    /**
     *An equivocation proof provided as part of an equivocation report is invalid.
     */
    "InvalidEquivocationProof": undefined;
    /**
     *A given equivocation report is valid but already previously reported.
     */
    "DuplicateOffenceReport": undefined;
}>;
export type I36uss0m9fpcsf = AnonymousEnum<{
    /**
     *No proposal, bounty or spend at that index.
     */
    "InvalidIndex": undefined;
    /**
     *Too many approvals in the queue.
     */
    "TooManyApprovals": undefined;
    /**
     *The spend origin is valid but the amount it is allowed to spend is lower than the
     *amount to be spent.
     */
    "InsufficientPermission": undefined;
    /**
     *Proposal has not been approved.
     */
    "ProposalNotApproved": undefined;
    /**
     *The balance of the asset kind is not convertible to the balance of the native asset.
     */
    "FailedToConvertBalance": undefined;
    /**
     *The spend has expired and cannot be claimed.
     */
    "SpendExpired": undefined;
    /**
     *The spend is not yet eligible for payout.
     */
    "EarlyPayout": undefined;
    /**
     *The payment has already been attempted.
     */
    "AlreadyAttempted": undefined;
    /**
     *There was some issue with the mechanism of payment.
     */
    "PayoutError": undefined;
    /**
     *The payout was not yet attempted/claimed.
     */
    "NotAttempted": undefined;
    /**
     *The payment has neither failed nor succeeded yet.
     */
    "Inconclusive": undefined;
}>;
export type Idfa8k8ikssbsf = AnonymousEnum<{
    /**
     *Poll is not ongoing.
     */
    "NotOngoing": undefined;
    /**
     *The given account did not vote on the poll.
     */
    "NotVoter": undefined;
    /**
     *The actor has no permission to conduct the action.
     */
    "NoPermission": undefined;
    /**
     *The actor has no permission to conduct the action right now but will do in the future.
     */
    "NoPermissionYet": undefined;
    /**
     *The account is already delegating.
     */
    "AlreadyDelegating": undefined;
    /**
     *The account currently has votes attached to it and the operation cannot succeed until
     *these are removed through `remove_vote`.
     */
    "AlreadyVoting": undefined;
    /**
     *Too high a balance was provided that the account cannot afford.
     */
    "InsufficientFunds": undefined;
    /**
     *The account is not currently delegating.
     */
    "NotDelegating": undefined;
    /**
     *Delegation to oneself makes no sense.
     */
    "Nonsense": undefined;
    /**
     *Maximum number of votes reached.
     */
    "MaxVotesReached": undefined;
    /**
     *The class must be supplied since it is not easily determinable from the state.
     */
    "ClassNeeded": undefined;
    /**
     *The class ID supplied is invalid.
     */
    "BadClass": undefined;
}>;
export type I84u4ul208g742 = AnonymousEnum<{
    /**
     *Referendum is not ongoing.
     */
    "NotOngoing": undefined;
    /**
     *Referendum's decision deposit is already paid.
     */
    "HasDeposit": undefined;
    /**
     *The track identifier given was invalid.
     */
    "BadTrack": undefined;
    /**
     *There are already a full complement of referenda in progress for this track.
     */
    "Full": undefined;
    /**
     *The queue of the track is empty.
     */
    "QueueEmpty": undefined;
    /**
     *The referendum index provided is invalid in this context.
     */
    "BadReferendum": undefined;
    /**
     *There was nothing to do in the advancement.
     */
    "NothingToDo": undefined;
    /**
     *No track exists for the proposal origin.
     */
    "NoTrack": undefined;
    /**
     *Any deposit cannot be refunded until after the decision is over.
     */
    "Unfinished": undefined;
    /**
     *The deposit refunder is not the depositor.
     */
    "NoPermission": undefined;
    /**
     *The deposit cannot be refunded since none was made.
     */
    "NoDeposit": undefined;
    /**
     *The referendum status is invalid for this operation.
     */
    "BadStatus": undefined;
    /**
     *The preimage does not exist.
     */
    "PreimageNotExist": undefined;
    /**
     *The preimage is stored with a different length than the one provided.
     */
    "PreimageStoredWithDifferentLength": undefined;
}>;
export type I15nctscutpbeh = AnonymousEnum<{
    /**
     *The preimage of the call hash could not be loaded.
     */
    "UnavailablePreImage": undefined;
    /**
     *The call could not be decoded.
     */
    "UndecodableCall": undefined;
    /**
     *The weight of the decoded call was higher than the witness.
     */
    "InvalidCallWeightWitness": undefined;
    /**
     *The call was not whitelisted.
     */
    "CallIsNotWhitelisted": undefined;
    /**
     *The call was already whitelisted; No-Op.
     */
    "CallAlreadyWhitelisted": undefined;
}>;
export type Ijh2jbbqvb176 = AnonymousEnum<{
    /**
     *Invalid Ethereum signature.
     */
    "InvalidEthereumSignature": undefined;
    /**
     *Ethereum address has no claim.
     */
    "SignerHasNoClaim": undefined;
    /**
     *Account ID sending transaction has no claim.
     */
    "SenderHasNoClaim": undefined;
    /**
     *There's not enough in the pot to pay out some unvested amount. Generally implies a
     *logic error.
     */
    "PotUnderflow": undefined;
    /**
     *A needed statement was not included.
     */
    "InvalidStatement": undefined;
    /**
     *The account already has a vested balance.
     */
    "VestedBalanceExists": undefined;
}>;
export type Icof2acl69lq3c = AnonymousEnum<{
    /**
     *The account given is not vesting.
     */
    "NotVesting": undefined;
    /**
     *The account already has `MaxVestingSchedules` count of schedules and thus
     *cannot add another one. Consider merging existing schedules in order to add another.
     */
    "AtMaxVestingSchedules": undefined;
    /**
     *Amount being transferred is too low to create a vesting schedule.
     */
    "AmountLow": undefined;
    /**
     *An index was out of bounds of the vesting schedules.
     */
    "ScheduleIndexOutOfBounds": undefined;
    /**
     *Failed to create a new schedule because some parameter was invalid.
     */
    "InvalidScheduleParams": undefined;
}>;
export type I8dt2g2hcrgh36 = AnonymousEnum<{
    /**
     *Too many calls batched.
     */
    "TooManyCalls": undefined;
}>;
export type Iuvt54ei4cehc = AnonymousEnum<{
    /**
     *There are too many proxies registered or too many announcements pending.
     */
    "TooMany": undefined;
    /**
     *Proxy registration not found.
     */
    "NotFound": undefined;
    /**
     *Sender is not a proxy of the account to be proxied.
     */
    "NotProxy": undefined;
    /**
     *A call which is incompatible with the proxy type's filter was attempted.
     */
    "Unproxyable": undefined;
    /**
     *Account is already a proxy.
     */
    "Duplicate": undefined;
    /**
     *Call may not be made by proxy because it may escalate its privileges.
     */
    "NoPermission": undefined;
    /**
     *Announcement, if made at all, was made too recently.
     */
    "Unannounced": undefined;
    /**
     *Cannot add self as proxy.
     */
    "NoSelfProxy": undefined;
}>;
export type Ia76qmhhg4jvb9 = AnonymousEnum<{
    /**
     *Threshold must be 2 or greater.
     */
    "MinimumThreshold": undefined;
    /**
     *Call is already approved by this signatory.
     */
    "AlreadyApproved": undefined;
    /**
     *Call doesn't need any (more) approvals.
     */
    "NoApprovalsNeeded": undefined;
    /**
     *There are too few signatories in the list.
     */
    "TooFewSignatories": undefined;
    /**
     *There are too many signatories in the list.
     */
    "TooManySignatories": undefined;
    /**
     *The signatories were provided out of order; they should be ordered.
     */
    "SignatoriesOutOfOrder": undefined;
    /**
     *The sender was contained in the other signatories; it shouldn't be.
     */
    "SenderInSignatories": undefined;
    /**
     *Multisig operation not found when attempting to cancel.
     */
    "NotFound": undefined;
    /**
     *Only the account that originally created the multisig is able to cancel it.
     */
    "NotOwner": undefined;
    /**
     *No timepoint was given, yet the multisig operation is already underway.
     */
    "NoTimepoint": undefined;
    /**
     *A different timepoint was given to the multisig operation that is underway.
     */
    "WrongTimepoint": undefined;
    /**
     *A timepoint was given, yet no multisig operation is underway.
     */
    "UnexpectedTimepoint": undefined;
    /**
     *The maximum weight information provided was too low.
     */
    "MaxWeightTooLow": undefined;
    /**
     *The data to be stored is already stored.
     */
    "AlreadyStored": undefined;
}>;
export type Ibfvjqqblobf53 = AnonymousEnum<{
    /**
     *Proposer's balance is too low.
     */
    "InsufficientProposersBalance": undefined;
    /**
     *No proposal or bounty at that index.
     */
    "InvalidIndex": undefined;
    /**
     *The reason given is just too big.
     */
    "ReasonTooBig": undefined;
    /**
     *The bounty status is unexpected.
     */
    "UnexpectedStatus": undefined;
    /**
     *Require bounty curator.
     */
    "RequireCurator": undefined;
    /**
     *Invalid bounty value.
     */
    "InvalidValue": undefined;
    /**
     *Invalid bounty fee.
     */
    "InvalidFee": undefined;
    /**
     *A bounty payout is pending.
     *To cancel the bounty, you must unassign and slash the curator.
     */
    "PendingPayout": undefined;
    /**
     *The bounties cannot be claimed/closed because it's still in the countdown period.
     */
    "Premature": undefined;
    /**
     *The bounty cannot be closed because it has active child bounties.
     */
    "HasActiveChildBounty": undefined;
    /**
     *Too many approvals are already queued.
     */
    "TooManyQueued": undefined;
}>;
export type I4u5ou5u3tthff = AnonymousEnum<{
    /**
     *The parent bounty is not in active state.
     */
    "ParentBountyNotActive": undefined;
    /**
     *The bounty balance is not enough to add new child-bounty.
     */
    "InsufficientBountyBalance": undefined;
    /**
     *Number of child bounties exceeds limit `MaxActiveChildBountyCount`.
     */
    "TooManyChildBounties": undefined;
}>;
export type Idb84kfjd998sl = AnonymousEnum<{
    /**
     *Submission was too early.
     */
    "PreDispatchEarlySubmission": undefined;
    /**
     *Wrong number of winners presented.
     */
    "PreDispatchWrongWinnerCount": undefined;
    /**
     *Submission was too weak, score-wise.
     */
    "PreDispatchWeakSubmission": undefined;
    /**
     *The queue was full, and the solution was not better than any of the existing ones.
     */
    "SignedQueueFull": undefined;
    /**
     *The origin failed to pay the deposit.
     */
    "SignedCannotPayDeposit": undefined;
    /**
     *Witness data to dispatchable is invalid.
     */
    "SignedInvalidWitness": undefined;
    /**
     *The signed submission consumes too much weight
     */
    "SignedTooMuchWeight": undefined;
    /**
     *OCW submitted solution for wrong round
     */
    "OcwCallWrongEra": undefined;
    /**
     *Snapshot metadata should exist but didn't.
     */
    "MissingSnapshotMetadata": undefined;
    /**
     *`Self::insert_submission` returned an invalid index.
     */
    "InvalidSubmissionIndex": undefined;
    /**
     *The call is not allowed at this point.
     */
    "CallNotAllowed": undefined;
    /**
     *The fallback failed
     */
    "FallbackFailed": undefined;
    /**
     *Some bound not met
     */
    "BoundNotMet": undefined;
    /**
     *Submitted solution has too many winners
     */
    "TooManyWinners": undefined;
    /**
     *Submission was prepared for a different round.
     */
    "PreDispatchDifferentRound": undefined;
}>;
export type Ic35l5bgiij29p = AnonymousEnum<{
    /**
     *A error in the list interface implementation.
     */
    "List": BagsListListListError;
}>;
export type BagsListListListError = Enum<{
    "Duplicate": undefined;
    "NotHeavier": undefined;
    "NotInSameBag": undefined;
    "NodeNotFound": undefined;
}>;
export declare const BagsListListListError: GetEnum<BagsListListListError>;
export type Ic4cmf9id3qcei = AnonymousEnum<{
    /**
     *A (bonded) pool id does not exist.
     */
    "PoolNotFound": undefined;
    /**
     *An account is not a member.
     */
    "PoolMemberNotFound": undefined;
    /**
     *A reward pool does not exist. In all cases this is a system logic error.
     */
    "RewardPoolNotFound": undefined;
    /**
     *A sub pool does not exist.
     */
    "SubPoolsNotFound": undefined;
    /**
     *An account is already delegating in another pool. An account may only belong to one
     *pool at a time.
     */
    "AccountBelongsToOtherPool": undefined;
    /**
     *The member is fully unbonded (and thus cannot access the bonded and reward pool
     *anymore to, for example, collect rewards).
     */
    "FullyUnbonding": undefined;
    /**
     *The member cannot unbond further chunks due to reaching the limit.
     */
    "MaxUnbondingLimit": undefined;
    /**
     *None of the funds can be withdrawn yet because the bonding duration has not passed.
     */
    "CannotWithdrawAny": undefined;
    /**
     *The amount does not meet the minimum bond to either join or create a pool.
     *
     *The depositor can never unbond to a value less than `Pallet::depositor_min_bond`. The
     *caller does not have nominating permissions for the pool. Members can never unbond to a
     *value below `MinJoinBond`.
     */
    "MinimumBondNotMet": undefined;
    /**
     *The transaction could not be executed due to overflow risk for the pool.
     */
    "OverflowRisk": undefined;
    /**
     *A pool must be in [`PoolState::Destroying`] in order for the depositor to unbond or for
     *other members to be permissionlessly unbonded.
     */
    "NotDestroying": undefined;
    /**
     *The caller does not have nominating permissions for the pool.
     */
    "NotNominator": undefined;
    /**
     *Either a) the caller cannot make a valid kick or b) the pool is not destroying.
     */
    "NotKickerOrDestroying": undefined;
    /**
     *The pool is not open to join
     */
    "NotOpen": undefined;
    /**
     *The system is maxed out on pools.
     */
    "MaxPools": undefined;
    /**
     *Too many members in the pool or system.
     */
    "MaxPoolMembers": undefined;
    /**
     *The pools state cannot be changed.
     */
    "CanNotChangeState": undefined;
    /**
     *The caller does not have adequate permissions.
     */
    "DoesNotHavePermission": undefined;
    /**
     *Metadata exceeds [`Config::MaxMetadataLen`]
     */
    "MetadataExceedsMaxLen": undefined;
    /**
     *Some error occurred that should never happen. This should be reported to the
     *maintainers.
     */
    "Defensive": Anonymize<Ie2db4l6126rkt>;
    /**
     *Partial unbonding now allowed permissionlessly.
     */
    "PartialUnbondNotAllowedPermissionlessly": undefined;
    /**
     *The pool's max commission cannot be set higher than the existing value.
     */
    "MaxCommissionRestricted": undefined;
    /**
     *The supplied commission exceeds the max allowed commission.
     */
    "CommissionExceedsMaximum": undefined;
    /**
     *The supplied commission exceeds global maximum commission.
     */
    "CommissionExceedsGlobalMaximum": undefined;
    /**
     *Not enough blocks have surpassed since the last commission update.
     */
    "CommissionChangeThrottled": undefined;
    /**
     *The submitted changes to commission change rate are not allowed.
     */
    "CommissionChangeRateNotAllowed": undefined;
    /**
     *There is no pending commission to claim.
     */
    "NoPendingCommission": undefined;
    /**
     *No commission current has been set.
     */
    "NoCommissionCurrentSet": undefined;
    /**
     *Pool id currently in use.
     */
    "PoolIdInUse": undefined;
    /**
     *Pool id provided is not correct/usable.
     */
    "InvalidPoolId": undefined;
    /**
     *Bonding extra is restricted to the exact pending reward amount.
     */
    "BondExtraRestricted": undefined;
    /**
     *No imbalance in the ED deposit for the pool.
     */
    "NothingToAdjust": undefined;
    /**
     *No slash pending that can be applied to the member.
     */
    "NothingToSlash": undefined;
    /**
     *The pool or member delegation has already migrated to delegate stake.
     */
    "AlreadyMigrated": undefined;
    /**
     *The pool or member delegation has not migrated yet to delegate stake.
     */
    "NotMigrated": undefined;
    /**
     *This call is not allowed in the current state of the pallet.
     */
    "NotSupported": undefined;
}>;
export type Ie2db4l6126rkt = AnonymousEnum<{
    "NotEnoughSpaceInUnbondPool": undefined;
    "PoolNotFound": undefined;
    "RewardPoolNotFound": undefined;
    "SubPoolsNotFound": undefined;
    "BondedStashKilledPrematurely": undefined;
    "DelegationUnsupported": undefined;
    "SlashNotApplied": undefined;
}>;
export type Iau9bur8dc3bec = AnonymousEnum<{
    /**
     *The provided Controller account was not found.
     *
     *This means that the given account is not bonded.
     */
    "NotController": undefined;
    /**
     *The bonded account has already been queued.
     */
    "AlreadyQueued": undefined;
    /**
     *The bonded account has active unlocking chunks.
     */
    "NotFullyBonded": undefined;
    /**
     *The provided un-staker is not in the `Queue`.
     */
    "NotQueued": undefined;
    /**
     *The provided un-staker is already in Head, and cannot deregister.
     */
    "AlreadyHead": undefined;
    /**
     *The call is not allowed at this point because the pallet is not active.
     */
    "CallNotAllowed": undefined;
}>;
export type In1jctfv299lm = AnonymousEnum<{
    /**
     *The new value for a configuration parameter is invalid.
     */
    "InvalidNewValue": undefined;
}>;
export type Iat8btfaeiq1le = AnonymousEnum<{
    /**
     *Validator index out of bounds.
     */
    "ValidatorIndexOutOfBounds": undefined;
    /**
     *Candidate submitted but para not scheduled.
     */
    "UnscheduledCandidate": undefined;
    /**
     *Head data exceeds the configured maximum.
     */
    "HeadDataTooLarge": undefined;
    /**
     *Code upgrade prematurely.
     */
    "PrematureCodeUpgrade": undefined;
    /**
     *Output code is too large
     */
    "NewCodeTooLarge": undefined;
    /**
     *The candidate's relay-parent was not allowed. Either it was
     *not recent enough or it didn't advance based on the last parachain block.
     */
    "DisallowedRelayParent": undefined;
    /**
     *Failed to compute group index for the core: either it's out of bounds
     *or the relay parent doesn't belong to the current session.
     */
    "InvalidAssignment": undefined;
    /**
     *Invalid group index in core assignment.
     */
    "InvalidGroupIndex": undefined;
    /**
     *Insufficient (non-majority) backing.
     */
    "InsufficientBacking": undefined;
    /**
     *Invalid (bad signature, unknown validator, etc.) backing.
     */
    "InvalidBacking": undefined;
    /**
     *Collator did not sign PoV.
     */
    "NotCollatorSigned": undefined;
    /**
     *The validation data hash does not match expected.
     */
    "ValidationDataHashMismatch": undefined;
    /**
     *The downward message queue is not processed correctly.
     */
    "IncorrectDownwardMessageHandling": undefined;
    /**
     *At least one upward message sent does not pass the acceptance criteria.
     */
    "InvalidUpwardMessages": undefined;
    /**
     *The candidate didn't follow the rules of HRMP watermark advancement.
     */
    "HrmpWatermarkMishandling": undefined;
    /**
     *The HRMP messages sent by the candidate is not valid.
     */
    "InvalidOutboundHrmp": undefined;
    /**
     *The validation code hash of the candidate is not valid.
     */
    "InvalidValidationCodeHash": undefined;
    /**
     *The `para_head` hash in the candidate descriptor doesn't match the hash of the actual
     *para head in the commitments.
     */
    "ParaHeadMismatch": undefined;
}>;
export type Idfqgoii3heb2f = AnonymousEnum<{
    /**
     *Inclusion inherent called more than once per block.
     */
    "TooManyInclusionInherents": undefined;
    /**
     *The hash of the submitted parent header doesn't correspond to the saved block hash of
     *the parent.
     */
    "InvalidParentHeader": undefined;
    /**
     *The data given to the inherent will result in an overweight block.
     */
    "InherentOverweight": undefined;
    /**
     *A candidate was filtered during inherent execution. This should have only been done
     *during creation.
     */
    "CandidatesFilteredDuringExecution": undefined;
    /**
     *Too many candidates supplied.
     */
    "UnscheduledCandidate": undefined;
}>;
export type Ieo97unb4d08rl = AnonymousEnum<{
    /**
     *Para is not registered in our system.
     */
    "NotRegistered": undefined;
    /**
     *Para cannot be onboarded because it is already tracked by our system.
     */
    "CannotOnboard": undefined;
    /**
     *Para cannot be offboarded at this time.
     */
    "CannotOffboard": undefined;
    /**
     *Para cannot be upgraded to a lease holding parachain.
     */
    "CannotUpgrade": undefined;
    /**
     *Para cannot be downgraded to an on-demand parachain.
     */
    "CannotDowngrade": undefined;
    /**
     *The statement for PVF pre-checking is stale.
     */
    "PvfCheckStatementStale": undefined;
    /**
     *The statement for PVF pre-checking is for a future session.
     */
    "PvfCheckStatementFuture": undefined;
    /**
     *Claimed validator index is out of bounds.
     */
    "PvfCheckValidatorIndexOutOfBounds": undefined;
    /**
     *The signature for the PVF pre-checking is invalid.
     */
    "PvfCheckInvalidSignature": undefined;
    /**
     *The given validator already has cast a vote.
     */
    "PvfCheckDoubleVote": undefined;
    /**
     *The given PVF does not exist at the moment of process a vote.
     */
    "PvfCheckSubjectInvalid": undefined;
    /**
     *Parachain cannot currently schedule a code upgrade.
     */
    "CannotUpgradeCode": undefined;
    /**
     *Invalid validation code size.
     */
    "InvalidCode": undefined;
}>;
export type Ibns95nfmm92df = AnonymousEnum<{
    /**
     *The sender tried to open a channel to themselves.
     */
    "OpenHrmpChannelToSelf": undefined;
    /**
     *The recipient is not a valid para.
     */
    "OpenHrmpChannelInvalidRecipient": undefined;
    /**
     *The requested capacity is zero.
     */
    "OpenHrmpChannelZeroCapacity": undefined;
    /**
     *The requested capacity exceeds the global limit.
     */
    "OpenHrmpChannelCapacityExceedsLimit": undefined;
    /**
     *The requested maximum message size is 0.
     */
    "OpenHrmpChannelZeroMessageSize": undefined;
    /**
     *The open request requested the message size that exceeds the global limit.
     */
    "OpenHrmpChannelMessageSizeExceedsLimit": undefined;
    /**
     *The channel already exists
     */
    "OpenHrmpChannelAlreadyExists": undefined;
    /**
     *There is already a request to open the same channel.
     */
    "OpenHrmpChannelAlreadyRequested": undefined;
    /**
     *The sender already has the maximum number of allowed outbound channels.
     */
    "OpenHrmpChannelLimitExceeded": undefined;
    /**
     *The channel from the sender to the origin doesn't exist.
     */
    "AcceptHrmpChannelDoesntExist": undefined;
    /**
     *The channel is already confirmed.
     */
    "AcceptHrmpChannelAlreadyConfirmed": undefined;
    /**
     *The recipient already has the maximum number of allowed inbound channels.
     */
    "AcceptHrmpChannelLimitExceeded": undefined;
    /**
     *The origin tries to close a channel where it is neither the sender nor the recipient.
     */
    "CloseHrmpChannelUnauthorized": undefined;
    /**
     *The channel to be closed doesn't exist.
     */
    "CloseHrmpChannelDoesntExist": undefined;
    /**
     *The channel close request is already requested.
     */
    "CloseHrmpChannelAlreadyUnderway": undefined;
    /**
     *Canceling is requested by neither the sender nor recipient of the open channel request.
     */
    "CancelHrmpOpenChannelUnauthorized": undefined;
    /**
     *The open request doesn't exist.
     */
    "OpenHrmpChannelDoesntExist": undefined;
    /**
     *Cannot cancel an HRMP open channel request because it is already confirmed.
     */
    "OpenHrmpChannelAlreadyConfirmed": undefined;
    /**
     *The provided witness data is wrong.
     */
    "WrongWitness": undefined;
    /**
     *The channel between these two chains cannot be authorized.
     */
    "ChannelCreationNotAuthorized": undefined;
}>;
export type Iakburbqot4g58 = AnonymousEnum<{
    /**
     *Duplicate dispute statement sets provided.
     */
    "DuplicateDisputeStatementSets": undefined;
    /**
     *Ancient dispute statement provided.
     */
    "AncientDisputeStatement": undefined;
    /**
     *Validator index on statement is out of bounds for session.
     */
    "ValidatorIndexOutOfBounds": undefined;
    /**
     *Invalid signature on statement.
     */
    "InvalidSignature": undefined;
    /**
     *Validator vote submitted more than once to dispute.
     */
    "DuplicateStatement": undefined;
    /**
     *A dispute where there are only votes on one side.
     */
    "SingleSidedDispute": undefined;
    /**
     *A dispute vote from a malicious backer.
     */
    "MaliciousBacker": undefined;
    /**
     *No backing votes were provides along dispute statements.
     */
    "MissingBackingVotes": undefined;
    /**
     *Unconfirmed dispute statement sets provided.
     */
    "UnconfirmedDispute": undefined;
}>;
export type I1v70p1j0r2q1j = AnonymousEnum<{
    /**
     *The key ownership proof is invalid.
     */
    "InvalidKeyOwnershipProof": undefined;
    /**
     *The session index is too old or invalid.
     */
    "InvalidSessionIndex": undefined;
    /**
     *The candidate hash is invalid.
     */
    "InvalidCandidateHash": undefined;
    /**
     *There is no pending slash for the given validator index and time
     *slot.
     */
    "InvalidValidatorIndex": undefined;
    /**
     *The validator index does not match the validator id.
     */
    "ValidatorIndexIdMismatch": undefined;
    /**
     *The given slashing report is valid but already previously reported.
     */
    "DuplicateSlashingReport": undefined;
}>;
export type I8htscm3ert491 = AnonymousEnum<{
    /**
     *The order queue is full, `place_order` will not continue.
     */
    "QueueFull": undefined;
    /**
     *The current spot price is higher than the max amount specified in the `place_order`
     *call, making it invalid.
     */
    "SpotPriceHigherThanMaxAmount": undefined;
}>;
export type Ie3b9qd0nd59gs = AnonymousEnum<{
    "AssignmentsEmpty": undefined;
    /**
     *Assignments together exceeded 57600.
     */
    "OverScheduled": undefined;
    /**
     *Assignments together less than 57600
     */
    "UnderScheduled": undefined;
    /**
     *assign_core is only allowed to append new assignments at the end of already existing
     *ones.
     */
    "DisallowedInsert": undefined;
    /**
     *Tried to insert a schedule for the same core and block number as an existing schedule
     */
    "DuplicateInsert": undefined;
    /**
     *Tried to add an unsorted set of assignments
     */
    "AssignmentsNotSorted": undefined;
}>;
export type I97vkspnd0b8bh = AnonymousEnum<{
    /**
     *The ID is not registered.
     */
    "NotRegistered": undefined;
    /**
     *The ID is already registered.
     */
    "AlreadyRegistered": undefined;
    /**
     *The caller is not the owner of this Id.
     */
    "NotOwner": undefined;
    /**
     *Invalid para code size.
     */
    "CodeTooLarge": undefined;
    /**
     *Invalid para head data size.
     */
    "HeadDataTooLarge": undefined;
    /**
     *Para is not a Parachain.
     */
    "NotParachain": undefined;
    /**
     *Para is not a Parathread (on-demand parachain).
     */
    "NotParathread": undefined;
    /**
     *Cannot deregister para
     */
    "CannotDeregister": undefined;
    /**
     *Cannot schedule downgrade of lease holding parachain to on-demand parachain
     */
    "CannotDowngrade": undefined;
    /**
     *Cannot schedule upgrade of on-demand parachain to lease holding parachain
     */
    "CannotUpgrade": undefined;
    /**
     *Para is locked from manipulation by the manager. Must use parachain or relay chain
     *governance.
     */
    "ParaLocked": undefined;
    /**
     *The ID given for registration has not been reserved.
     */
    "NotReserved": undefined;
    /**
     *The validation code is invalid.
     */
    "InvalidCode": undefined;
    /**
     *Cannot perform a parachain slot / lifecycle swap. Check that the state of both paras
     *are correct for the swap to work.
     */
    "CannotSwap": undefined;
}>;
export type Iers095sa65pbg = AnonymousEnum<{
    /**
     *The parachain ID is not onboarding.
     */
    "ParaNotOnboarding": undefined;
    /**
     *There was an error with the lease.
     */
    "LeaseError": undefined;
}>;
export type I4kgo47o2v3701 = AnonymousEnum<{
    /**
     *This auction is already in progress.
     */
    "AuctionInProgress": undefined;
    /**
     *The lease period is in the past.
     */
    "LeasePeriodInPast": undefined;
    /**
     *Para is not registered
     */
    "ParaNotRegistered": undefined;
    /**
     *Not a current auction.
     */
    "NotCurrentAuction": undefined;
    /**
     *Not an auction.
     */
    "NotAuction": undefined;
    /**
     *Auction has already ended.
     */
    "AuctionEnded": undefined;
    /**
     *The para is already leased out for part of this range.
     */
    "AlreadyLeasedOut": undefined;
}>;
export type I9o6l1c4r4qc3s = AnonymousEnum<{
    /**
     *The current lease period is more than the first lease period.
     */
    "FirstPeriodInPast": undefined;
    /**
     *The first lease period needs to at least be less than 3 `max_value`.
     */
    "FirstPeriodTooFarInFuture": undefined;
    /**
     *Last lease period must be greater than first lease period.
     */
    "LastPeriodBeforeFirstPeriod": undefined;
    /**
     *The last lease period cannot be more than 3 periods after the first period.
     */
    "LastPeriodTooFarInFuture": undefined;
    /**
     *The campaign ends before the current block number. The end must be in the future.
     */
    "CannotEndInPast": undefined;
    /**
     *The end date for this crowdloan is not sensible.
     */
    "EndTooFarInFuture": undefined;
    /**
     *There was an overflow.
     */
    "Overflow": undefined;
    /**
     *The contribution was below the minimum, `MinContribution`.
     */
    "ContributionTooSmall": undefined;
    /**
     *Invalid fund index.
     */
    "InvalidParaId": undefined;
    /**
     *Contributions exceed maximum amount.
     */
    "CapExceeded": undefined;
    /**
     *The contribution period has already ended.
     */
    "ContributionPeriodOver": undefined;
    /**
     *The origin of this call is invalid.
     */
    "InvalidOrigin": undefined;
    /**
     *This crowdloan does not correspond to a parachain.
     */
    "NotParachain": undefined;
    /**
     *This parachain lease is still active and retirement cannot yet begin.
     */
    "LeaseActive": undefined;
    /**
     *This parachain's bid or lease is still active and withdraw cannot yet begin.
     */
    "BidOrLeaseActive": undefined;
    /**
     *The crowdloan has not yet ended.
     */
    "FundNotEnded": undefined;
    /**
     *There are no contributions stored in this crowdloan.
     */
    "NoContributions": undefined;
    /**
     *The crowdloan is not ready to dissolve. Potentially still has a slot or in retirement
     *period.
     */
    "NotReadyToDissolve": undefined;
    /**
     *Invalid signature.
     */
    "InvalidSignature": undefined;
    /**
     *The provided memo is too large.
     */
    "MemoTooLarge": undefined;
    /**
     *The fund is already in `NewRaise`
     */
    "AlreadyInNewRaise": undefined;
    /**
     *No contributions allowed during the VRF delay
     */
    "VrfDelayInProgress": undefined;
    /**
     *A lease period has not started yet, due to an offset in the starting block.
     */
    "NoLeasePeriod": undefined;
}>;
export type Ifju0orssp9h7o = AnonymousEnum<{
    /**
     *The paraid making the call is not the coretime brokerage system parachain.
     */
    "NotBroker": undefined;
    /**
     *Requested revenue information `when` parameter was in the future from the current
     *block height.
     */
    "RequestedFutureRevenue": undefined;
    /**
     *Failed to transfer assets to the coretime chain
     */
    "AssetTransferFailed": undefined;
}>;
export type I96objte63brjr = AnonymousEnum<{
    /**
     *Max signed limits not respected.
     */
    "MaxSignedLimits": undefined;
    /**
     *A key was longer than the configured maximum.
     *
     *This means that the migration halted at the current [`Progress`] and
     *can be resumed with a larger [`crate::Config::MaxKeyLen`] value.
     *Retrying with the same [`crate::Config::MaxKeyLen`] value will not work.
     *The value should only be increased to avoid a storage migration for the currently
     *stored [`crate::Progress::LastKey`].
     */
    "KeyTooLong": undefined;
    /**
     *submitter does not have enough funds.
     */
    "NotEnoughFunds": undefined;
    /**
     *Bad witness data provided.
     */
    "BadWitness": undefined;
    /**
     *Signed migration is not allowed because the maximum limit is not set yet.
     */
    "SignedMigrationNotAllowed": undefined;
    /**
     *Bad child root provided.
     */
    "BadChildRoot": undefined;
}>;
export type I87j95aq93d7dq = AnonymousEnum<{
    /**
     *The desired destination was unreachable, generally because there is a no way of routing
     *to it.
     */
    "Unreachable": undefined;
    /**
     *There was some other issue (i.e. not to do with routing) in sending the message.
     *Perhaps a lack of space for buffering the message.
     */
    "SendFailure": undefined;
    /**
     *The message execution fails the filter.
     */
    "Filtered": undefined;
    /**
     *The message's weight could not be determined.
     */
    "UnweighableMessage": undefined;
    /**
     *The destination `Location` provided cannot be inverted.
     */
    "DestinationNotInvertible": undefined;
    /**
     *The assets to be sent are empty.
     */
    "Empty": undefined;
    /**
     *Could not re-anchor the assets to declare the fees for the destination chain.
     */
    "CannotReanchor": undefined;
    /**
     *Too many assets have been attempted for transfer.
     */
    "TooManyAssets": undefined;
    /**
     *Origin is invalid for sending.
     */
    "InvalidOrigin": undefined;
    /**
     *The version of the `Versioned` value used is not able to be interpreted.
     */
    "BadVersion": undefined;
    /**
     *The given location could not be used (e.g. because it cannot be expressed in the
     *desired version of XCM).
     */
    "BadLocation": undefined;
    /**
     *The referenced subscription could not be found.
     */
    "NoSubscription": undefined;
    /**
     *The location is invalid since it already has a subscription from us.
     */
    "AlreadySubscribed": undefined;
    /**
     *Could not check-out the assets for teleportation to the destination chain.
     */
    "CannotCheckOutTeleport": undefined;
    /**
     *The owner does not own (all) of the asset that they wish to do the operation on.
     */
    "LowBalance": undefined;
    /**
     *The asset owner has too many locks on the asset.
     */
    "TooManyLocks": undefined;
    /**
     *The given account is not an identifiable sovereign account for any location.
     */
    "AccountNotSovereign": undefined;
    /**
     *The operation required fees to be paid which the initiator could not meet.
     */
    "FeesNotMet": undefined;
    /**
     *A remote lock with the corresponding data could not be found.
     */
    "LockNotFound": undefined;
    /**
     *The unlock operation cannot succeed because there are still consumers of the lock.
     */
    "InUse": undefined;
    /**
     *Invalid asset, reserve chain could not be determined for it.
     */
    "InvalidAssetUnknownReserve": undefined;
    /**
     *Invalid asset, do not support remote asset reserves with different fees reserves.
     */
    "InvalidAssetUnsupportedReserve": undefined;
    /**
     *Too many assets with different reserve locations have been attempted for transfer.
     */
    "TooManyReserves": undefined;
    /**
     *Local XCM execution incomplete.
     */
    "LocalExecutionIncomplete": undefined;
}>;
export type I5iupade5ag2dp = AnonymousEnum<{
    /**
     *Page is not reapable because it has items remaining to be processed and is not old
     *enough.
     */
    "NotReapable": undefined;
    /**
     *Page to be reaped does not exist.
     */
    "NoPage": undefined;
    /**
     *The referenced message could not be found.
     */
    "NoMessage": undefined;
    /**
     *The message was already processed and cannot be processed again.
     */
    "AlreadyProcessed": undefined;
    /**
     *The message is queued for future execution.
     */
    "Queued": undefined;
    /**
     *There is temporarily not enough weight to continue servicing messages.
     */
    "InsufficientWeight": undefined;
    /**
     *This message is temporarily unprocessable.
     *
     *Such errors are expected, but not guaranteed, to resolve themselves eventually through
     *retrying.
     */
    "TemporarilyUnprocessable": undefined;
    /**
     *The queue is paused and no message can be executed from it.
     *
     *This can change at any time and may resolve in the future by re-trying.
     */
    "QueuePaused": undefined;
    /**
     *Another call is in progress and needs to finish before this call can happen.
     */
    "RecursiveDisallowed": undefined;
}>;
export type I3qgd61cgli6cp = AnonymousEnum<{
    /**
     *The given asset ID is unknown.
     */
    "UnknownAssetKind": undefined;
    /**
     *The given asset ID already has an assigned conversion rate and cannot be re-created.
     */
    "AlreadyExists": undefined;
    /**
     *Overflow ocurred when calculating the inverse rate.
     */
    "Overflow": undefined;
}>;
export type TokenError = Enum<{
    "FundsUnavailable": undefined;
    "OnlyProvider": undefined;
    "BelowMinimum": undefined;
    "CannotCreate": undefined;
    "UnknownAsset": undefined;
    "Frozen": undefined;
    "Unsupported": undefined;
    "CannotCreateHold": undefined;
    "NotExpendable": undefined;
    "Blocked": undefined;
}>;
export declare const TokenError: GetEnum<TokenError>;
export type ArithmeticError = Enum<{
    "Underflow": undefined;
    "Overflow": undefined;
    "DivisionByZero": undefined;
}>;
export declare const ArithmeticError: GetEnum<ArithmeticError>;
export type TransactionalError = Enum<{
    "LimitReached": undefined;
    "NoLayer": undefined;
}>;
export declare const TransactionalError: GetEnum<TransactionalError>;
export type Icbccs0ug47ilf = {
    "account": SS58String;
};
export type I855j4i3kr8ko1 = {
    "sender": SS58String;
    "hash": FixedSizeBinary<32>;
};
export type Ibgl04rn6nbfm6 = {
    "code_hash": FixedSizeBinary<32>;
    "check_version": boolean;
};
export type I9td3rb1rc78be = AnonymousEnum<{
    /**
     *Scheduled some task.
     */
    "Scheduled": Anonymize<I5n4sebgkfr760>;
    /**
     *Canceled some task.
     */
    "Canceled": Anonymize<I5n4sebgkfr760>;
    /**
     *Dispatched some task.
     */
    "Dispatched": Anonymize<I4pem65k15fchj>;
    /**
     *Set a retry configuration for some task.
     */
    "RetrySet": Anonymize<Ia3c82eadg79bj>;
    /**
     *Cancel a retry configuration for some task.
     */
    "RetryCancelled": Anonymize<Ienusoeb625ftq>;
    /**
     *The call for the provided hash was not found so the task has been aborted.
     */
    "CallUnavailable": Anonymize<Ienusoeb625ftq>;
    /**
     *The given task was unable to be renewed since the agenda is full at that block.
     */
    "PeriodicFailed": Anonymize<Ienusoeb625ftq>;
    /**
     *The given task was unable to be retried since the agenda is full at that block or there
     *was not enough weight to reschedule it.
     */
    "RetryFailed": Anonymize<Ienusoeb625ftq>;
    /**
     *The given task can never be executed since it is overweight.
     */
    "PermanentlyOverweight": Anonymize<Ienusoeb625ftq>;
}>;
export type I5n4sebgkfr760 = {
    "when": number;
    "index": number;
};
export type I4pem65k15fchj = {
    "task": Anonymize<I9jd27rnpm8ttv>;
    "id"?: Anonymize<I4s6vifaf8k998>;
    "result": Anonymize<Icjq7kd1j70ubn>;
};
export type I9jd27rnpm8ttv = FixedSizeArray<2, number>;
export type I4s6vifaf8k998 = (FixedSizeBinary<32>) | undefined;
export type Icjq7kd1j70ubn = ResultPayload<undefined, Anonymize<Icb996amjvq1c5>>;
export type Ia3c82eadg79bj = {
    "task": Anonymize<I9jd27rnpm8ttv>;
    "id"?: Anonymize<I4s6vifaf8k998>;
    "period": number;
    "retries": number;
};
export type Ienusoeb625ftq = {
    "task": Anonymize<I9jd27rnpm8ttv>;
    "id"?: Anonymize<I4s6vifaf8k998>;
};
export type PreimageEvent = Enum<{
    /**
     *A preimage has been noted.
     */
    "Noted": Anonymize<I1jm8m1rh9e20v>;
    /**
     *A preimage has been requested.
     */
    "Requested": Anonymize<I1jm8m1rh9e20v>;
    /**
     *A preimage has ben cleared.
     */
    "Cleared": Anonymize<I1jm8m1rh9e20v>;
}>;
export declare const PreimageEvent: GetEnum<PreimageEvent>;
export type I1jm8m1rh9e20v = {
    "hash": FixedSizeBinary<32>;
};
export type IndicesEvent = Enum<{
    /**
     *A account index was assigned.
     */
    "IndexAssigned": Anonymize<Ia1u3jll6a06ae>;
    /**
     *A account index has been freed up (unassigned).
     */
    "IndexFreed": Anonymize<I666bl2fqjkejo>;
    /**
     *A account index has been frozen to its current account ID.
     */
    "IndexFrozen": Anonymize<Ia1u3jll6a06ae>;
}>;
export declare const IndicesEvent: GetEnum<IndicesEvent>;
export type Ia1u3jll6a06ae = {
    "who": SS58String;
    "index": number;
};
export type I666bl2fqjkejo = {
    "index": number;
};
export type Iao8h4hv7atnq3 = AnonymousEnum<{
    /**
     *An account was created with some free balance.
     */
    "Endowed": Anonymize<Icv68aq8841478>;
    /**
     *An account was removed whose balance was non-zero but below ExistentialDeposit,
     *resulting in an outright loss.
     */
    "DustLost": Anonymize<Ic262ibdoec56a>;
    /**
     *Transfer succeeded.
     */
    "Transfer": Anonymize<Iflcfm9b6nlmdd>;
    /**
     *A balance was set by root.
     */
    "BalanceSet": Anonymize<Ijrsf4mnp3eka>;
    /**
     *Some balance was reserved (moved from free to reserved).
     */
    "Reserved": Anonymize<Id5fm4p8lj5qgi>;
    /**
     *Some balance was unreserved (moved from reserved to free).
     */
    "Unreserved": Anonymize<Id5fm4p8lj5qgi>;
    /**
     *Some balance was moved from the reserve of the first account to the second account.
     *Final argument indicates the destination balance type.
     */
    "ReserveRepatriated": Anonymize<I8tjvj9uq4b7hi>;
    /**
     *Some amount was deposited (e.g. for transaction fees).
     */
    "Deposit": Anonymize<Id5fm4p8lj5qgi>;
    /**
     *Some amount was withdrawn from the account (e.g. for transaction fees).
     */
    "Withdraw": Anonymize<Id5fm4p8lj5qgi>;
    /**
     *Some amount was removed from the account (e.g. for misbehavior).
     */
    "Slashed": Anonymize<Id5fm4p8lj5qgi>;
    /**
     *Some amount was minted into an account.
     */
    "Minted": Anonymize<Id5fm4p8lj5qgi>;
    /**
     *Some amount was burned from an account.
     */
    "Burned": Anonymize<Id5fm4p8lj5qgi>;
    /**
     *Some amount was suspended from an account (it can be restored later).
     */
    "Suspended": Anonymize<Id5fm4p8lj5qgi>;
    /**
     *Some amount was restored into an account.
     */
    "Restored": Anonymize<Id5fm4p8lj5qgi>;
    /**
     *An account was upgraded.
     */
    "Upgraded": Anonymize<I4cbvqmqadhrea>;
    /**
     *Total issuance was increased by `amount`, creating a credit to be balanced.
     */
    "Issued": Anonymize<I3qt1hgg4djhgb>;
    /**
     *Total issuance was decreased by `amount`, creating a debt to be balanced.
     */
    "Rescinded": Anonymize<I3qt1hgg4djhgb>;
    /**
     *Some balance was locked.
     */
    "Locked": Anonymize<Id5fm4p8lj5qgi>;
    /**
     *Some balance was unlocked.
     */
    "Unlocked": Anonymize<Id5fm4p8lj5qgi>;
    /**
     *Some balance was frozen.
     */
    "Frozen": Anonymize<Id5fm4p8lj5qgi>;
    /**
     *Some balance was thawed.
     */
    "Thawed": Anonymize<Id5fm4p8lj5qgi>;
    /**
     *The `TotalIssuance` was forcefully changed.
     */
    "TotalIssuanceForced": Anonymize<I4fooe9dun9o0t>;
}>;
export type Icv68aq8841478 = {
    "account": SS58String;
    "free_balance": bigint;
};
export type Ic262ibdoec56a = {
    "account": SS58String;
    "amount": bigint;
};
export type Iflcfm9b6nlmdd = {
    "from": SS58String;
    "to": SS58String;
    "amount": bigint;
};
export type Ijrsf4mnp3eka = {
    "who": SS58String;
    "free": bigint;
};
export type Id5fm4p8lj5qgi = {
    "who": SS58String;
    "amount": bigint;
};
export type I8tjvj9uq4b7hi = {
    "from": SS58String;
    "to": SS58String;
    "amount": bigint;
    "destination_status": BalanceStatus;
};
export type BalanceStatus = Enum<{
    "Free": undefined;
    "Reserved": undefined;
}>;
export declare const BalanceStatus: GetEnum<BalanceStatus>;
export type I4cbvqmqadhrea = {
    "who": SS58String;
};
export type I3qt1hgg4djhgb = {
    "amount": bigint;
};
export type I4fooe9dun9o0t = {
    "old": bigint;
    "new": bigint;
};
export type TransactionPaymentEvent = Enum<{
    /**
     *A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
     *has been paid by `who`.
     */
    "TransactionFeePaid": Anonymize<Ier2cke86dqbr2>;
}>;
export declare const TransactionPaymentEvent: GetEnum<TransactionPaymentEvent>;
export type Ier2cke86dqbr2 = {
    "who": SS58String;
    "actual_fee": bigint;
    "tip": bigint;
};
export type StakingEvent = Enum<{
    /**
     *The era payout has been set; the first balance is the validator-payout; the second is
     *the remainder from the maximum amount of reward.
     */
    "EraPaid": Anonymize<I1au3fq4n84nv3>;
    /**
     *The nominator has been rewarded by this amount to this destination.
     */
    "Rewarded": Anonymize<Iejaj7m7qka9tr>;
    /**
     *A staker (validator or nominator) has been slashed by the given amount.
     */
    "Slashed": Anonymize<Idnak900lt5lm8>;
    /**
     *A slash for the given validator, for the given percentage of their stake, at the given
     *era as been reported.
     */
    "SlashReported": Anonymize<I27n7lbd66730p>;
    /**
     *An old slashing report from a prior era was discarded because it could
     *not be processed.
     */
    "OldSlashingReportDiscarded": Anonymize<I2hq50pu2kdjpo>;
    /**
     *A new set of stakers was elected.
     */
    "StakersElected": undefined;
    /**
     *An account has bonded this amount. \[stash, amount\]
     *
     *NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
     *it will not be emitted for staking rewards when they are added to stake.
     */
    "Bonded": Anonymize<Ifk8eme5o7mukf>;
    /**
     *An account has unbonded this amount.
     */
    "Unbonded": Anonymize<Ifk8eme5o7mukf>;
    /**
     *An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
     *from the unlocking queue.
     */
    "Withdrawn": Anonymize<Ifk8eme5o7mukf>;
    /**
     *A nominator has been kicked from a validator.
     */
    "Kicked": Anonymize<Iau4cgm6ih61cf>;
    /**
     *The election failed. No new era is planned.
     */
    "StakingElectionFailed": undefined;
    /**
     *An account has stopped participating as either a validator or nominator.
     */
    "Chilled": Anonymize<Idl3umm12u5pa>;
    /**
     *The stakers' rewards are getting paid.
     */
    "PayoutStarted": Anonymize<I6ir616rur362k>;
    /**
     *A validator has set their preferences.
     */
    "ValidatorPrefsSet": Anonymize<Ic19as7nbst738>;
    /**
     *Voters size limit reached.
     */
    "SnapshotVotersSizeExceeded": Anonymize<I54umskavgc9du>;
    /**
     *Targets size limit reached.
     */
    "SnapshotTargetsSizeExceeded": Anonymize<I54umskavgc9du>;
    /**
     *A new force era mode was set.
     */
    "ForceEra": Anonymize<I2ip7o9e2tc5sf>;
    /**
     *Report of a controller batch deprecation.
     */
    "ControllerBatchDeprecated": Anonymize<I5egvk6hadac5h>;
}>;
export declare const StakingEvent: GetEnum<StakingEvent>;
export type I1au3fq4n84nv3 = {
    "era_index": number;
    "validator_payout": bigint;
    "remainder": bigint;
};
export type Iejaj7m7qka9tr = {
    "stash": SS58String;
    "dest": StakingRewardDestination;
    "amount": bigint;
};
export type StakingRewardDestination = Enum<{
    "Staked": undefined;
    "Stash": undefined;
    "Controller": undefined;
    "Account": SS58String;
    "None": undefined;
}>;
export declare const StakingRewardDestination: GetEnum<StakingRewardDestination>;
export type Idnak900lt5lm8 = {
    "staker": SS58String;
    "amount": bigint;
};
export type I27n7lbd66730p = {
    "validator": SS58String;
    "fraction": number;
    "slash_era": number;
};
export type I2hq50pu2kdjpo = {
    "session_index": number;
};
export type Ifk8eme5o7mukf = {
    "stash": SS58String;
    "amount": bigint;
};
export type Iau4cgm6ih61cf = {
    "nominator": SS58String;
    "stash": SS58String;
};
export type Idl3umm12u5pa = {
    "stash": SS58String;
};
export type I6ir616rur362k = {
    "era_index": number;
    "validator_stash": SS58String;
};
export type Ic19as7nbst738 = {
    "stash": SS58String;
    "prefs": Anonymize<I9o7ssi9vmhmgr>;
};
export type I9o7ssi9vmhmgr = {
    "commission": number;
    "blocked": boolean;
};
export type I54umskavgc9du = {
    "size": number;
};
export type I2ip7o9e2tc5sf = {
    "mode": StakingForcing;
};
export type StakingForcing = Enum<{
    "NotForcing": undefined;
    "ForceNew": undefined;
    "ForceNone": undefined;
    "ForceAlways": undefined;
}>;
export declare const StakingForcing: GetEnum<StakingForcing>;
export type I5egvk6hadac5h = {
    "failures": number;
};
export type OffencesEvent = Enum<{
    /**
     *There is an offence reported of the given `kind` happened at the `session_index` and
     *(kind-specific) time slot. This event is not deposited for duplicate slashes.
     *\[kind, timeslot\].
     */
    "Offence": Anonymize<Iempvdlhc5ih6g>;
}>;
export declare const OffencesEvent: GetEnum<OffencesEvent>;
export type Iempvdlhc5ih6g = {
    "kind": FixedSizeBinary<16>;
    "timeslot": Binary;
};
export type SessionEvent = Enum<{
    /**
     *New session has happened. Note that the argument is the session index, not the
     *block number as the type might suggest.
     */
    "NewSession": Anonymize<I2hq50pu2kdjpo>;
}>;
export declare const SessionEvent: GetEnum<SessionEvent>;
export type GrandpaEvent = Enum<{
    /**
     *New authority set has been applied.
     */
    "NewAuthorities": Anonymize<I5768ac424h061>;
    /**
     *Current authority set has been paused.
     */
    "Paused": undefined;
    /**
     *Current authority set has been resumed.
     */
    "Resumed": undefined;
}>;
export declare const GrandpaEvent: GetEnum<GrandpaEvent>;
export type I5768ac424h061 = {
    "authority_set": Anonymize<I3geksg000c171>;
};
export type I3geksg000c171 = Array<Anonymize<I5spuldj7iqfb2>>;
export type I5spuldj7iqfb2 = [FixedSizeBinary<32>, bigint];
export type Iceo3qo846468b = AnonymousEnum<{
    /**
     *We have ended a spend period and will now allocate funds.
     */
    "Spending": Anonymize<I8iksqi3eani0a>;
    /**
     *Some funds have been allocated.
     */
    "Awarded": Anonymize<I16enopmju1p0q>;
    /**
     *Some of our funds have been burnt.
     */
    "Burnt": Anonymize<I43kq8qudg7pq9>;
    /**
     *Spending has finished; this is the amount that rolls over until next spend.
     */
    "Rollover": Anonymize<I76riseemre533>;
    /**
     *Some funds have been deposited.
     */
    "Deposit": Anonymize<Ie5v6njpckr05b>;
    /**
     *A new spend proposal has been approved.
     */
    "SpendApproved": Anonymize<I38bmcrmh852rk>;
    /**
     *The inactive funds of the pallet have been updated.
     */
    "UpdatedInactive": Anonymize<I4hcillge8de5f>;
    /**
     *A new asset spend proposal has been approved.
     */
    "AssetSpendApproved": Anonymize<If52u7u3r3ve0n>;
    /**
     *An approved spend was voided.
     */
    "AssetSpendVoided": Anonymize<I666bl2fqjkejo>;
    /**
     *A payment happened.
     */
    "Paid": Anonymize<Iek7v4hrgnq6iv>;
    /**
     *A payment failed and can be retried.
     */
    "PaymentFailed": Anonymize<Iek7v4hrgnq6iv>;
    /**
     *A spend was processed and removed from the storage. It might have been successfully
     *paid or it may have expired.
     */
    "SpendProcessed": Anonymize<I666bl2fqjkejo>;
}>;
export type I8iksqi3eani0a = {
    "budget_remaining": bigint;
};
export type I16enopmju1p0q = {
    "proposal_index": number;
    "award": bigint;
    "account": SS58String;
};
export type I43kq8qudg7pq9 = {
    "burnt_funds": bigint;
};
export type I76riseemre533 = {
    "rollover_balance": bigint;
};
export type Ie5v6njpckr05b = {
    "value": bigint;
};
export type I38bmcrmh852rk = {
    "proposal_index": number;
    "amount": bigint;
    "beneficiary": SS58String;
};
export type I4hcillge8de5f = {
    "reactivated": bigint;
    "deactivated": bigint;
};
export type If52u7u3r3ve0n = {
    "index": number;
    "asset_kind": VersionedLocatableAsset;
    "amount": bigint;
    "beneficiary": DotXcmVersionedLocation;
    "valid_from": number;
    "expire_at": number;
};
export type VersionedLocatableAsset = Enum<{
    "V3": Anonymize<Ieiirnju6cff3l>;
    "V4": Anonymize<Ieqft092b9kkr2>;
}>;
export declare const VersionedLocatableAsset: GetEnum<VersionedLocatableAsset>;
export type Ieiirnju6cff3l = {
    "location": Anonymize<I4c0s5cioidn76>;
    "asset_id": XcmV3MultiassetAssetId;
};
export type I4c0s5cioidn76 = {
    "parents": number;
    "interior": XcmV3Junctions;
};
export type XcmV3Junctions = Enum<{
    "Here": undefined;
    "X1": XcmV3Junction;
    "X2": Anonymize<Iam58b36i8f27i>;
    "X3": Anonymize<Iegjh9cie771d8>;
    "X4": Anonymize<Iae5flu84s2oia>;
    "X5": Anonymize<Iejq8c4n82a165>;
    "X6": Anonymize<I7rmt803vbpqrl>;
    "X7": Anonymize<I7onfe2toh27f0>;
    "X8": Anonymize<I3vjadpg0k2omo>;
}>;
export declare const XcmV3Junctions: GetEnum<XcmV3Junctions>;
export type XcmV3Junction = Enum<{
    "Parachain": number;
    "AccountId32": Anonymize<Ifq0i8kc6ds30i>;
    "AccountIndex64": Anonymize<I2a3org9qntfkr>;
    "AccountKey20": Anonymize<I9ed2klpttaegt>;
    "PalletInstance": number;
    "GeneralIndex": bigint;
    "GeneralKey": Anonymize<I15lht6t53odo4>;
    "OnlyChild": undefined;
    "Plurality": Anonymize<I518fbtnclg1oc>;
    "GlobalConsensus": XcmV3JunctionNetworkId;
}>;
export declare const XcmV3Junction: GetEnum<XcmV3Junction>;
export type Ifq0i8kc6ds30i = {
    "network"?: Anonymize<Idcq3vns9tgp5p>;
    "id": FixedSizeBinary<32>;
};
export type Idcq3vns9tgp5p = (XcmV3JunctionNetworkId) | undefined;
export type XcmV3JunctionNetworkId = Enum<{
    "ByGenesis": FixedSizeBinary<32>;
    "ByFork": Anonymize<I15vf5oinmcgps>;
    "Polkadot": undefined;
    "Kusama": undefined;
    "Westend": undefined;
    "Rococo": undefined;
    "Wococo": undefined;
    "Ethereum": Anonymize<I623eo8t3jrbeo>;
    "BitcoinCore": undefined;
    "BitcoinCash": undefined;
    "PolkadotBulletin": undefined;
}>;
export declare const XcmV3JunctionNetworkId: GetEnum<XcmV3JunctionNetworkId>;
export type I15vf5oinmcgps = {
    "block_number": bigint;
    "block_hash": FixedSizeBinary<32>;
};
export type I623eo8t3jrbeo = {
    "chain_id": bigint;
};
export type I2a3org9qntfkr = {
    "network"?: Anonymize<Idcq3vns9tgp5p>;
    "index": bigint;
};
export type I9ed2klpttaegt = {
    "network"?: Anonymize<Idcq3vns9tgp5p>;
    "key": FixedSizeBinary<20>;
};
export type I15lht6t53odo4 = {
    "length": number;
    "data": FixedSizeBinary<32>;
};
export type I518fbtnclg1oc = {
    "id": XcmV3JunctionBodyId;
    "part": XcmV2JunctionBodyPart;
};
export type XcmV3JunctionBodyId = Enum<{
    "Unit": undefined;
    "Moniker": FixedSizeBinary<4>;
    "Index": number;
    "Executive": undefined;
    "Technical": undefined;
    "Legislative": undefined;
    "Judicial": undefined;
    "Defense": undefined;
    "Administration": undefined;
    "Treasury": undefined;
}>;
export declare const XcmV3JunctionBodyId: GetEnum<XcmV3JunctionBodyId>;
export type XcmV2JunctionBodyPart = Enum<{
    "Voice": undefined;
    "Members": Anonymize<Iafscmv8tjf0ou>;
    "Fraction": Anonymize<Idif02efq16j92>;
    "AtLeastProportion": Anonymize<Idif02efq16j92>;
    "MoreThanProportion": Anonymize<Idif02efq16j92>;
}>;
export declare const XcmV2JunctionBodyPart: GetEnum<XcmV2JunctionBodyPart>;
export type Iafscmv8tjf0ou = {
    "count": number;
};
export type Idif02efq16j92 = {
    "nom": number;
    "denom": number;
};
export type Iam58b36i8f27i = FixedSizeArray<2, XcmV3Junction>;
export type Iegjh9cie771d8 = FixedSizeArray<3, XcmV3Junction>;
export type Iae5flu84s2oia = FixedSizeArray<4, XcmV3Junction>;
export type Iejq8c4n82a165 = FixedSizeArray<5, XcmV3Junction>;
export type I7rmt803vbpqrl = FixedSizeArray<6, XcmV3Junction>;
export type I7onfe2toh27f0 = FixedSizeArray<7, XcmV3Junction>;
export type I3vjadpg0k2omo = FixedSizeArray<8, XcmV3Junction>;
export type XcmV3MultiassetAssetId = Enum<{
    "Concrete": Anonymize<I4c0s5cioidn76>;
    "Abstract": FixedSizeBinary<32>;
}>;
export declare const XcmV3MultiassetAssetId: GetEnum<XcmV3MultiassetAssetId>;
export type Ieqft092b9kkr2 = {
    "location": Anonymize<I4c0s5cioidn76>;
    "asset_id": Anonymize<I4c0s5cioidn76>;
};
export type DotXcmVersionedLocation = Enum<{
    "V2": Anonymize<I4frqunb5hj2km>;
    "V3": Anonymize<I4c0s5cioidn76>;
    "V4": Anonymize<I4c0s5cioidn76>;
}>;
export declare const DotXcmVersionedLocation: GetEnum<DotXcmVersionedLocation>;
export type I4frqunb5hj2km = {
    "parents": number;
    "interior": XcmV2MultilocationJunctions;
};
export type XcmV2MultilocationJunctions = Enum<{
    "Here": undefined;
    "X1": XcmV2Junction;
    "X2": Anonymize<I7tthuukjoks45>;
    "X3": Anonymize<Icpsqle8f7ccnh>;
    "X4": Anonymize<Ifaduechfcq41r>;
    "X5": Anonymize<Ifg30nsfqato4g>;
    "X6": Anonymize<I8s2vh6qelslgu>;
    "X7": Anonymize<I7r6q3396okion>;
    "X8": Anonymize<I1d4fie0b78rtc>;
}>;
export declare const XcmV2MultilocationJunctions: GetEnum<XcmV2MultilocationJunctions>;
export type XcmV2Junction = Enum<{
    "Parachain": number;
    "AccountId32": Anonymize<I6h60jropk90ne>;
    "AccountIndex64": Anonymize<I73mah5ooc6vk>;
    "AccountKey20": Anonymize<I9kkjqh79doku3>;
    "PalletInstance": number;
    "GeneralIndex": bigint;
    "GeneralKey": Binary;
    "OnlyChild": undefined;
    "Plurality": Anonymize<Iaqhvfsgakjhdq>;
}>;
export declare const XcmV2Junction: GetEnum<XcmV2Junction>;
export type I6h60jropk90ne = {
    "network": XcmV2NetworkId;
    "id": FixedSizeBinary<32>;
};
export type XcmV2NetworkId = Enum<{
    "Any": undefined;
    "Named": Binary;
    "Polkadot": undefined;
    "Kusama": undefined;
}>;
export declare const XcmV2NetworkId: GetEnum<XcmV2NetworkId>;
export type I73mah5ooc6vk = {
    "network": XcmV2NetworkId;
    "index": bigint;
};
export type I9kkjqh79doku3 = {
    "network": XcmV2NetworkId;
    "key": FixedSizeBinary<20>;
};
export type Iaqhvfsgakjhdq = {
    "id": XcmV2BodyId;
    "part": XcmV2JunctionBodyPart;
};
export type XcmV2BodyId = Enum<{
    "Unit": undefined;
    "Named": Binary;
    "Index": number;
    "Executive": undefined;
    "Technical": undefined;
    "Legislative": undefined;
    "Judicial": undefined;
    "Defense": undefined;
    "Administration": undefined;
    "Treasury": undefined;
}>;
export declare const XcmV2BodyId: GetEnum<XcmV2BodyId>;
export type I7tthuukjoks45 = FixedSizeArray<2, XcmV2Junction>;
export type Icpsqle8f7ccnh = FixedSizeArray<3, XcmV2Junction>;
export type Ifaduechfcq41r = FixedSizeArray<4, XcmV2Junction>;
export type Ifg30nsfqato4g = FixedSizeArray<5, XcmV2Junction>;
export type I8s2vh6qelslgu = FixedSizeArray<6, XcmV2Junction>;
export type I7r6q3396okion = FixedSizeArray<7, XcmV2Junction>;
export type I1d4fie0b78rtc = FixedSizeArray<8, XcmV2Junction>;
export type Iek7v4hrgnq6iv = {
    "index": number;
    "payment_id": bigint;
};
export type ConvictionVotingEvent = Enum<{
    /**
     *An account has delegated their vote to another account. \[who, target\]
     */
    "Delegated": Anonymize<I2na29tt2afp0j>;
    /**
     *An \[account\] has cancelled a previous delegation operation.
     */
    "Undelegated": SS58String;
}>;
export declare const ConvictionVotingEvent: GetEnum<ConvictionVotingEvent>;
export type I2na29tt2afp0j = FixedSizeArray<2, SS58String>;
export type Idfraa3b4eu018 = AnonymousEnum<{
    /**
     *A referendum has been submitted.
     */
    "Submitted": Anonymize<I229ijht536qdu>;
    /**
     *The decision deposit has been placed.
     */
    "DecisionDepositPlaced": Anonymize<I62nte77gksm0f>;
    /**
     *The decision deposit has been refunded.
     */
    "DecisionDepositRefunded": Anonymize<I62nte77gksm0f>;
    /**
     *A deposit has been slashed.
     */
    "DepositSlashed": Anonymize<Id5fm4p8lj5qgi>;
    /**
     *A referendum has moved into the deciding phase.
     */
    "DecisionStarted": Anonymize<I9cg2delv92pvq>;
    "ConfirmStarted": Anonymize<I666bl2fqjkejo>;
    "ConfirmAborted": Anonymize<I666bl2fqjkejo>;
    /**
     *A referendum has ended its confirmation phase and is ready for approval.
     */
    "Confirmed": Anonymize<Ilhp45uime5tp>;
    /**
     *A referendum has been approved and its proposal has been scheduled.
     */
    "Approved": Anonymize<I666bl2fqjkejo>;
    /**
     *A proposal has been rejected by referendum.
     */
    "Rejected": Anonymize<Ilhp45uime5tp>;
    /**
     *A referendum has been timed out without being decided.
     */
    "TimedOut": Anonymize<Ilhp45uime5tp>;
    /**
     *A referendum has been cancelled.
     */
    "Cancelled": Anonymize<Ilhp45uime5tp>;
    /**
     *A referendum has been killed.
     */
    "Killed": Anonymize<Ilhp45uime5tp>;
    /**
     *The submission deposit has been refunded.
     */
    "SubmissionDepositRefunded": Anonymize<I62nte77gksm0f>;
    /**
     *Metadata for a referendum has been set.
     */
    "MetadataSet": Anonymize<I4f1hv034jf1dt>;
    /**
     *Metadata for a referendum has been cleared.
     */
    "MetadataCleared": Anonymize<I4f1hv034jf1dt>;
}>;
export type I229ijht536qdu = {
    /**
     *Index of the referendum.
     */
    "index": number;
    /**
     *The track (and by extension proposal dispatch origin) of this referendum.
     */
    "track": number;
    /**
     *The proposal for the referendum.
     */
    "proposal": PreimagesBounded;
};
export type PreimagesBounded = Enum<{
    "Legacy": Anonymize<I1jm8m1rh9e20v>;
    "Inline": Binary;
    "Lookup": Anonymize<Ieln2r0qa0hb4j>;
}>;
export declare const PreimagesBounded: GetEnum<PreimagesBounded>;
export type Ieln2r0qa0hb4j = {
    "hash": FixedSizeBinary<32>;
    "len": number;
};
export type I62nte77gksm0f = {
    /**
     *Index of the referendum.
     */
    "index": number;
    /**
     *The account who placed the deposit.
     */
    "who": SS58String;
    /**
     *The amount placed by the account.
     */
    "amount": bigint;
};
export type I9cg2delv92pvq = {
    /**
     *Index of the referendum.
     */
    "index": number;
    /**
     *The track (and by extension proposal dispatch origin) of this referendum.
     */
    "track": number;
    /**
     *The proposal for the referendum.
     */
    "proposal": PreimagesBounded;
    /**
     *The current tally of votes in this referendum.
     */
    "tally": Anonymize<Ifsk7cbmtit1jd>;
};
export type Ifsk7cbmtit1jd = {
    "ayes": bigint;
    "nays": bigint;
    "support": bigint;
};
export type Ilhp45uime5tp = {
    /**
     *Index of the referendum.
     */
    "index": number;
    /**
     *The final tally of votes in this referendum.
     */
    "tally": Anonymize<Ifsk7cbmtit1jd>;
};
export type I4f1hv034jf1dt = {
    /**
     *Index of the referendum.
     */
    "index": number;
    /**
     *Preimage hash.
     */
    "hash": FixedSizeBinary<32>;
};
export type I49uspu4v8kcui = AnonymousEnum<{
    "CallWhitelisted": Anonymize<I1adbcfi5uc62r>;
    "WhitelistedCallRemoved": Anonymize<I1adbcfi5uc62r>;
    "WhitelistedCallDispatched": Anonymize<Iabbkuinvp2njd>;
}>;
export type I1adbcfi5uc62r = {
    "call_hash": FixedSizeBinary<32>;
};
export type Iabbkuinvp2njd = {
    "call_hash": FixedSizeBinary<32>;
    "result": Anonymize<I7mc367dhekj4>;
};
export type I7mc367dhekj4 = ResultPayload<Anonymize<Ia1u1r3n74r13c>, Anonymize<I8061u9efkhek9>>;
export type Ia1u1r3n74r13c = {
    "actual_weight"?: Anonymize<Iasb8k6ash5mjn>;
    "pays_fee": Anonymize<Iehg04bj71rkd>;
};
export type Iasb8k6ash5mjn = (Anonymize<I4q39t5hn830vp>) | undefined;
export type I8061u9efkhek9 = {
    "post_info": Anonymize<Ia1u1r3n74r13c>;
    "error": Anonymize<Icb996amjvq1c5>;
};
export type In3t00aurfuda = AnonymousEnum<{
    /**
     *A Parameter was set.
     *
     *Is also emitted when the value was not changed.
     */
    "Updated": Anonymize<I9f0v9ntn9g19p>;
}>;
export type I9f0v9ntn9g19p = {
    /**
     *The key that was updated.
     */
    "key": Anonymize<I9h43amtitrqum>;
    /**
     *The old value before this call.
     */
    "old_value"?: Anonymize<I6ul1np9r7bgmv>;
    /**
     *The new value after this call.
     */
    "new_value"?: Anonymize<I6ul1np9r7bgmv>;
};
export type I9h43amtitrqum = AnonymousEnum<{
    "Inflation": Anonymize<I7rmm2emik7fsg>;
}>;
export type I7rmm2emik7fsg = AnonymousEnum<{
    "MinInflation": undefined;
    "MaxInflation": undefined;
    "IdealStake": undefined;
    "Falloff": undefined;
    "UseAuctionSlots": undefined;
}>;
export type I6ul1np9r7bgmv = (Anonymize<I22o1tjs56dvi2>) | undefined;
export type I22o1tjs56dvi2 = AnonymousEnum<{
    "Inflation": Anonymize<I69i3c3kkvltuj>;
}>;
export type I69i3c3kkvltuj = AnonymousEnum<{
    "MinInflation": bigint;
    "MaxInflation": bigint;
    "IdealStake": bigint;
    "Falloff": bigint;
    "UseAuctionSlots": boolean;
}>;
export type CommonClaimsEvent = Enum<{
    /**
     *Someone claimed some DOTs.
     */
    "Claimed": Anonymize<Ie3hcrrq6r18fs>;
}>;
export declare const CommonClaimsEvent: GetEnum<CommonClaimsEvent>;
export type Ie3hcrrq6r18fs = {
    "who": SS58String;
    "ethereum_address": FixedSizeBinary<20>;
    "amount": bigint;
};
export type VestingEvent = Enum<{
    /**
     *The amount vested has been updated. This could indicate a change in funds available.
     *The balance given is the amount which is left unvested (and thus locked).
     */
    "VestingUpdated": Anonymize<Ievr89968437gm>;
    /**
     *An \[account\] has become fully vested.
     */
    "VestingCompleted": Anonymize<Icbccs0ug47ilf>;
}>;
export declare const VestingEvent: GetEnum<VestingEvent>;
export type Ievr89968437gm = {
    "account": SS58String;
    "unvested": bigint;
};
export type Ivn4fchlcfshh = AnonymousEnum<{
    /**
     *Batch of dispatches did not complete fully. Index of first failing dispatch given, as
     *well as the error.
     */
    "BatchInterrupted": Anonymize<I1a5gf4n0nqs72>;
    /**
     *Batch of dispatches completed fully with no error.
     */
    "BatchCompleted": undefined;
    /**
     *Batch of dispatches completed but has errors.
     */
    "BatchCompletedWithErrors": undefined;
    /**
     *A single item within a Batch of dispatches has completed with no error.
     */
    "ItemCompleted": undefined;
    /**
     *A single item within a Batch of dispatches has completed with error.
     */
    "ItemFailed": Anonymize<I4t689jva3ns0s>;
    /**
     *A call was dispatched.
     */
    "DispatchedAs": Anonymize<Ierrtqmdqhej88>;
}>;
export type I1a5gf4n0nqs72 = {
    "index": number;
    "error": Anonymize<Icb996amjvq1c5>;
};
export type I4t689jva3ns0s = {
    "error": Anonymize<Icb996amjvq1c5>;
};
export type Ierrtqmdqhej88 = {
    "result": Anonymize<Icjq7kd1j70ubn>;
};
export type I38492taogqhfn = AnonymousEnum<{
    /**
     *A proxy was executed correctly, with the given.
     */
    "ProxyExecuted": Anonymize<Ierrtqmdqhej88>;
    /**
     *A pure account has been created by new proxy with given
     *disambiguation index and proxy type.
     */
    "PureCreated": Anonymize<Ifqt0l2jtnansm>;
    /**
     *An announcement was placed to make a call in the future.
     */
    "Announced": Anonymize<I2ur0oeqg495j8>;
    /**
     *A proxy was added.
     */
    "ProxyAdded": Anonymize<Ib5do5c9nfeb64>;
    /**
     *A proxy was removed.
     */
    "ProxyRemoved": Anonymize<Ib5do5c9nfeb64>;
}>;
export type Ifqt0l2jtnansm = {
    "pure": SS58String;
    "who": SS58String;
    "proxy_type": Anonymize<Ib9ifr8gu9ttks>;
    "disambiguation_index": number;
};
export type Ib9ifr8gu9ttks = AnonymousEnum<{
    "Any": undefined;
    "NonTransfer": undefined;
    "Governance": undefined;
    "Staking": undefined;
    "CancelProxy": undefined;
    "Auction": undefined;
    "NominationPools": undefined;
}>;
export type I2ur0oeqg495j8 = {
    "real": SS58String;
    "proxy": SS58String;
    "call_hash": FixedSizeBinary<32>;
};
export type Ib5do5c9nfeb64 = {
    "delegator": SS58String;
    "delegatee": SS58String;
    "proxy_type": Anonymize<Ib9ifr8gu9ttks>;
    "delay": number;
};
export type Ie2ea4ticfr4gj = AnonymousEnum<{
    /**
     *A new multisig operation has begun.
     */
    "NewMultisig": Anonymize<Iep27ialq4a7o7>;
    /**
     *A multisig operation has been approved by someone.
     */
    "MultisigApproval": Anonymize<Iasu5jvoqr43mv>;
    /**
     *A multisig operation has been executed.
     */
    "MultisigExecuted": Anonymize<Idpl8oj4a549ub>;
    /**
     *A multisig operation has been cancelled.
     */
    "MultisigCancelled": Anonymize<I5qolde99acmd1>;
}>;
export type Iep27ialq4a7o7 = {
    "approving": SS58String;
    "multisig": SS58String;
    "call_hash": FixedSizeBinary<32>;
};
export type Iasu5jvoqr43mv = {
    "approving": SS58String;
    "timepoint": Anonymize<Itvprrpb0nm3o>;
    "multisig": SS58String;
    "call_hash": FixedSizeBinary<32>;
};
export type Itvprrpb0nm3o = {
    "height": number;
    "index": number;
};
export type Idpl8oj4a549ub = {
    "approving": SS58String;
    "timepoint": Anonymize<Itvprrpb0nm3o>;
    "multisig": SS58String;
    "call_hash": FixedSizeBinary<32>;
    "result": Anonymize<Icjq7kd1j70ubn>;
};
export type I5qolde99acmd1 = {
    "cancelling": SS58String;
    "timepoint": Anonymize<Itvprrpb0nm3o>;
    "multisig": SS58String;
    "call_hash": FixedSizeBinary<32>;
};
export type BountiesEvent = Enum<{
    /**
     *New bounty proposal.
     */
    "BountyProposed": Anonymize<I666bl2fqjkejo>;
    /**
     *A bounty proposal was rejected; funds were slashed.
     */
    "BountyRejected": Anonymize<Id9idaj83175f9>;
    /**
     *A bounty proposal is funded and became active.
     */
    "BountyBecameActive": Anonymize<I666bl2fqjkejo>;
    /**
     *A bounty is awarded to a beneficiary.
     */
    "BountyAwarded": Anonymize<Ie1semicfuv5uu>;
    /**
     *A bounty is claimed by beneficiary.
     */
    "BountyClaimed": Anonymize<If25fjs9o37co1>;
    /**
     *A bounty is cancelled.
     */
    "BountyCanceled": Anonymize<I666bl2fqjkejo>;
    /**
     *A bounty expiry is extended.
     */
    "BountyExtended": Anonymize<I666bl2fqjkejo>;
    /**
     *A bounty is approved.
     */
    "BountyApproved": Anonymize<I666bl2fqjkejo>;
    /**
     *A bounty curator is proposed.
     */
    "CuratorProposed": Anonymize<I70sc1pdo8vtos>;
    /**
     *A bounty curator is unassigned.
     */
    "CuratorUnassigned": Anonymize<Ia9p5bg6p18r0i>;
    /**
     *A bounty curator is accepted.
     */
    "CuratorAccepted": Anonymize<I70sc1pdo8vtos>;
}>;
export declare const BountiesEvent: GetEnum<BountiesEvent>;
export type Id9idaj83175f9 = {
    "index": number;
    "bond": bigint;
};
export type Ie1semicfuv5uu = {
    "index": number;
    "beneficiary": SS58String;
};
export type If25fjs9o37co1 = {
    "index": number;
    "payout": bigint;
    "beneficiary": SS58String;
};
export type I70sc1pdo8vtos = {
    "bounty_id": number;
    "curator": SS58String;
};
export type Ia9p5bg6p18r0i = {
    "bounty_id": number;
};
export type ChildBountiesEvent = Enum<{
    /**
     *A child-bounty is added.
     */
    "Added": Anonymize<I60p8l86a8cm59>;
    /**
     *A child-bounty is awarded to a beneficiary.
     */
    "Awarded": Anonymize<I3m3sk2lgcabvp>;
    /**
     *A child-bounty is claimed by beneficiary.
     */
    "Claimed": Anonymize<I5pf572duh4oeg>;
    /**
     *A child-bounty is cancelled.
     */
    "Canceled": Anonymize<I60p8l86a8cm59>;
}>;
export declare const ChildBountiesEvent: GetEnum<ChildBountiesEvent>;
export type I60p8l86a8cm59 = {
    "index": number;
    "child_index": number;
};
export type I3m3sk2lgcabvp = {
    "index": number;
    "child_index": number;
    "beneficiary": SS58String;
};
export type I5pf572duh4oeg = {
    "index": number;
    "child_index": number;
    "payout": bigint;
    "beneficiary": SS58String;
};
export type ElectionProviderMultiPhaseEvent = Enum<{
    /**
     *A solution was stored with the given compute.
     *
     *The `origin` indicates the origin of the solution. If `origin` is `Some(AccountId)`,
     *the stored solution was submitted in the signed phase by a miner with the `AccountId`.
     *Otherwise, the solution was stored either during the unsigned phase or by
     *`T::ForceOrigin`. The `bool` is `true` when a previous solution was ejected to make
     *room for this one.
     */
    "SolutionStored": Anonymize<I4mol6k10mv0io>;
    /**
     *The election has been finalized, with the given computation and score.
     */
    "ElectionFinalized": Anonymize<Iec90vukseit9e>;
    /**
     *An election failed.
     *
     *Not much can be said about which computes failed in the process.
     */
    "ElectionFailed": undefined;
    /**
     *An account has been rewarded for their signed submission being finalized.
     */
    "Rewarded": Anonymize<I7j4m7a3pkvsf4>;
    /**
     *An account has been slashed for submitting an invalid signed submission.
     */
    "Slashed": Anonymize<I7j4m7a3pkvsf4>;
    /**
     *There was a phase transition in a given round.
     */
    "PhaseTransitioned": Anonymize<Ic2n50kpnu5mae>;
}>;
export declare const ElectionProviderMultiPhaseEvent: GetEnum<ElectionProviderMultiPhaseEvent>;
export type I4mol6k10mv0io = {
    "compute": ElectionProviderMultiPhaseElectionCompute;
    "origin"?: Anonymize<Ihfphjolmsqq1>;
    "prev_ejected": boolean;
};
export type ElectionProviderMultiPhaseElectionCompute = Enum<{
    "OnChain": undefined;
    "Signed": undefined;
    "Unsigned": undefined;
    "Fallback": undefined;
    "Emergency": undefined;
}>;
export declare const ElectionProviderMultiPhaseElectionCompute: GetEnum<ElectionProviderMultiPhaseElectionCompute>;
export type Ihfphjolmsqq1 = (SS58String) | undefined;
export type Iec90vukseit9e = {
    "compute": ElectionProviderMultiPhaseElectionCompute;
    "score": Anonymize<I8s6n43okuj2b1>;
};
export type I8s6n43okuj2b1 = {
    "minimal_stake": bigint;
    "sum_stake": bigint;
    "sum_stake_squared": bigint;
};
export type I7j4m7a3pkvsf4 = {
    "account": SS58String;
    "value": bigint;
};
export type Ic2n50kpnu5mae = {
    "from": ElectionProviderMultiPhasePhase;
    "to": ElectionProviderMultiPhasePhase;
    "round": number;
};
export type ElectionProviderMultiPhasePhase = Enum<{
    "Off": undefined;
    "Signed": undefined;
    "Unsigned": Anonymize<I38fu9hj3b9un7>;
    "Emergency": undefined;
}>;
export declare const ElectionProviderMultiPhasePhase: GetEnum<ElectionProviderMultiPhasePhase>;
export type I38fu9hj3b9un7 = [boolean, number];
export type BagsListEvent = Enum<{
    /**
     *Moved an account from one bag to another.
     */
    "Rebagged": Anonymize<I37454vatvmm1l>;
    /**
     *Updated the score of some account to the given amount.
     */
    "ScoreUpdated": Anonymize<Iblau1qa7u7fet>;
}>;
export declare const BagsListEvent: GetEnum<BagsListEvent>;
export type I37454vatvmm1l = {
    "who": SS58String;
    "from": bigint;
    "to": bigint;
};
export type Iblau1qa7u7fet = {
    "who": SS58String;
    "new_score": bigint;
};
export type NominationPoolsEvent = Enum<{
    /**
     *A pool has been created.
     */
    "Created": Anonymize<I1ti389kf8t6oi>;
    /**
     *A member has became bonded in a pool.
     */
    "Bonded": Anonymize<If4nnre373amul>;
    /**
     *A payout has been made to a member.
     */
    "PaidOut": Anonymize<I55kbor0ocqk6h>;
    /**
     *A member has unbonded from their pool.
     *
     *- `balance` is the corresponding balance of the number of points that has been
     *  requested to be unbonded (the argument of the `unbond` transaction) from the bonded
     *  pool.
     *- `points` is the number of points that are issued as a result of `balance` being
     *dissolved into the corresponding unbonding pool.
     *- `era` is the era in which the balance will be unbonded.
     *In the absence of slashing, these values will match. In the presence of slashing, the
     *number of points that are issued in the unbonding pool will be less than the amount
     *requested to be unbonded.
     */
    "Unbonded": Anonymize<Idsj9cg7j96kpc>;
    /**
     *A member has withdrawn from their pool.
     *
     *The given number of `points` have been dissolved in return of `balance`.
     *
     *Similar to `Unbonded` event, in the absence of slashing, the ratio of point to balance
     *will be 1.
     */
    "Withdrawn": Anonymize<Ido4u9drncfaml>;
    /**
     *A pool has been destroyed.
     */
    "Destroyed": Anonymize<I931cottvong90>;
    /**
     *The state of a pool has changed
     */
    "StateChanged": Anonymize<Ie8c7ctks8ur2p>;
    /**
     *A member has been removed from a pool.
     *
     *The removal can be voluntary (withdrawn all unbonded funds) or involuntary (kicked).
     */
    "MemberRemoved": Anonymize<I7vqogd77mmdlm>;
    /**
     *The roles of a pool have been updated to the given new roles. Note that the depositor
     *can never change.
     */
    "RolesUpdated": Anonymize<I6mik29s5073td>;
    /**
     *The active balance of pool `pool_id` has been slashed to `balance`.
     */
    "PoolSlashed": Anonymize<I2m0sqmb75cnpb>;
    /**
     *The unbond pool at `era` of pool `pool_id` has been slashed to `balance`.
     */
    "UnbondingPoolSlashed": Anonymize<I49agc5b62mehu>;
    /**
     *A pool's commission setting has been changed.
     */
    "PoolCommissionUpdated": Anonymize<Iatq9jda4hq6pg>;
    /**
     *A pool's maximum commission setting has been changed.
     */
    "PoolMaxCommissionUpdated": Anonymize<I8cbluptqo8kbp>;
    /**
     *A pool's commission `change_rate` has been changed.
     */
    "PoolCommissionChangeRateUpdated": Anonymize<I81cc4plffa1dm>;
    /**
     *Pool commission claim permission has been updated.
     */
    "PoolCommissionClaimPermissionUpdated": Anonymize<I3ihan8icf0c5k>;
    /**
     *Pool commission has been claimed.
     */
    "PoolCommissionClaimed": Anonymize<I2g87evcjlgmqi>;
    /**
     *Topped up deficit in frozen ED of the reward pool.
     */
    "MinBalanceDeficitAdjusted": Anonymize<Ieg1oc56mamrl5>;
    /**
     *Claimed excess frozen ED of af the reward pool.
     */
    "MinBalanceExcessAdjusted": Anonymize<Ieg1oc56mamrl5>;
}>;
export declare const NominationPoolsEvent: GetEnum<NominationPoolsEvent>;
export type I1ti389kf8t6oi = {
    "depositor": SS58String;
    "pool_id": number;
};
export type If4nnre373amul = {
    "member": SS58String;
    "pool_id": number;
    "bonded": bigint;
    "joined": boolean;
};
export type I55kbor0ocqk6h = {
    "member": SS58String;
    "pool_id": number;
    "payout": bigint;
};
export type Idsj9cg7j96kpc = {
    "member": SS58String;
    "pool_id": number;
    "balance": bigint;
    "points": bigint;
    "era": number;
};
export type Ido4u9drncfaml = {
    "member": SS58String;
    "pool_id": number;
    "balance": bigint;
    "points": bigint;
};
export type I931cottvong90 = {
    "pool_id": number;
};
export type Ie8c7ctks8ur2p = {
    "pool_id": number;
    "new_state": NominationPoolsPoolState;
};
export type NominationPoolsPoolState = Enum<{
    "Open": undefined;
    "Blocked": undefined;
    "Destroying": undefined;
}>;
export declare const NominationPoolsPoolState: GetEnum<NominationPoolsPoolState>;
export type I7vqogd77mmdlm = {
    "pool_id": number;
    "member": SS58String;
};
export type I6mik29s5073td = {
    "root"?: Anonymize<Ihfphjolmsqq1>;
    "bouncer"?: Anonymize<Ihfphjolmsqq1>;
    "nominator"?: Anonymize<Ihfphjolmsqq1>;
};
export type I2m0sqmb75cnpb = {
    "pool_id": number;
    "balance": bigint;
};
export type I49agc5b62mehu = {
    "pool_id": number;
    "era": number;
    "balance": bigint;
};
export type Iatq9jda4hq6pg = {
    "pool_id": number;
    "current"?: Anonymize<Ie8iutm7u02lmj>;
};
export type Ie8iutm7u02lmj = (Anonymize<I7svnfko10tq2e>) | undefined;
export type I7svnfko10tq2e = [number, SS58String];
export type I8cbluptqo8kbp = {
    "pool_id": number;
    "max_commission": number;
};
export type I81cc4plffa1dm = {
    "pool_id": number;
    "change_rate": Anonymize<Ibqul338t9c1ll>;
};
export type Ibqul338t9c1ll = {
    "max_increase": number;
    "min_delay": number;
};
export type I3ihan8icf0c5k = {
    "pool_id": number;
    "permission"?: Anonymize<I16m1kn78dee7v>;
};
export type I16m1kn78dee7v = (NominationPoolsCommissionClaimPermission) | undefined;
export type NominationPoolsCommissionClaimPermission = Enum<{
    "Permissionless": undefined;
    "Account": SS58String;
}>;
export declare const NominationPoolsCommissionClaimPermission: GetEnum<NominationPoolsCommissionClaimPermission>;
export type I2g87evcjlgmqi = {
    "pool_id": number;
    "commission": bigint;
};
export type Ieg1oc56mamrl5 = {
    "pool_id": number;
    "amount": bigint;
};
export type Ibku5mrlj7cn0g = AnonymousEnum<{
    /**
     *A staker was unstaked.
     */
    "Unstaked": Anonymize<I4nceha17l8sr8>;
    /**
     *A staker was slashed for requesting fast-unstake whilst being exposed.
     */
    "Slashed": Anonymize<Ifk8eme5o7mukf>;
    /**
     *A batch was partially checked for the given eras, but the process did not finish.
     */
    "BatchChecked": Anonymize<Ic0he9tlf9ll0u>;
    /**
     *A batch of a given size was terminated.
     *
     *This is always follows by a number of `Unstaked` or `Slashed` events, marking the end
     *of the batch. A new batch will be created upon next block.
     */
    "BatchFinished": Anonymize<I54umskavgc9du>;
    /**
     *An internal error happened. Operations will be paused now.
     */
    "InternalError": undefined;
}>;
export type I4nceha17l8sr8 = {
    "stash": SS58String;
    "result": Anonymize<Icjq7kd1j70ubn>;
};
export type Ic0he9tlf9ll0u = {
    "eras": Anonymize<Icgljjb6j82uhn>;
};
export type Icgljjb6j82uhn = Array<number>;
export type ParachainsInclusionEvent = Enum<{
    /**
     *A candidate was backed. `[candidate, head_data]`
     */
    "CandidateBacked": Anonymize<Icdu1nb48l753j>;
    /**
     *A candidate was included. `[candidate, head_data]`
     */
    "CandidateIncluded": Anonymize<Icdu1nb48l753j>;
    /**
     *A candidate timed out. `[candidate, head_data]`
     */
    "CandidateTimedOut": Anonymize<I618m2uag0aopg>;
    /**
     *Some upward messages have been received and will be processed.
     */
    "UpwardMessagesReceived": Anonymize<Ic8i89mfkmn3n7>;
}>;
export declare const ParachainsInclusionEvent: GetEnum<ParachainsInclusionEvent>;
export type Icdu1nb48l753j = [Anonymize<I9o5v7cmfi9c85>, Binary, number, number];
export type I9o5v7cmfi9c85 = {
    "descriptor": Anonymize<Ic7r865c0luc3k>;
    "commitments_hash": FixedSizeBinary<32>;
};
export type Ic7r865c0luc3k = {
    "para_id": number;
    "relay_parent": FixedSizeBinary<32>;
    "collator": FixedSizeBinary<32>;
    "persisted_validation_data_hash": FixedSizeBinary<32>;
    "pov_hash": FixedSizeBinary<32>;
    "erasure_root": FixedSizeBinary<32>;
    "signature": FixedSizeBinary<64>;
    "para_head": FixedSizeBinary<32>;
    "validation_code_hash": FixedSizeBinary<32>;
};
export type I618m2uag0aopg = [Anonymize<I9o5v7cmfi9c85>, Binary, number];
export type Ic8i89mfkmn3n7 = {
    "from": number;
    "count": number;
};
export type ParachainsParasEvent = Enum<{
    /**
     *Current code has been updated for a Para. `para_id`
     */
    "CurrentCodeUpdated": number;
    /**
     *Current head has been updated for a Para. `para_id`
     */
    "CurrentHeadUpdated": number;
    /**
     *A code upgrade has been scheduled for a Para. `para_id`
     */
    "CodeUpgradeScheduled": number;
    /**
     *A new head has been noted for a Para. `para_id`
     */
    "NewHeadNoted": number;
    /**
     *A para has been queued to execute pending actions. `para_id`
     */
    "ActionQueued": Anonymize<I9jd27rnpm8ttv>;
    /**
     *The given para either initiated or subscribed to a PVF check for the given validation
     *code. `code_hash` `para_id`
     */
    "PvfCheckStarted": Anonymize<I4pact7n2e9a0i>;
    /**
     *The given validation code was accepted by the PVF pre-checking vote.
     *`code_hash` `para_id`
     */
    "PvfCheckAccepted": Anonymize<I4pact7n2e9a0i>;
    /**
     *The given validation code was rejected by the PVF pre-checking vote.
     *`code_hash` `para_id`
     */
    "PvfCheckRejected": Anonymize<I4pact7n2e9a0i>;
}>;
export declare const ParachainsParasEvent: GetEnum<ParachainsParasEvent>;
export type I4pact7n2e9a0i = [FixedSizeBinary<32>, number];
export type ParachainsHrmpEvent = Enum<{
    /**
     *Open HRMP channel requested.
     */
    "OpenChannelRequested": Anonymize<Id2bej717ckub0>;
    /**
     *An HRMP channel request sent by the receiver was canceled by either party.
     */
    "OpenChannelCanceled": Anonymize<I545vo2e86o5i4>;
    /**
     *Open HRMP channel accepted.
     */
    "OpenChannelAccepted": Anonymize<I50mrcbubp554e>;
    /**
     *HRMP channel closed.
     */
    "ChannelClosed": Anonymize<I545vo2e86o5i4>;
    /**
     *An HRMP channel was opened via Root origin.
     */
    "HrmpChannelForceOpened": Anonymize<Id2bej717ckub0>;
    /**
     *An HRMP channel was opened with a system chain.
     */
    "HrmpSystemChannelOpened": Anonymize<Id2bej717ckub0>;
    /**
     *An HRMP channel's deposits were updated.
     */
    "OpenChannelDepositsUpdated": Anonymize<I50mrcbubp554e>;
}>;
export declare const ParachainsHrmpEvent: GetEnum<ParachainsHrmpEvent>;
export type Id2bej717ckub0 = {
    "sender": number;
    "recipient": number;
    "proposed_max_capacity": number;
    "proposed_max_message_size": number;
};
export type I545vo2e86o5i4 = {
    "by_parachain": number;
    "channel_id": Anonymize<I50mrcbubp554e>;
};
export type I50mrcbubp554e = {
    "sender": number;
    "recipient": number;
};
export type ParachainsDisputesEvent = Enum<{
    /**
     *A dispute has been initiated. \[candidate hash, dispute location\]
     */
    "DisputeInitiated": Anonymize<I3i09nus3ku37s>;
    /**
     *A dispute has concluded for or against a candidate.
     *`\[para id, candidate hash, dispute result\]`
     */
    "DisputeConcluded": Anonymize<I2e447aa6a0imh>;
    /**
     *A dispute has concluded with supermajority against a candidate.
     *Block authors should no longer build on top of this head and should
     *instead revert the block at the given height. This should be the
     *number of the child of the last known valid block in the chain.
     */
    "Revert": number;
}>;
export declare const ParachainsDisputesEvent: GetEnum<ParachainsDisputesEvent>;
export type I3i09nus3ku37s = [FixedSizeBinary<32>, ParachainsDisputeLocation];
export type ParachainsDisputeLocation = Enum<{
    "Local": undefined;
    "Remote": undefined;
}>;
export declare const ParachainsDisputeLocation: GetEnum<ParachainsDisputeLocation>;
export type I2e447aa6a0imh = [FixedSizeBinary<32>, ParachainsDisputeResult];
export type ParachainsDisputeResult = Enum<{
    "Valid": undefined;
    "Invalid": undefined;
}>;
export declare const ParachainsDisputeResult: GetEnum<ParachainsDisputeResult>;
export type Icuu6jjue8o6eb = AnonymousEnum<{
    /**
     *An order was placed at some spot price amount by orderer ordered_by
     */
    "OnDemandOrderPlaced": Anonymize<I82n7gg49bvucn>;
    /**
     *The value of the spot price has likely changed
     */
    "SpotPriceSet": Anonymize<I58qkru548f7dl>;
}>;
export type I82n7gg49bvucn = {
    "para_id": number;
    "spot_price": bigint;
    "ordered_by": SS58String;
};
export type I58qkru548f7dl = {
    "spot_price": bigint;
};
export type CommonParasRegistrarEvent = Enum<{
    "Registered": Anonymize<Ibs22tt76qp5bi>;
    "Deregistered": Anonymize<I37r4bdai8o9mp>;
    "Reserved": Anonymize<Idn2ghub1o4i40>;
    "Swapped": Anonymize<I48u78djt89dod>;
}>;
export declare const CommonParasRegistrarEvent: GetEnum<CommonParasRegistrarEvent>;
export type Ibs22tt76qp5bi = {
    "para_id": number;
    "manager": SS58String;
};
export type I37r4bdai8o9mp = {
    "para_id": number;
};
export type Idn2ghub1o4i40 = {
    "para_id": number;
    "who": SS58String;
};
export type I48u78djt89dod = {
    "para_id": number;
    "other_id": number;
};
export type CommonSlotsEvent = Enum<{
    /**
     *A new `[lease_period]` is beginning.
     */
    "NewLeasePeriod": Anonymize<Ib85m5kfbepu2t>;
    /**
     *A para has won the right to a continuous set of lease periods as a parachain.
     *First balance is any extra amount reserved on top of the para's existing deposit.
     *Second balance is the total amount reserved.
     */
    "Leased": Anonymize<Idaml5bdhsfcsl>;
}>;
export declare const CommonSlotsEvent: GetEnum<CommonSlotsEvent>;
export type Ib85m5kfbepu2t = {
    "lease_period": number;
};
export type Idaml5bdhsfcsl = {
    "para_id": number;
    "leaser": SS58String;
    "period_begin": number;
    "period_count": number;
    "extra_reserved": bigint;
    "total_amount": bigint;
};
export type CommonAuctionsEvent = Enum<{
    /**
     *An auction started. Provides its index and the block number where it will begin to
     *close and the first lease period of the quadruplet that is auctioned.
     */
    "AuctionStarted": Anonymize<Ieec0cu336gteb>;
    /**
     *An auction ended. All funds become unreserved.
     */
    "AuctionClosed": Anonymize<I815d5k4ij85nv>;
    /**
     *Funds were reserved for a winning bid. First balance is the extra amount reserved.
     *Second is the total.
     */
    "Reserved": Anonymize<Ifi98fgi9o46v7>;
    /**
     *Funds were unreserved since bidder is no longer active. `[bidder, amount]`
     */
    "Unreserved": Anonymize<Ic0oj9tok33uap>;
    /**
     *Someone attempted to lease the same slot twice for a parachain. The amount is held in
     *reserve but no parachain slot has been leased.
     */
    "ReserveConfiscated": Anonymize<I3tdutpfjuk32j>;
    /**
     *A new bid has been accepted as the current winner.
     */
    "BidAccepted": Anonymize<I1esdujrkdacpb>;
    /**
     *The winning offset was chosen for an auction. This will map into the `Winning` storage
     *map.
     */
    "WinningOffset": Anonymize<I9g1d820jf9m2s>;
}>;
export declare const CommonAuctionsEvent: GetEnum<CommonAuctionsEvent>;
export type Ieec0cu336gteb = {
    "auction_index": number;
    "lease_period": number;
    "ending": number;
};
export type I815d5k4ij85nv = {
    "auction_index": number;
};
export type Ifi98fgi9o46v7 = {
    "bidder": SS58String;
    "extra_reserved": bigint;
    "total_amount": bigint;
};
export type Ic0oj9tok33uap = {
    "bidder": SS58String;
    "amount": bigint;
};
export type I3tdutpfjuk32j = {
    "para_id": number;
    "leaser": SS58String;
    "amount": bigint;
};
export type I1esdujrkdacpb = {
    "bidder": SS58String;
    "para_id": number;
    "amount": bigint;
    "first_slot": number;
    "last_slot": number;
};
export type I9g1d820jf9m2s = {
    "auction_index": number;
    "block_number": number;
};
export type I14ffo4b61a2g3 = AnonymousEnum<{
    /**
     *Create a new crowdloaning campaign.
     */
    "Created": Anonymize<I37r4bdai8o9mp>;
    /**
     *Contributed to a crowd sale.
     */
    "Contributed": Anonymize<I8ve4g3egaln6a>;
    /**
     *Withdrew full balance of a contributor.
     */
    "Withdrew": Anonymize<I8ve4g3egaln6a>;
    /**
     *The loans in a fund have been partially dissolved, i.e. there are some left
     *over child keys that still need to be killed.
     */
    "PartiallyRefunded": Anonymize<I37r4bdai8o9mp>;
    /**
     *All loans in a fund have been refunded.
     */
    "AllRefunded": Anonymize<I37r4bdai8o9mp>;
    /**
     *Fund is dissolved.
     */
    "Dissolved": Anonymize<I37r4bdai8o9mp>;
    /**
     *The result of trying to submit a new bid to the Slots pallet.
     */
    "HandleBidResult": Anonymize<Idbrt7si4i461v>;
    /**
     *The configuration to a crowdloan has been edited.
     */
    "Edited": Anonymize<I37r4bdai8o9mp>;
    /**
     *A memo has been updated.
     */
    "MemoUpdated": Anonymize<If4hvqaeoqq5us>;
    /**
     *A parachain has been moved to `NewRaise`
     */
    "AddedToNewRaise": Anonymize<I37r4bdai8o9mp>;
}>;
export type I8ve4g3egaln6a = {
    "who": SS58String;
    "fund_index": number;
    "amount": bigint;
};
export type Idbrt7si4i461v = {
    "para_id": number;
    "result": Anonymize<Icjq7kd1j70ubn>;
};
export type If4hvqaeoqq5us = {
    "who": SS58String;
    "para_id": number;
    "memo": Binary;
};
export type PolkadotRuntimeParachainsCoretimeEvent = Enum<{
    /**
     *The broker chain has asked for revenue information for a specific block.
     */
    "RevenueInfoRequested": Anonymize<Ibtsa3docbr9el>;
    /**
     *A core has received a new assignment from the broker chain.
     */
    "CoreAssigned": Anonymize<Iaiqv5prlisjkg>;
}>;
export declare const PolkadotRuntimeParachainsCoretimeEvent: GetEnum<PolkadotRuntimeParachainsCoretimeEvent>;
export type Ibtsa3docbr9el = {
    "when": number;
};
export type Iaiqv5prlisjkg = {
    "core": number;
};
export type I61dksvl51aujo = AnonymousEnum<{
    /**
     *Given number of `(top, child)` keys were migrated respectively, with the given
     *`compute`.
     */
    "Migrated": Anonymize<Iagqcb06kbevb1>;
    /**
     *Some account got slashed by the given amount.
     */
    "Slashed": Anonymize<Id5fm4p8lj5qgi>;
    /**
     *The auto migration task finished.
     */
    "AutoMigrationFinished": undefined;
    /**
     *Migration got halted due to an error or miss-configuration.
     */
    "Halted": Anonymize<Iec8defeh924b6>;
}>;
export type Iagqcb06kbevb1 = {
    "top": number;
    "child": number;
    "compute": Anonymize<I85ah77hcf4cpl>;
};
export type I85ah77hcf4cpl = AnonymousEnum<{
    "Signed": undefined;
    "Auto": undefined;
}>;
export type Iec8defeh924b6 = {
    "error": Anonymize<I96objte63brjr>;
};
export type I5ce1ru810vv9d = AnonymousEnum<{
    /**
     *Execution of an XCM message was attempted.
     */
    "Attempted": Anonymize<I2aatv5i0cb96a>;
    /**
     *A XCM message was sent.
     */
    "Sent": Anonymize<Ib9msr5sr8t3dn>;
    /**
     *Query response received which does not match a registered query. This may be because a
     *matching query was never registered, it may be because it is a duplicate response, or
     *because the query timed out.
     */
    "UnexpectedResponse": Anonymize<I3le5tr7ugg6l2>;
    /**
     *Query response has been received and is ready for taking with `take_response`. There is
     *no registered notification call.
     */
    "ResponseReady": Anonymize<I3iun9sig164po>;
    /**
     *Query response has been received and query is removed. The registered notification has
     *been dispatched and executed successfully.
     */
    "Notified": Anonymize<I2uqmls7kcdnii>;
    /**
     *Query response has been received and query is removed. The registered notification
     *could not be dispatched because the dispatch weight is greater than the maximum weight
     *originally budgeted by this runtime for the query result.
     */
    "NotifyOverweight": Anonymize<Idg69klialbkb8>;
    /**
     *Query response has been received and query is removed. There was a general error with
     *dispatching the notification call.
     */
    "NotifyDispatchError": Anonymize<I2uqmls7kcdnii>;
    /**
     *Query response has been received and query is removed. The dispatch was unable to be
     *decoded into a `Call`; this might be due to dispatch function having a signature which
     *is not `(origin, QueryId, Response)`.
     */
    "NotifyDecodeFailed": Anonymize<I2uqmls7kcdnii>;
    /**
     *Expected query response has been received but the origin location of the response does
     *not match that expected. The query remains registered for a later, valid, response to
     *be received and acted upon.
     */
    "InvalidResponder": Anonymize<I13jboebjcbglr>;
    /**
     *Expected query response has been received but the expected origin location placed in
     *storage by this runtime previously cannot be decoded. The query remains registered.
     *
     *This is unexpected (since a location placed in storage in a previously executing
     *runtime should be readable prior to query timeout) and dangerous since the possibly
     *valid response will be dropped. Manual governance intervention is probably going to be
     *needed.
     */
    "InvalidResponderVersion": Anonymize<I3le5tr7ugg6l2>;
    /**
     *Received query response has been read and removed.
     */
    "ResponseTaken": Anonymize<I30pg328m00nr3>;
    /**
     *Some assets have been placed in an asset trap.
     */
    "AssetsTrapped": Anonymize<I381dkhrurdhrs>;
    /**
     *An XCM version change notification message has been attempted to be sent.
     *
     *The cost of sending it (borne by the chain) is included.
     */
    "VersionChangeNotified": Anonymize<Ic8hi3qr11vngc>;
    /**
     *The supported version of a location has been changed. This might be through an
     *automatic notification or a manual intervention.
     */
    "SupportedVersionChanged": Anonymize<Iabk8ljl5g8c86>;
    /**
     *A given location which had a version change subscription was dropped owing to an error
     *sending the notification to it.
     */
    "NotifyTargetSendFail": Anonymize<Ibjdlecumfu7q7>;
    /**
     *A given location which had a version change subscription was dropped owing to an error
     *migrating the location to our new XCM format.
     */
    "NotifyTargetMigrationFail": Anonymize<Ia9ems1kg7laoc>;
    /**
     *Expected query response has been received but the expected querier location placed in
     *storage by this runtime previously cannot be decoded. The query remains registered.
     *
     *This is unexpected (since a location placed in storage in a previously executing
     *runtime should be readable prior to query timeout) and dangerous since the possibly
     *valid response will be dropped. Manual governance intervention is probably going to be
     *needed.
     */
    "InvalidQuerierVersion": Anonymize<I3le5tr7ugg6l2>;
    /**
     *Expected query response has been received but the querier location of the response does
     *not match the expected. The query remains registered for a later, valid, response to
     *be received and acted upon.
     */
    "InvalidQuerier": Anonymize<I92fq0fa45vi3>;
    /**
     *A remote has requested XCM version change notification from us and we have honored it.
     *A version information message is sent to them and its cost is included.
     */
    "VersionNotifyStarted": Anonymize<Id01dpp0dn2cj0>;
    /**
     *We have requested that a remote chain send us XCM version change notifications.
     */
    "VersionNotifyRequested": Anonymize<Id01dpp0dn2cj0>;
    /**
     *We have requested that a remote chain stops sending us XCM version change
     *notifications.
     */
    "VersionNotifyUnrequested": Anonymize<Id01dpp0dn2cj0>;
    /**
     *Fees were paid from a location for an operation (often for using `SendXcm`).
     */
    "FeesPaid": Anonymize<I6nu8k62ck9o8o>;
    /**
     *Some assets have been claimed from an asset trap
     */
    "AssetsClaimed": Anonymize<I381dkhrurdhrs>;
    /**
     *A XCM version migration finished.
     */
    "VersionMigrationFinished": Anonymize<I6s1nbislhk619>;
}>;
export type I2aatv5i0cb96a = {
    "outcome": XcmV4TraitsOutcome;
};
export type XcmV4TraitsOutcome = Enum<{
    "Complete": Anonymize<I30iff2d192eu7>;
    "Incomplete": Anonymize<I3q41clmllcihh>;
    "Error": Anonymize<I1n56hooghntl2>;
}>;
export declare const XcmV4TraitsOutcome: GetEnum<XcmV4TraitsOutcome>;
export type I30iff2d192eu7 = {
    "used": Anonymize<I4q39t5hn830vp>;
};
export type I3q41clmllcihh = {
    "used": Anonymize<I4q39t5hn830vp>;
    "error": XcmV3TraitsError;
};
export type XcmV3TraitsError = Enum<{
    "Overflow": undefined;
    "Unimplemented": undefined;
    "UntrustedReserveLocation": undefined;
    "UntrustedTeleportLocation": undefined;
    "LocationFull": undefined;
    "LocationNotInvertible": undefined;
    "BadOrigin": undefined;
    "InvalidLocation": undefined;
    "AssetNotFound": undefined;
    "FailedToTransactAsset": undefined;
    "NotWithdrawable": undefined;
    "LocationCannotHold": undefined;
    "ExceedsMaxMessageSize": undefined;
    "DestinationUnsupported": undefined;
    "Transport": undefined;
    "Unroutable": undefined;
    "UnknownClaim": undefined;
    "FailedToDecode": undefined;
    "MaxWeightInvalid": undefined;
    "NotHoldingFees": undefined;
    "TooExpensive": undefined;
    "Trap": bigint;
    "ExpectationFalse": undefined;
    "PalletNotFound": undefined;
    "NameMismatch": undefined;
    "VersionIncompatible": undefined;
    "HoldingWouldOverflow": undefined;
    "ExportError": undefined;
    "ReanchorFailed": undefined;
    "NoDeal": undefined;
    "FeesNotMet": undefined;
    "LockError": undefined;
    "NoPermission": undefined;
    "Unanchored": undefined;
    "NotDepositable": undefined;
    "UnhandledXcmVersion": undefined;
    "WeightLimitReached": Anonymize<I4q39t5hn830vp>;
    "Barrier": undefined;
    "WeightNotComputable": undefined;
    "ExceedsStackLimit": undefined;
}>;
export declare const XcmV3TraitsError: GetEnum<XcmV3TraitsError>;
export type I1n56hooghntl2 = {
    "error": XcmV3TraitsError;
};
export type Ib9msr5sr8t3dn = {
    "origin": Anonymize<I4c0s5cioidn76>;
    "destination": Anonymize<I4c0s5cioidn76>;
    "message": Anonymize<Iegrepoo0c1jc5>;
    "message_id": FixedSizeBinary<32>;
};
export type Iegrepoo0c1jc5 = Array<XcmV4Instruction>;
export type XcmV4Instruction = Enum<{
    "WithdrawAsset": Anonymize<I50mli3hb64f9b>;
    "ReserveAssetDeposited": Anonymize<I50mli3hb64f9b>;
    "ReceiveTeleportedAsset": Anonymize<I50mli3hb64f9b>;
    "QueryResponse": Anonymize<I9o9uda3nddbna>;
    "TransferAsset": Anonymize<I7s0ar727m8n1j>;
    "TransferReserveAsset": Anonymize<I5bepfv83t9cg7>;
    "Transact": Anonymize<I92p6l5cs3fr50>;
    "HrmpNewChannelOpenRequest": Anonymize<I5uhhrjqfuo4e5>;
    "HrmpChannelAccepted": Anonymize<Ifij4jam0o7sub>;
    "HrmpChannelClosing": Anonymize<Ieeb4svd9i8fji>;
    "ClearOrigin": undefined;
    "DescendOrigin": XcmV3Junctions;
    "ReportError": Anonymize<I4r3v6e91d1qbs>;
    "DepositAsset": Anonymize<Idbqvv6kvph2qq>;
    "DepositReserveAsset": Anonymize<I6epv2jfejmsps>;
    "ExchangeAsset": Anonymize<Ifunmnuvdqirrm>;
    "InitiateReserveWithdraw": Anonymize<Id1994sd13a1fk>;
    "InitiateTeleport": Anonymize<I6epv2jfejmsps>;
    "ReportHolding": Anonymize<I53nvbjei7ovcg>;
    "BuyExecution": Anonymize<I60dnk6pb13k6r>;
    "RefundSurplus": undefined;
    "SetErrorHandler": Anonymize<Iegrepoo0c1jc5>;
    "SetAppendix": Anonymize<Iegrepoo0c1jc5>;
    "ClearError": undefined;
    "ClaimAsset": Anonymize<I39e2979fh1sq0>;
    "Trap": bigint;
    "SubscribeVersion": Anonymize<Ieprdqqu7ildvr>;
    "UnsubscribeVersion": undefined;
    "BurnAsset": Anonymize<I50mli3hb64f9b>;
    "ExpectAsset": Anonymize<I50mli3hb64f9b>;
    "ExpectOrigin"?: Anonymize<Ia9cgf4r40b26h>;
    "ExpectError"?: Anonymize<I7sltvf8v2nure>;
    "ExpectTransactStatus": XcmV3MaybeErrorCode;
    "QueryPallet": Anonymize<Iba5bdbapp16oo>;
    "ExpectPallet": Anonymize<Id7mf37dkpgfjs>;
    "ReportTransactStatus": Anonymize<I4r3v6e91d1qbs>;
    "ClearTransactStatus": undefined;
    "UniversalOrigin": XcmV3Junction;
    "ExportMessage": Anonymize<Idjv4c30koq53t>;
    "LockAsset": Anonymize<Ic2kq28flu5j2f>;
    "UnlockAsset": Anonymize<I63d4j1l5gkla3>;
    "NoteUnlockable": Anonymize<Ibs79g4hs4qcqq>;
    "RequestUnlock": Anonymize<Ifv72gq013neli>;
    "SetFeesMode": Anonymize<I4nae9rsql8fa7>;
    "SetTopic": FixedSizeBinary<32>;
    "ClearTopic": undefined;
    "AliasOrigin": Anonymize<I4c0s5cioidn76>;
    "UnpaidExecution": Anonymize<I40d50jeai33oq>;
}>;
export declare const XcmV4Instruction: GetEnum<XcmV4Instruction>;
export type I50mli3hb64f9b = Array<Anonymize<Ia5l7mu5a6v49o>>;
export type Ia5l7mu5a6v49o = {
    "id": Anonymize<I4c0s5cioidn76>;
    "fun": XcmV3MultiassetFungibility;
};
export type XcmV3MultiassetFungibility = Enum<{
    "Fungible": bigint;
    "NonFungible": XcmV3MultiassetAssetInstance;
}>;
export declare const XcmV3MultiassetFungibility: GetEnum<XcmV3MultiassetFungibility>;
export type XcmV3MultiassetAssetInstance = Enum<{
    "Undefined": undefined;
    "Index": bigint;
    "Array4": FixedSizeBinary<4>;
    "Array8": FixedSizeBinary<8>;
    "Array16": FixedSizeBinary<16>;
    "Array32": FixedSizeBinary<32>;
}>;
export declare const XcmV3MultiassetAssetInstance: GetEnum<XcmV3MultiassetAssetInstance>;
export type I9o9uda3nddbna = {
    "query_id": bigint;
    "response": XcmV4Response;
    "max_weight": Anonymize<I4q39t5hn830vp>;
    "querier"?: Anonymize<Ia9cgf4r40b26h>;
};
export type XcmV4Response = Enum<{
    "Null": undefined;
    "Assets": Anonymize<I50mli3hb64f9b>;
    "ExecutionResult"?: Anonymize<I7sltvf8v2nure>;
    "Version": number;
    "PalletsInfo": Anonymize<I599u7h20b52at>;
    "DispatchResult": XcmV3MaybeErrorCode;
}>;
export declare const XcmV4Response: GetEnum<XcmV4Response>;
export type I7sltvf8v2nure = (Anonymize<Id8ide743umavp>) | undefined;
export type Id8ide743umavp = [number, XcmV3TraitsError];
export type I599u7h20b52at = Array<Anonymize<Ift5r9b1bvoh16>>;
export type Ift5r9b1bvoh16 = {
    "index": number;
    "name": Binary;
    "module_name": Binary;
    "major": number;
    "minor": number;
    "patch": number;
};
export type XcmV3MaybeErrorCode = Enum<{
    "Success": undefined;
    "Error": Binary;
    "TruncatedError": Binary;
}>;
export declare const XcmV3MaybeErrorCode: GetEnum<XcmV3MaybeErrorCode>;
export type Ia9cgf4r40b26h = (Anonymize<I4c0s5cioidn76>) | undefined;
export type I7s0ar727m8n1j = {
    "assets": Anonymize<I50mli3hb64f9b>;
    "beneficiary": Anonymize<I4c0s5cioidn76>;
};
export type I5bepfv83t9cg7 = {
    "assets": Anonymize<I50mli3hb64f9b>;
    "dest": Anonymize<I4c0s5cioidn76>;
    "xcm": Anonymize<Iegrepoo0c1jc5>;
};
export type I92p6l5cs3fr50 = {
    "origin_kind": XcmV2OriginKind;
    "require_weight_at_most": Anonymize<I4q39t5hn830vp>;
    "call": Binary;
};
export type XcmV2OriginKind = Enum<{
    "Native": undefined;
    "SovereignAccount": undefined;
    "Superuser": undefined;
    "Xcm": undefined;
}>;
export declare const XcmV2OriginKind: GetEnum<XcmV2OriginKind>;
export type I5uhhrjqfuo4e5 = {
    "sender": number;
    "max_message_size": number;
    "max_capacity": number;
};
export type Ifij4jam0o7sub = {
    "recipient": number;
};
export type Ieeb4svd9i8fji = {
    "initiator": number;
    "sender": number;
    "recipient": number;
};
export type I4r3v6e91d1qbs = {
    "destination": Anonymize<I4c0s5cioidn76>;
    "query_id": bigint;
    "max_weight": Anonymize<I4q39t5hn830vp>;
};
export type Idbqvv6kvph2qq = {
    "assets": XcmV4AssetAssetFilter;
    "beneficiary": Anonymize<I4c0s5cioidn76>;
};
export type XcmV4AssetAssetFilter = Enum<{
    "Definite": Anonymize<I50mli3hb64f9b>;
    "Wild": XcmV4AssetWildAsset;
}>;
export declare const XcmV4AssetAssetFilter: GetEnum<XcmV4AssetAssetFilter>;
export type XcmV4AssetWildAsset = Enum<{
    "All": undefined;
    "AllOf": Anonymize<I9k109i13ivgac>;
    "AllCounted": number;
    "AllOfCounted": Anonymize<Iano6fp1hcf6vu>;
}>;
export declare const XcmV4AssetWildAsset: GetEnum<XcmV4AssetWildAsset>;
export type I9k109i13ivgac = {
    "id": Anonymize<I4c0s5cioidn76>;
    "fun": XcmV2MultiassetWildFungibility;
};
export type XcmV2MultiassetWildFungibility = Enum<{
    "Fungible": undefined;
    "NonFungible": undefined;
}>;
export declare const XcmV2MultiassetWildFungibility: GetEnum<XcmV2MultiassetWildFungibility>;
export type Iano6fp1hcf6vu = {
    "id": Anonymize<I4c0s5cioidn76>;
    "fun": XcmV2MultiassetWildFungibility;
    "count": number;
};
export type I6epv2jfejmsps = {
    "assets": XcmV4AssetAssetFilter;
    "dest": Anonymize<I4c0s5cioidn76>;
    "xcm": Anonymize<Iegrepoo0c1jc5>;
};
export type Ifunmnuvdqirrm = {
    "give": XcmV4AssetAssetFilter;
    "want": Anonymize<I50mli3hb64f9b>;
    "maximal": boolean;
};
export type Id1994sd13a1fk = {
    "assets": XcmV4AssetAssetFilter;
    "reserve": Anonymize<I4c0s5cioidn76>;
    "xcm": Anonymize<Iegrepoo0c1jc5>;
};
export type I53nvbjei7ovcg = {
    "response_info": Anonymize<I4r3v6e91d1qbs>;
    "assets": XcmV4AssetAssetFilter;
};
export type I60dnk6pb13k6r = {
    "fees": Anonymize<Ia5l7mu5a6v49o>;
    "weight_limit": XcmV3WeightLimit;
};
export type XcmV3WeightLimit = Enum<{
    "Unlimited": undefined;
    "Limited": Anonymize<I4q39t5hn830vp>;
}>;
export declare const XcmV3WeightLimit: GetEnum<XcmV3WeightLimit>;
export type I39e2979fh1sq0 = {
    "assets": Anonymize<I50mli3hb64f9b>;
    "ticket": Anonymize<I4c0s5cioidn76>;
};
export type Ieprdqqu7ildvr = {
    "query_id": bigint;
    "max_response_weight": Anonymize<I4q39t5hn830vp>;
};
export type Iba5bdbapp16oo = {
    "module_name": Binary;
    "response_info": Anonymize<I4r3v6e91d1qbs>;
};
export type Id7mf37dkpgfjs = {
    "index": number;
    "name": Binary;
    "module_name": Binary;
    "crate_major": number;
    "min_crate_minor": number;
};
export type Idjv4c30koq53t = {
    "network": XcmV3JunctionNetworkId;
    "destination": XcmV3Junctions;
    "xcm": Anonymize<Iegrepoo0c1jc5>;
};
export type Ic2kq28flu5j2f = {
    "asset": Anonymize<Ia5l7mu5a6v49o>;
    "unlocker": Anonymize<I4c0s5cioidn76>;
};
export type I63d4j1l5gkla3 = {
    "asset": Anonymize<Ia5l7mu5a6v49o>;
    "target": Anonymize<I4c0s5cioidn76>;
};
export type Ibs79g4hs4qcqq = {
    "asset": Anonymize<Ia5l7mu5a6v49o>;
    "owner": Anonymize<I4c0s5cioidn76>;
};
export type Ifv72gq013neli = {
    "asset": Anonymize<Ia5l7mu5a6v49o>;
    "locker": Anonymize<I4c0s5cioidn76>;
};
export type I4nae9rsql8fa7 = {
    "jit_withdraw": boolean;
};
export type I40d50jeai33oq = {
    "weight_limit": XcmV3WeightLimit;
    "check_origin"?: Anonymize<Ia9cgf4r40b26h>;
};
export type I3le5tr7ugg6l2 = {
    "origin": Anonymize<I4c0s5cioidn76>;
    "query_id": bigint;
};
export type I3iun9sig164po = {
    "query_id": bigint;
    "response": XcmV4Response;
};
export type I2uqmls7kcdnii = {
    "query_id": bigint;
    "pallet_index": number;
    "call_index": number;
};
export type Idg69klialbkb8 = {
    "query_id": bigint;
    "pallet_index": number;
    "call_index": number;
    "actual_weight": Anonymize<I4q39t5hn830vp>;
    "max_budgeted_weight": Anonymize<I4q39t5hn830vp>;
};
export type I13jboebjcbglr = {
    "origin": Anonymize<I4c0s5cioidn76>;
    "query_id": bigint;
    "expected_location"?: Anonymize<Ia9cgf4r40b26h>;
};
export type I30pg328m00nr3 = {
    "query_id": bigint;
};
export type I381dkhrurdhrs = {
    "hash": FixedSizeBinary<32>;
    "origin": Anonymize<I4c0s5cioidn76>;
    "assets": DotXcmVersionedAssets;
};
export type DotXcmVersionedAssets = Enum<{
    "V2": Anonymize<I2sllmucln1iic>;
    "V3": Anonymize<Iai6dhqiq3bach>;
    "V4": Anonymize<I50mli3hb64f9b>;
}>;
export declare const DotXcmVersionedAssets: GetEnum<DotXcmVersionedAssets>;
export type I2sllmucln1iic = Array<Anonymize<Id8h647t880l31>>;
export type Id8h647t880l31 = {
    "id": XcmV2MultiassetAssetId;
    "fun": XcmV2MultiassetFungibility;
};
export type XcmV2MultiassetAssetId = Enum<{
    "Concrete": Anonymize<I4frqunb5hj2km>;
    "Abstract": Binary;
}>;
export declare const XcmV2MultiassetAssetId: GetEnum<XcmV2MultiassetAssetId>;
export type XcmV2MultiassetFungibility = Enum<{
    "Fungible": bigint;
    "NonFungible": XcmV2MultiassetAssetInstance;
}>;
export declare const XcmV2MultiassetFungibility: GetEnum<XcmV2MultiassetFungibility>;
export type XcmV2MultiassetAssetInstance = Enum<{
    "Undefined": undefined;
    "Index": bigint;
    "Array4": FixedSizeBinary<4>;
    "Array8": FixedSizeBinary<8>;
    "Array16": FixedSizeBinary<16>;
    "Array32": FixedSizeBinary<32>;
    "Blob": Binary;
}>;
export declare const XcmV2MultiassetAssetInstance: GetEnum<XcmV2MultiassetAssetInstance>;
export type Iai6dhqiq3bach = Array<Anonymize<Idcm24504c8bkk>>;
export type Idcm24504c8bkk = {
    "id": XcmV3MultiassetAssetId;
    "fun": XcmV3MultiassetFungibility;
};
export type Ic8hi3qr11vngc = {
    "destination": Anonymize<I4c0s5cioidn76>;
    "result": number;
    "cost": Anonymize<I50mli3hb64f9b>;
    "message_id": FixedSizeBinary<32>;
};
export type Iabk8ljl5g8c86 = {
    "location": Anonymize<I4c0s5cioidn76>;
    "version": number;
};
export type Ibjdlecumfu7q7 = {
    "location": Anonymize<I4c0s5cioidn76>;
    "query_id": bigint;
    "error": XcmV3TraitsError;
};
export type Ia9ems1kg7laoc = {
    "location": DotXcmVersionedLocation;
    "query_id": bigint;
};
export type I92fq0fa45vi3 = {
    "origin": Anonymize<I4c0s5cioidn76>;
    "query_id": bigint;
    "expected_querier": Anonymize<I4c0s5cioidn76>;
    "maybe_actual_querier"?: Anonymize<Ia9cgf4r40b26h>;
};
export type Id01dpp0dn2cj0 = {
    "destination": Anonymize<I4c0s5cioidn76>;
    "cost": Anonymize<I50mli3hb64f9b>;
    "message_id": FixedSizeBinary<32>;
};
export type I6nu8k62ck9o8o = {
    "paying": Anonymize<I4c0s5cioidn76>;
    "fees": Anonymize<I50mli3hb64f9b>;
};
export type I6s1nbislhk619 = {
    "version": number;
};
export type I13vul90391uuv = AnonymousEnum<{
    /**
     *Message discarded due to an error in the `MessageProcessor` (usually a format error).
     */
    "ProcessingFailed": Anonymize<I218fa3heih67o>;
    /**
     *Message is processed.
     */
    "Processed": Anonymize<I1tf93k54ltg1v>;
    /**
     *Message placed in overweight queue.
     */
    "OverweightEnqueued": Anonymize<I6ove5at7hfiur>;
    /**
     *This page was reaped.
     */
    "PageReaped": Anonymize<I9c0urppp07b8b>;
}>;
export type I218fa3heih67o = {
    /**
     *The `blake2_256` hash of the message.
     */
    "id": FixedSizeBinary<32>;
    /**
     *The queue of the message.
     */
    "origin": ParachainsInclusionAggregateMessageOrigin;
    /**
     *The error that occurred.
     *
     *This error is pretty opaque. More fine-grained errors need to be emitted as events
     *by the `MessageProcessor`.
     */
    "error": Anonymize<I5hhsj7l9obr84>;
};
export type ParachainsInclusionAggregateMessageOrigin = Enum<{
    "Ump": ParachainsInclusionUmpQueueId;
}>;
export declare const ParachainsInclusionAggregateMessageOrigin: GetEnum<ParachainsInclusionAggregateMessageOrigin>;
export type ParachainsInclusionUmpQueueId = Enum<{
    "Para": number;
}>;
export declare const ParachainsInclusionUmpQueueId: GetEnum<ParachainsInclusionUmpQueueId>;
export type I5hhsj7l9obr84 = AnonymousEnum<{
    "BadFormat": undefined;
    "Corrupt": undefined;
    "Unsupported": undefined;
    "Overweight": Anonymize<I4q39t5hn830vp>;
    "Yield": undefined;
    "StackLimitReached": undefined;
}>;
export type I1tf93k54ltg1v = {
    /**
     *The `blake2_256` hash of the message.
     */
    "id": FixedSizeBinary<32>;
    /**
     *The queue of the message.
     */
    "origin": ParachainsInclusionAggregateMessageOrigin;
    /**
     *How much weight was used to process the message.
     */
    "weight_used": Anonymize<I4q39t5hn830vp>;
    /**
     *Whether the message was processed.
     *
     *Note that this does not mean that the underlying `MessageProcessor` was internally
     *successful. It *solely* means that the MQ pallet will treat this as a success
     *condition and discard the message. Any internal error needs to be emitted as events
     *by the `MessageProcessor`.
     */
    "success": boolean;
};
export type I6ove5at7hfiur = {
    /**
     *The `blake2_256` hash of the message.
     */
    "id": FixedSizeBinary<32>;
    /**
     *The queue of the message.
     */
    "origin": ParachainsInclusionAggregateMessageOrigin;
    /**
     *The page of the message.
     */
    "page_index": number;
    /**
     *The index of the message within the page.
     */
    "message_index": number;
};
export type I9c0urppp07b8b = {
    /**
     *The queue of the page.
     */
    "origin": ParachainsInclusionAggregateMessageOrigin;
    /**
     *The index of the page.
     */
    "index": number;
};
export type AssetRateEvent = Enum<{
    "AssetRateCreated": Anonymize<I6nmp4rhqla35>;
    "AssetRateRemoved": Anonymize<I8ndstn7sf4kek>;
    "AssetRateUpdated": Anonymize<I1a3ecmnlnvr59>;
}>;
export declare const AssetRateEvent: GetEnum<AssetRateEvent>;
export type I6nmp4rhqla35 = {
    "asset_kind": VersionedLocatableAsset;
    "rate": bigint;
};
export type I8ndstn7sf4kek = {
    "asset_kind": VersionedLocatableAsset;
};
export type I1a3ecmnlnvr59 = {
    "asset_kind": VersionedLocatableAsset;
    "old": bigint;
    "new": bigint;
};
export type Ic5m5lp1oioo8r = Array<FixedSizeBinary<32>>;
export type I95g6i7ilua7lq = Array<Anonymize<I9jd27rnpm8ttv>>;
export type Ieniouoqkq4icf = {
    "spec_version": number;
    "spec_name": string;
};
export type I9tv51sgspensk = Array<Anonymize<I6d8rsn8f949na>>;
export type I6d8rsn8f949na = (Anonymize<I2pi981kdgomb3>) | undefined;
export type I2pi981kdgomb3 = {
    "maybe_id"?: Anonymize<I4s6vifaf8k998>;
    "priority": number;
    "call": PreimagesBounded;
    "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
    "origin": PolkadotRuntimeOriginCaller;
};
export type Iep7au1720bm0e = (Anonymize<I9jd27rnpm8ttv>) | undefined;
export type PolkadotRuntimeOriginCaller = Enum<{
    "system": DispatchRawOrigin;
    "Origins": GovernanceOrigin;
    "ParachainsOrigin": ParachainsOrigin;
    "XcmPallet": XcmPalletOrigin;
    "Void": undefined;
}>;
export declare const PolkadotRuntimeOriginCaller: GetEnum<PolkadotRuntimeOriginCaller>;
export type DispatchRawOrigin = Enum<{
    "Root": undefined;
    "Signed": SS58String;
    "None": undefined;
}>;
export declare const DispatchRawOrigin: GetEnum<DispatchRawOrigin>;
export type GovernanceOrigin = Enum<{
    "StakingAdmin": undefined;
    "Treasurer": undefined;
    "FellowshipAdmin": undefined;
    "GeneralAdmin": undefined;
    "AuctionAdmin": undefined;
    "LeaseAdmin": undefined;
    "ReferendumCanceller": undefined;
    "ReferendumKiller": undefined;
    "SmallTipper": undefined;
    "BigTipper": undefined;
    "SmallSpender": undefined;
    "MediumSpender": undefined;
    "BigSpender": undefined;
    "WhitelistedCaller": undefined;
    "WishForChange": undefined;
}>;
export declare const GovernanceOrigin: GetEnum<GovernanceOrigin>;
export type ParachainsOrigin = Enum<{
    "Parachain": number;
}>;
export declare const ParachainsOrigin: GetEnum<ParachainsOrigin>;
export type XcmPalletOrigin = Enum<{
    "Xcm": Anonymize<I4c0s5cioidn76>;
    "Response": Anonymize<I4c0s5cioidn76>;
}>;
export declare const XcmPalletOrigin: GetEnum<XcmPalletOrigin>;
export type I56u24ncejr5kt = {
    "total_retries": number;
    "remaining": number;
    "period": number;
};
export type PreimageOldRequestStatus = Enum<{
    "Unrequested": Anonymize<I5jej6bvdjrisr>;
    "Requested": Anonymize<Is7sg1rr9u2nm>;
}>;
export declare const PreimageOldRequestStatus: GetEnum<PreimageOldRequestStatus>;
export type I5jej6bvdjrisr = {
    "deposit": Anonymize<I95l2k9b1re95f>;
    "len": number;
};
export type I95l2k9b1re95f = [SS58String, bigint];
export type Is7sg1rr9u2nm = {
    "deposit"?: Anonymize<I92hdo1clkbp4g>;
    "count": number;
    "len"?: Anonymize<I4arjljr6dpflb>;
};
export type I92hdo1clkbp4g = (Anonymize<I95l2k9b1re95f>) | undefined;
export type I4arjljr6dpflb = (number) | undefined;
export type PreimageRequestStatus = Enum<{
    "Unrequested": Anonymize<Idvcv8961o32th>;
    "Requested": Anonymize<In82i9avte5re>;
}>;
export declare const PreimageRequestStatus: GetEnum<PreimageRequestStatus>;
export type Idvcv8961o32th = {
    "ticket": Anonymize<I95l2k9b1re95f>;
    "len": number;
};
export type In82i9avte5re = {
    "maybe_ticket"?: Anonymize<I92hdo1clkbp4g>;
    "count": number;
    "maybe_len"?: Anonymize<I4arjljr6dpflb>;
};
export type BabeDigestsNextConfigDescriptor = Enum<{
    "V1": Anonymize<I8jnd4d8ip6djo>;
}>;
export declare const BabeDigestsNextConfigDescriptor: GetEnum<BabeDigestsNextConfigDescriptor>;
export type I8jnd4d8ip6djo = {
    "c": Anonymize<I200n1ov5tbcvr>;
    "allowed_slots": BabeAllowedSlots;
};
export type I200n1ov5tbcvr = FixedSizeArray<2, bigint>;
export type BabeAllowedSlots = Enum<{
    "PrimarySlots": undefined;
    "PrimaryAndSecondaryPlainSlots": undefined;
    "PrimaryAndSecondaryVRFSlots": undefined;
}>;
export declare const BabeAllowedSlots: GetEnum<BabeAllowedSlots>;
export type Idq7or56ds2f13 = (BabeDigestsPreDigest) | undefined;
export type BabeDigestsPreDigest = Enum<{
    "Primary": Anonymize<Ien29ooge6hr9e>;
    "SecondaryPlain": Anonymize<Ieiaevc5q41ard>;
    "SecondaryVRF": Anonymize<Ien29ooge6hr9e>;
}>;
export declare const BabeDigestsPreDigest: GetEnum<BabeDigestsPreDigest>;
export type Ien29ooge6hr9e = {
    "authority_index": number;
    "slot": bigint;
    "vrf_signature": Anonymize<Ib066efvl8g6ok>;
};
export type Ib066efvl8g6ok = {
    "pre_output": FixedSizeBinary<32>;
    "proof": FixedSizeBinary<64>;
};
export type Ieiaevc5q41ard = {
    "authority_index": number;
    "slot": bigint;
};
export type Ifip05kcrl65am = Array<Anonymize<I6cs1itejju2vv>>;
export type I6cs1itejju2vv = [bigint, number];
export type Iff9heri56m1mb = [SS58String, bigint, boolean];
export type I8ds64oj6581v0 = Array<Anonymize<Ifd60g9ld04ljn>>;
export type Ifd60g9ld04ljn = {
    "id": FixedSizeBinary<8>;
    "amount": bigint;
    "reasons": BalancesTypesReasons;
};
export type BalancesTypesReasons = Enum<{
    "Fee": undefined;
    "Misc": undefined;
    "All": undefined;
}>;
export declare const BalancesTypesReasons: GetEnum<BalancesTypesReasons>;
export type Ia7pdug7cdsg8g = Array<Anonymize<I1basc5up2fk73>>;
export type I1basc5up2fk73 = {
    "id": FixedSizeBinary<8>;
    "amount": bigint;
};
export type I3oiqtmlj7klbr = Array<Anonymize<Ifde25j06ecor0>>;
export type Ifde25j06ecor0 = {
    "id": Anonymize<I8qhoqaff9bl1a>;
    "amount": bigint;
};
export type I8qhoqaff9bl1a = AnonymousEnum<{
    "Preimage": PreimagePalletHoldReason;
    "StateTrieMigration": Anonymize<I7lf1val3vmpq0>;
}>;
export type PreimagePalletHoldReason = Enum<{
    "Preimage": undefined;
}>;
export declare const PreimagePalletHoldReason: GetEnum<PreimagePalletHoldReason>;
export type I7lf1val3vmpq0 = AnonymousEnum<{
    "SlashForMigrate": undefined;
}>;
export type I2l1ctuihi2mfd = Array<Anonymize<I55k5ohoio0bvr>>;
export type I55k5ohoio0bvr = {
    "id": WestendRuntimeRuntimeFreezeReason;
    "amount": bigint;
};
export type WestendRuntimeRuntimeFreezeReason = Enum<{
    "NominationPools": NominationPoolsPalletFreezeReason;
}>;
export declare const WestendRuntimeRuntimeFreezeReason: GetEnum<WestendRuntimeRuntimeFreezeReason>;
export type NominationPoolsPalletFreezeReason = Enum<{
    "PoolMinBalance": undefined;
}>;
export declare const NominationPoolsPalletFreezeReason: GetEnum<NominationPoolsPalletFreezeReason>;
export type TransactionPaymentReleases = Enum<{
    "V1Ancient": undefined;
    "V2": undefined;
}>;
export declare const TransactionPaymentReleases: GetEnum<TransactionPaymentReleases>;
export type Ia2lhg7l2hilo3 = Array<SS58String>;
export type Ic12aht5vh2sen = {
    "stash": SS58String;
    "total": bigint;
    "active": bigint;
    "unlocking": Anonymize<I9nc4v1upo2c8e>;
    "legacy_claimed_rewards": Anonymize<Icgljjb6j82uhn>;
};
export type I9nc4v1upo2c8e = Array<Anonymize<I3niuuk38q4krr>>;
export type I3niuuk38q4krr = {
    "value": bigint;
    "era": number;
};
export type Ic3m9d6tdl6gi2 = {
    "targets": Anonymize<Ia2lhg7l2hilo3>;
    "submitted_in": number;
    "suppressed": boolean;
};
export type Ib3j7gb0jgs38u = {
    "index": number;
    "start"?: Anonymize<I35p85j063s0il>;
};
export type I35p85j063s0il = (bigint) | undefined;
export type Ifekshcrgkl12g = {
    "total": bigint;
    "own": bigint;
    "others": Anonymize<I252o97fo263q7>;
};
export type I252o97fo263q7 = Array<Anonymize<I91eao91fmce8>>;
export type I91eao91fmce8 = {
    "who": SS58String;
    "value": bigint;
};
export type I6flrronqs3l6n = {
    "total": bigint;
    "own": bigint;
    "nominator_count": number;
    "page_count": number;
};
export type I97fulj5h3ik95 = {
    "page_total": bigint;
    "others": Anonymize<I252o97fo263q7>;
};
export type Ia8896dq44k9m4 = [number, SS58String, number];
export type Iff9p3c7k6pfoi = {
    "total": number;
    "individual": Anonymize<I205qrookusi3d>;
};
export type I205qrookusi3d = Array<Anonymize<I6ouflveob4eli>>;
export type I6ouflveob4eli = [SS58String, number];
export type Iafq6t4rgheait = Array<Anonymize<Ifedledo2fog34>>;
export type Ifedledo2fog34 = {
    "validator": SS58String;
    "own": bigint;
    "others": Anonymize<Iba9inugg1atvo>;
    "reporters": Anonymize<Ia2lhg7l2hilo3>;
    "payout": bigint;
};
export type Iba9inugg1atvo = Array<Anonymize<I95l2k9b1re95f>>;
export type I4ojmnsk1dchql = [number, bigint];
export type Iinkhfdlka9ch = {
    "span_index": number;
    "last_start": number;
    "last_nonzero_slash": number;
    "prior": Anonymize<Icgljjb6j82uhn>;
};
export type I2kj4j6mp68hf8 = {
    "slashed": bigint;
    "paid_out": bigint;
};
export type I2bqvqrg0sbrdj = {
    "offender": Anonymize<Idi27pva6ajg4>;
    "reporters": Anonymize<Ia2lhg7l2hilo3>;
};
export type Idi27pva6ajg4 = [SS58String, Anonymize<Ifekshcrgkl12g>];
export type I23nq3fsgtejt = [FixedSizeBinary<16>, Binary];
export type Idt624nf41g34e = Array<Anonymize<I4v3ibe4dqslio>>;
export type I4v3ibe4dqslio = [SS58String, Anonymize<I9kr8cseidc66h>];
export type I9kr8cseidc66h = {
    "grandpa": FixedSizeBinary<32>;
    "babe": FixedSizeBinary<32>;
    "para_validator": FixedSizeBinary<32>;
    "para_assignment": FixedSizeBinary<32>;
    "authority_discovery": FixedSizeBinary<32>;
    "beefy": FixedSizeBinary<33>;
};
export type GrandpaStoredState = Enum<{
    "Live": undefined;
    "PendingPause": Anonymize<Ib95oqfalvjqfe>;
    "Paused": undefined;
    "PendingResume": Anonymize<Ib95oqfalvjqfe>;
}>;
export declare const GrandpaStoredState: GetEnum<GrandpaStoredState>;
export type Ib95oqfalvjqfe = {
    "scheduled_at": number;
    "delay": number;
};
export type I7pe2me3i3vtn9 = {
    "scheduled_at": number;
    "delay": number;
    "next_authorities": Anonymize<I3geksg000c171>;
    "forced"?: Anonymize<I4arjljr6dpflb>;
};
export type Iegmj7n48sc3am = {
    "proposer": SS58String;
    "value": bigint;
    "beneficiary": SS58String;
    "bond": bigint;
};
export type I5v9a2mdqq4t8u = {
    "asset_kind": VersionedLocatableAsset;
    "amount": bigint;
    "beneficiary": DotXcmVersionedLocation;
    "valid_from": number;
    "expire_at": number;
    "status": TreasuryPaymentState;
};
export type TreasuryPaymentState = Enum<{
    "Pending": undefined;
    "Attempted": Anonymize<I4ov6e94l79mbg>;
    "Failed": undefined;
}>;
export declare const TreasuryPaymentState: GetEnum<TreasuryPaymentState>;
export type I4ov6e94l79mbg = {
    "id": bigint;
};
export type ConvictionVotingVoteVoting = Enum<{
    "Casting": Anonymize<If52hjr5c5nrc5>;
    "Delegating": Anonymize<I251o9sbu5566f>;
}>;
export declare const ConvictionVotingVoteVoting: GetEnum<ConvictionVotingVoteVoting>;
export type If52hjr5c5nrc5 = {
    "votes": Anonymize<I42jj1su7asrm9>;
    "delegations": Anonymize<I538qha8r4j3ii>;
    "prior": Anonymize<I4ojmnsk1dchql>;
};
export type I42jj1su7asrm9 = Array<Anonymize<I7mk5ivue8lr2m>>;
export type I7mk5ivue8lr2m = [number, ConvictionVotingVoteAccountVote];
export type ConvictionVotingVoteAccountVote = Enum<{
    "Standard": Anonymize<Ib024p97ls1cla>;
    "Split": Anonymize<I5pi71t9bosoiv>;
    "SplitAbstain": Anonymize<I89irppcaqmf1i>;
}>;
export declare const ConvictionVotingVoteAccountVote: GetEnum<ConvictionVotingVoteAccountVote>;
export type Ib024p97ls1cla = {
    "vote": number;
    "balance": bigint;
};
export type I5pi71t9bosoiv = {
    "aye": bigint;
    "nay": bigint;
};
export type I89irppcaqmf1i = {
    "aye": bigint;
    "nay": bigint;
    "abstain": bigint;
};
export type I538qha8r4j3ii = {
    "votes": bigint;
    "capital": bigint;
};
export type I251o9sbu5566f = {
    "balance": bigint;
    "target": SS58String;
    "conviction": VotingConviction;
    "delegations": Anonymize<I538qha8r4j3ii>;
    "prior": Anonymize<I4ojmnsk1dchql>;
};
export type VotingConviction = Enum<{
    "None": undefined;
    "Locked1x": undefined;
    "Locked2x": undefined;
    "Locked3x": undefined;
    "Locked4x": undefined;
    "Locked5x": undefined;
    "Locked6x": undefined;
}>;
export declare const VotingConviction: GetEnum<VotingConviction>;
export type If9jidduiuq7vv = Array<Anonymize<I4ojmnsk1dchql>>;
export type Idu11e295qqjep = AnonymousEnum<{
    "Ongoing": Anonymize<I2i3mpciskqofd>;
    "Approved": Anonymize<Ini94eljn5lj8>;
    "Rejected": Anonymize<Ini94eljn5lj8>;
    "Cancelled": Anonymize<Ini94eljn5lj8>;
    "TimedOut": Anonymize<Ini94eljn5lj8>;
    "Killed": number;
}>;
export type I2i3mpciskqofd = {
    "track": number;
    "origin": PolkadotRuntimeOriginCaller;
    "proposal": PreimagesBounded;
    "enactment": TraitsScheduleDispatchTime;
    "submitted": number;
    "submission_deposit": Anonymize<Id5fm4p8lj5qgi>;
    "decision_deposit"?: Anonymize<Ibd24caul84kv2>;
    "deciding"?: Anonymize<Ibcbcndfmk0jd9>;
    "tally": Anonymize<Ifsk7cbmtit1jd>;
    "in_queue": boolean;
    "alarm"?: Anonymize<I3aj03qk2o5mdm>;
};
export type TraitsScheduleDispatchTime = Enum<{
    "At": number;
    "After": number;
}>;
export declare const TraitsScheduleDispatchTime: GetEnum<TraitsScheduleDispatchTime>;
export type Ibd24caul84kv2 = (Anonymize<Id5fm4p8lj5qgi>) | undefined;
export type Ibcbcndfmk0jd9 = (Anonymize<I4a0pk3ivg0trh>) | undefined;
export type I4a0pk3ivg0trh = {
    "since": number;
    "confirming"?: Anonymize<I4arjljr6dpflb>;
};
export type I3aj03qk2o5mdm = (Anonymize<I3pjs7v78ujbii>) | undefined;
export type I3pjs7v78ujbii = [number, Anonymize<I9jd27rnpm8ttv>];
export type Ini94eljn5lj8 = [number, Anonymize<Ibd24caul84kv2>, Anonymize<Ibd24caul84kv2>];
export type I2phecamkn3pej = [bigint, bigint, number];
export type ClaimsStatementKind = Enum<{
    "Regular": undefined;
    "Saft": undefined;
}>;
export declare const ClaimsStatementKind: GetEnum<ClaimsStatementKind>;
export type Ifble4juuml5ig = Array<Anonymize<I4aro1m78pdrtt>>;
export type I4aro1m78pdrtt = {
    "locked": bigint;
    "per_block": bigint;
    "starting_block": number;
};
export type Version = Enum<{
    "V0": undefined;
    "V1": undefined;
}>;
export declare const Version: GetEnum<Version>;
export type I6piac7omi5lpd = [Anonymize<I62povnsc7ttie>, bigint];
export type I62povnsc7ttie = Array<Anonymize<Iedi7gevl4j19n>>;
export type Iedi7gevl4j19n = {
    "delegate": SS58String;
    "proxy_type": Anonymize<Ib9ifr8gu9ttks>;
    "delay": number;
};
export type I9p9lq3rej5bhc = [Anonymize<Ie1hjkhaoshr67>, bigint];
export type Ie1hjkhaoshr67 = Array<Anonymize<I70eqajm9p2sc5>>;
export type I70eqajm9p2sc5 = {
    "real": SS58String;
    "call_hash": FixedSizeBinary<32>;
    "height": number;
};
export type Iag146hmjgqfgj = {
    "when": Anonymize<Itvprrpb0nm3o>;
    "deposit": bigint;
    "depositor": SS58String;
    "approvals": Anonymize<Ia2lhg7l2hilo3>;
};
export type I8uo3fpd3bcc6f = [SS58String, FixedSizeBinary<32>];
export type I8phqps8r3of7e = {
    "proposer": SS58String;
    "value": bigint;
    "fee": bigint;
    "curator_deposit": bigint;
    "bond": bigint;
    "status": BountiesBountyStatus;
};
export type BountiesBountyStatus = Enum<{
    "Proposed": undefined;
    "Approved": undefined;
    "Funded": undefined;
    "CuratorProposed": Anonymize<I846573mdj1pfn>;
    "Active": Anonymize<I5s3sqq6r9nt63>;
    "PendingPayout": Anonymize<I4aulgjqrdphrm>;
}>;
export declare const BountiesBountyStatus: GetEnum<BountiesBountyStatus>;
export type I846573mdj1pfn = {
    "curator": SS58String;
};
export type I5s3sqq6r9nt63 = {
    "curator": SS58String;
    "update_due": number;
};
export type I4aulgjqrdphrm = {
    "curator": SS58String;
    "beneficiary": SS58String;
    "unlock_at": number;
};
export type Ibofbvvaehln4e = {
    "parent_bounty": number;
    "value": bigint;
    "fee": bigint;
    "curator_deposit": bigint;
    "status": ChildBountyStatus;
};
export type ChildBountyStatus = Enum<{
    "Added": undefined;
    "CuratorProposed": Anonymize<I846573mdj1pfn>;
    "Active": Anonymize<I846573mdj1pfn>;
    "PendingPayout": Anonymize<I4aulgjqrdphrm>;
}>;
export declare const ChildBountyStatus: GetEnum<ChildBountyStatus>;
export type Ictkaqdbfabuek = {
    "supports": Anonymize<I4bboqsv44evel>;
    "score": Anonymize<I8s6n43okuj2b1>;
    "compute": ElectionProviderMultiPhaseElectionCompute;
};
export type I4bboqsv44evel = Array<Anonymize<Ib5vlbiqndekn9>>;
export type Ib5vlbiqndekn9 = [SS58String, Anonymize<I7qb1luldf1jtf>];
export type I7qb1luldf1jtf = {
    "total": bigint;
    "voters": Anonymize<Iba9inugg1atvo>;
};
export type Ia7o65280hur3p = {
    "voters": Anonymize<I9cpogojpnsq8h>;
    "targets": Anonymize<Ia2lhg7l2hilo3>;
};
export type I9cpogojpnsq8h = Array<Anonymize<I6dvmrbp80vk5k>>;
export type I6dvmrbp80vk5k = [SS58String, bigint, Anonymize<Ia2lhg7l2hilo3>];
export type Iasd2iat48n080 = {
    "voters": number;
    "targets": number;
};
export type Ic8d01sg6acf60 = Array<Anonymize<Ie663uperueqm5>>;
export type Ie663uperueqm5 = [Anonymize<I8s6n43okuj2b1>, number, number];
export type Irl37q7erstrb = {
    "who": SS58String;
    "deposit": bigint;
    "raw_solution": Anonymize<I7je4n92ump862>;
    "call_fee": bigint;
};
export type I7je4n92ump862 = {
    "solution": Anonymize<I1nvcsqg39g26j>;
    "score": Anonymize<I8s6n43okuj2b1>;
    "round": number;
};
export type I1nvcsqg39g26j = {
    "votes1": Anonymize<Iep4uo61810hfs>;
    "votes2": Anonymize<Ickjq69hlul8c3>;
    "votes3": Anonymize<Icf645ln9bi1bj>;
    "votes4": Anonymize<I8nospv7k5s457>;
    "votes5": Anonymize<Iig9pofg77rah>;
    "votes6": Anonymize<Irttjt9tghoc0>;
    "votes7": Anonymize<I3o5epjr2va0dl>;
    "votes8": Anonymize<I1gfnebceebqb5>;
    "votes9": Anonymize<Ibo38fh2dhj4it>;
    "votes10": Anonymize<Id4gvspmdh8h9l>;
    "votes11": Anonymize<I5be3ho5m1r68a>;
    "votes12": Anonymize<I7s2sh7cpuv56r>;
    "votes13": Anonymize<I5fq8855gfhmlo>;
    "votes14": Anonymize<I4mvok713k4g7o>;
    "votes15": Anonymize<I90tu9lmjmhfhd>;
    "votes16": Anonymize<I3cqaev9m4hn9m>;
};
export type Iep4uo61810hfs = Array<Anonymize<I5g2vv0ckl2m8b>>;
export type I5g2vv0ckl2m8b = [number, number];
export type Ickjq69hlul8c3 = Array<Anonymize<I4l2a0q04ni20o>>;
export type I4l2a0q04ni20o = [number, Anonymize<I5g2vv0ckl2m8b>, number];
export type Icf645ln9bi1bj = Array<Anonymize<Iamqg950vpqsp8>>;
export type Iamqg950vpqsp8 = [number, Anonymize<Iffarf0mj066h7>, number];
export type Iffarf0mj066h7 = FixedSizeArray<2, Anonymize<I5g2vv0ckl2m8b>>;
export type I8nospv7k5s457 = Array<Anonymize<Ifr1o6ri1uf2of>>;
export type Ifr1o6ri1uf2of = [number, Anonymize<I33ipki9g5n04l>, number];
export type I33ipki9g5n04l = FixedSizeArray<3, Anonymize<I5g2vv0ckl2m8b>>;
export type Iig9pofg77rah = Array<Anonymize<I4gus921fjj8lq>>;
export type I4gus921fjj8lq = [number, Anonymize<If6gr8nt3vreg9>, number];
export type If6gr8nt3vreg9 = FixedSizeArray<4, Anonymize<I5g2vv0ckl2m8b>>;
export type Irttjt9tghoc0 = Array<Anonymize<I9h1lfefrjrss8>>;
export type I9h1lfefrjrss8 = [number, Anonymize<I8kcfo1iikpfd7>, number];
export type I8kcfo1iikpfd7 = FixedSizeArray<5, Anonymize<I5g2vv0ckl2m8b>>;
export type I3o5epjr2va0dl = Array<Anonymize<I85q51vkapcmho>>;
export type I85q51vkapcmho = [number, Anonymize<I829dlpp8f7vhg>, number];
export type I829dlpp8f7vhg = FixedSizeArray<6, Anonymize<I5g2vv0ckl2m8b>>;
export type I1gfnebceebqb5 = Array<Anonymize<I9kgeuvub0nepg>>;
export type I9kgeuvub0nepg = [number, Anonymize<Ie65d4ts6gb5rk>, number];
export type Ie65d4ts6gb5rk = FixedSizeArray<7, Anonymize<I5g2vv0ckl2m8b>>;
export type Ibo38fh2dhj4it = Array<Anonymize<Ipcskss5flcis>>;
export type Ipcskss5flcis = [number, Anonymize<I45nria0sqoino>, number];
export type I45nria0sqoino = FixedSizeArray<8, Anonymize<I5g2vv0ckl2m8b>>;
export type Id4gvspmdh8h9l = Array<Anonymize<Ifdgh79k56960e>>;
export type Ifdgh79k56960e = [number, Anonymize<Ie8fi1901h656e>, number];
export type Ie8fi1901h656e = FixedSizeArray<9, Anonymize<I5g2vv0ckl2m8b>>;
export type I5be3ho5m1r68a = Array<Anonymize<I5n2npru4pt8nc>>;
export type I5n2npru4pt8nc = [number, Anonymize<I1ap4gedi13j9r>, number];
export type I1ap4gedi13j9r = FixedSizeArray<10, Anonymize<I5g2vv0ckl2m8b>>;
export type I7s2sh7cpuv56r = Array<Anonymize<I2udmq2v26rio>>;
export type I2udmq2v26rio = [number, Anonymize<I5vtd36r5b6fss>, number];
export type I5vtd36r5b6fss = FixedSizeArray<11, Anonymize<I5g2vv0ckl2m8b>>;
export type I5fq8855gfhmlo = Array<Anonymize<Id2nvrmi6cagga>>;
export type Id2nvrmi6cagga = [number, Anonymize<Iee99h3pht9j20>, number];
export type Iee99h3pht9j20 = FixedSizeArray<12, Anonymize<I5g2vv0ckl2m8b>>;
export type I4mvok713k4g7o = Array<Anonymize<I2ajtdvlncoqrd>>;
export type I2ajtdvlncoqrd = [number, Anonymize<I3lmls9cse1mcr>, number];
export type I3lmls9cse1mcr = FixedSizeArray<13, Anonymize<I5g2vv0ckl2m8b>>;
export type I90tu9lmjmhfhd = Array<Anonymize<Ifn0i2gsu8pkck>>;
export type Ifn0i2gsu8pkck = [number, Anonymize<Ia1o13i3p2r7gm>, number];
export type Ia1o13i3p2r7gm = FixedSizeArray<14, Anonymize<I5g2vv0ckl2m8b>>;
export type I3cqaev9m4hn9m = Array<Anonymize<Icrp3ubf87cjna>>;
export type Icrp3ubf87cjna = [number, Anonymize<I8c5gqvfaedv6e>, number];
export type I8c5gqvfaedv6e = FixedSizeArray<15, Anonymize<I5g2vv0ckl2m8b>>;
export type Ic5t26f9cp3tvk = {
    "id": SS58String;
    "prev"?: Anonymize<Ihfphjolmsqq1>;
    "next"?: Anonymize<Ihfphjolmsqq1>;
    "bag_upper": bigint;
    "score": bigint;
};
export type I39k39h6vu4hbq = {
    "head"?: Anonymize<Ihfphjolmsqq1>;
    "tail"?: Anonymize<Ihfphjolmsqq1>;
};
export type Idphjddn2h69vc = {
    "pool_id": number;
    "points": bigint;
    "last_recorded_reward_counter": bigint;
    "unbonding_eras": Anonymize<If9jidduiuq7vv>;
};
export type Idhh9vuu2bderg = {
    "commission": Anonymize<I9gabbnrts4k5a>;
    "member_counter": number;
    "points": bigint;
    "roles": Anonymize<Ia8iksu9hedf5n>;
    "state": NominationPoolsPoolState;
};
export type I9gabbnrts4k5a = {
    "current"?: Anonymize<Ie8iutm7u02lmj>;
    "max"?: Anonymize<I4arjljr6dpflb>;
    "change_rate"?: Anonymize<I7hapkpc6mcou7>;
    "throttle_from"?: Anonymize<I4arjljr6dpflb>;
    "claim_permission"?: Anonymize<I16m1kn78dee7v>;
};
export type I7hapkpc6mcou7 = (Anonymize<Ibqul338t9c1ll>) | undefined;
export type Ia8iksu9hedf5n = {
    "depositor": SS58String;
    "root"?: Anonymize<Ihfphjolmsqq1>;
    "nominator"?: Anonymize<Ihfphjolmsqq1>;
    "bouncer"?: Anonymize<Ihfphjolmsqq1>;
};
export type If6qa32dj75gu1 = {
    "last_recorded_reward_counter": bigint;
    "last_recorded_total_payouts": bigint;
    "total_rewards_claimed": bigint;
    "total_commission_pending": bigint;
    "total_commission_claimed": bigint;
};
export type I7oo2mprv1qd1s = {
    "no_era": Anonymize<I4h0cfnkiqrna6>;
    "with_era": Anonymize<I48jqs22bfh5as>;
};
export type I4h0cfnkiqrna6 = {
    "points": bigint;
    "balance": bigint;
};
export type I48jqs22bfh5as = Array<Anonymize<Ifp6metskahp08>>;
export type Ifp6metskahp08 = [number, Anonymize<I4h0cfnkiqrna6>];
export type NominationPoolsClaimPermission = Enum<{
    "Permissioned": undefined;
    "PermissionlessCompound": undefined;
    "PermissionlessWithdraw": undefined;
    "PermissionlessAll": undefined;
}>;
export declare const NominationPoolsClaimPermission: GetEnum<NominationPoolsClaimPermission>;
export type I2eh80qovrl7h2 = {
    "stashes": Anonymize<Iba9inugg1atvo>;
    "checked": Anonymize<Icgljjb6j82uhn>;
};
export type Idinvj2ldfa0k7 = {
    "max_code_size": number;
    "max_head_data_size": number;
    "max_upward_queue_count": number;
    "max_upward_queue_size": number;
    "max_upward_message_size": number;
    "max_upward_message_num_per_candidate": number;
    "hrmp_max_message_num_per_candidate": number;
    "validation_upgrade_cooldown": number;
    "validation_upgrade_delay": number;
    "async_backing_params": Anonymize<Iavuvfkop6318c>;
    "max_pov_size": number;
    "max_downward_message_size": number;
    "hrmp_max_parachain_outbound_channels": number;
    "hrmp_sender_deposit": bigint;
    "hrmp_recipient_deposit": bigint;
    "hrmp_channel_max_capacity": number;
    "hrmp_channel_max_total_size": number;
    "hrmp_max_parachain_inbound_channels": number;
    "hrmp_channel_max_message_size": number;
    "executor_params": Anonymize<I80rnntpog8qp6>;
    "code_retention_period": number;
    "max_validators"?: Anonymize<I4arjljr6dpflb>;
    "dispute_period": number;
    "dispute_post_conclusion_acceptance_period": number;
    "no_show_slots": number;
    "n_delay_tranches": number;
    "zeroth_delay_tranche_width": number;
    "needed_approvals": number;
    "relay_vrf_modulo_samples": number;
    "pvf_voting_ttl": number;
    "minimum_validation_upgrade_delay": number;
    "minimum_backing_votes": number;
    "node_features": {
        bytes: Uint8Array;
        bitsLen: number;
    };
    "approval_voting_params": number;
    "scheduler_params": Anonymize<I555j7pvb27qd5>;
};
export type Iavuvfkop6318c = {
    "max_candidate_depth": number;
    "allowed_ancestry_len": number;
};
export type I80rnntpog8qp6 = Array<PolkadotPrimitivesV6ExecutorParamsExecutorParam>;
export type PolkadotPrimitivesV6ExecutorParamsExecutorParam = Enum<{
    "MaxMemoryPages": number;
    "StackLogicalMax": number;
    "StackNativeMax": number;
    "PrecheckingMaxMemory": bigint;
    "PvfPrepTimeout": Anonymize<I57qv5chhd2bar>;
    "PvfExecTimeout": Anonymize<Ib05v3rv2rd8ij>;
    "WasmExtBulkMemory": undefined;
}>;
export declare const PolkadotPrimitivesV6ExecutorParamsExecutorParam: GetEnum<PolkadotPrimitivesV6ExecutorParamsExecutorParam>;
export type I57qv5chhd2bar = [PolkadotPrimitivesV6PvfPrepKind, bigint];
export type PolkadotPrimitivesV6PvfPrepKind = Enum<{
    "Precheck": undefined;
    "Prepare": undefined;
}>;
export declare const PolkadotPrimitivesV6PvfPrepKind: GetEnum<PolkadotPrimitivesV6PvfPrepKind>;
export type Ib05v3rv2rd8ij = [PvfExecKind, bigint];
export type PvfExecKind = Enum<{
    "Backing": undefined;
    "Approval": undefined;
}>;
export declare const PvfExecKind: GetEnum<PvfExecKind>;
export type I555j7pvb27qd5 = {
    "group_rotation_frequency": number;
    "paras_availability_period": number;
    "max_validators_per_core"?: Anonymize<I4arjljr6dpflb>;
    "lookahead": number;
    "num_cores": number;
    "max_availability_timeouts": number;
    "on_demand_queue_max_size": number;
    "on_demand_target_queue_utilization": number;
    "on_demand_fee_variability": number;
    "on_demand_base_fee": bigint;
    "ttl": number;
};
export type I78k2970vpbt1t = Array<Anonymize<Ijlosb0ss738p>>;
export type Ijlosb0ss738p = [number, Anonymize<Idinvj2ldfa0k7>];
export type I27il479s8gsv0 = {
    "buffer": Anonymize<I5v1libhfl216g>;
    "latest_number": number;
};
export type I5v1libhfl216g = Array<Anonymize<I2ccsdtloqt0h4>>;
export type I2ccsdtloqt0h4 = FixedSizeArray<2, FixedSizeBinary<32>>;
export type Id375uoldedict = Array<Anonymize<I39ni9afdvueqm>>;
export type I39ni9afdvueqm = {
    "core": number;
    "hash": FixedSizeBinary<32>;
    "descriptor": Anonymize<Ic7r865c0luc3k>;
    "commitments": Anonymize<Ic1d4u2opv3fst>;
    "availability_votes": {
        bytes: Uint8Array;
        bitsLen: number;
    };
    "backers": {
        bytes: Uint8Array;
        bitsLen: number;
    };
    "relay_parent_number": number;
    "backed_in_number": number;
    "backing_group": number;
};
export type Ic1d4u2opv3fst = {
    "upward_messages": Anonymize<Itom7fk49o0c9>;
    "horizontal_messages": Anonymize<I6r5cbv8ttrb09>;
    "new_validation_code"?: Anonymize<Iabpgqcjikia83>;
    "head_data": Binary;
    "processed_downward_messages": number;
    "hrmp_watermark": number;
};
export type Itom7fk49o0c9 = Array<Binary>;
export type I6r5cbv8ttrb09 = Array<Anonymize<I958l48g4qg5rf>>;
export type I958l48g4qg5rf = {
    "recipient": number;
    "data": Binary;
};
export type Iabpgqcjikia83 = (Binary) | undefined;
export type Ilg2fqs6cjgs3 = {
    "session": number;
    "backing_validators_per_candidate": Anonymize<I2cbmipi4mgfht>;
    "disputes": Anonymize<Ibt1op6l47p1r2>;
};
export type I2cbmipi4mgfht = Array<Anonymize<I8qsi9it67j51o>>;
export type I8qsi9it67j51o = [Anonymize<I9o5v7cmfi9c85>, Anonymize<I1jjanul21h2e0>];
export type I1jjanul21h2e0 = Array<Anonymize<Iiu2q9mv7qkl8>>;
export type Iiu2q9mv7qkl8 = [number, ValidityAttestation];
export type ValidityAttestation = Enum<{
    "Implicit": FixedSizeBinary<64>;
    "Explicit": FixedSizeBinary<64>;
}>;
export declare const ValidityAttestation: GetEnum<ValidityAttestation>;
export type Ibt1op6l47p1r2 = Array<Anonymize<I3ot7vri7o8sb8>>;
export type I3ot7vri7o8sb8 = {
    "candidate_hash": FixedSizeBinary<32>;
    "session": number;
    "statements": Anonymize<Ia05m2q0dqbf8r>;
};
export type Ia05m2q0dqbf8r = Array<Anonymize<Imkbdgkq0f1or>>;
export type Imkbdgkq0f1or = [PolkadotPrimitivesV6DisputeStatement, number, FixedSizeBinary<64>];
export type PolkadotPrimitivesV6DisputeStatement = Enum<{
    "Valid": PolkadotPrimitivesV6ValidDisputeStatementKind;
    "Invalid": Anonymize<InvalidDisputeStatementKind>;
}>;
export declare const PolkadotPrimitivesV6DisputeStatement: GetEnum<PolkadotPrimitivesV6DisputeStatement>;
export type PolkadotPrimitivesV6ValidDisputeStatementKind = Enum<{
    "Explicit": undefined;
    "BackingSeconded": FixedSizeBinary<32>;
    "BackingValid": FixedSizeBinary<32>;
    "ApprovalChecking": undefined;
    "ApprovalCheckingMultipleCandidates": Anonymize<Ic5m5lp1oioo8r>;
}>;
export declare const PolkadotPrimitivesV6ValidDisputeStatementKind: GetEnum<PolkadotPrimitivesV6ValidDisputeStatementKind>;
export type InvalidDisputeStatementKind = Enum<{
    "Explicit": undefined;
}>;
export declare const InvalidDisputeStatementKind: GetEnum<InvalidDisputeStatementKind>;
export type Iarlj3qd8u1v13 = Array<Anonymize<Icgljjb6j82uhn>>;
export type I2ng2krd94ceva = Array<PolkadotRuntimeParachainsSchedulerPalletCoreOccupied>;
export type PolkadotRuntimeParachainsSchedulerPalletCoreOccupied = Enum<{
    "Free": undefined;
    "Paras": Anonymize<Iuf24b6e93i3q>;
}>;
export declare const PolkadotRuntimeParachainsSchedulerPalletCoreOccupied: GetEnum<PolkadotRuntimeParachainsSchedulerPalletCoreOccupied>;
export type Iuf24b6e93i3q = {
    "assignment": PolkadotRuntimeParachainsSchedulerCommonAssignment;
    "availability_timeouts": number;
    "ttl": number;
};
export type PolkadotRuntimeParachainsSchedulerCommonAssignment = Enum<{
    "Pool": Anonymize<I51g4s1s9hjmnm>;
    "Bulk": number;
}>;
export declare const PolkadotRuntimeParachainsSchedulerCommonAssignment: GetEnum<PolkadotRuntimeParachainsSchedulerCommonAssignment>;
export type I51g4s1s9hjmnm = {
    "para_id": number;
    "core_index": number;
};
export type Ie18mk3nmrn3nr = Array<Anonymize<Ifadvqu5iig2q6>>;
export type Ifadvqu5iig2q6 = [number, Anonymize<I9173djtr3q94d>];
export type I9173djtr3q94d = Array<Anonymize<Iuf24b6e93i3q>>;
export type I4vk12npmr8ll0 = {
    "votes_accept": {
        bytes: Uint8Array;
        bitsLen: number;
    };
    "votes_reject": {
        bytes: Uint8Array;
        bitsLen: number;
    };
    "age": number;
    "created_at": number;
    "causes": Anonymize<I1hsgfu91a4476>;
};
export type I1hsgfu91a4476 = Array<Anonymize<Iajttbp61thc1h>>;
export type Iajttbp61thc1h = AnonymousEnum<{
    "Onboarding": number;
    "Upgrade": Anonymize<Irvl8rst55h8o>;
}>;
export type Irvl8rst55h8o = {
    "id": number;
    "included_at": number;
    "upgrade_strategy": Anonymize<I3mepf00hb058t>;
};
export type I3mepf00hb058t = AnonymousEnum<{
    "SetGoAheadSignal": undefined;
    "ApplyAtExpectedBlock": undefined;
}>;
export type ParachainsParasParaLifecycle = Enum<{
    "Onboarding": undefined;
    "Parathread": undefined;
    "Parachain": undefined;
    "UpgradingParathread": undefined;
    "DowngradingParachain": undefined;
    "OffboardingParathread": undefined;
    "OffboardingParachain": undefined;
}>;
export declare const ParachainsParasParaLifecycle: GetEnum<ParachainsParasParaLifecycle>;
export type I79cs1p3m59mo7 = {
    "upgrade_times": Anonymize<I2v6n2k262gqsq>;
    "last_pruned"?: Anonymize<I4arjljr6dpflb>;
};
export type I2v6n2k262gqsq = Array<Anonymize<Ioham9r6hhu19>>;
export type Ioham9r6hhu19 = {
    "expected_at": number;
    "activated_at": number;
};
export type UpgradeGoAhead = Enum<{
    "Abort": undefined;
    "GoAhead": undefined;
}>;
export declare const UpgradeGoAhead: GetEnum<UpgradeGoAhead>;
export type UpgradeRestriction = Enum<{
    "Present": undefined;
}>;
export declare const UpgradeRestriction: GetEnum<UpgradeRestriction>;
export type I2duhnt686rv0q = {
    "genesis_head": Binary;
    "validation_code": Binary;
    "para_kind": boolean;
};
export type I7ulu3h1ibu60i = Array<Anonymize<Idtrfath8htv0g>>;
export type Idtrfath8htv0g = {
    "validators": Anonymize<Ic5m5lp1oioo8r>;
    "queued": Anonymize<Ic5m5lp1oioo8r>;
    "session_index": number;
};
export type I6ljjd4b5fa4ov = Array<Anonymize<I60847k37jfcc6>>;
export type I60847k37jfcc6 = {
    "sent_at": number;
    "msg": Binary;
};
export type Ibhmrlkcu01imb = {
    "confirmed": boolean;
    "_age": number;
    "sender_deposit": bigint;
    "max_message_size": number;
    "max_capacity": number;
    "max_total_size": number;
};
export type Id43g4eveajpkl = Array<Anonymize<I50mrcbubp554e>>;
export type I7iua3ehrgl4va = {
    "max_capacity": number;
    "max_total_size": number;
    "max_message_size": number;
    "msg_count": number;
    "total_size": number;
    "mqc_head"?: Anonymize<I4s6vifaf8k998>;
    "sender_deposit": bigint;
    "recipient_deposit": bigint;
};
export type Iev3u09i2vqn93 = Array<Anonymize<I409qo0sfkbh16>>;
export type I409qo0sfkbh16 = {
    "sent_at": number;
    "data": Binary;
};
export type I9olhgo2o08h7b = Array<Anonymize<I8pg2rpr4ldgp9>>;
export type I8pg2rpr4ldgp9 = [number, Anonymize<Icgljjb6j82uhn>];
export type I9m4rd2a7lc9md = {
    "active_validator_indices": Anonymize<Icgljjb6j82uhn>;
    "random_seed": FixedSizeBinary<32>;
    "dispute_period": number;
    "validators": Anonymize<Ic5m5lp1oioo8r>;
    "discovery_keys": Anonymize<Ic5m5lp1oioo8r>;
    "assignment_keys": Anonymize<Ic5m5lp1oioo8r>;
    "validator_groups": Anonymize<Iarlj3qd8u1v13>;
    "n_cores": number;
    "zeroth_delay_tranche_width": number;
    "relay_vrf_modulo_samples": number;
    "n_delay_tranches": number;
    "no_show_slots": number;
    "needed_approvals": number;
};
export type I87u7jalc0lhah = {
    "validators_for": {
        bytes: Uint8Array;
        bitsLen: number;
    };
    "validators_against": {
        bytes: Uint8Array;
        bitsLen: number;
    };
    "start": number;
    "concluded_at"?: Anonymize<I4arjljr6dpflb>;
};
export type I4p5t2krb1gmvp = [number, FixedSizeBinary<32>];
export type I5kqchhvguhfvt = {
    "keys": Anonymize<Iqnbvitf7a7l3>;
    "kind": SlashingOffenceKind;
};
export type Iqnbvitf7a7l3 = Array<Anonymize<I4p5t2krb1gmvp>>;
export type SlashingOffenceKind = Enum<{
    "ForInvalid": undefined;
    "AgainstValid": undefined;
}>;
export declare const SlashingOffenceKind: GetEnum<SlashingOffenceKind>;
export type I4akf1ifqeclef = {
    "core_index": number;
    "count": number;
};
export type Ido5stnsbghtpd = {
    "traffic": bigint;
    "next_index": number;
    "smallest_index": number;
    "freed_indices": Anonymize<Icgljjb6j82uhn>;
};
export type I3ndpvu09rj685 = Array<Anonymize<Imjh277lquvaf>>;
export type Imjh277lquvaf = {
    "para_id": number;
    "idx": number;
};
export type Iafqnechp3omqg = Array<bigint>;
export type I9dasmua8326io = {
    "assignments": Anonymize<Idt36labebpqsd>;
    "end_hint"?: Anonymize<I4arjljr6dpflb>;
    "next_schedule"?: Anonymize<I4arjljr6dpflb>;
};
export type Idt36labebpqsd = Array<Anonymize<I7adotjtnum30f>>;
export type I7adotjtnum30f = [BrokerCoretimeInterfaceCoreAssignment, number];
export type BrokerCoretimeInterfaceCoreAssignment = Enum<{
    "Idle": undefined;
    "Pool": undefined;
    "Task": number;
}>;
export declare const BrokerCoretimeInterfaceCoreAssignment: GetEnum<BrokerCoretimeInterfaceCoreAssignment>;
export type I3g90iebhds6kb = {
    "queue"?: Anonymize<If4sm31aq7v0i8>;
    "current_work"?: Anonymize<Idluqurlhlnsuv>;
};
export type If4sm31aq7v0i8 = (Anonymize<Icjkaf41q9ga6t>) | undefined;
export type Icjkaf41q9ga6t = {
    "first": number;
    "last": number;
};
export type Idluqurlhlnsuv = (Anonymize<I4dhqg6u1p94d9>) | undefined;
export type I4dhqg6u1p94d9 = {
    "assignments": Anonymize<Id4rj19l8fe7gn>;
    "end_hint"?: Anonymize<I4arjljr6dpflb>;
    "pos": number;
    "step": number;
};
export type Id4rj19l8fe7gn = Array<Anonymize<Ic8ii95e1sb1nk>>;
export type Ic8ii95e1sb1nk = [BrokerCoretimeInterfaceCoreAssignment, Anonymize<Ifrejtuk4pctgo>];
export type Ifrejtuk4pctgo = {
    "ratio": number;
    "remaining": number;
};
export type I3av628q6dt6mq = {
    "manager": SS58String;
    "deposit": bigint;
    "locked"?: Anonymize<I8ie0dco0kcuq5>;
};
export type I8ie0dco0kcuq5 = (boolean) | undefined;
export type Ifmaahl40gom3g = Array<Anonymize<I92hdo1clkbp4g>>;
export type I70iuri2ilha1f = FixedSizeArray<36, Anonymize<I1qlf98109qt29>>;
export type I1qlf98109qt29 = (Anonymize<I7fcree6lak6uv>) | undefined;
export type I7fcree6lak6uv = [SS58String, number, bigint];
export type I6gun5k9fbb4s0 = {
    "depositor": SS58String;
    "verifier"?: Anonymize<I21lmi57mmu91l>;
    "deposit": bigint;
    "raised": bigint;
    "end": number;
    "cap": bigint;
    "last_contribution": CommonCrowdloanLastContribution;
    "first_period": number;
    "last_period": number;
    "fund_index": number;
};
export type I21lmi57mmu91l = (MultiSigner) | undefined;
export type MultiSigner = Enum<{
    "Ed25519": FixedSizeBinary<32>;
    "Sr25519": FixedSizeBinary<32>;
    "Ecdsa": FixedSizeBinary<33>;
}>;
export declare const MultiSigner: GetEnum<MultiSigner>;
export type CommonCrowdloanLastContribution = Enum<{
    "Never": undefined;
    "PreEnding": number;
    "Ending": number;
}>;
export declare const CommonCrowdloanLastContribution: GetEnum<CommonCrowdloanLastContribution>;
export type If354jrdedj0pj = {
    "progress_top": Anonymize<I1ufmh6d8psvik>;
    "progress_child": Anonymize<I1ufmh6d8psvik>;
    "size": number;
    "top_items": number;
    "child_items": number;
};
export type I1ufmh6d8psvik = AnonymousEnum<{
    "ToStart": undefined;
    "LastKey": Binary;
    "Complete": undefined;
}>;
export type Ib17t3992hb64n = (Anonymize<I215mkl885p4da>) | undefined;
export type I215mkl885p4da = {
    "size": number;
    "item": number;
};
export type XcmPalletQueryStatus = Enum<{
    "Pending": Anonymize<I9cig2tff0h7a2>;
    "VersionNotifier": Anonymize<I5c2ss6qk7lue3>;
    "Ready": Anonymize<I2rikk3g9dnfdf>;
}>;
export declare const XcmPalletQueryStatus: GetEnum<XcmPalletQueryStatus>;
export type I9cig2tff0h7a2 = {
    "responder": DotXcmVersionedLocation;
    "maybe_match_querier"?: Anonymize<Ichrhugqpl0jbb>;
    "maybe_notify"?: Anonymize<I1faufi0iffstp>;
    "timeout": number;
};
export type Ichrhugqpl0jbb = (DotXcmVersionedLocation) | undefined;
export type I1faufi0iffstp = (FixedSizeBinary<2>) | undefined;
export type I5c2ss6qk7lue3 = {
    "origin": DotXcmVersionedLocation;
    "is_active": boolean;
};
export type I2rikk3g9dnfdf = {
    "response": XcmVersionedResponse;
    "at": number;
};
export type XcmVersionedResponse = Enum<{
    "V2": XcmV2Response;
    "V3": XcmV3Response;
    "V4": XcmV4Response;
}>;
export declare const XcmVersionedResponse: GetEnum<XcmVersionedResponse>;
export type XcmV2Response = Enum<{
    "Null": undefined;
    "Assets": Anonymize<I2sllmucln1iic>;
    "ExecutionResult"?: Anonymize<Ic6k45vtgiaa1s>;
    "Version": number;
}>;
export declare const XcmV2Response: GetEnum<XcmV2Response>;
export type Ic6k45vtgiaa1s = (Anonymize<Ifg18rrvb5cqli>) | undefined;
export type Ifg18rrvb5cqli = [number, XcmV2TraitsError];
export type XcmV2TraitsError = Enum<{
    "Overflow": undefined;
    "Unimplemented": undefined;
    "UntrustedReserveLocation": undefined;
    "UntrustedTeleportLocation": undefined;
    "MultiLocationFull": undefined;
    "MultiLocationNotInvertible": undefined;
    "BadOrigin": undefined;
    "InvalidLocation": undefined;
    "AssetNotFound": undefined;
    "FailedToTransactAsset": undefined;
    "NotWithdrawable": undefined;
    "LocationCannotHold": undefined;
    "ExceedsMaxMessageSize": undefined;
    "DestinationUnsupported": undefined;
    "Transport": undefined;
    "Unroutable": undefined;
    "UnknownClaim": undefined;
    "FailedToDecode": undefined;
    "MaxWeightInvalid": undefined;
    "NotHoldingFees": undefined;
    "TooExpensive": undefined;
    "Trap": bigint;
    "UnhandledXcmVersion": undefined;
    "WeightLimitReached": bigint;
    "Barrier": undefined;
    "WeightNotComputable": undefined;
}>;
export declare const XcmV2TraitsError: GetEnum<XcmV2TraitsError>;
export type XcmV3Response = Enum<{
    "Null": undefined;
    "Assets": Anonymize<Iai6dhqiq3bach>;
    "ExecutionResult"?: Anonymize<I7sltvf8v2nure>;
    "Version": number;
    "PalletsInfo": Anonymize<I599u7h20b52at>;
    "DispatchResult": XcmV3MaybeErrorCode;
}>;
export declare const XcmV3Response: GetEnum<XcmV3Response>;
export type Ic4qvh5df9s5gp = [number, DotXcmVersionedLocation];
export type I7vlvrrl2pnbgk = [bigint, Anonymize<I4q39t5hn830vp>, number];
export type I50sjs3s5lud21 = Array<Anonymize<I6vu59hrif6rva>>;
export type I6vu59hrif6rva = [DotXcmVersionedLocation, number];
export type XcmPalletVersionMigrationStage = Enum<{
    "MigrateSupportedVersion": undefined;
    "MigrateVersionNotifiers": undefined;
    "NotifyCurrentTargets"?: Anonymize<Iabpgqcjikia83>;
    "MigrateAndNotifyOldTargets": undefined;
}>;
export declare const XcmPalletVersionMigrationStage: GetEnum<XcmPalletVersionMigrationStage>;
export type I50qp0ij7h62g2 = {
    "amount": bigint;
    "owner": DotXcmVersionedLocation;
    "locker": DotXcmVersionedLocation;
    "consumers": Anonymize<I2ia97v5nng96b>;
};
export type I2ia97v5nng96b = Array<Anonymize<I2a3me3o6q76s8>>;
export type I2a3me3o6q76s8 = [undefined, bigint];
export type Iteuj23is2ed5 = [number, SS58String, DotXcmVersionedAssetId];
export type DotXcmVersionedAssetId = Enum<{
    "V3": XcmV3MultiassetAssetId;
    "V4": Anonymize<I4c0s5cioidn76>;
}>;
export declare const DotXcmVersionedAssetId: GetEnum<DotXcmVersionedAssetId>;
export type I3rp19gb4dadaa = Array<Anonymize<I4arq5fbf241mq>>;
export type I4arq5fbf241mq = [bigint, DotXcmVersionedLocation];
export type I260m120dp9sbk = {
    "begin": number;
    "end": number;
    "count": number;
    "ready_neighbours"?: Anonymize<I8lhcj4rckefdi>;
    "message_count": bigint;
    "size": bigint;
};
export type I8lhcj4rckefdi = (Anonymize<I9edqr8hi819se>) | undefined;
export type I9edqr8hi819se = {
    "prev": ParachainsInclusionAggregateMessageOrigin;
    "next": ParachainsInclusionAggregateMessageOrigin;
};
export type I53esa2ms463bk = {
    "remaining": number;
    "remaining_size": number;
    "first_index": number;
    "first": number;
    "last": number;
    "heap": Binary;
};
export type I1lfimt2mpej64 = [ParachainsInclusionAggregateMessageOrigin, number];
export type I2fb54desdqd9n = Array<FixedSizeBinary<33>>;
export type Idjett00s2gd = {
    "id": bigint;
    "len": number;
    "keyset_commitment": FixedSizeBinary<32>;
};
export type In7a38730s6qs = {
    "base_block": Anonymize<I4q39t5hn830vp>;
    "max_block": Anonymize<I4q39t5hn830vp>;
    "per_class": Anonymize<I79te2qqsklnbd>;
};
export type I79te2qqsklnbd = {
    "normal": Anonymize<Ia78ef0a3p5958>;
    "operational": Anonymize<Ia78ef0a3p5958>;
    "mandatory": Anonymize<Ia78ef0a3p5958>;
};
export type Ia78ef0a3p5958 = {
    "base_extrinsic": Anonymize<I4q39t5hn830vp>;
    "max_extrinsic"?: Anonymize<Iasb8k6ash5mjn>;
    "max_total"?: Anonymize<Iasb8k6ash5mjn>;
    "reserved"?: Anonymize<Iasb8k6ash5mjn>;
};
export type If15el53dd76v9 = {
    "normal": number;
    "operational": number;
    "mandatory": number;
};
export type I9s0ave7t0vnrk = {
    "read": bigint;
    "write": bigint;
};
export type Ic6nglu2db2c36 = {
    "spec_name": string;
    "impl_name": string;
    "authoring_version": number;
    "spec_version": number;
    "impl_version": number;
    "apis": Anonymize<Ic9hg6pp5pkea5>;
    "transaction_version": number;
    "state_version": number;
};
export type Ic9hg6pp5pkea5 = Array<Anonymize<I85u3mm1me217a>>;
export type I85u3mm1me217a = [FixedSizeBinary<8>, number];
export type Ibafpkl9hhno69 = Array<Anonymize<Ida9vhl30l98p4>>;
export type Ida9vhl30l98p4 = [number, Anonymize<I6s1tg2sl5nvmp>];
export type I6s1tg2sl5nvmp = {
    "name": string;
    "max_deciding": number;
    "decision_deposit": bigint;
    "prepare_period": number;
    "decision_period": number;
    "confirm_period": number;
    "min_enactment_period": number;
    "min_approval": ReferendaTypesCurve;
    "min_support": ReferendaTypesCurve;
};
export type ReferendaTypesCurve = Enum<{
    "LinearDecreasing": Anonymize<Idcpso832hml3u>;
    "SteppedDecreasing": Anonymize<I5qiv0grkufa8l>;
    "Reciprocal": Anonymize<I58l93su2gte4i>;
}>;
export declare const ReferendaTypesCurve: GetEnum<ReferendaTypesCurve>;
export type Idcpso832hml3u = {
    "length": number;
    "floor": number;
    "ceil": number;
};
export type I5qiv0grkufa8l = {
    "begin": number;
    "end": number;
    "step": number;
    "period": number;
};
export type I58l93su2gte4i = {
    "factor": bigint;
    "x_offset": bigint;
    "y_offset": bigint;
};
export type Iekve0i6djpd9f = AnonymousEnum<{
    /**
     *Make some on-chain remark.
     *
     *Can be executed by every `origin`.
     */
    "remark": Anonymize<I8ofcg5rbj0g2c>;
    /**
     *Set the number of pages in the WebAssembly environment's heap.
     */
    "set_heap_pages": Anonymize<I4adgbll7gku4i>;
    /**
     *Set the new runtime code.
     */
    "set_code": Anonymize<I6pjjpfvhvcfru>;
    /**
     *Set the new runtime code without doing any checks of the given `code`.
     *
     *Note that runtime upgrades will not run if this is called with a not-increasing spec
     *version!
     */
    "set_code_without_checks": Anonymize<I6pjjpfvhvcfru>;
    /**
     *Set some items of storage.
     */
    "set_storage": Anonymize<I9pj91mj79qekl>;
    /**
     *Kill some items from storage.
     */
    "kill_storage": Anonymize<I39uah9nss64h9>;
    /**
     *Kill all storage items with a key that starts with the given prefix.
     *
     ***NOTE:** We rely on the Root origin to provide us the number of subkeys under
     *the prefix we are removing to accurately calculate the weight of this function.
     */
    "kill_prefix": Anonymize<Ik64dknsq7k08>;
    /**
     *Make some on-chain remark and emit event.
     */
    "remark_with_event": Anonymize<I8ofcg5rbj0g2c>;
    /**
     *Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
     *later.
     *
     *This call requires Root origin.
     */
    "authorize_upgrade": Anonymize<Ib51vk42m1po4n>;
    /**
     *Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
     *later.
     *
     *WARNING: This authorizes an upgrade that will take place without any safety checks, for
     *example that the spec name remains the same and that the version number increases. Not
     *recommended for normal use. Use `authorize_upgrade` instead.
     *
     *This call requires Root origin.
     */
    "authorize_upgrade_without_checks": Anonymize<Ib51vk42m1po4n>;
    /**
     *Provide the preimage (runtime binary) `code` for an upgrade that has been authorized.
     *
     *If the authorization required a version check, this call will ensure the spec name
     *remains unchanged and that the spec version has increased.
     *
     *Depending on the runtime's `OnSetCode` configuration, this function may directly apply
     *the new `code` in the same block or attempt to schedule the upgrade.
     *
     *All origins are allowed.
     */
    "apply_authorized_upgrade": Anonymize<I6pjjpfvhvcfru>;
}>;
export type I8ofcg5rbj0g2c = {
    "remark": Binary;
};
export type I4adgbll7gku4i = {
    "pages": bigint;
};
export type I6pjjpfvhvcfru = {
    "code": Binary;
};
export type I9pj91mj79qekl = {
    "items": Anonymize<I6pi5ou8r1hblk>;
};
export type I6pi5ou8r1hblk = Array<Anonymize<Idkbvh6dahk1v7>>;
export type Idkbvh6dahk1v7 = FixedSizeArray<2, Binary>;
export type I39uah9nss64h9 = {
    "keys": Anonymize<Itom7fk49o0c9>;
};
export type Ik64dknsq7k08 = {
    "prefix": Binary;
    "subkeys": number;
};
export type Ib51vk42m1po4n = {
    "code_hash": FixedSizeBinary<32>;
};
export type Ieh64eapar6lrn = AnonymousEnum<{
    /**
     *Anonymously schedule a task.
     */
    "schedule": Anonymize<I4ip6ol0gghhtt>;
    /**
     *Cancel an anonymously scheduled task.
     */
    "cancel": Anonymize<I5n4sebgkfr760>;
    /**
     *Schedule a named task.
     */
    "schedule_named": Anonymize<Ic1m22rlm0tu62>;
    /**
     *Cancel a named scheduled task.
     */
    "cancel_named": Anonymize<Ifs1i5fk9cqvr6>;
    /**
     *Anonymously schedule a task after a delay.
     */
    "schedule_after": Anonymize<Idhjnad4uvg4fu>;
    /**
     *Schedule a named task after a delay.
     */
    "schedule_named_after": Anonymize<I1e44oto040r12>;
    /**
     *Set a retry configuration for a task so that, in case its scheduled run fails, it will
     *be retried after `period` blocks, for a total amount of `retries` retries or until it
     *succeeds.
     *
     *Tasks which need to be scheduled for a retry are still subject to weight metering and
     *agenda space, same as a regular task. If a periodic task fails, it will be scheduled
     *normally while the task is retrying.
     *
     *Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
     *clones of the original task. Their retry configuration will be derived from the
     *original task's configuration, but will have a lower value for `remaining` than the
     *original `total_retries`.
     */
    "set_retry": Anonymize<Ieg3fd8p4pkt10>;
    /**
     *Set a retry configuration for a named task so that, in case its scheduled run fails, it
     *will be retried after `period` blocks, for a total amount of `retries` retries or until
     *it succeeds.
     *
     *Tasks which need to be scheduled for a retry are still subject to weight metering and
     *agenda space, same as a regular task. If a periodic task fails, it will be scheduled
     *normally while the task is retrying.
     *
     *Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
     *clones of the original task. Their retry configuration will be derived from the
     *original task's configuration, but will have a lower value for `remaining` than the
     *original `total_retries`.
     */
    "set_retry_named": Anonymize<I8kg5ll427kfqq>;
    /**
     *Removes the retry configuration of a task.
     */
    "cancel_retry": Anonymize<I467333262q1l9>;
    /**
     *Cancel the retry configuration of a named task.
     */
    "cancel_retry_named": Anonymize<Ifs1i5fk9cqvr6>;
}>;
export type I4ip6ol0gghhtt = {
    "when": number;
    "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
    "priority": number;
    "call": TxCallData;
};
export type Ic1m22rlm0tu62 = {
    "id": FixedSizeBinary<32>;
    "when": number;
    "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
    "priority": number;
    "call": TxCallData;
};
export type Ifs1i5fk9cqvr6 = {
    "id": FixedSizeBinary<32>;
};
export type Idhjnad4uvg4fu = {
    "after": number;
    "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
    "priority": number;
    "call": TxCallData;
};
export type I1e44oto040r12 = {
    "id": FixedSizeBinary<32>;
    "after": number;
    "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
    "priority": number;
    "call": TxCallData;
};
export type Ieg3fd8p4pkt10 = {
    "task": Anonymize<I9jd27rnpm8ttv>;
    "retries": number;
    "period": number;
};
export type I8kg5ll427kfqq = {
    "id": FixedSizeBinary<32>;
    "retries": number;
    "period": number;
};
export type I467333262q1l9 = {
    "task": Anonymize<I9jd27rnpm8ttv>;
};
export type If81ks88t5mpk5 = AnonymousEnum<{
    /**
     *Register a preimage on-chain.
     *
     *If the preimage was previously requested, no fees or deposits are taken for providing
     *the preimage. Otherwise, a deposit is taken proportional to the size of the preimage.
     */
    "note_preimage": Anonymize<I82nfqfkd48n10>;
    /**
     *Clear an unrequested preimage from the runtime storage.
     *
     *If `len` is provided, then it will be a much cheaper operation.
     *
     *- `hash`: The hash of the preimage to be removed from the store.
     *- `len`: The length of the preimage of `hash`.
     */
    "unnote_preimage": Anonymize<I1jm8m1rh9e20v>;
    /**
     *Request a preimage be uploaded to the chain without paying any fees or deposits.
     *
     *If the preimage requests has already been provided on-chain, we unreserve any deposit
     *a user may have paid, and take the control of the preimage out of their hands.
     */
    "request_preimage": Anonymize<I1jm8m1rh9e20v>;
    /**
     *Clear a previously made request for a preimage.
     *
     *NOTE: THIS MUST NOT BE CALLED ON `hash` MORE TIMES THAN `request_preimage`.
     */
    "unrequest_preimage": Anonymize<I1jm8m1rh9e20v>;
    /**
     *Ensure that the a bulk of pre-images is upgraded.
     *
     *The caller pays no fee if at least 90% of pre-images were successfully updated.
     */
    "ensure_updated": Anonymize<I3o5j3bli1pd8e>;
}>;
export type I82nfqfkd48n10 = {
    "bytes": Binary;
};
export type I3o5j3bli1pd8e = {
    "hashes": Anonymize<Ic5m5lp1oioo8r>;
};
export type I1jeo0dpbkma5g = AnonymousEnum<{
    /**
     *Report authority equivocation/misbehavior. This method will verify
     *the equivocation proof and validate the given key ownership proof
     *against the extracted offender. If both are valid, the offence will
     *be reported.
     */
    "report_equivocation": Anonymize<I50ppnqasq4tjq>;
    /**
     *Report authority equivocation/misbehavior. This method will verify
     *the equivocation proof and validate the given key ownership proof
     *against the extracted offender. If both are valid, the offence will
     *be reported.
     *This extrinsic must be called unsigned and it is expected that only
     *block authors will call it (validated in `ValidateUnsigned`), as such
     *if the block author is defined it will be defined as the equivocation
     *reporter.
     */
    "report_equivocation_unsigned": Anonymize<I50ppnqasq4tjq>;
    /**
     *Plan an epoch config change. The epoch config change is recorded and will be enacted on
     *the next call to `enact_epoch_change`. The config will be activated one epoch after.
     *Multiple calls to this method will replace any existing planned config change that had
     *not been enacted yet.
     */
    "plan_config_change": Anonymize<I9fin09kkg0jaj>;
}>;
export type I50ppnqasq4tjq = {
    "equivocation_proof": Anonymize<I68ii5ik8avr9o>;
    "key_owner_proof": Anonymize<I3ia7aufsoj0l1>;
};
export type I68ii5ik8avr9o = {
    "offender": FixedSizeBinary<32>;
    "slot": bigint;
    "first_header": Anonymize<Ic952bubvq4k7d>;
    "second_header": Anonymize<Ic952bubvq4k7d>;
};
export type Ic952bubvq4k7d = {
    "parent_hash": FixedSizeBinary<32>;
    "number": number;
    "state_root": FixedSizeBinary<32>;
    "extrinsics_root": FixedSizeBinary<32>;
    "digest": Anonymize<I4mddgoa69c0a2>;
};
export type I3ia7aufsoj0l1 = {
    "session": number;
    "trie_nodes": Anonymize<Itom7fk49o0c9>;
    "validator_count": number;
};
export type I9fin09kkg0jaj = {
    "config": BabeDigestsNextConfigDescriptor;
};
export type I7d75gqfg6jh9c = AnonymousEnum<{
    /**
     *Set the current time.
     *
     *This call should be invoked exactly once per block. It will panic at the finalization
     *phase, if this call hasn't been invoked by that time.
     *
     *The timestamp should be greater than the previous one by the amount specified by
     *[`Config::MinimumPeriod`].
     *
     *The dispatch origin for this call must be _None_.
     *
     *This dispatch class is _Mandatory_ to ensure it gets executed in the block. Be aware
     *that changing the complexity of this call could result exhausting the resources in a
     *block to execute any other calls.
     *
     *## Complexity
     *- `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
     *- 1 storage read and 1 storage mutation (codec `O(1)` because of `DidUpdate::take` in
     *  `on_finalize`)
     *- 1 event handler `on_timestamp_set`. Must be `O(1)`.
     */
    "set": Anonymize<Idcr6u6361oad9>;
}>;
export type Idcr6u6361oad9 = {
    "now": bigint;
};
export type I66vlm8f4l1oll = AnonymousEnum<{
    /**
     *Assign an previously unassigned index.
     *
     *Payment: `Deposit` is reserved from the sender account.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `index`: the index to be claimed. This must not be in use.
     *
     *Emits `IndexAssigned` if successful.
     *
     *## Complexity
     *- `O(1)`.
     */
    "claim": Anonymize<I666bl2fqjkejo>;
    /**
     *Assign an index already owned by the sender to another account. The balance reservation
     *is effectively transferred to the new account.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `index`: the index to be re-assigned. This must be owned by the sender.
     *- `new`: the new owner of the index. This function is a no-op if it is equal to sender.
     *
     *Emits `IndexAssigned` if successful.
     *
     *## Complexity
     *- `O(1)`.
     */
    "transfer": Anonymize<I6o1er683vod1j>;
    /**
     *Free up an index owned by the sender.
     *
     *Payment: Any previous deposit placed for the index is unreserved in the sender account.
     *
     *The dispatch origin for this call must be _Signed_ and the sender must own the index.
     *
     *- `index`: the index to be freed. This must be owned by the sender.
     *
     *Emits `IndexFreed` if successful.
     *
     *## Complexity
     *- `O(1)`.
     */
    "free": Anonymize<I666bl2fqjkejo>;
    /**
     *Force an index to an account. This doesn't require a deposit. If the index is already
     *held, then any deposit is reimbursed to its current owner.
     *
     *The dispatch origin for this call must be _Root_.
     *
     *- `index`: the index to be (re-)assigned.
     *- `new`: the new owner of the index. This function is a no-op if it is equal to sender.
     *- `freeze`: if set to `true`, will freeze the index so it cannot be transferred.
     *
     *Emits `IndexAssigned` if successful.
     *
     *## Complexity
     *- `O(1)`.
     */
    "force_transfer": Anonymize<I5bq561t4gpfva>;
    /**
     *Freeze an index so it will always point to the sender account. This consumes the
     *deposit.
     *
     *The dispatch origin for this call must be _Signed_ and the signing account must have a
     *non-frozen account `index`.
     *
     *- `index`: the index to be frozen in place.
     *
     *Emits `IndexFrozen` if successful.
     *
     *## Complexity
     *- `O(1)`.
     */
    "freeze": Anonymize<I666bl2fqjkejo>;
}>;
export type I6o1er683vod1j = {
    "new": MultiAddress;
    "index": number;
};
export type MultiAddress = Enum<{
    "Id": SS58String;
    "Index": undefined;
    "Raw": Binary;
    "Address32": FixedSizeBinary<32>;
    "Address20": FixedSizeBinary<20>;
}>;
export declare const MultiAddress: GetEnum<MultiAddress>;
export type I5bq561t4gpfva = {
    "new": MultiAddress;
    "index": number;
    "freeze": boolean;
};
export type I9svldsp29mh87 = AnonymousEnum<{
    /**
     *Transfer some liquid free balance to another account.
     *
     *`transfer_allow_death` will set the `FreeBalance` of the sender and receiver.
     *If the sender's account is below the existential deposit as a result
     *of the transfer, the account will be reaped.
     *
     *The dispatch origin for this call must be `Signed` by the transactor.
     */
    "transfer_allow_death": Anonymize<I4ktuaksf5i1gk>;
    /**
     *Exactly as `transfer_allow_death`, except the origin must be root and the source account
     *may be specified.
     */
    "force_transfer": Anonymize<I9bqtpv2ii35mp>;
    /**
     *Same as the [`transfer_allow_death`] call, but with a check that the transfer will not
     *kill the origin account.
     *
     *99% of the time you want [`transfer_allow_death`] instead.
     *
     *[`transfer_allow_death`]: struct.Pallet.html#method.transfer
     */
    "transfer_keep_alive": Anonymize<I4ktuaksf5i1gk>;
    /**
     *Transfer the entire transferable balance from the caller account.
     *
     *NOTE: This function only attempts to transfer _transferable_ balances. This means that
     *any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
     *transferred by this function. To ensure that this function results in a killed account,
     *you might need to prepare the account by removing any reference counters, storage
     *deposits, etc...
     *
     *The dispatch origin of this call must be Signed.
     *
     *- `dest`: The recipient of the transfer.
     *- `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
     *  of the funds the account has, causing the sender account to be killed (false), or
     *  transfer everything except at least the existential deposit, which will guarantee to
     *  keep the sender account alive (true).
     */
    "transfer_all": Anonymize<I9j7pagd6d4bda>;
    /**
     *Unreserve some balance from a user by force.
     *
     *Can only be called by ROOT.
     */
    "force_unreserve": Anonymize<I2h9pmio37r7fb>;
    /**
     *Upgrade a specified account.
     *
     *- `origin`: Must be `Signed`.
     *- `who`: The account to be upgraded.
     *
     *This will waive the transaction fee if at least all but 10% of the accounts needed to
     *be upgraded. (We let some not have to be upgraded just in order to allow for the
     *possibility of churn).
     */
    "upgrade_accounts": Anonymize<Ibmr18suc9ikh9>;
    /**
     *Set the regular balance of a given account.
     *
     *The dispatch origin for this call is `root`.
     */
    "force_set_balance": Anonymize<I9iq22t0burs89>;
    /**
     *Adjust the total issuance in a saturating way.
     *
     *Can only be called by root and always needs a positive `delta`.
     *
     *# Example
     */
    "force_adjust_total_issuance": Anonymize<I5u8olqbbvfnvf>;
    /**
     *Burn the specified liquid free balance from the origin account.
     *
     *If the origin's account ends up below the existential deposit as a result
     *of the burn and `keep_alive` is false, the account will be reaped.
     *
     *Unlike sending funds to a _burn_ address, which merely makes the funds inaccessible,
     *this `burn` operation will reduce total issuance by the amount _burned_.
     */
    "burn": Anonymize<I5utcetro501ir>;
}>;
export type I4ktuaksf5i1gk = {
    "dest": MultiAddress;
    "value": bigint;
};
export type I9bqtpv2ii35mp = {
    "source": MultiAddress;
    "dest": MultiAddress;
    "value": bigint;
};
export type I9j7pagd6d4bda = {
    "dest": MultiAddress;
    "keep_alive": boolean;
};
export type I2h9pmio37r7fb = {
    "who": MultiAddress;
    "amount": bigint;
};
export type Ibmr18suc9ikh9 = {
    "who": Anonymize<Ia2lhg7l2hilo3>;
};
export type I9iq22t0burs89 = {
    "who": MultiAddress;
    "new_free": bigint;
};
export type I5u8olqbbvfnvf = {
    "direction": BalancesAdjustmentDirection;
    "delta": bigint;
};
export type BalancesAdjustmentDirection = Enum<{
    "Increase": undefined;
    "Decrease": undefined;
}>;
export declare const BalancesAdjustmentDirection: GetEnum<BalancesAdjustmentDirection>;
export type I5utcetro501ir = {
    "value": bigint;
    "keep_alive": boolean;
};
export type I5jvuh9dlbdd20 = AnonymousEnum<{
    /**
     *Take the origin account as a stash and lock up `value` of its balance. `controller` will
     *be the account that controls it.
     *
     *`value` must be more than the `minimum_balance` specified by `T::Currency`.
     *
     *The dispatch origin for this call must be _Signed_ by the stash account.
     *
     *Emits `Bonded`.
     *## Complexity
     *- Independent of the arguments. Moderate complexity.
     *- O(1).
     *- Three extra DB entries.
     *
     *NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
     *unless the `origin` falls below _existential deposit_ (or equal to 0) and gets removed
     *as dust.
     */
    "bond": Anonymize<I2eip8tc75dpje>;
    /**
     *Add some extra amount that have appeared in the stash `free_balance` into the balance up
     *for staking.
     *
     *The dispatch origin for this call must be _Signed_ by the stash, not the controller.
     *
     *Use this if there are additional funds in your stash account that you wish to bond.
     *Unlike [`bond`](Self::bond) or [`unbond`](Self::unbond) this function does not impose
     *any limitation on the amount that can be added.
     *
     *Emits `Bonded`.
     *
     *## Complexity
     *- Independent of the arguments. Insignificant complexity.
     *- O(1).
     */
    "bond_extra": Anonymize<I564va64vtidbq>;
    /**
     *Schedule a portion of the stash to be unlocked ready for transfer out after the bond
     *period ends. If this leaves an amount actively bonded less than
     *T::Currency::minimum_balance(), then it is increased to the full amount.
     *
     *The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     *
     *Once the unlock period is done, you can call `withdraw_unbonded` to actually move
     *the funds out of management ready for transfer.
     *
     *No more than a limited number of unlocking chunks (see `MaxUnlockingChunks`)
     *can co-exists at the same time. If there are no unlocking chunks slots available
     *[`Call::withdraw_unbonded`] is called to remove some of the chunks (if possible).
     *
     *If a user encounters the `InsufficientBond` error when calling this extrinsic,
     *they should call `chill` first in order to free up their bonded funds.
     *
     *Emits `Unbonded`.
     *
     *See also [`Call::withdraw_unbonded`].
     */
    "unbond": Anonymize<Ie5v6njpckr05b>;
    /**
     *Remove any unlocked chunks from the `unlocking` queue from our management.
     *
     *This essentially frees up that balance to be used by the stash account to do whatever
     *it wants.
     *
     *The dispatch origin for this call must be _Signed_ by the controller.
     *
     *Emits `Withdrawn`.
     *
     *See also [`Call::unbond`].
     *
     *## Parameters
     *
     *- `num_slashing_spans` indicates the number of metadata slashing spans to clear when
     *this call results in a complete removal of all the data related to the stash account.
     *In this case, the `num_slashing_spans` must be larger or equal to the number of
     *slashing spans associated with the stash account in the [`SlashingSpans`] storage type,
     *otherwise the call will fail. The call weight is directly proportional to
     *`num_slashing_spans`.
     *
     *## Complexity
     *O(S) where S is the number of slashing spans to remove
     *NOTE: Weight annotation is the kill scenario, we refund otherwise.
     */
    "withdraw_unbonded": Anonymize<I328av3j0bgmjb>;
    /**
     *Declare the desire to validate for the origin controller.
     *
     *Effects will be felt at the beginning of the next era.
     *
     *The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     */
    "validate": Anonymize<I4tuqm9ato907i>;
    /**
     *Declare the desire to nominate `targets` for the origin controller.
     *
     *Effects will be felt at the beginning of the next era.
     *
     *The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     *
     *## Complexity
     *- The transaction's complexity is proportional to the size of `targets` (N)
     *which is capped at CompactAssignments::LIMIT (T::MaxNominations).
     *- Both the reads and writes follow a similar pattern.
     */
    "nominate": Anonymize<Iagi89qt4h1lqg>;
    /**
     *Declare no desire to either validate or nominate.
     *
     *Effects will be felt at the beginning of the next era.
     *
     *The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     *
     *## Complexity
     *- Independent of the arguments. Insignificant complexity.
     *- Contains one read.
     *- Writes are limited to the `origin` account key.
     */
    "chill": undefined;
    /**
     *(Re-)set the payment target for a controller.
     *
     *Effects will be felt instantly (as soon as this function is completed successfully).
     *
     *The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     *
     *## Complexity
     *- O(1)
     *- Independent of the arguments. Insignificant complexity.
     *- Contains a limited number of reads.
     *- Writes are limited to the `origin` account key.
     *---------
     */
    "set_payee": Anonymize<I9dgmcnuamt5p8>;
    /**
     *(Re-)sets the controller of a stash to the stash itself. This function previously
     *accepted a `controller` argument to set the controller to an account other than the
     *stash itself. This functionality has now been removed, now only setting the controller
     *to the stash, if it is not already.
     *
     *Effects will be felt instantly (as soon as this function is completed successfully).
     *
     *The dispatch origin for this call must be _Signed_ by the stash, not the controller.
     *
     *## Complexity
     *O(1)
     *- Independent of the arguments. Insignificant complexity.
     *- Contains a limited number of reads.
     *- Writes are limited to the `origin` account key.
     */
    "set_controller": undefined;
    /**
     *Sets the ideal number of validators.
     *
     *The dispatch origin must be Root.
     *
     *## Complexity
     *O(1)
     */
    "set_validator_count": Anonymize<I3vh014cqgmrfd>;
    /**
     *Increments the ideal number of validators up to maximum of
     *`ElectionProviderBase::MaxWinners`.
     *
     *The dispatch origin must be Root.
     *
     *## Complexity
     *Same as [`Self::set_validator_count`].
     */
    "increase_validator_count": Anonymize<Ifhs60omlhvt3>;
    /**
     *Scale up the ideal number of validators by a factor up to maximum of
     *`ElectionProviderBase::MaxWinners`.
     *
     *The dispatch origin must be Root.
     *
     *## Complexity
     *Same as [`Self::set_validator_count`].
     */
    "scale_validator_count": Anonymize<If34udpd5e57vi>;
    /**
     *Force there to be no new eras indefinitely.
     *
     *The dispatch origin must be Root.
     *
     *# Warning
     *
     *The election process starts multiple blocks before the end of the era.
     *Thus the election process may be ongoing when this is called. In this case the
     *election will continue until the next era is triggered.
     *
     *## Complexity
     *- No arguments.
     *- Weight: O(1)
     */
    "force_no_eras": undefined;
    /**
     *Force there to be a new era at the end of the next session. After this, it will be
     *reset to normal (non-forced) behaviour.
     *
     *The dispatch origin must be Root.
     *
     *# Warning
     *
     *The election process starts multiple blocks before the end of the era.
     *If this is called just before a new era is triggered, the election process may not
     *have enough blocks to get a result.
     *
     *## Complexity
     *- No arguments.
     *- Weight: O(1)
     */
    "force_new_era": undefined;
    /**
     *Set the validators who cannot be slashed (if any).
     *
     *The dispatch origin must be Root.
     */
    "set_invulnerables": Anonymize<I39t01nnod9109>;
    /**
     *Force a current staker to become completely unstaked, immediately.
     *
     *The dispatch origin must be Root.
     *
     *## Parameters
     *
     *- `num_slashing_spans`: Refer to comments on [`Call::withdraw_unbonded`] for more
     *details.
     */
    "force_unstake": Anonymize<Ie5vbnd9198quk>;
    /**
     *Force there to be a new era at the end of sessions indefinitely.
     *
     *The dispatch origin must be Root.
     *
     *# Warning
     *
     *The election process starts multiple blocks before the end of the era.
     *If this is called just before a new era is triggered, the election process may not
     *have enough blocks to get a result.
     */
    "force_new_era_always": undefined;
    /**
     *Cancel enactment of a deferred slash.
     *
     *Can be called by the `T::AdminOrigin`.
     *
     *Parameters: era and indices of the slashes for that era to kill.
     */
    "cancel_deferred_slash": Anonymize<I3h6murn8bd4v5>;
    /**
     *Pay out next page of the stakers behind a validator for the given era.
     *
     *- `validator_stash` is the stash account of the validator.
     *- `era` may be any era between `[current_era - history_depth; current_era]`.
     *
     *The origin of this call must be _Signed_. Any account can call this function, even if
     *it is not one of the stakers.
     *
     *The reward payout could be paged in case there are too many nominators backing the
     *`validator_stash`. This call will payout unpaid pages in an ascending order. To claim a
     *specific page, use `payout_stakers_by_page`.`
     *
     *If all pages are claimed, it returns an error `InvalidPage`.
     */
    "payout_stakers": Anonymize<I6k6jf8ncesuu3>;
    /**
     *Rebond a portion of the stash scheduled to be unlocked.
     *
     *The dispatch origin must be signed by the controller.
     *
     *## Complexity
     *- Time complexity: O(L), where L is unlocking chunks
     *- Bounded by `MaxUnlockingChunks`.
     */
    "rebond": Anonymize<Ie5v6njpckr05b>;
    /**
     *Remove all data structures concerning a staker/stash once it is at a state where it can
     *be considered `dust` in the staking system. The requirements are:
     *
     *1. the `total_balance` of the stash is below existential deposit.
     *2. or, the `ledger.total` of the stash is below existential deposit.
     *3. or, existential deposit is zero and either `total_balance` or `ledger.total` is zero.
     *
     *The former can happen in cases like a slash; the latter when a fully unbonded account
     *is still receiving staking rewards in `RewardDestination::Staked`.
     *
     *It can be called by anyone, as long as `stash` meets the above requirements.
     *
     *Refunds the transaction fees upon successful execution.
     *
     *## Parameters
     *
     *- `num_slashing_spans`: Refer to comments on [`Call::withdraw_unbonded`] for more
     *details.
     */
    "reap_stash": Anonymize<Ie5vbnd9198quk>;
    /**
     *Remove the given nominations from the calling validator.
     *
     *Effects will be felt at the beginning of the next era.
     *
     *The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     *
     *- `who`: A list of nominator stash accounts who are nominating this validator which
     *  should no longer be nominating this validator.
     *
     *Note: Making this call only makes sense if you first set the validator preferences to
     *block any further nominations.
     */
    "kick": Anonymize<I3qhk481i120pk>;
    /**
     *Update the various staking configurations .
     *
     ** `min_nominator_bond`: The minimum active bond needed to be a nominator.
     ** `min_validator_bond`: The minimum active bond needed to be a validator.
     ** `max_nominator_count`: The max number of users who can be a nominator at once. When
     *  set to `None`, no limit is enforced.
     ** `max_validator_count`: The max number of users who can be a validator at once. When
     *  set to `None`, no limit is enforced.
     ** `chill_threshold`: The ratio of `max_nominator_count` or `max_validator_count` which
     *  should be filled in order for the `chill_other` transaction to work.
     ** `min_commission`: The minimum amount of commission that each validators must maintain.
     *  This is checked only upon calling `validate`. Existing validators are not affected.
     *
     *RuntimeOrigin must be Root to call this function.
     *
     *NOTE: Existing nominators and validators will not be affected by this update.
     *to kick people under the new limits, `chill_other` should be called.
     */
    "set_staking_configs": Anonymize<If1qr0kbbl298c>;
    /**
     *Declare a `controller` to stop participating as either a validator or nominator.
     *
     *Effects will be felt at the beginning of the next era.
     *
     *The dispatch origin for this call must be _Signed_, but can be called by anyone.
     *
     *If the caller is the same as the controller being targeted, then no further checks are
     *enforced, and this function behaves just like `chill`.
     *
     *If the caller is different than the controller being targeted, the following conditions
     *must be met:
     *
     ** `controller` must belong to a nominator who has become non-decodable,
     *
     *Or:
     *
     ** A `ChillThreshold` must be set and checked which defines how close to the max
     *  nominators or validators we must reach before users can start chilling one-another.
     ** A `MaxNominatorCount` and `MaxValidatorCount` must be set which is used to determine
     *  how close we are to the threshold.
     ** A `MinNominatorBond` and `MinValidatorBond` must be set and checked, which determines
     *  if this is a person that should be chilled because they have not met the threshold
     *  bond required.
     *
     *This can be helpful if bond requirements are updated, and we need to remove old users
     *who do not satisfy these requirements.
     */
    "chill_other": Anonymize<Idl3umm12u5pa>;
    /**
     *Force a validator to have at least the minimum commission. This will not affect a
     *validator who already has a commission greater than or equal to the minimum. Any account
     *can call this.
     */
    "force_apply_min_commission": Anonymize<I5ont0141q9ss5>;
    /**
     *Sets the minimum amount of commission that each validators must maintain.
     *
     *This call has lower privilege requirements than `set_staking_config` and can be called
     *by the `T::AdminOrigin`. Root can always call this.
     */
    "set_min_commission": Anonymize<I3vh014cqgmrfd>;
    /**
     *Pay out a page of the stakers behind a validator for the given era and page.
     *
     *- `validator_stash` is the stash account of the validator.
     *- `era` may be any era between `[current_era - history_depth; current_era]`.
     *- `page` is the page index of nominators to pay out with value between 0 and
     *  `num_nominators / T::MaxExposurePageSize`.
     *
     *The origin of this call must be _Signed_. Any account can call this function, even if
     *it is not one of the stakers.
     *
     *If a validator has more than [`Config::MaxExposurePageSize`] nominators backing
     *them, then the list of nominators is paged, with each page being capped at
     *[`Config::MaxExposurePageSize`.] If a validator has more than one page of nominators,
     *the call needs to be made for each page separately in order for all the nominators
     *backing a validator to receive the reward. The nominators are not sorted across pages
     *and so it should not be assumed the highest staker would be on the topmost page and vice
     *versa. If rewards are not claimed in [`Config::HistoryDepth`] eras, they are lost.
     */
    "payout_stakers_by_page": Anonymize<Ie6j49utvii126>;
    /**
     *Migrates an account's `RewardDestination::Controller` to
     *`RewardDestination::Account(controller)`.
     *
     *Effects will be felt instantly (as soon as this function is completed successfully).
     *
     *This will waive the transaction fee if the `payee` is successfully migrated.
     */
    "update_payee": Anonymize<I3v6ks33uluhnj>;
    /**
     *Updates a batch of controller accounts to their corresponding stash account if they are
     *not the same. Ignores any controller accounts that do not exist, and does not operate if
     *the stash and controller are already the same.
     *
     *Effects will be felt instantly (as soon as this function is completed successfully).
     *
     *The dispatch origin must be `T::AdminOrigin`.
     */
    "deprecate_controller_batch": Anonymize<I3kiiim1cds68i>;
    /**
     *Restores the state of a ledger which is in an inconsistent state.
     *
     *The requirements to restore a ledger are the following:
     ** The stash is bonded; or
     ** The stash is not bonded but it has a staking lock left behind; or
     ** If the stash has an associated ledger and its state is inconsistent; or
     ** If the ledger is not corrupted *but* its staking lock is out of sync.
     *
     *The `maybe_*` input parameters will overwrite the corresponding data and metadata of the
     *ledger associated with the stash. If the input parameters are not set, the ledger will
     *be reset values from on-chain state.
     */
    "restore_ledger": Anonymize<I4k60mkh2r6jjg>;
}>;
export type I2eip8tc75dpje = {
    "value": bigint;
    "payee": StakingRewardDestination;
};
export type I564va64vtidbq = {
    "max_additional": bigint;
};
export type I328av3j0bgmjb = {
    "num_slashing_spans": number;
};
export type I4tuqm9ato907i = {
    "prefs": Anonymize<I9o7ssi9vmhmgr>;
};
export type Iagi89qt4h1lqg = {
    "targets": Anonymize<I28gn91b2ttnbk>;
};
export type I28gn91b2ttnbk = Array<MultiAddress>;
export type I9dgmcnuamt5p8 = {
    "payee": StakingRewardDestination;
};
export type I3vh014cqgmrfd = {
    "new": number;
};
export type Ifhs60omlhvt3 = {
    "additional": number;
};
export type If34udpd5e57vi = {
    "factor": number;
};
export type I39t01nnod9109 = {
    "invulnerables": Anonymize<Ia2lhg7l2hilo3>;
};
export type Ie5vbnd9198quk = {
    "stash": SS58String;
    "num_slashing_spans": number;
};
export type I3h6murn8bd4v5 = {
    "era": number;
    "slash_indices": Anonymize<Icgljjb6j82uhn>;
};
export type I6k6jf8ncesuu3 = {
    "validator_stash": SS58String;
    "era": number;
};
export type I3qhk481i120pk = {
    "who": Anonymize<I28gn91b2ttnbk>;
};
export type If1qr0kbbl298c = {
    "min_nominator_bond": StakingPalletConfigOpBig;
    "min_validator_bond": StakingPalletConfigOpBig;
    "max_nominator_count": StakingPalletConfigOp;
    "max_validator_count": StakingPalletConfigOp;
    "chill_threshold": StakingPalletConfigOp;
    "min_commission": StakingPalletConfigOp;
    "max_staked_rewards": StakingPalletConfigOp;
};
export type StakingPalletConfigOpBig = Enum<{
    "Noop": undefined;
    "Set": bigint;
    "Remove": undefined;
}>;
export declare const StakingPalletConfigOpBig: GetEnum<StakingPalletConfigOpBig>;
export type StakingPalletConfigOp = Enum<{
    "Noop": undefined;
    "Set": number;
    "Remove": undefined;
}>;
export declare const StakingPalletConfigOp: GetEnum<StakingPalletConfigOp>;
export type I5ont0141q9ss5 = {
    "validator_stash": SS58String;
};
export type Ie6j49utvii126 = {
    "validator_stash": SS58String;
    "era": number;
    "page": number;
};
export type I3v6ks33uluhnj = {
    "controller": SS58String;
};
export type I3kiiim1cds68i = {
    "controllers": Anonymize<Ia2lhg7l2hilo3>;
};
export type I4k60mkh2r6jjg = {
    "stash": SS58String;
    "maybe_controller"?: Anonymize<Ihfphjolmsqq1>;
    "maybe_total"?: Anonymize<I35p85j063s0il>;
    "maybe_unlocking"?: Anonymize<I7m7tbddr7qika>;
};
export type I7m7tbddr7qika = (Anonymize<I9nc4v1upo2c8e>) | undefined;
export type Iceajactc9a8pc = AnonymousEnum<{
    /**
     *Sets the session key(s) of the function caller to `keys`.
     *Allows an account to set its session key prior to becoming a validator.
     *This doesn't take effect until the next session.
     *
     *The dispatch origin of this function must be signed.
     *
     *## Complexity
     *- `O(1)`. Actual cost depends on the number of length of `T::Keys::key_ids()` which is
     *  fixed.
     */
    "set_keys": Anonymize<I5oi8saufice6j>;
    /**
     *Removes any session key(s) of the function caller.
     *
     *This doesn't take effect until the next session.
     *
     *The dispatch origin of this function must be Signed and the account must be either be
     *convertible to a validator ID using the chain's typical addressing system (this usually
     *means being a controller account) or directly convertible into a validator ID (which
     *usually means being a stash account).
     *
     *## Complexity
     *- `O(1)` in number of key types. Actual cost depends on the number of length of
     *  `T::Keys::key_ids()` which is fixed.
     */
    "purge_keys": undefined;
}>;
export type I5oi8saufice6j = {
    "keys": Anonymize<I9kr8cseidc66h>;
    "proof": Binary;
};
export type I5u9ggmn8umfqm = AnonymousEnum<{
    /**
     *Report voter equivocation/misbehavior. This method will verify the
     *equivocation proof and validate the given key ownership proof
     *against the extracted offender. If both are valid, the offence
     *will be reported.
     */
    "report_equivocation": Anonymize<I7ne83r38c2sqq>;
    /**
     *Report voter equivocation/misbehavior. This method will verify the
     *equivocation proof and validate the given key ownership proof
     *against the extracted offender. If both are valid, the offence
     *will be reported.
     *
     *This extrinsic must be called unsigned and it is expected that only
     *block authors will call it (validated in `ValidateUnsigned`), as such
     *if the block author is defined it will be defined as the equivocation
     *reporter.
     */
    "report_equivocation_unsigned": Anonymize<I7ne83r38c2sqq>;
    /**
     *Note that the current authority set of the GRANDPA finality gadget has stalled.
     *
     *This will trigger a forced authority set change at the beginning of the next session, to
     *be enacted `delay` blocks after that. The `delay` should be high enough to safely assume
     *that the block signalling the forced change will not be re-orged e.g. 1000 blocks.
     *The block production rate (which may be slowed down because of finality lagging) should
     *be taken into account when choosing the `delay`. The GRANDPA voters based on the new
     *authority will start voting on top of `best_finalized_block_number` for new finalized
     *blocks. `best_finalized_block_number` should be the highest of the latest finalized
     *block of all validators of the new authority set.
     *
     *Only callable by root.
     */
    "note_stalled": Anonymize<I2hviml3snvhhn>;
}>;
export type I7ne83r38c2sqq = {
    "equivocation_proof": Anonymize<I9puqgoda8ofk4>;
    "key_owner_proof": Anonymize<I3ia7aufsoj0l1>;
};
export type I9puqgoda8ofk4 = {
    "set_id": bigint;
    "equivocation": GrandpaEquivocation;
};
export type GrandpaEquivocation = Enum<{
    "Prevote": Anonymize<Iffg6i636v53qr>;
    "Precommit": Anonymize<Iffg6i636v53qr>;
}>;
export declare const GrandpaEquivocation: GetEnum<GrandpaEquivocation>;
export type Iffg6i636v53qr = {
    "round_number": bigint;
    "identity": FixedSizeBinary<32>;
    "first": Anonymize<Iam04b2ivtl2nh>;
    "second": Anonymize<Iam04b2ivtl2nh>;
};
export type Iam04b2ivtl2nh = [Anonymize<I8e06chr1md241>, FixedSizeBinary<64>];
export type I8e06chr1md241 = {
    "target_hash": FixedSizeBinary<32>;
    "target_number": number;
};
export type I2hviml3snvhhn = {
    "delay": number;
    "best_finalized_block_number": number;
};
export type I1s28h18nhih63 = AnonymousEnum<{
    /**
     *Propose and approve a spend of treasury funds.
     *
     *## Dispatch Origin
     *
     *Must be [`Config::SpendOrigin`] with the `Success` value being at least `amount`.
     *
     *### Details
     *NOTE: For record-keeping purposes, the proposer is deemed to be equivalent to the
     *beneficiary.
     *
     *### Parameters
     *- `amount`: The amount to be transferred from the treasury to the `beneficiary`.
     *- `beneficiary`: The destination account for the transfer.
     *
     *## Events
     *
     *Emits [`Event::SpendApproved`] if successful.
     */
    "spend_local": Anonymize<Icnrv1mfbd3in1>;
    /**
     *Force a previously approved proposal to be removed from the approval queue.
     *
     *## Dispatch Origin
     *
     *Must be [`Config::RejectOrigin`].
     *
     *## Details
     *
     *The original deposit will no longer be returned.
     *
     *### Parameters
     *- `proposal_id`: The index of a proposal
     *
     *### Complexity
     *- O(A) where `A` is the number of approvals
     *
     *### Errors
     *- [`Error::ProposalNotApproved`]: The `proposal_id` supplied was not found in the
     *  approval queue, i.e., the proposal has not been approved. This could also mean the
     *  proposal does not exist altogether, thus there is no way it would have been approved
     *  in the first place.
     */
    "remove_approval": Anonymize<Icm9m0qeemu66d>;
    /**
     *Propose and approve a spend of treasury funds.
     *
     *## Dispatch Origin
     *
     *Must be [`Config::SpendOrigin`] with the `Success` value being at least
     *`amount` of `asset_kind` in the native asset. The amount of `asset_kind` is converted
     *for assertion using the [`Config::BalanceConverter`].
     *
     *## Details
     *
     *Create an approved spend for transferring a specific `amount` of `asset_kind` to a
     *designated beneficiary. The spend must be claimed using the `payout` dispatchable within
     *the [`Config::PayoutPeriod`].
     *
     *### Parameters
     *- `asset_kind`: An indicator of the specific asset class to be spent.
     *- `amount`: The amount to be transferred from the treasury to the `beneficiary`.
     *- `beneficiary`: The beneficiary of the spend.
     *- `valid_from`: The block number from which the spend can be claimed. It can refer to
     *  the past if the resulting spend has not yet expired according to the
     *  [`Config::PayoutPeriod`]. If `None`, the spend can be claimed immediately after
     *  approval.
     *
     *## Events
     *
     *Emits [`Event::AssetSpendApproved`] if successful.
     */
    "spend": Anonymize<Ibv74ul0c0qf0f>;
    /**
     *Claim a spend.
     *
     *## Dispatch Origin
     *
     *Must be signed
     *
     *## Details
     *
     *Spends must be claimed within some temporal bounds. A spend may be claimed within one
     *[`Config::PayoutPeriod`] from the `valid_from` block.
     *In case of a payout failure, the spend status must be updated with the `check_status`
     *dispatchable before retrying with the current function.
     *
     *### Parameters
     *- `index`: The spend index.
     *
     *## Events
     *
     *Emits [`Event::Paid`] if successful.
     */
    "payout": Anonymize<I666bl2fqjkejo>;
    /**
     *Check the status of the spend and remove it from the storage if processed.
     *
     *## Dispatch Origin
     *
     *Must be signed.
     *
     *## Details
     *
     *The status check is a prerequisite for retrying a failed payout.
     *If a spend has either succeeded or expired, it is removed from the storage by this
     *function. In such instances, transaction fees are refunded.
     *
     *### Parameters
     *- `index`: The spend index.
     *
     *## Events
     *
     *Emits [`Event::PaymentFailed`] if the spend payout has failed.
     *Emits [`Event::SpendProcessed`] if the spend payout has succeed.
     */
    "check_status": Anonymize<I666bl2fqjkejo>;
    /**
     *Void previously approved spend.
     *
     *## Dispatch Origin
     *
     *Must be [`Config::RejectOrigin`].
     *
     *## Details
     *
     *A spend void is only possible if the payout has not been attempted yet.
     *
     *### Parameters
     *- `index`: The spend index.
     *
     *## Events
     *
     *Emits [`Event::AssetSpendVoided`] if successful.
     */
    "void_spend": Anonymize<I666bl2fqjkejo>;
}>;
export type Icnrv1mfbd3in1 = {
    "amount": bigint;
    "beneficiary": MultiAddress;
};
export type Icm9m0qeemu66d = {
    "proposal_id": number;
};
export type Ibv74ul0c0qf0f = {
    "asset_kind": VersionedLocatableAsset;
    "amount": bigint;
    "beneficiary": DotXcmVersionedLocation;
    "valid_from"?: Anonymize<I4arjljr6dpflb>;
};
export type Ie5kd08tutk56t = AnonymousEnum<{
    /**
     *Vote in a poll. If `vote.is_aye()`, the vote is to enact the proposal;
     *otherwise it is a vote to keep the status quo.
     *
     *The dispatch origin of this call must be _Signed_.
     *
     *- `poll_index`: The index of the poll to vote for.
     *- `vote`: The vote configuration.
     *
     *Weight: `O(R)` where R is the number of polls the voter has voted on.
     */
    "vote": Anonymize<Idnsr2pndm36h0>;
    /**
     *Delegate the voting power (with some given conviction) of the sending account for a
     *particular class of polls.
     *
     *The balance delegated is locked for as long as it's delegated, and thereafter for the
     *time appropriate for the conviction's lock period.
     *
     *The dispatch origin of this call must be _Signed_, and the signing account must either:
     *  - be delegating already; or
     *  - have no voting activity (if there is, then it will need to be removed through
     *    `remove_vote`).
     *
     *- `to`: The account whose voting the `target` account's voting power will follow.
     *- `class`: The class of polls to delegate. To delegate multiple classes, multiple calls
     *  to this function are required.
     *- `conviction`: The conviction that will be attached to the delegated votes. When the
     *  account is undelegated, the funds will be locked for the corresponding period.
     *- `balance`: The amount of the account's balance to be used in delegating. This must not
     *  be more than the account's current balance.
     *
     *Emits `Delegated`.
     *
     *Weight: `O(R)` where R is the number of polls the voter delegating to has
     *  voted on. Weight is initially charged as if maximum votes, but is refunded later.
     */
    "delegate": Anonymize<Ia1pvdcbhuqf8m>;
    /**
     *Undelegate the voting power of the sending account for a particular class of polls.
     *
     *Tokens may be unlocked following once an amount of time consistent with the lock period
     *of the conviction with which the delegation was issued has passed.
     *
     *The dispatch origin of this call must be _Signed_ and the signing account must be
     *currently delegating.
     *
     *- `class`: The class of polls to remove the delegation from.
     *
     *Emits `Undelegated`.
     *
     *Weight: `O(R)` where R is the number of polls the voter delegating to has
     *  voted on. Weight is initially charged as if maximum votes, but is refunded later.
     */
    "undelegate": Anonymize<I8steo882k7qns>;
    /**
     *Remove the lock caused by prior voting/delegating which has expired within a particular
     *class.
     *
     *The dispatch origin of this call must be _Signed_.
     *
     *- `class`: The class of polls to unlock.
     *- `target`: The account to remove the lock on.
     *
     *Weight: `O(R)` with R number of vote of target.
     */
    "unlock": Anonymize<I4pa4q37gj6fua>;
    /**
     *Remove a vote for a poll.
     *
     *If:
     *- the poll was cancelled, or
     *- the poll is ongoing, or
     *- the poll has ended such that
     *  - the vote of the account was in opposition to the result; or
     *  - there was no conviction to the account's vote; or
     *  - the account made a split vote
     *...then the vote is removed cleanly and a following call to `unlock` may result in more
     *funds being available.
     *
     *If, however, the poll has ended and:
     *- it finished corresponding to the vote of the account, and
     *- the account made a standard vote with conviction, and
     *- the lock period of the conviction is not over
     *...then the lock will be aggregated into the overall account's lock, which may involve
     **overlocking* (where the two locks are combined into a single lock that is the maximum
     *of both the amount locked and the time is it locked for).
     *
     *The dispatch origin of this call must be _Signed_, and the signer must have a vote
     *registered for poll `index`.
     *
     *- `index`: The index of poll of the vote to be removed.
     *- `class`: Optional parameter, if given it indicates the class of the poll. For polls
     *  which have finished or are cancelled, this must be `Some`.
     *
     *Weight: `O(R + log R)` where R is the number of polls that `target` has voted on.
     *  Weight is calculated for the maximum number of vote.
     */
    "remove_vote": Anonymize<I5f178ab6b89t3>;
    /**
     *Remove a vote for a poll.
     *
     *If the `target` is equal to the signer, then this function is exactly equivalent to
     *`remove_vote`. If not equal to the signer, then the vote must have expired,
     *either because the poll was cancelled, because the voter lost the poll or
     *because the conviction period is over.
     *
     *The dispatch origin of this call must be _Signed_.
     *
     *- `target`: The account of the vote to be removed; this account must have voted for poll
     *  `index`.
     *- `index`: The index of poll of the vote to be removed.
     *- `class`: The class of the poll.
     *
     *Weight: `O(R + log R)` where R is the number of polls that `target` has voted on.
     *  Weight is calculated for the maximum number of vote.
     */
    "remove_other_vote": Anonymize<I4nakhtbsk3c5s>;
}>;
export type Idnsr2pndm36h0 = {
    "poll_index": number;
    "vote": ConvictionVotingVoteAccountVote;
};
export type Ia1pvdcbhuqf8m = {
    "class": number;
    "to": MultiAddress;
    "conviction": VotingConviction;
    "balance": bigint;
};
export type I8steo882k7qns = {
    "class": number;
};
export type I4pa4q37gj6fua = {
    "class": number;
    "target": MultiAddress;
};
export type I5f178ab6b89t3 = {
    "class"?: Anonymize<I4arjljr6dpflb>;
    "index": number;
};
export type I4nakhtbsk3c5s = {
    "target": MultiAddress;
    "class": number;
    "index": number;
};
export type I657vbelok0a1m = AnonymousEnum<{
    /**
     *Propose a referendum on a privileged action.
     *
     *- `origin`: must be `SubmitOrigin` and the account must have `SubmissionDeposit` funds
     *  available.
     *- `proposal_origin`: The origin from which the proposal should be executed.
     *- `proposal`: The proposal.
     *- `enactment_moment`: The moment that the proposal should be enacted.
     *
     *Emits `Submitted`.
     */
    "submit": Anonymize<Ici1c3ahlkpcj1>;
    /**
     *Post the Decision Deposit for a referendum.
     *
     *- `origin`: must be `Signed` and the account must have funds available for the
     *  referendum's track's Decision Deposit.
     *- `index`: The index of the submitted referendum whose Decision Deposit is yet to be
     *  posted.
     *
     *Emits `DecisionDepositPlaced`.
     */
    "place_decision_deposit": Anonymize<I666bl2fqjkejo>;
    /**
     *Refund the Decision Deposit for a closed referendum back to the depositor.
     *
     *- `origin`: must be `Signed` or `Root`.
     *- `index`: The index of a closed referendum whose Decision Deposit has not yet been
     *  refunded.
     *
     *Emits `DecisionDepositRefunded`.
     */
    "refund_decision_deposit": Anonymize<I666bl2fqjkejo>;
    /**
     *Cancel an ongoing referendum.
     *
     *- `origin`: must be the `CancelOrigin`.
     *- `index`: The index of the referendum to be cancelled.
     *
     *Emits `Cancelled`.
     */
    "cancel": Anonymize<I666bl2fqjkejo>;
    /**
     *Cancel an ongoing referendum and slash the deposits.
     *
     *- `origin`: must be the `KillOrigin`.
     *- `index`: The index of the referendum to be cancelled.
     *
     *Emits `Killed` and `DepositSlashed`.
     */
    "kill": Anonymize<I666bl2fqjkejo>;
    /**
     *Advance a referendum onto its next logical state. Only used internally.
     *
     *- `origin`: must be `Root`.
     *- `index`: the referendum to be advanced.
     */
    "nudge_referendum": Anonymize<I666bl2fqjkejo>;
    /**
     *Advance a track onto its next logical state. Only used internally.
     *
     *- `origin`: must be `Root`.
     *- `track`: the track to be advanced.
     *
     *Action item for when there is now one fewer referendum in the deciding phase and the
     *`DecidingCount` is not yet updated. This means that we should either:
     *- begin deciding another referendum (and leave `DecidingCount` alone); or
     *- decrement `DecidingCount`.
     */
    "one_fewer_deciding": Anonymize<Icbio0e1f0034b>;
    /**
     *Refund the Submission Deposit for a closed referendum back to the depositor.
     *
     *- `origin`: must be `Signed` or `Root`.
     *- `index`: The index of a closed referendum whose Submission Deposit has not yet been
     *  refunded.
     *
     *Emits `SubmissionDepositRefunded`.
     */
    "refund_submission_deposit": Anonymize<I666bl2fqjkejo>;
    /**
     *Set or clear metadata of a referendum.
     *
     *Parameters:
     *- `origin`: Must be `Signed` by a creator of a referendum or by anyone to clear a
     *  metadata of a finished referendum.
     *- `index`:  The index of a referendum to set or clear metadata for.
     *- `maybe_hash`: The hash of an on-chain stored preimage. `None` to clear a metadata.
     */
    "set_metadata": Anonymize<I8c0vkqjjipnuj>;
}>;
export type Ici1c3ahlkpcj1 = {
    "proposal_origin": PolkadotRuntimeOriginCaller;
    "proposal": PreimagesBounded;
    "enactment_moment": TraitsScheduleDispatchTime;
};
export type Icbio0e1f0034b = {
    "track": number;
};
export type I8c0vkqjjipnuj = {
    "index": number;
    "maybe_hash"?: Anonymize<I4s6vifaf8k998>;
};
export type I970d74tbkf661 = AnonymousEnum<{
    "whitelist_call": Anonymize<I1adbcfi5uc62r>;
    "remove_whitelisted_call": Anonymize<I1adbcfi5uc62r>;
    "dispatch_whitelisted_call": Anonymize<Ibf6ucefn8fh49>;
    "dispatch_whitelisted_call_with_preimage": Anonymize<I77087oirkh329>;
}>;
export type Ibf6ucefn8fh49 = {
    "call_hash": FixedSizeBinary<32>;
    "call_encoded_len": number;
    "call_weight_witness": Anonymize<I4q39t5hn830vp>;
};
export type I77087oirkh329 = {
    "call": TxCallData;
};
export type Ic5v5ffa0cr70p = AnonymousEnum<{
    /**
     *Set the value of a parameter.
     *
     *The dispatch origin of this call must be `AdminOrigin` for the given `key`. Values be
     *deleted by setting them to `None`.
     */
    "set_parameter": Anonymize<I9j2r9vmc9atsu>;
}>;
export type I9j2r9vmc9atsu = {
    "key_value": Anonymize<I7slmng9jp7jrk>;
};
export type I7slmng9jp7jrk = AnonymousEnum<{
    "Inflation": Anonymize<I5t0545elr3mi1>;
}>;
export type I5t0545elr3mi1 = AnonymousEnum<{
    "MinInflation": Anonymize<Ia023ofm66k1pj>;
    "MaxInflation": Anonymize<Ia023ofm66k1pj>;
    "IdealStake": Anonymize<Ia023ofm66k1pj>;
    "Falloff": Anonymize<Ia023ofm66k1pj>;
    "UseAuctionSlots": Anonymize<I4801gitve39vo>;
}>;
export type Ia023ofm66k1pj = FixedSizeArray<1, Anonymize<I35p85j063s0il>>;
export type I4801gitve39vo = FixedSizeArray<1, Anonymize<I8ie0dco0kcuq5>>;
export type Id0dj18ct09hlp = AnonymousEnum<{
    /**
     *Make a claim to collect your DOTs.
     *
     *The dispatch origin for this call must be _None_.
     *
     *Unsigned Validation:
     *A call to claim is deemed valid if the signature provided matches
     *the expected signed message of:
     *
     *> Ethereum Signed Message:
     *> (configured prefix string)(address)
     *
     *and `address` matches the `dest` account.
     *
     *Parameters:
     *- `dest`: The destination account to payout the claim.
     *- `ethereum_signature`: The signature of an ethereum signed message matching the format
     *  described above.
     *
     *<weight>
     *The weight of this call is invariant over the input parameters.
     *Weight includes logic to validate unsigned `claim` call.
     *
     *Total Complexity: O(1)
     *</weight>
     */
    "claim": Anonymize<I6uag8j5aql8q>;
    /**
     *Mint a new claim to collect DOTs.
     *
     *The dispatch origin for this call must be _Root_.
     *
     *Parameters:
     *- `who`: The Ethereum address allowed to collect this claim.
     *- `value`: The number of DOTs that will be claimed.
     *- `vesting_schedule`: An optional vesting schedule for these DOTs.
     *
     *<weight>
     *The weight of this call is invariant over the input parameters.
     *We assume worst case that both vesting and statement is being inserted.
     *
     *Total Complexity: O(1)
     *</weight>
     */
    "mint_claim": Anonymize<Isq3k9rh2c0l4>;
    /**
     *Make a claim to collect your DOTs by signing a statement.
     *
     *The dispatch origin for this call must be _None_.
     *
     *Unsigned Validation:
     *A call to `claim_attest` is deemed valid if the signature provided matches
     *the expected signed message of:
     *
     *> Ethereum Signed Message:
     *> (configured prefix string)(address)(statement)
     *
     *and `address` matches the `dest` account; the `statement` must match that which is
     *expected according to your purchase arrangement.
     *
     *Parameters:
     *- `dest`: The destination account to payout the claim.
     *- `ethereum_signature`: The signature of an ethereum signed message matching the format
     *  described above.
     *- `statement`: The identity of the statement which is being attested to in the
     *  signature.
     *
     *<weight>
     *The weight of this call is invariant over the input parameters.
     *Weight includes logic to validate unsigned `claim_attest` call.
     *
     *Total Complexity: O(1)
     *</weight>
     */
    "claim_attest": Anonymize<I1dqiovk0tpoah>;
    /**
     *Attest to a statement, needed to finalize the claims process.
     *
     *WARNING: Insecure unless your chain includes `PrevalidateAttests` as a
     *`SignedExtension`.
     *
     *Unsigned Validation:
     *A call to attest is deemed valid if the sender has a `Preclaim` registered
     *and provides a `statement` which is expected for the account.
     *
     *Parameters:
     *- `statement`: The identity of the statement which is being attested to in the
     *  signature.
     *
     *<weight>
     *The weight of this call is invariant over the input parameters.
     *Weight includes logic to do pre-validation on `attest` call.
     *
     *Total Complexity: O(1)
     *</weight>
     */
    "attest": Anonymize<I1ntko0oih7v1a>;
    "move_claim": Anonymize<I2tf5qmg09624f>;
}>;
export type I6uag8j5aql8q = {
    "dest": SS58String;
    "ethereum_signature": FixedSizeBinary<65>;
};
export type Isq3k9rh2c0l4 = {
    "who": FixedSizeBinary<20>;
    "value": bigint;
    "vesting_schedule"?: Anonymize<I70kqehrkegc98>;
    "statement"?: Anonymize<I6sveo21kq8jed>;
};
export type I70kqehrkegc98 = (Anonymize<I2phecamkn3pej>) | undefined;
export type I6sveo21kq8jed = (ClaimsStatementKind) | undefined;
export type I1dqiovk0tpoah = {
    "dest": SS58String;
    "ethereum_signature": FixedSizeBinary<65>;
    "statement": Binary;
};
export type I1ntko0oih7v1a = {
    "statement": Binary;
};
export type I2tf5qmg09624f = {
    "old": FixedSizeBinary<20>;
    "new": FixedSizeBinary<20>;
    "maybe_preclaim"?: Anonymize<Ihfphjolmsqq1>;
};
export type Icgf8vmtkbnu4u = AnonymousEnum<{
    /**
     *Unlock any vested funds of the sender account.
     *
     *The dispatch origin for this call must be _Signed_ and the sender must have funds still
     *locked under this pallet.
     *
     *Emits either `VestingCompleted` or `VestingUpdated`.
     *
     *## Complexity
     *- `O(1)`.
     */
    "vest": undefined;
    /**
     *Unlock any vested funds of a `target` account.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `target`: The account whose vested funds should be unlocked. Must have funds still
     *locked under this pallet.
     *
     *Emits either `VestingCompleted` or `VestingUpdated`.
     *
     *## Complexity
     *- `O(1)`.
     */
    "vest_other": Anonymize<Id9uqtigc0il3v>;
    /**
     *Create a vested transfer.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `target`: The account receiving the vested funds.
     *- `schedule`: The vesting schedule attached to the transfer.
     *
     *Emits `VestingCreated`.
     *
     *NOTE: This will unlock all schedules through the current block.
     *
     *## Complexity
     *- `O(1)`.
     */
    "vested_transfer": Anonymize<Iaa2o6cgjdpdn5>;
    /**
     *Force a vested transfer.
     *
     *The dispatch origin for this call must be _Root_.
     *
     *- `source`: The account whose funds should be transferred.
     *- `target`: The account that should be transferred the vested funds.
     *- `schedule`: The vesting schedule attached to the transfer.
     *
     *Emits `VestingCreated`.
     *
     *NOTE: This will unlock all schedules through the current block.
     *
     *## Complexity
     *- `O(1)`.
     */
    "force_vested_transfer": Anonymize<Iam6hrl7ptd85l>;
    /**
     *Merge two vesting schedules together, creating a new vesting schedule that unlocks over
     *the highest possible start and end blocks. If both schedules have already started the
     *current block will be used as the schedule start; with the caveat that if one schedule
     *is finished by the current block, the other will be treated as the new merged schedule,
     *unmodified.
     *
     *NOTE: If `schedule1_index == schedule2_index` this is a no-op.
     *NOTE: This will unlock all schedules through the current block prior to merging.
     *NOTE: If both schedules have ended by the current block, no new schedule will be created
     *and both will be removed.
     *
     *Merged schedule attributes:
     *- `starting_block`: `MAX(schedule1.starting_block, scheduled2.starting_block,
     *  current_block)`.
     *- `ending_block`: `MAX(schedule1.ending_block, schedule2.ending_block)`.
     *- `locked`: `schedule1.locked_at(current_block) + schedule2.locked_at(current_block)`.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `schedule1_index`: index of the first schedule to merge.
     *- `schedule2_index`: index of the second schedule to merge.
     */
    "merge_schedules": Anonymize<Ict9ivhr2c5hv0>;
    /**
     *Force remove a vesting schedule
     *
     *The dispatch origin for this call must be _Root_.
     *
     *- `target`: An account that has a vesting schedule
     *- `schedule_index`: The vesting schedule index that should be removed
     */
    "force_remove_vesting_schedule": Anonymize<I8t4vv03357lk9>;
}>;
export type Id9uqtigc0il3v = {
    "target": MultiAddress;
};
export type Iaa2o6cgjdpdn5 = {
    "target": MultiAddress;
    "schedule": Anonymize<I4aro1m78pdrtt>;
};
export type Iam6hrl7ptd85l = {
    "source": MultiAddress;
    "target": MultiAddress;
    "schedule": Anonymize<I4aro1m78pdrtt>;
};
export type Ict9ivhr2c5hv0 = {
    "schedule1_index": number;
    "schedule2_index": number;
};
export type I8t4vv03357lk9 = {
    "target": MultiAddress;
    "schedule_index": number;
};
export type I9ot6q9gmurbqj = AnonymousEnum<{
    /**
     *Send a batch of dispatch calls.
     *
     *May be called from any origin except `None`.
     *
     *- `calls`: The calls to be dispatched from the same origin. The number of call must not
     *  exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     *If origin is root then the calls are dispatched without checking origin filter. (This
     *includes bypassing `frame_system::Config::BaseCallFilter`).
     *
     *## Complexity
     *- O(C) where C is the number of calls to be batched.
     *
     *This will return `Ok` in all circumstances. To determine the success of the batch, an
     *event is deposited. If a call failed and the batch was interrupted, then the
     *`BatchInterrupted` event is deposited, along with the number of successful calls made
     *and the error of the failed call. If all were successful, then the `BatchCompleted`
     *event is deposited.
     */
    "batch": Anonymize<I2d0r9q7g2cm99>;
    /**
     *Send a call through an indexed pseudonym of the sender.
     *
     *Filter from origin are passed along. The call will be dispatched with an origin which
     *use the same filter as the origin of this call.
     *
     *NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
     *because you expect `proxy` to have been used prior in the call stack and you do not want
     *the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
     *in the Multisig pallet instead.
     *
     *NOTE: Prior to version *12, this was called `as_limited_sub`.
     *
     *The dispatch origin for this call must be _Signed_.
     */
    "as_derivative": Anonymize<I3fek2uacie2dd>;
    /**
     *Send a batch of dispatch calls and atomically execute them.
     *The whole transaction will rollback and fail if any of the calls failed.
     *
     *May be called from any origin except `None`.
     *
     *- `calls`: The calls to be dispatched from the same origin. The number of call must not
     *  exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     *If origin is root then the calls are dispatched without checking origin filter. (This
     *includes bypassing `frame_system::Config::BaseCallFilter`).
     *
     *## Complexity
     *- O(C) where C is the number of calls to be batched.
     */
    "batch_all": Anonymize<I2d0r9q7g2cm99>;
    /**
     *Dispatches a function call with a provided origin.
     *
     *The dispatch origin for this call must be _Root_.
     *
     *## Complexity
     *- O(1).
     */
    "dispatch_as": Anonymize<If87292opriu11>;
    /**
     *Send a batch of dispatch calls.
     *Unlike `batch`, it allows errors and won't interrupt.
     *
     *May be called from any origin except `None`.
     *
     *- `calls`: The calls to be dispatched from the same origin. The number of call must not
     *  exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     *If origin is root then the calls are dispatch without checking origin filter. (This
     *includes bypassing `frame_system::Config::BaseCallFilter`).
     *
     *## Complexity
     *- O(C) where C is the number of calls to be batched.
     */
    "force_batch": Anonymize<I2d0r9q7g2cm99>;
    /**
     *Dispatch a function call with a specified weight.
     *
     *This function does not check the weight of the call, and instead allows the
     *Root origin to specify the weight of the call.
     *
     *The dispatch origin for this call must be _Root_.
     */
    "with_weight": Anonymize<I5mundj2cf4hhs>;
}>;
export type I2d0r9q7g2cm99 = {
    "calls": Anonymize<Iee7lqefolamj3>;
};
export type Iee7lqefolamj3 = Array<TxCallData>;
export type I3fek2uacie2dd = {
    "index": number;
    "call": TxCallData;
};
export type If87292opriu11 = {
    "as_origin": PolkadotRuntimeOriginCaller;
    "call": TxCallData;
};
export type I5mundj2cf4hhs = {
    "call": TxCallData;
    "weight": Anonymize<I4q39t5hn830vp>;
};
export type Iu0ohu4lbha45 = AnonymousEnum<{
    /**
     *Dispatch the given `call` from an account that the sender is authorised for through
     *`add_proxy`.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `real`: The account that the proxy will make a call on behalf of.
     *- `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *- `call`: The call to be made by the `real` account.
     */
    "proxy": Anonymize<Ia5fuanmi4lveu>;
    /**
     *Register a proxy account for the sender that is able to make calls on its behalf.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `proxy`: The account that the `caller` would like to make a proxy.
     *- `proxy_type`: The permissions allowed for this proxy account.
     *- `delay`: The announcement period required of the initial proxy. Will generally be
     *zero.
     */
    "add_proxy": Anonymize<Ifhl1ihpl9i99m>;
    /**
     *Unregister a proxy account for the sender.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `proxy`: The account that the `caller` would like to remove as a proxy.
     *- `proxy_type`: The permissions currently enabled for the removed proxy account.
     */
    "remove_proxy": Anonymize<Ifhl1ihpl9i99m>;
    /**
     *Unregister all proxy accounts for the sender.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *WARNING: This may be called on accounts created by `pure`, however if done, then
     *the unreserved fees will be inaccessible. **All access to this account will be lost.**
     */
    "remove_proxies": undefined;
    /**
     *Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
     *initialize it with a proxy of `proxy_type` for `origin` sender.
     *
     *Requires a `Signed` origin.
     *
     *- `proxy_type`: The type of the proxy that the sender will be registered as over the
     *new account. This will almost always be the most permissive `ProxyType` possible to
     *allow for maximum flexibility.
     *- `index`: A disambiguation index, in case this is called multiple times in the same
     *transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
     *want to use `0`.
     *- `delay`: The announcement period required of the initial proxy. Will generally be
     *zero.
     *
     *Fails with `Duplicate` if this has already been called in this transaction, from the
     *same sender, with the same parameters.
     *
     *Fails if there are insufficient funds to pay for deposit.
     */
    "create_pure": Anonymize<Iav2q7hjio8n98>;
    /**
     *Removes a previously spawned pure proxy.
     *
     *WARNING: **All access to this account will be lost.** Any funds held in it will be
     *inaccessible.
     *
     *Requires a `Signed` origin, and the sender account must have been created by a call to
     *`pure` with corresponding parameters.
     *
     *- `spawner`: The account that originally called `pure` to create this account.
     *- `index`: The disambiguation index originally passed to `pure`. Probably `0`.
     *- `proxy_type`: The proxy type originally passed to `pure`.
     *- `height`: The height of the chain when the call to `pure` was processed.
     *- `ext_index`: The extrinsic index in which the call to `pure` was processed.
     *
     *Fails with `NoPermission` in case the caller is not a previously created pure
     *account whose `pure` call has corresponding parameters.
     */
    "kill_pure": Anonymize<I1m2ifb0h8d0r8>;
    /**
     *Publish the hash of a proxy-call that will be made in the future.
     *
     *This must be called some number of blocks before the corresponding `proxy` is attempted
     *if the delay associated with the proxy relationship is greater than zero.
     *
     *No more than `MaxPending` announcements may be made at any one time.
     *
     *This will take a deposit of `AnnouncementDepositFactor` as well as
     *`AnnouncementDepositBase` if there are no other pending announcements.
     *
     *The dispatch origin for this call must be _Signed_ and a proxy of `real`.
     *
     *Parameters:
     *- `real`: The account that the proxy will make a call on behalf of.
     *- `call_hash`: The hash of the call to be made by the `real` account.
     */
    "announce": Anonymize<I2eb501t8s6hsq>;
    /**
     *Remove a given announcement.
     *
     *May be called by a proxy account to remove a call they previously announced and return
     *the deposit.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `real`: The account that the proxy will make a call on behalf of.
     *- `call_hash`: The hash of the call to be made by the `real` account.
     */
    "remove_announcement": Anonymize<I2eb501t8s6hsq>;
    /**
     *Remove the given announcement of a delegate.
     *
     *May be called by a target (proxied) account to remove a call that one of their delegates
     *(`delegate`) has announced they want to execute. The deposit is returned.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `delegate`: The account that previously announced the call.
     *- `call_hash`: The hash of the call to be made.
     */
    "reject_announcement": Anonymize<Ianmuoljk2sk1u>;
    /**
     *Dispatch the given `call` from an account that the sender is authorized for through
     *`add_proxy`.
     *
     *Removes any corresponding announcement(s).
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `real`: The account that the proxy will make a call on behalf of.
     *- `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *- `call`: The call to be made by the `real` account.
     */
    "proxy_announced": Anonymize<Iab8tq4jvqftue>;
}>;
export type Ia5fuanmi4lveu = {
    "real": MultiAddress;
    "force_proxy_type"?: Anonymize<Ict2klpa3v9sc0>;
    "call": TxCallData;
};
export type Ict2klpa3v9sc0 = (Anonymize<Ib9ifr8gu9ttks>) | undefined;
export type Ifhl1ihpl9i99m = {
    "delegate": MultiAddress;
    "proxy_type": Anonymize<Ib9ifr8gu9ttks>;
    "delay": number;
};
export type Iav2q7hjio8n98 = {
    "proxy_type": Anonymize<Ib9ifr8gu9ttks>;
    "delay": number;
    "index": number;
};
export type I1m2ifb0h8d0r8 = {
    "spawner": MultiAddress;
    "proxy_type": Anonymize<Ib9ifr8gu9ttks>;
    "index": number;
    "height": number;
    "ext_index": number;
};
export type I2eb501t8s6hsq = {
    "real": MultiAddress;
    "call_hash": FixedSizeBinary<32>;
};
export type Ianmuoljk2sk1u = {
    "delegate": MultiAddress;
    "call_hash": FixedSizeBinary<32>;
};
export type Iab8tq4jvqftue = {
    "delegate": MultiAddress;
    "real": MultiAddress;
    "force_proxy_type"?: Anonymize<Ict2klpa3v9sc0>;
    "call": TxCallData;
};
export type I80k2ri69bimod = AnonymousEnum<{
    /**
     *Immediately dispatch a multi-signature call using a single approval from the caller.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `other_signatories`: The accounts (other than the sender) who are part of the
     *multi-signature, but do not participate in the approval process.
     *- `call`: The call to be executed.
     *
     *Result is equivalent to the dispatched result.
     *
     *## Complexity
     *O(Z + C) where Z is the length of the call and C its execution weight.
     */
    "as_multi_threshold_1": Anonymize<I9tdu4rgc5k1b>;
    /**
     *Register approval for a dispatch to be made from a deterministic composite account if
     *approved by a total of `threshold - 1` of `other_signatories`.
     *
     *If there are enough, then dispatch the call.
     *
     *Payment: `DepositBase` will be reserved if this is the first approval, plus
     *`threshold` times `DepositFactor`. It is returned once this dispatch happens or
     *is cancelled.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `threshold`: The total number of approvals for this dispatch before it is executed.
     *- `other_signatories`: The accounts (other than the sender) who can approve this
     *dispatch. May not be empty.
     *- `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
     *not the first approval, then it must be `Some`, with the timepoint (block number and
     *transaction index) of the first approval transaction.
     *- `call`: The call to be executed.
     *
     *NOTE: Unless this is the final approval, you will generally want to use
     *`approve_as_multi` instead, since it only requires a hash of the call.
     *
     *Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
     *on success, result is `Ok` and the result from the interior call, if it was executed,
     *may be found in the deposited `MultisigExecuted` event.
     *
     *## Complexity
     *- `O(S + Z + Call)`.
     *- Up to one balance-reserve or unreserve operation.
     *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
     *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     *- One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
     *- One encode & hash, both of complexity `O(S)`.
     *- Up to one binary search and insert (`O(logS + S)`).
     *- I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
     *- One event.
     *- The weight of the `call`.
     *- Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
     *  taken for its lifetime of `DepositBase + threshold * DepositFactor`.
     */
    "as_multi": Anonymize<I6q5208tn6ph2e>;
    /**
     *Register approval for a dispatch to be made from a deterministic composite account if
     *approved by a total of `threshold - 1` of `other_signatories`.
     *
     *Payment: `DepositBase` will be reserved if this is the first approval, plus
     *`threshold` times `DepositFactor`. It is returned once this dispatch happens or
     *is cancelled.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `threshold`: The total number of approvals for this dispatch before it is executed.
     *- `other_signatories`: The accounts (other than the sender) who can approve this
     *dispatch. May not be empty.
     *- `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
     *not the first approval, then it must be `Some`, with the timepoint (block number and
     *transaction index) of the first approval transaction.
     *- `call_hash`: The hash of the call to be executed.
     *
     *NOTE: If this is the final approval, you will want to use `as_multi` instead.
     *
     *## Complexity
     *- `O(S)`.
     *- Up to one balance-reserve or unreserve operation.
     *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
     *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     *- One encode & hash, both of complexity `O(S)`.
     *- Up to one binary search and insert (`O(logS + S)`).
     *- I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
     *- One event.
     *- Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
     *  taken for its lifetime of `DepositBase + threshold * DepositFactor`.
     */
    "approve_as_multi": Anonymize<Ideaemvoneh309>;
    /**
     *Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
     *for this operation will be unreserved on success.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `threshold`: The total number of approvals for this dispatch before it is executed.
     *- `other_signatories`: The accounts (other than the sender) who can approve this
     *dispatch. May not be empty.
     *- `timepoint`: The timepoint (block number and transaction index) of the first approval
     *transaction for this dispatch.
     *- `call_hash`: The hash of the call to be executed.
     *
     *## Complexity
     *- `O(S)`.
     *- Up to one balance-reserve or unreserve operation.
     *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
     *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     *- One encode & hash, both of complexity `O(S)`.
     *- One event.
     *- I/O: 1 read `O(S)`, one remove.
     *- Storage: removes one item.
     */
    "cancel_as_multi": Anonymize<I3d9o9d7epp66v>;
}>;
export type I9tdu4rgc5k1b = {
    "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
    "call": TxCallData;
};
export type I6q5208tn6ph2e = {
    "threshold": number;
    "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
    "maybe_timepoint"?: Anonymize<I95jfd8j5cr5eh>;
    "call": TxCallData;
    "max_weight": Anonymize<I4q39t5hn830vp>;
};
export type I95jfd8j5cr5eh = (Anonymize<Itvprrpb0nm3o>) | undefined;
export type Ideaemvoneh309 = {
    "threshold": number;
    "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
    "maybe_timepoint"?: Anonymize<I95jfd8j5cr5eh>;
    "call_hash": FixedSizeBinary<32>;
    "max_weight": Anonymize<I4q39t5hn830vp>;
};
export type I3d9o9d7epp66v = {
    "threshold": number;
    "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
    "timepoint": Anonymize<Itvprrpb0nm3o>;
    "call_hash": FixedSizeBinary<32>;
};
export type I91kpi5kjh9on2 = AnonymousEnum<{
    /**
     *Propose a new bounty.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Payment: `TipReportDepositBase` will be reserved from the origin account, as well as
     *`DataDepositPerByte` for each byte in `reason`. It will be unreserved upon approval,
     *or slashed when rejected.
     *
     *- `curator`: The curator account whom will manage this bounty.
     *- `fee`: The curator fee.
     *- `value`: The total payment amount of this bounty, curator fee included.
     *- `description`: The description of this bounty.
     */
    "propose_bounty": Anonymize<I2a839vbf5817q>;
    /**
     *Approve a bounty proposal. At a later time, the bounty will be funded and become active
     *and the original deposit will be returned.
     *
     *May only be called from `T::SpendOrigin`.
     *
     *## Complexity
     *- O(1).
     */
    "approve_bounty": Anonymize<Ia9p5bg6p18r0i>;
    /**
     *Propose a curator to a funded bounty.
     *
     *May only be called from `T::SpendOrigin`.
     *
     *## Complexity
     *- O(1).
     */
    "propose_curator": Anonymize<I42bqh279uf7oa>;
    /**
     *Unassign curator from a bounty.
     *
     *This function can only be called by the `RejectOrigin` a signed origin.
     *
     *If this function is called by the `RejectOrigin`, we assume that the curator is
     *malicious or inactive. As a result, we will slash the curator when possible.
     *
     *If the origin is the curator, we take this as a sign they are unable to do their job and
     *they willingly give up. We could slash them, but for now we allow them to recover their
     *deposit and exit without issue. (We may want to change this if it is abused.)
     *
     *Finally, the origin can be anyone if and only if the curator is "inactive". This allows
     *anyone in the community to call out that a curator is not doing their due diligence, and
     *we should pick a new curator. In this case the curator should also be slashed.
     *
     *## Complexity
     *- O(1).
     */
    "unassign_curator": Anonymize<Ia9p5bg6p18r0i>;
    /**
     *Accept the curator role for a bounty.
     *A deposit will be reserved from curator and refund upon successful payout.
     *
     *May only be called from the curator.
     *
     *## Complexity
     *- O(1).
     */
    "accept_curator": Anonymize<Ia9p5bg6p18r0i>;
    /**
     *Award bounty to a beneficiary account. The beneficiary will be able to claim the funds
     *after a delay.
     *
     *The dispatch origin for this call must be the curator of this bounty.
     *
     *- `bounty_id`: Bounty ID to award.
     *- `beneficiary`: The beneficiary account whom will receive the payout.
     *
     *## Complexity
     *- O(1).
     */
    "award_bounty": Anonymize<I4p6v96cffstms>;
    /**
     *Claim the payout from an awarded bounty after payout delay.
     *
     *The dispatch origin for this call must be the beneficiary of this bounty.
     *
     *- `bounty_id`: Bounty ID to claim.
     *
     *## Complexity
     *- O(1).
     */
    "claim_bounty": Anonymize<Ia9p5bg6p18r0i>;
    /**
     *Cancel a proposed or active bounty. All the funds will be sent to treasury and
     *the curator deposit will be unreserved if possible.
     *
     *Only `T::RejectOrigin` is able to cancel a bounty.
     *
     *- `bounty_id`: Bounty ID to cancel.
     *
     *## Complexity
     *- O(1).
     */
    "close_bounty": Anonymize<Ia9p5bg6p18r0i>;
    /**
     *Extend the expiry time of an active bounty.
     *
     *The dispatch origin for this call must be the curator of this bounty.
     *
     *- `bounty_id`: Bounty ID to extend.
     *- `remark`: additional information.
     *
     *## Complexity
     *- O(1).
     */
    "extend_bounty_expiry": Anonymize<I90n6nnkpdahrh>;
}>;
export type I2a839vbf5817q = {
    "value": bigint;
    "description": Binary;
};
export type I42bqh279uf7oa = {
    "bounty_id": number;
    "curator": MultiAddress;
    "fee": bigint;
};
export type I4p6v96cffstms = {
    "bounty_id": number;
    "beneficiary": MultiAddress;
};
export type I90n6nnkpdahrh = {
    "bounty_id": number;
    "remark": Binary;
};
export type I1b6drdhvt5hl9 = AnonymousEnum<{
    /**
     *Add a new child-bounty.
     *
     *The dispatch origin for this call must be the curator of parent
     *bounty and the parent bounty must be in "active" state.
     *
     *Child-bounty gets added successfully & fund gets transferred from
     *parent bounty to child-bounty account, if parent bounty has enough
     *funds, else the call fails.
     *
     *Upper bound to maximum number of active  child bounties that can be
     *added are managed via runtime trait config
     *[`Config::MaxActiveChildBountyCount`].
     *
     *If the call is success, the status of child-bounty is updated to
     *"Added".
     *
     *- `parent_bounty_id`: Index of parent bounty for which child-bounty is being added.
     *- `value`: Value for executing the proposal.
     *- `description`: Text description for the child-bounty.
     */
    "add_child_bounty": Anonymize<I8mk5kjgn02hi8>;
    /**
     *Propose curator for funded child-bounty.
     *
     *The dispatch origin for this call must be curator of parent bounty.
     *
     *Parent bounty must be in active state, for this child-bounty call to
     *work.
     *
     *Child-bounty must be in "Added" state, for processing the call. And
     *state of child-bounty is moved to "CuratorProposed" on successful
     *call completion.
     *
     *- `parent_bounty_id`: Index of parent bounty.
     *- `child_bounty_id`: Index of child bounty.
     *- `curator`: Address of child-bounty curator.
     *- `fee`: payment fee to child-bounty curator for execution.
     */
    "propose_curator": Anonymize<Ieqvq91sbe02ko>;
    /**
     *Accept the curator role for the child-bounty.
     *
     *The dispatch origin for this call must be the curator of this
     *child-bounty.
     *
     *A deposit will be reserved from the curator and refund upon
     *successful payout or cancellation.
     *
     *Fee for curator is deducted from curator fee of parent bounty.
     *
     *Parent bounty must be in active state, for this child-bounty call to
     *work.
     *
     *Child-bounty must be in "CuratorProposed" state, for processing the
     *call. And state of child-bounty is moved to "Active" on successful
     *call completion.
     *
     *- `parent_bounty_id`: Index of parent bounty.
     *- `child_bounty_id`: Index of child bounty.
     */
    "accept_curator": Anonymize<I2gr10p66od9ch>;
    /**
     *Unassign curator from a child-bounty.
     *
     *The dispatch origin for this call can be either `RejectOrigin`, or
     *the curator of the parent bounty, or any signed origin.
     *
     *For the origin other than T::RejectOrigin and the child-bounty
     *curator, parent bounty must be in active state, for this call to
     *work. We allow child-bounty curator and T::RejectOrigin to execute
     *this call irrespective of the parent bounty state.
     *
     *If this function is called by the `RejectOrigin` or the
     *parent bounty curator, we assume that the child-bounty curator is
     *malicious or inactive. As a result, child-bounty curator deposit is
     *slashed.
     *
     *If the origin is the child-bounty curator, we take this as a sign
     *that they are unable to do their job, and are willingly giving up.
     *We could slash the deposit, but for now we allow them to unreserve
     *their deposit and exit without issue. (We may want to change this if
     *it is abused.)
     *
     *Finally, the origin can be anyone iff the child-bounty curator is
     *"inactive". Expiry update due of parent bounty is used to estimate
     *inactive state of child-bounty curator.
     *
     *This allows anyone in the community to call out that a child-bounty
     *curator is not doing their due diligence, and we should pick a new
     *one. In this case the child-bounty curator deposit is slashed.
     *
     *State of child-bounty is moved to Added state on successful call
     *completion.
     *
     *- `parent_bounty_id`: Index of parent bounty.
     *- `child_bounty_id`: Index of child bounty.
     */
    "unassign_curator": Anonymize<I2gr10p66od9ch>;
    /**
     *Award child-bounty to a beneficiary.
     *
     *The beneficiary will be able to claim the funds after a delay.
     *
     *The dispatch origin for this call must be the parent curator or
     *curator of this child-bounty.
     *
     *Parent bounty must be in active state, for this child-bounty call to
     *work.
     *
     *Child-bounty must be in active state, for processing the call. And
     *state of child-bounty is moved to "PendingPayout" on successful call
     *completion.
     *
     *- `parent_bounty_id`: Index of parent bounty.
     *- `child_bounty_id`: Index of child bounty.
     *- `beneficiary`: Beneficiary account.
     */
    "award_child_bounty": Anonymize<I9mcq66cm3gibo>;
    /**
     *Claim the payout from an awarded child-bounty after payout delay.
     *
     *The dispatch origin for this call may be any signed origin.
     *
     *Call works independent of parent bounty state, No need for parent
     *bounty to be in active state.
     *
     *The Beneficiary is paid out with agreed bounty value. Curator fee is
     *paid & curator deposit is unreserved.
     *
     *Child-bounty must be in "PendingPayout" state, for processing the
     *call. And instance of child-bounty is removed from the state on
     *successful call completion.
     *
     *- `parent_bounty_id`: Index of parent bounty.
     *- `child_bounty_id`: Index of child bounty.
     */
    "claim_child_bounty": Anonymize<I2gr10p66od9ch>;
    /**
     *Cancel a proposed or active child-bounty. Child-bounty account funds
     *are transferred to parent bounty account. The child-bounty curator
     *deposit may be unreserved if possible.
     *
     *The dispatch origin for this call must be either parent curator or
     *`T::RejectOrigin`.
     *
     *If the state of child-bounty is `Active`, curator deposit is
     *unreserved.
     *
     *If the state of child-bounty is `PendingPayout`, call fails &
     *returns `PendingPayout` error.
     *
     *For the origin other than T::RejectOrigin, parent bounty must be in
     *active state, for this child-bounty call to work. For origin
     *T::RejectOrigin execution is forced.
     *
     *Instance of child-bounty is removed from the state on successful
     *call completion.
     *
     *- `parent_bounty_id`: Index of parent bounty.
     *- `child_bounty_id`: Index of child bounty.
     */
    "close_child_bounty": Anonymize<I2gr10p66od9ch>;
}>;
export type I8mk5kjgn02hi8 = {
    "parent_bounty_id": number;
    "value": bigint;
    "description": Binary;
};
export type Ieqvq91sbe02ko = {
    "parent_bounty_id": number;
    "child_bounty_id": number;
    "curator": MultiAddress;
    "fee": bigint;
};
export type I2gr10p66od9ch = {
    "parent_bounty_id": number;
    "child_bounty_id": number;
};
export type I9mcq66cm3gibo = {
    "parent_bounty_id": number;
    "child_bounty_id": number;
    "beneficiary": MultiAddress;
};
export type I15soeogelbbbh = AnonymousEnum<{
    /**
     *Submit a solution for the unsigned phase.
     *
     *The dispatch origin fo this call must be __none__.
     *
     *This submission is checked on the fly. Moreover, this unsigned solution is only
     *validated when submitted to the pool from the **local** node. Effectively, this means
     *that only active validators can submit this transaction when authoring a block (similar
     *to an inherent).
     *
     *To prevent any incorrect solution (and thus wasted time/weight), this transaction will
     *panic if the solution submitted by the validator is invalid in any way, effectively
     *putting their authoring reward at risk.
     *
     *No deposit or reward is associated with this submission.
     */
    "submit_unsigned": Anonymize<I31k9f0jol8ko4>;
    /**
     *Set a new value for `MinimumUntrustedScore`.
     *
     *Dispatch origin must be aligned with `T::ForceOrigin`.
     *
     *This check can be turned off by setting the value to `None`.
     */
    "set_minimum_untrusted_score": Anonymize<I80q14um2s2ckg>;
    /**
     *Set a solution in the queue, to be handed out to the client of this pallet in the next
     *call to `ElectionProvider::elect`.
     *
     *This can only be set by `T::ForceOrigin`, and only when the phase is `Emergency`.
     *
     *The solution is not checked for any feasibility and is assumed to be trustworthy, as any
     *feasibility check itself can in principle cause the election process to fail (due to
     *memory/weight constrains).
     */
    "set_emergency_election_result": Anonymize<I5qs1t1erfi7u8>;
    /**
     *Submit a solution for the signed phase.
     *
     *The dispatch origin fo this call must be __signed__.
     *
     *The solution is potentially queued, based on the claimed score and processed at the end
     *of the signed phase.
     *
     *A deposit is reserved and recorded for the solution. Based on the outcome, the solution
     *might be rewarded, slashed, or get all or a part of the deposit back.
     */
    "submit": Anonymize<I9et13knvdvgpb>;
    /**
     *Trigger the governance fallback.
     *
     *This can only be called when [`Phase::Emergency`] is enabled, as an alternative to
     *calling [`Call::set_emergency_election_result`].
     */
    "governance_fallback": Anonymize<Ifsme8miqq9006>;
}>;
export type I31k9f0jol8ko4 = {
    "raw_solution": Anonymize<I7je4n92ump862>;
    "witness": Anonymize<Iasd2iat48n080>;
};
export type I80q14um2s2ckg = {
    "maybe_next_score"?: Anonymize<Iaebc5kcl654ln>;
};
export type Iaebc5kcl654ln = (Anonymize<I8s6n43okuj2b1>) | undefined;
export type I5qs1t1erfi7u8 = {
    "supports": Anonymize<I4bboqsv44evel>;
};
export type I9et13knvdvgpb = {
    "raw_solution": Anonymize<I7je4n92ump862>;
};
export type Ifsme8miqq9006 = {
    "maybe_max_voters"?: Anonymize<I4arjljr6dpflb>;
    "maybe_max_targets"?: Anonymize<I4arjljr6dpflb>;
};
export type Ifvfo1l0vu2o7e = AnonymousEnum<{
    /**
     *Declare that some `dislocated` account has, through rewards or penalties, sufficiently
     *changed its score that it should properly fall into a different bag than its current
     *one.
     *
     *Anyone can call this function about any potentially dislocated account.
     *
     *Will always update the stored score of `dislocated` to the correct score, based on
     *`ScoreProvider`.
     *
     *If `dislocated` does not exists, it returns an error.
     */
    "rebag": Anonymize<Id9js0aucdivjk>;
    /**
     *Move the caller's Id directly in front of `lighter`.
     *
     *The dispatch origin for this call must be _Signed_ and can only be called by the Id of
     *the account going in front of `lighter`. Fee is payed by the origin under all
     *circumstances.
     *
     *Only works if:
     *
     *- both nodes are within the same bag,
     *- and `origin` has a greater `Score` than `lighter`.
     */
    "put_in_front_of": Anonymize<I1vj3e1a62je3o>;
    /**
     *Same as [`Pallet::put_in_front_of`], but it can be called by anyone.
     *
     *Fee is paid by the origin under all circumstances.
     */
    "put_in_front_of_other": Anonymize<I6c1t14l6giceg>;
}>;
export type Id9js0aucdivjk = {
    "dislocated": MultiAddress;
};
export type I1vj3e1a62je3o = {
    "lighter": MultiAddress;
};
export type I6c1t14l6giceg = {
    "heavier": MultiAddress;
    "lighter": MultiAddress;
};
export type I57mljkkr28m9p = AnonymousEnum<{
    /**
     *Stake funds with a pool. The amount to bond is transferred from the member to the
     *pools account and immediately increases the pools bond.
     *
     *# Note
     *
     ** An account can only be a member of a single pool.
     ** An account cannot join the same pool multiple times.
     ** This call will *not* dust the member account, so the member must have at least
     *  `existential deposit + amount` in their account.
     ** Only a pool with [`PoolState::Open`] can be joined
     */
    "join": Anonymize<Ieg1oc56mamrl5>;
    /**
     *Bond `extra` more funds from `origin` into the pool to which they already belong.
     *
     *Additional funds can come from either the free balance of the account, of from the
     *accumulated rewards, see [`BondExtra`].
     *
     *Bonding extra funds implies an automatic payout of all pending rewards as well.
     *See `bond_extra_other` to bond pending rewards of `other` members.
     */
    "bond_extra": Anonymize<I2vu5vj7173ik9>;
    /**
     *A bonded member can use this to claim their payout based on the rewards that the pool
     *has accumulated since their last claimed payout (OR since joining if this is their first
     *time claiming rewards). The payout will be transferred to the member's account.
     *
     *The member will earn rewards pro rata based on the members stake vs the sum of the
     *members in the pools stake. Rewards do not "expire".
     *
     *See `claim_payout_other` to claim rewards on behalf of some `other` pool member.
     */
    "claim_payout": undefined;
    /**
     *Unbond up to `unbonding_points` of the `member_account`'s funds from the pool. It
     *implicitly collects the rewards one last time, since not doing so would mean some
     *rewards would be forfeited.
     *
     *Under certain conditions, this call can be dispatched permissionlessly (i.e. by any
     *account).
     *
     *# Conditions for a permissionless dispatch.
     *
     ** The pool is blocked and the caller is either the root or bouncer. This is refereed to
     *  as a kick.
     ** The pool is destroying and the member is not the depositor.
     ** The pool is destroying, the member is the depositor and no other members are in the
     *  pool.
     *
     *## Conditions for permissioned dispatch (i.e. the caller is also the
     *`member_account`):
     *
     ** The caller is not the depositor.
     ** The caller is the depositor, the pool is destroying and no other members are in the
     *  pool.
     *
     *# Note
     *
     *If there are too many unlocking chunks to unbond with the pool account,
     *[`Call::pool_withdraw_unbonded`] can be called to try and minimize unlocking chunks.
     *The [`StakingInterface::unbond`] will implicitly call [`Call::pool_withdraw_unbonded`]
     *to try to free chunks if necessary (ie. if unbound was called and no unlocking chunks
     *are available). However, it may not be possible to release the current unlocking chunks,
     *in which case, the result of this call will likely be the `NoMoreChunks` error from the
     *staking system.
     */
    "unbond": Anonymize<I6galqkn58q3bl>;
    /**
     *Call `withdraw_unbonded` for the pools account. This call can be made by any account.
     *
     *This is useful if there are too many unlocking chunks to call `unbond`, and some
     *can be cleared by withdrawing. In the case there are too many unlocking chunks, the user
     *would probably see an error like `NoMoreChunks` emitted from the staking system when
     *they attempt to unbond.
     */
    "pool_withdraw_unbonded": Anonymize<I36uoc8t9liv80>;
    /**
     *Withdraw unbonded funds from `member_account`. If no bonded funds can be unbonded, an
     *error is returned.
     *
     *Under certain conditions, this call can be dispatched permissionlessly (i.e. by any
     *account).
     *
     *# Conditions for a permissionless dispatch
     *
     ** The pool is in destroy mode and the target is not the depositor.
     ** The target is the depositor and they are the only member in the sub pools.
     ** The pool is blocked and the caller is either the root or bouncer.
     *
     *# Conditions for permissioned dispatch
     *
     ** The caller is the target and they are not the depositor.
     *
     *# Note
     *
     *- If the target is the depositor, the pool will be destroyed.
     *- If the pool has any pending slash, we also try to slash the member before letting them
     *withdraw. This calculation adds some weight overhead and is only defensive. In reality,
     *pool slashes must have been already applied via permissionless [`Call::apply_slash`].
     */
    "withdraw_unbonded": Anonymize<Ibunghsg9qa7f7>;
    /**
     *Create a new delegation pool.
     *
     *# Arguments
     *
     ** `amount` - The amount of funds to delegate to the pool. This also acts of a sort of
     *  deposit since the pools creator cannot fully unbond funds until the pool is being
     *  destroyed.
     ** `index` - A disambiguation index for creating the account. Likely only useful when
     *  creating multiple pools in the same extrinsic.
     ** `root` - The account to set as [`PoolRoles::root`].
     ** `nominator` - The account to set as the [`PoolRoles::nominator`].
     ** `bouncer` - The account to set as the [`PoolRoles::bouncer`].
     *
     *# Note
     *
     *In addition to `amount`, the caller will transfer the existential deposit; so the caller
     *needs at have at least `amount + existential_deposit` transferable.
     */
    "create": Anonymize<I8qnouj2c0igph>;
    /**
     *Create a new delegation pool with a previously used pool id
     *
     *# Arguments
     *
     *same as `create` with the inclusion of
     ** `pool_id` - `A valid PoolId.
     */
    "create_with_pool_id": Anonymize<Ic30e2k517a3ns>;
    /**
     *Nominate on behalf of the pool.
     *
     *The dispatch origin of this call must be signed by the pool nominator or the pool
     *root role.
     *
     *This directly forward the call to the staking pallet, on behalf of the pool bonded
     *account.
     *
     *# Note
     *
     *In addition to a `root` or `nominator` role of `origin`, pool's depositor needs to have
     *at least `depositor_min_bond` in the pool to start nominating.
     */
    "nominate": Anonymize<I47a2tsd2o2b1c>;
    /**
     *Set a new state for the pool.
     *
     *If a pool is already in the `Destroying` state, then under no condition can its state
     *change again.
     *
     *The dispatch origin of this call must be either:
     *
     *1. signed by the bouncer, or the root role of the pool,
     *2. if the pool conditions to be open are NOT met (as described by `ok_to_be_open`), and
     *   then the state of the pool can be permissionlessly changed to `Destroying`.
     */
    "set_state": Anonymize<Ifc9k1s0e9nv8e>;
    /**
     *Set a new metadata for the pool.
     *
     *The dispatch origin of this call must be signed by the bouncer, or the root role of the
     *pool.
     */
    "set_metadata": Anonymize<I4ihj26hl75e5p>;
    /**
     *Update configurations for the nomination pools. The origin for this call must be
     *[`Config::AdminOrigin`].
     *
     *# Arguments
     *
     ** `min_join_bond` - Set [`MinJoinBond`].
     ** `min_create_bond` - Set [`MinCreateBond`].
     ** `max_pools` - Set [`MaxPools`].
     ** `max_members` - Set [`MaxPoolMembers`].
     ** `max_members_per_pool` - Set [`MaxPoolMembersPerPool`].
     ** `global_max_commission` - Set [`GlobalMaxCommission`].
     */
    "set_configs": Anonymize<I2dl8ekhm2t22h>;
    /**
     *Update the roles of the pool.
     *
     *The root is the only entity that can change any of the roles, including itself,
     *excluding the depositor, who can never change.
     *
     *It emits an event, notifying UIs of the role change. This event is quite relevant to
     *most pool members and they should be informed of changes to pool roles.
     */
    "update_roles": Anonymize<I13us5e5h5645o>;
    /**
     *Chill on behalf of the pool.
     *
     *The dispatch origin of this call can be signed by the pool nominator or the pool
     *root role, same as [`Pallet::nominate`].
     *
     *Under certain conditions, this call can be dispatched permissionlessly (i.e. by any
     *account).
     *
     *# Conditions for a permissionless dispatch:
     ** When pool depositor has less than `MinNominatorBond` staked, otherwise  pool members
     *  are unable to unbond.
     *
     *# Conditions for permissioned dispatch:
     ** The caller has a nominator or root role of the pool.
     *This directly forward the call to the staking pallet, on behalf of the pool bonded
     *account.
     */
    "chill": Anonymize<I931cottvong90>;
    /**
     *`origin` bonds funds from `extra` for some pool member `member` into their respective
     *pools.
     *
     *`origin` can bond extra funds from free balance or pending rewards when `origin ==
     *other`.
     *
     *In the case of `origin != other`, `origin` can only bond extra pending rewards of
     *`other` members assuming set_claim_permission for the given member is
     *`PermissionlessCompound` or `PermissionlessAll`.
     */
    "bond_extra_other": Anonymize<I7sujb8gfvuo7n>;
    /**
     *Allows a pool member to set a claim permission to allow or disallow permissionless
     *bonding and withdrawing.
     *
     *# Arguments
     *
     ** `origin` - Member of a pool.
     ** `permission` - The permission to be applied.
     */
    "set_claim_permission": Anonymize<I1ors0vru14it3>;
    /**
     *`origin` can claim payouts on some pool member `other`'s behalf.
     *
     *Pool member `other` must have a `PermissionlessWithdraw` or `PermissionlessAll` claim
     *permission for this call to be successful.
     */
    "claim_payout_other": Anonymize<I40s11r8nagn2g>;
    /**
     *Set the commission of a pool.
     *Both a commission percentage and a commission payee must be provided in the `current`
     *tuple. Where a `current` of `None` is provided, any current commission will be removed.
     *
     *- If a `None` is supplied to `new_commission`, existing commission will be removed.
     */
    "set_commission": Anonymize<I6bjj87fr5g9nl>;
    /**
     *Set the maximum commission of a pool.
     *
     *- Initial max can be set to any `Perbill`, and only smaller values thereafter.
     *- Current commission will be lowered in the event it is higher than a new max
     *  commission.
     */
    "set_commission_max": Anonymize<I8cbluptqo8kbp>;
    /**
     *Set the commission change rate for a pool.
     *
     *Initial change rate is not bounded, whereas subsequent updates can only be more
     *restrictive than the current.
     */
    "set_commission_change_rate": Anonymize<I81cc4plffa1dm>;
    /**
     *Claim pending commission.
     *
     *The dispatch origin of this call must be signed by the `root` role of the pool. Pending
     *commission is paid out and added to total claimed commission`. Total pending commission
     *is reset to zero. the current.
     */
    "claim_commission": Anonymize<I931cottvong90>;
    /**
     *Top up the deficit or withdraw the excess ED from the pool.
     *
     *When a pool is created, the pool depositor transfers ED to the reward account of the
     *pool. ED is subject to change and over time, the deposit in the reward account may be
     *insufficient to cover the ED deficit of the pool or vice-versa where there is excess
     *deposit to the pool. This call allows anyone to adjust the ED deposit of the
     *pool by either topping up the deficit or claiming the excess.
     */
    "adjust_pool_deposit": Anonymize<I931cottvong90>;
    /**
     *Set or remove a pool's commission claim permission.
     *
     *Determines who can claim the pool's pending commission. Only the `Root` role of the pool
     *is able to configure commission claim permissions.
     */
    "set_commission_claim_permission": Anonymize<I3ihan8icf0c5k>;
    /**
     *Apply a pending slash on a member.
     *
     *Fails unless [`crate::pallet::Config::StakeAdapter`] is of strategy type:
     *[`adapter::StakeStrategyType::Delegate`].
     *
     *This call can be dispatched permissionlessly (i.e. by any account). If the member has
     *slash to be applied, caller may be rewarded with the part of the slash.
     */
    "apply_slash": Anonymize<I7ibh0fckqou49>;
    /**
     *Migrates delegated funds from the pool account to the `member_account`.
     *
     *Fails unless [`crate::pallet::Config::StakeAdapter`] is of strategy type:
     *[`adapter::StakeStrategyType::Delegate`].
     *
     *This is a permission-less call and refunds any fee if claim is successful.
     *
     *If the pool has migrated to delegation based staking, the staked tokens of pool members
     *can be moved and held in their own account. See [`adapter::DelegateStake`]
     */
    "migrate_delegation": Anonymize<I7ibh0fckqou49>;
    /**
     *Migrate pool from [`adapter::StakeStrategyType::Transfer`] to
     *[`adapter::StakeStrategyType::Delegate`].
     *
     *Fails unless [`crate::pallet::Config::StakeAdapter`] is of strategy type:
     *[`adapter::StakeStrategyType::Delegate`].
     *
     *This call can be dispatched permissionlessly, and refunds any fee if successful.
     *
     *If the pool has already migrated to delegation based staking, this call will fail.
     */
    "migrate_pool_to_delegate_stake": Anonymize<I931cottvong90>;
}>;
export type I2vu5vj7173ik9 = {
    "extra": NominationPoolsBondExtra;
};
export type NominationPoolsBondExtra = Enum<{
    "FreeBalance": bigint;
    "Rewards": undefined;
}>;
export declare const NominationPoolsBondExtra: GetEnum<NominationPoolsBondExtra>;
export type I6galqkn58q3bl = {
    "member_account": MultiAddress;
    "unbonding_points": bigint;
};
export type I36uoc8t9liv80 = {
    "pool_id": number;
    "num_slashing_spans": number;
};
export type Ibunghsg9qa7f7 = {
    "member_account": MultiAddress;
    "num_slashing_spans": number;
};
export type I8qnouj2c0igph = {
    "amount": bigint;
    "root": MultiAddress;
    "nominator": MultiAddress;
    "bouncer": MultiAddress;
};
export type Ic30e2k517a3ns = {
    "amount": bigint;
    "root": MultiAddress;
    "nominator": MultiAddress;
    "bouncer": MultiAddress;
    "pool_id": number;
};
export type I47a2tsd2o2b1c = {
    "pool_id": number;
    "validators": Anonymize<Ia2lhg7l2hilo3>;
};
export type Ifc9k1s0e9nv8e = {
    "pool_id": number;
    "state": NominationPoolsPoolState;
};
export type I4ihj26hl75e5p = {
    "pool_id": number;
    "metadata": Binary;
};
export type I2dl8ekhm2t22h = {
    "min_join_bond": StakingPalletConfigOpBig;
    "min_create_bond": StakingPalletConfigOpBig;
    "max_pools": StakingPalletConfigOp;
    "max_members": StakingPalletConfigOp;
    "max_members_per_pool": StakingPalletConfigOp;
    "global_max_commission": StakingPalletConfigOp;
};
export type I13us5e5h5645o = {
    "pool_id": number;
    "new_root": NominationPoolsConfigOp;
    "new_nominator": NominationPoolsConfigOp;
    "new_bouncer": NominationPoolsConfigOp;
};
export type NominationPoolsConfigOp = Enum<{
    "Noop": undefined;
    "Set": SS58String;
    "Remove": undefined;
}>;
export declare const NominationPoolsConfigOp: GetEnum<NominationPoolsConfigOp>;
export type I7sujb8gfvuo7n = {
    "member": MultiAddress;
    "extra": NominationPoolsBondExtra;
};
export type I1ors0vru14it3 = {
    "permission": NominationPoolsClaimPermission;
};
export type I40s11r8nagn2g = {
    "other": SS58String;
};
export type I6bjj87fr5g9nl = {
    "pool_id": number;
    "new_commission"?: Anonymize<Ie8iutm7u02lmj>;
};
export type I7ibh0fckqou49 = {
    "member_account": MultiAddress;
};
export type I44snhj1gahvrd = AnonymousEnum<{
    /**
     *Register oneself for fast-unstake.
     *
     *## Dispatch Origin
     *
     *The dispatch origin of this call must be *signed* by whoever is permitted to call
     *unbond funds by the staking system. See [`Config::Staking`].
     *
     *## Details
     *
     *The stash associated with the origin must have no ongoing unlocking chunks. If
     *successful, this will fully unbond and chill the stash. Then, it will enqueue the stash
     *to be checked in further blocks.
     *
     *If by the time this is called, the stash is actually eligible for fast-unstake, then
     *they are guaranteed to remain eligible, because the call will chill them as well.
     *
     *If the check works, the entire staking data is removed, i.e. the stash is fully
     *unstaked.
     *
     *If the check fails, the stash remains chilled and waiting for being unbonded as in with
     *the normal staking system, but they lose part of their unbonding chunks due to consuming
     *the chain's resources.
     *
     *## Events
     *
     *Some events from the staking and currency system might be emitted.
     */
    "register_fast_unstake": undefined;
    /**
     *Deregister oneself from the fast-unstake.
     *
     *## Dispatch Origin
     *
     *The dispatch origin of this call must be *signed* by whoever is permitted to call
     *unbond funds by the staking system. See [`Config::Staking`].
     *
     *## Details
     *
     *This is useful if one is registered, they are still waiting, and they change their mind.
     *
     *Note that the associated stash is still fully unbonded and chilled as a consequence of
     *calling [`Pallet::register_fast_unstake`]. Therefore, this should probably be followed
     *by a call to `rebond` in the staking system.
     *
     *## Events
     *
     *Some events from the staking and currency system might be emitted.
     */
    "deregister": undefined;
    /**
     *Control the operation of this pallet.
     *
     *## Dispatch Origin
     *
     *The dispatch origin of this call must be [`Config::ControlOrigin`].
     *
     *## Details
     *
     *Can set the number of eras to check per block, and potentially other admin work.
     *
     *## Events
     *
     *No events are emitted from this dispatch.
     */
    "control": Anonymize<I9j0ul7nh7b8jv>;
}>;
export type I9j0ul7nh7b8jv = {
    "eras_to_check": number;
};
export type Ia9ptue949ognv = AnonymousEnum<{
    /**
     *Set the validation upgrade cooldown.
     */
    "set_validation_upgrade_cooldown": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the validation upgrade delay.
     */
    "set_validation_upgrade_delay": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the acceptance period for an included candidate.
     */
    "set_code_retention_period": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the max validation code size for incoming upgrades.
     */
    "set_max_code_size": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the max POV block size for incoming upgrades.
     */
    "set_max_pov_size": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the max head data size for paras.
     */
    "set_max_head_data_size": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the number of coretime execution cores.
     *
     *NOTE: that this configuration is managed by the coretime chain. Only manually change
     *this, if you really know what you are doing!
     */
    "set_coretime_cores": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the max number of times a claim may timeout on a core before it is abandoned
     */
    "set_max_availability_timeouts": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the parachain validator-group rotation frequency
     */
    "set_group_rotation_frequency": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the availability period for paras.
     */
    "set_paras_availability_period": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the scheduling lookahead, in expected number of blocks at peak throughput.
     */
    "set_scheduling_lookahead": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the maximum number of validators to assign to any core.
     */
    "set_max_validators_per_core": Anonymize<Id581arok0b1nj>;
    /**
     *Set the maximum number of validators to use in parachain consensus.
     */
    "set_max_validators": Anonymize<Id581arok0b1nj>;
    /**
     *Set the dispute period, in number of sessions to keep for disputes.
     */
    "set_dispute_period": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the dispute post conclusion acceptance period.
     */
    "set_dispute_post_conclusion_acceptance_period": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the no show slots, in number of number of consensus slots.
     *Must be at least 1.
     */
    "set_no_show_slots": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the total number of delay tranches.
     */
    "set_n_delay_tranches": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the zeroth delay tranche width.
     */
    "set_zeroth_delay_tranche_width": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the number of validators needed to approve a block.
     */
    "set_needed_approvals": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the number of samples to do of the `RelayVRFModulo` approval assignment criterion.
     */
    "set_relay_vrf_modulo_samples": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the maximum items that can present in a upward dispatch queue at once.
     */
    "set_max_upward_queue_count": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the maximum total size of items that can present in a upward dispatch queue at
     *once.
     */
    "set_max_upward_queue_size": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the critical downward message size.
     */
    "set_max_downward_message_size": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the maximum size of an upward message that can be sent by a candidate.
     */
    "set_max_upward_message_size": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the maximum number of messages that a candidate can contain.
     */
    "set_max_upward_message_num_per_candidate": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the number of sessions after which an HRMP open channel request expires.
     */
    "set_hrmp_open_request_ttl": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the amount of funds that the sender should provide for opening an HRMP channel.
     */
    "set_hrmp_sender_deposit": Anonymize<I9jsikd1ghmc7l>;
    /**
     *Sets the amount of funds that the recipient should provide for accepting opening an HRMP
     *channel.
     */
    "set_hrmp_recipient_deposit": Anonymize<I9jsikd1ghmc7l>;
    /**
     *Sets the maximum number of messages allowed in an HRMP channel at once.
     */
    "set_hrmp_channel_max_capacity": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the maximum total size of messages in bytes allowed in an HRMP channel at once.
     */
    "set_hrmp_channel_max_total_size": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the maximum number of inbound HRMP channels a parachain is allowed to accept.
     */
    "set_hrmp_max_parachain_inbound_channels": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the maximum size of a message that could ever be put into an HRMP channel.
     */
    "set_hrmp_channel_max_message_size": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the maximum number of outbound HRMP channels a parachain is allowed to open.
     */
    "set_hrmp_max_parachain_outbound_channels": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the maximum number of outbound HRMP messages can be sent by a candidate.
     */
    "set_hrmp_max_message_num_per_candidate": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the number of session changes after which a PVF pre-checking voting is rejected.
     */
    "set_pvf_voting_ttl": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the minimum delay between announcing the upgrade block for a parachain until the
     *upgrade taking place.
     *
     *See the field documentation for information and constraints for the new value.
     */
    "set_minimum_validation_upgrade_delay": Anonymize<I3vh014cqgmrfd>;
    /**
     *Setting this to true will disable consistency checks for the configuration setters.
     *Use with caution.
     */
    "set_bypass_consistency_check": Anonymize<I2f6mha3v4ooda>;
    /**
     *Set the asynchronous backing parameters.
     */
    "set_async_backing_params": Anonymize<Iasqjdhasi408s>;
    /**
     *Set PVF executor parameters.
     */
    "set_executor_params": Anonymize<I6krn2lsleo87n>;
    /**
     *Set the on demand (parathreads) base fee.
     */
    "set_on_demand_base_fee": Anonymize<I9jsikd1ghmc7l>;
    /**
     *Set the on demand (parathreads) fee variability.
     */
    "set_on_demand_fee_variability": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the on demand (parathreads) queue max size.
     */
    "set_on_demand_queue_max_size": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the on demand (parathreads) fee variability.
     */
    "set_on_demand_target_queue_utilization": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the on demand (parathreads) ttl in the claimqueue.
     */
    "set_on_demand_ttl": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the minimum backing votes threshold.
     */
    "set_minimum_backing_votes": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set/Unset a node feature.
     */
    "set_node_feature": Anonymize<Iaid4btmkr5thp>;
    /**
     *Set approval-voting-params.
     */
    "set_approval_voting_params": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set scheduler-params.
     */
    "set_scheduler_params": Anonymize<I559fv6um7nmhd>;
}>;
export type Id581arok0b1nj = {
    "new"?: Anonymize<I4arjljr6dpflb>;
};
export type I9jsikd1ghmc7l = {
    "new": bigint;
};
export type I2f6mha3v4ooda = {
    "new": boolean;
};
export type Iasqjdhasi408s = {
    "new": Anonymize<Iavuvfkop6318c>;
};
export type I6krn2lsleo87n = {
    "new": Anonymize<I80rnntpog8qp6>;
};
export type Iaid4btmkr5thp = {
    "index": number;
    "value": boolean;
};
export type I559fv6um7nmhd = {
    "new": Anonymize<I555j7pvb27qd5>;
};
export type Id5l4f3jqtnb0u = AnonymousEnum<{
    /**
     *Enter the paras inherent. This will process bitfields and backed candidates.
     */
    "enter": Anonymize<Ibbf0j7ol2abrv>;
}>;
export type Ibbf0j7ol2abrv = {
    "data": Anonymize<Idog9jailvp00o>;
};
export type Idog9jailvp00o = {
    "bitfields": Anonymize<Ib0ijj1h4o8bcq>;
    "backed_candidates": Anonymize<I6n6fsk5rls02k>;
    "disputes": Anonymize<Ibt1op6l47p1r2>;
    "parent_header": Anonymize<Ic952bubvq4k7d>;
};
export type Ib0ijj1h4o8bcq = Array<Anonymize<Idrh3it7jircvh>>;
export type Idrh3it7jircvh = {
    "payload": {
        bytes: Uint8Array;
        bitsLen: number;
    };
    "validator_index": number;
    "signature": FixedSizeBinary<64>;
};
export type I6n6fsk5rls02k = Array<Anonymize<I3m2q6a6atc1c7>>;
export type I3m2q6a6atc1c7 = {
    "candidate": Anonymize<I7t2ron16fup67>;
    "validity_votes": Anonymize<Id0g95rku62vif>;
    "validator_indices": {
        bytes: Uint8Array;
        bitsLen: number;
    };
};
export type I7t2ron16fup67 = {
    "descriptor": Anonymize<Ic7r865c0luc3k>;
    "commitments": Anonymize<Ic1d4u2opv3fst>;
};
export type Id0g95rku62vif = Array<ValidityAttestation>;
export type Ie2dden5k4kk7t = AnonymousEnum<{
    /**
     *Set the storage for the parachain validation code immediately.
     */
    "force_set_current_code": Anonymize<I1k3urvkqqshbc>;
    /**
     *Set the storage for the current parachain head data immediately.
     */
    "force_set_current_head": Anonymize<I2ff0ffsh15vej>;
    /**
     *Schedule an upgrade as if it was scheduled in the given relay parent block.
     */
    "force_schedule_code_upgrade": Anonymize<I1orfg86bkg123>;
    /**
     *Note a new block head for para within the context of the current block.
     */
    "force_note_new_head": Anonymize<I2ff0ffsh15vej>;
    /**
     *Put a parachain directly into the next session's action queue.
     *We can't queue it any sooner than this without going into the
     *initializer...
     */
    "force_queue_action": Anonymize<Iaus4cb3drhu9q>;
    /**
     *Adds the validation code to the storage.
     *
     *The code will not be added if it is already present. Additionally, if PVF pre-checking
     *is running for that code, it will be instantly accepted.
     *
     *Otherwise, the code will be added into the storage. Note that the code will be added
     *into storage with reference count 0. This is to account the fact that there are no users
     *for this code yet. The caller will have to make sure that this code eventually gets
     *used by some parachain or removed from the storage to avoid storage leaks. For the
     *latter prefer to use the `poke_unused_validation_code` dispatchable to raw storage
     *manipulation.
     *
     *This function is mainly meant to be used for upgrading parachains that do not follow
     *the go-ahead signal while the PVF pre-checking feature is enabled.
     */
    "add_trusted_validation_code": Anonymize<Ivnsat10lv9d6>;
    /**
     *Remove the validation code from the storage iff the reference count is 0.
     *
     *This is better than removing the storage directly, because it will not remove the code
     *that was suddenly got used by some parachain while this dispatchable was pending
     *dispatching.
     */
    "poke_unused_validation_code": Anonymize<Ibncli8qttt2c2>;
    /**
     *Includes a statement for a PVF pre-checking vote. Potentially, finalizes the vote and
     *enacts the results if that was the last vote before achieving the supermajority.
     */
    "include_pvf_check_statement": Anonymize<I33rft6ag34efs>;
    /**
     *Set the storage for the current parachain head data immediately.
     */
    "force_set_most_recent_context": Anonymize<I9tmok5kceg2bg>;
}>;
export type I1k3urvkqqshbc = {
    "para": number;
    "new_code": Binary;
};
export type I2ff0ffsh15vej = {
    "para": number;
    "new_head": Binary;
};
export type I1orfg86bkg123 = {
    "para": number;
    "new_code": Binary;
    "relay_parent_number": number;
};
export type Iaus4cb3drhu9q = {
    "para": number;
};
export type Ivnsat10lv9d6 = {
    "validation_code": Binary;
};
export type Ibncli8qttt2c2 = {
    "validation_code_hash": FixedSizeBinary<32>;
};
export type I33rft6ag34efs = {
    "stmt": Anonymize<I36e6rra3ikq65>;
    "signature": FixedSizeBinary<64>;
};
export type I36e6rra3ikq65 = {
    "accept": boolean;
    "subject": FixedSizeBinary<32>;
    "session_index": number;
    "validator_index": number;
};
export type I9tmok5kceg2bg = {
    "para": number;
    "context": number;
};
export type Ieggtnkc96vvt7 = AnonymousEnum<{
    /**
     *Issue a signal to the consensus engine to forcibly act as though all parachain
     *blocks in all relay chain blocks up to and including the given number in the current
     *chain are valid and should be finalized.
     */
    "force_approve": Anonymize<I85icj2qbjeqbe>;
}>;
export type I85icj2qbjeqbe = {
    "up_to": number;
};
export type I45adic8nko129 = AnonymousEnum<{
    /**
     *Initiate opening a channel from a parachain to a given recipient with given channel
     *parameters.
     *
     *- `proposed_max_capacity` - specifies how many messages can be in the channel at once.
     *- `proposed_max_message_size` - specifies the maximum size of the messages.
     *
     *These numbers are a subject to the relay-chain configuration limits.
     *
     *The channel can be opened only after the recipient confirms it and only on a session
     *change.
     */
    "hrmp_init_open_channel": Anonymize<Ibuhbp68e6tkct>;
    /**
     *Accept a pending open channel request from the given sender.
     *
     *The channel will be opened only on the next session boundary.
     */
    "hrmp_accept_open_channel": Anonymize<Idrevppfiubhve>;
    /**
     *Initiate unilateral closing of a channel. The origin must be either the sender or the
     *recipient in the channel being closed.
     *
     *The closure can only happen on a session change.
     */
    "hrmp_close_channel": Anonymize<I9s2h36kr71vk9>;
    /**
     *This extrinsic triggers the cleanup of all the HRMP storage items that a para may have.
     *Normally this happens once per session, but this allows you to trigger the cleanup
     *immediately for a specific parachain.
     *
     *Number of inbound and outbound channels for `para` must be provided as witness data.
     *
     *Origin must be the `ChannelManager`.
     */
    "force_clean_hrmp": Anonymize<I4lkbiubo9ogq9>;
    /**
     *Force process HRMP open channel requests.
     *
     *If there are pending HRMP open channel requests, you can use this function to process
     *all of those requests immediately.
     *
     *Total number of opening channels must be provided as witness data.
     *
     *Origin must be the `ChannelManager`.
     */
    "force_process_hrmp_open": Anonymize<Id1baei7m8gkhk>;
    /**
     *Force process HRMP close channel requests.
     *
     *If there are pending HRMP close channel requests, you can use this function to process
     *all of those requests immediately.
     *
     *Total number of closing channels must be provided as witness data.
     *
     *Origin must be the `ChannelManager`.
     */
    "force_process_hrmp_close": Anonymize<Id1baei7m8gkhk>;
    /**
     *This cancels a pending open channel request. It can be canceled by either of the sender
     *or the recipient for that request. The origin must be either of those.
     *
     *The cancellation happens immediately. It is not possible to cancel the request if it is
     *already accepted.
     *
     *Total number of open requests (i.e. `HrmpOpenChannelRequestsList`) must be provided as
     *witness data.
     */
    "hrmp_cancel_open_request": Anonymize<I96ftepqm4vs7m>;
    /**
     *Open a channel from a `sender` to a `recipient` `ParaId`. Although opened by governance,
     *the `max_capacity` and `max_message_size` are still subject to the Relay Chain's
     *configured limits.
     *
     *Expected use is when one (and only one) of the `ParaId`s involved in the channel is
     *governed by the system, e.g. a system parachain.
     *
     *Origin must be the `ChannelManager`.
     */
    "force_open_hrmp_channel": Anonymize<Ic3430470j4mbv>;
    /**
     *Establish an HRMP channel between two system chains. If the channel does not already
     *exist, the transaction fees will be refunded to the caller. The system does not take
     *deposits for channels between system chains, and automatically sets the message number
     *and size limits to the maximum allowed by the network's configuration.
     *
     *Arguments:
     *
     *- `sender`: A system chain, `ParaId`.
     *- `recipient`: A system chain, `ParaId`.
     *
     *Any signed origin can call this function, but _both_ inputs MUST be system chains. If
     *the channel does not exist yet, there is no fee.
     */
    "establish_system_channel": Anonymize<I50mrcbubp554e>;
    /**
     *Update the deposits held for an HRMP channel to the latest `Configuration`. Channels
     *with system chains do not require a deposit.
     *
     *Arguments:
     *
     *- `sender`: A chain, `ParaId`.
     *- `recipient`: A chain, `ParaId`.
     *
     *Any signed origin can call this function.
     */
    "poke_channel_deposits": Anonymize<I50mrcbubp554e>;
    /**
     *Establish a bidirectional HRMP channel between a parachain and a system chain.
     *
     *Arguments:
     *
     *- `target_system_chain`: A system chain, `ParaId`.
     *
     *The origin needs to be the parachain origin.
     */
    "establish_channel_with_system": Anonymize<Ic3n7nqb6fffo0>;
}>;
export type Ibuhbp68e6tkct = {
    "recipient": number;
    "proposed_max_capacity": number;
    "proposed_max_message_size": number;
};
export type Idrevppfiubhve = {
    "sender": number;
};
export type I9s2h36kr71vk9 = {
    "channel_id": Anonymize<I50mrcbubp554e>;
};
export type I4lkbiubo9ogq9 = {
    "para": number;
    "num_inbound": number;
    "num_outbound": number;
};
export type Id1baei7m8gkhk = {
    "channels": number;
};
export type I96ftepqm4vs7m = {
    "channel_id": Anonymize<I50mrcbubp554e>;
    "open_requests": number;
};
export type Ic3430470j4mbv = {
    "sender": number;
    "recipient": number;
    "max_capacity": number;
    "max_message_size": number;
};
export type Ic3n7nqb6fffo0 = {
    "target_system_chain": number;
};
export type Ifkh1ep7g9h3rv = AnonymousEnum<{
    "force_unfreeze": undefined;
}>;
export type I3jj054kp2bjol = AnonymousEnum<{
    "report_dispute_lost_unsigned": Anonymize<I437u7rqtshfms>;
}>;
export type I437u7rqtshfms = {
    "dispute_proof": Anonymize<I943rhn463avqr>;
    "key_owner_proof": Anonymize<I3ia7aufsoj0l1>;
};
export type I943rhn463avqr = {
    "time_slot": Anonymize<Iee37emj23tmbu>;
    "kind": SlashingOffenceKind;
    "validator_index": number;
    "validator_id": FixedSizeBinary<32>;
};
export type Iee37emj23tmbu = {
    "session_index": number;
    "candidate_hash": FixedSizeBinary<32>;
};
export type I9s7urueli180g = AnonymousEnum<{
    /**
     *Create a single on demand core order.
     *Will use the spot price for the current block and will reap the account if needed.
     *
     *Parameters:
     *- `origin`: The sender of the call, funds will be withdrawn from this account.
     *- `max_amount`: The maximum balance to withdraw from the origin to place an order.
     *- `para_id`: A `ParaId` the origin wants to provide blockspace for.
     *
     *Errors:
     *- `InsufficientBalance`: from the Currency implementation
     *- `QueueFull`
     *- `SpotPriceHigherThanMaxAmount`
     *
     *Events:
     *- `OnDemandOrderPlaced`
     */
    "place_order_allow_death": Anonymize<Iaa7g3f5tlv3gf>;
    /**
     *Same as the [`place_order_allow_death`](Self::place_order_allow_death) call , but with a
     *check that placing the order will not reap the account.
     *
     *Parameters:
     *- `origin`: The sender of the call, funds will be withdrawn from this account.
     *- `max_amount`: The maximum balance to withdraw from the origin to place an order.
     *- `para_id`: A `ParaId` the origin wants to provide blockspace for.
     *
     *Errors:
     *- `InsufficientBalance`: from the Currency implementation
     *- `QueueFull`
     *- `SpotPriceHigherThanMaxAmount`
     *
     *Events:
     *- `OnDemandOrderPlaced`
     */
    "place_order_keep_alive": Anonymize<Iaa7g3f5tlv3gf>;
}>;
export type Iaa7g3f5tlv3gf = {
    "max_amount": bigint;
    "para_id": number;
};
export type Icclqj5sge2nc7 = AnonymousEnum<{
    /**
     *Register head data and validation code for a reserved Para Id.
     *
     *## Arguments
     *- `origin`: Must be called by a `Signed` origin.
     *- `id`: The para ID. Must be owned/managed by the `origin` signing account.
     *- `genesis_head`: The genesis head data of the parachain/thread.
     *- `validation_code`: The initial validation code of the parachain/thread.
     *
     *## Deposits/Fees
     *The account with the originating signature must reserve a deposit.
     *
     *The deposit is required to cover the costs associated with storing the genesis head
     *data and the validation code.
     *This accounts for the potential to store validation code of a size up to the
     *`max_code_size`, as defined in the configuration pallet
     *
     *Anything already reserved previously for this para ID is accounted for.
     *
     *## Events
     *The `Registered` event is emitted in case of success.
     */
    "register": Anonymize<I7mf0sij342109>;
    /**
     *Force the registration of a Para Id on the relay chain.
     *
     *This function must be called by a Root origin.
     *
     *The deposit taken can be specified for this registration. Any `ParaId`
     *can be registered, including sub-1000 IDs which are System Parachains.
     */
    "force_register": Anonymize<Ibvirp862qkkup>;
    /**
     *Deregister a Para Id, freeing all data and returning any deposit.
     *
     *The caller must be Root, the `para` owner, or the `para` itself. The para must be an
     *on-demand parachain.
     */
    "deregister": Anonymize<Ic5b47dj4coa3r>;
    /**
     *Swap a lease holding parachain with another parachain, either on-demand or lease
     *holding.
     *
     *The origin must be Root, the `para` owner, or the `para` itself.
     *
     *The swap will happen only if there is already an opposite swap pending. If there is not,
     *the swap will be stored in the pending swaps map, ready for a later confirmatory swap.
     *
     *The `ParaId`s remain mapped to the same head data and code so external code can rely on
     *`ParaId` to be a long-term identifier of a notional "parachain". However, their
     *scheduling info (i.e. whether they're an on-demand parachain or lease holding
     *parachain), auction information and the auction deposit are switched.
     */
    "swap": Anonymize<Idehabrqi23sc0>;
    /**
     *Remove a manager lock from a para. This will allow the manager of a
     *previously locked para to deregister or swap a para without using governance.
     *
     *Can only be called by the Root origin or the parachain.
     */
    "remove_lock": Anonymize<Iaus4cb3drhu9q>;
    /**
     *Reserve a Para Id on the relay chain.
     *
     *This function will reserve a new Para Id to be owned/managed by the origin account.
     *The origin account is able to register head data and validation code using `register` to
     *create an on-demand parachain. Using the Slots pallet, an on-demand parachain can then
     *be upgraded to a lease holding parachain.
     *
     *## Arguments
     *- `origin`: Must be called by a `Signed` origin. Becomes the manager/owner of the new
     *  para ID.
     *
     *## Deposits/Fees
     *The origin must reserve a deposit of `ParaDeposit` for the registration.
     *
     *## Events
     *The `Reserved` event is emitted in case of success, which provides the ID reserved for
     *use.
     */
    "reserve": undefined;
    /**
     *Add a manager lock from a para. This will prevent the manager of a
     *para to deregister or swap a para.
     *
     *Can be called by Root, the parachain, or the parachain manager if the parachain is
     *unlocked.
     */
    "add_lock": Anonymize<Iaus4cb3drhu9q>;
    /**
     *Schedule a parachain upgrade.
     *
     *This will kick off a check of `new_code` by all validators. After the majority of the
     *validators have reported on the validity of the code, the code will either be enacted
     *or the upgrade will be rejected. If the code will be enacted, the current code of the
     *parachain will be overwritten directly. This means that any PoV will be checked by this
     *new code. The parachain itself will not be informed explicitly that the validation code
     *has changed.
     *
     *Can be called by Root, the parachain, or the parachain manager if the parachain is
     *unlocked.
     */
    "schedule_code_upgrade": Anonymize<I1k3urvkqqshbc>;
    /**
     *Set the parachain's current head.
     *
     *Can be called by Root, the parachain, or the parachain manager if the parachain is
     *unlocked.
     */
    "set_current_head": Anonymize<I2ff0ffsh15vej>;
}>;
export type I7mf0sij342109 = {
    "id": number;
    "genesis_head": Binary;
    "validation_code": Binary;
};
export type Ibvirp862qkkup = {
    "who": SS58String;
    "deposit": bigint;
    "id": number;
    "genesis_head": Binary;
    "validation_code": Binary;
};
export type Ic5b47dj4coa3r = {
    "id": number;
};
export type Idehabrqi23sc0 = {
    "id": number;
    "other": number;
};
export type Iafhis924j14hg = AnonymousEnum<{
    /**
     *Just a connect into the `lease_out` call, in case Root wants to force some lease to
     *happen independently of any other on-chain mechanism to use it.
     *
     *The dispatch origin for this call must match `T::ForceOrigin`.
     */
    "force_lease": Anonymize<Idfpo6162k0hq>;
    /**
     *Clear all leases for a Para Id, refunding any deposits back to the original owners.
     *
     *The dispatch origin for this call must match `T::ForceOrigin`.
     */
    "clear_all_leases": Anonymize<Iaus4cb3drhu9q>;
    /**
     *Try to onboard a parachain that has a lease for the current lease period.
     *
     *This function can be useful if there was some state issue with a para that should
     *have onboarded, but was unable to. As long as they have a lease period, we can
     *let them onboard from here.
     *
     *Origin must be signed, but can be called by anyone.
     */
    "trigger_onboard": Anonymize<Iaus4cb3drhu9q>;
}>;
export type Idfpo6162k0hq = {
    "para": number;
    "leaser": SS58String;
    "amount": bigint;
    "period_begin": number;
    "period_count": number;
};
export type I4a8qeimc5p3qn = AnonymousEnum<{
    /**
     *Create a new auction.
     *
     *This can only happen when there isn't already an auction in progress and may only be
     *called by the root origin. Accepts the `duration` of this auction and the
     *`lease_period_index` of the initial lease period of the four that are to be auctioned.
     */
    "new_auction": Anonymize<I19hvnphoaj44l>;
    /**
     *Make a new bid from an account (including a parachain account) for deploying a new
     *parachain.
     *
     *Multiple simultaneous bids from the same bidder are allowed only as long as all active
     *bids overlap each other (i.e. are mutually exclusive). Bids cannot be redacted.
     *
     *- `sub` is the sub-bidder ID, allowing for multiple competing bids to be made by (and
     *funded by) the same account.
     *- `auction_index` is the index of the auction to bid on. Should just be the present
     *value of `AuctionCounter`.
     *- `first_slot` is the first lease period index of the range to bid on. This is the
     *absolute lease period index value, not an auction-specific offset.
     *- `last_slot` is the last lease period index of the range to bid on. This is the
     *absolute lease period index value, not an auction-specific offset.
     *- `amount` is the amount to bid to be held as deposit for the parachain should the
     *bid win. This amount is held throughout the range.
     */
    "bid": Anonymize<I1ng31ej27mh4k>;
    /**
     *Cancel an in-progress auction.
     *
     *Can only be called by Root origin.
     */
    "cancel_auction": undefined;
}>;
export type I19hvnphoaj44l = {
    "duration": number;
    "lease_period_index": number;
};
export type I1ng31ej27mh4k = {
    "para": number;
    "auction_index": number;
    "first_slot": number;
    "last_slot": number;
    "amount": bigint;
};
export type Iaj4q75nu5v2i2 = AnonymousEnum<{
    /**
     *Create a new crowdloaning campaign for a parachain slot with the given lease period
     *range.
     *
     *This applies a lock to your parachain configuration, ensuring that it cannot be changed
     *by the parachain manager.
     */
    "create": Anonymize<I85qkvekflgteq>;
    /**
     *Contribute to a crowd sale. This will transfer some balance over to fund a parachain
     *slot. It will be withdrawable when the crowdloan has ended and the funds are unused.
     */
    "contribute": Anonymize<I1qt5nua7ua655>;
    /**
     *Withdraw full balance of a specific contributor.
     *
     *Origin must be signed, but can come from anyone.
     *
     *The fund must be either in, or ready for, retirement. For a fund to be *in* retirement,
     *then the retirement flag must be set. For a fund to be ready for retirement, then:
     *- it must not already be in retirement;
     *- the amount of raised funds must be bigger than the _free_ balance of the account;
     *- and either:
     *  - the block number must be at least `end`; or
     *  - the current lease period must be greater than the fund's `last_period`.
     *
     *In this case, the fund's retirement flag is set and its `end` is reset to the current
     *block number.
     *
     *- `who`: The account whose contribution should be withdrawn.
     *- `index`: The parachain to whose crowdloan the contribution was made.
     */
    "withdraw": Anonymize<Ia1u3jll6a06ae>;
    /**
     *Automatically refund contributors of an ended crowdloan.
     *Due to weight restrictions, this function may need to be called multiple
     *times to fully refund all users. We will refund `RemoveKeysLimit` users at a time.
     *
     *Origin must be signed, but can come from anyone.
     */
    "refund": Anonymize<I666bl2fqjkejo>;
    /**
     *Remove a fund after the retirement period has ended and all funds have been returned.
     */
    "dissolve": Anonymize<I666bl2fqjkejo>;
    /**
     *Edit the configuration for an in-progress crowdloan.
     *
     *Can only be called by Root origin.
     */
    "edit": Anonymize<I85qkvekflgteq>;
    /**
     *Add an optional memo to an existing crowdloan contribution.
     *
     *Origin must be Signed, and the user must have contributed to the crowdloan.
     */
    "add_memo": Anonymize<I7cl9esn1l72m7>;
    /**
     *Poke the fund into `NewRaise`
     *
     *Origin must be Signed, and the fund has non-zero raise.
     */
    "poke": Anonymize<I666bl2fqjkejo>;
    /**
     *Contribute your entire balance to a crowd sale. This will transfer the entire balance of
     *a user over to fund a parachain slot. It will be withdrawable when the crowdloan has
     *ended and the funds are unused.
     */
    "contribute_all": Anonymize<Id68sq6o2gm8qi>;
}>;
export type I85qkvekflgteq = {
    "index": number;
    "cap": bigint;
    "first_period": number;
    "last_period": number;
    "end": number;
    "verifier"?: Anonymize<I21lmi57mmu91l>;
};
export type I1qt5nua7ua655 = {
    "index": number;
    "value": bigint;
    "signature"?: Anonymize<I86cdjmsf3a81s>;
};
export type I86cdjmsf3a81s = (MultiSignature) | undefined;
export type MultiSignature = Enum<{
    "Ed25519": FixedSizeBinary<64>;
    "Sr25519": FixedSizeBinary<64>;
    "Ecdsa": FixedSizeBinary<65>;
}>;
export declare const MultiSignature: GetEnum<MultiSignature>;
export type I7cl9esn1l72m7 = {
    "index": number;
    "memo": Binary;
};
export type Id68sq6o2gm8qi = {
    "index": number;
    "signature"?: Anonymize<I86cdjmsf3a81s>;
};
export type Idu7bbtd2jtnb9 = AnonymousEnum<{
    /**
     *Request the configuration to be updated with the specified number of cores. Warning:
     *Since this only schedules a configuration update, it takes two sessions to come into
     *effect.
     *
     *- `origin`: Root or the Coretime Chain
     *- `count`: total number of cores
     */
    "request_core_count": Anonymize<Iafscmv8tjf0ou>;
    /**
     *Request to claim the instantaneous coretime sales revenue starting from the block it was
     *last claimed until and up to the block specified. The claimed amount value is sent back
     *to the Coretime chain in a `notify_revenue` message. At the same time, the amount is
     *teleported to the Coretime chain.
     */
    "request_revenue_at": Anonymize<Ibtsa3docbr9el>;
    /**
     *Receive instructions from the `ExternalBrokerOrigin`, detailing how a specific core is
     *to be used.
     *
     *Parameters:
     *-`origin`: The `ExternalBrokerOrigin`, assumed to be the coretime chain.
     *-`core`: The core that should be scheduled.
     *-`begin`: The starting blockheight of the instruction.
     *-`assignment`: How the blockspace should be utilised.
     *-`end_hint`: An optional hint as to when this particular set of instructions will end.
     */
    "assign_core": Anonymize<I2gpmmfdqv3cdc>;
}>;
export type I2gpmmfdqv3cdc = {
    "core": number;
    "begin": number;
    "assignment": Anonymize<Idt36labebpqsd>;
    "end_hint"?: Anonymize<I4arjljr6dpflb>;
};
export type I39l72gdmkk30t = AnonymousEnum<{
    /**
     *Control the automatic migration.
     *
     *The dispatch origin of this call must be [`Config::ControlOrigin`].
     */
    "control_auto_migration": Anonymize<I7psec5e6ghc64>;
    /**
     *Continue the migration for the given `limits`.
     *
     *The dispatch origin of this call can be any signed account.
     *
     *This transaction has NO MONETARY INCENTIVES. calling it will not reward anyone. Albeit,
     *Upon successful execution, the transaction fee is returned.
     *
     *The (potentially over-estimated) of the byte length of all the data read must be
     *provided for up-front fee-payment and weighing. In essence, the caller is guaranteeing
     *that executing the current `MigrationTask` with the given `limits` will not exceed
     *`real_size_upper` bytes of read data.
     *
     *The `witness_task` is merely a helper to prevent the caller from being slashed or
     *generally trigger a migration that they do not intend. This parameter is just a message
     *from caller, saying that they believed `witness_task` was the last state of the
     *migration, and they only wish for their transaction to do anything, if this assumption
     *holds. In case `witness_task` does not match, the transaction fails.
     *
     *Based on the documentation of [`MigrationTask::migrate_until_exhaustion`], the
     *recommended way of doing this is to pass a `limit` that only bounds `count`, as the
     *`size` limit can always be overwritten.
     */
    "continue_migrate": Anonymize<I2psb0sladd863>;
    /**
     *Migrate the list of top keys by iterating each of them one by one.
     *
     *This does not affect the global migration process tracker ([`MigrationProcess`]), and
     *should only be used in case any keys are leftover due to a bug.
     */
    "migrate_custom_top": Anonymize<I585tk8khua0gk>;
    /**
     *Migrate the list of child keys by iterating each of them one by one.
     *
     *All of the given child keys must be present under one `child_root`.
     *
     *This does not affect the global migration process tracker ([`MigrationProcess`]), and
     *should only be used in case any keys are leftover due to a bug.
     */
    "migrate_custom_child": Anonymize<I3ut99di214ru2>;
    /**
     *Set the maximum limit of the signed migration.
     */
    "set_signed_max_limits": Anonymize<Iemkp87d26vsbh>;
    /**
     *Forcefully set the progress the running migration.
     *
     *This is only useful in one case: the next key to migrate is too big to be migrated with
     *a signed account, in a parachain context, and we simply want to skip it. A reasonable
     *example of this would be `:code:`, which is both very expensive to migrate, and commonly
     *used, so probably it is already migrated.
     *
     *In case you mess things up, you can also, in principle, use this to reset the migration
     *process.
     */
    "force_set_progress": Anonymize<I4ahfrt5dscf6q>;
}>;
export type I7psec5e6ghc64 = {
    "maybe_config"?: Anonymize<Ib17t3992hb64n>;
};
export type I2psb0sladd863 = {
    "limits": Anonymize<I215mkl885p4da>;
    "real_size_upper": number;
    "witness_task": Anonymize<If354jrdedj0pj>;
};
export type I585tk8khua0gk = {
    "keys": Anonymize<Itom7fk49o0c9>;
    "witness_size": number;
};
export type I3ut99di214ru2 = {
    "root": Binary;
    "child_keys": Anonymize<Itom7fk49o0c9>;
    "total_size": number;
};
export type Iemkp87d26vsbh = {
    "limits": Anonymize<I215mkl885p4da>;
};
export type I4ahfrt5dscf6q = {
    "progress_top": Anonymize<I1ufmh6d8psvik>;
    "progress_child": Anonymize<I1ufmh6d8psvik>;
};
export type I9nbjvlrb9bp1g = AnonymousEnum<{
    "send": Anonymize<I9paqujeb1fpv6>;
    /**
     *Teleport some assets from the local chain to some destination chain.
     *
     ***This function is deprecated: Use `limited_teleport_assets` instead.**
     *
     *Fee payment on the destination side is made from the asset in the `assets` vector of
     *index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
     *with all fees taken as needed from the asset.
     *
     *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     *- `dest`: Destination context for the assets. Will typically be `[Parent,
     *  Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
     *  relay to parachain.
     *- `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
     *  generally be an `AccountId32` value.
     *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
     *  fee on the `dest` chain.
     *- `fee_asset_item`: The index into `assets` of the item which should be used to pay
     *  fees.
     */
    "teleport_assets": Anonymize<Iakevv83i18n4r>;
    /**
     *Transfer some assets from the local chain to the destination chain through their local,
     *destination or remote reserve.
     *
     *`assets` must have same reserve location and may not be teleportable to `dest`.
     * - `assets` have local reserve: transfer assets to sovereign account of destination
     *   chain and forward a notification XCM to `dest` to mint and deposit reserve-based
     *   assets to `beneficiary`.
     * - `assets` have destination reserve: burn local assets and forward a notification to
     *   `dest` chain to withdraw the reserve assets from this chain's sovereign account and
     *   deposit them to `beneficiary`.
     * - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
     *   reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
     *   to mint and deposit reserve-based assets to `beneficiary`.
     *
     ***This function is deprecated: Use `limited_reserve_transfer_assets` instead.**
     *
     *Fee payment on the destination side is made from the asset in the `assets` vector of
     *index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
     *with all fees taken as needed from the asset.
     *
     *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     *- `dest`: Destination context for the assets. Will typically be `[Parent,
     *  Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
     *  relay to parachain.
     *- `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
     *  generally be an `AccountId32` value.
     *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
     *  fee on the `dest` (and possibly reserve) chains.
     *- `fee_asset_item`: The index into `assets` of the item which should be used to pay
     *  fees.
     */
    "reserve_transfer_assets": Anonymize<Iakevv83i18n4r>;
    /**
     *Execute an XCM message from a local, signed, origin.
     *
     *An event is deposited indicating whether `msg` could be executed completely or only
     *partially.
     *
     *No more than `max_weight` will be used in its attempted execution. If this is less than
     *the maximum amount of weight that the message could take to be executed, then no
     *execution attempt will be made.
     */
    "execute": Anonymize<If2ssl12kcglhg>;
    /**
     *Extoll that a particular destination can be communicated with through a particular
     *version of XCM.
     *
     *- `origin`: Must be an origin specified by AdminOrigin.
     *- `location`: The destination that is being described.
     *- `xcm_version`: The latest version of XCM that `location` supports.
     */
    "force_xcm_version": Anonymize<Iabk8ljl5g8c86>;
    /**
     *Set a safe XCM version (the version that XCM should be encoded with if the most recent
     *version a destination can accept is unknown).
     *
     *- `origin`: Must be an origin specified by AdminOrigin.
     *- `maybe_xcm_version`: The default XCM encoding version, or `None` to disable.
     */
    "force_default_xcm_version": Anonymize<Ic76kfh5ebqkpl>;
    /**
     *Ask a location to notify us regarding their XCM version and any changes to it.
     *
     *- `origin`: Must be an origin specified by AdminOrigin.
     *- `location`: The location to which we should subscribe for XCM version notifications.
     */
    "force_subscribe_version_notify": Anonymize<Icrujen33bbibf>;
    /**
     *Require that a particular destination should no longer notify us regarding any XCM
     *version changes.
     *
     *- `origin`: Must be an origin specified by AdminOrigin.
     *- `location`: The location to which we are currently subscribed for XCM version
     *  notifications which we no longer desire.
     */
    "force_unsubscribe_version_notify": Anonymize<Icrujen33bbibf>;
    /**
     *Transfer some assets from the local chain to the destination chain through their local,
     *destination or remote reserve.
     *
     *`assets` must have same reserve location and may not be teleportable to `dest`.
     * - `assets` have local reserve: transfer assets to sovereign account of destination
     *   chain and forward a notification XCM to `dest` to mint and deposit reserve-based
     *   assets to `beneficiary`.
     * - `assets` have destination reserve: burn local assets and forward a notification to
     *   `dest` chain to withdraw the reserve assets from this chain's sovereign account and
     *   deposit them to `beneficiary`.
     * - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
     *   reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
     *   to mint and deposit reserve-based assets to `beneficiary`.
     *
     *Fee payment on the destination side is made from the asset in the `assets` vector of
     *index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
     *is needed than `weight_limit`, then the operation will fail and the sent assets may be
     *at risk.
     *
     *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     *- `dest`: Destination context for the assets. Will typically be `[Parent,
     *  Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
     *  relay to parachain.
     *- `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
     *  generally be an `AccountId32` value.
     *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
     *  fee on the `dest` (and possibly reserve) chains.
     *- `fee_asset_item`: The index into `assets` of the item which should be used to pay
     *  fees.
     *- `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
     */
    "limited_reserve_transfer_assets": Anonymize<I5gi8h3e5lkbeq>;
    /**
     *Teleport some assets from the local chain to some destination chain.
     *
     *Fee payment on the destination side is made from the asset in the `assets` vector of
     *index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
     *is needed than `weight_limit`, then the operation will fail and the sent assets may be
     *at risk.
     *
     *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     *- `dest`: Destination context for the assets. Will typically be `[Parent,
     *  Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
     *  relay to parachain.
     *- `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
     *  generally be an `AccountId32` value.
     *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
     *  fee on the `dest` chain.
     *- `fee_asset_item`: The index into `assets` of the item which should be used to pay
     *  fees.
     *- `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
     */
    "limited_teleport_assets": Anonymize<I5gi8h3e5lkbeq>;
    /**
     *Set or unset the global suspension state of the XCM executor.
     *
     *- `origin`: Must be an origin specified by AdminOrigin.
     *- `suspended`: `true` to suspend, `false` to resume.
     */
    "force_suspension": Anonymize<Ibgm4rnf22lal1>;
    /**
     *Transfer some assets from the local chain to the destination chain through their local,
     *destination or remote reserve, or through teleports.
     *
     *Fee payment on the destination side is made from the asset in the `assets` vector of
     *index `fee_asset_item` (hence referred to as `fees`), up to enough to pay for
     *`weight_limit` of weight. If more weight is needed than `weight_limit`, then the
     *operation will fail and the sent assets may be at risk.
     *
     *`assets` (excluding `fees`) must have same reserve location or otherwise be teleportable
     *to `dest`, no limitations imposed on `fees`.
     * - for local reserve: transfer assets to sovereign account of destination chain and
     *   forward a notification XCM to `dest` to mint and deposit reserve-based assets to
     *   `beneficiary`.
     * - for destination reserve: burn local assets and forward a notification to `dest` chain
     *   to withdraw the reserve assets from this chain's sovereign account and deposit them
     *   to `beneficiary`.
     * - for remote reserve: burn local assets, forward XCM to reserve chain to move reserves
     *   from this chain's SA to `dest` chain's SA, and forward another XCM to `dest` to mint
     *   and deposit reserve-based assets to `beneficiary`.
     * - for teleports: burn local assets and forward XCM to `dest` chain to mint/teleport
     *   assets and deposit them to `beneficiary`.
     *
     *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     *- `dest`: Destination context for the assets. Will typically be `X2(Parent,
     *  Parachain(..))` to send from parachain to parachain, or `X1(Parachain(..))` to send
     *  from relay to parachain.
     *- `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
     *  generally be an `AccountId32` value.
     *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
     *  fee on the `dest` (and possibly reserve) chains.
     *- `fee_asset_item`: The index into `assets` of the item which should be used to pay
     *  fees.
     *- `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
     */
    "transfer_assets": Anonymize<I5gi8h3e5lkbeq>;
    /**
     *Claims assets trapped on this pallet because of leftover assets during XCM execution.
     *
     *- `origin`: Anyone can call this extrinsic.
     *- `assets`: The exact assets that were trapped. Use the version to specify what version
     *was the latest when they were trapped.
     *- `beneficiary`: The location/account where the claimed assets will be deposited.
     */
    "claim_assets": Anonymize<I8mmaab8je28oo>;
    /**
     *Transfer assets from the local chain to the destination chain using explicit transfer
     *types for assets and fees.
     *
     *`assets` must have same reserve location or may be teleportable to `dest`. Caller must
     *provide the `assets_transfer_type` to be used for `assets`:
     * - `TransferType::LocalReserve`: transfer assets to sovereign account of destination
     *   chain and forward a notification XCM to `dest` to mint and deposit reserve-based
     *   assets to `beneficiary`.
     * - `TransferType::DestinationReserve`: burn local assets and forward a notification to
     *   `dest` chain to withdraw the reserve assets from this chain's sovereign account and
     *   deposit them to `beneficiary`.
     * - `TransferType::RemoteReserve(reserve)`: burn local assets, forward XCM to `reserve`
     *   chain to move reserves from this chain's SA to `dest` chain's SA, and forward another
     *   XCM to `dest` to mint and deposit reserve-based assets to `beneficiary`. Typically
     *   the remote `reserve` is Asset Hub.
     * - `TransferType::Teleport`: burn local assets and forward XCM to `dest` chain to
     *   mint/teleport assets and deposit them to `beneficiary`.
     *
     *On the destination chain, as well as any intermediary hops, `BuyExecution` is used to
     *buy execution using transferred `assets` identified by `remote_fees_id`.
     *Make sure enough of the specified `remote_fees_id` asset is included in the given list
     *of `assets`. `remote_fees_id` should be enough to pay for `weight_limit`. If more weight
     *is needed than `weight_limit`, then the operation will fail and the sent assets may be
     *at risk.
     *
     *`remote_fees_id` may use different transfer type than rest of `assets` and can be
     *specified through `fees_transfer_type`.
     *
     *The caller needs to specify what should happen to the transferred assets once they reach
     *the `dest` chain. This is done through the `custom_xcm_on_dest` parameter, which
     *contains the instructions to execute on `dest` as a final step.
     *  This is usually as simple as:
     *  `Xcm(vec![DepositAsset { assets: Wild(AllCounted(assets.len())), beneficiary }])`,
     *  but could be something more exotic like sending the `assets` even further.
     *
     *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     *- `dest`: Destination context for the assets. Will typically be `[Parent,
     *  Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
     *  relay to parachain, or `(parents: 2, (GlobalConsensus(..), ..))` to send from
     *  parachain across a bridge to another ecosystem destination.
     *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
     *  fee on the `dest` (and possibly reserve) chains.
     *- `assets_transfer_type`: The XCM `TransferType` used to transfer the `assets`.
     *- `remote_fees_id`: One of the included `assets` to be used to pay fees.
     *- `fees_transfer_type`: The XCM `TransferType` used to transfer the `fees` assets.
     *- `custom_xcm_on_dest`: The XCM to be executed on `dest` chain as the last step of the
     *  transfer, which also determines what happens to the assets on the destination chain.
     *- `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
     */
    "transfer_assets_using_type_and_then": Anonymize<I6r0pr82pbiftt>;
}>;
export type I9paqujeb1fpv6 = {
    "dest": DotXcmVersionedLocation;
    "message": DotXcmVersionedXcm;
};
export type DotXcmVersionedXcm = Enum<{
    "V2": Anonymize<Iemqgk0vect4v7>;
    "V3": Anonymize<Ianvng4e08j9ii>;
    "V4": Anonymize<Iegrepoo0c1jc5>;
}>;
export declare const DotXcmVersionedXcm: GetEnum<DotXcmVersionedXcm>;
export type Iemqgk0vect4v7 = Array<XcmV2Instruction>;
export type XcmV2Instruction = Enum<{
    "WithdrawAsset": Anonymize<I2sllmucln1iic>;
    "ReserveAssetDeposited": Anonymize<I2sllmucln1iic>;
    "ReceiveTeleportedAsset": Anonymize<I2sllmucln1iic>;
    "QueryResponse": Anonymize<I1n70k431nr92>;
    "TransferAsset": Anonymize<I800n35601gllq>;
    "TransferReserveAsset": Anonymize<I4ahfnfo1h39ng>;
    "Transact": Anonymize<Icoi0hvjidego7>;
    "HrmpNewChannelOpenRequest": Anonymize<I5uhhrjqfuo4e5>;
    "HrmpChannelAccepted": Anonymize<Ifij4jam0o7sub>;
    "HrmpChannelClosing": Anonymize<Ieeb4svd9i8fji>;
    "ClearOrigin": undefined;
    "DescendOrigin": XcmV2MultilocationJunctions;
    "ReportError": Anonymize<I9ts0mtbeaq84a>;
    "DepositAsset": Anonymize<Ias146869ruhho>;
    "DepositReserveAsset": Anonymize<I1upba6ju0ujgo>;
    "ExchangeAsset": Anonymize<Id2jloidb259tk>;
    "InitiateReserveWithdraw": Anonymize<I4dks21gdu9pr2>;
    "InitiateTeleport": Anonymize<I4mu8vn87cfdeb>;
    "QueryHolding": Anonymize<Ib0pr3c4bd0b1s>;
    "BuyExecution": Anonymize<Id8o97c8tt042k>;
    "RefundSurplus": undefined;
    "SetErrorHandler": Anonymize<Iemqgk0vect4v7>;
    "SetAppendix": Anonymize<Iemqgk0vect4v7>;
    "ClearError": undefined;
    "ClaimAsset": Anonymize<I2i62b6lp2e74f>;
    "Trap": bigint;
    "SubscribeVersion": Anonymize<Ido2s48ntevurj>;
    "UnsubscribeVersion": undefined;
}>;
export declare const XcmV2Instruction: GetEnum<XcmV2Instruction>;
export type I1n70k431nr92 = {
    "query_id": bigint;
    "response": XcmV2Response;
    "max_weight": bigint;
};
export type I800n35601gllq = {
    "assets": Anonymize<I2sllmucln1iic>;
    "beneficiary": Anonymize<I4frqunb5hj2km>;
};
export type I4ahfnfo1h39ng = {
    "assets": Anonymize<I2sllmucln1iic>;
    "dest": Anonymize<I4frqunb5hj2km>;
    "xcm": Anonymize<Iemqgk0vect4v7>;
};
export type Icoi0hvjidego7 = {
    "origin_type": XcmV2OriginKind;
    "require_weight_at_most": bigint;
    "call": Binary;
};
export type I9ts0mtbeaq84a = {
    "query_id": bigint;
    "dest": Anonymize<I4frqunb5hj2km>;
    "max_response_weight": bigint;
};
export type Ias146869ruhho = {
    "assets": XcmV2MultiAssetFilter;
    "max_assets": number;
    "beneficiary": Anonymize<I4frqunb5hj2km>;
};
export type XcmV2MultiAssetFilter = Enum<{
    "Definite": Anonymize<I2sllmucln1iic>;
    "Wild": XcmV2MultiassetWildMultiAsset;
}>;
export declare const XcmV2MultiAssetFilter: GetEnum<XcmV2MultiAssetFilter>;
export type XcmV2MultiassetWildMultiAsset = Enum<{
    "All": undefined;
    "AllOf": Anonymize<I8ojnukqr6c3j6>;
}>;
export declare const XcmV2MultiassetWildMultiAsset: GetEnum<XcmV2MultiassetWildMultiAsset>;
export type I8ojnukqr6c3j6 = {
    "id": XcmV2MultiassetAssetId;
    "fun": XcmV2MultiassetWildFungibility;
};
export type I1upba6ju0ujgo = {
    "assets": XcmV2MultiAssetFilter;
    "max_assets": number;
    "dest": Anonymize<I4frqunb5hj2km>;
    "xcm": Anonymize<Iemqgk0vect4v7>;
};
export type Id2jloidb259tk = {
    "give": XcmV2MultiAssetFilter;
    "receive": Anonymize<I2sllmucln1iic>;
};
export type I4dks21gdu9pr2 = {
    "assets": XcmV2MultiAssetFilter;
    "reserve": Anonymize<I4frqunb5hj2km>;
    "xcm": Anonymize<Iemqgk0vect4v7>;
};
export type I4mu8vn87cfdeb = {
    "assets": XcmV2MultiAssetFilter;
    "dest": Anonymize<I4frqunb5hj2km>;
    "xcm": Anonymize<Iemqgk0vect4v7>;
};
export type Ib0pr3c4bd0b1s = {
    "query_id": bigint;
    "dest": Anonymize<I4frqunb5hj2km>;
    "assets": XcmV2MultiAssetFilter;
    "max_response_weight": bigint;
};
export type Id8o97c8tt042k = {
    "fees": Anonymize<Id8h647t880l31>;
    "weight_limit": XcmV2WeightLimit;
};
export type XcmV2WeightLimit = Enum<{
    "Unlimited": undefined;
    "Limited": bigint;
}>;
export declare const XcmV2WeightLimit: GetEnum<XcmV2WeightLimit>;
export type I2i62b6lp2e74f = {
    "assets": Anonymize<I2sllmucln1iic>;
    "ticket": Anonymize<I4frqunb5hj2km>;
};
export type Ido2s48ntevurj = {
    "query_id": bigint;
    "max_response_weight": bigint;
};
export type Ianvng4e08j9ii = Array<XcmV3Instruction>;
export type XcmV3Instruction = Enum<{
    "WithdrawAsset": Anonymize<Iai6dhqiq3bach>;
    "ReserveAssetDeposited": Anonymize<Iai6dhqiq3bach>;
    "ReceiveTeleportedAsset": Anonymize<Iai6dhqiq3bach>;
    "QueryResponse": Anonymize<I6g12ltekg2vaj>;
    "TransferAsset": Anonymize<I8d6ni89sh0qmn>;
    "TransferReserveAsset": Anonymize<Ib2euffogp56pp>;
    "Transact": Anonymize<I92p6l5cs3fr50>;
    "HrmpNewChannelOpenRequest": Anonymize<I5uhhrjqfuo4e5>;
    "HrmpChannelAccepted": Anonymize<Ifij4jam0o7sub>;
    "HrmpChannelClosing": Anonymize<Ieeb4svd9i8fji>;
    "ClearOrigin": undefined;
    "DescendOrigin": XcmV3Junctions;
    "ReportError": Anonymize<I4r3v6e91d1qbs>;
    "DepositAsset": Anonymize<Ia848euuv1lip6>;
    "DepositReserveAsset": Anonymize<I3m8e0mi6lq6fj>;
    "ExchangeAsset": Anonymize<Ich3d4125568vq>;
    "InitiateReserveWithdraw": Anonymize<I3k3ia72gehj6b>;
    "InitiateTeleport": Anonymize<I3m8e0mi6lq6fj>;
    "ReportHolding": Anonymize<I4qgd1h8m3umqc>;
    "BuyExecution": Anonymize<I9ff02md5rmeur>;
    "RefundSurplus": undefined;
    "SetErrorHandler": Anonymize<Ianvng4e08j9ii>;
    "SetAppendix": Anonymize<Ianvng4e08j9ii>;
    "ClearError": undefined;
    "ClaimAsset": Anonymize<I8pu3j74el68mi>;
    "Trap": bigint;
    "SubscribeVersion": Anonymize<Ieprdqqu7ildvr>;
    "UnsubscribeVersion": undefined;
    "BurnAsset": Anonymize<Iai6dhqiq3bach>;
    "ExpectAsset": Anonymize<Iai6dhqiq3bach>;
    "ExpectOrigin"?: Anonymize<Ia9cgf4r40b26h>;
    "ExpectError"?: Anonymize<I7sltvf8v2nure>;
    "ExpectTransactStatus": XcmV3MaybeErrorCode;
    "QueryPallet": Anonymize<Iba5bdbapp16oo>;
    "ExpectPallet": Anonymize<Id7mf37dkpgfjs>;
    "ReportTransactStatus": Anonymize<I4r3v6e91d1qbs>;
    "ClearTransactStatus": undefined;
    "UniversalOrigin": XcmV3Junction;
    "ExportMessage": Anonymize<I8up5nu6gcp077>;
    "LockAsset": Anonymize<I2ieo5vo1bi5a0>;
    "UnlockAsset": Anonymize<I3u52dm5pikv6l>;
    "NoteUnlockable": Anonymize<Idu2tro9aukpp8>;
    "RequestUnlock": Anonymize<Iarqpt33435e7r>;
    "SetFeesMode": Anonymize<I4nae9rsql8fa7>;
    "SetTopic": FixedSizeBinary<32>;
    "ClearTopic": undefined;
    "AliasOrigin": Anonymize<I4c0s5cioidn76>;
    "UnpaidExecution": Anonymize<I40d50jeai33oq>;
}>;
export declare const XcmV3Instruction: GetEnum<XcmV3Instruction>;
export type I6g12ltekg2vaj = {
    "query_id": bigint;
    "response": XcmV3Response;
    "max_weight": Anonymize<I4q39t5hn830vp>;
    "querier"?: Anonymize<Ia9cgf4r40b26h>;
};
export type I8d6ni89sh0qmn = {
    "assets": Anonymize<Iai6dhqiq3bach>;
    "beneficiary": Anonymize<I4c0s5cioidn76>;
};
export type Ib2euffogp56pp = {
    "assets": Anonymize<Iai6dhqiq3bach>;
    "dest": Anonymize<I4c0s5cioidn76>;
    "xcm": Anonymize<Ianvng4e08j9ii>;
};
export type Ia848euuv1lip6 = {
    "assets": XcmV3MultiassetMultiAssetFilter;
    "beneficiary": Anonymize<I4c0s5cioidn76>;
};
export type XcmV3MultiassetMultiAssetFilter = Enum<{
    "Definite": Anonymize<Iai6dhqiq3bach>;
    "Wild": XcmV3MultiassetWildMultiAsset;
}>;
export declare const XcmV3MultiassetMultiAssetFilter: GetEnum<XcmV3MultiassetMultiAssetFilter>;
export type XcmV3MultiassetWildMultiAsset = Enum<{
    "All": undefined;
    "AllOf": Anonymize<Iemi0m9547o42b>;
    "AllCounted": number;
    "AllOfCounted": Anonymize<I2ii8gjc2m1ca3>;
}>;
export declare const XcmV3MultiassetWildMultiAsset: GetEnum<XcmV3MultiassetWildMultiAsset>;
export type Iemi0m9547o42b = {
    "id": XcmV3MultiassetAssetId;
    "fun": XcmV2MultiassetWildFungibility;
};
export type I2ii8gjc2m1ca3 = {
    "id": XcmV3MultiassetAssetId;
    "fun": XcmV2MultiassetWildFungibility;
    "count": number;
};
export type I3m8e0mi6lq6fj = {
    "assets": XcmV3MultiassetMultiAssetFilter;
    "dest": Anonymize<I4c0s5cioidn76>;
    "xcm": Anonymize<Ianvng4e08j9ii>;
};
export type Ich3d4125568vq = {
    "give": XcmV3MultiassetMultiAssetFilter;
    "want": Anonymize<Iai6dhqiq3bach>;
    "maximal": boolean;
};
export type I3k3ia72gehj6b = {
    "assets": XcmV3MultiassetMultiAssetFilter;
    "reserve": Anonymize<I4c0s5cioidn76>;
    "xcm": Anonymize<Ianvng4e08j9ii>;
};
export type I4qgd1h8m3umqc = {
    "response_info": Anonymize<I4r3v6e91d1qbs>;
    "assets": XcmV3MultiassetMultiAssetFilter;
};
export type I9ff02md5rmeur = {
    "fees": Anonymize<Idcm24504c8bkk>;
    "weight_limit": XcmV3WeightLimit;
};
export type I8pu3j74el68mi = {
    "assets": Anonymize<Iai6dhqiq3bach>;
    "ticket": Anonymize<I4c0s5cioidn76>;
};
export type I8up5nu6gcp077 = {
    "network": XcmV3JunctionNetworkId;
    "destination": XcmV3Junctions;
    "xcm": Anonymize<Ianvng4e08j9ii>;
};
export type I2ieo5vo1bi5a0 = {
    "asset": Anonymize<Idcm24504c8bkk>;
    "unlocker": Anonymize<I4c0s5cioidn76>;
};
export type I3u52dm5pikv6l = {
    "asset": Anonymize<Idcm24504c8bkk>;
    "target": Anonymize<I4c0s5cioidn76>;
};
export type Idu2tro9aukpp8 = {
    "asset": Anonymize<Idcm24504c8bkk>;
    "owner": Anonymize<I4c0s5cioidn76>;
};
export type Iarqpt33435e7r = {
    "asset": Anonymize<Idcm24504c8bkk>;
    "locker": Anonymize<I4c0s5cioidn76>;
};
export type Iakevv83i18n4r = {
    "dest": DotXcmVersionedLocation;
    "beneficiary": DotXcmVersionedLocation;
    "assets": DotXcmVersionedAssets;
    "fee_asset_item": number;
};
export type If2ssl12kcglhg = {
    "message": DotXcmVersionedXcm;
    "max_weight": Anonymize<I4q39t5hn830vp>;
};
export type Ic76kfh5ebqkpl = {
    "maybe_xcm_version"?: Anonymize<I4arjljr6dpflb>;
};
export type Icrujen33bbibf = {
    "location": DotXcmVersionedLocation;
};
export type I5gi8h3e5lkbeq = {
    "dest": DotXcmVersionedLocation;
    "beneficiary": DotXcmVersionedLocation;
    "assets": DotXcmVersionedAssets;
    "fee_asset_item": number;
    "weight_limit": XcmV3WeightLimit;
};
export type Ibgm4rnf22lal1 = {
    "suspended": boolean;
};
export type I8mmaab8je28oo = {
    "assets": DotXcmVersionedAssets;
    "beneficiary": DotXcmVersionedLocation;
};
export type I6r0pr82pbiftt = {
    "dest": DotXcmVersionedLocation;
    "assets": DotXcmVersionedAssets;
    "assets_transfer_type": Anonymize<Ifkg2rgjl54s88>;
    "remote_fees_id": DotXcmVersionedAssetId;
    "fees_transfer_type": Anonymize<Ifkg2rgjl54s88>;
    "custom_xcm_on_dest": DotXcmVersionedXcm;
    "weight_limit": XcmV3WeightLimit;
};
export type Ifkg2rgjl54s88 = AnonymousEnum<{
    "Teleport": undefined;
    "LocalReserve": undefined;
    "DestinationReserve": undefined;
    "RemoteReserve": DotXcmVersionedLocation;
}>;
export type I3lic4llm6egbr = AnonymousEnum<{
    /**
     *Remove a page which has no more messages remaining to be processed or is stale.
     */
    "reap_page": Anonymize<Ibv4ep0hngvn9e>;
    /**
     *Execute an overweight message.
     *
     *Temporary processing errors will be propagated whereas permanent errors are treated
     *as success condition.
     *
     *- `origin`: Must be `Signed`.
     *- `message_origin`: The origin from which the message to be executed arrived.
     *- `page`: The page in the queue in which the message to be executed is sitting.
     *- `index`: The index into the queue of the message to be executed.
     *- `weight_limit`: The maximum amount of weight allowed to be consumed in the execution
     *  of the message.
     *
     *Benchmark complexity considerations: O(index + weight_limit).
     */
    "execute_overweight": Anonymize<Ieoqregtp7b00>;
}>;
export type Ibv4ep0hngvn9e = {
    "message_origin": ParachainsInclusionAggregateMessageOrigin;
    "page_index": number;
};
export type Ieoqregtp7b00 = {
    "message_origin": ParachainsInclusionAggregateMessageOrigin;
    "page": number;
    "index": number;
    "weight_limit": Anonymize<I4q39t5hn830vp>;
};
export type I85dm8mgt48css = AnonymousEnum<{
    /**
     *Initialize a conversion rate to native balance for the given asset.
     *
     *## Complexity
     *- O(1)
     */
    "create": Anonymize<I6nmp4rhqla35>;
    /**
     *Update the conversion rate to native balance for the given asset.
     *
     *## Complexity
     *- O(1)
     */
    "update": Anonymize<I6nmp4rhqla35>;
    /**
     *Remove an existing conversion rate to native balance for the given asset.
     *
     *## Complexity
     *- O(1)
     */
    "remove": Anonymize<I8ndstn7sf4kek>;
}>;
export type I918ie8roegt3d = AnonymousEnum<{
    /**
     *Report voter equivocation/misbehavior. This method will verify the
     *equivocation proof and validate the given key ownership proof
     *against the extracted offender. If both are valid, the offence
     *will be reported.
     */
    "report_equivocation": Anonymize<I3pirohb0sp3ic>;
    /**
     *Report voter equivocation/misbehavior. This method will verify the
     *equivocation proof and validate the given key ownership proof
     *against the extracted offender. If both are valid, the offence
     *will be reported.
     *
     *This extrinsic must be called unsigned and it is expected that only
     *block authors will call it (validated in `ValidateUnsigned`), as such
     *if the block author is defined it will be defined as the equivocation
     *reporter.
     */
    "report_equivocation_unsigned": Anonymize<I3pirohb0sp3ic>;
    /**
     *Reset BEEFY consensus by setting a new BEEFY genesis at `delay_in_blocks` blocks in the
     *future.
     *
     *Note: `delay_in_blocks` has to be at least 1.
     */
    "set_new_genesis": Anonymize<Iemqna2uucuei9>;
}>;
export type I3pirohb0sp3ic = {
    "equivocation_proof": Anonymize<Ifiofttj73fsk1>;
    "key_owner_proof": Anonymize<I3ia7aufsoj0l1>;
};
export type Ifiofttj73fsk1 = {
    "first": Anonymize<I3eao7ea0kppv8>;
    "second": Anonymize<I3eao7ea0kppv8>;
};
export type I3eao7ea0kppv8 = {
    "commitment": Anonymize<I7tlsksnl3jlio>;
    "id": FixedSizeBinary<33>;
    "signature": FixedSizeBinary<65>;
};
export type I7tlsksnl3jlio = {
    "payload": Anonymize<I6vldfoagmi4g5>;
    "block_number": number;
    "validator_set_id": bigint;
};
export type I6vldfoagmi4g5 = Array<Anonymize<I6cq0cjs0cjcep>>;
export type I6cq0cjs0cjcep = [FixedSizeBinary<2>, Binary];
export type Iemqna2uucuei9 = {
    "delay_in_blocks": number;
};
export type I3he5stuuhiokq = {
    "inflation": bigint;
    "next_mint": Anonymize<I200n1ov5tbcvr>;
};
export type Iaqet9jc3ihboe = {
    "header": Anonymize<Ic952bubvq4k7d>;
    "extrinsics": Anonymize<Itom7fk49o0c9>;
};
export type I2v50gu3s1aqk6 = AnonymousEnum<{
    "AllExtrinsics": undefined;
    "OnlyInherents": undefined;
}>;
export type I327rt3qgnu4r6 = ResultPayload<Anonymize<Icjq7kd1j70ubn>, TransactionValidityError>;
export type TransactionValidityError = Enum<{
    "Invalid": TransactionValidityInvalidTransaction;
    "Unknown": TransactionValidityUnknownTransaction;
}>;
export declare const TransactionValidityError: GetEnum<TransactionValidityError>;
export type TransactionValidityInvalidTransaction = Enum<{
    "Call": undefined;
    "Payment": undefined;
    "Future": undefined;
    "Stale": undefined;
    "BadProof": undefined;
    "AncientBirthBlock": undefined;
    "ExhaustsResources": undefined;
    "Custom": number;
    "BadMandatory": undefined;
    "MandatoryValidation": undefined;
    "BadSigner": undefined;
}>;
export declare const TransactionValidityInvalidTransaction: GetEnum<TransactionValidityInvalidTransaction>;
export type TransactionValidityUnknownTransaction = Enum<{
    "CannotLookup": undefined;
    "NoUnsignedValidator": undefined;
    "Custom": number;
}>;
export declare const TransactionValidityUnknownTransaction: GetEnum<TransactionValidityUnknownTransaction>;
export type If7uv525tdvv7a = Array<Anonymize<I76hdjk9qh40no>>;
export type I76hdjk9qh40no = [FixedSizeBinary<8>, Binary];
export type I2an1fs2eiebjp = {
    "okay": boolean;
    "fatal_error": boolean;
    "errors": Anonymize<If7uv525tdvv7a>;
};
export type TransactionValidityTransactionSource = Enum<{
    "InBlock": undefined;
    "Local": undefined;
    "External": undefined;
}>;
export declare const TransactionValidityTransactionSource: GetEnum<TransactionValidityTransactionSource>;
export type Iajbob6uln5jct = ResultPayload<Anonymize<I6g5lcd9vf2cr0>, TransactionValidityError>;
export type I6g5lcd9vf2cr0 = {
    "priority": bigint;
    "requires": Anonymize<Itom7fk49o0c9>;
    "provides": Anonymize<Itom7fk49o0c9>;
    "longevity": bigint;
    "propagate": boolean;
};
export type I5985kfq7sspta = [Anonymize<Iarlj3qd8u1v13>, Anonymize<I94uslvmqboam8>];
export type I94uslvmqboam8 = {
    "session_start_block": number;
    "group_rotation_frequency": number;
    "now": number;
};
export type I4jmodim0td97u = Array<CoreState>;
export type CoreState = Enum<{
    "Occupied": Anonymize<Ish8ehjre2op3>;
    "Scheduled": Anonymize<I4fn9prq249c92>;
    "Free": undefined;
}>;
export declare const CoreState: GetEnum<CoreState>;
export type Ish8ehjre2op3 = {
    "next_up_on_available"?: Anonymize<I7o5sh7g5s2102>;
    "occupied_since": number;
    "time_out_at": number;
    "next_up_on_time_out"?: Anonymize<I7o5sh7g5s2102>;
    "availability": {
        bytes: Uint8Array;
        bitsLen: number;
    };
    "group_responsible": number;
    "candidate_hash": FixedSizeBinary<32>;
    "candidate_descriptor": Anonymize<Ic7r865c0luc3k>;
};
export type I7o5sh7g5s2102 = (Anonymize<I4fn9prq249c92>) | undefined;
export type I4fn9prq249c92 = {
    "para_id": number;
    "collator"?: Anonymize<I4s6vifaf8k998>;
};
export type OccupiedCoreAssumption = Enum<{
    "Included": undefined;
    "TimedOut": undefined;
    "Free": undefined;
}>;
export declare const OccupiedCoreAssumption: GetEnum<OccupiedCoreAssumption>;
export type I9kavsa730sjfr = (Anonymize<Ifn6q3equiq9qi>) | undefined;
export type Ifn6q3equiq9qi = {
    "parent_head": Binary;
    "relay_parent_number": number;
    "relay_parent_storage_root": FixedSizeBinary<32>;
    "max_pov_size": number;
};
export type Ifn3gc8nc1jruq = (Anonymize<If66o9rr0jliun>) | undefined;
export type If66o9rr0jliun = [Anonymize<Ifn6q3equiq9qi>, FixedSizeBinary<32>];
export type Ic5plng3kq7oc8 = (Anonymize<I7t2ron16fup67>) | undefined;
export type Iajdik7eaq7pn0 = Array<CandidateEvent>;
export type CandidateEvent = Enum<{
    "CandidateBacked": Anonymize<Icdu1nb48l753j>;
    "CandidateIncluded": Anonymize<Icdu1nb48l753j>;
    "CandidateTimedOut": Anonymize<I618m2uag0aopg>;
}>;
export declare const CandidateEvent: GetEnum<CandidateEvent>;
export type I2pf0b05mc7sdr = Array<Anonymize<I9hvej6h53dqj0>>;
export type I9hvej6h53dqj0 = [number, Anonymize<Iev3u09i2vqn93>];
export type I7n1him6iq79fv = (Anonymize<Ilg2fqs6cjgs3>) | undefined;
export type Ialuks4a6iupcs = (Anonymize<I9m4rd2a7lc9md>) | undefined;
export type Idv6tqqnmb3i1j = Array<Anonymize<I50481grhh0k81>>;
export type I50481grhh0k81 = [number, FixedSizeBinary<32>, Anonymize<I87u7jalc0lhah>];
export type Iekan13fn586c2 = (Anonymize<I80rnntpog8qp6>) | undefined;
export type Idrp5a1qbbi2au = Array<Anonymize<I9conp6ego37vs>>;
export type I9conp6ego37vs = [number, FixedSizeBinary<32>, Anonymize<I5kqchhvguhfvt>];
export type Iacuu7pfj40eo5 = (Anonymize<Ic2oon6vd55kpc>) | undefined;
export type Ic2oon6vd55kpc = {
    "constraints": Anonymize<I20qrdh8gc2a98>;
    "pending_availability": Anonymize<I77oh9dj91nu1>;
};
export type I20qrdh8gc2a98 = {
    "min_relay_parent_number": number;
    "max_pov_size": number;
    "max_code_size": number;
    "ump_remaining": number;
    "ump_remaining_bytes": number;
    "max_ump_num_per_candidate": number;
    "dmp_remaining_messages": Anonymize<Icgljjb6j82uhn>;
    "hrmp_inbound": Anonymize<Icgljjb6j82uhn>;
    "hrmp_channels_out": Anonymize<I1ilbeu6195gbh>;
    "max_hrmp_num_per_candidate": number;
    "required_parent": Binary;
    "validation_code_hash": FixedSizeBinary<32>;
    "upgrade_restriction"?: Anonymize<Ia3sb0vgvovhtg>;
    "future_validation_code"?: Anonymize<I7gtb9g2qv4r10>;
};
export type I1ilbeu6195gbh = Array<Anonymize<If6i47cerum785>>;
export type If6i47cerum785 = [number, Anonymize<Ifq5eqaefrc6it>];
export type Ifq5eqaefrc6it = {
    "bytes_remaining": number;
    "messages_remaining": number;
};
export type Ia3sb0vgvovhtg = (UpgradeRestriction) | undefined;
export type I7gtb9g2qv4r10 = (Anonymize<I4p5t2krb1gmvp>) | undefined;
export type I77oh9dj91nu1 = Array<Anonymize<Idu4o4nmhcojol>>;
export type Idu4o4nmhcojol = {
    "candidate_hash": FixedSizeBinary<32>;
    "descriptor": Anonymize<Ic7r865c0luc3k>;
    "commitments": Anonymize<Ic1d4u2opv3fst>;
    "relay_parent_number": number;
    "max_pov_size": number;
};
export type I3cs5lehnlql7v = Array<Anonymize<I7t2ron16fup67>>;
export type Ifogo2hpqpe6b4 = (Anonymize<I9gtbosgm5vndt>) | undefined;
export type I9gtbosgm5vndt = {
    "validators": Anonymize<I2fb54desdqd9n>;
    "id": bigint;
};
export type I7rj2bnb76oko1 = ResultPayload<FixedSizeBinary<32>, MmrPrimitivesError>;
export type MmrPrimitivesError = Enum<{
    "InvalidNumericOp": undefined;
    "Push": undefined;
    "GetRoot": undefined;
    "Commit": undefined;
    "GenerateProof": undefined;
    "Verify": undefined;
    "LeafNotFound": undefined;
    "PalletNotIncluded": undefined;
    "InvalidLeafIndex": undefined;
    "InvalidBestKnownBlock": undefined;
}>;
export declare const MmrPrimitivesError: GetEnum<MmrPrimitivesError>;
export type I4o356o7eq06ms = ResultPayload<bigint, MmrPrimitivesError>;
export type I46e127tr8ma2h = ResultPayload<Anonymize<Ifbk46m3pjer4k>, MmrPrimitivesError>;
export type Ifbk46m3pjer4k = [Anonymize<Itom7fk49o0c9>, Anonymize<I38ee9is0n4jn9>];
export type I38ee9is0n4jn9 = {
    "leaf_indices": Anonymize<Iafqnechp3omqg>;
    "leaf_count": bigint;
    "items": Anonymize<Ic5m5lp1oioo8r>;
};
export type Ie88mmnuvmuvp5 = ResultPayload<undefined, MmrPrimitivesError>;
export type Iems84l8lk2v0c = {
    "slot_duration": bigint;
    "epoch_length": bigint;
    "c": Anonymize<I200n1ov5tbcvr>;
    "authorities": Anonymize<I3geksg000c171>;
    "randomness": FixedSizeBinary<32>;
    "allowed_slots": BabeAllowedSlots;
};
export type I1r5ke30ueqo0r = {
    "epoch_index": bigint;
    "start_slot": bigint;
    "duration": bigint;
    "authorities": Anonymize<I3geksg000c171>;
    "randomness": FixedSizeBinary<32>;
    "config": Anonymize<I8jnd4d8ip6djo>;
};
export type Icerf8h8pdu8ss = (Anonymize<I66iuq7l8se39>) | undefined;
export type I66iuq7l8se39 = Array<Anonymize<I9tmff36km6vjg>>;
export type I9tmff36km6vjg = [Binary, FixedSizeBinary<4>];
export type I6spmpef2c7svf = {
    "weight": Anonymize<I4q39t5hn830vp>;
    "class": DispatchClass;
    "partial_fee": bigint;
};
export type Iei2mvq0mjvt81 = {
    "inclusion_fee"?: Anonymize<Id37fum600qfau>;
    "tip": bigint;
};
export type Id37fum600qfau = (Anonymize<I246faqtjrsnee>) | undefined;
export type I246faqtjrsnee = {
    "base_fee": bigint;
    "len_fee": bigint;
    "adjusted_weight_fee": bigint;
};
export type I3om0s7br1hkf1 = AnonymousEnum<{
    "System": Anonymize<Iekve0i6djpd9f>;
    "Scheduler": Anonymize<Ieh64eapar6lrn>;
    "Preimage": Anonymize<If81ks88t5mpk5>;
    "Babe": Anonymize<I1jeo0dpbkma5g>;
    "Timestamp": Anonymize<I7d75gqfg6jh9c>;
    "Indices": Anonymize<I66vlm8f4l1oll>;
    "Balances": Anonymize<I9svldsp29mh87>;
    "Staking": Anonymize<I5jvuh9dlbdd20>;
    "Session": Anonymize<Iceajactc9a8pc>;
    "Grandpa": Anonymize<I5u9ggmn8umfqm>;
    "Treasury": Anonymize<I1s28h18nhih63>;
    "ConvictionVoting": Anonymize<Ie5kd08tutk56t>;
    "Referenda": Anonymize<I657vbelok0a1m>;
    "Whitelist": Anonymize<I970d74tbkf661>;
    "Parameters": Anonymize<Ic5v5ffa0cr70p>;
    "Claims": Anonymize<Id0dj18ct09hlp>;
    "Vesting": Anonymize<Icgf8vmtkbnu4u>;
    "Utility": Anonymize<I9ot6q9gmurbqj>;
    "Proxy": Anonymize<Iu0ohu4lbha45>;
    "Multisig": Anonymize<I80k2ri69bimod>;
    "Bounties": Anonymize<I91kpi5kjh9on2>;
    "ChildBounties": Anonymize<I1b6drdhvt5hl9>;
    "ElectionProviderMultiPhase": Anonymize<I15soeogelbbbh>;
    "VoterList": Anonymize<Ifvfo1l0vu2o7e>;
    "NominationPools": Anonymize<I57mljkkr28m9p>;
    "FastUnstake": Anonymize<I44snhj1gahvrd>;
    "Configuration": Anonymize<Ia9ptue949ognv>;
    "ParasShared": undefined;
    "ParaInclusion": undefined;
    "ParaInherent": Anonymize<Id5l4f3jqtnb0u>;
    "Paras": Anonymize<Ie2dden5k4kk7t>;
    "Initializer": Anonymize<Ieggtnkc96vvt7>;
    "Hrmp": Anonymize<I45adic8nko129>;
    "ParasDisputes": Anonymize<Ifkh1ep7g9h3rv>;
    "ParasSlashing": Anonymize<I3jj054kp2bjol>;
    "OnDemand": Anonymize<I9s7urueli180g>;
    "Registrar": Anonymize<Icclqj5sge2nc7>;
    "Slots": Anonymize<Iafhis924j14hg>;
    "Auctions": Anonymize<I4a8qeimc5p3qn>;
    "Crowdloan": Anonymize<Iaj4q75nu5v2i2>;
    "Coretime": Anonymize<Idu7bbtd2jtnb9>;
    "StateTrieMigration": Anonymize<I39l72gdmkk30t>;
    "XcmPallet": Anonymize<I9nbjvlrb9bp1g>;
    "MessageQueue": Anonymize<I3lic4llm6egbr>;
    "AssetRate": Anonymize<I85dm8mgt48css>;
    "Beefy": Anonymize<I918ie8roegt3d>;
}>;
export type I1p1369d52j8jd = ResultPayload<Anonymize<I66cvqflm1qj24>, Anonymize<Iavct6f844hfju>>;
export type I66cvqflm1qj24 = Array<DotXcmVersionedAssetId>;
export type Iavct6f844hfju = AnonymousEnum<{
    "Unimplemented": undefined;
    "VersionedConversionFailed": undefined;
    "WeightNotComputable": undefined;
    "UnhandledXcmVersion": undefined;
    "AssetNotFound": undefined;
    "Unroutable": undefined;
}>;
export type Ic0c3req3mlc1l = ResultPayload<Anonymize<I4q39t5hn830vp>, Anonymize<Iavct6f844hfju>>;
export type I7ocn4njqde3v5 = ResultPayload<bigint, Anonymize<Iavct6f844hfju>>;
export type I5rlt6h8ph553n = ResultPayload<DotXcmVersionedAssets, Anonymize<Iavct6f844hfju>>;
export type Iethufiek9l1gc = ResultPayload<Anonymize<I2crcbebj5fr6o>, Anonymize<I55ku9c5gk50hb>>;
export type I2crcbebj5fr6o = {
    "execution_result": Anonymize<I7mc367dhekj4>;
    "emitted_events": Anonymize<I457n6ppr7f9nf>;
    "local_xcm"?: Anonymize<I3i0ce56p044d2>;
    "forwarded_xcms": Anonymize<I47tkk5e5nm6g7>;
};
export type I457n6ppr7f9nf = Array<Anonymize<I81evgpvkt084o>>;
export type I3i0ce56p044d2 = (DotXcmVersionedXcm) | undefined;
export type I47tkk5e5nm6g7 = Array<Anonymize<I60vv2hvlt348b>>;
export type I60vv2hvlt348b = [DotXcmVersionedLocation, Anonymize<I7ao2ct6q454mu>];
export type I7ao2ct6q454mu = Array<DotXcmVersionedXcm>;
export type I55ku9c5gk50hb = AnonymousEnum<{
    "Unimplemented": undefined;
    "VersionedConversionFailed": undefined;
}>;
export type I79o4oopf2n4rp = ResultPayload<Anonymize<Ibrd3ha7olmukg>, Anonymize<I55ku9c5gk50hb>>;
export type Ibrd3ha7olmukg = {
    "execution_result": XcmV4TraitsOutcome;
    "emitted_events": Anonymize<I457n6ppr7f9nf>;
    "forwarded_xcms": Anonymize<I47tkk5e5nm6g7>;
};
export type Ieh6nis3hdbtgi = ResultPayload<SS58String, Anonymize<Ibaohq34aedndv>>;
export type Ibaohq34aedndv = AnonymousEnum<{
    "Unsupported": undefined;
    "VersionedConversionFailed": undefined;
}>;
export type Ie9sr1iqcg3cgm = ResultPayload<undefined, string>;
export type I1mqgk2tmnn9i2 = (string) | undefined;
export type I6lr8sctk0bi4e = Array<string>;
export type I6oojue2nhp42f = Array<Anonymize<Id0nkgntglj4vc>>;
export type Id0nkgntglj4vc = {
    "phase": Phase;
    "event": Anonymize<I4djp4s5jm2vmj>;
    "topics": Anonymize<Ic5m5lp1oioo8r>;
};
export type I4djp4s5jm2vmj = AnonymousEnum<{
    "System": Anonymize<I7pnhsc9dv4sdl>;
    "Indices": Anonymize<IndicesEvent>;
    "Balances": Anonymize<Iao8h4hv7atnq3>;
    "TransactionPayment": TransactionPaymentEvent;
    "Staking": StakingEvent;
    "Offences": OffencesEvent;
    "Session": SessionEvent;
    "Grandpa": GrandpaEvent;
    "Treasury": Anonymize<Iceo3qo846468b>;
    "ConvictionVoting": ConvictionVotingEvent;
    "Referenda": Anonymize<Idfraa3b4eu018>;
    "FellowshipCollective": Anonymize<Ifuucdgpuglunu>;
    "FellowshipReferenda": Anonymize<I28aoa43r171jt>;
    "Whitelist": Anonymize<Icfm8kf536krgv>;
    "Parameters": Anonymize<In3t00aurfuda>;
    "Claims": CommonClaimsEvent;
    "Utility": Anonymize<Ib4h80g8852pr1>;
    "Society": Anonymize<Ifhcq78pr9md4e>;
    "Recovery": RecoveryEvent;
    "Vesting": VestingEvent;
    "Scheduler": Anonymize<I1c0hsaopam5qt>;
    "Proxy": Anonymize<I26jj4ru8eej02>;
    "Multisig": Anonymize<Ihko06lcnga6c>;
    "Preimage": PreimageEvent;
    "Bounties": BountiesEvent;
    "ChildBounties": ChildBountiesEvent;
    "ElectionProviderMultiPhase": ElectionProviderMultiPhaseEvent;
    "Nis": Anonymize<I9dmlhfape78ke>;
    "NisCounterpartBalances": Anonymize<Iao8h4hv7atnq3>;
    "VoterList": BagsListEvent;
    "NominationPools": NominationPoolsEvent;
    "FastUnstake": Anonymize<I8r1bva5169aii>;
    "ParaInclusion": ParachainsInclusionEvent;
    "Paras": ParachainsParasEvent;
    "Hrmp": ParachainsHrmpEvent;
    "ParasDisputes": ParachainsDisputesEvent;
    "OnDemandAssignmentProvider": Anonymize<Icuu6jjue8o6eb>;
    "Registrar": CommonParasRegistrarEvent;
    "Slots": CommonSlotsEvent;
    "Auctions": CommonAuctionsEvent;
    "Crowdloan": Anonymize<I74uj7qvtvb25f>;
    "Coretime": PolkadotRuntimeParachainsCoretimeEvent;
    "XcmPallet": Anonymize<I5ce1ru810vv9d>;
    "MessageQueue": Anonymize<I13vul90391uuv>;
    "AssetRate": AssetRateEvent;
}>;
export type I7pnhsc9dv4sdl = AnonymousEnum<{
    /**
     *An extrinsic completed successfully.
     */
    "ExtrinsicSuccess": Anonymize<Ia82mnkmeo2rhc>;
    /**
     *An extrinsic failed.
     */
    "ExtrinsicFailed": Anonymize<I64gl0ge4ir4jn>;
    /**
     *`:code` was updated.
     */
    "CodeUpdated": undefined;
    /**
     *A new account was created.
     */
    "NewAccount": Anonymize<Icbccs0ug47ilf>;
    /**
     *An account was reaped.
     */
    "KilledAccount": Anonymize<Icbccs0ug47ilf>;
    /**
     *On on-chain remark happened.
     */
    "Remarked": Anonymize<I855j4i3kr8ko1>;
    /**
     *An upgrade was authorized.
     */
    "UpgradeAuthorized": Anonymize<Ibgl04rn6nbfm6>;
}>;
export type I64gl0ge4ir4jn = {
    "dispatch_error": Anonymize<I3h7okodr0vdlp>;
    "dispatch_info": Anonymize<Ic9s8f85vjtncc>;
};
export type I3h7okodr0vdlp = AnonymousEnum<{
    "Other": undefined;
    "CannotLookup": undefined;
    "BadOrigin": undefined;
    "Module": Anonymize<Iclbp92g9eqbus>;
    "ConsumerRemaining": undefined;
    "NoProviders": undefined;
    "TooManyConsumers": undefined;
    "Token": TokenError;
    "Arithmetic": ArithmeticError;
    "Transactional": TransactionalError;
    "Exhausted": undefined;
    "Corruption": undefined;
    "Unavailable": undefined;
    "RootNotAllowed": undefined;
}>;
export type Iclbp92g9eqbus = AnonymousEnum<{
    "System": Anonymize<I5o0s7c8q1cc9b>;
    "Babe": Anonymize<Ib6q602k6o213a>;
    "Timestamp": undefined;
    "Indices": Anonymize<Icq1825fru3di2>;
    "Balances": Anonymize<Idj13i7adlomht>;
    "TransactionPayment": undefined;
    "Authorship": undefined;
    "Staking": Anonymize<I11137r14aka6n>;
    "Offences": undefined;
    "Historical": undefined;
    "Session": Anonymize<I1e07dgbaqd1sq>;
    "Grandpa": Anonymize<I7q8i0pp1gkas6>;
    "AuthorityDiscovery": undefined;
    "Treasury": Anonymize<I36uss0m9fpcsf>;
    "ConvictionVoting": Anonymize<Idfa8k8ikssbsf>;
    "Referenda": Anonymize<I84u4ul208g742>;
    "FellowshipCollective": Anonymize<Ib69hbq04ogo7t>;
    "FellowshipReferenda": Anonymize<I84u4ul208g742>;
    "Origins": undefined;
    "Whitelist": Anonymize<I15nctscutpbeh>;
    "Parameters": undefined;
    "Claims": Anonymize<Ijh2jbbqvb176>;
    "Utility": Anonymize<I8dt2g2hcrgh36>;
    "Society": Anonymize<I6n8dkudb3ed0r>;
    "Recovery": Anonymize<I29mqdjoga49c9>;
    "Vesting": Anonymize<Icof2acl69lq3c>;
    "Scheduler": Anonymize<If7oa8fprnilo5>;
    "Proxy": Anonymize<Iuvt54ei4cehc>;
    "Multisig": Anonymize<Ia76qmhhg4jvb9>;
    "Preimage": Anonymize<I1iknkudsdnbks>;
    "Bounties": Anonymize<Ibfvjqqblobf53>;
    "ChildBounties": Anonymize<I4u5ou5u3tthff>;
    "ElectionProviderMultiPhase": Anonymize<Idb84kfjd998sl>;
    "Nis": Anonymize<I3lqplv82e2f8f>;
    "NisCounterpartBalances": Anonymize<Idj13i7adlomht>;
    "VoterList": Anonymize<Ic35l5bgiij29p>;
    "NominationPools": Anonymize<Ic4cmf9id3qcei>;
    "FastUnstake": Anonymize<Iau9bur8dc3bec>;
    "ParachainsOrigin": undefined;
    "Configuration": Anonymize<In1jctfv299lm>;
    "ParasShared": undefined;
    "ParaInclusion": Anonymize<Iat8btfaeiq1le>;
    "ParaInherent": Anonymize<Idfqgoii3heb2f>;
    "ParaScheduler": undefined;
    "Paras": Anonymize<Ieo97unb4d08rl>;
    "Initializer": undefined;
    "Dmp": undefined;
    "Hrmp": Anonymize<Ibns95nfmm92df>;
    "ParaSessionInfo": undefined;
    "ParasDisputes": Anonymize<Iakburbqot4g58>;
    "ParasSlashing": Anonymize<I1v70p1j0r2q1j>;
    "OnDemandAssignmentProvider": Anonymize<I8htscm3ert491>;
    "CoretimeAssignmentProvider": Anonymize<Ie3b9qd0nd59gs>;
    "Registrar": Anonymize<I97vkspnd0b8bh>;
    "Slots": Anonymize<Iers095sa65pbg>;
    "Auctions": Anonymize<I4kgo47o2v3701>;
    "Crowdloan": Anonymize<I9o6l1c4r4qc3s>;
    "Coretime": Anonymize<Ifju0orssp9h7o>;
    "XcmPallet": Anonymize<I87j95aq93d7dq>;
    "MessageQueue": Anonymize<I5iupade5ag2dp>;
    "AssetRate": Anonymize<I3qgd61cgli6cp>;
    "Beefy": Anonymize<Ib6q602k6o213a>;
    "Mmr": undefined;
    "BeefyMmrLeaf": undefined;
}>;
export type Ib69hbq04ogo7t = AnonymousEnum<{
    /**
     *Account is already a member.
     */
    "AlreadyMember": undefined;
    /**
     *Account is not a member.
     */
    "NotMember": undefined;
    /**
     *The given poll index is unknown or has closed.
     */
    "NotPolling": undefined;
    /**
     *The given poll is still ongoing.
     */
    "Ongoing": undefined;
    /**
     *There are no further records to be removed.
     */
    "NoneRemaining": undefined;
    /**
     *Unexpected error in state.
     */
    "Corruption": undefined;
    /**
     *The member's rank is too low to vote.
     */
    "RankTooLow": undefined;
    /**
     *The information provided is incorrect.
     */
    "InvalidWitness": undefined;
    /**
     *The origin is not sufficiently privileged to do the operation.
     */
    "NoPermission": undefined;
    /**
     *The new member to exchange is the same as the old member
     */
    "SameMember": undefined;
    /**
     *The max member count for the rank has been reached.
     */
    "TooManyMembers": undefined;
}>;
export type I6n8dkudb3ed0r = AnonymousEnum<{
    /**
     *User is not a member.
     */
    "NotMember": undefined;
    /**
     *User is already a member.
     */
    "AlreadyMember": undefined;
    /**
     *User is suspended.
     */
    "Suspended": undefined;
    /**
     *User is not suspended.
     */
    "NotSuspended": undefined;
    /**
     *Nothing to payout.
     */
    "NoPayout": undefined;
    /**
     *Society already founded.
     */
    "AlreadyFounded": undefined;
    /**
     *Not enough in pot to accept candidate.
     */
    "InsufficientPot": undefined;
    /**
     *Member is already vouching or banned from vouching again.
     */
    "AlreadyVouching": undefined;
    /**
     *Member is not vouching.
     */
    "NotVouchingOnBidder": undefined;
    /**
     *Cannot remove the head of the chain.
     */
    "Head": undefined;
    /**
     *Cannot remove the founder.
     */
    "Founder": undefined;
    /**
     *User has already made a bid.
     */
    "AlreadyBid": undefined;
    /**
     *User is already a candidate.
     */
    "AlreadyCandidate": undefined;
    /**
     *User is not a candidate.
     */
    "NotCandidate": undefined;
    /**
     *Too many members in the society.
     */
    "MaxMembers": undefined;
    /**
     *The caller is not the founder.
     */
    "NotFounder": undefined;
    /**
     *The caller is not the head.
     */
    "NotHead": undefined;
    /**
     *The membership cannot be claimed as the candidate was not clearly approved.
     */
    "NotApproved": undefined;
    /**
     *The candidate cannot be kicked as the candidate was not clearly rejected.
     */
    "NotRejected": undefined;
    /**
     *The candidacy cannot be dropped as the candidate was clearly approved.
     */
    "Approved": undefined;
    /**
     *The candidacy cannot be bestowed as the candidate was clearly rejected.
     */
    "Rejected": undefined;
    /**
     *The candidacy cannot be concluded as the voting is still in progress.
     */
    "InProgress": undefined;
    /**
     *The candidacy cannot be pruned until a full additional intake period has passed.
     */
    "TooEarly": undefined;
    /**
     *The skeptic already voted.
     */
    "Voted": undefined;
    /**
     *The skeptic need not vote on candidates from expired rounds.
     */
    "Expired": undefined;
    /**
     *User is not a bidder.
     */
    "NotBidder": undefined;
    /**
     *There is no defender currently.
     */
    "NoDefender": undefined;
    /**
     *Group doesn't exist.
     */
    "NotGroup": undefined;
    /**
     *The member is already elevated to this rank.
     */
    "AlreadyElevated": undefined;
    /**
     *The skeptic has already been punished for this offence.
     */
    "AlreadyPunished": undefined;
    /**
     *Funds are insufficient to pay off society debts.
     */
    "InsufficientFunds": undefined;
    /**
     *The candidate/defender has no stale votes to remove.
     */
    "NoVotes": undefined;
}>;
export type I29mqdjoga49c9 = AnonymousEnum<{
    /**
     *User is not allowed to make a call on behalf of this account
     */
    "NotAllowed": undefined;
    /**
     *Threshold must be greater than zero
     */
    "ZeroThreshold": undefined;
    /**
     *Friends list must be greater than zero and threshold
     */
    "NotEnoughFriends": undefined;
    /**
     *Friends list must be less than max friends
     */
    "MaxFriends": undefined;
    /**
     *Friends list must be sorted and free of duplicates
     */
    "NotSorted": undefined;
    /**
     *This account is not set up for recovery
     */
    "NotRecoverable": undefined;
    /**
     *This account is already set up for recovery
     */
    "AlreadyRecoverable": undefined;
    /**
     *A recovery process has already started for this account
     */
    "AlreadyStarted": undefined;
    /**
     *A recovery process has not started for this rescuer
     */
    "NotStarted": undefined;
    /**
     *This account is not a friend who can vouch
     */
    "NotFriend": undefined;
    /**
     *The friend must wait until the delay period to vouch for this recovery
     */
    "DelayPeriod": undefined;
    /**
     *This user has already vouched for this recovery
     */
    "AlreadyVouched": undefined;
    /**
     *The threshold for recovering this account has not been met
     */
    "Threshold": undefined;
    /**
     *There are still active recovery attempts that need to be closed
     */
    "StillActive": undefined;
    /**
     *This account is already set up for recovery
     */
    "AlreadyProxy": undefined;
    /**
     *Some internal state is broken.
     */
    "BadState": undefined;
}>;
export type I3lqplv82e2f8f = AnonymousEnum<{
    /**
     *The duration of the bid is less than one.
     */
    "DurationTooSmall": undefined;
    /**
     *The duration is the bid is greater than the number of queues.
     */
    "DurationTooBig": undefined;
    /**
     *The amount of the bid is less than the minimum allowed.
     */
    "AmountTooSmall": undefined;
    /**
     *The queue for the bid's duration is full and the amount bid is too low to get in
     *through replacing an existing bid.
     */
    "BidTooLow": undefined;
    /**
     *Receipt index is unknown.
     */
    "UnknownReceipt": undefined;
    /**
     *Not the owner of the receipt.
     */
    "NotOwner": undefined;
    /**
     *Bond not yet at expiry date.
     */
    "NotExpired": undefined;
    /**
     *The given bid for retraction is not found.
     */
    "UnknownBid": undefined;
    /**
     *The portion supplied is beyond the value of the receipt.
     */
    "PortionTooBig": undefined;
    /**
     *Not enough funds are held to pay out.
     */
    "Unfunded": undefined;
    /**
     *There are enough funds for what is required.
     */
    "AlreadyFunded": undefined;
    /**
     *The thaw throttle has been reached for this period.
     */
    "Throttled": undefined;
    /**
     *The operation would result in a receipt worth an insignificant value.
     */
    "MakesDust": undefined;
    /**
     *The receipt is already communal.
     */
    "AlreadyCommunal": undefined;
    /**
     *The receipt is already private.
     */
    "AlreadyPrivate": undefined;
}>;
export type Ifuucdgpuglunu = AnonymousEnum<{
    /**
     *A member `who` has been added.
     */
    "MemberAdded": Anonymize<I4cbvqmqadhrea>;
    /**
     *The member `who`se rank has been changed to the given `rank`.
     */
    "RankChanged": Anonymize<Im1pm2vf6llcn>;
    /**
     *The member `who` of given `rank` has been removed from the collective.
     */
    "MemberRemoved": Anonymize<Im1pm2vf6llcn>;
    /**
     *The member `who` has voted for the `poll` with the given `vote` leading to an updated
     *`tally`.
     */
    "Voted": Anonymize<I21jsoeb0o6476>;
    /**
     *The member `who` had their `AccountId` changed to `new_who`.
     */
    "MemberExchanged": Anonymize<Ier6ck0tpfo7>;
}>;
export type Im1pm2vf6llcn = {
    "who": SS58String;
    "rank": number;
};
export type I21jsoeb0o6476 = {
    "who": SS58String;
    "poll": number;
    "vote": Anonymize<I3gg47bgkgq9tr>;
    "tally": Anonymize<I6d634btv7misu>;
};
export type I3gg47bgkgq9tr = AnonymousEnum<{
    "Aye": number;
    "Nay": number;
}>;
export type I6d634btv7misu = {
    "bare_ayes": number;
    "ayes": number;
    "nays": number;
};
export type Ier6ck0tpfo7 = {
    "who": SS58String;
    "new_who": SS58String;
};
export type I28aoa43r171jt = AnonymousEnum<{
    /**
     *A referendum has been submitted.
     */
    "Submitted": Anonymize<I229ijht536qdu>;
    /**
     *The decision deposit has been placed.
     */
    "DecisionDepositPlaced": Anonymize<I62nte77gksm0f>;
    /**
     *The decision deposit has been refunded.
     */
    "DecisionDepositRefunded": Anonymize<I62nte77gksm0f>;
    /**
     *A deposit has been slashed.
     */
    "DepositSlashed": Anonymize<Id5fm4p8lj5qgi>;
    /**
     *A referendum has moved into the deciding phase.
     */
    "DecisionStarted": Anonymize<Ic6ecdcp9ut7jd>;
    "ConfirmStarted": Anonymize<I666bl2fqjkejo>;
    "ConfirmAborted": Anonymize<I666bl2fqjkejo>;
    /**
     *A referendum has ended its confirmation phase and is ready for approval.
     */
    "Confirmed": Anonymize<I27notaksll8qt>;
    /**
     *A referendum has been approved and its proposal has been scheduled.
     */
    "Approved": Anonymize<I666bl2fqjkejo>;
    /**
     *A proposal has been rejected by referendum.
     */
    "Rejected": Anonymize<I27notaksll8qt>;
    /**
     *A referendum has been timed out without being decided.
     */
    "TimedOut": Anonymize<I27notaksll8qt>;
    /**
     *A referendum has been cancelled.
     */
    "Cancelled": Anonymize<I27notaksll8qt>;
    /**
     *A referendum has been killed.
     */
    "Killed": Anonymize<I27notaksll8qt>;
    /**
     *The submission deposit has been refunded.
     */
    "SubmissionDepositRefunded": Anonymize<I62nte77gksm0f>;
    /**
     *Metadata for a referendum has been set.
     */
    "MetadataSet": Anonymize<I4f1hv034jf1dt>;
    /**
     *Metadata for a referendum has been cleared.
     */
    "MetadataCleared": Anonymize<I4f1hv034jf1dt>;
}>;
export type Ic6ecdcp9ut7jd = {
    /**
     *Index of the referendum.
     */
    "index": number;
    /**
     *The track (and by extension proposal dispatch origin) of this referendum.
     */
    "track": number;
    /**
     *The proposal for the referendum.
     */
    "proposal": PreimagesBounded;
    /**
     *The current tally of votes in this referendum.
     */
    "tally": Anonymize<I6d634btv7misu>;
};
export type I27notaksll8qt = {
    /**
     *Index of the referendum.
     */
    "index": number;
    /**
     *The final tally of votes in this referendum.
     */
    "tally": Anonymize<I6d634btv7misu>;
};
export type Icfm8kf536krgv = AnonymousEnum<{
    "CallWhitelisted": Anonymize<I1adbcfi5uc62r>;
    "WhitelistedCallRemoved": Anonymize<I1adbcfi5uc62r>;
    "WhitelistedCallDispatched": Anonymize<Ifehsusc6g747o>;
}>;
export type Ifehsusc6g747o = {
    "call_hash": FixedSizeBinary<32>;
    "result": Anonymize<Iftq10rlffn46u>;
};
export type Iftq10rlffn46u = ResultPayload<Anonymize<Ia1u1r3n74r13c>, Anonymize<I4otaqja372817>>;
export type I4otaqja372817 = {
    "post_info": Anonymize<Ia1u1r3n74r13c>;
    "error": Anonymize<I3h7okodr0vdlp>;
};
export type Ib4h80g8852pr1 = AnonymousEnum<{
    /**
     *Batch of dispatches did not complete fully. Index of first failing dispatch given, as
     *well as the error.
     */
    "BatchInterrupted": Anonymize<I47k56fn84rojg>;
    /**
     *Batch of dispatches completed fully with no error.
     */
    "BatchCompleted": undefined;
    /**
     *Batch of dispatches completed but has errors.
     */
    "BatchCompletedWithErrors": undefined;
    /**
     *A single item within a Batch of dispatches has completed with no error.
     */
    "ItemCompleted": undefined;
    /**
     *A single item within a Batch of dispatches has completed with error.
     */
    "ItemFailed": Anonymize<Iase69ms3nbqke>;
    /**
     *A call was dispatched.
     */
    "DispatchedAs": Anonymize<I461t9gdjcm4o5>;
}>;
export type I47k56fn84rojg = {
    "index": number;
    "error": Anonymize<I3h7okodr0vdlp>;
};
export type Iase69ms3nbqke = {
    "error": Anonymize<I3h7okodr0vdlp>;
};
export type I461t9gdjcm4o5 = {
    "result": Anonymize<Idog2s3a8to2s8>;
};
export type Idog2s3a8to2s8 = ResultPayload<undefined, Anonymize<I3h7okodr0vdlp>>;
export type Ifhcq78pr9md4e = AnonymousEnum<{
    /**
     *The society is founded by the given identity.
     */
    "Founded": Anonymize<I8ircspqpe79k7>;
    /**
     *A membership bid just happened. The given account is the candidate's ID and their offer
     *is the second.
     */
    "Bid": Anonymize<I1vlt8l6nvnen6>;
    /**
     *A membership bid just happened by vouching. The given account is the candidate's ID and
     *their offer is the second. The vouching party is the third.
     */
    "Vouch": Anonymize<I72vf0j9juc1df>;
    /**
     *A candidate was dropped (due to an excess of bids in the system).
     */
    "AutoUnbid": Anonymize<I4b66js88p45m8>;
    /**
     *A candidate was dropped (by their request).
     */
    "Unbid": Anonymize<I4b66js88p45m8>;
    /**
     *A candidate was dropped (by request of who vouched for them).
     */
    "Unvouch": Anonymize<I4b66js88p45m8>;
    /**
     *A group of candidates have been inducted. The batch's primary is the first value, the
     *batch in full is the second.
     */
    "Inducted": Anonymize<Ie0phfcvllr4od>;
    /**
     *A suspended member has been judged.
     */
    "SuspendedMemberJudgement": Anonymize<I476ep66p6ddg1>;
    /**
     *A candidate has been suspended
     */
    "CandidateSuspended": Anonymize<I4b66js88p45m8>;
    /**
     *A member has been suspended
     */
    "MemberSuspended": Anonymize<Ie3gphha4ejh40>;
    /**
     *A member has been challenged
     */
    "Challenged": Anonymize<Ie3gphha4ejh40>;
    /**
     *A vote has been placed
     */
    "Vote": Anonymize<If0btdsid69rrm>;
    /**
     *A vote has been placed for a defending member
     */
    "DefenderVote": Anonymize<Ictusacdcqj61u>;
    /**
     *A new set of \[params\] has been set for the group.
     */
    "NewParams": Anonymize<Ibsolu3c3q1lb4>;
    /**
     *Society is unfounded.
     */
    "Unfounded": Anonymize<I8ircspqpe79k7>;
    /**
     *Some funds were deposited into the society account.
     */
    "Deposit": Anonymize<Ie5v6njpckr05b>;
    /**
     *A \[member\] got elevated to \[rank\].
     */
    "Elevated": Anonymize<Ib116djgo9u4uo>;
}>;
export type I8ircspqpe79k7 = {
    "founder": SS58String;
};
export type I1vlt8l6nvnen6 = {
    "candidate_id": SS58String;
    "offer": bigint;
};
export type I72vf0j9juc1df = {
    "candidate_id": SS58String;
    "offer": bigint;
    "vouching": SS58String;
};
export type I4b66js88p45m8 = {
    "candidate": SS58String;
};
export type Ie0phfcvllr4od = {
    "primary": SS58String;
    "candidates": Anonymize<Ia2lhg7l2hilo3>;
};
export type I476ep66p6ddg1 = {
    "who": SS58String;
    "judged": boolean;
};
export type Ie3gphha4ejh40 = {
    "member": SS58String;
};
export type If0btdsid69rrm = {
    "candidate": SS58String;
    "voter": SS58String;
    "vote": boolean;
};
export type Ictusacdcqj61u = {
    "voter": SS58String;
    "vote": boolean;
};
export type Ibsolu3c3q1lb4 = {
    "params": Anonymize<I9hkvi4k3kh916>;
};
export type I9hkvi4k3kh916 = {
    "max_members": number;
    "max_intake": number;
    "max_strikes": number;
    "candidate_deposit": bigint;
};
export type Ib116djgo9u4uo = {
    "member": SS58String;
    "rank": number;
};
export type RecoveryEvent = Enum<{
    /**
     *A recovery process has been set up for an account.
     */
    "RecoveryCreated": Anonymize<Icbccs0ug47ilf>;
    /**
     *A recovery process has been initiated for lost account by rescuer account.
     */
    "RecoveryInitiated": Anonymize<I9vkkue6cq74et>;
    /**
     *A recovery process for lost account by rescuer account has been vouched for by sender.
     */
    "RecoveryVouched": Anonymize<Ibu56t5h1q49i4>;
    /**
     *A recovery process for lost account by rescuer account has been closed.
     */
    "RecoveryClosed": Anonymize<I9vkkue6cq74et>;
    /**
     *Lost account has been successfully recovered by rescuer account.
     */
    "AccountRecovered": Anonymize<I9vkkue6cq74et>;
    /**
     *A recovery process has been removed for an account.
     */
    "RecoveryRemoved": Anonymize<I1dmtl5t34b9g>;
}>;
export declare const RecoveryEvent: GetEnum<RecoveryEvent>;
export type I9vkkue6cq74et = {
    "lost_account": SS58String;
    "rescuer_account": SS58String;
};
export type Ibu56t5h1q49i4 = {
    "lost_account": SS58String;
    "rescuer_account": SS58String;
    "sender": SS58String;
};
export type I1dmtl5t34b9g = {
    "lost_account": SS58String;
};
export type I1c0hsaopam5qt = AnonymousEnum<{
    /**
     *Scheduled some task.
     */
    "Scheduled": Anonymize<I5n4sebgkfr760>;
    /**
     *Canceled some task.
     */
    "Canceled": Anonymize<I5n4sebgkfr760>;
    /**
     *Dispatched some task.
     */
    "Dispatched": Anonymize<Idhmkdhk0gf66d>;
    /**
     *Set a retry configuration for some task.
     */
    "RetrySet": Anonymize<Ia3c82eadg79bj>;
    /**
     *Cancel a retry configuration for some task.
     */
    "RetryCancelled": Anonymize<Ienusoeb625ftq>;
    /**
     *The call for the provided hash was not found so the task has been aborted.
     */
    "CallUnavailable": Anonymize<Ienusoeb625ftq>;
    /**
     *The given task was unable to be renewed since the agenda is full at that block.
     */
    "PeriodicFailed": Anonymize<Ienusoeb625ftq>;
    /**
     *The given task was unable to be retried since the agenda is full at that block or there
     *was not enough weight to reschedule it.
     */
    "RetryFailed": Anonymize<Ienusoeb625ftq>;
    /**
     *The given task can never be executed since it is overweight.
     */
    "PermanentlyOverweight": Anonymize<Ienusoeb625ftq>;
}>;
export type Idhmkdhk0gf66d = {
    "task": Anonymize<I9jd27rnpm8ttv>;
    "id"?: Anonymize<I4s6vifaf8k998>;
    "result": Anonymize<Idog2s3a8to2s8>;
};
export type I26jj4ru8eej02 = AnonymousEnum<{
    /**
     *A proxy was executed correctly, with the given.
     */
    "ProxyExecuted": Anonymize<I461t9gdjcm4o5>;
    /**
     *A pure account has been created by new proxy with given
     *disambiguation index and proxy type.
     */
    "PureCreated": Anonymize<Ia9qkoqqvill5r>;
    /**
     *An announcement was placed to make a call in the future.
     */
    "Announced": Anonymize<I2ur0oeqg495j8>;
    /**
     *A proxy was added.
     */
    "ProxyAdded": Anonymize<Ica4ean4b9ksdn>;
    /**
     *A proxy was removed.
     */
    "ProxyRemoved": Anonymize<Ica4ean4b9ksdn>;
}>;
export type Ia9qkoqqvill5r = {
    "pure": SS58String;
    "who": SS58String;
    "proxy_type": Anonymize<I1ffle57clnprr>;
    "disambiguation_index": number;
};
export type I1ffle57clnprr = AnonymousEnum<{
    "Any": undefined;
    "NonTransfer": undefined;
    "Governance": undefined;
    "Staking": undefined;
    "CancelProxy": undefined;
    "Auction": undefined;
    "Society": undefined;
    "NominationPools": undefined;
    "Spokesperson": undefined;
}>;
export type Ica4ean4b9ksdn = {
    "delegator": SS58String;
    "delegatee": SS58String;
    "proxy_type": Anonymize<I1ffle57clnprr>;
    "delay": number;
};
export type Ihko06lcnga6c = AnonymousEnum<{
    /**
     *A new multisig operation has begun.
     */
    "NewMultisig": Anonymize<Iep27ialq4a7o7>;
    /**
     *A multisig operation has been approved by someone.
     */
    "MultisigApproval": Anonymize<Iasu5jvoqr43mv>;
    /**
     *A multisig operation has been executed.
     */
    "MultisigExecuted": Anonymize<Icbi9ul88saklf>;
    /**
     *A multisig operation has been cancelled.
     */
    "MultisigCancelled": Anonymize<I5qolde99acmd1>;
}>;
export type Icbi9ul88saklf = {
    "approving": SS58String;
    "timepoint": Anonymize<Itvprrpb0nm3o>;
    "multisig": SS58String;
    "call_hash": FixedSizeBinary<32>;
    "result": Anonymize<Idog2s3a8to2s8>;
};
export type I9dmlhfape78ke = AnonymousEnum<{
    /**
     *A bid was successfully placed.
     */
    "BidPlaced": Anonymize<Ie2vmgag6qiue4>;
    /**
     *A bid was successfully removed (before being accepted).
     */
    "BidRetracted": Anonymize<Ie2vmgag6qiue4>;
    /**
     *A bid was dropped from a queue because of another, more substantial, bid was present.
     */
    "BidDropped": Anonymize<Ie2vmgag6qiue4>;
    /**
     *A bid was accepted. The balance may not be released until expiry.
     */
    "Issued": Anonymize<I1kpuet4lkcdpf>;
    /**
     *An receipt has been (at least partially) thawed.
     */
    "Thawed": Anonymize<I5tr1gp2t9i6oh>;
    /**
     *An automatic funding of the deficit was made.
     */
    "Funded": Anonymize<I7ls1r4u61csif>;
    /**
     *A receipt was transferred.
     */
    "Transferred": Anonymize<I3gjgtso69eopr>;
}>;
export type Ie2vmgag6qiue4 = {
    "who": SS58String;
    "amount": bigint;
    "duration": number;
};
export type I1kpuet4lkcdpf = {
    /**
     *The identity of the receipt.
     */
    "index": number;
    /**
     *The block number at which the receipt may be thawed.
     */
    "expiry": number;
    /**
     *The owner of the receipt.
     */
    "who": SS58String;
    /**
     *The proportion of the effective total issuance which the receipt represents.
     */
    "proportion": bigint;
    /**
     *The amount of funds which were debited from the owner.
     */
    "amount": bigint;
};
export type I5tr1gp2t9i6oh = {
    /**
     *The identity of the receipt.
     */
    "index": number;
    /**
     *The owner.
     */
    "who": SS58String;
    /**
     *The proportion of the effective total issuance by which the owner was debited.
     */
    "proportion": bigint;
    /**
     *The amount by which the owner was credited.
     */
    "amount": bigint;
    /**
     *If `true` then the receipt is done.
     */
    "dropped": boolean;
};
export type I7ls1r4u61csif = {
    "deficit": bigint;
};
export type I3gjgtso69eopr = {
    "from": SS58String;
    "to": SS58String;
    "index": number;
};
export type I8r1bva5169aii = AnonymousEnum<{
    /**
     *A staker was unstaked.
     */
    "Unstaked": Anonymize<Idsn6b9o09ac22>;
    /**
     *A staker was slashed for requesting fast-unstake whilst being exposed.
     */
    "Slashed": Anonymize<Ifk8eme5o7mukf>;
    /**
     *A batch was partially checked for the given eras, but the process did not finish.
     */
    "BatchChecked": Anonymize<Ic0he9tlf9ll0u>;
    /**
     *A batch of a given size was terminated.
     *
     *This is always follows by a number of `Unstaked` or `Slashed` events, marking the end
     *of the batch. A new batch will be created upon next block.
     */
    "BatchFinished": Anonymize<I54umskavgc9du>;
    /**
     *An internal error happened. Operations will be paused now.
     */
    "InternalError": undefined;
}>;
export type Idsn6b9o09ac22 = {
    "stash": SS58String;
    "result": Anonymize<Idog2s3a8to2s8>;
};
export type I74uj7qvtvb25f = AnonymousEnum<{
    /**
     *Create a new crowdloaning campaign.
     */
    "Created": Anonymize<I37r4bdai8o9mp>;
    /**
     *Contributed to a crowd sale.
     */
    "Contributed": Anonymize<I8ve4g3egaln6a>;
    /**
     *Withdrew full balance of a contributor.
     */
    "Withdrew": Anonymize<I8ve4g3egaln6a>;
    /**
     *The loans in a fund have been partially dissolved, i.e. there are some left
     *over child keys that still need to be killed.
     */
    "PartiallyRefunded": Anonymize<I37r4bdai8o9mp>;
    /**
     *All loans in a fund have been refunded.
     */
    "AllRefunded": Anonymize<I37r4bdai8o9mp>;
    /**
     *Fund is dissolved.
     */
    "Dissolved": Anonymize<I37r4bdai8o9mp>;
    /**
     *The result of trying to submit a new bid to the Slots pallet.
     */
    "HandleBidResult": Anonymize<I5too1knnpqnk1>;
    /**
     *The configuration to a crowdloan has been edited.
     */
    "Edited": Anonymize<I37r4bdai8o9mp>;
    /**
     *A memo has been updated.
     */
    "MemoUpdated": Anonymize<If4hvqaeoqq5us>;
    /**
     *A parachain has been moved to `NewRaise`
     */
    "AddedToNewRaise": Anonymize<I37r4bdai8o9mp>;
}>;
export type I5too1knnpqnk1 = {
    "para_id": number;
    "result": Anonymize<Idog2s3a8to2s8>;
};
export type Ifosl32ihgoeq6 = Array<Anonymize<I31ossno23rsso>>;
export type I31ossno23rsso = {
    "id": Anonymize<I5uctuo4q9kfsv>;
    "amount": bigint;
};
export type I5uctuo4q9kfsv = AnonymousEnum<{
    "Preimage": PreimagePalletHoldReason;
    "Nis": Anonymize<I8492esr84fcem>;
}>;
export type I8492esr84fcem = AnonymousEnum<{
    "NftReceipt": undefined;
}>;
export type I85t6l9pssiov4 = AnonymousEnum<{
    "Ongoing": Anonymize<Iavs9hbci87eth>;
    "Approved": Anonymize<Ini94eljn5lj8>;
    "Rejected": Anonymize<Ini94eljn5lj8>;
    "Cancelled": Anonymize<Ini94eljn5lj8>;
    "TimedOut": Anonymize<Ini94eljn5lj8>;
    "Killed": number;
}>;
export type Iavs9hbci87eth = {
    "track": number;
    "origin": Anonymize<I575vh6g119dum>;
    "proposal": PreimagesBounded;
    "enactment": TraitsScheduleDispatchTime;
    "submitted": number;
    "submission_deposit": Anonymize<Id5fm4p8lj5qgi>;
    "decision_deposit"?: Anonymize<Ibd24caul84kv2>;
    "deciding"?: Anonymize<Ibcbcndfmk0jd9>;
    "tally": Anonymize<Ifsk7cbmtit1jd>;
    "in_queue": boolean;
    "alarm"?: Anonymize<I3aj03qk2o5mdm>;
};
export type I575vh6g119dum = AnonymousEnum<{
    "system": DispatchRawOrigin;
    "Origins": Anonymize<I8frjhb9r4pt5a>;
    "ParachainsOrigin": ParachainsOrigin;
    "XcmPallet": XcmPalletOrigin;
    "Void": undefined;
}>;
export type I8frjhb9r4pt5a = AnonymousEnum<{
    "StakingAdmin": undefined;
    "Treasurer": undefined;
    "FellowshipAdmin": undefined;
    "GeneralAdmin": undefined;
    "AuctionAdmin": undefined;
    "LeaseAdmin": undefined;
    "ReferendumCanceller": undefined;
    "ReferendumKiller": undefined;
    "SmallTipper": undefined;
    "BigTipper": undefined;
    "SmallSpender": undefined;
    "MediumSpender": undefined;
    "BigSpender": undefined;
    "WhitelistedCaller": undefined;
    "FellowshipInitiates": undefined;
    "Fellows": undefined;
    "FellowshipExperts": undefined;
    "FellowshipMasters": undefined;
    "Fellowship1Dan": undefined;
    "Fellowship2Dan": undefined;
    "Fellowship3Dan": undefined;
    "Fellowship4Dan": undefined;
    "Fellowship5Dan": undefined;
    "Fellowship6Dan": undefined;
    "Fellowship7Dan": undefined;
    "Fellowship8Dan": undefined;
    "Fellowship9Dan": undefined;
    "WishForChange": undefined;
}>;
export type Icousgkbefm7ke = AnonymousEnum<{
    "Ongoing": Anonymize<Ifukao8u7abrdr>;
    "Approved": Anonymize<Ini94eljn5lj8>;
    "Rejected": Anonymize<Ini94eljn5lj8>;
    "Cancelled": Anonymize<Ini94eljn5lj8>;
    "TimedOut": Anonymize<Ini94eljn5lj8>;
    "Killed": number;
}>;
export type Ifukao8u7abrdr = {
    "track": number;
    "origin": Anonymize<I575vh6g119dum>;
    "proposal": PreimagesBounded;
    "enactment": TraitsScheduleDispatchTime;
    "submitted": number;
    "submission_deposit": Anonymize<Id5fm4p8lj5qgi>;
    "decision_deposit"?: Anonymize<Ibd24caul84kv2>;
    "deciding"?: Anonymize<Ibcbcndfmk0jd9>;
    "tally": Anonymize<I6d634btv7misu>;
    "in_queue": boolean;
    "alarm"?: Anonymize<I3aj03qk2o5mdm>;
};
export type Iam8qhv8b3jn4n = {
    "rank": number;
    "strikes": number;
    "vouching"?: Anonymize<I8fmgqeahq5asi>;
    "index": number;
};
export type I8fmgqeahq5asi = (Anonymize<I4e8agnd8ntmu4>) | undefined;
export type I4e8agnd8ntmu4 = AnonymousEnum<{
    "Vouching": undefined;
    "Banned": undefined;
}>;
export type I1659sf24o6ga8 = {
    "paid": bigint;
    "payouts": Anonymize<If9jidduiuq7vv>;
};
export type Iehiasr6uoqbq = Array<Anonymize<If6fsasj8kq72c>>;
export type If6fsasj8kq72c = {
    "who": SS58String;
    "kind": Anonymize<Iand3m1ru4ke2b>;
    "value": bigint;
};
export type Iand3m1ru4ke2b = AnonymousEnum<{
    "Deposit": bigint;
    "Vouch": Anonymize<I95l2k9b1re95f>;
}>;
export type I8adv0j4q3uu5d = {
    "round": number;
    "kind": Anonymize<Iand3m1ru4ke2b>;
    "bid": bigint;
    "tally": Anonymize<Ic4n54m09tc5na>;
    "skeptic_struck": boolean;
};
export type Ic4n54m09tc5na = {
    "approvals": number;
    "rejections": number;
};
export type I7d29ossbog0d3 = {
    "approve": boolean;
    "weight": number;
};
export type I7mgf69gvksvu2 = {
    "who": SS58String;
    "bid": bigint;
    "round": number;
};
export type I3sfg6klg56vmk = [SS58String, SS58String, Anonymize<Ic4n54m09tc5na>];
export type Ibprd8oi8phm62 = {
    "delay_period": number;
    "deposit": bigint;
    "friends": Anonymize<Ia2lhg7l2hilo3>;
    "threshold": number;
};
export type Idlqqo993i780l = {
    "created": number;
    "deposit": bigint;
    "friends": Anonymize<Ia2lhg7l2hilo3>;
};
export type Ic836nv7r3fq4i = Array<Anonymize<I6amhs2ie7hg6c>>;
export type I6amhs2ie7hg6c = (Anonymize<I423jsfgdvl58f>) | undefined;
export type I423jsfgdvl58f = {
    "maybe_id"?: Anonymize<I4s6vifaf8k998>;
    "priority": number;
    "call": PreimagesBounded;
    "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
    "origin": Anonymize<I575vh6g119dum>;
};
export type I3khkuiss7sr1m = [Anonymize<I470fg2etb4rsu>, bigint];
export type I470fg2etb4rsu = Array<Anonymize<Iffeqohmvisp0>>;
export type Iffeqohmvisp0 = {
    "delegate": SS58String;
    "proxy_type": Anonymize<I1ffle57clnprr>;
    "delay": number;
};
export type I84stt310eb6c3 = {
    "who": SS58String;
    "deposit": bigint;
    "raw_solution": Anonymize<I6s33laenmuupn>;
    "call_fee": bigint;
};
export type I6s33laenmuupn = {
    "solution": Anonymize<Ic8o63p0sveg3g>;
    "score": Anonymize<I8s6n43okuj2b1>;
    "round": number;
};
export type Ic8o63p0sveg3g = {
    "votes1": Anonymize<Iep4uo61810hfs>;
    "votes2": Anonymize<Ickjq69hlul8c3>;
    "votes3": Anonymize<Icf645ln9bi1bj>;
    "votes4": Anonymize<I8nospv7k5s457>;
    "votes5": Anonymize<Iig9pofg77rah>;
    "votes6": Anonymize<Irttjt9tghoc0>;
    "votes7": Anonymize<I3o5epjr2va0dl>;
    "votes8": Anonymize<I1gfnebceebqb5>;
    "votes9": Anonymize<Ibo38fh2dhj4it>;
    "votes10": Anonymize<Id4gvspmdh8h9l>;
    "votes11": Anonymize<I5be3ho5m1r68a>;
    "votes12": Anonymize<I7s2sh7cpuv56r>;
    "votes13": Anonymize<I5fq8855gfhmlo>;
    "votes14": Anonymize<I4mvok713k4g7o>;
    "votes15": Anonymize<I90tu9lmjmhfhd>;
    "votes16": Anonymize<I3cqaev9m4hn9m>;
    "votes17": Anonymize<Ic2otmj72fnr4f>;
    "votes18": Anonymize<Iakspodb433ll5>;
    "votes19": Anonymize<Iepp1vqqhfbch8>;
    "votes20": Anonymize<I98jogsmh342m3>;
    "votes21": Anonymize<I2fk4dasd66na2>;
    "votes22": Anonymize<Ie417vs28qcnsh>;
    "votes23": Anonymize<I5920hg8jo1it6>;
    "votes24": Anonymize<I7qdp96bmn8lfe>;
};
export type Ic2otmj72fnr4f = Array<Anonymize<Iaujc1cdlbr21l>>;
export type Iaujc1cdlbr21l = [number, Anonymize<Ifo5mgovn0mc4e>, number];
export type Ifo5mgovn0mc4e = FixedSizeArray<16, Anonymize<I5g2vv0ckl2m8b>>;
export type Iakspodb433ll5 = Array<Anonymize<Id83t9vq36ke6a>>;
export type Id83t9vq36ke6a = [number, Anonymize<Ibud865gntq530>, number];
export type Ibud865gntq530 = FixedSizeArray<17, Anonymize<I5g2vv0ckl2m8b>>;
export type Iepp1vqqhfbch8 = Array<Anonymize<Ieveht3di3sfiu>>;
export type Ieveht3di3sfiu = [number, Anonymize<I776l0s5q9rvur>, number];
export type I776l0s5q9rvur = FixedSizeArray<18, Anonymize<I5g2vv0ckl2m8b>>;
export type I98jogsmh342m3 = Array<Anonymize<I9eq1v7erl4gvr>>;
export type I9eq1v7erl4gvr = [number, Anonymize<I7ojjkc2iopt95>, number];
export type I7ojjkc2iopt95 = FixedSizeArray<19, Anonymize<I5g2vv0ckl2m8b>>;
export type I2fk4dasd66na2 = Array<Anonymize<I5bs1mqum7i23c>>;
export type I5bs1mqum7i23c = [number, Anonymize<Idpqm03dj290nq>, number];
export type Idpqm03dj290nq = FixedSizeArray<20, Anonymize<I5g2vv0ckl2m8b>>;
export type Ie417vs28qcnsh = Array<Anonymize<Ibhc2kquefu249>>;
export type Ibhc2kquefu249 = [number, Anonymize<I2rgpk02ffvb64>, number];
export type I2rgpk02ffvb64 = FixedSizeArray<21, Anonymize<I5g2vv0ckl2m8b>>;
export type I5920hg8jo1it6 = Array<Anonymize<I9ha4eaj26vum3>>;
export type I9ha4eaj26vum3 = [number, Anonymize<I1tq0t8vavpkbg>, number];
export type I1tq0t8vavpkbg = FixedSizeArray<22, Anonymize<I5g2vv0ckl2m8b>>;
export type I7qdp96bmn8lfe = Array<Anonymize<I4gbt1pgsl06ua>>;
export type I4gbt1pgsl06ua = [number, Anonymize<I9mfrictenmkj8>, number];
export type I9mfrictenmkj8 = FixedSizeArray<23, Anonymize<I5g2vv0ckl2m8b>>;
export type I2cqtnj49ogo81 = Array<Anonymize<Id5fm4p8lj5qgi>>;
export type I7btpfdeli5ea8 = {
    "proportion_owed": bigint;
    "index": number;
    "thawed": bigint;
    "last_period": number;
    "receipts_on_hold": bigint;
};
export type Ic79q40j9qptgh = {
    "proportion": bigint;
    "owner"?: Anonymize<I92hdo1clkbp4g>;
    "expiry": number;
};
export type I9bin2jc70qt6q = Array<Anonymize<I3qt1hgg4djhgb>>;
export type I4vi3hlg2ca351 = AnonymousEnum<{
    /**
     *Propose a referendum on a privileged action.
     *
     *- `origin`: must be `SubmitOrigin` and the account must have `SubmissionDeposit` funds
     *  available.
     *- `proposal_origin`: The origin from which the proposal should be executed.
     *- `proposal`: The proposal.
     *- `enactment_moment`: The moment that the proposal should be enacted.
     *
     *Emits `Submitted`.
     */
    "submit": Anonymize<I4dvjo4haia091>;
    /**
     *Post the Decision Deposit for a referendum.
     *
     *- `origin`: must be `Signed` and the account must have funds available for the
     *  referendum's track's Decision Deposit.
     *- `index`: The index of the submitted referendum whose Decision Deposit is yet to be
     *  posted.
     *
     *Emits `DecisionDepositPlaced`.
     */
    "place_decision_deposit": Anonymize<I666bl2fqjkejo>;
    /**
     *Refund the Decision Deposit for a closed referendum back to the depositor.
     *
     *- `origin`: must be `Signed` or `Root`.
     *- `index`: The index of a closed referendum whose Decision Deposit has not yet been
     *  refunded.
     *
     *Emits `DecisionDepositRefunded`.
     */
    "refund_decision_deposit": Anonymize<I666bl2fqjkejo>;
    /**
     *Cancel an ongoing referendum.
     *
     *- `origin`: must be the `CancelOrigin`.
     *- `index`: The index of the referendum to be cancelled.
     *
     *Emits `Cancelled`.
     */
    "cancel": Anonymize<I666bl2fqjkejo>;
    /**
     *Cancel an ongoing referendum and slash the deposits.
     *
     *- `origin`: must be the `KillOrigin`.
     *- `index`: The index of the referendum to be cancelled.
     *
     *Emits `Killed` and `DepositSlashed`.
     */
    "kill": Anonymize<I666bl2fqjkejo>;
    /**
     *Advance a referendum onto its next logical state. Only used internally.
     *
     *- `origin`: must be `Root`.
     *- `index`: the referendum to be advanced.
     */
    "nudge_referendum": Anonymize<I666bl2fqjkejo>;
    /**
     *Advance a track onto its next logical state. Only used internally.
     *
     *- `origin`: must be `Root`.
     *- `track`: the track to be advanced.
     *
     *Action item for when there is now one fewer referendum in the deciding phase and the
     *`DecidingCount` is not yet updated. This means that we should either:
     *- begin deciding another referendum (and leave `DecidingCount` alone); or
     *- decrement `DecidingCount`.
     */
    "one_fewer_deciding": Anonymize<Icbio0e1f0034b>;
    /**
     *Refund the Submission Deposit for a closed referendum back to the depositor.
     *
     *- `origin`: must be `Signed` or `Root`.
     *- `index`: The index of a closed referendum whose Submission Deposit has not yet been
     *  refunded.
     *
     *Emits `SubmissionDepositRefunded`.
     */
    "refund_submission_deposit": Anonymize<I666bl2fqjkejo>;
    /**
     *Set or clear metadata of a referendum.
     *
     *Parameters:
     *- `origin`: Must be `Signed` by a creator of a referendum or by anyone to clear a
     *  metadata of a finished referendum.
     *- `index`:  The index of a referendum to set or clear metadata for.
     *- `maybe_hash`: The hash of an on-chain stored preimage. `None` to clear a metadata.
     */
    "set_metadata": Anonymize<I8c0vkqjjipnuj>;
}>;
export type I4dvjo4haia091 = {
    "proposal_origin": Anonymize<I575vh6g119dum>;
    "proposal": PreimagesBounded;
    "enactment_moment": TraitsScheduleDispatchTime;
};
export type I5bt1lc4doakmu = AnonymousEnum<{
    /**
     *Introduce a new member.
     *
     *- `origin`: Must be the `AddOrigin`.
     *- `who`: Account of non-member which will become a member.
     *
     *Weight: `O(1)`
     */
    "add_member": Anonymize<I59bngqm85b22v>;
    /**
     *Increment the rank of an existing member by one.
     *
     *- `origin`: Must be the `PromoteOrigin`.
     *- `who`: Account of existing member.
     *
     *Weight: `O(1)`
     */
    "promote_member": Anonymize<I59bngqm85b22v>;
    /**
     *Decrement the rank of an existing member by one. If the member is already at rank zero,
     *then they are removed entirely.
     *
     *- `origin`: Must be the `DemoteOrigin`.
     *- `who`: Account of existing member of rank greater than zero.
     *
     *Weight: `O(1)`, less if the member's index is highest in its rank.
     */
    "demote_member": Anonymize<I59bngqm85b22v>;
    /**
     *Remove the member entirely.
     *
     *- `origin`: Must be the `RemoveOrigin`.
     *- `who`: Account of existing member of rank greater than zero.
     *- `min_rank`: The rank of the member or greater.
     *
     *Weight: `O(min_rank)`.
     */
    "remove_member": Anonymize<I3amdclkdfaipk>;
    /**
     *Add an aye or nay vote for the sender to the given proposal.
     *
     *- `origin`: Must be `Signed` by a member account.
     *- `poll`: Index of a poll which is ongoing.
     *- `aye`: `true` if the vote is to approve the proposal, `false` otherwise.
     *
     *Transaction fees are be waived if the member is voting on any particular proposal
     *for the first time and the call is successful. Subsequent vote changes will charge a
     *fee.
     *
     *Weight: `O(1)`, less if there was no previous vote on the poll by the member.
     */
    "vote": Anonymize<I8bvk21lpmah75>;
    /**
     *Remove votes from the given poll. It must have ended.
     *
     *- `origin`: Must be `Signed` by any account.
     *- `poll_index`: Index of a poll which is completed and for which votes continue to
     *  exist.
     *- `max`: Maximum number of vote items from remove in this call.
     *
     *Transaction fees are waived if the operation is successful.
     *
     *Weight `O(max)` (less if there are fewer items to remove than `max`).
     */
    "cleanup_poll": Anonymize<I449n3riv6jbum>;
    /**
     *Exchanges a member with a new account and the same existing rank.
     *
     *- `origin`: Must be the `ExchangeOrigin`.
     *- `who`: Account of existing member of rank greater than zero to be exchanged.
     *- `new_who`: New Account of existing member of rank greater than zero to exchanged to.
     */
    "exchange_member": Anonymize<I9a7qiue67urvk>;
}>;
export type I59bngqm85b22v = {
    "who": MultiAddress;
};
export type I3amdclkdfaipk = {
    "who": MultiAddress;
    "min_rank": number;
};
export type I8bvk21lpmah75 = {
    "poll": number;
    "aye": boolean;
};
export type I449n3riv6jbum = {
    "poll_index": number;
    "max": number;
};
export type I9a7qiue67urvk = {
    "who": MultiAddress;
    "new_who": MultiAddress;
};
export type Iet9pqfh3sbig8 = AnonymousEnum<{
    "whitelist_call": Anonymize<I1adbcfi5uc62r>;
    "remove_whitelisted_call": Anonymize<I1adbcfi5uc62r>;
    "dispatch_whitelisted_call": Anonymize<Ibf6ucefn8fh49>;
    "dispatch_whitelisted_call_with_preimage": Anonymize<I2ifddbprs364f>;
}>;
export type I2ifddbprs364f = {
    "call": TxCallData;
};
export type I4pauf7of6nn70 = AnonymousEnum<{
    /**
     *Send a batch of dispatch calls.
     *
     *May be called from any origin except `None`.
     *
     *- `calls`: The calls to be dispatched from the same origin. The number of call must not
     *  exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     *If origin is root then the calls are dispatched without checking origin filter. (This
     *includes bypassing `frame_system::Config::BaseCallFilter`).
     *
     *## Complexity
     *- O(C) where C is the number of calls to be batched.
     *
     *This will return `Ok` in all circumstances. To determine the success of the batch, an
     *event is deposited. If a call failed and the batch was interrupted, then the
     *`BatchInterrupted` event is deposited, along with the number of successful calls made
     *and the error of the failed call. If all were successful, then the `BatchCompleted`
     *event is deposited.
     */
    "batch": Anonymize<I2jef1c2cnp8oc>;
    /**
     *Send a call through an indexed pseudonym of the sender.
     *
     *Filter from origin are passed along. The call will be dispatched with an origin which
     *use the same filter as the origin of this call.
     *
     *NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
     *because you expect `proxy` to have been used prior in the call stack and you do not want
     *the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
     *in the Multisig pallet instead.
     *
     *NOTE: Prior to version *12, this was called `as_limited_sub`.
     *
     *The dispatch origin for this call must be _Signed_.
     */
    "as_derivative": Anonymize<I3v23e79tnlepm>;
    /**
     *Send a batch of dispatch calls and atomically execute them.
     *The whole transaction will rollback and fail if any of the calls failed.
     *
     *May be called from any origin except `None`.
     *
     *- `calls`: The calls to be dispatched from the same origin. The number of call must not
     *  exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     *If origin is root then the calls are dispatched without checking origin filter. (This
     *includes bypassing `frame_system::Config::BaseCallFilter`).
     *
     *## Complexity
     *- O(C) where C is the number of calls to be batched.
     */
    "batch_all": Anonymize<I2jef1c2cnp8oc>;
    /**
     *Dispatches a function call with a provided origin.
     *
     *The dispatch origin for this call must be _Root_.
     *
     *## Complexity
     *- O(1).
     */
    "dispatch_as": Anonymize<I8b032lvj28v38>;
    /**
     *Send a batch of dispatch calls.
     *Unlike `batch`, it allows errors and won't interrupt.
     *
     *May be called from any origin except `None`.
     *
     *- `calls`: The calls to be dispatched from the same origin. The number of call must not
     *  exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     *If origin is root then the calls are dispatch without checking origin filter. (This
     *includes bypassing `frame_system::Config::BaseCallFilter`).
     *
     *## Complexity
     *- O(C) where C is the number of calls to be batched.
     */
    "force_batch": Anonymize<I2jef1c2cnp8oc>;
    /**
     *Dispatch a function call with a specified weight.
     *
     *This function does not check the weight of the call, and instead allows the
     *Root origin to specify the weight of the call.
     *
     *The dispatch origin for this call must be _Root_.
     */
    "with_weight": Anonymize<Ib36tv0e89obnf>;
}>;
export type I2jef1c2cnp8oc = {
    "calls": Anonymize<Ichf43loj4967n>;
};
export type Ichf43loj4967n = Array<TxCallData>;
export type I3v23e79tnlepm = {
    "index": number;
    "call": TxCallData;
};
export type I8b032lvj28v38 = {
    "as_origin": Anonymize<I575vh6g119dum>;
    "call": TxCallData;
};
export type Ib36tv0e89obnf = {
    "call": TxCallData;
    "weight": Anonymize<I4q39t5hn830vp>;
};
export type Iaup05df56f0nc = AnonymousEnum<{
    /**
     *A user outside of the society can make a bid for entry.
     *
     *Payment: The group's Candidate Deposit will be reserved for making a bid. It is returned
     *when the bid becomes a member, or if the bid calls `unbid`.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `value`: A one time payment the bid would like to receive when joining the society.
     */
    "bid": Anonymize<Ie5v6njpckr05b>;
    /**
     *A bidder can remove their bid for entry into society.
     *By doing so, they will have their candidate deposit returned or
     *they will unvouch their voucher.
     *
     *Payment: The bid deposit is unreserved if the user made a bid.
     *
     *The dispatch origin for this call must be _Signed_ and a bidder.
     */
    "unbid": undefined;
    /**
     *As a member, vouch for someone to join society by placing a bid on their behalf.
     *
     *There is no deposit required to vouch for a new bid, but a member can only vouch for
     *one bid at a time. If the bid becomes a suspended candidate and ultimately rejected by
     *the suspension judgement origin, the member will be banned from vouching again.
     *
     *As a vouching member, you can claim a tip if the candidate is accepted. This tip will
     *be paid as a portion of the reward the member will receive for joining the society.
     *
     *The dispatch origin for this call must be _Signed_ and a member.
     *
     *Parameters:
     *- `who`: The user who you would like to vouch for.
     *- `value`: The total reward to be paid between you and the candidate if they become
     *a member in the society.
     *- `tip`: Your cut of the total `value` payout when the candidate is inducted into
     *the society. Tips larger than `value` will be saturated upon payout.
     */
    "vouch": Anonymize<Ibvkbvbkttt0k5>;
    /**
     *As a vouching member, unvouch a bid. This only works while vouched user is
     *only a bidder (and not a candidate).
     *
     *The dispatch origin for this call must be _Signed_ and a vouching member.
     *
     *Parameters:
     *- `pos`: Position in the `Bids` vector of the bid who should be unvouched.
     */
    "unvouch": undefined;
    /**
     *As a member, vote on a candidate.
     *
     *The dispatch origin for this call must be _Signed_ and a member.
     *
     *Parameters:
     *- `candidate`: The candidate that the member would like to bid on.
     *- `approve`: A boolean which says if the candidate should be approved (`true`) or
     *  rejected (`false`).
     */
    "vote": Anonymize<I8i12uisk6j7l>;
    /**
     *As a member, vote on the defender.
     *
     *The dispatch origin for this call must be _Signed_ and a member.
     *
     *Parameters:
     *- `approve`: A boolean which says if the candidate should be
     *approved (`true`) or rejected (`false`).
     */
    "defender_vote": Anonymize<I26anifrfnljoi>;
    /**
     *Transfer the first matured payout for the sender and remove it from the records.
     *
     *NOTE: This extrinsic needs to be called multiple times to claim multiple matured
     *payouts.
     *
     *Payment: The member will receive a payment equal to their first matured
     *payout to their free balance.
     *
     *The dispatch origin for this call must be _Signed_ and a member with
     *payouts remaining.
     */
    "payout": undefined;
    /**
     *Repay the payment previously given to the member with the signed origin, remove any
     *pending payments, and elevate them from rank 0 to rank 1.
     */
    "waive_repay": Anonymize<I3qt1hgg4djhgb>;
    /**
     *Found the society.
     *
     *This is done as a discrete action in order to allow for the
     *pallet to be included into a running chain and can only be done once.
     *
     *The dispatch origin for this call must be from the _FounderSetOrigin_.
     *
     *Parameters:
     *- `founder` - The first member and head of the newly founded society.
     *- `max_members` - The initial max number of members for the society.
     *- `max_intake` - The maximum number of candidates per intake period.
     *- `max_strikes`: The maximum number of strikes a member may get before they become
     *  suspended and may only be reinstated by the founder.
     *- `candidate_deposit`: The deposit required to make a bid for membership of the group.
     *- `rules` - The rules of this society concerning membership.
     *
     *Complexity: O(1)
     */
    "found_society": Anonymize<I6a6f85pb71ums>;
    /**
     *Dissolve the society and remove all members.
     *
     *The dispatch origin for this call must be Signed, and the signing account must be both
     *the `Founder` and the `Head`. This implies that it may only be done when there is one
     *member.
     */
    "dissolve": undefined;
    /**
     *Allow suspension judgement origin to make judgement on a suspended member.
     *
     *If a suspended member is forgiven, we simply add them back as a member, not affecting
     *any of the existing storage items for that member.
     *
     *If a suspended member is rejected, remove all associated storage items, including
     *their payouts, and remove any vouched bids they currently have.
     *
     *The dispatch origin for this call must be Signed from the Founder.
     *
     *Parameters:
     *- `who` - The suspended member to be judged.
     *- `forgive` - A boolean representing whether the suspension judgement origin forgives
     *  (`true`) or rejects (`false`) a suspended member.
     */
    "judge_suspended_member": Anonymize<I96p6guspeq6t>;
    /**
     *Change the maximum number of members in society and the maximum number of new candidates
     *in a single intake period.
     *
     *The dispatch origin for this call must be Signed by the Founder.
     *
     *Parameters:
     *- `max_members` - The maximum number of members for the society. This must be no less
     *  than the current number of members.
     *- `max_intake` - The maximum number of candidates per intake period.
     *- `max_strikes`: The maximum number of strikes a member may get before they become
     *  suspended and may only be reinstated by the founder.
     *- `candidate_deposit`: The deposit required to make a bid for membership of the group.
     */
    "set_parameters": Anonymize<I9hkvi4k3kh916>;
    /**
     *Punish the skeptic with a strike if they did not vote on a candidate. Callable by the
     *candidate.
     */
    "punish_skeptic": undefined;
    /**
     *Transform an approved candidate into a member. Callable only by the
     *the candidate, and only after the period for voting has ended.
     */
    "claim_membership": undefined;
    /**
     *Transform an approved candidate into a member. Callable only by the Signed origin of the
     *Founder, only after the period for voting has ended and only when the candidate is not
     *clearly rejected.
     */
    "bestow_membership": Anonymize<I4b66js88p45m8>;
    /**
     *Remove the candidate's application from the society. Callable only by the Signed origin
     *of the Founder, only after the period for voting has ended, and only when they do not
     *have a clear approval.
     *
     *Any bid deposit is lost and voucher is banned.
     */
    "kick_candidate": Anonymize<I4b66js88p45m8>;
    /**
     *Remove the candidate's application from the society. Callable only by the candidate.
     *
     *Any bid deposit is lost and voucher is banned.
     */
    "resign_candidacy": undefined;
    /**
     *Remove a `candidate`'s failed application from the society. Callable by any
     *signed origin but only at the end of the subsequent round and only for
     *a candidate with more rejections than approvals.
     *
     *The bid deposit is lost and the voucher is banned.
     */
    "drop_candidate": Anonymize<I4b66js88p45m8>;
    /**
     *Remove up to `max` stale votes for the given `candidate`.
     *
     *May be called by any Signed origin, but only after the candidate's candidacy is ended.
     */
    "cleanup_candidacy": Anonymize<Ieh40op1lafir9>;
    /**
     *Remove up to `max` stale votes for the defender in the given `challenge_round`.
     *
     *May be called by any Signed origin, but only after the challenge round is ended.
     */
    "cleanup_challenge": Anonymize<Icjp7f9u9fno72>;
}>;
export type Ibvkbvbkttt0k5 = {
    "who": MultiAddress;
    "value": bigint;
    "tip": bigint;
};
export type I8i12uisk6j7l = {
    "candidate": MultiAddress;
    "approve": boolean;
};
export type I26anifrfnljoi = {
    "approve": boolean;
};
export type I6a6f85pb71ums = {
    "founder": MultiAddress;
    "max_members": number;
    "max_intake": number;
    "max_strikes": number;
    "candidate_deposit": bigint;
    "rules": Binary;
};
export type I96p6guspeq6t = {
    "who": MultiAddress;
    "forgive": boolean;
};
export type Ieh40op1lafir9 = {
    "candidate": SS58String;
    "max": number;
};
export type Icjp7f9u9fno72 = {
    "challenge_round": number;
    "max": number;
};
export type I7q9tacka5j7qe = AnonymousEnum<{
    /**
     *Send a call through a recovered account.
     *
     *The dispatch origin for this call must be _Signed_ and registered to
     *be able to make calls on behalf of the recovered account.
     *
     *Parameters:
     *- `account`: The recovered account you want to make a call on-behalf-of.
     *- `call`: The call you want to make with the recovered account.
     */
    "as_recovered": Anonymize<I1bk4tm1i2b3ng>;
    /**
     *Allow ROOT to bypass the recovery process and set an a rescuer account
     *for a lost account directly.
     *
     *The dispatch origin for this call must be _ROOT_.
     *
     *Parameters:
     *- `lost`: The "lost account" to be recovered.
     *- `rescuer`: The "rescuer account" which can call as the lost account.
     */
    "set_recovered": Anonymize<I7pqmhr25d3dqq>;
    /**
     *Create a recovery configuration for your account. This makes your account recoverable.
     *
     *Payment: `ConfigDepositBase` + `FriendDepositFactor` * #_of_friends balance
     *will be reserved for storing the recovery configuration. This deposit is returned
     *in full when the user calls `remove_recovery`.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `friends`: A list of friends you trust to vouch for recovery attempts. Should be
     *  ordered and contain no duplicate values.
     *- `threshold`: The number of friends that must vouch for a recovery attempt before the
     *  account can be recovered. Should be less than or equal to the length of the list of
     *  friends.
     *- `delay_period`: The number of blocks after a recovery attempt is initialized that
     *  needs to pass before the account can be recovered.
     */
    "create_recovery": Anonymize<I6s6ihmfj6j5qq>;
    /**
     *Initiate the process for recovering a recoverable account.
     *
     *Payment: `RecoveryDeposit` balance will be reserved for initiating the
     *recovery process. This deposit will always be repatriated to the account
     *trying to be recovered. See `close_recovery`.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `account`: The lost account that you want to recover. This account needs to be
     *  recoverable (i.e. have a recovery configuration).
     */
    "initiate_recovery": Anonymize<Ic6cqd9g0t65v0>;
    /**
     *Allow a "friend" of a recoverable account to vouch for an active recovery
     *process for that account.
     *
     *The dispatch origin for this call must be _Signed_ and must be a "friend"
     *for the recoverable account.
     *
     *Parameters:
     *- `lost`: The lost account that you want to recover.
     *- `rescuer`: The account trying to rescue the lost account that you want to vouch for.
     *
     *The combination of these two parameters must point to an active recovery
     *process.
     */
    "vouch_recovery": Anonymize<I7pqmhr25d3dqq>;
    /**
     *Allow a successful rescuer to claim their recovered account.
     *
     *The dispatch origin for this call must be _Signed_ and must be a "rescuer"
     *who has successfully completed the account recovery process: collected
     *`threshold` or more vouches, waited `delay_period` blocks since initiation.
     *
     *Parameters:
     *- `account`: The lost account that you want to claim has been successfully recovered by
     *  you.
     */
    "claim_recovery": Anonymize<Ic6cqd9g0t65v0>;
    /**
     *As the controller of a recoverable account, close an active recovery
     *process for your account.
     *
     *Payment: By calling this function, the recoverable account will receive
     *the recovery deposit `RecoveryDeposit` placed by the rescuer.
     *
     *The dispatch origin for this call must be _Signed_ and must be a
     *recoverable account with an active recovery process for it.
     *
     *Parameters:
     *- `rescuer`: The account trying to rescue this recoverable account.
     */
    "close_recovery": Anonymize<I7ka1pdlbuevh2>;
    /**
     *Remove the recovery process for your account. Recovered accounts are still accessible.
     *
     *NOTE: The user must make sure to call `close_recovery` on all active
     *recovery attempts before calling this function else it will fail.
     *
     *Payment: By calling this function the recoverable account will unreserve
     *their recovery configuration deposit.
     *(`ConfigDepositBase` + `FriendDepositFactor` * #_of_friends)
     *
     *The dispatch origin for this call must be _Signed_ and must be a
     *recoverable account (i.e. has a recovery configuration).
     */
    "remove_recovery": undefined;
    /**
     *Cancel the ability to use `as_recovered` for `account`.
     *
     *The dispatch origin for this call must be _Signed_ and registered to
     *be able to make calls on behalf of the recovered account.
     *
     *Parameters:
     *- `account`: The recovered account you are able to call on-behalf-of.
     */
    "cancel_recovered": Anonymize<Ic6cqd9g0t65v0>;
}>;
export type I1bk4tm1i2b3ng = {
    "account": MultiAddress;
    "call": TxCallData;
};
export type I7pqmhr25d3dqq = {
    "lost": MultiAddress;
    "rescuer": MultiAddress;
};
export type I6s6ihmfj6j5qq = {
    "friends": Anonymize<Ia2lhg7l2hilo3>;
    "threshold": number;
    "delay_period": number;
};
export type Ic6cqd9g0t65v0 = {
    "account": MultiAddress;
};
export type I7ka1pdlbuevh2 = {
    "rescuer": MultiAddress;
};
export type I33lu1rt2eoq1h = AnonymousEnum<{
    /**
     *Anonymously schedule a task.
     */
    "schedule": Anonymize<I86371i6qagoce>;
    /**
     *Cancel an anonymously scheduled task.
     */
    "cancel": Anonymize<I5n4sebgkfr760>;
    /**
     *Schedule a named task.
     */
    "schedule_named": Anonymize<I5gm0fj8b8qu3g>;
    /**
     *Cancel a named scheduled task.
     */
    "cancel_named": Anonymize<Ifs1i5fk9cqvr6>;
    /**
     *Anonymously schedule a task after a delay.
     */
    "schedule_after": Anonymize<Ib5h8krvbu7gcm>;
    /**
     *Schedule a named task after a delay.
     */
    "schedule_named_after": Anonymize<Idunov91dgketn>;
    /**
     *Set a retry configuration for a task so that, in case its scheduled run fails, it will
     *be retried after `period` blocks, for a total amount of `retries` retries or until it
     *succeeds.
     *
     *Tasks which need to be scheduled for a retry are still subject to weight metering and
     *agenda space, same as a regular task. If a periodic task fails, it will be scheduled
     *normally while the task is retrying.
     *
     *Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
     *clones of the original task. Their retry configuration will be derived from the
     *original task's configuration, but will have a lower value for `remaining` than the
     *original `total_retries`.
     */
    "set_retry": Anonymize<Ieg3fd8p4pkt10>;
    /**
     *Set a retry configuration for a named task so that, in case its scheduled run fails, it
     *will be retried after `period` blocks, for a total amount of `retries` retries or until
     *it succeeds.
     *
     *Tasks which need to be scheduled for a retry are still subject to weight metering and
     *agenda space, same as a regular task. If a periodic task fails, it will be scheduled
     *normally while the task is retrying.
     *
     *Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
     *clones of the original task. Their retry configuration will be derived from the
     *original task's configuration, but will have a lower value for `remaining` than the
     *original `total_retries`.
     */
    "set_retry_named": Anonymize<I8kg5ll427kfqq>;
    /**
     *Removes the retry configuration of a task.
     */
    "cancel_retry": Anonymize<I467333262q1l9>;
    /**
     *Cancel the retry configuration of a named task.
     */
    "cancel_retry_named": Anonymize<Ifs1i5fk9cqvr6>;
}>;
export type I86371i6qagoce = {
    "when": number;
    "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
    "priority": number;
    "call": TxCallData;
};
export type I5gm0fj8b8qu3g = {
    "id": FixedSizeBinary<32>;
    "when": number;
    "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
    "priority": number;
    "call": TxCallData;
};
export type Ib5h8krvbu7gcm = {
    "after": number;
    "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
    "priority": number;
    "call": TxCallData;
};
export type Idunov91dgketn = {
    "id": FixedSizeBinary<32>;
    "after": number;
    "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
    "priority": number;
    "call": TxCallData;
};
export type I6tj3mj7ea98bu = AnonymousEnum<{
    /**
     *Dispatch the given `call` from an account that the sender is authorised for through
     *`add_proxy`.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `real`: The account that the proxy will make a call on behalf of.
     *- `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *- `call`: The call to be made by the `real` account.
     */
    "proxy": Anonymize<I8pt1p4aiber0h>;
    /**
     *Register a proxy account for the sender that is able to make calls on its behalf.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `proxy`: The account that the `caller` would like to make a proxy.
     *- `proxy_type`: The permissions allowed for this proxy account.
     *- `delay`: The announcement period required of the initial proxy. Will generally be
     *zero.
     */
    "add_proxy": Anonymize<Ia3sdslbn23eti>;
    /**
     *Unregister a proxy account for the sender.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `proxy`: The account that the `caller` would like to remove as a proxy.
     *- `proxy_type`: The permissions currently enabled for the removed proxy account.
     */
    "remove_proxy": Anonymize<Ia3sdslbn23eti>;
    /**
     *Unregister all proxy accounts for the sender.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *WARNING: This may be called on accounts created by `pure`, however if done, then
     *the unreserved fees will be inaccessible. **All access to this account will be lost.**
     */
    "remove_proxies": undefined;
    /**
     *Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
     *initialize it with a proxy of `proxy_type` for `origin` sender.
     *
     *Requires a `Signed` origin.
     *
     *- `proxy_type`: The type of the proxy that the sender will be registered as over the
     *new account. This will almost always be the most permissive `ProxyType` possible to
     *allow for maximum flexibility.
     *- `index`: A disambiguation index, in case this is called multiple times in the same
     *transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
     *want to use `0`.
     *- `delay`: The announcement period required of the initial proxy. Will generally be
     *zero.
     *
     *Fails with `Duplicate` if this has already been called in this transaction, from the
     *same sender, with the same parameters.
     *
     *Fails if there are insufficient funds to pay for deposit.
     */
    "create_pure": Anonymize<Ict27q3g3cg78f>;
    /**
     *Removes a previously spawned pure proxy.
     *
     *WARNING: **All access to this account will be lost.** Any funds held in it will be
     *inaccessible.
     *
     *Requires a `Signed` origin, and the sender account must have been created by a call to
     *`pure` with corresponding parameters.
     *
     *- `spawner`: The account that originally called `pure` to create this account.
     *- `index`: The disambiguation index originally passed to `pure`. Probably `0`.
     *- `proxy_type`: The proxy type originally passed to `pure`.
     *- `height`: The height of the chain when the call to `pure` was processed.
     *- `ext_index`: The extrinsic index in which the call to `pure` was processed.
     *
     *Fails with `NoPermission` in case the caller is not a previously created pure
     *account whose `pure` call has corresponding parameters.
     */
    "kill_pure": Anonymize<Ieduhgeucg3h7j>;
    /**
     *Publish the hash of a proxy-call that will be made in the future.
     *
     *This must be called some number of blocks before the corresponding `proxy` is attempted
     *if the delay associated with the proxy relationship is greater than zero.
     *
     *No more than `MaxPending` announcements may be made at any one time.
     *
     *This will take a deposit of `AnnouncementDepositFactor` as well as
     *`AnnouncementDepositBase` if there are no other pending announcements.
     *
     *The dispatch origin for this call must be _Signed_ and a proxy of `real`.
     *
     *Parameters:
     *- `real`: The account that the proxy will make a call on behalf of.
     *- `call_hash`: The hash of the call to be made by the `real` account.
     */
    "announce": Anonymize<I2eb501t8s6hsq>;
    /**
     *Remove a given announcement.
     *
     *May be called by a proxy account to remove a call they previously announced and return
     *the deposit.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `real`: The account that the proxy will make a call on behalf of.
     *- `call_hash`: The hash of the call to be made by the `real` account.
     */
    "remove_announcement": Anonymize<I2eb501t8s6hsq>;
    /**
     *Remove the given announcement of a delegate.
     *
     *May be called by a target (proxied) account to remove a call that one of their delegates
     *(`delegate`) has announced they want to execute. The deposit is returned.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `delegate`: The account that previously announced the call.
     *- `call_hash`: The hash of the call to be made.
     */
    "reject_announcement": Anonymize<Ianmuoljk2sk1u>;
    /**
     *Dispatch the given `call` from an account that the sender is authorized for through
     *`add_proxy`.
     *
     *Removes any corresponding announcement(s).
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `real`: The account that the proxy will make a call on behalf of.
     *- `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *- `call`: The call to be made by the `real` account.
     */
    "proxy_announced": Anonymize<I9tfpm16e56og7>;
}>;
export type I8pt1p4aiber0h = {
    "real": MultiAddress;
    "force_proxy_type"?: Anonymize<Ic9lodvalmfgme>;
    "call": TxCallData;
};
export type Ic9lodvalmfgme = (Anonymize<I1ffle57clnprr>) | undefined;
export type Ia3sdslbn23eti = {
    "delegate": MultiAddress;
    "proxy_type": Anonymize<I1ffle57clnprr>;
    "delay": number;
};
export type Ict27q3g3cg78f = {
    "proxy_type": Anonymize<I1ffle57clnprr>;
    "delay": number;
    "index": number;
};
export type Ieduhgeucg3h7j = {
    "spawner": MultiAddress;
    "proxy_type": Anonymize<I1ffle57clnprr>;
    "index": number;
    "height": number;
    "ext_index": number;
};
export type I9tfpm16e56og7 = {
    "delegate": MultiAddress;
    "real": MultiAddress;
    "force_proxy_type"?: Anonymize<Ic9lodvalmfgme>;
    "call": TxCallData;
};
export type I5mjmvevktqtsu = AnonymousEnum<{
    /**
     *Immediately dispatch a multi-signature call using a single approval from the caller.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `other_signatories`: The accounts (other than the sender) who are part of the
     *multi-signature, but do not participate in the approval process.
     *- `call`: The call to be executed.
     *
     *Result is equivalent to the dispatched result.
     *
     *## Complexity
     *O(Z + C) where Z is the length of the call and C its execution weight.
     */
    "as_multi_threshold_1": Anonymize<Ic11v0sqkv8lho>;
    /**
     *Register approval for a dispatch to be made from a deterministic composite account if
     *approved by a total of `threshold - 1` of `other_signatories`.
     *
     *If there are enough, then dispatch the call.
     *
     *Payment: `DepositBase` will be reserved if this is the first approval, plus
     *`threshold` times `DepositFactor`. It is returned once this dispatch happens or
     *is cancelled.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `threshold`: The total number of approvals for this dispatch before it is executed.
     *- `other_signatories`: The accounts (other than the sender) who can approve this
     *dispatch. May not be empty.
     *- `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
     *not the first approval, then it must be `Some`, with the timepoint (block number and
     *transaction index) of the first approval transaction.
     *- `call`: The call to be executed.
     *
     *NOTE: Unless this is the final approval, you will generally want to use
     *`approve_as_multi` instead, since it only requires a hash of the call.
     *
     *Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
     *on success, result is `Ok` and the result from the interior call, if it was executed,
     *may be found in the deposited `MultisigExecuted` event.
     *
     *## Complexity
     *- `O(S + Z + Call)`.
     *- Up to one balance-reserve or unreserve operation.
     *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
     *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     *- One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
     *- One encode & hash, both of complexity `O(S)`.
     *- Up to one binary search and insert (`O(logS + S)`).
     *- I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
     *- One event.
     *- The weight of the `call`.
     *- Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
     *  taken for its lifetime of `DepositBase + threshold * DepositFactor`.
     */
    "as_multi": Anonymize<I5s3p8q2sfvnav>;
    /**
     *Register approval for a dispatch to be made from a deterministic composite account if
     *approved by a total of `threshold - 1` of `other_signatories`.
     *
     *Payment: `DepositBase` will be reserved if this is the first approval, plus
     *`threshold` times `DepositFactor`. It is returned once this dispatch happens or
     *is cancelled.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `threshold`: The total number of approvals for this dispatch before it is executed.
     *- `other_signatories`: The accounts (other than the sender) who can approve this
     *dispatch. May not be empty.
     *- `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
     *not the first approval, then it must be `Some`, with the timepoint (block number and
     *transaction index) of the first approval transaction.
     *- `call_hash`: The hash of the call to be executed.
     *
     *NOTE: If this is the final approval, you will want to use `as_multi` instead.
     *
     *## Complexity
     *- `O(S)`.
     *- Up to one balance-reserve or unreserve operation.
     *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
     *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     *- One encode & hash, both of complexity `O(S)`.
     *- Up to one binary search and insert (`O(logS + S)`).
     *- I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
     *- One event.
     *- Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
     *  taken for its lifetime of `DepositBase + threshold * DepositFactor`.
     */
    "approve_as_multi": Anonymize<Ideaemvoneh309>;
    /**
     *Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
     *for this operation will be unreserved on success.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `threshold`: The total number of approvals for this dispatch before it is executed.
     *- `other_signatories`: The accounts (other than the sender) who can approve this
     *dispatch. May not be empty.
     *- `timepoint`: The timepoint (block number and transaction index) of the first approval
     *transaction for this dispatch.
     *- `call_hash`: The hash of the call to be executed.
     *
     *## Complexity
     *- `O(S)`.
     *- Up to one balance-reserve or unreserve operation.
     *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
     *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     *- One encode & hash, both of complexity `O(S)`.
     *- One event.
     *- I/O: 1 read `O(S)`, one remove.
     *- Storage: removes one item.
     */
    "cancel_as_multi": Anonymize<I3d9o9d7epp66v>;
}>;
export type Ic11v0sqkv8lho = {
    "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
    "call": TxCallData;
};
export type I5s3p8q2sfvnav = {
    "threshold": number;
    "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
    "maybe_timepoint"?: Anonymize<I95jfd8j5cr5eh>;
    "call": TxCallData;
    "max_weight": Anonymize<I4q39t5hn830vp>;
};
export type I5dqci5rl3kg3m = AnonymousEnum<{
    /**
     *Submit a solution for the unsigned phase.
     *
     *The dispatch origin fo this call must be __none__.
     *
     *This submission is checked on the fly. Moreover, this unsigned solution is only
     *validated when submitted to the pool from the **local** node. Effectively, this means
     *that only active validators can submit this transaction when authoring a block (similar
     *to an inherent).
     *
     *To prevent any incorrect solution (and thus wasted time/weight), this transaction will
     *panic if the solution submitted by the validator is invalid in any way, effectively
     *putting their authoring reward at risk.
     *
     *No deposit or reward is associated with this submission.
     */
    "submit_unsigned": Anonymize<Ic50i89t5eabvg>;
    /**
     *Set a new value for `MinimumUntrustedScore`.
     *
     *Dispatch origin must be aligned with `T::ForceOrigin`.
     *
     *This check can be turned off by setting the value to `None`.
     */
    "set_minimum_untrusted_score": Anonymize<I80q14um2s2ckg>;
    /**
     *Set a solution in the queue, to be handed out to the client of this pallet in the next
     *call to `ElectionProvider::elect`.
     *
     *This can only be set by `T::ForceOrigin`, and only when the phase is `Emergency`.
     *
     *The solution is not checked for any feasibility and is assumed to be trustworthy, as any
     *feasibility check itself can in principle cause the election process to fail (due to
     *memory/weight constrains).
     */
    "set_emergency_election_result": Anonymize<I5qs1t1erfi7u8>;
    /**
     *Submit a solution for the signed phase.
     *
     *The dispatch origin fo this call must be __signed__.
     *
     *The solution is potentially queued, based on the claimed score and processed at the end
     *of the signed phase.
     *
     *A deposit is reserved and recorded for the solution. Based on the outcome, the solution
     *might be rewarded, slashed, or get all or a part of the deposit back.
     */
    "submit": Anonymize<I2ou0mtsgm3l71>;
    /**
     *Trigger the governance fallback.
     *
     *This can only be called when [`Phase::Emergency`] is enabled, as an alternative to
     *calling [`Call::set_emergency_election_result`].
     */
    "governance_fallback": Anonymize<Ifsme8miqq9006>;
}>;
export type Ic50i89t5eabvg = {
    "raw_solution": Anonymize<I6s33laenmuupn>;
    "witness": Anonymize<Iasd2iat48n080>;
};
export type I2ou0mtsgm3l71 = {
    "raw_solution": Anonymize<I6s33laenmuupn>;
};
export type Iaq5q67idam8ll = AnonymousEnum<{
    /**
     *Place a bid.
     *
     *Origin must be Signed, and account must have at least `amount` in free balance.
     *
     *- `amount`: The amount of the bid; these funds will be reserved, and if/when
     *  consolidated, removed. Must be at least `MinBid`.
     *- `duration`: The number of periods before which the newly consolidated bid may be
     *  thawed. Must be greater than 1 and no more than `QueueCount`.
     *
     *Complexities:
     *- `Queues[duration].len()` (just take max).
     */
    "place_bid": Anonymize<Icckjru8f8flpj>;
    /**
     *Retract a previously placed bid.
     *
     *Origin must be Signed, and the account should have previously issued a still-active bid
     *of `amount` for `duration`.
     *
     *- `amount`: The amount of the previous bid.
     *- `duration`: The duration of the previous bid.
     */
    "retract_bid": Anonymize<Icckjru8f8flpj>;
    /**
     *Ensure we have sufficient funding for all potential payouts.
     *
     *- `origin`: Must be accepted by `FundOrigin`.
     */
    "fund_deficit": undefined;
    /**
     *Reduce or remove an outstanding receipt, placing the according proportion of funds into
     *the account of the owner.
     *
     *- `origin`: Must be Signed and the account must be the owner of the receipt `index` as
     *  well as any fungible counterpart.
     *- `index`: The index of the receipt.
     *- `portion`: If `Some`, then only the given portion of the receipt should be thawed. If
     *  `None`, then all of it should be.
     */
    "thaw_private": Anonymize<Iba38lgbjrs7je>;
    /**
     *Reduce or remove an outstanding receipt, placing the according proportion of funds into
     *the account of the owner.
     *
     *- `origin`: Must be Signed and the account must be the owner of the fungible counterpart
     *  for receipt `index`.
     *- `index`: The index of the receipt.
     */
    "thaw_communal": Anonymize<I666bl2fqjkejo>;
    /**
     *Make a private receipt communal and create fungible counterparts for its owner.
     */
    "communify": Anonymize<I666bl2fqjkejo>;
    /**
     *Make a communal receipt private and burn fungible counterparts from its owner.
     */
    "privatize": Anonymize<I666bl2fqjkejo>;
}>;
export type Icckjru8f8flpj = {
    "amount": bigint;
    "duration": number;
};
export type Iba38lgbjrs7je = {
    "index": number;
    "maybe_proportion"?: Anonymize<I35p85j063s0il>;
};
export type I7e8tdrv5aklbf = ResultPayload<Anonymize<Idog2s3a8to2s8>, TransactionValidityError>;
export type Ibipt6qfiegcf5 = AnonymousEnum<{
    "System": Anonymize<Iekve0i6djpd9f>;
    "Babe": Anonymize<I1jeo0dpbkma5g>;
    "Timestamp": Anonymize<I7d75gqfg6jh9c>;
    "Indices": Anonymize<I66vlm8f4l1oll>;
    "Balances": Anonymize<I9svldsp29mh87>;
    "Staking": Anonymize<I5jvuh9dlbdd20>;
    "Session": Anonymize<Iceajactc9a8pc>;
    "Grandpa": Anonymize<I5u9ggmn8umfqm>;
    "Treasury": Anonymize<I1s28h18nhih63>;
    "ConvictionVoting": Anonymize<Ie5kd08tutk56t>;
    "Referenda": Anonymize<I4vi3hlg2ca351>;
    "FellowshipCollective": Anonymize<I5bt1lc4doakmu>;
    "FellowshipReferenda": Anonymize<I4vi3hlg2ca351>;
    "Whitelist": Anonymize<Iet9pqfh3sbig8>;
    "Parameters": Anonymize<Ic5v5ffa0cr70p>;
    "Claims": Anonymize<Id0dj18ct09hlp>;
    "Utility": Anonymize<I4pauf7of6nn70>;
    "Society": Anonymize<Iaup05df56f0nc>;
    "Recovery": Anonymize<I7q9tacka5j7qe>;
    "Vesting": Anonymize<Icgf8vmtkbnu4u>;
    "Scheduler": Anonymize<I33lu1rt2eoq1h>;
    "Proxy": Anonymize<I6tj3mj7ea98bu>;
    "Multisig": Anonymize<I5mjmvevktqtsu>;
    "Preimage": Anonymize<If81ks88t5mpk5>;
    "Bounties": Anonymize<I91kpi5kjh9on2>;
    "ChildBounties": Anonymize<I1b6drdhvt5hl9>;
    "ElectionProviderMultiPhase": Anonymize<I5dqci5rl3kg3m>;
    "Nis": Anonymize<Iaq5q67idam8ll>;
    "NisCounterpartBalances": Anonymize<I9svldsp29mh87>;
    "VoterList": Anonymize<Ifvfo1l0vu2o7e>;
    "NominationPools": Anonymize<I57mljkkr28m9p>;
    "FastUnstake": Anonymize<I44snhj1gahvrd>;
    "Configuration": Anonymize<Ia9ptue949ognv>;
    "ParasShared": undefined;
    "ParaInclusion": undefined;
    "ParaInherent": Anonymize<Id5l4f3jqtnb0u>;
    "Paras": Anonymize<Ie2dden5k4kk7t>;
    "Initializer": Anonymize<Ieggtnkc96vvt7>;
    "Hrmp": Anonymize<I45adic8nko129>;
    "ParasDisputes": Anonymize<Ifkh1ep7g9h3rv>;
    "ParasSlashing": Anonymize<I3jj054kp2bjol>;
    "OnDemandAssignmentProvider": Anonymize<I9s7urueli180g>;
    "Registrar": Anonymize<Icclqj5sge2nc7>;
    "Slots": Anonymize<Iafhis924j14hg>;
    "Auctions": Anonymize<I4a8qeimc5p3qn>;
    "Crowdloan": Anonymize<Iaj4q75nu5v2i2>;
    "Coretime": Anonymize<Idu7bbtd2jtnb9>;
    "XcmPallet": Anonymize<I9nbjvlrb9bp1g>;
    "MessageQueue": Anonymize<I3lic4llm6egbr>;
    "AssetRate": Anonymize<I85dm8mgt48css>;
    "Beefy": Anonymize<I918ie8roegt3d>;
}>;
export type Ib5fks2228v743 = ResultPayload<Anonymize<I5p94u12jrvjga>, Anonymize<I55ku9c5gk50hb>>;
export type I5p94u12jrvjga = {
    "execution_result": Anonymize<Iftq10rlffn46u>;
    "emitted_events": Anonymize<Ia37q31t7lss7q>;
    "local_xcm"?: Anonymize<I3i0ce56p044d2>;
    "forwarded_xcms": Anonymize<I47tkk5e5nm6g7>;
};
export type Ia37q31t7lss7q = Array<Anonymize<I4djp4s5jm2vmj>>;
export type Ib748gt0noucrc = ResultPayload<Anonymize<I7p376hrf80m31>, Anonymize<I55ku9c5gk50hb>>;
export type I7p376hrf80m31 = {
    "execution_result": XcmV4TraitsOutcome;
    "emitted_events": Anonymize<Ia37q31t7lss7q>;
    "forwarded_xcms": Anonymize<I47tkk5e5nm6g7>;
};
export type Ia5993kjv8a1tl = Array<Anonymize<Ial6g5hh3k26i0>>;
export type Ial6g5hh3k26i0 = {
    "phase": Phase;
    "event": Anonymize<I5geb27cbtkqio>;
    "topics": Anonymize<Ic5m5lp1oioo8r>;
};
export type I5geb27cbtkqio = AnonymousEnum<{
    "System": Anonymize<I6c4581l5psfo4>;
    "Scheduler": Anonymize<I5vmt6mc9nfpct>;
    "Preimage": PreimageEvent;
    "Indices": Anonymize<IndicesEvent>;
    "Balances": Anonymize<Iao8h4hv7atnq3>;
    "TransactionPayment": TransactionPaymentEvent;
    "Staking": StakingEvent;
    "Offences": OffencesEvent;
    "Session": SessionEvent;
    "Grandpa": GrandpaEvent;
    "Treasury": Anonymize<Iceo3qo846468b>;
    "ConvictionVoting": ConvictionVotingEvent;
    "Referenda": Anonymize<Idfraa3b4eu018>;
    "Whitelist": Anonymize<Iemlqif91cv0rg>;
    "Parameters": Anonymize<In3t00aurfuda>;
    "Claims": CommonClaimsEvent;
    "Vesting": VestingEvent;
    "Utility": Anonymize<Icvq03u1i91f91>;
    "Proxy": Anonymize<I2h8ujvol3vhvr>;
    "Multisig": Anonymize<I3s5n7dasj1ii1>;
    "Bounties": BountiesEvent;
    "ChildBounties": ChildBountiesEvent;
    "ElectionProviderMultiPhase": ElectionProviderMultiPhaseEvent;
    "VoterList": BagsListEvent;
    "NominationPools": NominationPoolsEvent;
    "FastUnstake": Anonymize<I7tbto6t6nm8c5>;
    "ParaInclusion": ParachainsInclusionEvent;
    "Paras": ParachainsParasEvent;
    "Hrmp": ParachainsHrmpEvent;
    "ParasDisputes": ParachainsDisputesEvent;
    "OnDemand": Anonymize<Icuu6jjue8o6eb>;
    "Registrar": CommonParasRegistrarEvent;
    "Slots": CommonSlotsEvent;
    "Auctions": CommonAuctionsEvent;
    "Crowdloan": Anonymize<I9cu097t2c1601>;
    "Coretime": PolkadotRuntimeParachainsCoretimeEvent;
    "StateTrieMigration": Anonymize<I61dksvl51aujo>;
    "XcmPallet": Anonymize<I5ce1ru810vv9d>;
    "MessageQueue": Anonymize<I13vul90391uuv>;
    "AssetRate": AssetRateEvent;
    "Sudo": Anonymize<I79c3g5tjuahad>;
}>;
export type I6c4581l5psfo4 = AnonymousEnum<{
    /**
     *An extrinsic completed successfully.
     */
    "ExtrinsicSuccess": Anonymize<Ia82mnkmeo2rhc>;
    /**
     *An extrinsic failed.
     */
    "ExtrinsicFailed": Anonymize<I9d21uli0ks815>;
    /**
     *`:code` was updated.
     */
    "CodeUpdated": undefined;
    /**
     *A new account was created.
     */
    "NewAccount": Anonymize<Icbccs0ug47ilf>;
    /**
     *An account was reaped.
     */
    "KilledAccount": Anonymize<Icbccs0ug47ilf>;
    /**
     *On on-chain remark happened.
     */
    "Remarked": Anonymize<I855j4i3kr8ko1>;
    /**
     *An upgrade was authorized.
     */
    "UpgradeAuthorized": Anonymize<Ibgl04rn6nbfm6>;
}>;
export type I9d21uli0ks815 = {
    "dispatch_error": Anonymize<I50ikjune0gg0u>;
    "dispatch_info": Anonymize<Ic9s8f85vjtncc>;
};
export type I50ikjune0gg0u = AnonymousEnum<{
    "Other": undefined;
    "CannotLookup": undefined;
    "BadOrigin": undefined;
    "Module": Anonymize<Igi47i1e5vr4d>;
    "ConsumerRemaining": undefined;
    "NoProviders": undefined;
    "TooManyConsumers": undefined;
    "Token": TokenError;
    "Arithmetic": ArithmeticError;
    "Transactional": TransactionalError;
    "Exhausted": undefined;
    "Corruption": undefined;
    "Unavailable": undefined;
    "RootNotAllowed": undefined;
}>;
export type Igi47i1e5vr4d = AnonymousEnum<{
    "System": Anonymize<I5o0s7c8q1cc9b>;
    "Scheduler": Anonymize<If7oa8fprnilo5>;
    "Preimage": Anonymize<I1iknkudsdnbks>;
    "Babe": Anonymize<Ib6q602k6o213a>;
    "Timestamp": undefined;
    "Indices": Anonymize<Icq1825fru3di2>;
    "Balances": Anonymize<Idj13i7adlomht>;
    "TransactionPayment": undefined;
    "Authorship": undefined;
    "Staking": Anonymize<I11137r14aka6n>;
    "Offences": undefined;
    "Historical": undefined;
    "Session": Anonymize<I1e07dgbaqd1sq>;
    "Grandpa": Anonymize<I7q8i0pp1gkas6>;
    "AuthorityDiscovery": undefined;
    "Treasury": Anonymize<I36uss0m9fpcsf>;
    "ConvictionVoting": Anonymize<Idfa8k8ikssbsf>;
    "Referenda": Anonymize<I84u4ul208g742>;
    "Origins": undefined;
    "Whitelist": Anonymize<I15nctscutpbeh>;
    "Parameters": undefined;
    "Claims": Anonymize<Ijh2jbbqvb176>;
    "Vesting": Anonymize<Icof2acl69lq3c>;
    "Utility": Anonymize<I8dt2g2hcrgh36>;
    "Proxy": Anonymize<Iuvt54ei4cehc>;
    "Multisig": Anonymize<Ia76qmhhg4jvb9>;
    "Bounties": Anonymize<Ibfvjqqblobf53>;
    "ChildBounties": Anonymize<I4u5ou5u3tthff>;
    "ElectionProviderMultiPhase": Anonymize<Idb84kfjd998sl>;
    "VoterList": Anonymize<Ic35l5bgiij29p>;
    "NominationPools": Anonymize<Ic4cmf9id3qcei>;
    "FastUnstake": Anonymize<Iau9bur8dc3bec>;
    "ParachainsOrigin": undefined;
    "Configuration": Anonymize<In1jctfv299lm>;
    "ParasShared": undefined;
    "ParaInclusion": Anonymize<Iat8btfaeiq1le>;
    "ParaInherent": Anonymize<Idfqgoii3heb2f>;
    "ParaScheduler": undefined;
    "Paras": Anonymize<Ieo97unb4d08rl>;
    "Initializer": undefined;
    "Dmp": undefined;
    "Hrmp": Anonymize<Ibns95nfmm92df>;
    "ParaSessionInfo": undefined;
    "ParasDisputes": Anonymize<Iakburbqot4g58>;
    "ParasSlashing": Anonymize<I1v70p1j0r2q1j>;
    "OnDemand": Anonymize<I8htscm3ert491>;
    "CoretimeAssignmentProvider": Anonymize<Ie3b9qd0nd59gs>;
    "Registrar": Anonymize<I97vkspnd0b8bh>;
    "Slots": Anonymize<Iers095sa65pbg>;
    "Auctions": Anonymize<I4kgo47o2v3701>;
    "Crowdloan": Anonymize<I9o6l1c4r4qc3s>;
    "Coretime": Anonymize<Ifju0orssp9h7o>;
    "StateTrieMigration": Anonymize<I96objte63brjr>;
    "XcmPallet": Anonymize<I87j95aq93d7dq>;
    "MessageQueue": Anonymize<I5iupade5ag2dp>;
    "AssetRate": Anonymize<I3qgd61cgli6cp>;
    "Beefy": Anonymize<Ib6q602k6o213a>;
    "Mmr": undefined;
    "BeefyMmrLeaf": undefined;
    "ParaSudoWrapper": Anonymize<Ieq0677kv2oqb2>;
    "Sudo": Anonymize<Iaug04qjhbli00>;
}>;
export type Ieq0677kv2oqb2 = AnonymousEnum<{
    /**
     *The specified parachain is not registered.
     */
    "ParaDoesntExist": undefined;
    /**
     *The specified parachain is already registered.
     */
    "ParaAlreadyExists": undefined;
    /**
     *A DMP message couldn't be sent because it exceeds the maximum size allowed for a
     *downward message.
     */
    "ExceedsMaxMessageSize": undefined;
    /**
     *Could not schedule para cleanup.
     */
    "CouldntCleanup": undefined;
    /**
     *Not a parathread (on-demand parachain).
     */
    "NotParathread": undefined;
    /**
     *Not a lease holding parachain.
     */
    "NotParachain": undefined;
    /**
     *Cannot upgrade on-demand parachain to lease holding parachain.
     */
    "CannotUpgrade": undefined;
    /**
     *Cannot downgrade lease holding parachain to on-demand.
     */
    "CannotDowngrade": undefined;
    /**
     *There are more cores than supported by the runtime.
     */
    "TooManyCores": undefined;
}>;
export type Iaug04qjhbli00 = AnonymousEnum<{
    /**
     *Sender must be the Sudo account.
     */
    "RequireSudo": undefined;
}>;
export type I5vmt6mc9nfpct = AnonymousEnum<{
    /**
     *Scheduled some task.
     */
    "Scheduled": Anonymize<I5n4sebgkfr760>;
    /**
     *Canceled some task.
     */
    "Canceled": Anonymize<I5n4sebgkfr760>;
    /**
     *Dispatched some task.
     */
    "Dispatched": Anonymize<Ifr47nm7thgrp4>;
    /**
     *Set a retry configuration for some task.
     */
    "RetrySet": Anonymize<Ia3c82eadg79bj>;
    /**
     *Cancel a retry configuration for some task.
     */
    "RetryCancelled": Anonymize<Ienusoeb625ftq>;
    /**
     *The call for the provided hash was not found so the task has been aborted.
     */
    "CallUnavailable": Anonymize<Ienusoeb625ftq>;
    /**
     *The given task was unable to be renewed since the agenda is full at that block.
     */
    "PeriodicFailed": Anonymize<Ienusoeb625ftq>;
    /**
     *The given task was unable to be retried since the agenda is full at that block or there
     *was not enough weight to reschedule it.
     */
    "RetryFailed": Anonymize<Ienusoeb625ftq>;
    /**
     *The given task can never be executed since it is overweight.
     */
    "PermanentlyOverweight": Anonymize<Ienusoeb625ftq>;
}>;
export type Ifr47nm7thgrp4 = {
    "task": Anonymize<I9jd27rnpm8ttv>;
    "id"?: Anonymize<I4s6vifaf8k998>;
    "result": Anonymize<I38dplpgbs8dgo>;
};
export type I38dplpgbs8dgo = ResultPayload<undefined, Anonymize<I50ikjune0gg0u>>;
export type Iemlqif91cv0rg = AnonymousEnum<{
    "CallWhitelisted": Anonymize<I1adbcfi5uc62r>;
    "WhitelistedCallRemoved": Anonymize<I1adbcfi5uc62r>;
    "WhitelistedCallDispatched": Anonymize<Iag65bq4k2ea97>;
}>;
export type Iag65bq4k2ea97 = {
    "call_hash": FixedSizeBinary<32>;
    "result": Anonymize<If2tjlchftm7hb>;
};
export type If2tjlchftm7hb = ResultPayload<Anonymize<Ia1u1r3n74r13c>, Anonymize<I19pl43e4escm6>>;
export type I19pl43e4escm6 = {
    "post_info": Anonymize<Ia1u1r3n74r13c>;
    "error": Anonymize<I50ikjune0gg0u>;
};
export type Icvq03u1i91f91 = AnonymousEnum<{
    /**
     *Batch of dispatches did not complete fully. Index of first failing dispatch given, as
     *well as the error.
     */
    "BatchInterrupted": Anonymize<I8h7evu8bnn18n>;
    /**
     *Batch of dispatches completed fully with no error.
     */
    "BatchCompleted": undefined;
    /**
     *Batch of dispatches completed but has errors.
     */
    "BatchCompletedWithErrors": undefined;
    /**
     *A single item within a Batch of dispatches has completed with no error.
     */
    "ItemCompleted": undefined;
    /**
     *A single item within a Batch of dispatches has completed with error.
     */
    "ItemFailed": Anonymize<Iev8df16vlcnrm>;
    /**
     *A call was dispatched.
     */
    "DispatchedAs": Anonymize<I1hl4th07hmok3>;
}>;
export type I8h7evu8bnn18n = {
    "index": number;
    "error": Anonymize<I50ikjune0gg0u>;
};
export type Iev8df16vlcnrm = {
    "error": Anonymize<I50ikjune0gg0u>;
};
export type I1hl4th07hmok3 = {
    "result": Anonymize<I38dplpgbs8dgo>;
};
export type I2h8ujvol3vhvr = AnonymousEnum<{
    /**
     *A proxy was executed correctly, with the given.
     */
    "ProxyExecuted": Anonymize<I1hl4th07hmok3>;
    /**
     *A pure account has been created by new proxy with given
     *disambiguation index and proxy type.
     */
    "PureCreated": Anonymize<Ifqt0l2jtnansm>;
    /**
     *An announcement was placed to make a call in the future.
     */
    "Announced": Anonymize<I2ur0oeqg495j8>;
    /**
     *A proxy was added.
     */
    "ProxyAdded": Anonymize<Ib5do5c9nfeb64>;
    /**
     *A proxy was removed.
     */
    "ProxyRemoved": Anonymize<Ib5do5c9nfeb64>;
}>;
export type I3s5n7dasj1ii1 = AnonymousEnum<{
    /**
     *A new multisig operation has begun.
     */
    "NewMultisig": Anonymize<Iep27ialq4a7o7>;
    /**
     *A multisig operation has been approved by someone.
     */
    "MultisigApproval": Anonymize<Iasu5jvoqr43mv>;
    /**
     *A multisig operation has been executed.
     */
    "MultisigExecuted": Anonymize<I6aucqi8p470ta>;
    /**
     *A multisig operation has been cancelled.
     */
    "MultisigCancelled": Anonymize<I5qolde99acmd1>;
}>;
export type I6aucqi8p470ta = {
    "approving": SS58String;
    "timepoint": Anonymize<Itvprrpb0nm3o>;
    "multisig": SS58String;
    "call_hash": FixedSizeBinary<32>;
    "result": Anonymize<I38dplpgbs8dgo>;
};
export type I7tbto6t6nm8c5 = AnonymousEnum<{
    /**
     *A staker was unstaked.
     */
    "Unstaked": Anonymize<I9tpbs57uqggl>;
    /**
     *A staker was slashed for requesting fast-unstake whilst being exposed.
     */
    "Slashed": Anonymize<Ifk8eme5o7mukf>;
    /**
     *A batch was partially checked for the given eras, but the process did not finish.
     */
    "BatchChecked": Anonymize<Ic0he9tlf9ll0u>;
    /**
     *A batch of a given size was terminated.
     *
     *This is always follows by a number of `Unstaked` or `Slashed` events, marking the end
     *of the batch. A new batch will be created upon next block.
     */
    "BatchFinished": Anonymize<I54umskavgc9du>;
    /**
     *An internal error happened. Operations will be paused now.
     */
    "InternalError": undefined;
}>;
export type I9tpbs57uqggl = {
    "stash": SS58String;
    "result": Anonymize<I38dplpgbs8dgo>;
};
export type I9cu097t2c1601 = AnonymousEnum<{
    /**
     *Create a new crowdloaning campaign.
     */
    "Created": Anonymize<I37r4bdai8o9mp>;
    /**
     *Contributed to a crowd sale.
     */
    "Contributed": Anonymize<I8ve4g3egaln6a>;
    /**
     *Withdrew full balance of a contributor.
     */
    "Withdrew": Anonymize<I8ve4g3egaln6a>;
    /**
     *The loans in a fund have been partially dissolved, i.e. there are some left
     *over child keys that still need to be killed.
     */
    "PartiallyRefunded": Anonymize<I37r4bdai8o9mp>;
    /**
     *All loans in a fund have been refunded.
     */
    "AllRefunded": Anonymize<I37r4bdai8o9mp>;
    /**
     *Fund is dissolved.
     */
    "Dissolved": Anonymize<I37r4bdai8o9mp>;
    /**
     *The result of trying to submit a new bid to the Slots pallet.
     */
    "HandleBidResult": Anonymize<I648p81puvbjcl>;
    /**
     *The configuration to a crowdloan has been edited.
     */
    "Edited": Anonymize<I37r4bdai8o9mp>;
    /**
     *A memo has been updated.
     */
    "MemoUpdated": Anonymize<If4hvqaeoqq5us>;
    /**
     *A parachain has been moved to `NewRaise`
     */
    "AddedToNewRaise": Anonymize<I37r4bdai8o9mp>;
}>;
export type I648p81puvbjcl = {
    "para_id": number;
    "result": Anonymize<I38dplpgbs8dgo>;
};
export type I79c3g5tjuahad = AnonymousEnum<{
    /**
     *A sudo call just took place.
     */
    "Sudid": Anonymize<Idja5vsh7mfgto>;
    /**
     *The sudo key has been updated.
     */
    "KeyChanged": Anonymize<I5rtkmhm2dng4u>;
    /**
     *The key was permanently removed.
     */
    "KeyRemoved": undefined;
    /**
     *A [sudo_as](Pallet::sudo_as) call just took place.
     */
    "SudoAsDone": Anonymize<Idja5vsh7mfgto>;
}>;
export type Idja5vsh7mfgto = {
    /**
     *The result of the call made by the sudo user.
     */
    "sudo_result": Anonymize<I38dplpgbs8dgo>;
};
export type I5rtkmhm2dng4u = {
    /**
     *The old sudo key (if one was previously set).
     */
    "old"?: Anonymize<Ihfphjolmsqq1>;
    /**
     *The new sudo key (if one was set).
     */
    "new": SS58String;
};
export type I5aiiov8iuajn7 = AnonymousEnum<{
    /**
     *Anonymously schedule a task.
     */
    "schedule": Anonymize<I3p13kido05bum>;
    /**
     *Cancel an anonymously scheduled task.
     */
    "cancel": Anonymize<I5n4sebgkfr760>;
    /**
     *Schedule a named task.
     */
    "schedule_named": Anonymize<Idi2o3quauop42>;
    /**
     *Cancel a named scheduled task.
     */
    "cancel_named": Anonymize<Ifs1i5fk9cqvr6>;
    /**
     *Anonymously schedule a task after a delay.
     */
    "schedule_after": Anonymize<Ie0v9n6or5lh9r>;
    /**
     *Schedule a named task after a delay.
     */
    "schedule_named_after": Anonymize<I1eosriit8hpo3>;
    /**
     *Set a retry configuration for a task so that, in case its scheduled run fails, it will
     *be retried after `period` blocks, for a total amount of `retries` retries or until it
     *succeeds.
     *
     *Tasks which need to be scheduled for a retry are still subject to weight metering and
     *agenda space, same as a regular task. If a periodic task fails, it will be scheduled
     *normally while the task is retrying.
     *
     *Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
     *clones of the original task. Their retry configuration will be derived from the
     *original task's configuration, but will have a lower value for `remaining` than the
     *original `total_retries`.
     */
    "set_retry": Anonymize<Ieg3fd8p4pkt10>;
    /**
     *Set a retry configuration for a named task so that, in case its scheduled run fails, it
     *will be retried after `period` blocks, for a total amount of `retries` retries or until
     *it succeeds.
     *
     *Tasks which need to be scheduled for a retry are still subject to weight metering and
     *agenda space, same as a regular task. If a periodic task fails, it will be scheduled
     *normally while the task is retrying.
     *
     *Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
     *clones of the original task. Their retry configuration will be derived from the
     *original task's configuration, but will have a lower value for `remaining` than the
     *original `total_retries`.
     */
    "set_retry_named": Anonymize<I8kg5ll427kfqq>;
    /**
     *Removes the retry configuration of a task.
     */
    "cancel_retry": Anonymize<I467333262q1l9>;
    /**
     *Cancel the retry configuration of a named task.
     */
    "cancel_retry_named": Anonymize<Ifs1i5fk9cqvr6>;
}>;
export type I3p13kido05bum = {
    "when": number;
    "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
    "priority": number;
    "call": TxCallData;
};
export type Idi2o3quauop42 = {
    "id": FixedSizeBinary<32>;
    "when": number;
    "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
    "priority": number;
    "call": TxCallData;
};
export type Ie0v9n6or5lh9r = {
    "after": number;
    "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
    "priority": number;
    "call": TxCallData;
};
export type I1eosriit8hpo3 = {
    "id": FixedSizeBinary<32>;
    "after": number;
    "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
    "priority": number;
    "call": TxCallData;
};
export type Idq03kcq8thgsl = AnonymousEnum<{
    "whitelist_call": Anonymize<I1adbcfi5uc62r>;
    "remove_whitelisted_call": Anonymize<I1adbcfi5uc62r>;
    "dispatch_whitelisted_call": Anonymize<Ibf6ucefn8fh49>;
    "dispatch_whitelisted_call_with_preimage": Anonymize<I3dq5m6mb8ta46>;
}>;
export type I3dq5m6mb8ta46 = {
    "call": TxCallData;
};
export type I59r34240djor4 = AnonymousEnum<{
    /**
     *Send a batch of dispatch calls.
     *
     *May be called from any origin except `None`.
     *
     *- `calls`: The calls to be dispatched from the same origin. The number of call must not
     *  exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     *If origin is root then the calls are dispatched without checking origin filter. (This
     *includes bypassing `frame_system::Config::BaseCallFilter`).
     *
     *## Complexity
     *- O(C) where C is the number of calls to be batched.
     *
     *This will return `Ok` in all circumstances. To determine the success of the batch, an
     *event is deposited. If a call failed and the batch was interrupted, then the
     *`BatchInterrupted` event is deposited, along with the number of successful calls made
     *and the error of the failed call. If all were successful, then the `BatchCompleted`
     *event is deposited.
     */
    "batch": Anonymize<I4qgdq1nsq1ldf>;
    /**
     *Send a call through an indexed pseudonym of the sender.
     *
     *Filter from origin are passed along. The call will be dispatched with an origin which
     *use the same filter as the origin of this call.
     *
     *NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
     *because you expect `proxy` to have been used prior in the call stack and you do not want
     *the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
     *in the Multisig pallet instead.
     *
     *NOTE: Prior to version *12, this was called `as_limited_sub`.
     *
     *The dispatch origin for this call must be _Signed_.
     */
    "as_derivative": Anonymize<Id6nml1be4ntg1>;
    /**
     *Send a batch of dispatch calls and atomically execute them.
     *The whole transaction will rollback and fail if any of the calls failed.
     *
     *May be called from any origin except `None`.
     *
     *- `calls`: The calls to be dispatched from the same origin. The number of call must not
     *  exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     *If origin is root then the calls are dispatched without checking origin filter. (This
     *includes bypassing `frame_system::Config::BaseCallFilter`).
     *
     *## Complexity
     *- O(C) where C is the number of calls to be batched.
     */
    "batch_all": Anonymize<I4qgdq1nsq1ldf>;
    /**
     *Dispatches a function call with a provided origin.
     *
     *The dispatch origin for this call must be _Root_.
     *
     *## Complexity
     *- O(1).
     */
    "dispatch_as": Anonymize<Id4coi5m2c4fbi>;
    /**
     *Send a batch of dispatch calls.
     *Unlike `batch`, it allows errors and won't interrupt.
     *
     *May be called from any origin except `None`.
     *
     *- `calls`: The calls to be dispatched from the same origin. The number of call must not
     *  exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     *If origin is root then the calls are dispatch without checking origin filter. (This
     *includes bypassing `frame_system::Config::BaseCallFilter`).
     *
     *## Complexity
     *- O(C) where C is the number of calls to be batched.
     */
    "force_batch": Anonymize<I4qgdq1nsq1ldf>;
    /**
     *Dispatch a function call with a specified weight.
     *
     *This function does not check the weight of the call, and instead allows the
     *Root origin to specify the weight of the call.
     *
     *The dispatch origin for this call must be _Root_.
     */
    "with_weight": Anonymize<Ic81m9070nb7fh>;
}>;
export type I4qgdq1nsq1ldf = {
    "calls": Anonymize<Iavi6i18msid24>;
};
export type Iavi6i18msid24 = Array<TxCallData>;
export type Id6nml1be4ntg1 = {
    "index": number;
    "call": TxCallData;
};
export type Id4coi5m2c4fbi = {
    "as_origin": PolkadotRuntimeOriginCaller;
    "call": TxCallData;
};
export type Ic81m9070nb7fh = {
    "call": TxCallData;
    "weight": Anonymize<I4q39t5hn830vp>;
};
export type I4qsi0udulp485 = AnonymousEnum<{
    /**
     *Dispatch the given `call` from an account that the sender is authorised for through
     *`add_proxy`.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `real`: The account that the proxy will make a call on behalf of.
     *- `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *- `call`: The call to be made by the `real` account.
     */
    "proxy": Anonymize<Idpsmkk8cmveiu>;
    /**
     *Register a proxy account for the sender that is able to make calls on its behalf.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `proxy`: The account that the `caller` would like to make a proxy.
     *- `proxy_type`: The permissions allowed for this proxy account.
     *- `delay`: The announcement period required of the initial proxy. Will generally be
     *zero.
     */
    "add_proxy": Anonymize<Ifhl1ihpl9i99m>;
    /**
     *Unregister a proxy account for the sender.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `proxy`: The account that the `caller` would like to remove as a proxy.
     *- `proxy_type`: The permissions currently enabled for the removed proxy account.
     */
    "remove_proxy": Anonymize<Ifhl1ihpl9i99m>;
    /**
     *Unregister all proxy accounts for the sender.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *WARNING: This may be called on accounts created by `pure`, however if done, then
     *the unreserved fees will be inaccessible. **All access to this account will be lost.**
     */
    "remove_proxies": undefined;
    /**
     *Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
     *initialize it with a proxy of `proxy_type` for `origin` sender.
     *
     *Requires a `Signed` origin.
     *
     *- `proxy_type`: The type of the proxy that the sender will be registered as over the
     *new account. This will almost always be the most permissive `ProxyType` possible to
     *allow for maximum flexibility.
     *- `index`: A disambiguation index, in case this is called multiple times in the same
     *transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
     *want to use `0`.
     *- `delay`: The announcement period required of the initial proxy. Will generally be
     *zero.
     *
     *Fails with `Duplicate` if this has already been called in this transaction, from the
     *same sender, with the same parameters.
     *
     *Fails if there are insufficient funds to pay for deposit.
     */
    "create_pure": Anonymize<Iav2q7hjio8n98>;
    /**
     *Removes a previously spawned pure proxy.
     *
     *WARNING: **All access to this account will be lost.** Any funds held in it will be
     *inaccessible.
     *
     *Requires a `Signed` origin, and the sender account must have been created by a call to
     *`pure` with corresponding parameters.
     *
     *- `spawner`: The account that originally called `pure` to create this account.
     *- `index`: The disambiguation index originally passed to `pure`. Probably `0`.
     *- `proxy_type`: The proxy type originally passed to `pure`.
     *- `height`: The height of the chain when the call to `pure` was processed.
     *- `ext_index`: The extrinsic index in which the call to `pure` was processed.
     *
     *Fails with `NoPermission` in case the caller is not a previously created pure
     *account whose `pure` call has corresponding parameters.
     */
    "kill_pure": Anonymize<I1m2ifb0h8d0r8>;
    /**
     *Publish the hash of a proxy-call that will be made in the future.
     *
     *This must be called some number of blocks before the corresponding `proxy` is attempted
     *if the delay associated with the proxy relationship is greater than zero.
     *
     *No more than `MaxPending` announcements may be made at any one time.
     *
     *This will take a deposit of `AnnouncementDepositFactor` as well as
     *`AnnouncementDepositBase` if there are no other pending announcements.
     *
     *The dispatch origin for this call must be _Signed_ and a proxy of `real`.
     *
     *Parameters:
     *- `real`: The account that the proxy will make a call on behalf of.
     *- `call_hash`: The hash of the call to be made by the `real` account.
     */
    "announce": Anonymize<I2eb501t8s6hsq>;
    /**
     *Remove a given announcement.
     *
     *May be called by a proxy account to remove a call they previously announced and return
     *the deposit.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `real`: The account that the proxy will make a call on behalf of.
     *- `call_hash`: The hash of the call to be made by the `real` account.
     */
    "remove_announcement": Anonymize<I2eb501t8s6hsq>;
    /**
     *Remove the given announcement of a delegate.
     *
     *May be called by a target (proxied) account to remove a call that one of their delegates
     *(`delegate`) has announced they want to execute. The deposit is returned.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `delegate`: The account that previously announced the call.
     *- `call_hash`: The hash of the call to be made.
     */
    "reject_announcement": Anonymize<Ianmuoljk2sk1u>;
    /**
     *Dispatch the given `call` from an account that the sender is authorized for through
     *`add_proxy`.
     *
     *Removes any corresponding announcement(s).
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `real`: The account that the proxy will make a call on behalf of.
     *- `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *- `call`: The call to be made by the `real` account.
     */
    "proxy_announced": Anonymize<I8nstg9vo0fosk>;
}>;
export type Idpsmkk8cmveiu = {
    "real": MultiAddress;
    "force_proxy_type"?: Anonymize<Ict2klpa3v9sc0>;
    "call": TxCallData;
};
export type I8nstg9vo0fosk = {
    "delegate": MultiAddress;
    "real": MultiAddress;
    "force_proxy_type"?: Anonymize<Ict2klpa3v9sc0>;
    "call": TxCallData;
};
export type I3qhuqfo65bjtf = AnonymousEnum<{
    /**
     *Immediately dispatch a multi-signature call using a single approval from the caller.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `other_signatories`: The accounts (other than the sender) who are part of the
     *multi-signature, but do not participate in the approval process.
     *- `call`: The call to be executed.
     *
     *Result is equivalent to the dispatched result.
     *
     *## Complexity
     *O(Z + C) where Z is the length of the call and C its execution weight.
     */
    "as_multi_threshold_1": Anonymize<Icg17asei4oejt>;
    /**
     *Register approval for a dispatch to be made from a deterministic composite account if
     *approved by a total of `threshold - 1` of `other_signatories`.
     *
     *If there are enough, then dispatch the call.
     *
     *Payment: `DepositBase` will be reserved if this is the first approval, plus
     *`threshold` times `DepositFactor`. It is returned once this dispatch happens or
     *is cancelled.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `threshold`: The total number of approvals for this dispatch before it is executed.
     *- `other_signatories`: The accounts (other than the sender) who can approve this
     *dispatch. May not be empty.
     *- `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
     *not the first approval, then it must be `Some`, with the timepoint (block number and
     *transaction index) of the first approval transaction.
     *- `call`: The call to be executed.
     *
     *NOTE: Unless this is the final approval, you will generally want to use
     *`approve_as_multi` instead, since it only requires a hash of the call.
     *
     *Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
     *on success, result is `Ok` and the result from the interior call, if it was executed,
     *may be found in the deposited `MultisigExecuted` event.
     *
     *## Complexity
     *- `O(S + Z + Call)`.
     *- Up to one balance-reserve or unreserve operation.
     *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
     *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     *- One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
     *- One encode & hash, both of complexity `O(S)`.
     *- Up to one binary search and insert (`O(logS + S)`).
     *- I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
     *- One event.
     *- The weight of the `call`.
     *- Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
     *  taken for its lifetime of `DepositBase + threshold * DepositFactor`.
     */
    "as_multi": Anonymize<I4sp01qlh6rkhp>;
    /**
     *Register approval for a dispatch to be made from a deterministic composite account if
     *approved by a total of `threshold - 1` of `other_signatories`.
     *
     *Payment: `DepositBase` will be reserved if this is the first approval, plus
     *`threshold` times `DepositFactor`. It is returned once this dispatch happens or
     *is cancelled.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `threshold`: The total number of approvals for this dispatch before it is executed.
     *- `other_signatories`: The accounts (other than the sender) who can approve this
     *dispatch. May not be empty.
     *- `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
     *not the first approval, then it must be `Some`, with the timepoint (block number and
     *transaction index) of the first approval transaction.
     *- `call_hash`: The hash of the call to be executed.
     *
     *NOTE: If this is the final approval, you will want to use `as_multi` instead.
     *
     *## Complexity
     *- `O(S)`.
     *- Up to one balance-reserve or unreserve operation.
     *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
     *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     *- One encode & hash, both of complexity `O(S)`.
     *- Up to one binary search and insert (`O(logS + S)`).
     *- I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
     *- One event.
     *- Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
     *  taken for its lifetime of `DepositBase + threshold * DepositFactor`.
     */
    "approve_as_multi": Anonymize<Ideaemvoneh309>;
    /**
     *Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
     *for this operation will be unreserved on success.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `threshold`: The total number of approvals for this dispatch before it is executed.
     *- `other_signatories`: The accounts (other than the sender) who can approve this
     *dispatch. May not be empty.
     *- `timepoint`: The timepoint (block number and transaction index) of the first approval
     *transaction for this dispatch.
     *- `call_hash`: The hash of the call to be executed.
     *
     *## Complexity
     *- `O(S)`.
     *- Up to one balance-reserve or unreserve operation.
     *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
     *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     *- One encode & hash, both of complexity `O(S)`.
     *- One event.
     *- I/O: 1 read `O(S)`, one remove.
     *- Storage: removes one item.
     */
    "cancel_as_multi": Anonymize<I3d9o9d7epp66v>;
}>;
export type Icg17asei4oejt = {
    "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
    "call": TxCallData;
};
export type I4sp01qlh6rkhp = {
    "threshold": number;
    "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
    "maybe_timepoint"?: Anonymize<I95jfd8j5cr5eh>;
    "call": TxCallData;
    "max_weight": Anonymize<I4q39t5hn830vp>;
};
export type I8tnfu4hpnpsg = AnonymousEnum<{
    /**
     *Schedule a para to be initialized at the start of the next session.
     *
     *This should only be used for TESTING and not on PRODUCTION chains. It automatically
     *assigns Coretime to the chain and increases the number of cores. Thus, there is no
     *running coretime chain required.
     */
    "sudo_schedule_para_initialize": Anonymize<I9geq5evbpu4im>;
    /**
     *Schedule a para to be cleaned up at the start of the next session.
     */
    "sudo_schedule_para_cleanup": Anonymize<Ic5b47dj4coa3r>;
    /**
     *Upgrade a parathread (on-demand parachain) to a lease holding parachain
     */
    "sudo_schedule_parathread_upgrade": Anonymize<Ic5b47dj4coa3r>;
    /**
     *Downgrade a lease holding parachain to an on-demand parachain
     */
    "sudo_schedule_parachain_downgrade": Anonymize<Ic5b47dj4coa3r>;
    /**
     *Send a downward XCM to the given para.
     *
     *The given parachain should exist and the payload should not exceed the preconfigured
     *size `config.max_downward_message_size`.
     */
    "sudo_queue_downward_xcm": Anonymize<I7mlkc61s5tj4l>;
    /**
     *Forcefully establish a channel from the sender to the recipient.
     *
     *This is equivalent to sending an `Hrmp::hrmp_init_open_channel` extrinsic followed by
     *`Hrmp::hrmp_accept_open_channel`.
     */
    "sudo_establish_hrmp_channel": Anonymize<Ic3430470j4mbv>;
}>;
export type I9geq5evbpu4im = {
    "id": number;
    "genesis": Anonymize<I2duhnt686rv0q>;
};
export type I7mlkc61s5tj4l = {
    "id": number;
    "xcm": DotXcmVersionedXcm;
};
export type I9s1em4tt8ni1d = AnonymousEnum<{
    /**
     *Authenticates the sudo key and dispatches a function call with `Root` origin.
     */
    "sudo": Anonymize<I3dq5m6mb8ta46>;
    /**
     *Authenticates the sudo key and dispatches a function call with `Root` origin.
     *This function does not check the weight of the call, and instead allows the
     *Sudo user to specify the weight of the call.
     *
     *The dispatch origin for this call must be _Signed_.
     */
    "sudo_unchecked_weight": Anonymize<Ic81m9070nb7fh>;
    /**
     *Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
     *key.
     */
    "set_key": Anonymize<I8k3rnvpeeh4hv>;
    /**
     *Authenticates the sudo key and dispatches a function call with `Signed` origin from
     *a given account.
     *
     *The dispatch origin for this call must be _Signed_.
     */
    "sudo_as": Anonymize<Id3ingc7s7iq1i>;
    /**
     *Permanently removes the sudo key.
     *
     ***This cannot be un-done.**
     */
    "remove_key": undefined;
}>;
export type I8k3rnvpeeh4hv = {
    "new": MultiAddress;
};
export type Id3ingc7s7iq1i = {
    "who": MultiAddress;
    "call": TxCallData;
};
export type Ikgci99ap0ffp = ResultPayload<Anonymize<I38dplpgbs8dgo>, TransactionValidityError>;
export type Ibqu3kf8ifskue = AnonymousEnum<{
    "System": Anonymize<Iekve0i6djpd9f>;
    "Scheduler": Anonymize<I5aiiov8iuajn7>;
    "Preimage": Anonymize<If81ks88t5mpk5>;
    "Babe": Anonymize<I1jeo0dpbkma5g>;
    "Timestamp": Anonymize<I7d75gqfg6jh9c>;
    "Indices": Anonymize<I66vlm8f4l1oll>;
    "Balances": Anonymize<I9svldsp29mh87>;
    "Staking": Anonymize<I5jvuh9dlbdd20>;
    "Session": Anonymize<Iceajactc9a8pc>;
    "Grandpa": Anonymize<I5u9ggmn8umfqm>;
    "Treasury": Anonymize<I1s28h18nhih63>;
    "ConvictionVoting": Anonymize<Ie5kd08tutk56t>;
    "Referenda": Anonymize<I657vbelok0a1m>;
    "Whitelist": Anonymize<Idq03kcq8thgsl>;
    "Parameters": Anonymize<Ic5v5ffa0cr70p>;
    "Claims": Anonymize<Id0dj18ct09hlp>;
    "Vesting": Anonymize<Icgf8vmtkbnu4u>;
    "Utility": Anonymize<I59r34240djor4>;
    "Proxy": Anonymize<I4qsi0udulp485>;
    "Multisig": Anonymize<I3qhuqfo65bjtf>;
    "Bounties": Anonymize<I91kpi5kjh9on2>;
    "ChildBounties": Anonymize<I1b6drdhvt5hl9>;
    "ElectionProviderMultiPhase": Anonymize<I15soeogelbbbh>;
    "VoterList": Anonymize<Ifvfo1l0vu2o7e>;
    "NominationPools": Anonymize<I57mljkkr28m9p>;
    "FastUnstake": Anonymize<I44snhj1gahvrd>;
    "Configuration": Anonymize<Ia9ptue949ognv>;
    "ParasShared": undefined;
    "ParaInclusion": undefined;
    "ParaInherent": Anonymize<Id5l4f3jqtnb0u>;
    "Paras": Anonymize<Ie2dden5k4kk7t>;
    "Initializer": Anonymize<Ieggtnkc96vvt7>;
    "Hrmp": Anonymize<I45adic8nko129>;
    "ParasDisputes": Anonymize<Ifkh1ep7g9h3rv>;
    "ParasSlashing": Anonymize<I3jj054kp2bjol>;
    "OnDemand": Anonymize<I9s7urueli180g>;
    "Registrar": Anonymize<Icclqj5sge2nc7>;
    "Slots": Anonymize<Iafhis924j14hg>;
    "Auctions": Anonymize<I4a8qeimc5p3qn>;
    "Crowdloan": Anonymize<Iaj4q75nu5v2i2>;
    "Coretime": Anonymize<Idu7bbtd2jtnb9>;
    "StateTrieMigration": Anonymize<I39l72gdmkk30t>;
    "XcmPallet": Anonymize<I9nbjvlrb9bp1g>;
    "MessageQueue": Anonymize<I3lic4llm6egbr>;
    "AssetRate": Anonymize<I85dm8mgt48css>;
    "Beefy": Anonymize<I918ie8roegt3d>;
    "ParaSudoWrapper": Anonymize<I8tnfu4hpnpsg>;
    "Sudo": Anonymize<I9s1em4tt8ni1d>;
}>;
export type I399nsqbaqlr2u = ResultPayload<Anonymize<Ieitu6hgbj97ka>, Anonymize<I55ku9c5gk50hb>>;
export type Ieitu6hgbj97ka = {
    "execution_result": Anonymize<If2tjlchftm7hb>;
    "emitted_events": Anonymize<I51kiaatnj3hin>;
    "local_xcm"?: Anonymize<I3i0ce56p044d2>;
    "forwarded_xcms": Anonymize<I47tkk5e5nm6g7>;
};
export type I51kiaatnj3hin = Array<Anonymize<I5geb27cbtkqio>>;
export type Ib0m46eqe594fl = ResultPayload<Anonymize<I9mfrpc3781h8d>, Anonymize<I55ku9c5gk50hb>>;
export type I9mfrpc3781h8d = {
    "execution_result": XcmV4TraitsOutcome;
    "emitted_events": Anonymize<I51kiaatnj3hin>;
    "forwarded_xcms": Anonymize<I47tkk5e5nm6g7>;
};
export type I7l46q2pu39ff3 = Array<Anonymize<I2qolcj0rca7pb>>;
export type I2qolcj0rca7pb = {
    "phase": Phase;
    "event": Anonymize<I5ndpakc7tptdv>;
    "topics": Anonymize<Ic5m5lp1oioo8r>;
};
export type I5ndpakc7tptdv = AnonymousEnum<{
    "System": Anonymize<I4q7rpic4ibjpj>;
    "Indices": Anonymize<I2pejk6do5vg4t>;
    "Balances": Anonymize<Iao8h4hv7atnq3>;
    "TransactionPayment": TransactionPaymentEvent;
    "Staking": Anonymize<I8n4qjnlkvth8n>;
    "Offences": OffencesEvent;
    "Historical": Anonymize<I3fs99kjn361i1>;
    "Parameters": Anonymize<In3t00aurfuda>;
    "Session": Anonymize<I6ue0ck5fc3u44>;
    "Grandpa": GrandpaEvent;
    "Utility": Anonymize<I2m3ghucjkd8v0>;
    "Identity": Anonymize<I2au2or9cskfoi>;
    "Recovery": Anonymize<I1h17pkrpub934>;
    "Vesting": Anonymize<I7uu9ebnucfti5>;
    "Scheduler": Anonymize<I444u8rj2mqv17>;
    "Preimage": PreimageEvent;
    "Sudo": Anonymize<I9r0mgi6ick4cs>;
    "Proxy": Anonymize<I6vqme2kguttup>;
    "Multisig": Anonymize<I3kuqq8f8kn85j>;
    "ElectionProviderMultiPhase": ElectionProviderMultiPhaseEvent;
    "VoterList": BagsListEvent;
    "NominationPools": Anonymize<Id0dkgikq71n9h>;
    "FastUnstake": Anonymize<I1oda81joco4aj>;
    "ConvictionVoting": Anonymize<I7tvgbf73o5td4>;
    "Referenda": Anonymize<Idfraa3b4eu018>;
    "Whitelist": Anonymize<Id788i4dlrmqf5>;
    "Treasury": Anonymize<Ia1b9fjuj0ob0b>;
    "DelegatedStaking": Anonymize<I1nq1se98idofq>;
    "ParaInclusion": Anonymize<If7iaaqrjurpqf>;
    "Paras": Anonymize<Ifbkifeb2totq0>;
    "Hrmp": ParachainsHrmpEvent;
    "ParasDisputes": ParachainsDisputesEvent;
    "OnDemandAssignmentProvider": Anonymize<I8vt07l5vp6sb8>;
    "Registrar": CommonParasRegistrarEvent;
    "Slots": CommonSlotsEvent;
    "Auctions": CommonAuctionsEvent;
    "Crowdloan": Anonymize<I687cmlomantj7>;
    "AssignedSlots": PolkadotRuntimeCommonAssignedSlotsEvent;
    "Coretime": PolkadotRuntimeParachainsCoretimeEvent;
    "StakingAhClient": Anonymize<If5dgssg1nqq8m>;
    "MultiBlockMigrations": Anonymize<I94co7vj7h6bo>;
    "XcmPallet": Anonymize<If95hivmqmkiku>;
    "MessageQueue": Anonymize<I13vul90391uuv>;
    "AssetRate": Anonymize<I1dcjapt414ijf>;
    "RootTesting": RootTestingEvent;
    "MetaTx": Anonymize<Id1mj65apaj4j4>;
    "IdentityMigrator": PolkadotRuntimeCommonIdentityMigratorEvent;
}>;
export type I4q7rpic4ibjpj = AnonymousEnum<{
    /**
     *An extrinsic completed successfully.
     */
    "ExtrinsicSuccess": Anonymize<Ia82mnkmeo2rhc>;
    /**
     *An extrinsic failed.
     */
    "ExtrinsicFailed": Anonymize<Iab150pc00u513>;
    /**
     *`:code` was updated.
     */
    "CodeUpdated": undefined;
    /**
     *A new account was created.
     */
    "NewAccount": Anonymize<Icbccs0ug47ilf>;
    /**
     *An account was reaped.
     */
    "KilledAccount": Anonymize<Icbccs0ug47ilf>;
    /**
     *On on-chain remark happened.
     */
    "Remarked": Anonymize<I855j4i3kr8ko1>;
    /**
     *An upgrade was authorized.
     */
    "UpgradeAuthorized": Anonymize<Ibgl04rn6nbfm6>;
    /**
     *An invalid authorized upgrade was rejected while trying to apply it.
     */
    "RejectedInvalidAuthorizedUpgrade": Anonymize<I9ol0kobt15obh>;
}>;
export type Iab150pc00u513 = {
    "dispatch_error": Anonymize<Icrp2r0j3sbgko>;
    "dispatch_info": Anonymize<Ic9s8f85vjtncc>;
};
export type Icrp2r0j3sbgko = AnonymousEnum<{
    "Other": undefined;
    "CannotLookup": undefined;
    "BadOrigin": undefined;
    "Module": Anonymize<I1v7k93qqf04mq>;
    "ConsumerRemaining": undefined;
    "NoProviders": undefined;
    "TooManyConsumers": undefined;
    "Token": TokenError;
    "Arithmetic": ArithmeticError;
    "Transactional": TransactionalError;
    "Exhausted": undefined;
    "Corruption": undefined;
    "Unavailable": undefined;
    "RootNotAllowed": undefined;
    "Trie": Anonymize<Idh4cj79bvroj8>;
}>;
export type I1v7k93qqf04mq = AnonymousEnum<{
    "System": Anonymize<I5o0s7c8q1cc9b>;
    "Babe": Anonymize<Ib6q602k6o213a>;
    "Timestamp": undefined;
    "Indices": Anonymize<Icq1825fru3di2>;
    "Balances": Anonymize<Idj13i7adlomht>;
    "TransactionPayment": undefined;
    "Authorship": undefined;
    "Staking": Anonymize<Ileu8a8k5fbnr>;
    "Offences": undefined;
    "Historical": undefined;
    "Parameters": undefined;
    "Session": Anonymize<I1e07dgbaqd1sq>;
    "Grandpa": Anonymize<I7q8i0pp1gkas6>;
    "AuthorityDiscovery": undefined;
    "Utility": Anonymize<I8dt2g2hcrgh36>;
    "Identity": Anonymize<Ib8gja1crqq8kd>;
    "Recovery": Anonymize<I29mqdjoga49c9>;
    "Vesting": Anonymize<Icof2acl69lq3c>;
    "Scheduler": Anonymize<If7oa8fprnilo5>;
    "Preimage": Anonymize<I4cfhml1prt4lu>;
    "Sudo": Anonymize<Iaug04qjhbli00>;
    "Proxy": Anonymize<Iuvt54ei4cehc>;
    "Multisig": Anonymize<Ia76qmhhg4jvb9>;
    "ElectionProviderMultiPhase": Anonymize<Idb84kfjd998sl>;
    "VoterList": Anonymize<I2e4fekrkcdej2>;
    "NominationPools": Anonymize<Iuudu4kursojc>;
    "FastUnstake": Anonymize<Iau9bur8dc3bec>;
    "ConvictionVoting": Anonymize<Idfa8k8ikssbsf>;
    "Referenda": Anonymize<I84u4ul208g742>;
    "Origins": undefined;
    "Whitelist": Anonymize<I15nctscutpbeh>;
    "Treasury": Anonymize<I36uss0m9fpcsf>;
    "DelegatedStaking": Anonymize<Iaogv3iimefnis>;
    "ParachainsOrigin": undefined;
    "Configuration": Anonymize<In1jctfv299lm>;
    "ParasShared": undefined;
    "ParaInclusion": Anonymize<I4rrcn97hglfls>;
    "ParaInherent": Anonymize<I2g8k20rpkqcs4>;
    "ParaScheduler": undefined;
    "Paras": Anonymize<I5odm90qsq75h7>;
    "Initializer": undefined;
    "Dmp": undefined;
    "Hrmp": Anonymize<Ibns95nfmm92df>;
    "ParaSessionInfo": undefined;
    "ParasDisputes": Anonymize<Iakburbqot4g58>;
    "ParasSlashing": Anonymize<I1v70p1j0r2q1j>;
    "OnDemandAssignmentProvider": Anonymize<I48hdahgqa1mcd>;
    "CoretimeAssignmentProvider": Anonymize<I2mjnb5vgujeqj>;
    "Registrar": Anonymize<I97vkspnd0b8bh>;
    "Slots": Anonymize<Iers095sa65pbg>;
    "ParasSudoWrapper": Anonymize<I5lft3p1jlcar1>;
    "Auctions": Anonymize<I4kgo47o2v3701>;
    "Crowdloan": Anonymize<I9o6l1c4r4qc3s>;
    "AssignedSlots": Anonymize<I40te5bcfc046n>;
    "Coretime": Anonymize<Ifju0orssp9h7o>;
    "StakingAhClient": Anonymize<I45or3o7sshpv4>;
    "MultiBlockMigrations": Anonymize<Iaaqq5jevtahm8>;
    "XcmPallet": Anonymize<I4vcvo9od6afmt>;
    "MessageQueue": Anonymize<I5iupade5ag2dp>;
    "AssetRate": Anonymize<I3qgd61cgli6cp>;
    "RootTesting": undefined;
    "MetaTx": Anonymize<I8436figeoo3ti>;
    "VerifySignature": undefined;
    "Beefy": Anonymize<Iflve6qd33ah68>;
    "Mmr": undefined;
    "BeefyMmrLeaf": undefined;
    "IdentityMigrator": undefined;
}>;
export type Ileu8a8k5fbnr = AnonymousEnum<{
    /**
     *Not a controller account.
     */
    "NotController": undefined;
    /**
     *Not a stash account.
     */
    "NotStash": undefined;
    /**
     *Stash is already bonded.
     */
    "AlreadyBonded": undefined;
    /**
     *Controller is already paired.
     */
    "AlreadyPaired": undefined;
    /**
     *Targets cannot be empty.
     */
    "EmptyTargets": undefined;
    /**
     *Duplicate index.
     */
    "DuplicateIndex": undefined;
    /**
     *Slash record index out of bounds.
     */
    "InvalidSlashIndex": undefined;
    /**
     *Cannot have a validator or nominator role, with value less than the minimum defined by
     *governance (see `MinValidatorBond` and `MinNominatorBond`). If unbonding is the
     *intention, `chill` first to remove one's role as validator/nominator.
     */
    "InsufficientBond": undefined;
    /**
     *Can not schedule more unlock chunks.
     */
    "NoMoreChunks": undefined;
    /**
     *Can not rebond without unlocking chunks.
     */
    "NoUnlockChunk": undefined;
    /**
     *Attempting to target a stash that still has funds.
     */
    "FundedTarget": undefined;
    /**
     *Invalid era to reward.
     */
    "InvalidEraToReward": undefined;
    /**
     *Invalid number of nominations.
     */
    "InvalidNumberOfNominations": undefined;
    /**
     *Items are not sorted and unique.
     */
    "NotSortedAndUnique": undefined;
    /**
     *Rewards for this era have already been claimed for this validator.
     */
    "AlreadyClaimed": undefined;
    /**
     *No nominators exist on this page.
     */
    "InvalidPage": undefined;
    /**
     *Incorrect previous history depth input provided.
     */
    "IncorrectHistoryDepth": undefined;
    /**
     *Incorrect number of slashing spans provided.
     */
    "IncorrectSlashingSpans": undefined;
    /**
     *Internal state has become somehow corrupted and the operation cannot continue.
     */
    "BadState": undefined;
    /**
     *Too many nomination targets supplied.
     */
    "TooManyTargets": undefined;
    /**
     *A nomination target was supplied that was blocked or otherwise not a validator.
     */
    "BadTarget": undefined;
    /**
     *The user has enough bond and thus cannot be chilled forcefully by an external person.
     */
    "CannotChillOther": undefined;
    /**
     *There are too many nominators in the system. Governance needs to adjust the staking
     *settings to keep things safe for the runtime.
     */
    "TooManyNominators": undefined;
    /**
     *There are too many validator candidates in the system. Governance needs to adjust the
     *staking settings to keep things safe for the runtime.
     */
    "TooManyValidators": undefined;
    /**
     *Commission is too low. Must be at least `MinCommission`.
     */
    "CommissionTooLow": undefined;
    /**
     *Some bound is not met.
     */
    "BoundNotMet": undefined;
    /**
     *Used when attempting to use deprecated controller account logic.
     */
    "ControllerDeprecated": undefined;
    /**
     *Cannot reset a ledger.
     */
    "CannotRestoreLedger": undefined;
    /**
     *Provided reward destination is not allowed.
     */
    "RewardDestinationRestricted": undefined;
    /**
     *Not enough funds available to withdraw.
     */
    "NotEnoughFunds": undefined;
    /**
     *Operation not allowed for virtual stakers.
     */
    "VirtualStakerNotAllowed": undefined;
    /**
     *Stash could not be reaped as other pallet might depend on it.
     */
    "CannotReapStash": undefined;
    /**
     *The stake of this account is already migrated to `Fungible` holds.
     */
    "AlreadyMigrated": undefined;
    /**
     *Account is restricted from participation in staking. This may happen if the account is
     *staking in another way already, such as via pool.
     */
    "Restricted": undefined;
}>;
export type Ib8gja1crqq8kd = AnonymousEnum<{
    /**
     *Too many subs-accounts.
     */
    "TooManySubAccounts": undefined;
    /**
     *Account isn't found.
     */
    "NotFound": undefined;
    /**
     *Account isn't named.
     */
    "NotNamed": undefined;
    /**
     *Empty index.
     */
    "EmptyIndex": undefined;
    /**
     *Fee is changed.
     */
    "FeeChanged": undefined;
    /**
     *No identity found.
     */
    "NoIdentity": undefined;
    /**
     *Sticky judgement.
     */
    "StickyJudgement": undefined;
    /**
     *Judgement given.
     */
    "JudgementGiven": undefined;
    /**
     *Invalid judgement.
     */
    "InvalidJudgement": undefined;
    /**
     *The index is invalid.
     */
    "InvalidIndex": undefined;
    /**
     *The target is invalid.
     */
    "InvalidTarget": undefined;
    /**
     *Maximum amount of registrars reached. Cannot add any more.
     */
    "TooManyRegistrars": undefined;
    /**
     *Account ID is already named.
     */
    "AlreadyClaimed": undefined;
    /**
     *Sender is not a sub-account.
     */
    "NotSub": undefined;
    /**
     *Sub-account isn't owned by sender.
     */
    "NotOwned": undefined;
    /**
     *The provided judgement was for a different identity.
     */
    "JudgementForDifferentIdentity": undefined;
    /**
     *Error that occurs when there is an issue paying for judgement.
     */
    "JudgementPaymentFailed": undefined;
    /**
     *The provided suffix is too long.
     */
    "InvalidSuffix": undefined;
    /**
     *The sender does not have permission to issue a username.
     */
    "NotUsernameAuthority": undefined;
    /**
     *The authority cannot allocate any more usernames.
     */
    "NoAllocation": undefined;
    /**
     *The signature on a username was not valid.
     */
    "InvalidSignature": undefined;
    /**
     *Setting this username requires a signature, but none was provided.
     */
    "RequiresSignature": undefined;
    /**
     *The username does not meet the requirements.
     */
    "InvalidUsername": undefined;
    /**
     *The username is already taken.
     */
    "UsernameTaken": undefined;
    /**
     *The requested username does not exist.
     */
    "NoUsername": undefined;
    /**
     *The username cannot be forcefully removed because it can still be accepted.
     */
    "NotExpired": undefined;
    /**
     *The username cannot be removed because it's still in the grace period.
     */
    "TooEarly": undefined;
    /**
     *The username cannot be removed because it is not unbinding.
     */
    "NotUnbinding": undefined;
    /**
     *The username cannot be unbound because it is already unbinding.
     */
    "AlreadyUnbinding": undefined;
    /**
     *The action cannot be performed because of insufficient privileges (e.g. authority
     *trying to unbind a username provided by the system).
     */
    "InsufficientPrivileges": undefined;
}>;
export type I4cfhml1prt4lu = AnonymousEnum<{
    /**
     *Preimage is too large to store on-chain.
     */
    "TooBig": undefined;
    /**
     *Preimage has already been noted on-chain.
     */
    "AlreadyNoted": undefined;
    /**
     *The user is not authorized to perform this action.
     */
    "NotAuthorized": undefined;
    /**
     *The preimage cannot be removed since it has not yet been noted.
     */
    "NotNoted": undefined;
    /**
     *A preimage may not be removed when there are outstanding requests.
     */
    "Requested": undefined;
    /**
     *The preimage request cannot be removed since no outstanding requests exist.
     */
    "NotRequested": undefined;
    /**
     *More than `MAX_HASH_UPGRADE_BULK_COUNT` hashes were requested to be upgraded at once.
     */
    "TooMany": undefined;
    /**
     *Too few hashes were requested to be upgraded (i.e. zero).
     */
    "TooFew": undefined;
}>;
export type I2e4fekrkcdej2 = AnonymousEnum<{
    /**
     *A error in the list interface implementation.
     */
    "List": Anonymize<Ictkqqlhdjt761>;
    /**
     *Could not update a node, because the pallet is locked.
     */
    "Locked": undefined;
}>;
export type Ictkqqlhdjt761 = AnonymousEnum<{
    "Duplicate": undefined;
    "NotHeavier": undefined;
    "NotInSameBag": undefined;
    "NodeNotFound": undefined;
    "Locked": undefined;
}>;
export type Iuudu4kursojc = AnonymousEnum<{
    /**
     *A (bonded) pool id does not exist.
     */
    "PoolNotFound": undefined;
    /**
     *An account is not a member.
     */
    "PoolMemberNotFound": undefined;
    /**
     *A reward pool does not exist. In all cases this is a system logic error.
     */
    "RewardPoolNotFound": undefined;
    /**
     *A sub pool does not exist.
     */
    "SubPoolsNotFound": undefined;
    /**
     *An account is already delegating in another pool. An account may only belong to one
     *pool at a time.
     */
    "AccountBelongsToOtherPool": undefined;
    /**
     *The member is fully unbonded (and thus cannot access the bonded and reward pool
     *anymore to, for example, collect rewards).
     */
    "FullyUnbonding": undefined;
    /**
     *The member cannot unbond further chunks due to reaching the limit.
     */
    "MaxUnbondingLimit": undefined;
    /**
     *None of the funds can be withdrawn yet because the bonding duration has not passed.
     */
    "CannotWithdrawAny": undefined;
    /**
     *The amount does not meet the minimum bond to either join or create a pool.
     *
     *The depositor can never unbond to a value less than `Pallet::depositor_min_bond`. The
     *caller does not have nominating permissions for the pool. Members can never unbond to a
     *value below `MinJoinBond`.
     */
    "MinimumBondNotMet": undefined;
    /**
     *The transaction could not be executed due to overflow risk for the pool.
     */
    "OverflowRisk": undefined;
    /**
     *A pool must be in [`PoolState::Destroying`] in order for the depositor to unbond or for
     *other members to be permissionlessly unbonded.
     */
    "NotDestroying": undefined;
    /**
     *The caller does not have nominating permissions for the pool.
     */
    "NotNominator": undefined;
    /**
     *Either a) the caller cannot make a valid kick or b) the pool is not destroying.
     */
    "NotKickerOrDestroying": undefined;
    /**
     *The pool is not open to join
     */
    "NotOpen": undefined;
    /**
     *The system is maxed out on pools.
     */
    "MaxPools": undefined;
    /**
     *Too many members in the pool or system.
     */
    "MaxPoolMembers": undefined;
    /**
     *The pools state cannot be changed.
     */
    "CanNotChangeState": undefined;
    /**
     *The caller does not have adequate permissions.
     */
    "DoesNotHavePermission": undefined;
    /**
     *Metadata exceeds [`Config::MaxMetadataLen`]
     */
    "MetadataExceedsMaxLen": undefined;
    /**
     *Some error occurred that should never happen. This should be reported to the
     *maintainers.
     */
    "Defensive": Anonymize<Ie2db4l6126rkt>;
    /**
     *Partial unbonding now allowed permissionlessly.
     */
    "PartialUnbondNotAllowedPermissionlessly": undefined;
    /**
     *The pool's max commission cannot be set higher than the existing value.
     */
    "MaxCommissionRestricted": undefined;
    /**
     *The supplied commission exceeds the max allowed commission.
     */
    "CommissionExceedsMaximum": undefined;
    /**
     *The supplied commission exceeds global maximum commission.
     */
    "CommissionExceedsGlobalMaximum": undefined;
    /**
     *Not enough blocks have surpassed since the last commission update.
     */
    "CommissionChangeThrottled": undefined;
    /**
     *The submitted changes to commission change rate are not allowed.
     */
    "CommissionChangeRateNotAllowed": undefined;
    /**
     *There is no pending commission to claim.
     */
    "NoPendingCommission": undefined;
    /**
     *No commission current has been set.
     */
    "NoCommissionCurrentSet": undefined;
    /**
     *Pool id currently in use.
     */
    "PoolIdInUse": undefined;
    /**
     *Pool id provided is not correct/usable.
     */
    "InvalidPoolId": undefined;
    /**
     *Bonding extra is restricted to the exact pending reward amount.
     */
    "BondExtraRestricted": undefined;
    /**
     *No imbalance in the ED deposit for the pool.
     */
    "NothingToAdjust": undefined;
    /**
     *No slash pending that can be applied to the member.
     */
    "NothingToSlash": undefined;
    /**
     *The slash amount is too low to be applied.
     */
    "SlashTooLow": undefined;
    /**
     *The pool or member delegation has already migrated to delegate stake.
     */
    "AlreadyMigrated": undefined;
    /**
     *The pool or member delegation has not migrated yet to delegate stake.
     */
    "NotMigrated": undefined;
    /**
     *This call is not allowed in the current state of the pallet.
     */
    "NotSupported": undefined;
    /**
     *Account is restricted from participation in pools. This may happen if the account is
     *staking in another way already.
     */
    "Restricted": undefined;
}>;
export type Iaogv3iimefnis = AnonymousEnum<{
    /**
     *The account cannot perform this operation.
     */
    "NotAllowed": undefined;
    /**
     *An existing staker cannot perform this action.
     */
    "AlreadyStaking": undefined;
    /**
     *Reward Destination cannot be same as `Agent` account.
     */
    "InvalidRewardDestination": undefined;
    /**
     *Delegation conditions are not met.
     *
     *Possible issues are
     *1) Cannot delegate to self,
     *2) Cannot delegate to multiple delegates.
     */
    "InvalidDelegation": undefined;
    /**
     *The account does not have enough funds to perform the operation.
     */
    "NotEnoughFunds": undefined;
    /**
     *Not an existing `Agent` account.
     */
    "NotAgent": undefined;
    /**
     *Not a Delegator account.
     */
    "NotDelegator": undefined;
    /**
     *Some corruption in internal state.
     */
    "BadState": undefined;
    /**
     *Unapplied pending slash restricts operation on `Agent`.
     */
    "UnappliedSlash": undefined;
    /**
     *`Agent` has no pending slash to be applied.
     */
    "NothingToSlash": undefined;
    /**
     *Failed to withdraw amount from Core Staking.
     */
    "WithdrawFailed": undefined;
    /**
     *Operation not supported by this pallet.
     */
    "NotSupported": undefined;
}>;
export type I4rrcn97hglfls = AnonymousEnum<{
    /**
     *Validator index out of bounds.
     */
    "ValidatorIndexOutOfBounds": undefined;
    /**
     *Candidate submitted but para not scheduled.
     */
    "UnscheduledCandidate": undefined;
    /**
     *Head data exceeds the configured maximum.
     */
    "HeadDataTooLarge": undefined;
    /**
     *Code upgrade prematurely.
     */
    "PrematureCodeUpgrade": undefined;
    /**
     *Output code is too large
     */
    "NewCodeTooLarge": undefined;
    /**
     *The candidate's relay-parent was not allowed. Either it was
     *not recent enough or it didn't advance based on the last parachain block.
     */
    "DisallowedRelayParent": undefined;
    /**
     *Failed to compute group index for the core: either it's out of bounds
     *or the relay parent doesn't belong to the current session.
     */
    "InvalidAssignment": undefined;
    /**
     *Invalid group index in core assignment.
     */
    "InvalidGroupIndex": undefined;
    /**
     *Insufficient (non-majority) backing.
     */
    "InsufficientBacking": undefined;
    /**
     *Invalid (bad signature, unknown validator, etc.) backing.
     */
    "InvalidBacking": undefined;
    /**
     *The validation data hash does not match expected.
     */
    "ValidationDataHashMismatch": undefined;
    /**
     *The downward message queue is not processed correctly.
     */
    "IncorrectDownwardMessageHandling": undefined;
    /**
     *At least one upward message sent does not pass the acceptance criteria.
     */
    "InvalidUpwardMessages": undefined;
    /**
     *The candidate didn't follow the rules of HRMP watermark advancement.
     */
    "HrmpWatermarkMishandling": undefined;
    /**
     *The HRMP messages sent by the candidate is not valid.
     */
    "InvalidOutboundHrmp": undefined;
    /**
     *The validation code hash of the candidate is not valid.
     */
    "InvalidValidationCodeHash": undefined;
    /**
     *The `para_head` hash in the candidate descriptor doesn't match the hash of the actual
     *para head in the commitments.
     */
    "ParaHeadMismatch": undefined;
}>;
export type I2g8k20rpkqcs4 = AnonymousEnum<{
    /**
     *Inclusion inherent called more than once per block.
     */
    "TooManyInclusionInherents": undefined;
    /**
     *The hash of the submitted parent header doesn't correspond to the saved block hash of
     *the parent.
     */
    "InvalidParentHeader": undefined;
    /**
     *Inherent data was filtered during execution. This should have only been done
     *during creation.
     */
    "InherentDataFilteredDuringExecution": undefined;
    /**
     *Too many candidates supplied.
     */
    "UnscheduledCandidate": undefined;
}>;
export type I5odm90qsq75h7 = AnonymousEnum<{
    /**
     *Para is not registered in our system.
     */
    "NotRegistered": undefined;
    /**
     *Para cannot be onboarded because it is already tracked by our system.
     */
    "CannotOnboard": undefined;
    /**
     *Para cannot be offboarded at this time.
     */
    "CannotOffboard": undefined;
    /**
     *Para cannot be upgraded to a lease holding parachain.
     */
    "CannotUpgrade": undefined;
    /**
     *Para cannot be downgraded to an on-demand parachain.
     */
    "CannotDowngrade": undefined;
    /**
     *The statement for PVF pre-checking is stale.
     */
    "PvfCheckStatementStale": undefined;
    /**
     *The statement for PVF pre-checking is for a future session.
     */
    "PvfCheckStatementFuture": undefined;
    /**
     *Claimed validator index is out of bounds.
     */
    "PvfCheckValidatorIndexOutOfBounds": undefined;
    /**
     *The signature for the PVF pre-checking is invalid.
     */
    "PvfCheckInvalidSignature": undefined;
    /**
     *The given validator already has cast a vote.
     */
    "PvfCheckDoubleVote": undefined;
    /**
     *The given PVF does not exist at the moment of process a vote.
     */
    "PvfCheckSubjectInvalid": undefined;
    /**
     *Parachain cannot currently schedule a code upgrade.
     */
    "CannotUpgradeCode": undefined;
    /**
     *Invalid validation code size.
     */
    "InvalidCode": undefined;
    /**
     *No upgrade authorized.
     */
    "NothingAuthorized": undefined;
    /**
     *The submitted code is not authorized.
     */
    "Unauthorized": undefined;
    /**
     *Invalid block number.
     */
    "InvalidBlockNumber": undefined;
}>;
export type I48hdahgqa1mcd = AnonymousEnum<{
    /**
     *The order queue is full, `place_order` will not continue.
     */
    "QueueFull": undefined;
    /**
     *The current spot price is higher than the max amount specified in the `place_order`
     *call, making it invalid.
     */
    "SpotPriceHigherThanMaxAmount": undefined;
    /**
     *The account doesn't have enough credits to purchase on-demand coretime.
     */
    "InsufficientCredits": undefined;
}>;
export type I2mjnb5vgujeqj = AnonymousEnum<{
    "AssignmentsEmpty": undefined;
    /**
     *assign_core is only allowed to append new assignments at the end of already existing
     *ones or update the last entry.
     */
    "DisallowedInsert": undefined;
}>;
export type I5lft3p1jlcar1 = AnonymousEnum<{
    /**
     *The specified parachain is not registered.
     */
    "ParaDoesntExist": undefined;
    /**
     *The specified parachain is already registered.
     */
    "ParaAlreadyExists": undefined;
    /**
     *A DMP message couldn't be sent because it exceeds the maximum size allowed for a
     *downward message.
     */
    "ExceedsMaxMessageSize": undefined;
    /**
     *A DMP message couldn't be sent because the destination is unreachable.
     */
    "Unroutable": undefined;
    /**
     *Could not schedule para cleanup.
     */
    "CouldntCleanup": undefined;
    /**
     *Not a parathread (on-demand parachain).
     */
    "NotParathread": undefined;
    /**
     *Not a lease holding parachain.
     */
    "NotParachain": undefined;
    /**
     *Cannot upgrade on-demand parachain to lease holding parachain.
     */
    "CannotUpgrade": undefined;
    /**
     *Cannot downgrade lease holding parachain to on-demand.
     */
    "CannotDowngrade": undefined;
    /**
     *There are more cores than supported by the runtime.
     */
    "TooManyCores": undefined;
}>;
export type I40te5bcfc046n = AnonymousEnum<{
    /**
     *The specified parachain is not registered.
     */
    "ParaDoesntExist": undefined;
    /**
     *Not a parathread (on-demand parachain).
     */
    "NotParathread": undefined;
    /**
     *Cannot upgrade on-demand parachain to lease holding
     *parachain.
     */
    "CannotUpgrade": undefined;
    /**
     *Cannot downgrade lease holding parachain to
     *on-demand.
     */
    "CannotDowngrade": undefined;
    /**
     *Permanent or Temporary slot already assigned.
     */
    "SlotAlreadyAssigned": undefined;
    /**
     *Permanent or Temporary slot has not been assigned.
     */
    "SlotNotAssigned": undefined;
    /**
     *An ongoing lease already exists.
     */
    "OngoingLeaseExists": undefined;
    "MaxPermanentSlotsExceeded": undefined;
    "MaxTemporarySlotsExceeded": undefined;
}>;
export type I45or3o7sshpv4 = AnonymousEnum<{
    /**
     *Could not process incoming message because incoming messages are blocked.
     */
    "Blocked": undefined;
}>;
export type Iaaqq5jevtahm8 = AnonymousEnum<{
    /**
     *The operation cannot complete since some MBMs are ongoing.
     */
    "Ongoing": undefined;
}>;
export type I4vcvo9od6afmt = AnonymousEnum<{
    /**
     *The desired destination was unreachable, generally because there is a no way of routing
     *to it.
     */
    "Unreachable": undefined;
    /**
     *There was some other issue (i.e. not to do with routing) in sending the message.
     *Perhaps a lack of space for buffering the message.
     */
    "SendFailure": undefined;
    /**
     *The message execution fails the filter.
     */
    "Filtered": undefined;
    /**
     *The message's weight could not be determined.
     */
    "UnweighableMessage": undefined;
    /**
     *The destination `Location` provided cannot be inverted.
     */
    "DestinationNotInvertible": undefined;
    /**
     *The assets to be sent are empty.
     */
    "Empty": undefined;
    /**
     *Could not re-anchor the assets to declare the fees for the destination chain.
     */
    "CannotReanchor": undefined;
    /**
     *Too many assets have been attempted for transfer.
     */
    "TooManyAssets": undefined;
    /**
     *Origin is invalid for sending.
     */
    "InvalidOrigin": undefined;
    /**
     *The version of the `Versioned` value used is not able to be interpreted.
     */
    "BadVersion": undefined;
    /**
     *The given location could not be used (e.g. because it cannot be expressed in the
     *desired version of XCM).
     */
    "BadLocation": undefined;
    /**
     *The referenced subscription could not be found.
     */
    "NoSubscription": undefined;
    /**
     *The location is invalid since it already has a subscription from us.
     */
    "AlreadySubscribed": undefined;
    /**
     *Could not check-out the assets for teleportation to the destination chain.
     */
    "CannotCheckOutTeleport": undefined;
    /**
     *The owner does not own (all) of the asset that they wish to do the operation on.
     */
    "LowBalance": undefined;
    /**
     *The asset owner has too many locks on the asset.
     */
    "TooManyLocks": undefined;
    /**
     *The given account is not an identifiable sovereign account for any location.
     */
    "AccountNotSovereign": undefined;
    /**
     *The operation required fees to be paid which the initiator could not meet.
     */
    "FeesNotMet": undefined;
    /**
     *A remote lock with the corresponding data could not be found.
     */
    "LockNotFound": undefined;
    /**
     *The unlock operation cannot succeed because there are still consumers of the lock.
     */
    "InUse": undefined;
    /**
     *Invalid asset, reserve chain could not be determined for it.
     */
    "InvalidAssetUnknownReserve": undefined;
    /**
     *Invalid asset, do not support remote asset reserves with different fees reserves.
     */
    "InvalidAssetUnsupportedReserve": undefined;
    /**
     *Too many assets with different reserve locations have been attempted for transfer.
     */
    "TooManyReserves": undefined;
    /**
     *Local XCM execution incomplete.
     */
    "LocalExecutionIncomplete": undefined;
    /**
     *Too many locations authorized to alias origin.
     */
    "TooManyAuthorizedAliases": undefined;
    /**
     *Expiry block number is in the past.
     */
    "ExpiresInPast": undefined;
    /**
     *The alias to remove authorization for was not found.
     */
    "AliasNotFound": undefined;
    /**
     *Local XCM execution incomplete with the actual XCM error and the index of the
     *instruction that caused the error.
     */
    "LocalExecutionIncompleteWithError": Anonymize<I5r8t4iaend96p>;
}>;
export type I5r8t4iaend96p = {
    "index": number;
    "error": Anonymize<Ieb33ohan6vr49>;
};
export type Ieb33ohan6vr49 = AnonymousEnum<{
    "Overflow": undefined;
    "Unimplemented": undefined;
    "UntrustedReserveLocation": undefined;
    "UntrustedTeleportLocation": undefined;
    "LocationFull": undefined;
    "LocationNotInvertible": undefined;
    "BadOrigin": undefined;
    "InvalidLocation": undefined;
    "AssetNotFound": undefined;
    "FailedToTransactAsset": undefined;
    "NotWithdrawable": undefined;
    "LocationCannotHold": undefined;
    "ExceedsMaxMessageSize": undefined;
    "DestinationUnsupported": undefined;
    "Transport": undefined;
    "Unroutable": undefined;
    "UnknownClaim": undefined;
    "FailedToDecode": undefined;
    "MaxWeightInvalid": undefined;
    "NotHoldingFees": undefined;
    "TooExpensive": undefined;
    "Trap": undefined;
    "ExpectationFalse": undefined;
    "PalletNotFound": undefined;
    "NameMismatch": undefined;
    "VersionIncompatible": undefined;
    "HoldingWouldOverflow": undefined;
    "ExportError": undefined;
    "ReanchorFailed": undefined;
    "NoDeal": undefined;
    "FeesNotMet": undefined;
    "LockError": undefined;
    "NoPermission": undefined;
    "Unanchored": undefined;
    "NotDepositable": undefined;
    "TooManyAssets": undefined;
    "UnhandledXcmVersion": undefined;
    "WeightLimitReached": undefined;
    "Barrier": undefined;
    "WeightNotComputable": undefined;
    "ExceedsStackLimit": undefined;
}>;
export type I8436figeoo3ti = AnonymousEnum<{
    /**
     *Invalid proof (e.g. signature).
     */
    "BadProof": undefined;
    /**
     *The meta transaction is not yet valid (e.g. nonce too high).
     */
    "Future": undefined;
    /**
     *The meta transaction is outdated (e.g. nonce too low).
     */
    "Stale": undefined;
    /**
     *The meta transactions's birth block is ancient.
     */
    "AncientBirthBlock": undefined;
    /**
     *The transaction extension did not authorize any origin.
     */
    "UnknownOrigin": undefined;
    /**
     *The meta transaction is invalid.
     */
    "Invalid": undefined;
}>;
export type Iflve6qd33ah68 = AnonymousEnum<{
    /**
     *A key ownership proof provided as part of an equivocation report is invalid.
     */
    "InvalidKeyOwnershipProof": undefined;
    /**
     *A double voting proof provided as part of an equivocation report is invalid.
     */
    "InvalidDoubleVotingProof": undefined;
    /**
     *A fork voting proof provided as part of an equivocation report is invalid.
     */
    "InvalidForkVotingProof": undefined;
    /**
     *A future block voting proof provided as part of an equivocation report is invalid.
     */
    "InvalidFutureBlockVotingProof": undefined;
    /**
     *The session of the equivocation proof is invalid
     */
    "InvalidEquivocationProofSession": undefined;
    /**
     *A given equivocation report is valid but already previously reported.
     */
    "DuplicateOffenceReport": undefined;
    /**
     *Submitted configuration is invalid.
     */
    "InvalidConfiguration": undefined;
}>;
export type Idh4cj79bvroj8 = AnonymousEnum<{
    "InvalidStateRoot": undefined;
    "IncompleteDatabase": undefined;
    "ValueAtIncompleteKey": undefined;
    "DecoderError": undefined;
    "InvalidHash": undefined;
    "DuplicateKey": undefined;
    "ExtraneousNode": undefined;
    "ExtraneousValue": undefined;
    "ExtraneousHashReference": undefined;
    "InvalidChildReference": undefined;
    "ValueMismatch": undefined;
    "IncompleteProof": undefined;
    "RootMismatch": undefined;
    "DecodeError": undefined;
}>;
export type I9ol0kobt15obh = {
    "code_hash": FixedSizeBinary<32>;
    "error": Anonymize<Icrp2r0j3sbgko>;
};
export type I2pejk6do5vg4t = AnonymousEnum<{
    /**
     *A account index was assigned.
     */
    "IndexAssigned": Anonymize<Ia1u3jll6a06ae>;
    /**
     *A account index has been freed up (unassigned).
     */
    "IndexFreed": Anonymize<I666bl2fqjkejo>;
    /**
     *A account index has been frozen to its current account ID.
     */
    "IndexFrozen": Anonymize<Ia1u3jll6a06ae>;
    /**
     *A deposit to reserve an index has been poked/reconsidered.
     */
    "DepositPoked": Anonymize<Ic9g5lvl9iddc5>;
}>;
export type Ic9g5lvl9iddc5 = {
    "who": SS58String;
    "index": number;
    "old_deposit": bigint;
    "new_deposit": bigint;
};
export type I8n4qjnlkvth8n = AnonymousEnum<{
    /**
     *The era payout has been set; the first balance is the validator-payout; the second is
     *the remainder from the maximum amount of reward.
     */
    "EraPaid": Anonymize<I1au3fq4n84nv3>;
    /**
     *The nominator has been rewarded by this amount to this destination.
     */
    "Rewarded": Anonymize<Iejaj7m7qka9tr>;
    /**
     *A staker (validator or nominator) has been slashed by the given amount.
     */
    "Slashed": Anonymize<Idnak900lt5lm8>;
    /**
     *A slash for the given validator, for the given percentage of their stake, at the given
     *era as been reported.
     */
    "SlashReported": Anonymize<I27n7lbd66730p>;
    /**
     *An old slashing report from a prior era was discarded because it could
     *not be processed.
     */
    "OldSlashingReportDiscarded": Anonymize<I2hq50pu2kdjpo>;
    /**
     *A new set of stakers was elected.
     */
    "StakersElected": undefined;
    /**
     *An account has bonded this amount. \[stash, amount\]
     *
     *NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
     *it will not be emitted for staking rewards when they are added to stake.
     */
    "Bonded": Anonymize<Ifk8eme5o7mukf>;
    /**
     *An account has unbonded this amount.
     */
    "Unbonded": Anonymize<Ifk8eme5o7mukf>;
    /**
     *An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
     *from the unlocking queue.
     */
    "Withdrawn": Anonymize<Ifk8eme5o7mukf>;
    /**
     *A nominator has been kicked from a validator.
     */
    "Kicked": Anonymize<Iau4cgm6ih61cf>;
    /**
     *The election failed. No new era is planned.
     */
    "StakingElectionFailed": undefined;
    /**
     *An account has stopped participating as either a validator or nominator.
     */
    "Chilled": Anonymize<Idl3umm12u5pa>;
    /**
     *A Page of stakers rewards are getting paid. `next` is `None` if all pages are claimed.
     */
    "PayoutStarted": Anonymize<Ith132hqfb27q>;
    /**
     *A validator has set their preferences.
     */
    "ValidatorPrefsSet": Anonymize<Ic19as7nbst738>;
    /**
     *Voters size limit reached.
     */
    "SnapshotVotersSizeExceeded": Anonymize<I54umskavgc9du>;
    /**
     *Targets size limit reached.
     */
    "SnapshotTargetsSizeExceeded": Anonymize<I54umskavgc9du>;
    /**
     *A new force era mode was set.
     */
    "ForceEra": Anonymize<I2ip7o9e2tc5sf>;
    /**
     *Report of a controller batch deprecation.
     */
    "ControllerBatchDeprecated": Anonymize<I5egvk6hadac5h>;
    /**
     *Staking balance migrated from locks to holds, with any balance that could not be held
     *is force withdrawn.
     */
    "CurrencyMigrated": Anonymize<I1td4upnup9gqv>;
}>;
export type Ith132hqfb27q = {
    "era_index": number;
    "validator_stash": SS58String;
    "page": number;
    "next"?: Anonymize<I4arjljr6dpflb>;
};
export type I1td4upnup9gqv = {
    "stash": SS58String;
    "force_withdraw": bigint;
};
export type I3fs99kjn361i1 = AnonymousEnum<{
    /**
     *The merkle root of the validators of the said session were stored
     */
    "RootStored": Anonymize<I666bl2fqjkejo>;
    /**
     *The merkle roots of up to this session index were pruned
     */
    "RootsPruned": Anonymize<I85icj2qbjeqbe>;
}>;
export type I6ue0ck5fc3u44 = AnonymousEnum<{
    /**
     *New session has happened. Note that the argument is the session index, not the
     *block number as the type might suggest.
     */
    "NewSession": Anonymize<I2hq50pu2kdjpo>;
    /**
     *The `NewSession` event in the current block also implies a new validator set to be
     *queued.
     */
    "NewQueued": undefined;
    /**
     *Validator has been disabled.
     */
    "ValidatorDisabled": Anonymize<I9acqruh7322g2>;
    /**
     *Validator has been re-enabled.
     */
    "ValidatorReenabled": Anonymize<I9acqruh7322g2>;
}>;
export type I9acqruh7322g2 = {
    "validator": SS58String;
};
export type I2m3ghucjkd8v0 = AnonymousEnum<{
    /**
     *Batch of dispatches did not complete fully. Index of first failing dispatch given, as
     *well as the error.
     */
    "BatchInterrupted": Anonymize<I513i4g3u308ia>;
    /**
     *Batch of dispatches completed fully with no error.
     */
    "BatchCompleted": undefined;
    /**
     *Batch of dispatches completed but has errors.
     */
    "BatchCompletedWithErrors": undefined;
    /**
     *A single item within a Batch of dispatches has completed with no error.
     */
    "ItemCompleted": undefined;
    /**
     *A single item within a Batch of dispatches has completed with error.
     */
    "ItemFailed": Anonymize<I529op3ifr7ped>;
    /**
     *A call was dispatched.
     */
    "DispatchedAs": Anonymize<I6ak1c6bp7djtf>;
    /**
     *Main call was dispatched.
     */
    "IfElseMainSuccess": undefined;
    /**
     *The fallback call was dispatched.
     */
    "IfElseFallbackCalled": Anonymize<Ietea96bmm1cg2>;
}>;
export type I513i4g3u308ia = {
    "index": number;
    "error": Anonymize<Icrp2r0j3sbgko>;
};
export type I529op3ifr7ped = {
    "error": Anonymize<Icrp2r0j3sbgko>;
};
export type I6ak1c6bp7djtf = {
    "result": Anonymize<Ib8vqj3khtj6qe>;
};
export type Ib8vqj3khtj6qe = ResultPayload<undefined, Anonymize<Icrp2r0j3sbgko>>;
export type Ietea96bmm1cg2 = {
    "main_error": Anonymize<Icrp2r0j3sbgko>;
};
export type I2au2or9cskfoi = AnonymousEnum<{
    /**
     *A name was set or reset (which will remove all judgements).
     */
    "IdentitySet": Anonymize<I4cbvqmqadhrea>;
    /**
     *A name was cleared, and the given balance returned.
     */
    "IdentityCleared": Anonymize<Iep1lmt6q3s6r3>;
    /**
     *A name was removed and the given balance slashed.
     */
    "IdentityKilled": Anonymize<Iep1lmt6q3s6r3>;
    /**
     *A judgement was asked from a registrar.
     */
    "JudgementRequested": Anonymize<I1fac16213rie2>;
    /**
     *A judgement request was retracted.
     */
    "JudgementUnrequested": Anonymize<I1fac16213rie2>;
    /**
     *A judgement was given by a registrar.
     */
    "JudgementGiven": Anonymize<Ifjt77oc391o43>;
    /**
     *A registrar was added.
     */
    "RegistrarAdded": Anonymize<Itvt1jsipv0lc>;
    /**
     *A sub-identity was added to an identity and the deposit paid.
     */
    "SubIdentityAdded": Anonymize<Ick3mveut33f44>;
    /**
     *An account's sub-identities were set (in bulk).
     */
    "SubIdentitiesSet": Anonymize<I719lqkkbtikbl>;
    /**
     *A given sub-account's associated name was changed by its super-identity.
     */
    "SubIdentityRenamed": Anonymize<Ie4intrc3n8jfu>;
    /**
     *A sub-identity was removed from an identity and the deposit freed.
     */
    "SubIdentityRemoved": Anonymize<Ick3mveut33f44>;
    /**
     *A sub-identity was cleared, and the given deposit repatriated from the
     *main identity account to the sub-identity account.
     */
    "SubIdentityRevoked": Anonymize<Ick3mveut33f44>;
    /**
     *A username authority was added.
     */
    "AuthorityAdded": Anonymize<I2rg5btjrsqec0>;
    /**
     *A username authority was removed.
     */
    "AuthorityRemoved": Anonymize<I2rg5btjrsqec0>;
    /**
     *A username was set for `who`.
     */
    "UsernameSet": Anonymize<Ibdqerrooruuq9>;
    /**
     *A username was queued, but `who` must accept it prior to `expiration`.
     */
    "UsernameQueued": Anonymize<I8u2ba9jeiu6q0>;
    /**
     *A queued username passed its expiration without being claimed and was removed.
     */
    "PreapprovalExpired": Anonymize<I7ieadb293k6b4>;
    /**
     *A username was set as a primary and can be looked up from `who`.
     */
    "PrimaryUsernameSet": Anonymize<Ibdqerrooruuq9>;
    /**
     *A dangling username (as in, a username corresponding to an account that has removed its
     *identity) has been removed.
     */
    "DanglingUsernameRemoved": Anonymize<Ibdqerrooruuq9>;
    /**
     *A username has been unbound.
     */
    "UsernameUnbound": Anonymize<Ie5l999tf7t2te>;
    /**
     *A username has been removed.
     */
    "UsernameRemoved": Anonymize<Ie5l999tf7t2te>;
    /**
     *A username has been killed.
     */
    "UsernameKilled": Anonymize<Ie5l999tf7t2te>;
}>;
export type Iep1lmt6q3s6r3 = {
    "who": SS58String;
    "deposit": bigint;
};
export type I1fac16213rie2 = {
    "who": SS58String;
    "registrar_index": number;
};
export type Ifjt77oc391o43 = {
    "target": SS58String;
    "registrar_index": number;
};
export type Itvt1jsipv0lc = {
    "registrar_index": number;
};
export type Ick3mveut33f44 = {
    "sub": SS58String;
    "main": SS58String;
    "deposit": bigint;
};
export type I719lqkkbtikbl = {
    "main": SS58String;
    "number_of_subs": number;
    "new_deposit": bigint;
};
export type Ie4intrc3n8jfu = {
    "sub": SS58String;
    "main": SS58String;
};
export type I2rg5btjrsqec0 = {
    "authority": SS58String;
};
export type Ibdqerrooruuq9 = {
    "who": SS58String;
    "username": Binary;
};
export type I8u2ba9jeiu6q0 = {
    "who": SS58String;
    "username": Binary;
    "expiration": number;
};
export type I7ieadb293k6b4 = {
    "whose": SS58String;
};
export type Ie5l999tf7t2te = {
    "username": Binary;
};
export type I1h17pkrpub934 = AnonymousEnum<{
    /**
     *A recovery process has been set up for an account.
     */
    "RecoveryCreated": Anonymize<Icbccs0ug47ilf>;
    /**
     *A recovery process has been initiated for lost account by rescuer account.
     */
    "RecoveryInitiated": Anonymize<I9vkkue6cq74et>;
    /**
     *A recovery process for lost account by rescuer account has been vouched for by sender.
     */
    "RecoveryVouched": Anonymize<Ibu56t5h1q49i4>;
    /**
     *A recovery process for lost account by rescuer account has been closed.
     */
    "RecoveryClosed": Anonymize<I9vkkue6cq74et>;
    /**
     *Lost account has been successfully recovered by rescuer account.
     */
    "AccountRecovered": Anonymize<I9vkkue6cq74et>;
    /**
     *A recovery process has been removed for an account.
     */
    "RecoveryRemoved": Anonymize<I1dmtl5t34b9g>;
    /**
     *A deposit has been updated.
     */
    "DepositPoked": Anonymize<Ib81hb2akekpfs>;
}>;
export type Ib81hb2akekpfs = {
    "who": SS58String;
    "kind": Anonymize<If13u27dud0q6a>;
    "old_deposit": bigint;
    "new_deposit": bigint;
};
export type If13u27dud0q6a = AnonymousEnum<{
    "RecoveryConfig": undefined;
    "ActiveRecoveryFor": SS58String;
}>;
export type I7uu9ebnucfti5 = AnonymousEnum<{
    /**
     *A vesting schedule has been created.
     */
    "VestingCreated": Anonymize<Ih04jp733tqqa>;
    /**
     *The amount vested has been updated. This could indicate a change in funds available.
     *The balance given is the amount which is left unvested (and thus locked).
     */
    "VestingUpdated": Anonymize<Ievr89968437gm>;
    /**
     *An \[account\] has become fully vested.
     */
    "VestingCompleted": Anonymize<Icbccs0ug47ilf>;
}>;
export type Ih04jp733tqqa = {
    "account": SS58String;
    "schedule_index": number;
};
export type I444u8rj2mqv17 = AnonymousEnum<{
    /**
     *Scheduled some task.
     */
    "Scheduled": Anonymize<I5n4sebgkfr760>;
    /**
     *Canceled some task.
     */
    "Canceled": Anonymize<I5n4sebgkfr760>;
    /**
     *Dispatched some task.
     */
    "Dispatched": Anonymize<I5jmupb1kai3jj>;
    /**
     *Set a retry configuration for some task.
     */
    "RetrySet": Anonymize<Ia3c82eadg79bj>;
    /**
     *Cancel a retry configuration for some task.
     */
    "RetryCancelled": Anonymize<Ienusoeb625ftq>;
    /**
     *The call for the provided hash was not found so the task has been aborted.
     */
    "CallUnavailable": Anonymize<Ienusoeb625ftq>;
    /**
     *The given task was unable to be renewed since the agenda is full at that block.
     */
    "PeriodicFailed": Anonymize<Ienusoeb625ftq>;
    /**
     *The given task was unable to be retried since the agenda is full at that block or there
     *was not enough weight to reschedule it.
     */
    "RetryFailed": Anonymize<Ienusoeb625ftq>;
    /**
     *The given task can never be executed since it is overweight.
     */
    "PermanentlyOverweight": Anonymize<Ienusoeb625ftq>;
    /**
     *Agenda is incomplete from `when`.
     */
    "AgendaIncomplete": Anonymize<Ibtsa3docbr9el>;
}>;
export type I5jmupb1kai3jj = {
    "task": Anonymize<I9jd27rnpm8ttv>;
    "id"?: Anonymize<I4s6vifaf8k998>;
    "result": Anonymize<Ib8vqj3khtj6qe>;
};
export type I9r0mgi6ick4cs = AnonymousEnum<{
    /**
     *A sudo call just took place.
     */
    "Sudid": Anonymize<Idl66os3793p2c>;
    /**
     *The sudo key has been updated.
     */
    "KeyChanged": Anonymize<I5rtkmhm2dng4u>;
    /**
     *The key was permanently removed.
     */
    "KeyRemoved": undefined;
    /**
     *A [sudo_as](Pallet::sudo_as) call just took place.
     */
    "SudoAsDone": Anonymize<Idl66os3793p2c>;
}>;
export type Idl66os3793p2c = {
    /**
     *The result of the call made by the sudo user.
     */
    "sudo_result": Anonymize<Ib8vqj3khtj6qe>;
};
export type I6vqme2kguttup = AnonymousEnum<{
    /**
     *A proxy was executed correctly, with the given.
     */
    "ProxyExecuted": Anonymize<I6ak1c6bp7djtf>;
    /**
     *A pure account has been created by new proxy with given
     *disambiguation index and proxy type.
     */
    "PureCreated": Anonymize<Id55sh701bp4ra>;
    /**
     *A pure proxy was killed by its spawner.
     */
    "PureKilled": Anonymize<Ie5hfqfo83migv>;
    /**
     *An announcement was placed to make a call in the future.
     */
    "Announced": Anonymize<I2ur0oeqg495j8>;
    /**
     *A proxy was added.
     */
    "ProxyAdded": Anonymize<I9gonkpdfg3e5v>;
    /**
     *A proxy was removed.
     */
    "ProxyRemoved": Anonymize<I9gonkpdfg3e5v>;
    /**
     *A deposit stored for proxies or announcements was poked / updated.
     */
    "DepositPoked": Anonymize<I1bhd210c3phjj>;
}>;
export type Id55sh701bp4ra = {
    "pure": SS58String;
    "who": SS58String;
    "proxy_type": Anonymize<I4usd2cn59lcla>;
    "disambiguation_index": number;
};
export type I4usd2cn59lcla = AnonymousEnum<{
    "Any": undefined;
    "NonTransfer": undefined;
    "Governance": undefined;
    "Staking": undefined;
    "SudoBalances": undefined;
    "IdentityJudgement": undefined;
    "CancelProxy": undefined;
    "Auction": undefined;
    "NominationPools": undefined;
    "ParaRegistration": undefined;
}>;
export type Ie5hfqfo83migv = {
    "pure": SS58String;
    "spawner": SS58String;
    "proxy_type": Anonymize<I4usd2cn59lcla>;
    "disambiguation_index": number;
};
export type I9gonkpdfg3e5v = {
    "delegator": SS58String;
    "delegatee": SS58String;
    "proxy_type": Anonymize<I4usd2cn59lcla>;
    "delay": number;
};
export type I1bhd210c3phjj = {
    "who": SS58String;
    "kind": Anonymize<I8pd2vd03fs1qj>;
    "old_deposit": bigint;
    "new_deposit": bigint;
};
export type I8pd2vd03fs1qj = AnonymousEnum<{
    "Proxies": undefined;
    "Announcements": undefined;
}>;
export type I3kuqq8f8kn85j = AnonymousEnum<{
    /**
     *A new multisig operation has begun.
     */
    "NewMultisig": Anonymize<Iep27ialq4a7o7>;
    /**
     *A multisig operation has been approved by someone.
     */
    "MultisigApproval": Anonymize<Iasu5jvoqr43mv>;
    /**
     *A multisig operation has been executed.
     */
    "MultisigExecuted": Anonymize<I965kkmkm4dqqk>;
    /**
     *A multisig operation has been cancelled.
     */
    "MultisigCancelled": Anonymize<I5qolde99acmd1>;
    /**
     *The deposit for a multisig operation has been updated/poked.
     */
    "DepositPoked": Anonymize<I8gtde5abn1g9a>;
}>;
export type I965kkmkm4dqqk = {
    "approving": SS58String;
    "timepoint": Anonymize<Itvprrpb0nm3o>;
    "multisig": SS58String;
    "call_hash": FixedSizeBinary<32>;
    "result": Anonymize<Ib8vqj3khtj6qe>;
};
export type I8gtde5abn1g9a = {
    "who": SS58String;
    "call_hash": FixedSizeBinary<32>;
    "old_deposit": bigint;
    "new_deposit": bigint;
};
export type Id0dkgikq71n9h = AnonymousEnum<{
    /**
     *A pool has been created.
     */
    "Created": Anonymize<I1ti389kf8t6oi>;
    /**
     *A member has became bonded in a pool.
     */
    "Bonded": Anonymize<If4nnre373amul>;
    /**
     *A payout has been made to a member.
     */
    "PaidOut": Anonymize<I55kbor0ocqk6h>;
    /**
     *A member has unbonded from their pool.
     *
     *- `balance` is the corresponding balance of the number of points that has been
     *  requested to be unbonded (the argument of the `unbond` transaction) from the bonded
     *  pool.
     *- `points` is the number of points that are issued as a result of `balance` being
     *dissolved into the corresponding unbonding pool.
     *- `era` is the era in which the balance will be unbonded.
     *In the absence of slashing, these values will match. In the presence of slashing, the
     *number of points that are issued in the unbonding pool will be less than the amount
     *requested to be unbonded.
     */
    "Unbonded": Anonymize<Idsj9cg7j96kpc>;
    /**
     *A member has withdrawn from their pool.
     *
     *The given number of `points` have been dissolved in return of `balance`.
     *
     *Similar to `Unbonded` event, in the absence of slashing, the ratio of point to balance
     *will be 1.
     */
    "Withdrawn": Anonymize<Ido4u9drncfaml>;
    /**
     *A pool has been destroyed.
     */
    "Destroyed": Anonymize<I931cottvong90>;
    /**
     *The state of a pool has changed
     */
    "StateChanged": Anonymize<Ie8c7ctks8ur2p>;
    /**
     *A member has been removed from a pool.
     *
     *The removal can be voluntary (withdrawn all unbonded funds) or involuntary (kicked).
     *Any funds that are still delegated (i.e. dangling delegation) are released and are
     *represented by `released_balance`.
     */
    "MemberRemoved": Anonymize<I6c6fpqmnqijqd>;
    /**
     *The roles of a pool have been updated to the given new roles. Note that the depositor
     *can never change.
     */
    "RolesUpdated": Anonymize<I6mik29s5073td>;
    /**
     *The active balance of pool `pool_id` has been slashed to `balance`.
     */
    "PoolSlashed": Anonymize<I2m0sqmb75cnpb>;
    /**
     *The unbond pool at `era` of pool `pool_id` has been slashed to `balance`.
     */
    "UnbondingPoolSlashed": Anonymize<I49agc5b62mehu>;
    /**
     *A pool's commission setting has been changed.
     */
    "PoolCommissionUpdated": Anonymize<Iatq9jda4hq6pg>;
    /**
     *A pool's maximum commission setting has been changed.
     */
    "PoolMaxCommissionUpdated": Anonymize<I8cbluptqo8kbp>;
    /**
     *A pool's commission `change_rate` has been changed.
     */
    "PoolCommissionChangeRateUpdated": Anonymize<I81cc4plffa1dm>;
    /**
     *Pool commission claim permission has been updated.
     */
    "PoolCommissionClaimPermissionUpdated": Anonymize<I3ihan8icf0c5k>;
    /**
     *Pool commission has been claimed.
     */
    "PoolCommissionClaimed": Anonymize<I2g87evcjlgmqi>;
    /**
     *Topped up deficit in frozen ED of the reward pool.
     */
    "MinBalanceDeficitAdjusted": Anonymize<Ieg1oc56mamrl5>;
    /**
     *Claimed excess frozen ED of af the reward pool.
     */
    "MinBalanceExcessAdjusted": Anonymize<Ieg1oc56mamrl5>;
    /**
     *A pool member's claim permission has been updated.
     */
    "MemberClaimPermissionUpdated": Anonymize<I93ajn7brqs8df>;
    /**
     *A pool's metadata was updated.
     */
    "MetadataUpdated": Anonymize<Ib2q8vnsr19t9b>;
    /**
     *A pool's nominating account (or the pool's root account) has nominated a validator set
     *on behalf of the pool.
     */
    "PoolNominationMade": Anonymize<Ib2q8vnsr19t9b>;
    /**
     *The pool is chilled i.e. no longer nominating.
     */
    "PoolNominatorChilled": Anonymize<Ib2q8vnsr19t9b>;
    /**
     *Global parameters regulating nomination pools have been updated.
     */
    "GlobalParamsUpdated": Anonymize<If6q1q7op2gvqf>;
}>;
export type I6c6fpqmnqijqd = {
    "pool_id": number;
    "member": SS58String;
    "released_balance": bigint;
};
export type I93ajn7brqs8df = {
    "member": SS58String;
    "permission": NominationPoolsClaimPermission;
};
export type Ib2q8vnsr19t9b = {
    "pool_id": number;
    "caller": SS58String;
};
export type If6q1q7op2gvqf = {
    "min_join_bond": bigint;
    "min_create_bond": bigint;
    "max_pools"?: Anonymize<I4arjljr6dpflb>;
    "max_members"?: Anonymize<I4arjljr6dpflb>;
    "max_members_per_pool"?: Anonymize<I4arjljr6dpflb>;
    "global_max_commission"?: Anonymize<I4arjljr6dpflb>;
};
export type I1oda81joco4aj = AnonymousEnum<{
    /**
     *A staker was unstaked.
     */
    "Unstaked": Anonymize<If1bar61j9m2mv>;
    /**
     *A staker was slashed for requesting fast-unstake whilst being exposed.
     */
    "Slashed": Anonymize<Ifk8eme5o7mukf>;
    /**
     *A batch was partially checked for the given eras, but the process did not finish.
     */
    "BatchChecked": Anonymize<Ic0he9tlf9ll0u>;
    /**
     *A batch of a given size was terminated.
     *
     *This is always follows by a number of `Unstaked` or `Slashed` events, marking the end
     *of the batch. A new batch will be created upon next block.
     */
    "BatchFinished": Anonymize<I54umskavgc9du>;
    /**
     *An internal error happened. Operations will be paused now.
     */
    "InternalError": undefined;
}>;
export type If1bar61j9m2mv = {
    "stash": SS58String;
    "result": Anonymize<Ib8vqj3khtj6qe>;
};
export type I7tvgbf73o5td4 = AnonymousEnum<{
    /**
     *An account has delegated their vote to another account. \[who, target\]
     */
    "Delegated": Anonymize<I2na29tt2afp0j>;
    /**
     *An \[account\] has cancelled a previous delegation operation.
     */
    "Undelegated": SS58String;
    /**
     *An account has voted
     */
    "Voted": Anonymize<I9qfchhljqsjjl>;
    /**
     *A vote has been removed
     */
    "VoteRemoved": Anonymize<I9qfchhljqsjjl>;
    /**
     *The lockup period of a conviction vote expired, and the funds have been unlocked.
     */
    "VoteUnlocked": Anonymize<I7kij8p9kchdjo>;
}>;
export type I9qfchhljqsjjl = {
    "who": SS58String;
    "vote": ConvictionVotingVoteAccountVote;
};
export type I7kij8p9kchdjo = {
    "who": SS58String;
    "class": number;
};
export type Id788i4dlrmqf5 = AnonymousEnum<{
    "CallWhitelisted": Anonymize<I1adbcfi5uc62r>;
    "WhitelistedCallRemoved": Anonymize<I1adbcfi5uc62r>;
    "WhitelistedCallDispatched": Anonymize<I9q52ail4t02bm>;
}>;
export type I9q52ail4t02bm = {
    "call_hash": FixedSizeBinary<32>;
    "result": Anonymize<I52bohnq0qt2b0>;
};
export type I52bohnq0qt2b0 = ResultPayload<Anonymize<Ia1u1r3n74r13c>, Anonymize<I605qi7ffo5hj6>>;
export type I605qi7ffo5hj6 = {
    "post_info": Anonymize<Ia1u1r3n74r13c>;
    "error": Anonymize<Icrp2r0j3sbgko>;
};
export type Ia1b9fjuj0ob0b = AnonymousEnum<{
    /**
     *We have ended a spend period and will now allocate funds.
     */
    "Spending": Anonymize<I8iksqi3eani0a>;
    /**
     *Some funds have been allocated.
     */
    "Awarded": Anonymize<I16enopmju1p0q>;
    /**
     *Some of our funds have been burnt.
     */
    "Burnt": Anonymize<I43kq8qudg7pq9>;
    /**
     *Spending has finished; this is the amount that rolls over until next spend.
     */
    "Rollover": Anonymize<I76riseemre533>;
    /**
     *Some funds have been deposited.
     */
    "Deposit": Anonymize<Ie5v6njpckr05b>;
    /**
     *A new spend proposal has been approved.
     */
    "SpendApproved": Anonymize<I38bmcrmh852rk>;
    /**
     *The inactive funds of the pallet have been updated.
     */
    "UpdatedInactive": Anonymize<I4hcillge8de5f>;
    /**
     *A new asset spend proposal has been approved.
     */
    "AssetSpendApproved": Anonymize<I2cftk5tgrglaa>;
    /**
     *An approved spend was voided.
     */
    "AssetSpendVoided": Anonymize<I666bl2fqjkejo>;
    /**
     *A payment happened.
     */
    "Paid": Anonymize<Iek7v4hrgnq6iv>;
    /**
     *A payment failed and can be retried.
     */
    "PaymentFailed": Anonymize<Iek7v4hrgnq6iv>;
    /**
     *A spend was processed and removed from the storage. It might have been successfully
     *paid or it may have expired.
     */
    "SpendProcessed": Anonymize<I666bl2fqjkejo>;
}>;
export type I2cftk5tgrglaa = {
    "index": number;
    "asset_kind": Anonymize<I2q3ri6itcjj5u>;
    "amount": bigint;
    "beneficiary": XcmVersionedLocation;
    "valid_from": number;
    "expire_at": number;
};
export type I2q3ri6itcjj5u = AnonymousEnum<{
    "V3": Anonymize<Ieiirnju6cff3l>;
    "V4": Anonymize<Ieqft092b9kkr2>;
    "V5": Anonymize<I4rqenbj90c4ms>;
}>;
export type I4rqenbj90c4ms = {
    "location": Anonymize<If9iqq7i64mur8>;
    "asset_id": Anonymize<If9iqq7i64mur8>;
};
export type If9iqq7i64mur8 = {
    "parents": number;
    "interior": XcmV5Junctions;
};
export type XcmV5Junctions = Enum<{
    "Here": undefined;
    "X1": XcmV5Junction;
    "X2": Anonymize<I279b0st0go8pj>;
    "X3": Anonymize<I8t3509dftknlg>;
    "X4": Anonymize<Iegifjnm8bgl6n>;
    "X5": Anonymize<Ic40rerdemoe3f>;
    "X6": Anonymize<Ieehae2qh5qhrv>;
    "X7": Anonymize<I1pmgeuqv3eom3>;
    "X8": Anonymize<I32k80jnq35fij>;
}>;
export declare const XcmV5Junctions: GetEnum<XcmV5Junctions>;
export type XcmV5Junction = Enum<{
    "Parachain": number;
    "AccountId32": Anonymize<I303u17k2gp1si>;
    "AccountIndex64": Anonymize<Iejvsa7fje7ib3>;
    "AccountKey20": Anonymize<Icmn90ot6tcot8>;
    "PalletInstance": number;
    "GeneralIndex": bigint;
    "GeneralKey": Anonymize<I15lht6t53odo4>;
    "OnlyChild": undefined;
    "Plurality": Anonymize<I518fbtnclg1oc>;
    "GlobalConsensus": XcmV5NetworkId;
}>;
export declare const XcmV5Junction: GetEnum<XcmV5Junction>;
export type I303u17k2gp1si = {
    "network"?: Anonymize<I97pd2rst02a7r>;
    "id": FixedSizeBinary<32>;
};
export type I97pd2rst02a7r = (XcmV5NetworkId) | undefined;
export type XcmV5NetworkId = Enum<{
    "ByGenesis": FixedSizeBinary<32>;
    "ByFork": Anonymize<I15vf5oinmcgps>;
    "Polkadot": undefined;
    "Kusama": undefined;
    "Ethereum": Anonymize<I623eo8t3jrbeo>;
    "BitcoinCore": undefined;
    "BitcoinCash": undefined;
    "PolkadotBulletin": undefined;
}>;
export declare const XcmV5NetworkId: GetEnum<XcmV5NetworkId>;
export type Iejvsa7fje7ib3 = {
    "network"?: Anonymize<I97pd2rst02a7r>;
    "index": bigint;
};
export type Icmn90ot6tcot8 = {
    "network"?: Anonymize<I97pd2rst02a7r>;
    "key": FixedSizeBinary<20>;
};
export type I279b0st0go8pj = FixedSizeArray<2, XcmV5Junction>;
export type I8t3509dftknlg = FixedSizeArray<3, XcmV5Junction>;
export type Iegifjnm8bgl6n = FixedSizeArray<4, XcmV5Junction>;
export type Ic40rerdemoe3f = FixedSizeArray<5, XcmV5Junction>;
export type Ieehae2qh5qhrv = FixedSizeArray<6, XcmV5Junction>;
export type I1pmgeuqv3eom3 = FixedSizeArray<7, XcmV5Junction>;
export type I32k80jnq35fij = FixedSizeArray<8, XcmV5Junction>;
export type XcmVersionedLocation = Enum<{
    "V3": Anonymize<I4c0s5cioidn76>;
    "V4": Anonymize<I4c0s5cioidn76>;
    "V5": Anonymize<If9iqq7i64mur8>;
}>;
export declare const XcmVersionedLocation: GetEnum<XcmVersionedLocation>;
export type I1nq1se98idofq = AnonymousEnum<{
    /**
     *Funds delegated by a delegator.
     */
    "Delegated": Anonymize<Id2aanom2jncf1>;
    /**
     *Funds released to a delegator.
     */
    "Released": Anonymize<Id2aanom2jncf1>;
    /**
     *Funds slashed from a delegator.
     */
    "Slashed": Anonymize<Id2aanom2jncf1>;
    /**
     *Unclaimed delegation funds migrated to delegator.
     */
    "MigratedDelegation": Anonymize<Id2aanom2jncf1>;
}>;
export type Id2aanom2jncf1 = {
    "agent": SS58String;
    "delegator": SS58String;
    "amount": bigint;
};
export type If7iaaqrjurpqf = AnonymousEnum<{
    /**
     *A candidate was backed. `[candidate, head_data]`
     */
    "CandidateBacked": Anonymize<I4s0gvfhejmdp2>;
    /**
     *A candidate was included. `[candidate, head_data]`
     */
    "CandidateIncluded": Anonymize<I4s0gvfhejmdp2>;
    /**
     *A candidate timed out. `[candidate, head_data]`
     */
    "CandidateTimedOut": Anonymize<I9njsgm2qsgnil>;
    /**
     *Some upward messages have been received and will be processed.
     */
    "UpwardMessagesReceived": Anonymize<Ic8i89mfkmn3n7>;
}>;
export type I4s0gvfhejmdp2 = [Anonymize<Iceqied2dhrjit>, Binary, number, number];
export type Iceqied2dhrjit = {
    "descriptor": Anonymize<Ibnq2mkuf1plno>;
    "commitments_hash": FixedSizeBinary<32>;
};
export type Ibnq2mkuf1plno = {
    "para_id": number;
    "relay_parent": FixedSizeBinary<32>;
    "version": number;
    "core_index": number;
    "session_index": number;
    "reserved1": FixedSizeBinary<25>;
    "persisted_validation_data_hash": FixedSizeBinary<32>;
    "pov_hash": FixedSizeBinary<32>;
    "erasure_root": FixedSizeBinary<32>;
    "reserved2": FixedSizeBinary<64>;
    "para_head": FixedSizeBinary<32>;
    "validation_code_hash": FixedSizeBinary<32>;
};
export type I9njsgm2qsgnil = [Anonymize<Iceqied2dhrjit>, Binary, number];
export type Ifbkifeb2totq0 = AnonymousEnum<{
    /**
     *Current code has been updated for a Para. `para_id`
     */
    "CurrentCodeUpdated": number;
    /**
     *Current head has been updated for a Para. `para_id`
     */
    "CurrentHeadUpdated": number;
    /**
     *A code upgrade has been scheduled for a Para. `para_id`
     */
    "CodeUpgradeScheduled": number;
    /**
     *A new head has been noted for a Para. `para_id`
     */
    "NewHeadNoted": number;
    /**
     *A para has been queued to execute pending actions. `para_id`
     */
    "ActionQueued": Anonymize<I9jd27rnpm8ttv>;
    /**
     *The given para either initiated or subscribed to a PVF check for the given validation
     *code. `code_hash` `para_id`
     */
    "PvfCheckStarted": Anonymize<I4pact7n2e9a0i>;
    /**
     *The given validation code was accepted by the PVF pre-checking vote.
     *`code_hash` `para_id`
     */
    "PvfCheckAccepted": Anonymize<I4pact7n2e9a0i>;
    /**
     *The given validation code was rejected by the PVF pre-checking vote.
     *`code_hash` `para_id`
     */
    "PvfCheckRejected": Anonymize<I4pact7n2e9a0i>;
    /**
     *The upgrade cooldown was removed.
     */
    "UpgradeCooldownRemoved": Anonymize<I37r4bdai8o9mp>;
    /**
     *A new code hash has been authorized for a Para.
     */
    "CodeAuthorized": Anonymize<I4iqn2mh49tci5>;
}>;
export type I4iqn2mh49tci5 = {
    /**
     *Para
     */
    "para_id": number;
    /**
     *Authorized code hash.
     */
    "code_hash": FixedSizeBinary<32>;
    /**
     *Block at which authorization expires and will be removed.
     */
    "expire_at": number;
};
export type I8vt07l5vp6sb8 = AnonymousEnum<{
    /**
     *An order was placed at some spot price amount by orderer ordered_by
     */
    "OnDemandOrderPlaced": Anonymize<I82n7gg49bvucn>;
    /**
     *The value of the spot price has likely changed
     */
    "SpotPriceSet": Anonymize<I58qkru548f7dl>;
    /**
     *An account was given credits.
     */
    "AccountCredited": Anonymize<Id5fm4p8lj5qgi>;
}>;
export type I687cmlomantj7 = AnonymousEnum<{
    /**
     *Create a new crowdloaning campaign.
     */
    "Created": Anonymize<I37r4bdai8o9mp>;
    /**
     *Contributed to a crowd sale.
     */
    "Contributed": Anonymize<I8ve4g3egaln6a>;
    /**
     *Withdrew full balance of a contributor.
     */
    "Withdrew": Anonymize<I8ve4g3egaln6a>;
    /**
     *The loans in a fund have been partially dissolved, i.e. there are some left
     *over child keys that still need to be killed.
     */
    "PartiallyRefunded": Anonymize<I37r4bdai8o9mp>;
    /**
     *All loans in a fund have been refunded.
     */
    "AllRefunded": Anonymize<I37r4bdai8o9mp>;
    /**
     *Fund is dissolved.
     */
    "Dissolved": Anonymize<I37r4bdai8o9mp>;
    /**
     *The result of trying to submit a new bid to the Slots pallet.
     */
    "HandleBidResult": Anonymize<I524tcsd6dpr31>;
    /**
     *The configuration to a crowdloan has been edited.
     */
    "Edited": Anonymize<I37r4bdai8o9mp>;
    /**
     *A memo has been updated.
     */
    "MemoUpdated": Anonymize<If4hvqaeoqq5us>;
    /**
     *A parachain has been moved to `NewRaise`
     */
    "AddedToNewRaise": Anonymize<I37r4bdai8o9mp>;
}>;
export type I524tcsd6dpr31 = {
    "para_id": number;
    "result": Anonymize<Ib8vqj3khtj6qe>;
};
export type PolkadotRuntimeCommonAssignedSlotsEvent = Enum<{
    /**
     *A parachain was assigned a permanent parachain slot
     */
    "PermanentSlotAssigned": number;
    /**
     *A parachain was assigned a temporary parachain slot
     */
    "TemporarySlotAssigned": number;
    /**
     *The maximum number of permanent slots has been changed
     */
    "MaxPermanentSlotsChanged": Anonymize<I9d5h5irbki7mm>;
    /**
     *The maximum number of temporary slots has been changed
     */
    "MaxTemporarySlotsChanged": Anonymize<I9d5h5irbki7mm>;
}>;
export declare const PolkadotRuntimeCommonAssignedSlotsEvent: GetEnum<PolkadotRuntimeCommonAssignedSlotsEvent>;
export type I9d5h5irbki7mm = {
    "slots": number;
};
export type If5dgssg1nqq8m = AnonymousEnum<{
    /**
     *A new validator set has been received.
     */
    "ValidatorSetReceived": Anonymize<Ia9t7uh39caaer>;
    /**
     *We could not merge, and therefore dropped a buffered message.
     *
     *Note that this event is more resembling an error, but we use an event because in this
     *pallet we need to mutate storage upon some failures.
     */
    "CouldNotMergeAndDropped": undefined;
    /**
     *The validator set received is way too small, as per
     *[`Config::MinimumValidatorSetSize`].
     */
    "SetTooSmallAndDropped": undefined;
    /**
     *Something occurred that should never happen under normal operation. Logged as an event
     *for fail-safe observability.
     */
    "Unexpected": Anonymize<I8dnqf005919hm>;
}>;
export type Ia9t7uh39caaer = {
    "id": number;
    "new_validator_set_count": number;
    "prune_up_to"?: Anonymize<I4arjljr6dpflb>;
    "leftover": boolean;
};
export type I8dnqf005919hm = AnonymousEnum<{
    "ReceivedValidatorSetWhilePassive": undefined;
    "UnexpectedModeTransition": undefined;
}>;
export type I94co7vj7h6bo = AnonymousEnum<{
    /**
     *A Runtime upgrade started.
     *
     *Its end is indicated by `UpgradeCompleted` or `UpgradeFailed`.
     */
    "UpgradeStarted": Anonymize<If1co0pilmi7oq>;
    /**
     *The current runtime upgrade completed.
     *
     *This implies that all of its migrations completed successfully as well.
     */
    "UpgradeCompleted": undefined;
    /**
     *Runtime upgrade failed.
     *
     *This is very bad and will require governance intervention.
     */
    "UpgradeFailed": undefined;
    /**
     *A migration was skipped since it was already executed in the past.
     */
    "MigrationSkipped": Anonymize<I666bl2fqjkejo>;
    /**
     *A migration progressed.
     */
    "MigrationAdvanced": Anonymize<Iae74gjak1qibn>;
    /**
     *A Migration completed.
     */
    "MigrationCompleted": Anonymize<Iae74gjak1qibn>;
    /**
     *A Migration failed.
     *
     *This implies that the whole upgrade failed and governance intervention is required.
     */
    "MigrationFailed": Anonymize<Iae74gjak1qibn>;
    /**
     *The set of historical migrations has been cleared.
     */
    "HistoricCleared": Anonymize<I3escdojpj0551>;
}>;
export type If1co0pilmi7oq = {
    /**
     *The number of migrations that this upgrade contains.
     *
     *This can be used to design a progress indicator in combination with counting the
     *`MigrationCompleted` and `MigrationSkipped` events.
     */
    "migrations": number;
};
export type Iae74gjak1qibn = {
    /**
     *The index of the migration within the [`Config::Migrations`] list.
     */
    "index": number;
    /**
     *The number of blocks that this migration took so far.
     */
    "took": number;
};
export type I3escdojpj0551 = {
    /**
     *Should be passed to `clear_historic` in a successive call.
     */
    "next_cursor"?: Anonymize<Iabpgqcjikia83>;
};
export type If95hivmqmkiku = AnonymousEnum<{
    /**
     *Execution of an XCM message was attempted.
     */
    "Attempted": Anonymize<I61d51nv4cou88>;
    /**
     *An XCM message was sent.
     */
    "Sent": Anonymize<If8u5kl4h8070m>;
    /**
     *An XCM message failed to send.
     */
    "SendFailed": Anonymize<Ibmuil6p3vl83l>;
    /**
     *An XCM message failed to process.
     */
    "ProcessXcmError": Anonymize<I7lul91g50ae87>;
    /**
     *Query response received which does not match a registered query. This may be because a
     *matching query was never registered, it may be because it is a duplicate response, or
     *because the query timed out.
     */
    "UnexpectedResponse": Anonymize<Icl7nl1rfeog3i>;
    /**
     *Query response has been received and is ready for taking with `take_response`. There is
     *no registered notification call.
     */
    "ResponseReady": Anonymize<Iasr6pj6shs0fl>;
    /**
     *Query response has been received and query is removed. The registered notification has
     *been dispatched and executed successfully.
     */
    "Notified": Anonymize<I2uqmls7kcdnii>;
    /**
     *Query response has been received and query is removed. The registered notification
     *could not be dispatched because the dispatch weight is greater than the maximum weight
     *originally budgeted by this runtime for the query result.
     */
    "NotifyOverweight": Anonymize<Idg69klialbkb8>;
    /**
     *Query response has been received and query is removed. There was a general error with
     *dispatching the notification call.
     */
    "NotifyDispatchError": Anonymize<I2uqmls7kcdnii>;
    /**
     *Query response has been received and query is removed. The dispatch was unable to be
     *decoded into a `Call`; this might be due to dispatch function having a signature which
     *is not `(origin, QueryId, Response)`.
     */
    "NotifyDecodeFailed": Anonymize<I2uqmls7kcdnii>;
    /**
     *Expected query response has been received but the origin location of the response does
     *not match that expected. The query remains registered for a later, valid, response to
     *be received and acted upon.
     */
    "InvalidResponder": Anonymize<I7r6b7145022pp>;
    /**
     *Expected query response has been received but the expected origin location placed in
     *storage by this runtime previously cannot be decoded. The query remains registered.
     *
     *This is unexpected (since a location placed in storage in a previously executing
     *runtime should be readable prior to query timeout) and dangerous since the possibly
     *valid response will be dropped. Manual governance intervention is probably going to be
     *needed.
     */
    "InvalidResponderVersion": Anonymize<Icl7nl1rfeog3i>;
    /**
     *Received query response has been read and removed.
     */
    "ResponseTaken": Anonymize<I30pg328m00nr3>;
    /**
     *Some assets have been placed in an asset trap.
     */
    "AssetsTrapped": Anonymize<Icmrn7bogp28cs>;
    /**
     *An XCM version change notification message has been attempted to be sent.
     *
     *The cost of sending it (borne by the chain) is included.
     */
    "VersionChangeNotified": Anonymize<I7m9b5plj4h5ot>;
    /**
     *The supported version of a location has been changed. This might be through an
     *automatic notification or a manual intervention.
     */
    "SupportedVersionChanged": Anonymize<I9kt8c221c83ln>;
    /**
     *A given location which had a version change subscription was dropped owing to an error
     *sending the notification to it.
     */
    "NotifyTargetSendFail": Anonymize<I9onhk772nfs4f>;
    /**
     *A given location which had a version change subscription was dropped owing to an error
     *migrating the location to our new XCM format.
     */
    "NotifyTargetMigrationFail": Anonymize<I3l6bnksrmt56r>;
    /**
     *Expected query response has been received but the expected querier location placed in
     *storage by this runtime previously cannot be decoded. The query remains registered.
     *
     *This is unexpected (since a location placed in storage in a previously executing
     *runtime should be readable prior to query timeout) and dangerous since the possibly
     *valid response will be dropped. Manual governance intervention is probably going to be
     *needed.
     */
    "InvalidQuerierVersion": Anonymize<Icl7nl1rfeog3i>;
    /**
     *Expected query response has been received but the querier location of the response does
     *not match the expected. The query remains registered for a later, valid, response to
     *be received and acted upon.
     */
    "InvalidQuerier": Anonymize<Idh09k0l2pmdcg>;
    /**
     *A remote has requested XCM version change notification from us and we have honored it.
     *A version information message is sent to them and its cost is included.
     */
    "VersionNotifyStarted": Anonymize<I7uoiphbm0tj4r>;
    /**
     *We have requested that a remote chain send us XCM version change notifications.
     */
    "VersionNotifyRequested": Anonymize<I7uoiphbm0tj4r>;
    /**
     *We have requested that a remote chain stops sending us XCM version change
     *notifications.
     */
    "VersionNotifyUnrequested": Anonymize<I7uoiphbm0tj4r>;
    /**
     *Fees were paid from a location for an operation (often for using `SendXcm`).
     */
    "FeesPaid": Anonymize<I512p1n7qt24l8>;
    /**
     *Some assets have been claimed from an asset trap
     */
    "AssetsClaimed": Anonymize<Icmrn7bogp28cs>;
    /**
     *A XCM version migration finished.
     */
    "VersionMigrationFinished": Anonymize<I6s1nbislhk619>;
    /**
     *An `aliaser` location was authorized by `target` to alias it, authorization valid until
     *`expiry` block number.
     */
    "AliasAuthorized": Anonymize<I3gghqnh2mj0is>;
    /**
     *`target` removed alias authorization for `aliaser`.
     */
    "AliasAuthorizationRemoved": Anonymize<I6iv852roh6t3h>;
    /**
     *`target` removed all alias authorizations.
     */
    "AliasesAuthorizationsRemoved": Anonymize<I9oc2o6itbiopq>;
}>;
export type I61d51nv4cou88 = {
    "outcome": Anonymize<Ieqhmksji3pmv5>;
};
export type Ieqhmksji3pmv5 = AnonymousEnum<{
    "Complete": Anonymize<I30iff2d192eu7>;
    "Incomplete": Anonymize<I2eg8n0l1c94a1>;
    "Error": Anonymize<Ieiju48dn66cuh>;
}>;
export type I2eg8n0l1c94a1 = {
    "used": Anonymize<I4q39t5hn830vp>;
    "error": Anonymize<Ieiju48dn66cuh>;
};
export type Ieiju48dn66cuh = {
    "index": number;
    "error": Anonymize<Id56rgs0bdb7gl>;
};
export type Id56rgs0bdb7gl = AnonymousEnum<{
    "Overflow": undefined;
    "Unimplemented": undefined;
    "UntrustedReserveLocation": undefined;
    "UntrustedTeleportLocation": undefined;
    "LocationFull": undefined;
    "LocationNotInvertible": undefined;
    "BadOrigin": undefined;
    "InvalidLocation": undefined;
    "AssetNotFound": undefined;
    "FailedToTransactAsset": undefined;
    "NotWithdrawable": undefined;
    "LocationCannotHold": undefined;
    "ExceedsMaxMessageSize": undefined;
    "DestinationUnsupported": undefined;
    "Transport": undefined;
    "Unroutable": undefined;
    "UnknownClaim": undefined;
    "FailedToDecode": undefined;
    "MaxWeightInvalid": undefined;
    "NotHoldingFees": undefined;
    "TooExpensive": undefined;
    "Trap": bigint;
    "ExpectationFalse": undefined;
    "PalletNotFound": undefined;
    "NameMismatch": undefined;
    "VersionIncompatible": undefined;
    "HoldingWouldOverflow": undefined;
    "ExportError": undefined;
    "ReanchorFailed": undefined;
    "NoDeal": undefined;
    "FeesNotMet": undefined;
    "LockError": undefined;
    "NoPermission": undefined;
    "Unanchored": undefined;
    "NotDepositable": undefined;
    "TooManyAssets": undefined;
    "UnhandledXcmVersion": undefined;
    "WeightLimitReached": Anonymize<I4q39t5hn830vp>;
    "Barrier": undefined;
    "WeightNotComputable": undefined;
    "ExceedsStackLimit": undefined;
}>;
export type If8u5kl4h8070m = {
    "origin": Anonymize<If9iqq7i64mur8>;
    "destination": Anonymize<If9iqq7i64mur8>;
    "message": Anonymize<Ict03eedr8de9s>;
    "message_id": FixedSizeBinary<32>;
};
export type Ict03eedr8de9s = Array<XcmV5Instruction>;
export type XcmV5Instruction = Enum<{
    "WithdrawAsset": Anonymize<I4npjalvhmfuj>;
    "ReserveAssetDeposited": Anonymize<I4npjalvhmfuj>;
    "ReceiveTeleportedAsset": Anonymize<I4npjalvhmfuj>;
    "QueryResponse": Anonymize<I7lviboj0crq1q>;
    "TransferAsset": Anonymize<Ia4uoqg6e605nj>;
    "TransferReserveAsset": Anonymize<I9u1fdlf66htce>;
    "Transact": Anonymize<I1b8drcbbicg14>;
    "HrmpNewChannelOpenRequest": Anonymize<I5uhhrjqfuo4e5>;
    "HrmpChannelAccepted": Anonymize<Ifij4jam0o7sub>;
    "HrmpChannelClosing": Anonymize<Ieeb4svd9i8fji>;
    "ClearOrigin": undefined;
    "DescendOrigin": XcmV5Junctions;
    "ReportError": Anonymize<I6vsmh07hrp1rc>;
    "DepositAsset": Anonymize<I81oo73d6i5279>;
    "DepositReserveAsset": Anonymize<I5patag90o6n2g>;
    "ExchangeAsset": Anonymize<I2ga96bjhsjqmo>;
    "InitiateReserveWithdraw": Anonymize<I73lqp53eureh4>;
    "InitiateTeleport": Anonymize<I5patag90o6n2g>;
    "ReportHolding": Anonymize<Ifti8mofggqket>;
    "BuyExecution": Anonymize<I491l3ihqncggf>;
    "RefundSurplus": undefined;
    "SetErrorHandler": Anonymize<Ict03eedr8de9s>;
    "SetAppendix": Anonymize<Ict03eedr8de9s>;
    "ClearError": undefined;
    "ClaimAsset": Anonymize<I2felkchmfl53m>;
    "Trap": bigint;
    "SubscribeVersion": Anonymize<Ieprdqqu7ildvr>;
    "UnsubscribeVersion": undefined;
    "BurnAsset": Anonymize<I4npjalvhmfuj>;
    "ExpectAsset": Anonymize<I4npjalvhmfuj>;
    "ExpectOrigin"?: Anonymize<I4pai6qnfk426l>;
    "ExpectError"?: Anonymize<I3l6ejee750fv1>;
    "ExpectTransactStatus": XcmV3MaybeErrorCode;
    "QueryPallet": Anonymize<Ie5blkq940nvkd>;
    "ExpectPallet": Anonymize<Id7mf37dkpgfjs>;
    "ReportTransactStatus": Anonymize<I6vsmh07hrp1rc>;
    "ClearTransactStatus": undefined;
    "UniversalOrigin": XcmV5Junction;
    "ExportMessage": Anonymize<I46338r4f4c3gj>;
    "LockAsset": Anonymize<Idsbn0vvkhdj4i>;
    "UnlockAsset": Anonymize<I70l2gii2hrbik>;
    "NoteUnlockable": Anonymize<I4d5rrublaq1fn>;
    "RequestUnlock": Anonymize<Imh2n1s2lr5v4>;
    "SetFeesMode": Anonymize<I4nae9rsql8fa7>;
    "SetTopic": FixedSizeBinary<32>;
    "ClearTopic": undefined;
    "AliasOrigin": Anonymize<If9iqq7i64mur8>;
    "UnpaidExecution": Anonymize<I6apoeqjvad59g>;
    "PayFees": Anonymize<I9btmbcvj13kgi>;
    "InitiateTransfer": Anonymize<I2e7qiqdb7vvnq>;
    "ExecuteWithOrigin": Anonymize<Icvu0u7vrbur4e>;
    "SetHints": Anonymize<I3po4d1m5647ct>;
}>;
export declare const XcmV5Instruction: GetEnum<XcmV5Instruction>;
export type I4npjalvhmfuj = Array<Anonymize<Iffh1nc5e1mod6>>;
export type Iffh1nc5e1mod6 = {
    "id": Anonymize<If9iqq7i64mur8>;
    "fun": XcmV3MultiassetFungibility;
};
export type I7lviboj0crq1q = {
    "query_id": bigint;
    "response": Anonymize<I7vucpgm2c6959>;
    "max_weight": Anonymize<I4q39t5hn830vp>;
    "querier"?: Anonymize<I4pai6qnfk426l>;
};
export type I7vucpgm2c6959 = AnonymousEnum<{
    "Null": undefined;
    "Assets": Anonymize<I4npjalvhmfuj>;
    "ExecutionResult"?: Anonymize<I3l6ejee750fv1>;
    "Version": number;
    "PalletsInfo": Anonymize<I599u7h20b52at>;
    "DispatchResult": XcmV3MaybeErrorCode;
}>;
export type I3l6ejee750fv1 = (Anonymize<Ia1dtsqe0g5uqn>) | undefined;
export type Ia1dtsqe0g5uqn = [number, Anonymize<Id56rgs0bdb7gl>];
export type I4pai6qnfk426l = (Anonymize<If9iqq7i64mur8>) | undefined;
export type Ia4uoqg6e605nj = {
    "assets": Anonymize<I4npjalvhmfuj>;
    "beneficiary": Anonymize<If9iqq7i64mur8>;
};
export type I9u1fdlf66htce = {
    "assets": Anonymize<I4npjalvhmfuj>;
    "dest": Anonymize<If9iqq7i64mur8>;
    "xcm": Anonymize<Ict03eedr8de9s>;
};
export type I1b8drcbbicg14 = {
    "origin_kind": XcmV2OriginKind;
    "fallback_max_weight"?: Anonymize<Iasb8k6ash5mjn>;
    "call": Binary;
};
export type I6vsmh07hrp1rc = {
    "destination": Anonymize<If9iqq7i64mur8>;
    "query_id": bigint;
    "max_weight": Anonymize<I4q39t5hn830vp>;
};
export type I81oo73d6i5279 = {
    "assets": XcmV5AssetFilter;
    "beneficiary": Anonymize<If9iqq7i64mur8>;
};
export type XcmV5AssetFilter = Enum<{
    "Definite": Anonymize<I4npjalvhmfuj>;
    "Wild": XcmV5WildAsset;
}>;
export declare const XcmV5AssetFilter: GetEnum<XcmV5AssetFilter>;
export type XcmV5WildAsset = Enum<{
    "All": undefined;
    "AllOf": Anonymize<I3ufm9dj6id8cd>;
    "AllCounted": number;
    "AllOfCounted": Anonymize<Ibobri3ld2tm8f>;
}>;
export declare const XcmV5WildAsset: GetEnum<XcmV5WildAsset>;
export type I3ufm9dj6id8cd = {
    "id": Anonymize<If9iqq7i64mur8>;
    "fun": XcmV2MultiassetWildFungibility;
};
export type Ibobri3ld2tm8f = {
    "id": Anonymize<If9iqq7i64mur8>;
    "fun": XcmV2MultiassetWildFungibility;
    "count": number;
};
export type I5patag90o6n2g = {
    "assets": XcmV5AssetFilter;
    "dest": Anonymize<If9iqq7i64mur8>;
    "xcm": Anonymize<Ict03eedr8de9s>;
};
export type I2ga96bjhsjqmo = {
    "give": XcmV5AssetFilter;
    "want": Anonymize<I4npjalvhmfuj>;
    "maximal": boolean;
};
export type I73lqp53eureh4 = {
    "assets": XcmV5AssetFilter;
    "reserve": Anonymize<If9iqq7i64mur8>;
    "xcm": Anonymize<Ict03eedr8de9s>;
};
export type Ifti8mofggqket = {
    "response_info": Anonymize<I6vsmh07hrp1rc>;
    "assets": XcmV5AssetFilter;
};
export type I491l3ihqncggf = {
    "fees": Anonymize<Iffh1nc5e1mod6>;
    "weight_limit": XcmV3WeightLimit;
};
export type I2felkchmfl53m = {
    "assets": Anonymize<I4npjalvhmfuj>;
    "ticket": Anonymize<If9iqq7i64mur8>;
};
export type Ie5blkq940nvkd = {
    "module_name": Binary;
    "response_info": Anonymize<I6vsmh07hrp1rc>;
};
export type I46338r4f4c3gj = {
    "network": XcmV5NetworkId;
    "destination": XcmV5Junctions;
    "xcm": Anonymize<Ict03eedr8de9s>;
};
export type Idsbn0vvkhdj4i = {
    "asset": Anonymize<Iffh1nc5e1mod6>;
    "unlocker": Anonymize<If9iqq7i64mur8>;
};
export type I70l2gii2hrbik = {
    "asset": Anonymize<Iffh1nc5e1mod6>;
    "target": Anonymize<If9iqq7i64mur8>;
};
export type I4d5rrublaq1fn = {
    "asset": Anonymize<Iffh1nc5e1mod6>;
    "owner": Anonymize<If9iqq7i64mur8>;
};
export type Imh2n1s2lr5v4 = {
    "asset": Anonymize<Iffh1nc5e1mod6>;
    "locker": Anonymize<If9iqq7i64mur8>;
};
export type I6apoeqjvad59g = {
    "weight_limit": XcmV3WeightLimit;
    "check_origin"?: Anonymize<I4pai6qnfk426l>;
};
export type I9btmbcvj13kgi = {
    "asset": Anonymize<Iffh1nc5e1mod6>;
};
export type I2e7qiqdb7vvnq = {
    "destination": Anonymize<If9iqq7i64mur8>;
    "remote_fees"?: Anonymize<Ibu57i57ap4ll>;
    "preserve_origin": boolean;
    "assets": Anonymize<If6bfvop70u5hr>;
    "remote_xcm": Anonymize<Ict03eedr8de9s>;
};
export type Ibu57i57ap4ll = (Anonymize<Ifhmc9e7vpeeig>) | undefined;
export type Ifhmc9e7vpeeig = AnonymousEnum<{
    "Teleport": XcmV5AssetFilter;
    "ReserveDeposit": XcmV5AssetFilter;
    "ReserveWithdraw": XcmV5AssetFilter;
}>;
export type If6bfvop70u5hr = Array<Anonymize<Ifhmc9e7vpeeig>>;
export type Icvu0u7vrbur4e = {
    "descendant_origin"?: Anonymize<I8tsbjvlpig5v>;
    "xcm": Anonymize<Ict03eedr8de9s>;
};
export type I8tsbjvlpig5v = (XcmV5Junctions) | undefined;
export type I3po4d1m5647ct = {
    "hints": Anonymize<I76e3pq7smrso1>;
};
export type I76e3pq7smrso1 = Array<Anonymize<I17rrlvqs2ftbt>>;
export type I17rrlvqs2ftbt = AnonymousEnum<{
    "AssetClaimer": Anonymize<I2adkav4nfpltp>;
}>;
export type I2adkav4nfpltp = {
    "location": Anonymize<If9iqq7i64mur8>;
};
export type Ibmuil6p3vl83l = {
    "origin": Anonymize<If9iqq7i64mur8>;
    "destination": Anonymize<If9iqq7i64mur8>;
    "error": Anonymize<I4hgo1i4dhmd47>;
    "message_id": FixedSizeBinary<32>;
};
export type I4hgo1i4dhmd47 = AnonymousEnum<{
    "NotApplicable": undefined;
    "Transport": undefined;
    "Unroutable": undefined;
    "DestinationUnsupported": undefined;
    "ExceedsMaxMessageSize": undefined;
    "MissingArgument": undefined;
    "Fees": undefined;
}>;
export type I7lul91g50ae87 = {
    "origin": Anonymize<If9iqq7i64mur8>;
    "error": Anonymize<Id56rgs0bdb7gl>;
    "message_id": FixedSizeBinary<32>;
};
export type Icl7nl1rfeog3i = {
    "origin": Anonymize<If9iqq7i64mur8>;
    "query_id": bigint;
};
export type Iasr6pj6shs0fl = {
    "query_id": bigint;
    "response": Anonymize<I7vucpgm2c6959>;
};
export type I7r6b7145022pp = {
    "origin": Anonymize<If9iqq7i64mur8>;
    "query_id": bigint;
    "expected_location"?: Anonymize<I4pai6qnfk426l>;
};
export type Icmrn7bogp28cs = {
    "hash": FixedSizeBinary<32>;
    "origin": Anonymize<If9iqq7i64mur8>;
    "assets": XcmVersionedAssets;
};
export type XcmVersionedAssets = Enum<{
    "V3": Anonymize<Iai6dhqiq3bach>;
    "V4": Anonymize<I50mli3hb64f9b>;
    "V5": Anonymize<I4npjalvhmfuj>;
}>;
export declare const XcmVersionedAssets: GetEnum<XcmVersionedAssets>;
export type I7m9b5plj4h5ot = {
    "destination": Anonymize<If9iqq7i64mur8>;
    "result": number;
    "cost": Anonymize<I4npjalvhmfuj>;
    "message_id": FixedSizeBinary<32>;
};
export type I9kt8c221c83ln = {
    "location": Anonymize<If9iqq7i64mur8>;
    "version": number;
};
export type I9onhk772nfs4f = {
    "location": Anonymize<If9iqq7i64mur8>;
    "query_id": bigint;
    "error": Anonymize<Id56rgs0bdb7gl>;
};
export type I3l6bnksrmt56r = {
    "location": XcmVersionedLocation;
    "query_id": bigint;
};
export type Idh09k0l2pmdcg = {
    "origin": Anonymize<If9iqq7i64mur8>;
    "query_id": bigint;
    "expected_querier": Anonymize<If9iqq7i64mur8>;
    "maybe_actual_querier"?: Anonymize<I4pai6qnfk426l>;
};
export type I7uoiphbm0tj4r = {
    "destination": Anonymize<If9iqq7i64mur8>;
    "cost": Anonymize<I4npjalvhmfuj>;
    "message_id": FixedSizeBinary<32>;
};
export type I512p1n7qt24l8 = {
    "paying": Anonymize<If9iqq7i64mur8>;
    "fees": Anonymize<I4npjalvhmfuj>;
};
export type I3gghqnh2mj0is = {
    "aliaser": Anonymize<If9iqq7i64mur8>;
    "target": Anonymize<If9iqq7i64mur8>;
    "expiry"?: Anonymize<I35p85j063s0il>;
};
export type I6iv852roh6t3h = {
    "aliaser": Anonymize<If9iqq7i64mur8>;
    "target": Anonymize<If9iqq7i64mur8>;
};
export type I9oc2o6itbiopq = {
    "target": Anonymize<If9iqq7i64mur8>;
};
export type I1dcjapt414ijf = AnonymousEnum<{
    "AssetRateCreated": Anonymize<I9c4d50jrp7as1>;
    "AssetRateRemoved": Anonymize<Ifplevr9hp8jo3>;
    "AssetRateUpdated": Anonymize<Idrugh2blv81ia>;
}>;
export type I9c4d50jrp7as1 = {
    "asset_kind": Anonymize<I2q3ri6itcjj5u>;
    "rate": bigint;
};
export type Ifplevr9hp8jo3 = {
    "asset_kind": Anonymize<I2q3ri6itcjj5u>;
};
export type Idrugh2blv81ia = {
    "asset_kind": Anonymize<I2q3ri6itcjj5u>;
    "old": bigint;
    "new": bigint;
};
export type RootTestingEvent = Enum<{
    /**
     *Event dispatched when the trigger_defensive extrinsic is called.
     */
    "DefensiveTestCall": undefined;
}>;
export declare const RootTestingEvent: GetEnum<RootTestingEvent>;
export type Id1mj65apaj4j4 = AnonymousEnum<{
    /**
     *A meta transaction has been dispatched.
     *
     *Contains the dispatch result of the meta transaction along with post-dispatch
     *information.
     */
    "Dispatched": Anonymize<Ibpfoajp33bp2j>;
}>;
export type Ibpfoajp33bp2j = {
    "result": Anonymize<I52bohnq0qt2b0>;
};
export type PolkadotRuntimeCommonIdentityMigratorEvent = Enum<{
    /**
     *The identity and all sub accounts were reaped for `who`.
     */
    "IdentityReaped": Anonymize<I4cbvqmqadhrea>;
    /**
     *The deposits held for `who` were updated. `identity` is the new deposit held for
     *identity info, and `subs` is the new deposit held for the sub-accounts.
     */
    "DepositUpdated": Anonymize<I4i3u9uui7ktsd>;
}>;
export declare const PolkadotRuntimeCommonIdentityMigratorEvent: GetEnum<PolkadotRuntimeCommonIdentityMigratorEvent>;
export type I4i3u9uui7ktsd = {
    "who": SS58String;
    "identity": bigint;
    "subs": bigint;
};
export type I9b2c0tao13nvd = Array<Anonymize<Ia5rn38d6qcld>>;
export type Ia5rn38d6qcld = {
    "id": Anonymize<I82c9mmj85gqil>;
    "amount": bigint;
};
export type I82c9mmj85gqil = AnonymousEnum<{
    "Staking": Anonymize<Icbapambb5rug3>;
    "Session": Anonymize<I6bkr3dqv753nc>;
    "Preimage": PreimagePalletHoldReason;
    "DelegatedStaking": Anonymize<Ib6ve2drlnapui>;
    "XcmPallet": Anonymize<Ideiof6273rsoe>;
}>;
export type Icbapambb5rug3 = AnonymousEnum<{
    "Staking": undefined;
}>;
export type I6bkr3dqv753nc = AnonymousEnum<{
    "Keys": undefined;
}>;
export type Ib6ve2drlnapui = AnonymousEnum<{
    "StakingDelegation": undefined;
}>;
export type Ideiof6273rsoe = AnonymousEnum<{
    "AuthorizeAlias": undefined;
}>;
export type I4ftk0glls7946 = {
    "judgements": Anonymize<I5lbssihti472g>;
    "deposit": bigint;
    "info": Anonymize<I1o57snqt6f4v5>;
};
export type I5lbssihti472g = Array<Anonymize<I7uhmpkgp9kq6>>;
export type I7uhmpkgp9kq6 = [number, Anonymize<IdentityJudgement>];
export type IdentityJudgement = Enum<{
    "Unknown": undefined;
    "FeePaid": bigint;
    "Reasonable": undefined;
    "KnownGood": undefined;
    "OutOfDate": undefined;
    "LowQuality": undefined;
    "Erroneous": undefined;
}>;
export declare const IdentityJudgement: GetEnum<IdentityJudgement>;
export type I1o57snqt6f4v5 = {
    "additional": Anonymize<I9rp1vd8cfo0na>;
    "display": Anonymize<IdentityData>;
    "legal": Anonymize<IdentityData>;
    "web": Anonymize<IdentityData>;
    "riot": Anonymize<IdentityData>;
    "email": Anonymize<IdentityData>;
    "pgp_fingerprint"?: Anonymize<If7b8240vgt2q5>;
    "image": Anonymize<IdentityData>;
    "twitter": Anonymize<IdentityData>;
};
export type I9rp1vd8cfo0na = Array<Anonymize<Ifqv6alck9pqqn>>;
export type Ifqv6alck9pqqn = FixedSizeArray<2, Anonymize<IdentityData>>;
export type IdentityData = Enum<{
    "None": undefined;
    "Raw0": undefined;
    "Raw1": number;
    "Raw2": FixedSizeBinary<2>;
    "Raw3": FixedSizeBinary<3>;
    "Raw4": FixedSizeBinary<4>;
    "Raw5": FixedSizeBinary<5>;
    "Raw6": FixedSizeBinary<6>;
    "Raw7": FixedSizeBinary<7>;
    "Raw8": FixedSizeBinary<8>;
    "Raw9": FixedSizeBinary<9>;
    "Raw10": FixedSizeBinary<10>;
    "Raw11": FixedSizeBinary<11>;
    "Raw12": FixedSizeBinary<12>;
    "Raw13": FixedSizeBinary<13>;
    "Raw14": FixedSizeBinary<14>;
    "Raw15": FixedSizeBinary<15>;
    "Raw16": FixedSizeBinary<16>;
    "Raw17": FixedSizeBinary<17>;
    "Raw18": FixedSizeBinary<18>;
    "Raw19": FixedSizeBinary<19>;
    "Raw20": FixedSizeBinary<20>;
    "Raw21": FixedSizeBinary<21>;
    "Raw22": FixedSizeBinary<22>;
    "Raw23": FixedSizeBinary<23>;
    "Raw24": FixedSizeBinary<24>;
    "Raw25": FixedSizeBinary<25>;
    "Raw26": FixedSizeBinary<26>;
    "Raw27": FixedSizeBinary<27>;
    "Raw28": FixedSizeBinary<28>;
    "Raw29": FixedSizeBinary<29>;
    "Raw30": FixedSizeBinary<30>;
    "Raw31": FixedSizeBinary<31>;
    "Raw32": FixedSizeBinary<32>;
    "BlakeTwo256": FixedSizeBinary<32>;
    "Sha256": FixedSizeBinary<32>;
    "Keccak256": FixedSizeBinary<32>;
    "ShaThree256": FixedSizeBinary<32>;
}>;
export declare const IdentityData: GetEnum<IdentityData>;
export type If7b8240vgt2q5 = (FixedSizeBinary<20>) | undefined;
export type I910puuahutflf = [SS58String, Anonymize<IdentityData>];
export type I4nfjdef0ibh44 = [bigint, Anonymize<Ia2lhg7l2hilo3>];
export type I74af64m08r6as = Array<Anonymize<I48v3sekdprq30>>;
export type I48v3sekdprq30 = (Anonymize<Icj8lp9f0lq0bm>) | undefined;
export type Icj8lp9f0lq0bm = {
    "account": SS58String;
    "fee": bigint;
    "fields": bigint;
};
export type Ic8ann3kre6vdm = {
    "account_id": SS58String;
    "allocation": number;
};
export type I1j72qfgdejqsv = {
    "owner": SS58String;
    "provider": Anonymize<Idib8jf3ve40bj>;
};
export type Idib8jf3ve40bj = AnonymousEnum<{
    "Allocation": undefined;
    "AuthorityDeposit": bigint;
    "System": undefined;
}>;
export type I60biiepd74113 = [SS58String, number, Anonymize<Idib8jf3ve40bj>];
export type I3c4cvcot9ouo7 = Array<Anonymize<Icqu5g31ugcpah>>;
export type Icqu5g31ugcpah = (Anonymize<Idi7ib6brboos3>) | undefined;
export type Idi7ib6brboos3 = {
    "maybe_id"?: Anonymize<I4s6vifaf8k998>;
    "priority": number;
    "call": PreimagesBounded;
    "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
    "origin": Anonymize<I16qqgglq4ega1>;
};
export type I16qqgglq4ega1 = AnonymousEnum<{
    "system": Anonymize<I9gqitj4t615g3>;
    "Origins": WestendRuntimeGovernanceOriginsPalletCustomOriginsOrigin;
    "ParachainsOrigin": ParachainsOrigin;
    "XcmPallet": Anonymize<Icvilmd7qu30i4>;
}>;
export type I9gqitj4t615g3 = AnonymousEnum<{
    "Root": undefined;
    "Signed": SS58String;
    "None": undefined;
    "Authorized": undefined;
}>;
export type WestendRuntimeGovernanceOriginsPalletCustomOriginsOrigin = Enum<{
    "StakingAdmin": undefined;
    "Treasurer": undefined;
    "FellowshipAdmin": undefined;
    "GeneralAdmin": undefined;
    "AuctionAdmin": undefined;
    "LeaseAdmin": undefined;
    "ReferendumCanceller": undefined;
    "ReferendumKiller": undefined;
    "SmallTipper": undefined;
    "BigTipper": undefined;
    "SmallSpender": undefined;
    "MediumSpender": undefined;
    "BigSpender": undefined;
    "WhitelistedCaller": undefined;
    "FellowshipInitiates": undefined;
    "Fellows": undefined;
    "FellowshipExperts": undefined;
    "FellowshipMasters": undefined;
    "Fellowship1Dan": undefined;
    "Fellowship2Dan": undefined;
    "Fellowship3Dan": undefined;
    "Fellowship4Dan": undefined;
    "Fellowship5Dan": undefined;
    "Fellowship6Dan": undefined;
    "Fellowship7Dan": undefined;
    "Fellowship8Dan": undefined;
    "Fellowship9Dan": undefined;
}>;
export declare const WestendRuntimeGovernanceOriginsPalletCustomOriginsOrigin: GetEnum<WestendRuntimeGovernanceOriginsPalletCustomOriginsOrigin>;
export type Icvilmd7qu30i4 = AnonymousEnum<{
    "Xcm": Anonymize<If9iqq7i64mur8>;
    "Response": Anonymize<If9iqq7i64mur8>;
}>;
export type I7rqj1laarti4a = [Anonymize<I5dennur9ngn8b>, bigint];
export type I5dennur9ngn8b = Array<Anonymize<Ifgv29lnven1n7>>;
export type Ifgv29lnven1n7 = {
    "delegate": SS58String;
    "proxy_type": Anonymize<I4usd2cn59lcla>;
    "delay": number;
};
export type If0jlcnakch6k = AnonymousEnum<{
    "Ongoing": Anonymize<I7sgjkr7514hq0>;
    "Approved": Anonymize<Ini94eljn5lj8>;
    "Rejected": Anonymize<Ini94eljn5lj8>;
    "Cancelled": Anonymize<Ini94eljn5lj8>;
    "TimedOut": Anonymize<Ini94eljn5lj8>;
    "Killed": number;
}>;
export type I7sgjkr7514hq0 = {
    "track": number;
    "origin": Anonymize<I16qqgglq4ega1>;
    "proposal": PreimagesBounded;
    "enactment": TraitsScheduleDispatchTime;
    "submitted": number;
    "submission_deposit": Anonymize<Id5fm4p8lj5qgi>;
    "decision_deposit"?: Anonymize<Ibd24caul84kv2>;
    "deciding"?: Anonymize<Ibcbcndfmk0jd9>;
    "tally": Anonymize<Ifsk7cbmtit1jd>;
    "in_queue": boolean;
    "alarm"?: Anonymize<I3aj03qk2o5mdm>;
};
export type I3s9vvjt0el98d = {
    "asset_kind": Anonymize<I2q3ri6itcjj5u>;
    "amount": bigint;
    "beneficiary": XcmVersionedLocation;
    "valid_from": number;
    "expire_at": number;
    "status": TreasuryPaymentState;
};
export type I542q009qbgt8k = {
    "agent": SS58String;
    "amount": bigint;
};
export type I4e5ujckjq61g8 = {
    "payee": SS58String;
    "total_delegated": bigint;
    "unclaimed_withdrawals": bigint;
    "pending_slash": bigint;
};
export type I2d4k4cqluhq5i = {
    "buffer": Anonymize<Iatpn2emmr5i52>;
    "latest_number": number;
};
export type Iatpn2emmr5i52 = Array<Anonymize<I2l15hoj5fe0mk>>;
export type I2l15hoj5fe0mk = {
    "relay_parent": FixedSizeBinary<32>;
    "state_root": FixedSizeBinary<32>;
    "claim_queue": Anonymize<Ij277dgaqsjje>;
};
export type Ij277dgaqsjje = Array<Anonymize<I4p3ju2mesd9m1>>;
export type I4p3ju2mesd9m1 = [number, Anonymize<I9olhgo2o08h7b>];
export type I91e9aiuocql92 = Array<Anonymize<I1ibeo05ogqsc7>>;
export type I1ibeo05ogqsc7 = {
    "core": number;
    "hash": FixedSizeBinary<32>;
    "descriptor": Anonymize<Ibnq2mkuf1plno>;
    "commitments": Anonymize<Ic1d4u2opv3fst>;
    "availability_votes": {
        bytes: Uint8Array;
        bitsLen: number;
    };
    "backers": {
        bytes: Uint8Array;
        bitsLen: number;
    };
    "relay_parent_number": number;
    "backed_in_number": number;
    "backing_group": number;
};
export type Ia1viqq9k85bv1 = {
    "session": number;
    "backing_validators_per_candidate": Anonymize<I54vphn2b5i7j0>;
    "disputes": Anonymize<Ibt1op6l47p1r2>;
};
export type I54vphn2b5i7j0 = Array<Anonymize<I46eo7fu63lvs0>>;
export type I46eo7fu63lvs0 = [Anonymize<Iceqied2dhrjit>, Anonymize<I1jjanul21h2e0>];
export type Idp9imcf15rli1 = Array<Anonymize<I1lbvimkpgjd5>>;
export type I1lbvimkpgjd5 = [number, Anonymize<I87vihqtpi4hb3>];
export type I87vihqtpi4hb3 = Array<PolkadotRuntimeParachainsSchedulerCommonAssignment>;
export type I5ql12lunltfbi = {
    "code_hash": FixedSizeBinary<32>;
    "expire_at": number;
};
export type Ids3ua6tfbgvj0 = {
    "keys": Anonymize<Iqnbvitf7a7l3>;
    "kind": Anonymize<I9ng4p85mim3lc>;
};
export type I9ng4p85mim3lc = AnonymousEnum<{
    "ForInvalidBacked": undefined;
    "AgainstValid": undefined;
    "ForInvalidApproved": undefined;
}>;
export type I6ucbdbrsslk4l = {
    "manager": SS58String;
    "period_begin": number;
    "period_count": number;
    "last_lease"?: Anonymize<I4arjljr6dpflb>;
    "lease_count": number;
};
export type Idned7t7knml6b = [number, Anonymize<Ia2lhg7l2hilo3>];
export type I9vjdmm7sufoc = {
    "new_validator_set": Anonymize<Ia2lhg7l2hilo3>;
    "id": number;
    "prune_up_to"?: Anonymize<I4arjljr6dpflb>;
    "leftover": boolean;
};
export type Ianpaq0u393le8 = AnonymousEnum<{
    "Passive": undefined;
    "Buffered": undefined;
    "Active": undefined;
}>;
export type Ic11i4hlj9lv1l = Array<Anonymize<Ic0ma6k4a9k6to>>;
export type Ic0ma6k4a9k6to = [number, Anonymize<I86kmkeb6sneu6>];
export type I86kmkeb6sneu6 = Array<Anonymize<Ie411bbkajvb2s>>;
export type Ie411bbkajvb2s = [SS58String, Anonymize<Ioteoc7rlchll>];
export type Ioteoc7rlchll = {
    "reporter"?: Anonymize<Ihfphjolmsqq1>;
    "slash_fraction": number;
};
export type Iepbsvlk3qceij = AnonymousEnum<{
    "Active": Anonymize<Iessq0bats6ofh>;
    "Stuck": undefined;
}>;
export type Iessq0bats6ofh = {
    "index": number;
    "inner_cursor"?: Anonymize<Iabpgqcjikia83>;
    "started_at": number;
};
export type I5qfubnuvrnqn6 = AnonymousEnum<{
    "Pending": Anonymize<I8n1p8t37t4406>;
    "VersionNotifier": Anonymize<Invrgr8s9n09r>;
    "Ready": Anonymize<I2ssu86ioj11k3>;
}>;
export type I8n1p8t37t4406 = {
    "responder": XcmVersionedLocation;
    "maybe_match_querier"?: Anonymize<I1k8uk4m0m3gr4>;
    "maybe_notify"?: Anonymize<I1faufi0iffstp>;
    "timeout": number;
};
export type I1k8uk4m0m3gr4 = (XcmVersionedLocation) | undefined;
export type Invrgr8s9n09r = {
    "origin": XcmVersionedLocation;
    "is_active": boolean;
};
export type I2ssu86ioj11k3 = {
    "response": Anonymize<I9um3bb0cui9cs>;
    "at": number;
};
export type I9um3bb0cui9cs = AnonymousEnum<{
    "V3": XcmV3Response;
    "V4": XcmV4Response;
    "V5": Anonymize<I7vucpgm2c6959>;
}>;
export type I8t3u2dv73ahbd = [number, XcmVersionedLocation];
export type Ie0rpl5bahldfk = Array<Anonymize<I609v0gelr96h6>>;
export type I609v0gelr96h6 = [XcmVersionedLocation, number];
export type I7e5oaj2qi4kl1 = {
    "amount": bigint;
    "owner": XcmVersionedLocation;
    "locker": XcmVersionedLocation;
    "consumers": Anonymize<I2ia97v5nng96b>;
};
export type Ie849h3gncgvok = [number, SS58String, XcmVersionedAssetId];
export type XcmVersionedAssetId = Enum<{
    "V3": XcmV3MultiassetAssetId;
    "V4": Anonymize<I4c0s5cioidn76>;
    "V5": Anonymize<If9iqq7i64mur8>;
}>;
export declare const XcmVersionedAssetId: GetEnum<XcmVersionedAssetId>;
export type Iat62vud7hlod2 = Array<Anonymize<I55s5m6u4mntoo>>;
export type I55s5m6u4mntoo = [bigint, XcmVersionedLocation];
export type Ici7ejds60vj52 = {
    "aliasers": Anonymize<I41j3fc5ema929>;
};
export type I41j3fc5ema929 = Array<Anonymize<Iegerpi2hl6723>>;
export type Iegerpi2hl6723 = {
    "location": XcmVersionedLocation;
    "expiry"?: Anonymize<I35p85j063s0il>;
};
export type I4fo08joqmcqnm = {
    "spec_name": string;
    "impl_name": string;
    "authoring_version": number;
    "spec_version": number;
    "impl_version": number;
    "apis": Anonymize<Ic9hg6pp5pkea5>;
    "transaction_version": number;
    "system_version": number;
};
export type I67ac6i6ihmvpt = AnonymousEnum<{
    /**
     *Assign an previously unassigned index.
     *
     *Payment: `Deposit` is reserved from the sender account.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `index`: the index to be claimed. This must not be in use.
     *
     *Emits `IndexAssigned` if successful.
     *
     *## Complexity
     *- `O(1)`.
     */
    "claim": Anonymize<I666bl2fqjkejo>;
    /**
     *Assign an index already owned by the sender to another account. The balance reservation
     *is effectively transferred to the new account.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `index`: the index to be re-assigned. This must be owned by the sender.
     *- `new`: the new owner of the index. This function is a no-op if it is equal to sender.
     *
     *Emits `IndexAssigned` if successful.
     *
     *## Complexity
     *- `O(1)`.
     */
    "transfer": Anonymize<I6o1er683vod1j>;
    /**
     *Free up an index owned by the sender.
     *
     *Payment: Any previous deposit placed for the index is unreserved in the sender account.
     *
     *The dispatch origin for this call must be _Signed_ and the sender must own the index.
     *
     *- `index`: the index to be freed. This must be owned by the sender.
     *
     *Emits `IndexFreed` if successful.
     *
     *## Complexity
     *- `O(1)`.
     */
    "free": Anonymize<I666bl2fqjkejo>;
    /**
     *Force an index to an account. This doesn't require a deposit. If the index is already
     *held, then any deposit is reimbursed to its current owner.
     *
     *The dispatch origin for this call must be _Root_.
     *
     *- `index`: the index to be (re-)assigned.
     *- `new`: the new owner of the index. This function is a no-op if it is equal to sender.
     *- `freeze`: if set to `true`, will freeze the index so it cannot be transferred.
     *
     *Emits `IndexAssigned` if successful.
     *
     *## Complexity
     *- `O(1)`.
     */
    "force_transfer": Anonymize<I5bq561t4gpfva>;
    /**
     *Freeze an index so it will always point to the sender account. This consumes the
     *deposit.
     *
     *The dispatch origin for this call must be _Signed_ and the signing account must have a
     *non-frozen account `index`.
     *
     *- `index`: the index to be frozen in place.
     *
     *Emits `IndexFrozen` if successful.
     *
     *## Complexity
     *- `O(1)`.
     */
    "freeze": Anonymize<I666bl2fqjkejo>;
    /**
     *Poke the deposit reserved for an index.
     *
     *The dispatch origin for this call must be _Signed_ and the signing account must have a
     *non-frozen account `index`.
     *
     *The transaction fees is waived if the deposit is changed after poking/reconsideration.
     *
     *- `index`: the index whose deposit is to be poked/reconsidered.
     *
     *Emits `DepositPoked` if successful.
     */
    "poke_deposit": Anonymize<I666bl2fqjkejo>;
}>;
export type Icm294co91mkfj = AnonymousEnum<{
    /**
     *Take the origin account as a stash and lock up `value` of its balance. `controller` will
     *be the account that controls it.
     *
     *`value` must be more than the `minimum_balance` specified by `T::Currency`.
     *
     *The dispatch origin for this call must be _Signed_ by the stash account.
     *
     *Emits `Bonded`.
     *## Complexity
     *- Independent of the arguments. Moderate complexity.
     *- O(1).
     *- Three extra DB entries.
     *
     *NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
     *unless the `origin` falls below _existential deposit_ (or equal to 0) and gets removed
     *as dust.
     */
    "bond": Anonymize<I2eip8tc75dpje>;
    /**
     *Add some extra amount that have appeared in the stash `free_balance` into the balance up
     *for staking.
     *
     *The dispatch origin for this call must be _Signed_ by the stash, not the controller.
     *
     *Use this if there are additional funds in your stash account that you wish to bond.
     *Unlike [`bond`](Self::bond) or [`unbond`](Self::unbond) this function does not impose
     *any limitation on the amount that can be added.
     *
     *Emits `Bonded`.
     *
     *## Complexity
     *- Independent of the arguments. Insignificant complexity.
     *- O(1).
     */
    "bond_extra": Anonymize<I564va64vtidbq>;
    /**
     *Schedule a portion of the stash to be unlocked ready for transfer out after the bond
     *period ends. If this leaves an amount actively bonded less than
     *[`asset::existential_deposit`], then it is increased to the full amount.
     *
     *The stash may be chilled if the ledger total amount falls to 0 after unbonding.
     *
     *The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     *
     *Once the unlock period is done, you can call `withdraw_unbonded` to actually move
     *the funds out of management ready for transfer.
     *
     *No more than a limited number of unlocking chunks (see `MaxUnlockingChunks`)
     *can co-exists at the same time. If there are no unlocking chunks slots available
     *[`Call::withdraw_unbonded`] is called to remove some of the chunks (if possible).
     *
     *If a user encounters the `InsufficientBond` error when calling this extrinsic,
     *they should call `chill` first in order to free up their bonded funds.
     *
     *Emits `Unbonded`.
     *
     *See also [`Call::withdraw_unbonded`].
     */
    "unbond": Anonymize<Ie5v6njpckr05b>;
    /**
     *Remove any unlocked chunks from the `unlocking` queue from our management.
     *
     *This essentially frees up that balance to be used by the stash account to do whatever
     *it wants.
     *
     *The dispatch origin for this call must be _Signed_ by the controller.
     *
     *Emits `Withdrawn`.
     *
     *See also [`Call::unbond`].
     *
     *## Parameters
     *
     *- `num_slashing_spans` indicates the number of metadata slashing spans to clear when
     *this call results in a complete removal of all the data related to the stash account.
     *In this case, the `num_slashing_spans` must be larger or equal to the number of
     *slashing spans associated with the stash account in the [`SlashingSpans`] storage type,
     *otherwise the call will fail. The call weight is directly proportional to
     *`num_slashing_spans`.
     *
     *## Complexity
     *O(S) where S is the number of slashing spans to remove
     *NOTE: Weight annotation is the kill scenario, we refund otherwise.
     */
    "withdraw_unbonded": Anonymize<I328av3j0bgmjb>;
    /**
     *Declare the desire to validate for the origin controller.
     *
     *Effects will be felt at the beginning of the next era.
     *
     *The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     */
    "validate": Anonymize<I4tuqm9ato907i>;
    /**
     *Declare the desire to nominate `targets` for the origin controller.
     *
     *Effects will be felt at the beginning of the next era.
     *
     *The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     *
     *## Complexity
     *- The transaction's complexity is proportional to the size of `targets` (N)
     *which is capped at CompactAssignments::LIMIT (T::MaxNominations).
     *- Both the reads and writes follow a similar pattern.
     */
    "nominate": Anonymize<Iagi89qt4h1lqg>;
    /**
     *Declare no desire to either validate or nominate.
     *
     *Effects will be felt at the beginning of the next era.
     *
     *The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     *
     *## Complexity
     *- Independent of the arguments. Insignificant complexity.
     *- Contains one read.
     *- Writes are limited to the `origin` account key.
     */
    "chill": undefined;
    /**
     *(Re-)set the payment target for a controller.
     *
     *Effects will be felt instantly (as soon as this function is completed successfully).
     *
     *The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     *
     *## Complexity
     *- O(1)
     *- Independent of the arguments. Insignificant complexity.
     *- Contains a limited number of reads.
     *- Writes are limited to the `origin` account key.
     *---------
     */
    "set_payee": Anonymize<I9dgmcnuamt5p8>;
    /**
     *(Re-)sets the controller of a stash to the stash itself. This function previously
     *accepted a `controller` argument to set the controller to an account other than the
     *stash itself. This functionality has now been removed, now only setting the controller
     *to the stash, if it is not already.
     *
     *Effects will be felt instantly (as soon as this function is completed successfully).
     *
     *The dispatch origin for this call must be _Signed_ by the stash, not the controller.
     *
     *## Complexity
     *O(1)
     *- Independent of the arguments. Insignificant complexity.
     *- Contains a limited number of reads.
     *- Writes are limited to the `origin` account key.
     */
    "set_controller": undefined;
    /**
     *Sets the ideal number of validators.
     *
     *The dispatch origin must be Root.
     *
     *## Complexity
     *O(1)
     */
    "set_validator_count": Anonymize<I3vh014cqgmrfd>;
    /**
     *Increments the ideal number of validators up to maximum of
     *`ElectionProviderBase::MaxWinners`.
     *
     *The dispatch origin must be Root.
     *
     *## Complexity
     *Same as [`Self::set_validator_count`].
     */
    "increase_validator_count": Anonymize<Ifhs60omlhvt3>;
    /**
     *Scale up the ideal number of validators by a factor up to maximum of
     *`ElectionProviderBase::MaxWinners`.
     *
     *The dispatch origin must be Root.
     *
     *## Complexity
     *Same as [`Self::set_validator_count`].
     */
    "scale_validator_count": Anonymize<If34udpd5e57vi>;
    /**
     *Force there to be no new eras indefinitely.
     *
     *The dispatch origin must be Root.
     *
     *# Warning
     *
     *The election process starts multiple blocks before the end of the era.
     *Thus the election process may be ongoing when this is called. In this case the
     *election will continue until the next era is triggered.
     *
     *## Complexity
     *- No arguments.
     *- Weight: O(1)
     */
    "force_no_eras": undefined;
    /**
     *Force there to be a new era at the end of the next session. After this, it will be
     *reset to normal (non-forced) behaviour.
     *
     *The dispatch origin must be Root.
     *
     *# Warning
     *
     *The election process starts multiple blocks before the end of the era.
     *If this is called just before a new era is triggered, the election process may not
     *have enough blocks to get a result.
     *
     *## Complexity
     *- No arguments.
     *- Weight: O(1)
     */
    "force_new_era": undefined;
    /**
     *Set the validators who cannot be slashed (if any).
     *
     *The dispatch origin must be Root.
     */
    "set_invulnerables": Anonymize<I39t01nnod9109>;
    /**
     *Force a current staker to become completely unstaked, immediately.
     *
     *The dispatch origin must be Root.
     *
     *## Parameters
     *
     *- `num_slashing_spans`: Refer to comments on [`Call::withdraw_unbonded`] for more
     *details.
     */
    "force_unstake": Anonymize<Ie5vbnd9198quk>;
    /**
     *Force there to be a new era at the end of sessions indefinitely.
     *
     *The dispatch origin must be Root.
     *
     *# Warning
     *
     *The election process starts multiple blocks before the end of the era.
     *If this is called just before a new era is triggered, the election process may not
     *have enough blocks to get a result.
     */
    "force_new_era_always": undefined;
    /**
     *Cancel enactment of a deferred slash.
     *
     *Can be called by the `T::AdminOrigin`.
     *
     *Parameters: era and indices of the slashes for that era to kill.
     *They **must** be sorted in ascending order, *and* unique.
     */
    "cancel_deferred_slash": Anonymize<I3h6murn8bd4v5>;
    /**
     *Pay out next page of the stakers behind a validator for the given era.
     *
     *- `validator_stash` is the stash account of the validator.
     *- `era` may be any era between `[current_era - history_depth; current_era]`.
     *
     *The origin of this call must be _Signed_. Any account can call this function, even if
     *it is not one of the stakers.
     *
     *The reward payout could be paged in case there are too many nominators backing the
     *`validator_stash`. This call will payout unpaid pages in an ascending order. To claim a
     *specific page, use `payout_stakers_by_page`.`
     *
     *If all pages are claimed, it returns an error `InvalidPage`.
     */
    "payout_stakers": Anonymize<I6k6jf8ncesuu3>;
    /**
     *Rebond a portion of the stash scheduled to be unlocked.
     *
     *The dispatch origin must be signed by the controller.
     *
     *## Complexity
     *- Time complexity: O(L), where L is unlocking chunks
     *- Bounded by `MaxUnlockingChunks`.
     */
    "rebond": Anonymize<Ie5v6njpckr05b>;
    /**
     *Remove all data structures concerning a staker/stash once it is at a state where it can
     *be considered `dust` in the staking system. The requirements are:
     *
     *1. the `total_balance` of the stash is below existential deposit.
     *2. or, the `ledger.total` of the stash is below existential deposit.
     *3. or, existential deposit is zero and either `total_balance` or `ledger.total` is zero.
     *
     *The former can happen in cases like a slash; the latter when a fully unbonded account
     *is still receiving staking rewards in `RewardDestination::Staked`.
     *
     *It can be called by anyone, as long as `stash` meets the above requirements.
     *
     *Refunds the transaction fees upon successful execution.
     *
     *## Parameters
     *
     *- `num_slashing_spans`: Refer to comments on [`Call::withdraw_unbonded`] for more
     *details.
     */
    "reap_stash": Anonymize<Ie5vbnd9198quk>;
    /**
     *Remove the given nominations from the calling validator.
     *
     *Effects will be felt at the beginning of the next era.
     *
     *The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     *
     *- `who`: A list of nominator stash accounts who are nominating this validator which
     *  should no longer be nominating this validator.
     *
     *Note: Making this call only makes sense if you first set the validator preferences to
     *block any further nominations.
     */
    "kick": Anonymize<I3qhk481i120pk>;
    /**
     *Update the various staking configurations .
     *
     ** `min_nominator_bond`: The minimum active bond needed to be a nominator.
     ** `min_validator_bond`: The minimum active bond needed to be a validator.
     ** `max_nominator_count`: The max number of users who can be a nominator at once. When
     *  set to `None`, no limit is enforced.
     ** `max_validator_count`: The max number of users who can be a validator at once. When
     *  set to `None`, no limit is enforced.
     ** `chill_threshold`: The ratio of `max_nominator_count` or `max_validator_count` which
     *  should be filled in order for the `chill_other` transaction to work.
     ** `min_commission`: The minimum amount of commission that each validators must maintain.
     *  This is checked only upon calling `validate`. Existing validators are not affected.
     *
     *RuntimeOrigin must be Root to call this function.
     *
     *NOTE: Existing nominators and validators will not be affected by this update.
     *to kick people under the new limits, `chill_other` should be called.
     */
    "set_staking_configs": Anonymize<If1qr0kbbl298c>;
    /**
     *Declare a `controller` to stop participating as either a validator or nominator.
     *
     *Effects will be felt at the beginning of the next era.
     *
     *The dispatch origin for this call must be _Signed_, but can be called by anyone.
     *
     *If the caller is the same as the controller being targeted, then no further checks are
     *enforced, and this function behaves just like `chill`.
     *
     *If the caller is different than the controller being targeted, the following conditions
     *must be met:
     *
     ** `controller` must belong to a nominator who has become non-decodable,
     *
     *Or:
     *
     ** A `ChillThreshold` must be set and checked which defines how close to the max
     *  nominators or validators we must reach before users can start chilling one-another.
     ** A `MaxNominatorCount` and `MaxValidatorCount` must be set which is used to determine
     *  how close we are to the threshold.
     ** A `MinNominatorBond` and `MinValidatorBond` must be set and checked, which determines
     *  if this is a person that should be chilled because they have not met the threshold
     *  bond required.
     *
     *This can be helpful if bond requirements are updated, and we need to remove old users
     *who do not satisfy these requirements.
     */
    "chill_other": Anonymize<Idl3umm12u5pa>;
    /**
     *Force a validator to have at least the minimum commission. This will not affect a
     *validator who already has a commission greater than or equal to the minimum. Any account
     *can call this.
     */
    "force_apply_min_commission": Anonymize<I5ont0141q9ss5>;
    /**
     *Sets the minimum amount of commission that each validators must maintain.
     *
     *This call has lower privilege requirements than `set_staking_config` and can be called
     *by the `T::AdminOrigin`. Root can always call this.
     */
    "set_min_commission": Anonymize<I3vh014cqgmrfd>;
    /**
     *Pay out a page of the stakers behind a validator for the given era and page.
     *
     *- `validator_stash` is the stash account of the validator.
     *- `era` may be any era between `[current_era - history_depth; current_era]`.
     *- `page` is the page index of nominators to pay out with value between 0 and
     *  `num_nominators / T::MaxExposurePageSize`.
     *
     *The origin of this call must be _Signed_. Any account can call this function, even if
     *it is not one of the stakers.
     *
     *If a validator has more than [`Config::MaxExposurePageSize`] nominators backing
     *them, then the list of nominators is paged, with each page being capped at
     *[`Config::MaxExposurePageSize`.] If a validator has more than one page of nominators,
     *the call needs to be made for each page separately in order for all the nominators
     *backing a validator to receive the reward. The nominators are not sorted across pages
     *and so it should not be assumed the highest staker would be on the topmost page and vice
     *versa. If rewards are not claimed in [`Config::HistoryDepth`] eras, they are lost.
     */
    "payout_stakers_by_page": Anonymize<Ie6j49utvii126>;
    /**
     *Migrates an account's `RewardDestination::Controller` to
     *`RewardDestination::Account(controller)`.
     *
     *Effects will be felt instantly (as soon as this function is completed successfully).
     *
     *This will waive the transaction fee if the `payee` is successfully migrated.
     */
    "update_payee": Anonymize<I3v6ks33uluhnj>;
    /**
     *Updates a batch of controller accounts to their corresponding stash account if they are
     *not the same. Ignores any controller accounts that do not exist, and does not operate if
     *the stash and controller are already the same.
     *
     *Effects will be felt instantly (as soon as this function is completed successfully).
     *
     *The dispatch origin must be `T::AdminOrigin`.
     */
    "deprecate_controller_batch": Anonymize<I3kiiim1cds68i>;
    /**
     *Restores the state of a ledger which is in an inconsistent state.
     *
     *The requirements to restore a ledger are the following:
     ** The stash is bonded; or
     ** The stash is not bonded but it has a staking lock left behind; or
     ** If the stash has an associated ledger and its state is inconsistent; or
     ** If the ledger is not corrupted *but* its staking lock is out of sync.
     *
     *The `maybe_*` input parameters will overwrite the corresponding data and metadata of the
     *ledger associated with the stash. If the input parameters are not set, the ledger will
     *be reset values from on-chain state.
     */
    "restore_ledger": Anonymize<I4k60mkh2r6jjg>;
    /**
     *Removes the legacy Staking locks if they exist.
     *
     *This removes the legacy lock on the stake with [`Config::OldCurrency`] and creates a
     *hold on it if needed. If all stake cannot be held, the best effort is made to hold as
     *much as possible. The remaining stake is forced withdrawn from the ledger.
     *
     *The fee is waived if the migration is successful.
     */
    "migrate_currency": Anonymize<Idl3umm12u5pa>;
    /**
     *This function allows governance to manually slash a validator and is a
     ***fallback mechanism**.
     *
     *The dispatch origin must be `T::AdminOrigin`.
     *
     *## Parameters
     *- `validator_stash` - The stash account of the validator to slash.
     *- `era` - The era in which the validator was in the active set.
     *- `slash_fraction` - The percentage of the stake to slash, expressed as a Perbill.
     *
     *## Behavior
     *
     *The slash will be applied using the standard slashing mechanics, respecting the
     *configured `SlashDeferDuration`.
     *
     *This means:
     *- If the validator was already slashed by a higher percentage for the same era, this
     *  slash will have no additional effect.
     *- If the validator was previously slashed by a lower percentage, only the difference
     *  will be applied.
     *- The slash will be deferred by `SlashDeferDuration` eras before being enacted.
     */
    "manual_slash": Anonymize<Ic5njrpnvi3f8g>;
}>;
export type Ic5njrpnvi3f8g = {
    "validator_stash": SS58String;
    "era": number;
    "slash_fraction": number;
};
export type I8qsbn37sql1ok = AnonymousEnum<{
    /**
     *Send a batch of dispatch calls.
     *
     *May be called from any origin except `None`.
     *
     *- `calls`: The calls to be dispatched from the same origin. The number of call must not
     *  exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     *If origin is root then the calls are dispatched without checking origin filter. (This
     *includes bypassing `frame_system::Config::BaseCallFilter`).
     *
     *## Complexity
     *- O(C) where C is the number of calls to be batched.
     *
     *This will return `Ok` in all circumstances. To determine the success of the batch, an
     *event is deposited. If a call failed and the batch was interrupted, then the
     *`BatchInterrupted` event is deposited, along with the number of successful calls made
     *and the error of the failed call. If all were successful, then the `BatchCompleted`
     *event is deposited.
     */
    "batch": Anonymize<I899s3bea07uhp>;
    /**
     *Send a call through an indexed pseudonym of the sender.
     *
     *Filter from origin are passed along. The call will be dispatched with an origin which
     *use the same filter as the origin of this call.
     *
     *NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
     *because you expect `proxy` to have been used prior in the call stack and you do not want
     *the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
     *in the Multisig pallet instead.
     *
     *NOTE: Prior to version *12, this was called `as_limited_sub`.
     *
     *The dispatch origin for this call must be _Signed_.
     */
    "as_derivative": Anonymize<Ien4lr4fudcv6n>;
    /**
     *Send a batch of dispatch calls and atomically execute them.
     *The whole transaction will rollback and fail if any of the calls failed.
     *
     *May be called from any origin except `None`.
     *
     *- `calls`: The calls to be dispatched from the same origin. The number of call must not
     *  exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     *If origin is root then the calls are dispatched without checking origin filter. (This
     *includes bypassing `frame_system::Config::BaseCallFilter`).
     *
     *## Complexity
     *- O(C) where C is the number of calls to be batched.
     */
    "batch_all": Anonymize<I899s3bea07uhp>;
    /**
     *Dispatches a function call with a provided origin.
     *
     *The dispatch origin for this call must be _Root_.
     *
     *## Complexity
     *- O(1).
     */
    "dispatch_as": Anonymize<If4vg1nqgsug9f>;
    /**
     *Send a batch of dispatch calls.
     *Unlike `batch`, it allows errors and won't interrupt.
     *
     *May be called from any origin except `None`.
     *
     *- `calls`: The calls to be dispatched from the same origin. The number of call must not
     *  exceed the constant: `batched_calls_limit` (available in constant metadata).
     *
     *If origin is root then the calls are dispatch without checking origin filter. (This
     *includes bypassing `frame_system::Config::BaseCallFilter`).
     *
     *## Complexity
     *- O(C) where C is the number of calls to be batched.
     */
    "force_batch": Anonymize<I899s3bea07uhp>;
    /**
     *Dispatch a function call with a specified weight.
     *
     *This function does not check the weight of the call, and instead allows the
     *Root origin to specify the weight of the call.
     *
     *The dispatch origin for this call must be _Root_.
     */
    "with_weight": Anonymize<I8jelntdlnkiac>;
    /**
     *Dispatch a fallback call in the event the main call fails to execute.
     *May be called from any origin except `None`.
     *
     *This function first attempts to dispatch the `main` call.
     *If the `main` call fails, the `fallback` is attemted.
     *if the fallback is successfully dispatched, the weights of both calls
     *are accumulated and an event containing the main call error is deposited.
     *
     *In the event of a fallback failure the whole call fails
     *with the weights returned.
     *
     *- `main`: The main call to be dispatched. This is the primary action to execute.
     *- `fallback`: The fallback call to be dispatched in case the `main` call fails.
     *
     *## Dispatch Logic
     *- If the origin is `root`, both the main and fallback calls are executed without
     *  applying any origin filters.
     *- If the origin is not `root`, the origin filter is applied to both the `main` and
     *  `fallback` calls.
     *
     *## Use Case
     *- Some use cases might involve submitting a `batch` type call in either main, fallback
     *  or both.
     */
    "if_else": Anonymize<I744ski63ogn94>;
    /**
     *Dispatches a function call with a provided origin.
     *
     *Almost the same as [`Pallet::dispatch_as`] but forwards any error of the inner call.
     *
     *The dispatch origin for this call must be _Root_.
     */
    "dispatch_as_fallible": Anonymize<If4vg1nqgsug9f>;
}>;
export type I899s3bea07uhp = {
    "calls": Anonymize<I2piathv886kr8>;
};
export type I2piathv886kr8 = Array<TxCallData>;
export type Ien4lr4fudcv6n = {
    "index": number;
    "call": TxCallData;
};
export type If4vg1nqgsug9f = {
    "as_origin": Anonymize<I16qqgglq4ega1>;
    "call": TxCallData;
};
export type I8jelntdlnkiac = {
    "call": TxCallData;
    "weight": Anonymize<I4q39t5hn830vp>;
};
export type I744ski63ogn94 = {
    "main": TxCallData;
    "fallback": TxCallData;
};
export type Iceqdqk5ub0l9g = AnonymousEnum<{
    /**
     *Add a registrar to the system.
     *
     *The dispatch origin for this call must be `T::RegistrarOrigin`.
     *
     *- `account`: the account of the registrar.
     *
     *Emits `RegistrarAdded` if successful.
     */
    "add_registrar": Anonymize<Ic6cqd9g0t65v0>;
    /**
     *Set an account's identity information and reserve the appropriate deposit.
     *
     *If the account already has identity information, the deposit is taken as part payment
     *for the new deposit.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `info`: The identity information.
     *
     *Emits `IdentitySet` if successful.
     */
    "set_identity": Anonymize<I2kds5jji7slh8>;
    /**
     *Set the sub-accounts of the sender.
     *
     *Payment: Any aggregate balance reserved by previous `set_subs` calls will be returned
     *and an amount `SubAccountDeposit` will be reserved for each item in `subs`.
     *
     *The dispatch origin for this call must be _Signed_ and the sender must have a registered
     *identity.
     *
     *- `subs`: The identity's (new) sub-accounts.
     */
    "set_subs": Anonymize<Ia9mkdf6l44shb>;
    /**
     *Clear an account's identity info and all sub-accounts and return all deposits.
     *
     *Payment: All reserved balances on the account are returned.
     *
     *The dispatch origin for this call must be _Signed_ and the sender must have a registered
     *identity.
     *
     *Emits `IdentityCleared` if successful.
     */
    "clear_identity": undefined;
    /**
     *Request a judgement from a registrar.
     *
     *Payment: At most `max_fee` will be reserved for payment to the registrar if judgement
     *given.
     *
     *The dispatch origin for this call must be _Signed_ and the sender must have a
     *registered identity.
     *
     *- `reg_index`: The index of the registrar whose judgement is requested.
     *- `max_fee`: The maximum fee that may be paid. This should just be auto-populated as:
     *
     *```nocompile
     *Registrars::<T>::get().get(reg_index).unwrap().fee
     *```
     *
     *Emits `JudgementRequested` if successful.
     */
    "request_judgement": Anonymize<I9l2s4klu0831o>;
    /**
     *Cancel a previous request.
     *
     *Payment: A previously reserved deposit is returned on success.
     *
     *The dispatch origin for this call must be _Signed_ and the sender must have a
     *registered identity.
     *
     *- `reg_index`: The index of the registrar whose judgement is no longer requested.
     *
     *Emits `JudgementUnrequested` if successful.
     */
    "cancel_request": Anonymize<I2ctrt5nqb8o7c>;
    /**
     *Set the fee required for a judgement to be requested from a registrar.
     *
     *The dispatch origin for this call must be _Signed_ and the sender must be the account
     *of the registrar whose index is `index`.
     *
     *- `index`: the index of the registrar whose fee is to be set.
     *- `fee`: the new fee.
     */
    "set_fee": Anonymize<I711qahikocb1c>;
    /**
     *Change the account associated with a registrar.
     *
     *The dispatch origin for this call must be _Signed_ and the sender must be the account
     *of the registrar whose index is `index`.
     *
     *- `index`: the index of the registrar whose fee is to be set.
     *- `new`: the new account ID.
     */
    "set_account_id": Anonymize<I6o1er683vod1j>;
    /**
     *Set the field information for a registrar.
     *
     *The dispatch origin for this call must be _Signed_ and the sender must be the account
     *of the registrar whose index is `index`.
     *
     *- `index`: the index of the registrar whose fee is to be set.
     *- `fields`: the fields that the registrar concerns themselves with.
     */
    "set_fields": Anonymize<Id6gojh30v9ib2>;
    /**
     *Provide a judgement for an account's identity.
     *
     *The dispatch origin for this call must be _Signed_ and the sender must be the account
     *of the registrar whose index is `reg_index`.
     *
     *- `reg_index`: the index of the registrar whose judgement is being made.
     *- `target`: the account whose identity the judgement is upon. This must be an account
     *  with a registered identity.
     *- `judgement`: the judgement of the registrar of index `reg_index` about `target`.
     *- `identity`: The hash of the [`IdentityInformationProvider`] for that the judgement is
     *  provided.
     *
     *Note: Judgements do not apply to a username.
     *
     *Emits `JudgementGiven` if successful.
     */
    "provide_judgement": Anonymize<Ide1bahhh47lj9>;
    /**
     *Remove an account's identity and sub-account information and slash the deposits.
     *
     *Payment: Reserved balances from `set_subs` and `set_identity` are slashed and handled by
     *`Slash`. Verification request deposits are not returned; they should be cancelled
     *manually using `cancel_request`.
     *
     *The dispatch origin for this call must match `T::ForceOrigin`.
     *
     *- `target`: the account whose identity the judgement is upon. This must be an account
     *  with a registered identity.
     *
     *Emits `IdentityKilled` if successful.
     */
    "kill_identity": Anonymize<Id9uqtigc0il3v>;
    /**
     *Add the given account to the sender's subs.
     *
     *Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
     *to the sender.
     *
     *The dispatch origin for this call must be _Signed_ and the sender must have a registered
     *sub identity of `sub`.
     */
    "add_sub": Anonymize<Ic68lsi7chpv5k>;
    /**
     *Alter the associated name of the given sub-account.
     *
     *The dispatch origin for this call must be _Signed_ and the sender must have a registered
     *sub identity of `sub`.
     */
    "rename_sub": Anonymize<Ic68lsi7chpv5k>;
    /**
     *Remove the given account from the sender's subs.
     *
     *Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
     *to the sender.
     *
     *The dispatch origin for this call must be _Signed_ and the sender must have a registered
     *sub identity of `sub`.
     */
    "remove_sub": Anonymize<Iek0boln8pgnko>;
    /**
     *Remove the sender as a sub-account.
     *
     *Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
     *to the sender (*not* the original depositor).
     *
     *The dispatch origin for this call must be _Signed_ and the sender must have a registered
     *super-identity.
     *
     *NOTE: This should not normally be used, but is provided in the case that the non-
     *controller of an account is maliciously registered as a sub-account.
     */
    "quit_sub": undefined;
    /**
     *Add an `AccountId` with permission to grant usernames with a given `suffix` appended.
     *
     *The authority can grant up to `allocation` usernames. To top up the allocation or
     *change the account used to grant usernames, this call can be used with the updated
     *parameters to overwrite the existing configuration.
     */
    "add_username_authority": Anonymize<I452bkd71b385t>;
    /**
     *Remove `authority` from the username authorities.
     */
    "remove_username_authority": Anonymize<Ie83f0p0ke1f4u>;
    /**
     *Set the username for `who`. Must be called by a username authority.
     *
     *If `use_allocation` is set, the authority must have a username allocation available to
     *spend. Otherwise, the authority will need to put up a deposit for registering the
     *username.
     *
     *Users can either pre-sign their usernames or
     *accept them later.
     *
     *Usernames must:
     *  - Only contain lowercase ASCII characters or digits.
     *  - When combined with the suffix of the issuing authority be _less than_ the
     *    `MaxUsernameLength`.
     */
    "set_username_for": Anonymize<I93hi4ed10h5sc>;
    /**
     *Accept a given username that an `authority` granted. The call must include the full
     *username, as in `username.suffix`.
     */
    "accept_username": Anonymize<Ie5l999tf7t2te>;
    /**
     *Remove an expired username approval. The username was approved by an authority but never
     *accepted by the user and must now be beyond its expiration. The call must include the
     *full username, as in `username.suffix`.
     */
    "remove_expired_approval": Anonymize<Ie5l999tf7t2te>;
    /**
     *Set a given username as the primary. The username should include the suffix.
     */
    "set_primary_username": Anonymize<Ie5l999tf7t2te>;
    /**
     *Start the process of removing a username by placing it in the unbinding usernames map.
     *Once the grace period has passed, the username can be deleted by calling
     *[remove_username](crate::Call::remove_username).
     */
    "unbind_username": Anonymize<Ie5l999tf7t2te>;
    /**
     *Permanently delete a username which has been unbinding for longer than the grace period.
     *Caller is refunded the fee if the username expired and the removal was successful.
     */
    "remove_username": Anonymize<Ie5l999tf7t2te>;
    /**
     *Call with [ForceOrigin](crate::Config::ForceOrigin) privileges which deletes a username
     *and slashes any deposit associated with it.
     */
    "kill_username": Anonymize<Ie5l999tf7t2te>;
}>;
export type I2kds5jji7slh8 = {
    "info": Anonymize<I1o57snqt6f4v5>;
};
export type Ia9mkdf6l44shb = {
    "subs": Anonymize<I2ugvgusn08dsq>;
};
export type I2ugvgusn08dsq = Array<Anonymize<I910puuahutflf>>;
export type I9l2s4klu0831o = {
    "reg_index": number;
    "max_fee": bigint;
};
export type I2ctrt5nqb8o7c = {
    "reg_index": number;
};
export type I711qahikocb1c = {
    "index": number;
    "fee": bigint;
};
export type Id6gojh30v9ib2 = {
    "index": number;
    "fields": bigint;
};
export type Ide1bahhh47lj9 = {
    "reg_index": number;
    "target": MultiAddress;
    "judgement": Anonymize<IdentityJudgement>;
    "identity": FixedSizeBinary<32>;
};
export type Ic68lsi7chpv5k = {
    "sub": MultiAddress;
    "data": Anonymize<IdentityData>;
};
export type Iek0boln8pgnko = {
    "sub": MultiAddress;
};
export type I452bkd71b385t = {
    "authority": MultiAddress;
    "suffix": Binary;
    "allocation": number;
};
export type Ie83f0p0ke1f4u = {
    "suffix": Binary;
    "authority": MultiAddress;
};
export type I93hi4ed10h5sc = {
    "who": MultiAddress;
    "username": Binary;
    "signature"?: Anonymize<I86cdjmsf3a81s>;
    "use_allocation": boolean;
};
export type Ibk5qisar4o6r6 = AnonymousEnum<{
    /**
     *Send a call through a recovered account.
     *
     *The dispatch origin for this call must be _Signed_ and registered to
     *be able to make calls on behalf of the recovered account.
     *
     *Parameters:
     *- `account`: The recovered account you want to make a call on-behalf-of.
     *- `call`: The call you want to make with the recovered account.
     */
    "as_recovered": Anonymize<I56lg8bnrufikk>;
    /**
     *Allow ROOT to bypass the recovery process and set a rescuer account
     *for a lost account directly.
     *
     *The dispatch origin for this call must be _ROOT_.
     *
     *Parameters:
     *- `lost`: The "lost account" to be recovered.
     *- `rescuer`: The "rescuer account" which can call as the lost account.
     */
    "set_recovered": Anonymize<I7pqmhr25d3dqq>;
    /**
     *Create a recovery configuration for your account. This makes your account recoverable.
     *
     *Payment: `ConfigDepositBase` + `FriendDepositFactor` * #_of_friends balance
     *will be reserved for storing the recovery configuration. This deposit is returned
     *in full when the user calls `remove_recovery`.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `friends`: A list of friends you trust to vouch for recovery attempts. Should be
     *  ordered and contain no duplicate values.
     *- `threshold`: The number of friends that must vouch for a recovery attempt before the
     *  account can be recovered. Should be less than or equal to the length of the list of
     *  friends.
     *- `delay_period`: The number of blocks after a recovery attempt is initialized that
     *  needs to pass before the account can be recovered.
     */
    "create_recovery": Anonymize<I6s6ihmfj6j5qq>;
    /**
     *Initiate the process for recovering a recoverable account.
     *
     *Payment: `RecoveryDeposit` balance will be reserved for initiating the
     *recovery process. This deposit will always be repatriated to the account
     *trying to be recovered. See `close_recovery`.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `account`: The lost account that you want to recover. This account needs to be
     *  recoverable (i.e. have a recovery configuration).
     */
    "initiate_recovery": Anonymize<Ic6cqd9g0t65v0>;
    /**
     *Allow a "friend" of a recoverable account to vouch for an active recovery
     *process for that account.
     *
     *The dispatch origin for this call must be _Signed_ and must be a "friend"
     *for the recoverable account.
     *
     *Parameters:
     *- `lost`: The lost account that you want to recover.
     *- `rescuer`: The account trying to rescue the lost account that you want to vouch for.
     *
     *The combination of these two parameters must point to an active recovery
     *process.
     */
    "vouch_recovery": Anonymize<I7pqmhr25d3dqq>;
    /**
     *Allow a successful rescuer to claim their recovered account.
     *
     *The dispatch origin for this call must be _Signed_ and must be a "rescuer"
     *who has successfully completed the account recovery process: collected
     *`threshold` or more vouches, waited `delay_period` blocks since initiation.
     *
     *Parameters:
     *- `account`: The lost account that you want to claim has been successfully recovered by
     *  you.
     */
    "claim_recovery": Anonymize<Ic6cqd9g0t65v0>;
    /**
     *As the controller of a recoverable account, close an active recovery
     *process for your account.
     *
     *Payment: By calling this function, the recoverable account will receive
     *the recovery deposit `RecoveryDeposit` placed by the rescuer.
     *
     *The dispatch origin for this call must be _Signed_ and must be a
     *recoverable account with an active recovery process for it.
     *
     *Parameters:
     *- `rescuer`: The account trying to rescue this recoverable account.
     */
    "close_recovery": Anonymize<I7ka1pdlbuevh2>;
    /**
     *Remove the recovery process for your account. Recovered accounts are still accessible.
     *
     *NOTE: The user must make sure to call `close_recovery` on all active
     *recovery attempts before calling this function else it will fail.
     *
     *Payment: By calling this function the recoverable account will unreserve
     *their recovery configuration deposit.
     *(`ConfigDepositBase` + `FriendDepositFactor` * #_of_friends)
     *
     *The dispatch origin for this call must be _Signed_ and must be a
     *recoverable account (i.e. has a recovery configuration).
     */
    "remove_recovery": undefined;
    /**
     *Cancel the ability to use `as_recovered` for `account`.
     *
     *The dispatch origin for this call must be _Signed_ and registered to
     *be able to make calls on behalf of the recovered account.
     *
     *Parameters:
     *- `account`: The recovered account you are able to call on-behalf-of.
     */
    "cancel_recovered": Anonymize<Ic6cqd9g0t65v0>;
    /**
     *Poke deposits for recovery configurations and / or active recoveries.
     *
     *This can be used by accounts to possibly lower their locked amount.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `maybe_account`: Optional recoverable account for which you have an active recovery
     *and want to adjust the deposit for the active recovery.
     *
     *This function checks both recovery configuration deposit and active recovery deposits
     *of the caller:
     *- If the caller has created a recovery configuration, checks and adjusts its deposit
     *- If the caller has initiated any active recoveries, and provides the account in
     *`maybe_account`, checks and adjusts those deposits
     *
     *If any deposit is updated, the difference will be reserved/unreserved from the caller's
     *account.
     *
     *The transaction is made free if any deposit is updated and paid otherwise.
     *
     *Emits `DepositPoked` if any deposit is updated.
     *Multiple events may be emitted in case both types of deposits are updated.
     */
    "poke_deposit": Anonymize<I6i4uaqurusjdc>;
}>;
export type I56lg8bnrufikk = {
    "account": MultiAddress;
    "call": TxCallData;
};
export type I6i4uaqurusjdc = {
    "maybe_account"?: Anonymize<Ia0jlc0rcbskuk>;
};
export type Ia0jlc0rcbskuk = (MultiAddress) | undefined;
export type Iebqh6d4fbufno = AnonymousEnum<{
    /**
     *Anonymously schedule a task.
     */
    "schedule": Anonymize<I4b0ab4u33u43u>;
    /**
     *Cancel an anonymously scheduled task.
     */
    "cancel": Anonymize<I5n4sebgkfr760>;
    /**
     *Schedule a named task.
     */
    "schedule_named": Anonymize<I1ac18p6pjahv9>;
    /**
     *Cancel a named scheduled task.
     */
    "cancel_named": Anonymize<Ifs1i5fk9cqvr6>;
    /**
     *Anonymously schedule a task after a delay.
     */
    "schedule_after": Anonymize<I80ht5q6a46692>;
    /**
     *Schedule a named task after a delay.
     */
    "schedule_named_after": Anonymize<I8lqgni993i7d9>;
    /**
     *Set a retry configuration for a task so that, in case its scheduled run fails, it will
     *be retried after `period` blocks, for a total amount of `retries` retries or until it
     *succeeds.
     *
     *Tasks which need to be scheduled for a retry are still subject to weight metering and
     *agenda space, same as a regular task. If a periodic task fails, it will be scheduled
     *normally while the task is retrying.
     *
     *Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
     *clones of the original task. Their retry configuration will be derived from the
     *original task's configuration, but will have a lower value for `remaining` than the
     *original `total_retries`.
     */
    "set_retry": Anonymize<Ieg3fd8p4pkt10>;
    /**
     *Set a retry configuration for a named task so that, in case its scheduled run fails, it
     *will be retried after `period` blocks, for a total amount of `retries` retries or until
     *it succeeds.
     *
     *Tasks which need to be scheduled for a retry are still subject to weight metering and
     *agenda space, same as a regular task. If a periodic task fails, it will be scheduled
     *normally while the task is retrying.
     *
     *Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
     *clones of the original task. Their retry configuration will be derived from the
     *original task's configuration, but will have a lower value for `remaining` than the
     *original `total_retries`.
     */
    "set_retry_named": Anonymize<I8kg5ll427kfqq>;
    /**
     *Removes the retry configuration of a task.
     */
    "cancel_retry": Anonymize<I467333262q1l9>;
    /**
     *Cancel the retry configuration of a named task.
     */
    "cancel_retry_named": Anonymize<Ifs1i5fk9cqvr6>;
}>;
export type I4b0ab4u33u43u = {
    "when": number;
    "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
    "priority": number;
    "call": TxCallData;
};
export type I1ac18p6pjahv9 = {
    "id": FixedSizeBinary<32>;
    "when": number;
    "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
    "priority": number;
    "call": TxCallData;
};
export type I80ht5q6a46692 = {
    "after": number;
    "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
    "priority": number;
    "call": TxCallData;
};
export type I8lqgni993i7d9 = {
    "id": FixedSizeBinary<32>;
    "after": number;
    "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
    "priority": number;
    "call": TxCallData;
};
export type If5toncvhh6qq3 = AnonymousEnum<{
    /**
     *Authenticates the sudo key and dispatches a function call with `Root` origin.
     */
    "sudo": Anonymize<If1sr4hm0el5a0>;
    /**
     *Authenticates the sudo key and dispatches a function call with `Root` origin.
     *This function does not check the weight of the call, and instead allows the
     *Sudo user to specify the weight of the call.
     *
     *The dispatch origin for this call must be _Signed_.
     */
    "sudo_unchecked_weight": Anonymize<I8jelntdlnkiac>;
    /**
     *Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
     *key.
     */
    "set_key": Anonymize<I8k3rnvpeeh4hv>;
    /**
     *Authenticates the sudo key and dispatches a function call with `Signed` origin from
     *a given account.
     *
     *The dispatch origin for this call must be _Signed_.
     */
    "sudo_as": Anonymize<I5n05n33uogjb5>;
    /**
     *Permanently removes the sudo key.
     *
     ***This cannot be un-done.**
     */
    "remove_key": undefined;
}>;
export type If1sr4hm0el5a0 = {
    "call": TxCallData;
};
export type I5n05n33uogjb5 = {
    "who": MultiAddress;
    "call": TxCallData;
};
export type I3v66ec718b74 = AnonymousEnum<{
    /**
     *Dispatch the given `call` from an account that the sender is authorised for through
     *`add_proxy`.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `real`: The account that the proxy will make a call on behalf of.
     *- `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *- `call`: The call to be made by the `real` account.
     */
    "proxy": Anonymize<Ifbgj6kc27nn2q>;
    /**
     *Register a proxy account for the sender that is able to make calls on its behalf.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `proxy`: The account that the `caller` would like to make a proxy.
     *- `proxy_type`: The permissions allowed for this proxy account.
     *- `delay`: The announcement period required of the initial proxy. Will generally be
     *zero.
     */
    "add_proxy": Anonymize<Ie41rr3emcpt2k>;
    /**
     *Unregister a proxy account for the sender.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `proxy`: The account that the `caller` would like to remove as a proxy.
     *- `proxy_type`: The permissions currently enabled for the removed proxy account.
     */
    "remove_proxy": Anonymize<Ie41rr3emcpt2k>;
    /**
     *Unregister all proxy accounts for the sender.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *WARNING: This may be called on accounts created by `create_pure`, however if done, then
     *the unreserved fees will be inaccessible. **All access to this account will be lost.**
     */
    "remove_proxies": undefined;
    /**
     *Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
     *initialize it with a proxy of `proxy_type` for `origin` sender.
     *
     *Requires a `Signed` origin.
     *
     *- `proxy_type`: The type of the proxy that the sender will be registered as over the
     *new account. This will almost always be the most permissive `ProxyType` possible to
     *allow for maximum flexibility.
     *- `index`: A disambiguation index, in case this is called multiple times in the same
     *transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
     *want to use `0`.
     *- `delay`: The announcement period required of the initial proxy. Will generally be
     *zero.
     *
     *Fails with `Duplicate` if this has already been called in this transaction, from the
     *same sender, with the same parameters.
     *
     *Fails if there are insufficient funds to pay for deposit.
     */
    "create_pure": Anonymize<I9tuav8vvj7joi>;
    /**
     *Removes a previously spawned pure proxy.
     *
     *WARNING: **All access to this account will be lost.** Any funds held in it will be
     *inaccessible.
     *
     *Requires a `Signed` origin, and the sender account must have been created by a call to
     *`create_pure` with corresponding parameters.
     *
     *- `spawner`: The account that originally called `create_pure` to create this account.
     *- `index`: The disambiguation index originally passed to `create_pure`. Probably `0`.
     *- `proxy_type`: The proxy type originally passed to `create_pure`.
     *- `height`: The height of the chain when the call to `create_pure` was processed.
     *- `ext_index`: The extrinsic index in which the call to `create_pure` was processed.
     *
     *Fails with `NoPermission` in case the caller is not a previously created pure
     *account whose `create_pure` call has corresponding parameters.
     */
    "kill_pure": Anonymize<Idp4no4hd72mhv>;
    /**
     *Publish the hash of a proxy-call that will be made in the future.
     *
     *This must be called some number of blocks before the corresponding `proxy` is attempted
     *if the delay associated with the proxy relationship is greater than zero.
     *
     *No more than `MaxPending` announcements may be made at any one time.
     *
     *This will take a deposit of `AnnouncementDepositFactor` as well as
     *`AnnouncementDepositBase` if there are no other pending announcements.
     *
     *The dispatch origin for this call must be _Signed_ and a proxy of `real`.
     *
     *Parameters:
     *- `real`: The account that the proxy will make a call on behalf of.
     *- `call_hash`: The hash of the call to be made by the `real` account.
     */
    "announce": Anonymize<I2eb501t8s6hsq>;
    /**
     *Remove a given announcement.
     *
     *May be called by a proxy account to remove a call they previously announced and return
     *the deposit.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `real`: The account that the proxy will make a call on behalf of.
     *- `call_hash`: The hash of the call to be made by the `real` account.
     */
    "remove_announcement": Anonymize<I2eb501t8s6hsq>;
    /**
     *Remove the given announcement of a delegate.
     *
     *May be called by a target (proxied) account to remove a call that one of their delegates
     *(`delegate`) has announced they want to execute. The deposit is returned.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `delegate`: The account that previously announced the call.
     *- `call_hash`: The hash of the call to be made.
     */
    "reject_announcement": Anonymize<Ianmuoljk2sk1u>;
    /**
     *Dispatch the given `call` from an account that the sender is authorized for through
     *`add_proxy`.
     *
     *Removes any corresponding announcement(s).
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *Parameters:
     *- `real`: The account that the proxy will make a call on behalf of.
     *- `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
     *- `call`: The call to be made by the `real` account.
     */
    "proxy_announced": Anonymize<I9ogfrmgl88pdb>;
    /**
     *Poke / Adjust deposits made for proxies and announcements based on current values.
     *This can be used by accounts to possibly lower their locked amount.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *The transaction fee is waived if the deposit amount has changed.
     *
     *Emits `DepositPoked` if successful.
     */
    "poke_deposit": undefined;
}>;
export type Ifbgj6kc27nn2q = {
    "real": MultiAddress;
    "force_proxy_type"?: Anonymize<If6gdn1v27431a>;
    "call": TxCallData;
};
export type If6gdn1v27431a = (Anonymize<I4usd2cn59lcla>) | undefined;
export type Ie41rr3emcpt2k = {
    "delegate": MultiAddress;
    "proxy_type": Anonymize<I4usd2cn59lcla>;
    "delay": number;
};
export type I9tuav8vvj7joi = {
    "proxy_type": Anonymize<I4usd2cn59lcla>;
    "delay": number;
    "index": number;
};
export type Idp4no4hd72mhv = {
    "spawner": MultiAddress;
    "proxy_type": Anonymize<I4usd2cn59lcla>;
    "index": number;
    "height": number;
    "ext_index": number;
};
export type I9ogfrmgl88pdb = {
    "delegate": MultiAddress;
    "real": MultiAddress;
    "force_proxy_type"?: Anonymize<If6gdn1v27431a>;
    "call": TxCallData;
};
export type I9kltligh4o9qg = AnonymousEnum<{
    /**
     *Immediately dispatch a multi-signature call using a single approval from the caller.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `other_signatories`: The accounts (other than the sender) who are part of the
     *multi-signature, but do not participate in the approval process.
     *- `call`: The call to be executed.
     *
     *Result is equivalent to the dispatched result.
     *
     *## Complexity
     *O(Z + C) where Z is the length of the call and C its execution weight.
     */
    "as_multi_threshold_1": Anonymize<I23foj0lhdkppt>;
    /**
     *Register approval for a dispatch to be made from a deterministic composite account if
     *approved by a total of `threshold - 1` of `other_signatories`.
     *
     *If there are enough, then dispatch the call.
     *
     *Payment: `DepositBase` will be reserved if this is the first approval, plus
     *`threshold` times `DepositFactor`. It is returned once this dispatch happens or
     *is cancelled.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `threshold`: The total number of approvals for this dispatch before it is executed.
     *- `other_signatories`: The accounts (other than the sender) who can approve this
     *dispatch. May not be empty.
     *- `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
     *not the first approval, then it must be `Some`, with the timepoint (block number and
     *transaction index) of the first approval transaction.
     *- `call`: The call to be executed.
     *
     *NOTE: Unless this is the final approval, you will generally want to use
     *`approve_as_multi` instead, since it only requires a hash of the call.
     *
     *Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
     *on success, result is `Ok` and the result from the interior call, if it was executed,
     *may be found in the deposited `MultisigExecuted` event.
     *
     *## Complexity
     *- `O(S + Z + Call)`.
     *- Up to one balance-reserve or unreserve operation.
     *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
     *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     *- One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
     *- One encode & hash, both of complexity `O(S)`.
     *- Up to one binary search and insert (`O(logS + S)`).
     *- I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
     *- One event.
     *- The weight of the `call`.
     *- Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
     *  taken for its lifetime of `DepositBase + threshold * DepositFactor`.
     */
    "as_multi": Anonymize<Ic45kejcb5v86h>;
    /**
     *Register approval for a dispatch to be made from a deterministic composite account if
     *approved by a total of `threshold - 1` of `other_signatories`.
     *
     *Payment: `DepositBase` will be reserved if this is the first approval, plus
     *`threshold` times `DepositFactor`. It is returned once this dispatch happens or
     *is cancelled.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `threshold`: The total number of approvals for this dispatch before it is executed.
     *- `other_signatories`: The accounts (other than the sender) who can approve this
     *dispatch. May not be empty.
     *- `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
     *not the first approval, then it must be `Some`, with the timepoint (block number and
     *transaction index) of the first approval transaction.
     *- `call_hash`: The hash of the call to be executed.
     *
     *NOTE: If this is the final approval, you will want to use `as_multi` instead.
     *
     *## Complexity
     *- `O(S)`.
     *- Up to one balance-reserve or unreserve operation.
     *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
     *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     *- One encode & hash, both of complexity `O(S)`.
     *- Up to one binary search and insert (`O(logS + S)`).
     *- I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
     *- One event.
     *- Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
     *  taken for its lifetime of `DepositBase + threshold * DepositFactor`.
     */
    "approve_as_multi": Anonymize<Ideaemvoneh309>;
    /**
     *Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
     *for this operation will be unreserved on success.
     *
     *The dispatch origin for this call must be _Signed_.
     *
     *- `threshold`: The total number of approvals for this dispatch before it is executed.
     *- `other_signatories`: The accounts (other than the sender) who can approve this
     *dispatch. May not be empty.
     *- `timepoint`: The timepoint (block number and transaction index) of the first approval
     *transaction for this dispatch.
     *- `call_hash`: The hash of the call to be executed.
     *
     *## Complexity
     *- `O(S)`.
     *- Up to one balance-reserve or unreserve operation.
     *- One passthrough operation, one insert, both `O(S)` where `S` is the number of
     *  signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     *- One encode & hash, both of complexity `O(S)`.
     *- One event.
     *- I/O: 1 read `O(S)`, one remove.
     *- Storage: removes one item.
     */
    "cancel_as_multi": Anonymize<I3d9o9d7epp66v>;
    /**
     *Poke the deposit reserved for an existing multisig operation.
     *
     *The dispatch origin for this call must be _Signed_ and must be the original depositor of
     *the multisig operation.
     *
     *The transaction fee is waived if the deposit amount has changed.
     *
     *- `threshold`: The total number of approvals needed for this multisig.
     *- `other_signatories`: The accounts (other than the sender) who are part of the
     *  multisig.
     *- `call_hash`: The hash of the call this deposit is reserved for.
     *
     *Emits `DepositPoked` if successful.
     */
    "poke_deposit": Anonymize<I6lqh1vgb4mcja>;
}>;
export type I23foj0lhdkppt = {
    "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
    "call": TxCallData;
};
export type Ic45kejcb5v86h = {
    "threshold": number;
    "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
    "maybe_timepoint"?: Anonymize<I95jfd8j5cr5eh>;
    "call": TxCallData;
    "max_weight": Anonymize<I4q39t5hn830vp>;
};
export type I6lqh1vgb4mcja = {
    "threshold": number;
    "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
    "call_hash": FixedSizeBinary<32>;
};
export type I8j8o3a9ron2ol = AnonymousEnum<{
    /**
     *Submit a solution for the unsigned phase.
     *
     *The dispatch origin fo this call must be __none__.
     *
     *This submission is checked on the fly. Moreover, this unsigned solution is only
     *validated when submitted to the pool from the **local** node. Effectively, this means
     *that only active validators can submit this transaction when authoring a block (similar
     *to an inherent).
     *
     *To prevent any incorrect solution (and thus wasted time/weight), this transaction will
     *panic if the solution submitted by the validator is invalid in any way, effectively
     *putting their authoring reward at risk.
     *
     *No deposit or reward is associated with this submission.
     */
    "submit_unsigned": Anonymize<I31k9f0jol8ko4>;
    /**
     *Set a new value for `MinimumUntrustedScore`.
     *
     *Dispatch origin must be aligned with `T::ForceOrigin`.
     *
     *This check can be turned off by setting the value to `None`.
     */
    "set_minimum_untrusted_score": Anonymize<I80q14um2s2ckg>;
    /**
     *Set a solution in the queue, to be handed out to the client of this pallet in the next
     *call to `ElectionProvider::elect`.
     *
     *This can only be set by `T::ForceOrigin`, and only when the phase is `Emergency`.
     *
     *The solution is not checked for any feasibility and is assumed to be trustworthy, as any
     *feasibility check itself can in principle cause the election process to fail (due to
     *memory/weight constrains).
     */
    "set_emergency_election_result": Anonymize<I5qs1t1erfi7u8>;
    /**
     *Submit a solution for the signed phase.
     *
     *The dispatch origin fo this call must be __signed__.
     *
     *The solution is potentially queued, based on the claimed score and processed at the end
     *of the signed phase.
     *
     *A deposit is reserved and recorded for the solution. Based on the outcome, the solution
     *might be rewarded, slashed, or get all or a part of the deposit back.
     */
    "submit": Anonymize<I9et13knvdvgpb>;
    /**
     *Trigger the governance fallback.
     *
     *This can only be called when [`Phase::Emergency`] is enabled, as an alternative to
     *calling [`Call::set_emergency_election_result`].
     */
    "governance_fallback": undefined;
}>;
export type Ieovj1bltne19s = AnonymousEnum<{
    /**
     *Propose a referendum on a privileged action.
     *
     *- `origin`: must be `SubmitOrigin` and the account must have `SubmissionDeposit` funds
     *  available.
     *- `proposal_origin`: The origin from which the proposal should be executed.
     *- `proposal`: The proposal.
     *- `enactment_moment`: The moment that the proposal should be enacted.
     *
     *Emits `Submitted`.
     */
    "submit": Anonymize<Ibkc9utma98lms>;
    /**
     *Post the Decision Deposit for a referendum.
     *
     *- `origin`: must be `Signed` and the account must have funds available for the
     *  referendum's track's Decision Deposit.
     *- `index`: The index of the submitted referendum whose Decision Deposit is yet to be
     *  posted.
     *
     *Emits `DecisionDepositPlaced`.
     */
    "place_decision_deposit": Anonymize<I666bl2fqjkejo>;
    /**
     *Refund the Decision Deposit for a closed referendum back to the depositor.
     *
     *- `origin`: must be `Signed` or `Root`.
     *- `index`: The index of a closed referendum whose Decision Deposit has not yet been
     *  refunded.
     *
     *Emits `DecisionDepositRefunded`.
     */
    "refund_decision_deposit": Anonymize<I666bl2fqjkejo>;
    /**
     *Cancel an ongoing referendum.
     *
     *- `origin`: must be the `CancelOrigin`.
     *- `index`: The index of the referendum to be cancelled.
     *
     *Emits `Cancelled`.
     */
    "cancel": Anonymize<I666bl2fqjkejo>;
    /**
     *Cancel an ongoing referendum and slash the deposits.
     *
     *- `origin`: must be the `KillOrigin`.
     *- `index`: The index of the referendum to be cancelled.
     *
     *Emits `Killed` and `DepositSlashed`.
     */
    "kill": Anonymize<I666bl2fqjkejo>;
    /**
     *Advance a referendum onto its next logical state. Only used internally.
     *
     *- `origin`: must be `Root`.
     *- `index`: the referendum to be advanced.
     */
    "nudge_referendum": Anonymize<I666bl2fqjkejo>;
    /**
     *Advance a track onto its next logical state. Only used internally.
     *
     *- `origin`: must be `Root`.
     *- `track`: the track to be advanced.
     *
     *Action item for when there is now one fewer referendum in the deciding phase and the
     *`DecidingCount` is not yet updated. This means that we should either:
     *- begin deciding another referendum (and leave `DecidingCount` alone); or
     *- decrement `DecidingCount`.
     */
    "one_fewer_deciding": Anonymize<Icbio0e1f0034b>;
    /**
     *Refund the Submission Deposit for a closed referendum back to the depositor.
     *
     *- `origin`: must be `Signed` or `Root`.
     *- `index`: The index of a closed referendum whose Submission Deposit has not yet been
     *  refunded.
     *
     *Emits `SubmissionDepositRefunded`.
     */
    "refund_submission_deposit": Anonymize<I666bl2fqjkejo>;
    /**
     *Set or clear metadata of a referendum.
     *
     *Parameters:
     *- `origin`: Must be `Signed` by a creator of a referendum or by anyone to clear a
     *  metadata of a finished referendum.
     *- `index`:  The index of a referendum to set or clear metadata for.
     *- `maybe_hash`: The hash of an on-chain stored preimage. `None` to clear a metadata.
     */
    "set_metadata": Anonymize<I8c0vkqjjipnuj>;
}>;
export type Ibkc9utma98lms = {
    "proposal_origin": Anonymize<I16qqgglq4ega1>;
    "proposal": PreimagesBounded;
    "enactment_moment": TraitsScheduleDispatchTime;
};
export type I2196kg5h82eoc = AnonymousEnum<{
    "whitelist_call": Anonymize<I1adbcfi5uc62r>;
    "remove_whitelisted_call": Anonymize<I1adbcfi5uc62r>;
    "dispatch_whitelisted_call": Anonymize<Ibf6ucefn8fh49>;
    "dispatch_whitelisted_call_with_preimage": Anonymize<If1sr4hm0el5a0>;
}>;
export type I6jnp85onk3m8j = AnonymousEnum<{
    /**
     *Propose and approve a spend of treasury funds.
     *
     *## Dispatch Origin
     *
     *Must be [`Config::SpendOrigin`] with the `Success` value being at least `amount`.
     *
     *### Details
     *NOTE: For record-keeping purposes, the proposer is deemed to be equivalent to the
     *beneficiary.
     *
     *### Parameters
     *- `amount`: The amount to be transferred from the treasury to the `beneficiary`.
     *- `beneficiary`: The destination account for the transfer.
     *
     *## Events
     *
     *Emits [`Event::SpendApproved`] if successful.
     */
    "spend_local": Anonymize<Icnrv1mfbd3in1>;
    /**
     *Force a previously approved proposal to be removed from the approval queue.
     *
     *## Dispatch Origin
     *
     *Must be [`Config::RejectOrigin`].
     *
     *## Details
     *
     *The original deposit will no longer be returned.
     *
     *### Parameters
     *- `proposal_id`: The index of a proposal
     *
     *### Complexity
     *- O(A) where `A` is the number of approvals
     *
     *### Errors
     *- [`Error::ProposalNotApproved`]: The `proposal_id` supplied was not found in the
     *  approval queue, i.e., the proposal has not been approved. This could also mean the
     *  proposal does not exist altogether, thus there is no way it would have been approved
     *  in the first place.
     */
    "remove_approval": Anonymize<Icm9m0qeemu66d>;
    /**
     *Propose and approve a spend of treasury funds.
     *
     *## Dispatch Origin
     *
     *Must be [`Config::SpendOrigin`] with the `Success` value being at least
     *`amount` of `asset_kind` in the native asset. The amount of `asset_kind` is converted
     *for assertion using the [`Config::BalanceConverter`].
     *
     *## Details
     *
     *Create an approved spend for transferring a specific `amount` of `asset_kind` to a
     *designated beneficiary. The spend must be claimed using the `payout` dispatchable within
     *the [`Config::PayoutPeriod`].
     *
     *### Parameters
     *- `asset_kind`: An indicator of the specific asset class to be spent.
     *- `amount`: The amount to be transferred from the treasury to the `beneficiary`.
     *- `beneficiary`: The beneficiary of the spend.
     *- `valid_from`: The block number from which the spend can be claimed. It can refer to
     *  the past if the resulting spend has not yet expired according to the
     *  [`Config::PayoutPeriod`]. If `None`, the spend can be claimed immediately after
     *  approval.
     *
     *## Events
     *
     *Emits [`Event::AssetSpendApproved`] if successful.
     */
    "spend": Anonymize<I3pnhorh539dti>;
    /**
     *Claim a spend.
     *
     *## Dispatch Origin
     *
     *Must be signed
     *
     *## Details
     *
     *Spends must be claimed within some temporal bounds. A spend may be claimed within one
     *[`Config::PayoutPeriod`] from the `valid_from` block.
     *In case of a payout failure, the spend status must be updated with the `check_status`
     *dispatchable before retrying with the current function.
     *
     *### Parameters
     *- `index`: The spend index.
     *
     *## Events
     *
     *Emits [`Event::Paid`] if successful.
     */
    "payout": Anonymize<I666bl2fqjkejo>;
    /**
     *Check the status of the spend and remove it from the storage if processed.
     *
     *## Dispatch Origin
     *
     *Must be signed.
     *
     *## Details
     *
     *The status check is a prerequisite for retrying a failed payout.
     *If a spend has either succeeded or expired, it is removed from the storage by this
     *function. In such instances, transaction fees are refunded.
     *
     *### Parameters
     *- `index`: The spend index.
     *
     *## Events
     *
     *Emits [`Event::PaymentFailed`] if the spend payout has failed.
     *Emits [`Event::SpendProcessed`] if the spend payout has succeed.
     */
    "check_status": Anonymize<I666bl2fqjkejo>;
    /**
     *Void previously approved spend.
     *
     *## Dispatch Origin
     *
     *Must be [`Config::RejectOrigin`].
     *
     *## Details
     *
     *A spend void is only possible if the payout has not been attempted yet.
     *
     *### Parameters
     *- `index`: The spend index.
     *
     *## Events
     *
     *Emits [`Event::AssetSpendVoided`] if successful.
     */
    "void_spend": Anonymize<I666bl2fqjkejo>;
}>;
export type I3pnhorh539dti = {
    "asset_kind": Anonymize<I2q3ri6itcjj5u>;
    "amount": bigint;
    "beneficiary": XcmVersionedLocation;
    "valid_from"?: Anonymize<I4arjljr6dpflb>;
};
export type I3ah0kpgrv4i88 = AnonymousEnum<{
    /**
     *Set the validation upgrade cooldown.
     */
    "set_validation_upgrade_cooldown": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the validation upgrade delay.
     */
    "set_validation_upgrade_delay": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the acceptance period for an included candidate.
     */
    "set_code_retention_period": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the max validation code size for incoming upgrades.
     */
    "set_max_code_size": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the max POV block size for incoming upgrades.
     */
    "set_max_pov_size": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the max head data size for paras.
     */
    "set_max_head_data_size": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the number of coretime execution cores.
     *
     *NOTE: that this configuration is managed by the coretime chain. Only manually change
     *this, if you really know what you are doing!
     */
    "set_coretime_cores": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the parachain validator-group rotation frequency
     */
    "set_group_rotation_frequency": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the availability period for paras.
     */
    "set_paras_availability_period": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the scheduling lookahead, in expected number of blocks at peak throughput.
     */
    "set_scheduling_lookahead": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the maximum number of validators to assign to any core.
     */
    "set_max_validators_per_core": Anonymize<Id581arok0b1nj>;
    /**
     *Set the maximum number of validators to use in parachain consensus.
     */
    "set_max_validators": Anonymize<Id581arok0b1nj>;
    /**
     *Set the dispute period, in number of sessions to keep for disputes.
     */
    "set_dispute_period": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the dispute post conclusion acceptance period.
     */
    "set_dispute_post_conclusion_acceptance_period": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the no show slots, in number of number of consensus slots.
     *Must be at least 1.
     */
    "set_no_show_slots": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the total number of delay tranches.
     */
    "set_n_delay_tranches": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the zeroth delay tranche width.
     */
    "set_zeroth_delay_tranche_width": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the number of validators needed to approve a block.
     */
    "set_needed_approvals": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the number of samples to do of the `RelayVRFModulo` approval assignment criterion.
     */
    "set_relay_vrf_modulo_samples": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the maximum items that can present in a upward dispatch queue at once.
     */
    "set_max_upward_queue_count": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the maximum total size of items that can present in a upward dispatch queue at
     *once.
     */
    "set_max_upward_queue_size": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the critical downward message size.
     */
    "set_max_downward_message_size": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the maximum size of an upward message that can be sent by a candidate.
     */
    "set_max_upward_message_size": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the maximum number of messages that a candidate can contain.
     */
    "set_max_upward_message_num_per_candidate": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the number of sessions after which an HRMP open channel request expires.
     */
    "set_hrmp_open_request_ttl": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the amount of funds that the sender should provide for opening an HRMP channel.
     */
    "set_hrmp_sender_deposit": Anonymize<I9jsikd1ghmc7l>;
    /**
     *Sets the amount of funds that the recipient should provide for accepting opening an HRMP
     *channel.
     */
    "set_hrmp_recipient_deposit": Anonymize<I9jsikd1ghmc7l>;
    /**
     *Sets the maximum number of messages allowed in an HRMP channel at once.
     */
    "set_hrmp_channel_max_capacity": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the maximum total size of messages in bytes allowed in an HRMP channel at once.
     */
    "set_hrmp_channel_max_total_size": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the maximum number of inbound HRMP channels a parachain is allowed to accept.
     */
    "set_hrmp_max_parachain_inbound_channels": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the maximum size of a message that could ever be put into an HRMP channel.
     */
    "set_hrmp_channel_max_message_size": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the maximum number of outbound HRMP channels a parachain is allowed to open.
     */
    "set_hrmp_max_parachain_outbound_channels": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the maximum number of outbound HRMP messages can be sent by a candidate.
     */
    "set_hrmp_max_message_num_per_candidate": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the number of session changes after which a PVF pre-checking voting is rejected.
     */
    "set_pvf_voting_ttl": Anonymize<I3vh014cqgmrfd>;
    /**
     *Sets the minimum delay between announcing the upgrade block for a parachain until the
     *upgrade taking place.
     *
     *See the field documentation for information and constraints for the new value.
     */
    "set_minimum_validation_upgrade_delay": Anonymize<I3vh014cqgmrfd>;
    /**
     *Setting this to true will disable consistency checks for the configuration setters.
     *Use with caution.
     */
    "set_bypass_consistency_check": Anonymize<I2f6mha3v4ooda>;
    /**
     *Set the asynchronous backing parameters.
     */
    "set_async_backing_params": Anonymize<Iasqjdhasi408s>;
    /**
     *Set PVF executor parameters.
     */
    "set_executor_params": Anonymize<I6krn2lsleo87n>;
    /**
     *Set the on demand (parathreads) base fee.
     */
    "set_on_demand_base_fee": Anonymize<I9jsikd1ghmc7l>;
    /**
     *Set the on demand (parathreads) fee variability.
     */
    "set_on_demand_fee_variability": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the on demand (parathreads) queue max size.
     */
    "set_on_demand_queue_max_size": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the on demand (parathreads) fee variability.
     */
    "set_on_demand_target_queue_utilization": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set the minimum backing votes threshold.
     */
    "set_minimum_backing_votes": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set/Unset a node feature.
     */
    "set_node_feature": Anonymize<Iaid4btmkr5thp>;
    /**
     *Set approval-voting-params.
     */
    "set_approval_voting_params": Anonymize<I3vh014cqgmrfd>;
    /**
     *Set scheduler-params.
     */
    "set_scheduler_params": Anonymize<I559fv6um7nmhd>;
}>;
export type I1nu19212e8egv = AnonymousEnum<{
    /**
     *Enter the paras inherent. This will process bitfields and backed candidates.
     */
    "enter": Anonymize<I5m2irgeihn4i4>;
}>;
export type I5m2irgeihn4i4 = {
    "data": Anonymize<I622jkh704fgsa>;
};
export type I622jkh704fgsa = {
    "bitfields": Anonymize<Ib0ijj1h4o8bcq>;
    "backed_candidates": Anonymize<I8vrvimkt7rkvr>;
    "disputes": Anonymize<Ibt1op6l47p1r2>;
    "parent_header": Anonymize<Ic952bubvq4k7d>;
};
export type I8vrvimkt7rkvr = Array<Anonymize<I1r92i04ndj503>>;
export type I1r92i04ndj503 = {
    "candidate": Anonymize<I35p841butcer2>;
    "validity_votes": Anonymize<Id0g95rku62vif>;
    "validator_indices": {
        bytes: Uint8Array;
        bitsLen: number;
    };
};
export type I35p841butcer2 = {
    "descriptor": Anonymize<Ibnq2mkuf1plno>;
    "commitments": Anonymize<Ic1d4u2opv3fst>;
};
export type I8srk490mf5vj = AnonymousEnum<{
    /**
     *Set the storage for the parachain validation code immediately.
     */
    "force_set_current_code": Anonymize<I1k3urvkqqshbc>;
    /**
     *Set the storage for the current parachain head data immediately.
     */
    "force_set_current_head": Anonymize<I2ff0ffsh15vej>;
    /**
     *Schedule an upgrade as if it was scheduled in the given relay parent block.
     */
    "force_schedule_code_upgrade": Anonymize<I1orfg86bkg123>;
    /**
     *Note a new block head for para within the context of the current block.
     */
    "force_note_new_head": Anonymize<I2ff0ffsh15vej>;
    /**
     *Put a parachain directly into the next session's action queue.
     *We can't queue it any sooner than this without going into the
     *initializer...
     */
    "force_queue_action": Anonymize<Iaus4cb3drhu9q>;
    /**
     *Adds the validation code to the storage.
     *
     *The code will not be added if it is already present. Additionally, if PVF pre-checking
     *is running for that code, it will be instantly accepted.
     *
     *Otherwise, the code will be added into the storage. Note that the code will be added
     *into storage with reference count 0. This is to account the fact that there are no users
     *for this code yet. The caller will have to make sure that this code eventually gets
     *used by some parachain or removed from the storage to avoid storage leaks. For the
     *latter prefer to use the `poke_unused_validation_code` dispatchable to raw storage
     *manipulation.
     *
     *This function is mainly meant to be used for upgrading parachains that do not follow
     *the go-ahead signal while the PVF pre-checking feature is enabled.
     */
    "add_trusted_validation_code": Anonymize<Ivnsat10lv9d6>;
    /**
     *Remove the validation code from the storage iff the reference count is 0.
     *
     *This is better than removing the storage directly, because it will not remove the code
     *that was suddenly got used by some parachain while this dispatchable was pending
     *dispatching.
     */
    "poke_unused_validation_code": Anonymize<Ibncli8qttt2c2>;
    /**
     *Includes a statement for a PVF pre-checking vote. Potentially, finalizes the vote and
     *enacts the results if that was the last vote before achieving the supermajority.
     */
    "include_pvf_check_statement": Anonymize<I33rft6ag34efs>;
    /**
     *Set the storage for the current parachain head data immediately.
     */
    "force_set_most_recent_context": Anonymize<I9tmok5kceg2bg>;
    /**
     *Remove an upgrade cooldown for a parachain.
     *
     *The cost for removing the cooldown earlier depends on the time left for the cooldown
     *multiplied by [`Config::CooldownRemovalMultiplier`]. The paid tokens are burned.
     */
    "remove_upgrade_cooldown": Anonymize<Iaus4cb3drhu9q>;
    /**
     *Sets the storage for the authorized current code hash of the parachain.
     *If not applied, it will be removed at the `System::block_number() + valid_period` block.
     *
     *This can be useful, when triggering `Paras::force_set_current_code(para, code)`
     *from a different chain than the one where the `Paras` pallet is deployed.
     *
     *The main purpose is to avoid transferring the entire `code` Wasm blob between chains.
     *Instead, we authorize `code_hash` with `root`, which can later be applied by
     *`Paras::apply_authorized_force_set_current_code(para, code)` by anyone.
     *
     *Authorizations are stored in an **overwriting manner**.
     */
    "authorize_force_set_current_code_hash": Anonymize<I3i9vj5744rff1>;
    /**
     *Applies the already authorized current code for the parachain,
     *triggering the same functionality as `force_set_current_code`.
     */
    "apply_authorized_force_set_current_code": Anonymize<I1k3urvkqqshbc>;
}>;
export type I3i9vj5744rff1 = {
    "para": number;
    "new_code_hash": FixedSizeBinary<32>;
    "valid_period": number;
};
export type I7a6dbilbccifr = AnonymousEnum<{
    "report_dispute_lost_unsigned": Anonymize<I2ecddbrt3sjqn>;
}>;
export type I2ecddbrt3sjqn = {
    "dispute_proof": Anonymize<Ie2h65164u3jsg>;
    "key_owner_proof": Anonymize<I3ia7aufsoj0l1>;
};
export type Ie2h65164u3jsg = {
    "time_slot": Anonymize<Iee37emj23tmbu>;
    "kind": Anonymize<I9ng4p85mim3lc>;
    "validator_index": number;
    "validator_id": FixedSizeBinary<32>;
};
export type I1qq9dc763kccf = AnonymousEnum<{
    /**
     *Create a single on demand core order.
     *Will use the spot price for the current block and will reap the account if needed.
     *
     *Parameters:
     *- `origin`: The sender of the call, funds will be withdrawn from this account.
     *- `max_amount`: The maximum balance to withdraw from the origin to place an order.
     *- `para_id`: A `ParaId` the origin wants to provide blockspace for.
     *
     *Errors:
     *- `InsufficientBalance`: from the Currency implementation
     *- `QueueFull`
     *- `SpotPriceHigherThanMaxAmount`
     *
     *Events:
     *- `OnDemandOrderPlaced`
     */
    "place_order_allow_death": Anonymize<Iaa7g3f5tlv3gf>;
    /**
     *Same as the [`place_order_allow_death`](Self::place_order_allow_death) call , but with a
     *check that placing the order will not reap the account.
     *
     *Parameters:
     *- `origin`: The sender of the call, funds will be withdrawn from this account.
     *- `max_amount`: The maximum balance to withdraw from the origin to place an order.
     *- `para_id`: A `ParaId` the origin wants to provide blockspace for.
     *
     *Errors:
     *- `InsufficientBalance`: from the Currency implementation
     *- `QueueFull`
     *- `SpotPriceHigherThanMaxAmount`
     *
     *Events:
     *- `OnDemandOrderPlaced`
     */
    "place_order_keep_alive": Anonymize<Iaa7g3f5tlv3gf>;
    /**
     *Create a single on demand core order with credits.
     *Will charge the owner's on-demand credit account the spot price for the current block.
     *
     *Parameters:
     *- `origin`: The sender of the call, on-demand credits will be withdrawn from this
     *  account.
     *- `max_amount`: The maximum number of credits to spend from the origin to place an
     *  order.
     *- `para_id`: A `ParaId` the origin wants to provide blockspace for.
     *
     *Errors:
     *- `InsufficientCredits`
     *- `QueueFull`
     *- `SpotPriceHigherThanMaxAmount`
     *
     *Events:
     *- `OnDemandOrderPlaced`
     */
    "place_order_with_credits": Anonymize<Iaa7g3f5tlv3gf>;
}>;
export type I8f92tvrsnq2cu = AnonymousEnum<{
    /**
     *Schedule a para to be initialized at the start of the next session.
     *
     *This should only be used for TESTING and not on PRODUCTION chains. It automatically
     *assigns Coretime to the chain and increases the number of cores. Thus, there is no
     *running coretime chain required.
     */
    "sudo_schedule_para_initialize": Anonymize<I9geq5evbpu4im>;
    /**
     *Schedule a para to be cleaned up at the start of the next session.
     */
    "sudo_schedule_para_cleanup": Anonymize<Ic5b47dj4coa3r>;
    /**
     *Upgrade a parathread (on-demand parachain) to a lease holding parachain
     */
    "sudo_schedule_parathread_upgrade": Anonymize<Ic5b47dj4coa3r>;
    /**
     *Downgrade a lease holding parachain to an on-demand parachain
     */
    "sudo_schedule_parachain_downgrade": Anonymize<Ic5b47dj4coa3r>;
    /**
     *Send a downward XCM to the given para.
     *
     *The given parachain should exist and the payload should not exceed the preconfigured
     *size `config.max_downward_message_size`.
     */
    "sudo_queue_downward_xcm": Anonymize<I49ncdugfqno1o>;
    /**
     *Forcefully establish a channel from the sender to the recipient.
     *
     *This is equivalent to sending an `Hrmp::hrmp_init_open_channel` extrinsic followed by
     *`Hrmp::hrmp_accept_open_channel`.
     */
    "sudo_establish_hrmp_channel": Anonymize<Ic3430470j4mbv>;
}>;
export type I49ncdugfqno1o = {
    "id": number;
    "xcm": XcmVersionedXcm;
};
export type XcmVersionedXcm = Enum<{
    "V3": Anonymize<Ianvng4e08j9ii>;
    "V4": Anonymize<Iegrepoo0c1jc5>;
    "V5": Anonymize<Ict03eedr8de9s>;
}>;
export declare const XcmVersionedXcm: GetEnum<XcmVersionedXcm>;
export type Idlqs78vqqscm0 = AnonymousEnum<{
    /**
     *Assign a permanent parachain slot and immediately create a lease for it.
     */
    "assign_perm_parachain_slot": Anonymize<Ic5b47dj4coa3r>;
    /**
     *Assign a temporary parachain slot. The function tries to create a lease for it
     *immediately if `SlotLeasePeriodStart::Current` is specified, and if the number
     *of currently active temporary slots is below `MaxTemporarySlotPerLeasePeriod`.
     */
    "assign_temp_parachain_slot": Anonymize<I6d2lhsacea7au>;
    /**
     *Unassign a permanent or temporary parachain slot
     */
    "unassign_parachain_slot": Anonymize<Ic5b47dj4coa3r>;
    /**
     *Sets the storage value [`MaxPermanentSlots`].
     */
    "set_max_permanent_slots": Anonymize<I9d5h5irbki7mm>;
    /**
     *Sets the storage value [`MaxTemporarySlots`].
     */
    "set_max_temporary_slots": Anonymize<I9d5h5irbki7mm>;
}>;
export type I6d2lhsacea7au = {
    "id": number;
    "lease_period_start": PolkadotRuntimeCommonAssignedSlotsSlotLeasePeriodStart;
};
export type PolkadotRuntimeCommonAssignedSlotsSlotLeasePeriodStart = Enum<{
    "Current": undefined;
    "Next": undefined;
}>;
export declare const PolkadotRuntimeCommonAssignedSlotsSlotLeasePeriodStart: GetEnum<PolkadotRuntimeCommonAssignedSlotsSlotLeasePeriodStart>;
export type Ifr31g56am9igr = AnonymousEnum<{
    /**
     *Request the configuration to be updated with the specified number of cores. Warning:
     *Since this only schedules a configuration update, it takes two sessions to come into
     *effect.
     *
     *- `origin`: Root or the Coretime Chain
     *- `count`: total number of cores
     */
    "request_core_count": Anonymize<Iafscmv8tjf0ou>;
    /**
     *Request to claim the instantaneous coretime sales revenue starting from the block it was
     *last claimed until and up to the block specified. The claimed amount value is sent back
     *to the Coretime chain in a `notify_revenue` message. At the same time, the amount is
     *teleported to the Coretime chain.
     */
    "request_revenue_at": Anonymize<Ibtsa3docbr9el>;
    "credit_account": Anonymize<Id5fm4p8lj5qgi>;
    /**
     *Receive instructions from the `ExternalBrokerOrigin`, detailing how a specific core is
     *to be used.
     *
     *Parameters:
     *-`origin`: The `ExternalBrokerOrigin`, assumed to be the coretime chain.
     *-`core`: The core that should be scheduled.
     *-`begin`: The starting blockheight of the instruction.
     *-`assignment`: How the blockspace should be utilised.
     *-`end_hint`: An optional hint as to when this particular set of instructions will end.
     */
    "assign_core": Anonymize<I2gpmmfdqv3cdc>;
}>;
export type I4e2bfaqor5ntp = AnonymousEnum<{
    "validator_set": Anonymize<I84bjfgtkoop2c>;
    /**
     *Allows governance to force set the operating mode of the pallet.
     */
    "set_mode": Anonymize<I1epdupsg8a7gd>;
    /**
     *manually do what this pallet was meant to do at the end of the migration.
     */
    "force_on_migration_end": undefined;
}>;
export type I84bjfgtkoop2c = {
    "report": Anonymize<I9vjdmm7sufoc>;
};
export type I1epdupsg8a7gd = {
    "mode": Anonymize<Ianpaq0u393le8>;
};
export type I4oqb168b2d4er = AnonymousEnum<{
    /**
     *Allows root to set a cursor to forcefully start, stop or forward the migration process.
     *
     *Should normally not be needed and is only in place as emergency measure. Note that
     *restarting the migration process in this manner will not call the
     *[`MigrationStatusHandler::started`] hook or emit an `UpgradeStarted` event.
     */
    "force_set_cursor": Anonymize<Ibou4u1engb441>;
    /**
     *Allows root to set an active cursor to forcefully start/forward the migration process.
     *
     *This is an edge-case version of [`Self::force_set_cursor`] that allows to set the
     *`started_at` value to the next block number. Otherwise this would not be possible, since
     *`force_set_cursor` takes an absolute block number. Setting `started_at` to `None`
     *indicates that the current block number plus one should be used.
     */
    "force_set_active_cursor": Anonymize<Id6nbvqoqdj4o2>;
    /**
     *Forces the onboarding of the migrations.
     *
     *This process happens automatically on a runtime upgrade. It is in place as an emergency
     *measurement. The cursor needs to be `None` for this to succeed.
     */
    "force_onboard_mbms": undefined;
    /**
     *Clears the `Historic` set.
     *
     *`map_cursor` must be set to the last value that was returned by the
     *`HistoricCleared` event. The first time `None` can be used. `limit` must be chosen in a
     *way that will result in a sensible weight.
     */
    "clear_historic": Anonymize<I95iqep3b8snn9>;
}>;
export type Ibou4u1engb441 = {
    "cursor"?: Anonymize<Icmmmo81k3r2n7>;
};
export type Icmmmo81k3r2n7 = (Anonymize<Iepbsvlk3qceij>) | undefined;
export type Id6nbvqoqdj4o2 = {
    "index": number;
    "inner_cursor"?: Anonymize<Iabpgqcjikia83>;
    "started_at"?: Anonymize<I4arjljr6dpflb>;
};
export type I95iqep3b8snn9 = {
    "selector": Anonymize<I2il0noe6jkb0o>;
};
export type I2il0noe6jkb0o = AnonymousEnum<{
    "Specific": Anonymize<Itom7fk49o0c9>;
    "Wildcard": Anonymize<Id9494tkgood2r>;
}>;
export type Id9494tkgood2r = {
    "limit"?: Anonymize<I4arjljr6dpflb>;
    "previous_cursor"?: Anonymize<Iabpgqcjikia83>;
};
export type I6k1inef986368 = AnonymousEnum<{
    "send": Anonymize<Ia5cotcvi888ln>;
    /**
     *Teleport some assets from the local chain to some destination chain.
     *
     ***This function is deprecated: Use `limited_teleport_assets` instead.**
     *
     *Fee payment on the destination side is made from the asset in the `assets` vector of
     *index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
     *with all fees taken as needed from the asset.
     *
     *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     *- `dest`: Destination context for the assets. Will typically be `[Parent,
     *  Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
     *  relay to parachain.
     *- `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
     *  generally be an `AccountId32` value.
     *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
     *  fee on the `dest` chain.
     *- `fee_asset_item`: The index into `assets` of the item which should be used to pay
     *  fees.
     */
    "teleport_assets": Anonymize<I21jsa919m88fd>;
    /**
     *Transfer some assets from the local chain to the destination chain through their local,
     *destination or remote reserve.
     *
     *`assets` must have same reserve location and may not be teleportable to `dest`.
     * - `assets` have local reserve: transfer assets to sovereign account of destination
     *   chain and forward a notification XCM to `dest` to mint and deposit reserve-based
     *   assets to `beneficiary`.
     * - `assets` have destination reserve: burn local assets and forward a notification to
     *   `dest` chain to withdraw the reserve assets from this chain's sovereign account and
     *   deposit them to `beneficiary`.
     * - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
     *   reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
     *   to mint and deposit reserve-based assets to `beneficiary`.
     *
     ***This function is deprecated: Use `limited_reserve_transfer_assets` instead.**
     *
     *Fee payment on the destination side is made from the asset in the `assets` vector of
     *index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
     *with all fees taken as needed from the asset.
     *
     *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     *- `dest`: Destination context for the assets. Will typically be `[Parent,
     *  Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
     *  relay to parachain.
     *- `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
     *  generally be an `AccountId32` value.
     *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
     *  fee on the `dest` (and possibly reserve) chains.
     *- `fee_asset_item`: The index into `assets` of the item which should be used to pay
     *  fees.
     */
    "reserve_transfer_assets": Anonymize<I21jsa919m88fd>;
    /**
     *Execute an XCM message from a local, signed, origin.
     *
     *An event is deposited indicating whether `msg` could be executed completely or only
     *partially.
     *
     *No more than `max_weight` will be used in its attempted execution. If this is less than
     *the maximum amount of weight that the message could take to be executed, then no
     *execution attempt will be made.
     */
    "execute": Anonymize<Iegif7m3upfe1k>;
    /**
     *Extoll that a particular destination can be communicated with through a particular
     *version of XCM.
     *
     *- `origin`: Must be an origin specified by AdminOrigin.
     *- `location`: The destination that is being described.
     *- `xcm_version`: The latest version of XCM that `location` supports.
     */
    "force_xcm_version": Anonymize<I9kt8c221c83ln>;
    /**
     *Set a safe XCM version (the version that XCM should be encoded with if the most recent
     *version a destination can accept is unknown).
     *
     *- `origin`: Must be an origin specified by AdminOrigin.
     *- `maybe_xcm_version`: The default XCM encoding version, or `None` to disable.
     */
    "force_default_xcm_version": Anonymize<Ic76kfh5ebqkpl>;
    /**
     *Ask a location to notify us regarding their XCM version and any changes to it.
     *
     *- `origin`: Must be an origin specified by AdminOrigin.
     *- `location`: The location to which we should subscribe for XCM version notifications.
     */
    "force_subscribe_version_notify": Anonymize<Icscpmubum33bq>;
    /**
     *Require that a particular destination should no longer notify us regarding any XCM
     *version changes.
     *
     *- `origin`: Must be an origin specified by AdminOrigin.
     *- `location`: The location to which we are currently subscribed for XCM version
     *  notifications which we no longer desire.
     */
    "force_unsubscribe_version_notify": Anonymize<Icscpmubum33bq>;
    /**
     *Transfer some assets from the local chain to the destination chain through their local,
     *destination or remote reserve.
     *
     *`assets` must have same reserve location and may not be teleportable to `dest`.
     * - `assets` have local reserve: transfer assets to sovereign account of destination
     *   chain and forward a notification XCM to `dest` to mint and deposit reserve-based
     *   assets to `beneficiary`.
     * - `assets` have destination reserve: burn local assets and forward a notification to
     *   `dest` chain to withdraw the reserve assets from this chain's sovereign account and
     *   deposit them to `beneficiary`.
     * - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
     *   reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
     *   to mint and deposit reserve-based assets to `beneficiary`.
     *
     *Fee payment on the destination side is made from the asset in the `assets` vector of
     *index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
     *is needed than `weight_limit`, then the operation will fail and the sent assets may be
     *at risk.
     *
     *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     *- `dest`: Destination context for the assets. Will typically be `[Parent,
     *  Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
     *  relay to parachain.
     *- `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
     *  generally be an `AccountId32` value.
     *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
     *  fee on the `dest` (and possibly reserve) chains.
     *- `fee_asset_item`: The index into `assets` of the item which should be used to pay
     *  fees.
     *- `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
     */
    "limited_reserve_transfer_assets": Anonymize<I21d2olof7eb60>;
    /**
     *Teleport some assets from the local chain to some destination chain.
     *
     *Fee payment on the destination side is made from the asset in the `assets` vector of
     *index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
     *is needed than `weight_limit`, then the operation will fail and the sent assets may be
     *at risk.
     *
     *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     *- `dest`: Destination context for the assets. Will typically be `[Parent,
     *  Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
     *  relay to parachain.
     *- `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
     *  generally be an `AccountId32` value.
     *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
     *  fee on the `dest` chain.
     *- `fee_asset_item`: The index into `assets` of the item which should be used to pay
     *  fees.
     *- `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
     */
    "limited_teleport_assets": Anonymize<I21d2olof7eb60>;
    /**
     *Set or unset the global suspension state of the XCM executor.
     *
     *- `origin`: Must be an origin specified by AdminOrigin.
     *- `suspended`: `true` to suspend, `false` to resume.
     */
    "force_suspension": Anonymize<Ibgm4rnf22lal1>;
    /**
     *Transfer some assets from the local chain to the destination chain through their local,
     *destination or remote reserve, or through teleports.
     *
     *Fee payment on the destination side is made from the asset in the `assets` vector of
     *index `fee_asset_item` (hence referred to as `fees`), up to enough to pay for
     *`weight_limit` of weight. If more weight is needed than `weight_limit`, then the
     *operation will fail and the sent assets may be at risk.
     *
     *`assets` (excluding `fees`) must have same reserve location or otherwise be teleportable
     *to `dest`, no limitations imposed on `fees`.
     * - for local reserve: transfer assets to sovereign account of destination chain and
     *   forward a notification XCM to `dest` to mint and deposit reserve-based assets to
     *   `beneficiary`.
     * - for destination reserve: burn local assets and forward a notification to `dest` chain
     *   to withdraw the reserve assets from this chain's sovereign account and deposit them
     *   to `beneficiary`.
     * - for remote reserve: burn local assets, forward XCM to reserve chain to move reserves
     *   from this chain's SA to `dest` chain's SA, and forward another XCM to `dest` to mint
     *   and deposit reserve-based assets to `beneficiary`.
     * - for teleports: burn local assets and forward XCM to `dest` chain to mint/teleport
     *   assets and deposit them to `beneficiary`.
     *
     *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     *- `dest`: Destination context for the assets. Will typically be `X2(Parent,
     *  Parachain(..))` to send from parachain to parachain, or `X1(Parachain(..))` to send
     *  from relay to parachain.
     *- `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
     *  generally be an `AccountId32` value.
     *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
     *  fee on the `dest` (and possibly reserve) chains.
     *- `fee_asset_item`: The index into `assets` of the item which should be used to pay
     *  fees.
     *- `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
     */
    "transfer_assets": Anonymize<I21d2olof7eb60>;
    /**
     *Claims assets trapped on this pallet because of leftover assets during XCM execution.
     *
     *- `origin`: Anyone can call this extrinsic.
     *- `assets`: The exact assets that were trapped. Use the version to specify what version
     *was the latest when they were trapped.
     *- `beneficiary`: The location/account where the claimed assets will be deposited.
     */
    "claim_assets": Anonymize<Ie68np0vpihith>;
    /**
     *Transfer assets from the local chain to the destination chain using explicit transfer
     *types for assets and fees.
     *
     *`assets` must have same reserve location or may be teleportable to `dest`. Caller must
     *provide the `assets_transfer_type` to be used for `assets`:
     * - `TransferType::LocalReserve`: transfer assets to sovereign account of destination
     *   chain and forward a notification XCM to `dest` to mint and deposit reserve-based
     *   assets to `beneficiary`.
     * - `TransferType::DestinationReserve`: burn local assets and forward a notification to
     *   `dest` chain to withdraw the reserve assets from this chain's sovereign account and
     *   deposit them to `beneficiary`.
     * - `TransferType::RemoteReserve(reserve)`: burn local assets, forward XCM to `reserve`
     *   chain to move reserves from this chain's SA to `dest` chain's SA, and forward another
     *   XCM to `dest` to mint and deposit reserve-based assets to `beneficiary`. Typically
     *   the remote `reserve` is Asset Hub.
     * - `TransferType::Teleport`: burn local assets and forward XCM to `dest` chain to
     *   mint/teleport assets and deposit them to `beneficiary`.
     *
     *On the destination chain, as well as any intermediary hops, `BuyExecution` is used to
     *buy execution using transferred `assets` identified by `remote_fees_id`.
     *Make sure enough of the specified `remote_fees_id` asset is included in the given list
     *of `assets`. `remote_fees_id` should be enough to pay for `weight_limit`. If more weight
     *is needed than `weight_limit`, then the operation will fail and the sent assets may be
     *at risk.
     *
     *`remote_fees_id` may use different transfer type than rest of `assets` and can be
     *specified through `fees_transfer_type`.
     *
     *The caller needs to specify what should happen to the transferred assets once they reach
     *the `dest` chain. This is done through the `custom_xcm_on_dest` parameter, which
     *contains the instructions to execute on `dest` as a final step.
     *  This is usually as simple as:
     *  `Xcm(vec![DepositAsset { assets: Wild(AllCounted(assets.len())), beneficiary }])`,
     *  but could be something more exotic like sending the `assets` even further.
     *
     *- `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     *- `dest`: Destination context for the assets. Will typically be `[Parent,
     *  Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
     *  relay to parachain, or `(parents: 2, (GlobalConsensus(..), ..))` to send from
     *  parachain across a bridge to another ecosystem destination.
     *- `assets`: The assets to be withdrawn. This should include the assets used to pay the
     *  fee on the `dest` (and possibly reserve) chains.
     *- `assets_transfer_type`: The XCM `TransferType` used to transfer the `assets`.
     *- `remote_fees_id`: One of the included `assets` to be used to pay fees.
     *- `fees_transfer_type`: The XCM `TransferType` used to transfer the `fees` assets.
     *- `custom_xcm_on_dest`: The XCM to be executed on `dest` chain as the last step of the
     *  transfer, which also determines what happens to the assets on the destination chain.
     *- `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
     */
    "transfer_assets_using_type_and_then": Anonymize<I9bnv6lu0crf1q>;
    /**
     *Authorize another `aliaser` location to alias into the local `origin` making this call.
     *The `aliaser` is only authorized until the provided `expiry` block number.
     *The call can also be used for a previously authorized alias in order to update its
     *`expiry` block number.
     *
     *Usually useful to allow your local account to be aliased into from a remote location
     *also under your control (like your account on another chain).
     *
     *WARNING: make sure the caller `origin` (you) trusts the `aliaser` location to act in
     *their/your name. Once authorized using this call, the `aliaser` can freely impersonate
     *`origin` in XCM programs executed on the local chain.
     */
    "add_authorized_alias": Anonymize<Iauhjqifrdklq7>;
    /**
     *Remove a previously authorized `aliaser` from the list of locations that can alias into
     *the local `origin` making this call.
     */
    "remove_authorized_alias": Anonymize<Ie1uso9m8rt5cf>;
    /**
     *Remove all previously authorized `aliaser`s that can alias into the local `origin`
     *making this call.
     */
    "remove_all_authorized_aliases": undefined;
}>;
export type Ia5cotcvi888ln = {
    "dest": XcmVersionedLocation;
    "message": XcmVersionedXcm;
};
export type I21jsa919m88fd = {
    "dest": XcmVersionedLocation;
    "beneficiary": XcmVersionedLocation;
    "assets": XcmVersionedAssets;
    "fee_asset_item": number;
};
export type Iegif7m3upfe1k = {
    "message": XcmVersionedXcm;
    "max_weight": Anonymize<I4q39t5hn830vp>;
};
export type Icscpmubum33bq = {
    "location": XcmVersionedLocation;
};
export type I21d2olof7eb60 = {
    "dest": XcmVersionedLocation;
    "beneficiary": XcmVersionedLocation;
    "assets": XcmVersionedAssets;
    "fee_asset_item": number;
    "weight_limit": XcmV3WeightLimit;
};
export type Ie68np0vpihith = {
    "assets": XcmVersionedAssets;
    "beneficiary": XcmVersionedLocation;
};
export type I9bnv6lu0crf1q = {
    "dest": XcmVersionedLocation;
    "assets": XcmVersionedAssets;
    "assets_transfer_type": Anonymize<I4gnu4rrr0ftsf>;
    "remote_fees_id": XcmVersionedAssetId;
    "fees_transfer_type": Anonymize<I4gnu4rrr0ftsf>;
    "custom_xcm_on_dest": XcmVersionedXcm;
    "weight_limit": XcmV3WeightLimit;
};
export type I4gnu4rrr0ftsf = AnonymousEnum<{
    "Teleport": undefined;
    "LocalReserve": undefined;
    "DestinationReserve": undefined;
    "RemoteReserve": XcmVersionedLocation;
}>;
export type Iauhjqifrdklq7 = {
    "aliaser": XcmVersionedLocation;
    "expires"?: Anonymize<I35p85j063s0il>;
};
export type Ie1uso9m8rt5cf = {
    "aliaser": XcmVersionedLocation;
};
export type If582h5gr5gh6f = AnonymousEnum<{
    /**
     *Initialize a conversion rate to native balance for the given asset.
     *
     *## Complexity
     *- O(1)
     */
    "create": Anonymize<I9c4d50jrp7as1>;
    /**
     *Update the conversion rate to native balance for the given asset.
     *
     *## Complexity
     *- O(1)
     */
    "update": Anonymize<I9c4d50jrp7as1>;
    /**
     *Remove an existing conversion rate to native balance for the given asset.
     *
     *## Complexity
     *- O(1)
     */
    "remove": Anonymize<Ifplevr9hp8jo3>;
}>;
export type I9rkc7eqejp3rj = AnonymousEnum<{
    /**
     *A dispatch that will fill the block weight up to the given ratio.
     */
    "fill_block": Anonymize<Ienjibnb78vnl0>;
    "trigger_defensive": undefined;
}>;
export type Ienjibnb78vnl0 = {
    "ratio": number;
};
export type Idifjg868aaa2d = AnonymousEnum<{
    /**
     *Dispatch a given meta transaction.
     *
     *- `_origin`: Can be any kind of origin.
     *- `meta_tx`: Meta Transaction with a target call to be dispatched.
     */
    "dispatch": Anonymize<I2jj01cl2iqks8>;
}>;
export type I2jj01cl2iqks8 = {
    "meta_tx": Anonymize<If5o72t5r3eu6c>;
};
export type If5o72t5r3eu6c = {
    "call": TxCallData;
    "extension_version": number;
    "extension": Anonymize<Id2qfro6pq4n39>;
};
export type Id2qfro6pq4n39 = [Anonymize<I9q0sdpojg74rm>, undefined, undefined, undefined, undefined, undefined, ExtensionsCheckMortality, number, Anonymize<I87rnrnks7g0hm>];
export type I9q0sdpojg74rm = AnonymousEnum<{
    "Signed": Anonymize<If3vk2hu0ms5lh>;
    "Disabled": undefined;
}>;
export type If3vk2hu0ms5lh = {
    "signature": MultiSignature;
    "account": SS58String;
};
export type ExtensionsCheckMortality = Enum<{
    "Immortal": undefined;
    "Mortal1": number;
    "Mortal2": number;
    "Mortal3": number;
    "Mortal4": number;
    "Mortal5": number;
    "Mortal6": number;
    "Mortal7": number;
    "Mortal8": number;
    "Mortal9": number;
    "Mortal10": number;
    "Mortal11": number;
    "Mortal12": number;
    "Mortal13": number;
    "Mortal14": number;
    "Mortal15": number;
    "Mortal16": number;
    "Mortal17": number;
    "Mortal18": number;
    "Mortal19": number;
    "Mortal20": number;
    "Mortal21": number;
    "Mortal22": number;
    "Mortal23": number;
    "Mortal24": number;
    "Mortal25": number;
    "Mortal26": number;
    "Mortal27": number;
    "Mortal28": number;
    "Mortal29": number;
    "Mortal30": number;
    "Mortal31": number;
    "Mortal32": number;
    "Mortal33": number;
    "Mortal34": number;
    "Mortal35": number;
    "Mortal36": number;
    "Mortal37": number;
    "Mortal38": number;
    "Mortal39": number;
    "Mortal40": number;
    "Mortal41": number;
    "Mortal42": number;
    "Mortal43": number;
    "Mortal44": number;
    "Mortal45": number;
    "Mortal46": number;
    "Mortal47": number;
    "Mortal48": number;
    "Mortal49": number;
    "Mortal50": number;
    "Mortal51": number;
    "Mortal52": number;
    "Mortal53": number;
    "Mortal54": number;
    "Mortal55": number;
    "Mortal56": number;
    "Mortal57": number;
    "Mortal58": number;
    "Mortal59": number;
    "Mortal60": number;
    "Mortal61": number;
    "Mortal62": number;
    "Mortal63": number;
    "Mortal64": number;
    "Mortal65": number;
    "Mortal66": number;
    "Mortal67": number;
    "Mortal68": number;
    "Mortal69": number;
    "Mortal70": number;
    "Mortal71": number;
    "Mortal72": number;
    "Mortal73": number;
    "Mortal74": number;
    "Mortal75": number;
    "Mortal76": number;
    "Mortal77": number;
    "Mortal78": number;
    "Mortal79": number;
    "Mortal80": number;
    "Mortal81": number;
    "Mortal82": number;
    "Mortal83": number;
    "Mortal84": number;
    "Mortal85": number;
    "Mortal86": number;
    "Mortal87": number;
    "Mortal88": number;
    "Mortal89": number;
    "Mortal90": number;
    "Mortal91": number;
    "Mortal92": number;
    "Mortal93": number;
    "Mortal94": number;
    "Mortal95": number;
    "Mortal96": number;
    "Mortal97": number;
    "Mortal98": number;
    "Mortal99": number;
    "Mortal100": number;
    "Mortal101": number;
    "Mortal102": number;
    "Mortal103": number;
    "Mortal104": number;
    "Mortal105": number;
    "Mortal106": number;
    "Mortal107": number;
    "Mortal108": number;
    "Mortal109": number;
    "Mortal110": number;
    "Mortal111": number;
    "Mortal112": number;
    "Mortal113": number;
    "Mortal114": number;
    "Mortal115": number;
    "Mortal116": number;
    "Mortal117": number;
    "Mortal118": number;
    "Mortal119": number;
    "Mortal120": number;
    "Mortal121": number;
    "Mortal122": number;
    "Mortal123": number;
    "Mortal124": number;
    "Mortal125": number;
    "Mortal126": number;
    "Mortal127": number;
    "Mortal128": number;
    "Mortal129": number;
    "Mortal130": number;
    "Mortal131": number;
    "Mortal132": number;
    "Mortal133": number;
    "Mortal134": number;
    "Mortal135": number;
    "Mortal136": number;
    "Mortal137": number;
    "Mortal138": number;
    "Mortal139": number;
    "Mortal140": number;
    "Mortal141": number;
    "Mortal142": number;
    "Mortal143": number;
    "Mortal144": number;
    "Mortal145": number;
    "Mortal146": number;
    "Mortal147": number;
    "Mortal148": number;
    "Mortal149": number;
    "Mortal150": number;
    "Mortal151": number;
    "Mortal152": number;
    "Mortal153": number;
    "Mortal154": number;
    "Mortal155": number;
    "Mortal156": number;
    "Mortal157": number;
    "Mortal158": number;
    "Mortal159": number;
    "Mortal160": number;
    "Mortal161": number;
    "Mortal162": number;
    "Mortal163": number;
    "Mortal164": number;
    "Mortal165": number;
    "Mortal166": number;
    "Mortal167": number;
    "Mortal168": number;
    "Mortal169": number;
    "Mortal170": number;
    "Mortal171": number;
    "Mortal172": number;
    "Mortal173": number;
    "Mortal174": number;
    "Mortal175": number;
    "Mortal176": number;
    "Mortal177": number;
    "Mortal178": number;
    "Mortal179": number;
    "Mortal180": number;
    "Mortal181": number;
    "Mortal182": number;
    "Mortal183": number;
    "Mortal184": number;
    "Mortal185": number;
    "Mortal186": number;
    "Mortal187": number;
    "Mortal188": number;
    "Mortal189": number;
    "Mortal190": number;
    "Mortal191": number;
    "Mortal192": number;
    "Mortal193": number;
    "Mortal194": number;
    "Mortal195": number;
    "Mortal196": number;
    "Mortal197": number;
    "Mortal198": number;
    "Mortal199": number;
    "Mortal200": number;
    "Mortal201": number;
    "Mortal202": number;
    "Mortal203": number;
    "Mortal204": number;
    "Mortal205": number;
    "Mortal206": number;
    "Mortal207": number;
    "Mortal208": number;
    "Mortal209": number;
    "Mortal210": number;
    "Mortal211": number;
    "Mortal212": number;
    "Mortal213": number;
    "Mortal214": number;
    "Mortal215": number;
    "Mortal216": number;
    "Mortal217": number;
    "Mortal218": number;
    "Mortal219": number;
    "Mortal220": number;
    "Mortal221": number;
    "Mortal222": number;
    "Mortal223": number;
    "Mortal224": number;
    "Mortal225": number;
    "Mortal226": number;
    "Mortal227": number;
    "Mortal228": number;
    "Mortal229": number;
    "Mortal230": number;
    "Mortal231": number;
    "Mortal232": number;
    "Mortal233": number;
    "Mortal234": number;
    "Mortal235": number;
    "Mortal236": number;
    "Mortal237": number;
    "Mortal238": number;
    "Mortal239": number;
    "Mortal240": number;
    "Mortal241": number;
    "Mortal242": number;
    "Mortal243": number;
    "Mortal244": number;
    "Mortal245": number;
    "Mortal246": number;
    "Mortal247": number;
    "Mortal248": number;
    "Mortal249": number;
    "Mortal250": number;
    "Mortal251": number;
    "Mortal252": number;
    "Mortal253": number;
    "Mortal254": number;
    "Mortal255": number;
}>;
export declare const ExtensionsCheckMortality: GetEnum<ExtensionsCheckMortality>;
export type I87rnrnks7g0hm = AnonymousEnum<{
    "Disabled": undefined;
    "Enabled": undefined;
}>;
export type Idmcmrk34p8gic = AnonymousEnum<{
    /**
     *Report voter equivocation/misbehavior. This method will verify the
     *equivocation proof and validate the given key ownership proof
     *against the extracted offender. If both are valid, the offence
     *will be reported.
     */
    "report_double_voting": Anonymize<I3pirohb0sp3ic>;
    /**
     *Report voter equivocation/misbehavior. This method will verify the
     *equivocation proof and validate the given key ownership proof
     *against the extracted offender. If both are valid, the offence
     *will be reported.
     *
     *This extrinsic must be called unsigned and it is expected that only
     *block authors will call it (validated in `ValidateUnsigned`), as such
     *if the block author is defined it will be defined as the equivocation
     *reporter.
     */
    "report_double_voting_unsigned": Anonymize<I3pirohb0sp3ic>;
    /**
     *Reset BEEFY consensus by setting a new BEEFY genesis at `delay_in_blocks` blocks in the
     *future.
     *
     *Note: `delay_in_blocks` has to be at least 1.
     */
    "set_new_genesis": Anonymize<Iemqna2uucuei9>;
    /**
     *Report fork voting equivocation. This method will verify the equivocation proof
     *and validate the given key ownership proof against the extracted offender.
     *If both are valid, the offence will be reported.
     */
    "report_fork_voting": Anonymize<Idrvp50hbkv2k2>;
    /**
     *Report fork voting equivocation. This method will verify the equivocation proof
     *and validate the given key ownership proof against the extracted offender.
     *If both are valid, the offence will be reported.
     *
     *This extrinsic must be called unsigned and it is expected that only
     *block authors will call it (validated in `ValidateUnsigned`), as such
     *if the block author is defined it will be defined as the equivocation
     *reporter.
     */
    "report_fork_voting_unsigned": Anonymize<Idrvp50hbkv2k2>;
    /**
     *Report future block voting equivocation. This method will verify the equivocation proof
     *and validate the given key ownership proof against the extracted offender.
     *If both are valid, the offence will be reported.
     */
    "report_future_block_voting": Anonymize<Ie11u326g2gsj3>;
    /**
     *Report future block voting equivocation. This method will verify the equivocation proof
     *and validate the given key ownership proof against the extracted offender.
     *If both are valid, the offence will be reported.
     *
     *This extrinsic must be called unsigned and it is expected that only
     *block authors will call it (validated in `ValidateUnsigned`), as such
     *if the block author is defined it will be defined as the equivocation
     *reporter.
     */
    "report_future_block_voting_unsigned": Anonymize<Ie11u326g2gsj3>;
}>;
export type Idrvp50hbkv2k2 = {
    "equivocation_proof": Anonymize<Ie1uhej0oopvs5>;
    "key_owner_proof": Anonymize<I3ia7aufsoj0l1>;
};
export type Ie1uhej0oopvs5 = {
    "vote": Anonymize<I3eao7ea0kppv8>;
    "ancestry_proof": Anonymize<I499ogutcm86mj>;
    "header": Anonymize<Ic952bubvq4k7d>;
};
export type I499ogutcm86mj = {
    "prev_peaks": Anonymize<Ic5m5lp1oioo8r>;
    "prev_leaf_count": bigint;
    "leaf_count": bigint;
    "items": Anonymize<I7b7fp94l51vcq>;
};
export type I7b7fp94l51vcq = Array<Anonymize<Idsa6q9es8ufjv>>;
export type Idsa6q9es8ufjv = [bigint, FixedSizeBinary<32>];
export type Ie11u326g2gsj3 = {
    "equivocation_proof": Anonymize<I3eao7ea0kppv8>;
    "key_owner_proof": Anonymize<I3ia7aufsoj0l1>;
};
export type I67t4bps9r5c4k = AnonymousEnum<{
    /**
     *Reap the `IdentityInfo` of `who` from the Identity pallet of `T`, unreserving any
     *deposits held and removing storage items associated with `who`.
     */
    "reap_identity": Anonymize<I4cbvqmqadhrea>;
    /**
     *Update the deposit of `who`. Meant to be called by the system with an XCM `Transact`
     *Instruction.
     */
    "poke_deposit": Anonymize<I4cbvqmqadhrea>;
}>;
export type I4gil44d08grh = {
    "prefix": FixedSizeBinary<16>;
    "suffix": FixedSizeBinary<16>;
};
export type I7u915mvkdsb08 = ResultPayload<Binary, Anonymize<Iam0ikmmkagrl5>>;
export type Iam0ikmmkagrl5 = AnonymousEnum<{
    "NotImplemented": undefined;
    "NotFound": Anonymize<I4gil44d08grh>;
    "Codec": undefined;
}>;
export type I34cq3ne0l8i73 = ResultPayload<Anonymize<Ib8vqj3khtj6qe>, Anonymize<I5nrjkj9qumobs>>;
export type I5nrjkj9qumobs = AnonymousEnum<{
    "Invalid": Anonymize<Ijr7mckqs242k>;
    "Unknown": TransactionValidityUnknownTransaction;
}>;
export type Ijr7mckqs242k = AnonymousEnum<{
    "Call": undefined;
    "Payment": undefined;
    "Future": undefined;
    "Stale": undefined;
    "BadProof": undefined;
    "AncientBirthBlock": undefined;
    "ExhaustsResources": undefined;
    "Custom": number;
    "BadMandatory": undefined;
    "MandatoryValidation": undefined;
    "BadSigner": undefined;
    "IndeterminateImplicit": undefined;
    "UnknownOrigin": undefined;
}>;
export type I9ask1o4tfvcvs = ResultPayload<Anonymize<I6g5lcd9vf2cr0>, Anonymize<I5nrjkj9qumobs>>;
export type I1v2gv5pb5e508 = Array<Anonymize<Ifoo6dq4385dqu>>;
export type Ifoo6dq4385dqu = AnonymousEnum<{
    "Occupied": Anonymize<I24aelqm08mash>;
    "Scheduled": Anonymize<I4fn9prq249c92>;
    "Free": undefined;
}>;
export type I24aelqm08mash = {
    "next_up_on_available"?: Anonymize<I7o5sh7g5s2102>;
    "occupied_since": number;
    "time_out_at": number;
    "next_up_on_time_out"?: Anonymize<I7o5sh7g5s2102>;
    "availability": {
        bytes: Uint8Array;
        bitsLen: number;
    };
    "group_responsible": number;
    "candidate_hash": FixedSizeBinary<32>;
    "candidate_descriptor": Anonymize<Ibnq2mkuf1plno>;
};
export type I92i81n5kpcgte = (Anonymize<I35p841butcer2>) | undefined;
export type Ifb5bd3f9a1lu8 = Array<Anonymize<I897qba6lnil66>>;
export type I897qba6lnil66 = AnonymousEnum<{
    "CandidateBacked": Anonymize<I4s0gvfhejmdp2>;
    "CandidateIncluded": Anonymize<I4s0gvfhejmdp2>;
    "CandidateTimedOut": Anonymize<I9njsgm2qsgnil>;
}>;
export type I9aev4k6tfeeom = (Anonymize<Ia1viqq9k85bv1>) | undefined;
export type I2eq6ah7t620fb = (Anonymize<Ia9lae907oki50>) | undefined;
export type Ia9lae907oki50 = {
    "constraints": Anonymize<I20qrdh8gc2a98>;
    "pending_availability": Anonymize<I3mtrfd5bfr7au>;
};
export type I3mtrfd5bfr7au = Array<Anonymize<I95qanb0nuj7cm>>;
export type I95qanb0nuj7cm = {
    "candidate_hash": FixedSizeBinary<32>;
    "descriptor": Anonymize<Ibnq2mkuf1plno>;
    "commitments": Anonymize<Ic1d4u2opv3fst>;
    "relay_parent_number": number;
    "max_pov_size": number;
};
export type Ieskfd0vl6pk5b = Array<Anonymize<I35p841butcer2>>;
export type I56054ohcnjknc = (Anonymize<I4persbbr073ol>) | undefined;
export type I4persbbr073ol = {
    "min_relay_parent_number": number;
    "max_pov_size": number;
    "max_code_size": number;
    "max_head_data_size": number;
    "ump_remaining": number;
    "ump_remaining_bytes": number;
    "max_ump_num_per_candidate": number;
    "dmp_remaining_messages": Anonymize<Icgljjb6j82uhn>;
    "hrmp_inbound": Anonymize<Icgljjb6j82uhn>;
    "hrmp_channels_out": Anonymize<I1ilbeu6195gbh>;
    "max_hrmp_num_per_candidate": number;
    "required_parent": Binary;
    "validation_code_hash": FixedSizeBinary<32>;
    "upgrade_restriction"?: Anonymize<Ia3sb0vgvovhtg>;
    "future_validation_code"?: Anonymize<I7gtb9g2qv4r10>;
};
export type I25plekc1moieu = {
    "vote": Anonymize<I3eao7ea0kppv8>;
    "ancestry_proof": Binary;
    "header": Anonymize<Ic952bubvq4k7d>;
};
export type I1ut1enje04g2m = AnonymousEnum<{
    "System": Anonymize<Iekve0i6djpd9f>;
    "Babe": Anonymize<I1jeo0dpbkma5g>;
    "Timestamp": Anonymize<I7d75gqfg6jh9c>;
    "Indices": Anonymize<I67ac6i6ihmvpt>;
    "Balances": Anonymize<I9svldsp29mh87>;
    "Staking": Anonymize<Icm294co91mkfj>;
    "Parameters": Anonymize<Ic5v5ffa0cr70p>;
    "Session": Anonymize<Iceajactc9a8pc>;
    "Grandpa": Anonymize<I5u9ggmn8umfqm>;
    "Utility": Anonymize<I8qsbn37sql1ok>;
    "Identity": Anonymize<Iceqdqk5ub0l9g>;
    "Recovery": Anonymize<Ibk5qisar4o6r6>;
    "Vesting": Anonymize<Icgf8vmtkbnu4u>;
    "Scheduler": Anonymize<Iebqh6d4fbufno>;
    "Preimage": Anonymize<If81ks88t5mpk5>;
    "Sudo": Anonymize<If5toncvhh6qq3>;
    "Proxy": Anonymize<I3v66ec718b74>;
    "Multisig": Anonymize<I9kltligh4o9qg>;
    "ElectionProviderMultiPhase": Anonymize<I8j8o3a9ron2ol>;
    "VoterList": Anonymize<Ifvfo1l0vu2o7e>;
    "NominationPools": Anonymize<I57mljkkr28m9p>;
    "FastUnstake": Anonymize<I44snhj1gahvrd>;
    "ConvictionVoting": Anonymize<Ie5kd08tutk56t>;
    "Referenda": Anonymize<Ieovj1bltne19s>;
    "Whitelist": Anonymize<I2196kg5h82eoc>;
    "Treasury": Anonymize<I6jnp85onk3m8j>;
    "Configuration": Anonymize<I3ah0kpgrv4i88>;
    "ParasShared": undefined;
    "ParaInclusion": undefined;
    "ParaInherent": Anonymize<I1nu19212e8egv>;
    "Paras": Anonymize<I8srk490mf5vj>;
    "Initializer": Anonymize<Ieggtnkc96vvt7>;
    "Hrmp": Anonymize<I45adic8nko129>;
    "ParasDisputes": Anonymize<Ifkh1ep7g9h3rv>;
    "ParasSlashing": Anonymize<I7a6dbilbccifr>;
    "OnDemandAssignmentProvider": Anonymize<I1qq9dc763kccf>;
    "Registrar": Anonymize<Icclqj5sge2nc7>;
    "Slots": Anonymize<Iafhis924j14hg>;
    "ParasSudoWrapper": Anonymize<I8f92tvrsnq2cu>;
    "Auctions": Anonymize<I4a8qeimc5p3qn>;
    "Crowdloan": Anonymize<Iaj4q75nu5v2i2>;
    "AssignedSlots": Anonymize<Idlqs78vqqscm0>;
    "Coretime": Anonymize<Ifr31g56am9igr>;
    "StakingAhClient": Anonymize<I4e2bfaqor5ntp>;
    "MultiBlockMigrations": Anonymize<I4oqb168b2d4er>;
    "XcmPallet": Anonymize<I6k1inef986368>;
    "MessageQueue": Anonymize<I3lic4llm6egbr>;
    "AssetRate": Anonymize<If582h5gr5gh6f>;
    "RootTesting": Anonymize<I9rkc7eqejp3rj>;
    "MetaTx": Anonymize<Idifjg868aaa2d>;
    "Beefy": Anonymize<Idmcmrk34p8gic>;
    "IdentityMigrator": Anonymize<I67t4bps9r5c4k>;
}>;
export type Iftvbctbo05fu4 = ResultPayload<Anonymize<I4lvocd376nkvl>, Anonymize<Iavct6f844hfju>>;
export type I4lvocd376nkvl = Array<XcmVersionedAssetId>;
export type Iek7ha36da9mf5 = ResultPayload<XcmVersionedAssets, Anonymize<Iavct6f844hfju>>;
export type Ie7s8tm59rggr4 = ResultPayload<Anonymize<If8b9c2q9tlavv>, Anonymize<I55ku9c5gk50hb>>;
export type If8b9c2q9tlavv = {
    "execution_result": Anonymize<I52bohnq0qt2b0>;
    "emitted_events": Anonymize<Idncd8hsje2r4u>;
    "local_xcm"?: Anonymize<Ieqgqma27vbupd>;
    "forwarded_xcms": Anonymize<Ialhmrpub9sefe>;
};
export type Idncd8hsje2r4u = Array<Anonymize<I5ndpakc7tptdv>>;
export type Ieqgqma27vbupd = (XcmVersionedXcm) | undefined;
export type Ialhmrpub9sefe = Array<Anonymize<I56d9gmmhnf5oa>>;
export type I56d9gmmhnf5oa = [XcmVersionedLocation, Anonymize<Ie1m9ii7jv2l7v>];
export type Ie1m9ii7jv2l7v = Array<XcmVersionedXcm>;
export type I6e426h0457po1 = ResultPayload<Anonymize<I870h1qaqk8cvh>, Anonymize<I55ku9c5gk50hb>>;
export type I870h1qaqk8cvh = {
    "execution_result": Anonymize<Ieqhmksji3pmv5>;
    "emitted_events": Anonymize<Idncd8hsje2r4u>;
    "forwarded_xcms": Anonymize<Ialhmrpub9sefe>;
};
export type XcmVersionedAsset = Enum<{
    "V3": Anonymize<Idcm24504c8bkk>;
    "V4": Anonymize<Ia5l7mu5a6v49o>;
    "V5": Anonymize<Iffh1nc5e1mod6>;
}>;
export declare const XcmVersionedAsset: GetEnum<XcmVersionedAsset>;
export type Icujp6hmv35vbn = ResultPayload<boolean, Anonymize<I3886purtlrjg1>>;
export type I3886purtlrjg1 = AnonymousEnum<{
    "VersionedAssetConversionFailed": undefined;
    "VersionedLocationConversionFailed": undefined;
}>;
export {};
