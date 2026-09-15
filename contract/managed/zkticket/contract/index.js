import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.16.0');

export var EventStatus;
(function (EventStatus) {
  EventStatus[EventStatus['ACTIVE'] = 0] = 'ACTIVE';
  EventStatus[EventStatus['PAUSED'] = 1] = 'PAUSED';
  EventStatus[EventStatus['CLOSED'] = 2] = 'CLOSED';
})(EventStatus || (EventStatus = {}));

export var TicketTier;
(function (TicketTier) {
  TicketTier[TicketTier['GENERAL'] = 0] = 'GENERAL';
  TicketTier[TicketTier['PREMIUM'] = 1] = 'PREMIUM';
})(TicketTier || (TicketTier = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_1 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_2 = new __compactRuntime.CompactTypeBytes(128);

const _descriptor_3 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

const _descriptor_4 = new __compactRuntime.CompactTypeUnsignedInteger(4294967295n, 4);

const _descriptor_5 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

const _descriptor_6 = new __compactRuntime.CompactTypeEnum(2, 1);

class _EventRecord_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_5.alignment().concat(_descriptor_5.alignment().concat(_descriptor_1.alignment().concat(_descriptor_6.alignment()))))))))))))))));
  }
  fromValue(value_0) {
    return {
      name: _descriptor_1.fromValue(value_0),
      venue: _descriptor_1.fromValue(value_0),
      dateLabel: _descriptor_1.fromValue(value_0),
      artworkUrl: _descriptor_2.fromValue(value_0),
      startsAt: _descriptor_0.fromValue(value_0),
      minAge: _descriptor_3.fromValue(value_0),
      ageCutoff: _descriptor_4.fromValue(value_0),
      capacity: _descriptor_0.fromValue(value_0),
      generalPrice: _descriptor_0.fromValue(value_0),
      premiumPrice: _descriptor_0.fromValue(value_0),
      maxTransfers: _descriptor_3.fromValue(value_0),
      issued: _descriptor_0.fromValue(value_0),
      redeemed: _descriptor_0.fromValue(value_0),
      revenue: _descriptor_5.fromValue(value_0),
      proceedsClaimed: _descriptor_5.fromValue(value_0),
      organizerHash: _descriptor_1.fromValue(value_0),
      status: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.name).concat(_descriptor_1.toValue(value_0.venue).concat(_descriptor_1.toValue(value_0.dateLabel).concat(_descriptor_2.toValue(value_0.artworkUrl).concat(_descriptor_0.toValue(value_0.startsAt).concat(_descriptor_3.toValue(value_0.minAge).concat(_descriptor_4.toValue(value_0.ageCutoff).concat(_descriptor_0.toValue(value_0.capacity).concat(_descriptor_0.toValue(value_0.generalPrice).concat(_descriptor_0.toValue(value_0.premiumPrice).concat(_descriptor_3.toValue(value_0.maxTransfers).concat(_descriptor_0.toValue(value_0.issued).concat(_descriptor_0.toValue(value_0.redeemed).concat(_descriptor_5.toValue(value_0.revenue).concat(_descriptor_5.toValue(value_0.proceedsClaimed).concat(_descriptor_1.toValue(value_0.organizerHash).concat(_descriptor_6.toValue(value_0.status)))))))))))))))));
  }
}

const _descriptor_7 = new _EventRecord_0();

const _descriptor_8 = __compactRuntime.CompactTypeBoolean;

class _UserAddress_0 {
  alignment() {
    return _descriptor_1.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.bytes);
  }
}

const _descriptor_9 = new _UserAddress_0();

const _descriptor_10 = new __compactRuntime.CompactTypeEnum(1, 1);

class _TicketRecord_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_10.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_8.alignment().concat(_descriptor_3.alignment())))));
  }
  fromValue(value_0) {
    return {
      eventId: _descriptor_0.fromValue(value_0),
      tier: _descriptor_10.fromValue(value_0),
      ownerHash: _descriptor_1.fromValue(value_0),
      entryCommitment: _descriptor_1.fromValue(value_0),
      used: _descriptor_8.fromValue(value_0),
      transfers: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.eventId).concat(_descriptor_10.toValue(value_0.tier).concat(_descriptor_1.toValue(value_0.ownerHash).concat(_descriptor_1.toValue(value_0.entryCommitment).concat(_descriptor_8.toValue(value_0.used).concat(_descriptor_3.toValue(value_0.transfers))))));
  }
}

const _descriptor_11 = new _TicketRecord_0();

const _descriptor_12 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

class _EventOwnerPreimage_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      domain: _descriptor_1.fromValue(value_0),
      secret: _descriptor_1.fromValue(value_0),
      eventId: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.domain).concat(_descriptor_1.toValue(value_0.secret).concat(_descriptor_0.toValue(value_0.eventId)));
  }
}

const _descriptor_13 = new _EventOwnerPreimage_0();

class _EntryPreimage_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      domain: _descriptor_1.fromValue(value_0),
      secret: _descriptor_1.fromValue(value_0),
      ticketId: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.domain).concat(_descriptor_1.toValue(value_0.secret).concat(_descriptor_0.toValue(value_0.ticketId)));
  }
}

const _descriptor_14 = new _EntryPreimage_0();

const _descriptor_15 = new __compactRuntime.CompactTypeVector(2, _descriptor_1);

class _Either_0 {
  alignment() {
    return _descriptor_8.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_8.fromValue(value_0),
      left: _descriptor_1.fromValue(value_0),
      right: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_8.toValue(value_0.is_left).concat(_descriptor_1.toValue(value_0.left).concat(_descriptor_1.toValue(value_0.right)));
  }
}

const _descriptor_16 = new _Either_0();

class _ContractAddress_0 {
  alignment() {
    return _descriptor_1.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.bytes);
  }
}

const _descriptor_17 = new _ContractAddress_0();

class _Either_1 {
  alignment() {
    return _descriptor_8.alignment().concat(_descriptor_17.alignment().concat(_descriptor_9.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_8.fromValue(value_0),
      left: _descriptor_17.fromValue(value_0),
      right: _descriptor_9.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_8.toValue(value_0.is_left).concat(_descriptor_17.toValue(value_0.left).concat(_descriptor_9.toValue(value_0.right)));
  }
}

const _descriptor_18 = new _Either_1();

export class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    if (typeof(witnesses_0.localSecretKey) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named localSecretKey');
    }
    if (typeof(witnesses_0.localBirthDate) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named localBirthDate');
    }
    if (typeof(witnesses_0.localEntrySecret) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named localEntrySecret');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      organizerCommitment(context, ...args_1) {
        return { result: pureCircuits.organizerCommitment(...args_1), context };
      },
      ownerCommitment(context, ...args_1) {
        return { result: pureCircuits.ownerCommitment(...args_1), context };
      },
      entryCommitment(context, ...args_1) {
        return { result: pureCircuits.entryCommitment(...args_1), context };
      },
      priceForTier(context, ...args_1) {
        return { result: pureCircuits.priceForTier(...args_1), context };
      },
      createEvent: (...args_1) => {
        if (args_1.length !== 12) {
          throw new __compactRuntime.CompactError(`createEvent: expected 12 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const name_0 = args_1[1];
        const venue_0 = args_1[2];
        const dateLabel_0 = args_1[3];
        const artworkUrl_0 = args_1[4];
        const startsAt_0 = args_1[5];
        const minAge_0 = args_1[6];
        const ageCutoff_0 = args_1[7];
        const capacity_0 = args_1[8];
        const generalPrice_0 = args_1[9];
        const premiumPrice_0 = args_1[10];
        const maxTransfers_0 = args_1[11];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('createEvent',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkticket.compact line 103 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(name_0.buffer instanceof ArrayBuffer && name_0.BYTES_PER_ELEMENT === 1 && name_0.length === 32)) {
          __compactRuntime.typeError('createEvent',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkticket.compact line 103 char 1',
                                     'Bytes<32>',
                                     name_0)
        }
        if (!(venue_0.buffer instanceof ArrayBuffer && venue_0.BYTES_PER_ELEMENT === 1 && venue_0.length === 32)) {
          __compactRuntime.typeError('createEvent',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'zkticket.compact line 103 char 1',
                                     'Bytes<32>',
                                     venue_0)
        }
        if (!(dateLabel_0.buffer instanceof ArrayBuffer && dateLabel_0.BYTES_PER_ELEMENT === 1 && dateLabel_0.length === 32)) {
          __compactRuntime.typeError('createEvent',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'zkticket.compact line 103 char 1',
                                     'Bytes<32>',
                                     dateLabel_0)
        }
        if (!(artworkUrl_0.buffer instanceof ArrayBuffer && artworkUrl_0.BYTES_PER_ELEMENT === 1 && artworkUrl_0.length === 128)) {
          __compactRuntime.typeError('createEvent',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'zkticket.compact line 103 char 1',
                                     'Bytes<128>',
                                     artworkUrl_0)
        }
        if (!(typeof(startsAt_0) === 'bigint' && startsAt_0 >= 0n && startsAt_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('createEvent',
                                     'argument 5 (argument 6 as invoked from Typescript)',
                                     'zkticket.compact line 103 char 1',
                                     'Uint<0..18446744073709551616>',
                                     startsAt_0)
        }
        if (!(typeof(minAge_0) === 'bigint' && minAge_0 >= 0n && minAge_0 <= 255n)) {
          __compactRuntime.typeError('createEvent',
                                     'argument 6 (argument 7 as invoked from Typescript)',
                                     'zkticket.compact line 103 char 1',
                                     'Uint<0..256>',
                                     minAge_0)
        }
        if (!(typeof(ageCutoff_0) === 'bigint' && ageCutoff_0 >= 0n && ageCutoff_0 <= 4294967295n)) {
          __compactRuntime.typeError('createEvent',
                                     'argument 7 (argument 8 as invoked from Typescript)',
                                     'zkticket.compact line 103 char 1',
                                     'Uint<0..4294967296>',
                                     ageCutoff_0)
        }
        if (!(typeof(capacity_0) === 'bigint' && capacity_0 >= 0n && capacity_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('createEvent',
                                     'argument 8 (argument 9 as invoked from Typescript)',
                                     'zkticket.compact line 103 char 1',
                                     'Uint<0..18446744073709551616>',
                                     capacity_0)
        }
        if (!(typeof(generalPrice_0) === 'bigint' && generalPrice_0 >= 0n && generalPrice_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('createEvent',
                                     'argument 9 (argument 10 as invoked from Typescript)',
                                     'zkticket.compact line 103 char 1',
                                     'Uint<0..18446744073709551616>',
                                     generalPrice_0)
        }
        if (!(typeof(premiumPrice_0) === 'bigint' && premiumPrice_0 >= 0n && premiumPrice_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('createEvent',
                                     'argument 10 (argument 11 as invoked from Typescript)',
                                     'zkticket.compact line 103 char 1',
                                     'Uint<0..18446744073709551616>',
                                     premiumPrice_0)
        }
        if (!(typeof(maxTransfers_0) === 'bigint' && maxTransfers_0 >= 0n && maxTransfers_0 <= 255n)) {
          __compactRuntime.typeError('createEvent',
                                     'argument 11 (argument 12 as invoked from Typescript)',
                                     'zkticket.compact line 103 char 1',
                                     'Uint<0..256>',
                                     maxTransfers_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(name_0).concat(_descriptor_1.toValue(venue_0).concat(_descriptor_1.toValue(dateLabel_0).concat(_descriptor_2.toValue(artworkUrl_0).concat(_descriptor_0.toValue(startsAt_0).concat(_descriptor_3.toValue(minAge_0).concat(_descriptor_4.toValue(ageCutoff_0).concat(_descriptor_0.toValue(capacity_0).concat(_descriptor_0.toValue(generalPrice_0).concat(_descriptor_0.toValue(premiumPrice_0).concat(_descriptor_3.toValue(maxTransfers_0))))))))))),
            alignment: _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment()))))))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._createEvent_0(context,
                                             partialProofData,
                                             name_0,
                                             venue_0,
                                             dateLabel_0,
                                             artworkUrl_0,
                                             startsAt_0,
                                             minAge_0,
                                             ageCutoff_0,
                                             capacity_0,
                                             generalPrice_0,
                                             premiumPrice_0,
                                             maxTransfers_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setEventStatus: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`setEventStatus: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const eventId_0 = args_1[1];
        const status_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('setEventStatus',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkticket.compact line 145 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(eventId_0) === 'bigint' && eventId_0 >= 0n && eventId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('setEventStatus',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkticket.compact line 145 char 1',
                                     'Uint<0..18446744073709551616>',
                                     eventId_0)
        }
        if (!(typeof(status_0) === 'number' && status_0 >= 0 && status_0 <= 2)) {
          __compactRuntime.typeError('setEventStatus',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'zkticket.compact line 145 char 1',
                                     'Enum<EventStatus, ACTIVE, PAUSED, CLOSED>',
                                     status_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(eventId_0).concat(_descriptor_6.toValue(status_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_6.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setEventStatus_0(context,
                                                partialProofData,
                                                eventId_0,
                                                status_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      buyTicket: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`buyTicket: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const eventId_0 = args_1[1];
        const tier_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('buyTicket',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkticket.compact line 153 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(eventId_0) === 'bigint' && eventId_0 >= 0n && eventId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('buyTicket',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkticket.compact line 153 char 1',
                                     'Uint<0..18446744073709551616>',
                                     eventId_0)
        }
        if (!(typeof(tier_0) === 'number' && tier_0 >= 0 && tier_0 <= 1)) {
          __compactRuntime.typeError('buyTicket',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'zkticket.compact line 153 char 1',
                                     'Enum<TicketTier, GENERAL, PREMIUM>',
                                     tier_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(eventId_0).concat(_descriptor_10.toValue(tier_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_10.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._buyTicket_0(context,
                                           partialProofData,
                                           eventId_0,
                                           tier_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      proveEligibility: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`proveEligibility: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const ticketId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('proveEligibility',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkticket.compact line 183 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(ticketId_0) === 'bigint' && ticketId_0 >= 0n && ticketId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('proveEligibility',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkticket.compact line 183 char 1',
                                     'Uint<0..18446744073709551616>',
                                     ticketId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(ticketId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._proveEligibility_0(context,
                                                  partialProofData,
                                                  ticketId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      prepareEntry: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`prepareEntry: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const ticketId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('prepareEntry',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkticket.compact line 199 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(ticketId_0) === 'bigint' && ticketId_0 >= 0n && ticketId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('prepareEntry',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkticket.compact line 199 char 1',
                                     'Uint<0..18446744073709551616>',
                                     ticketId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(ticketId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._prepareEntry_0(context,
                                              partialProofData,
                                              ticketId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      redeemTicket: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`redeemTicket: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const ticketId_0 = args_1[1];
        const presentedSecret_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('redeemTicket',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkticket.compact line 219 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(ticketId_0) === 'bigint' && ticketId_0 >= 0n && ticketId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('redeemTicket',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkticket.compact line 219 char 1',
                                     'Uint<0..18446744073709551616>',
                                     ticketId_0)
        }
        if (!(presentedSecret_0.buffer instanceof ArrayBuffer && presentedSecret_0.BYTES_PER_ELEMENT === 1 && presentedSecret_0.length === 32)) {
          __compactRuntime.typeError('redeemTicket',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'zkticket.compact line 219 char 1',
                                     'Bytes<32>',
                                     presentedSecret_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(ticketId_0).concat(_descriptor_1.toValue(presentedSecret_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_1.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._redeemTicket_0(context,
                                              partialProofData,
                                              ticketId_0,
                                              presentedSecret_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      transferTicket: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`transferTicket: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const ticketId_0 = args_1[1];
        const newOwnerHash_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('transferTicket',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkticket.compact line 236 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(ticketId_0) === 'bigint' && ticketId_0 >= 0n && ticketId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('transferTicket',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkticket.compact line 236 char 1',
                                     'Uint<0..18446744073709551616>',
                                     ticketId_0)
        }
        if (!(newOwnerHash_0.buffer instanceof ArrayBuffer && newOwnerHash_0.BYTES_PER_ELEMENT === 1 && newOwnerHash_0.length === 32)) {
          __compactRuntime.typeError('transferTicket',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'zkticket.compact line 236 char 1',
                                     'Bytes<32>',
                                     newOwnerHash_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(ticketId_0).concat(_descriptor_1.toValue(newOwnerHash_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_1.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._transferTicket_0(context,
                                                partialProofData,
                                                ticketId_0,
                                                newOwnerHash_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      claimEventProceeds: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`claimEventProceeds: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const eventId_0 = args_1[1];
        const recipient_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('claimEventProceeds',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkticket.compact line 255 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(eventId_0) === 'bigint' && eventId_0 >= 0n && eventId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('claimEventProceeds',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkticket.compact line 255 char 1',
                                     'Uint<0..18446744073709551616>',
                                     eventId_0)
        }
        if (!(typeof(recipient_0) === 'object' && recipient_0.bytes.buffer instanceof ArrayBuffer && recipient_0.bytes.BYTES_PER_ELEMENT === 1 && recipient_0.bytes.length === 32)) {
          __compactRuntime.typeError('claimEventProceeds',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'zkticket.compact line 255 char 1',
                                     'struct UserAddress<bytes: Bytes<32>>',
                                     recipient_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(eventId_0).concat(_descriptor_9.toValue(recipient_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_9.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._claimEventProceeds_0(context,
                                                    partialProofData,
                                                    eventId_0,
                                                    recipient_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      createEvent: this.circuits.createEvent,
      setEventStatus: this.circuits.setEventStatus,
      buyTicket: this.circuits.buyTicket,
      proveEligibility: this.circuits.proveEligibility,
      prepareEntry: this.circuits.prepareEntry,
      redeemTicket: this.circuits.redeemTicket,
      transferTicket: this.circuits.transferTicket,
      claimEventProceeds: this.circuits.claimEventProceeds
    };
    this.provableCircuits = {
      createEvent: this.circuits.createEvent,
      setEventStatus: this.circuits.setEventStatus,
      buyTicket: this.circuits.buyTicket,
      proveEligibility: this.circuits.proveEligibility,
      prepareEntry: this.circuits.prepareEntry,
      redeemTicket: this.circuits.redeemTicket,
      transferTicket: this.circuits.transferTicket,
      claimEventProceeds: this.circuits.claimEventProceeds
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('createEvent', new __compactRuntime.ContractOperation());
    state_0.setOperation('setEventStatus', new __compactRuntime.ContractOperation());
    state_0.setOperation('buyTicket', new __compactRuntime.ContractOperation());
    state_0.setOperation('proveEligibility', new __compactRuntime.ContractOperation());
    state_0.setOperation('prepareEntry', new __compactRuntime.ContractOperation());
    state_0.setOperation('redeemTicket', new __compactRuntime.ContractOperation());
    state_0.setOperation('transferTicket', new __compactRuntime.ContractOperation());
    state_0.setOperation('claimEventProceeds', new __compactRuntime.ContractOperation());
    const context = __compactRuntime.createCircuitContext(__compactRuntime.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(1n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(2n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(3n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    state_0.data = new __compactRuntime.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _left_0(value_0) {
    return { is_left: true, left: value_0, right: new Uint8Array(32) };
  }
  _right_0(value_0) {
    return { is_left: false, left: { bytes: new Uint8Array(32) }, right: value_0 };
  }
  _nativeToken_0() {
    return new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
  _sendUnshielded_0(context, partialProofData, color_0, amount_0, recipient_0) {
    const tmp_0 = this._left_0(color_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_3.toValue(7n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(tmp_0),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { dup: { n: 1 } },
                                       { dup: { n: 1 } },
                                       'member',
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(amount_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { swap: { n: 0 } },
                                       'neg',
                                       { branch: { skip: 4 } },
                                       { dup: { n: 2 } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: true,
                                                pushPath: false,
                                                path: [ { tag: 'stack' }] } },
                                       'add',
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    const tmp_1 = this._left_0(color_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_3.toValue(8n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell(__compactRuntime.alignedConcat(
                                                                                              { value: _descriptor_16.toValue(tmp_1),
                                                                                                alignment: _descriptor_16.alignment() },
                                                                                              { value: _descriptor_18.toValue(recipient_0),
                                                                                                alignment: _descriptor_18.alignment() }
                                                                                            )).encode() } },
                                       { dup: { n: 1 } },
                                       { dup: { n: 1 } },
                                       'member',
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(amount_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { swap: { n: 0 } },
                                       'neg',
                                       { branch: { skip: 4 } },
                                       { dup: { n: 2 } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: true,
                                                pushPath: false,
                                                path: [ { tag: 'stack' }] } },
                                       'add',
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    if (recipient_0.is_left
        &&
        this._equal_0(recipient_0.left.bytes,
                      _descriptor_17.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 2 } },
                                                                                  { idx: { cached: true,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_3.toValue(0n),
                                                                                                             alignment: _descriptor_3.alignment() } }] } },
                                                                                  { popeq: { cached: true,
                                                                                             result: undefined } }]).value).bytes))
    {
      const tmp_2 = this._left_0(color_0);
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { swap: { n: 0 } },
                                         { idx: { cached: true,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_3.toValue(6n),
                                                                    alignment: _descriptor_3.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(tmp_2),
                                                                                                alignment: _descriptor_16.alignment() }).encode() } },
                                         { dup: { n: 1 } },
                                         { dup: { n: 1 } },
                                         'member',
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(amount_0),
                                                                                                alignment: _descriptor_5.alignment() }).encode() } },
                                         { swap: { n: 0 } },
                                         'neg',
                                         { branch: { skip: 4 } },
                                         { dup: { n: 2 } },
                                         { dup: { n: 2 } },
                                         { idx: { cached: true,
                                                  pushPath: false,
                                                  path: [ { tag: 'stack' }] } },
                                         'add',
                                         { ins: { cached: true, n: 2 } },
                                         { swap: { n: 0 } }]);
    }
    return [];
  }
  _receiveUnshielded_0(context, partialProofData, color_0, amount_0) {
    const tmp_0 = this._left_0(color_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_3.toValue(6n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(tmp_0),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { dup: { n: 1 } },
                                       { dup: { n: 1 } },
                                       'member',
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(amount_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { swap: { n: 0 } },
                                       'neg',
                                       { branch: { skip: 4 } },
                                       { dup: { n: 2 } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: true,
                                                pushPath: false,
                                                path: [ { tag: 'stack' }] } },
                                       'add',
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    return [];
  }
  _unshieldedBalanceLt_0(context, partialProofData, color_0, amount_0) {
    const tmp_0 = this._left_0(color_0);
    return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 2 } },
                                                                      { idx: { cached: true,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_3.toValue(5n),
                                                                                                 alignment: _descriptor_3.alignment() } }] } },
                                                                      { dup: { n: 0 } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(tmp_0),
                                                                                                                             alignment: _descriptor_16.alignment() }).encode() } },
                                                                      'member',
                                                                      { branch: { skip: 3 } },
                                                                      'pop',
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0n),
                                                                                                                             alignment: _descriptor_5.alignment() }).encode() } },
                                                                      { jmp: { skip: 1 } },
                                                                      { idx: { cached: true,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_16.toValue(tmp_0),
                                                                                                 alignment: _descriptor_16.alignment() } }] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(amount_0),
                                                                                                                             alignment: _descriptor_5.alignment() }).encode() } },
                                                                      'lt',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value);
  }
  _unshieldedBalanceGte_0(context, partialProofData, color_0, amount_0) {
    return !this._unshieldedBalanceLt_0(context,
                                        partialProofData,
                                        color_0,
                                        amount_0);
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_15, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_13, value_0);
    return result_0;
  }
  _persistentHash_2(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_14, value_0);
    return result_0;
  }
  _localSecretKey_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.localSecretKey(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('localSecretKey',
                                 'return value',
                                 'zkticket.compact line 69 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_1.toValue(result_0),
      alignment: _descriptor_1.alignment()
    });
    return result_0;
  }
  _localBirthDate_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.localBirthDate(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'bigint' && result_0 >= 0n && result_0 <= 4294967295n)) {
      __compactRuntime.typeError('localBirthDate',
                                 'return value',
                                 'zkticket.compact line 70 char 1',
                                 'Uint<0..4294967296>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_4.toValue(result_0),
      alignment: _descriptor_4.alignment()
    });
    return result_0;
  }
  _localEntrySecret_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.localEntrySecret(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('localEntrySecret',
                                 'return value',
                                 'zkticket.compact line 71 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_1.toValue(result_0),
      alignment: _descriptor_1.alignment()
    });
    return result_0;
  }
  _organizerCommitment_0(sk_0) {
    return this._persistentHash_0([new Uint8Array([122, 107, 116, 105, 99, 107, 101, 116, 58, 111, 114, 103, 97, 110, 105, 122, 101, 114, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   sk_0]);
  }
  _ownerCommitment_0(sk_0, eventId_0) {
    return this._persistentHash_1({ domain:
                                      new Uint8Array([122, 107, 116, 105, 99, 107, 101, 116, 58, 111, 119, 110, 101, 114, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                    secret: sk_0,
                                    eventId: eventId_0 });
  }
  _entryCommitment_0(entrySecret_0, ticketId_0) {
    return this._persistentHash_2({ domain:
                                      new Uint8Array([122, 107, 116, 105, 99, 107, 101, 116, 58, 101, 110, 116, 114, 121, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                    secret: entrySecret_0,
                                    ticketId: ticketId_0 });
  }
  _priceForTier_0(event_0, tier_0) {
    if (tier_0 === 1) {
      return event_0.premiumPrice;
    } else {
      return event_0.generalPrice;
    }
  }
  _createEvent_0(context,
                 partialProofData,
                 name_0,
                 venue_0,
                 dateLabel_0,
                 artworkUrl_0,
                 startsAt_0,
                 minAge_0,
                 ageCutoff_0,
                 capacity_0,
                 generalPrice_0,
                 premiumPrice_0,
                 maxTransfers_0)
  {
    __compactRuntime.assert(capacity_0 > 0n,
                            'capacity must be greater than zero');
    __compactRuntime.assert(maxTransfers_0 <= 8n, 'transfer limit is too high');
    __compactRuntime.assert(this._equal_1(minAge_0, 0n)
                            &&
                            this._equal_2(ageCutoff_0, 0n)
                            ||
                            minAge_0 > 0n && ageCutoff_0 > 0n,
                            'invalid age policy');
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_3.toValue(2n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_12.toValue(tmp_0),
                                                                alignment: _descriptor_12.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 1 } }]);
    const eventId_0 = _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_3.toValue(2n),
                                                                                                            alignment: _descriptor_3.alignment() } }] } },
                                                                                 { popeq: { cached: true,
                                                                                            result: undefined } }]).value);
    const organizerHash_0 = this._organizerCommitment_0(this._localSecretKey_0(context,
                                                                               partialProofData));
    const tmp_1 = { name: name_0,
                    venue: venue_0,
                    dateLabel: dateLabel_0,
                    artworkUrl: artworkUrl_0,
                    startsAt: startsAt_0,
                    minAge: minAge_0,
                    ageCutoff: ageCutoff_0,
                    capacity: capacity_0,
                    generalPrice: generalPrice_0,
                    premiumPrice: premiumPrice_0,
                    maxTransfers: maxTransfers_0,
                    issued: 0n,
                    redeemed: 0n,
                    revenue: 0n,
                    proceedsClaimed: 0n,
                    organizerHash: organizerHash_0,
                    status: 0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_3.toValue(0n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(eventId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_1),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _setEventStatus_0(context, partialProofData, eventId_0, status_0) {
    const publicEventId_0 = eventId_0;
    __compactRuntime.assert(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_3.toValue(0n),
                                                                                                                  alignment: _descriptor_3.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(publicEventId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'event not found');
    const event_0 = _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                              partialProofData,
                                                                              [
                                                                               { dup: { n: 0 } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_3.toValue(0n),
                                                                                                          alignment: _descriptor_3.alignment() } }] } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_0.toValue(publicEventId_0),
                                                                                                          alignment: _descriptor_0.alignment() } }] } },
                                                                               { popeq: { cached: false,
                                                                                          result: undefined } }]).value);
    __compactRuntime.assert(this._equal_3(this._organizerCommitment_0(this._localSecretKey_0(context,
                                                                                             partialProofData)),
                                          event_0.organizerHash),
                            'organizer authorization failed');
    const tmp_0 = { name: event_0.name,
                    venue: event_0.venue,
                    dateLabel: event_0.dateLabel,
                    artworkUrl: event_0.artworkUrl,
                    startsAt: event_0.startsAt,
                    minAge: event_0.minAge,
                    ageCutoff: event_0.ageCutoff,
                    capacity: event_0.capacity,
                    generalPrice: event_0.generalPrice,
                    premiumPrice: event_0.premiumPrice,
                    maxTransfers: event_0.maxTransfers,
                    issued: event_0.issued,
                    redeemed: event_0.redeemed,
                    revenue: event_0.revenue,
                    proceedsClaimed: event_0.proceedsClaimed,
                    organizerHash: event_0.organizerHash,
                    status: status_0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_3.toValue(0n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(publicEventId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _buyTicket_0(context, partialProofData, eventId_0, tier_0) {
    const publicEventId_0 = eventId_0;
    const publicTier_0 = tier_0;
    __compactRuntime.assert(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_3.toValue(0n),
                                                                                                                  alignment: _descriptor_3.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(publicEventId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'event not found');
    const event_0 = _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                              partialProofData,
                                                                              [
                                                                               { dup: { n: 0 } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_3.toValue(0n),
                                                                                                          alignment: _descriptor_3.alignment() } }] } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_0.toValue(publicEventId_0),
                                                                                                          alignment: _descriptor_0.alignment() } }] } },
                                                                               { popeq: { cached: false,
                                                                                          result: undefined } }]).value);
    __compactRuntime.assert(event_0.status === 0,
                            'event is not accepting tickets');
    let t_0;
    __compactRuntime.assert((t_0 = event_0.issued, t_0 < event_0.capacity),
                            'event is sold out');
    const ticketPrice_0 = this._priceForTier_0(event_0, publicTier_0);
    this._receiveUnshielded_0(context,
                              partialProofData,
                              this._nativeToken_0(),
                              ticketPrice_0);
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_3.toValue(3n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_12.toValue(tmp_0),
                                                                alignment: _descriptor_12.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 1 } }]);
    const ticketId_0 = _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 0 } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_3.toValue(3n),
                                                                                                             alignment: _descriptor_3.alignment() } }] } },
                                                                                  { popeq: { cached: true,
                                                                                             result: undefined } }]).value);
    const holder_0 = this._ownerCommitment_0(this._localSecretKey_0(context,
                                                                    partialProofData),
                                             eventId_0);
    const tmp_1 = { eventId: publicEventId_0,
                    tier: publicTier_0,
                    ownerHash: holder_0,
                    entryCommitment: new Uint8Array(32),
                    used: false,
                    transfers: 0n };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_3.toValue(1n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ticketId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(tmp_1),
                                                                                              alignment: _descriptor_11.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_2 = { name: event_0.name,
                    venue: event_0.venue,
                    dateLabel: event_0.dateLabel,
                    artworkUrl: event_0.artworkUrl,
                    startsAt: event_0.startsAt,
                    minAge: event_0.minAge,
                    ageCutoff: event_0.ageCutoff,
                    capacity: event_0.capacity,
                    generalPrice: event_0.generalPrice,
                    premiumPrice: event_0.premiumPrice,
                    maxTransfers: event_0.maxTransfers,
                    issued:
                      ((t1) => {
                        if (t1 > 18446744073709551615n) {
                          throw new __compactRuntime.CompactError('zkticket.compact line 178 char 13: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                        }
                        return t1;
                      })(event_0.issued + 1n),
                    redeemed: event_0.redeemed,
                    revenue:
                      ((t1) => {
                        if (t1 > 340282366920938463463374607431768211455n) {
                          throw new __compactRuntime.CompactError('zkticket.compact line 179 char 14: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                        }
                        return t1;
                      })(event_0.revenue + ticketPrice_0),
                    proceedsClaimed: event_0.proceedsClaimed,
                    organizerHash: event_0.organizerHash,
                    status: event_0.status };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_3.toValue(0n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(publicEventId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_2),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _proveEligibility_0(context, partialProofData, ticketId_0) {
    const publicTicketId_0 = ticketId_0;
    __compactRuntime.assert(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_3.toValue(1n),
                                                                                                                  alignment: _descriptor_3.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(publicTicketId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'ticket not found');
    const ticket_0 = _descriptor_11.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_3.toValue(1n),
                                                                                                            alignment: _descriptor_3.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_0.toValue(publicTicketId_0),
                                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value);
    let tmp_0;
    __compactRuntime.assert((tmp_0 = ticket_0.eventId,
                             _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_3.toValue(0n),
                                                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)),
                            'event not found');
    let tmp_1;
    const event_0 = (tmp_1 = ticket_0.eventId,
                     _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_3.toValue(0n),
                                                                                                           alignment: _descriptor_3.alignment() } }] } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_0.toValue(tmp_1),
                                                                                                           alignment: _descriptor_0.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value));
    __compactRuntime.assert(!ticket_0.used, 'ticket already redeemed');
    __compactRuntime.assert(this._equal_4(this._ownerCommitment_0(this._localSecretKey_0(context,
                                                                                         partialProofData),
                                                                  ticket_0.eventId),
                                          ticket_0.ownerHash),
                            'ticket ownership proof failed');
    const birthDate_0 = this._localBirthDate_0(context, partialProofData);
    let t_0;
    if (t_0 = event_0.ageCutoff, t_0 > 0n) {
      __compactRuntime.assert(birthDate_0 > 0n, 'birth date is required');
      __compactRuntime.assert(birthDate_0 <= event_0.ageCutoff,
                              'age requirement not met');
    }
    return [];
  }
  _prepareEntry_0(context, partialProofData, ticketId_0) {
    const publicTicketId_0 = ticketId_0;
    __compactRuntime.assert(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_3.toValue(1n),
                                                                                                                  alignment: _descriptor_3.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(publicTicketId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'ticket not found');
    const ticket_0 = _descriptor_11.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_3.toValue(1n),
                                                                                                            alignment: _descriptor_3.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_0.toValue(publicTicketId_0),
                                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value);
    let tmp_0;
    __compactRuntime.assert((tmp_0 = ticket_0.eventId,
                             _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_3.toValue(0n),
                                                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)),
                            'event not found');
    let tmp_1;
    const event_0 = (tmp_1 = ticket_0.eventId,
                     _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_3.toValue(0n),
                                                                                                           alignment: _descriptor_3.alignment() } }] } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_0.toValue(tmp_1),
                                                                                                           alignment: _descriptor_0.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value));
    __compactRuntime.assert(event_0.status !== 2, 'event entry is closed');
    __compactRuntime.assert(!ticket_0.used, 'ticket already redeemed');
    __compactRuntime.assert(this._equal_5(this._ownerCommitment_0(this._localSecretKey_0(context,
                                                                                         partialProofData),
                                                                  ticket_0.eventId),
                                          ticket_0.ownerHash),
                            'ticket ownership proof failed');
    const birthDate_0 = this._localBirthDate_0(context, partialProofData);
    let t_0;
    if (t_0 = event_0.ageCutoff, t_0 > 0n) {
      __compactRuntime.assert(birthDate_0 > 0n, 'birth date is required');
      __compactRuntime.assert(birthDate_0 <= event_0.ageCutoff,
                              'age requirement not met');
    }
    const commitment_0 = this._entryCommitment_0(this._localEntrySecret_0(context,
                                                                          partialProofData),
                                                 ticketId_0);
    const tmp_2 = { eventId: ticket_0.eventId,
                    tier: ticket_0.tier,
                    ownerHash: ticket_0.ownerHash,
                    entryCommitment: commitment_0,
                    used: ticket_0.used,
                    transfers: ticket_0.transfers };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_3.toValue(1n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(publicTicketId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(tmp_2),
                                                                                              alignment: _descriptor_11.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _redeemTicket_0(context, partialProofData, ticketId_0, presentedSecret_0) {
    const publicTicketId_0 = ticketId_0;
    __compactRuntime.assert(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_3.toValue(1n),
                                                                                                                  alignment: _descriptor_3.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(publicTicketId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'ticket not found');
    const ticket_0 = _descriptor_11.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_3.toValue(1n),
                                                                                                            alignment: _descriptor_3.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_0.toValue(publicTicketId_0),
                                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value);
    let tmp_0;
    __compactRuntime.assert((tmp_0 = ticket_0.eventId,
                             _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_3.toValue(0n),
                                                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)),
                            'event not found');
    let tmp_1;
    const event_0 = (tmp_1 = ticket_0.eventId,
                     _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_3.toValue(0n),
                                                                                                           alignment: _descriptor_3.alignment() } }] } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_0.toValue(tmp_1),
                                                                                                           alignment: _descriptor_0.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value));
    __compactRuntime.assert(event_0.status !== 2, 'event entry is closed');
    __compactRuntime.assert(!ticket_0.used, 'ticket already redeemed');
    __compactRuntime.assert(this._equal_6(this._entryCommitment_0(presentedSecret_0,
                                                                  ticketId_0),
                                          ticket_0.entryCommitment),
                            'entry proof is invalid');
    const tmp_2 = { eventId: ticket_0.eventId,
                    tier: ticket_0.tier,
                    ownerHash: ticket_0.ownerHash,
                    entryCommitment: new Uint8Array(32),
                    used: true,
                    transfers: ticket_0.transfers };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_3.toValue(1n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(publicTicketId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(tmp_2),
                                                                                              alignment: _descriptor_11.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_3 = ticket_0.eventId;
    const tmp_4 = { name: event_0.name,
                    venue: event_0.venue,
                    dateLabel: event_0.dateLabel,
                    artworkUrl: event_0.artworkUrl,
                    startsAt: event_0.startsAt,
                    minAge: event_0.minAge,
                    ageCutoff: event_0.ageCutoff,
                    capacity: event_0.capacity,
                    generalPrice: event_0.generalPrice,
                    premiumPrice: event_0.premiumPrice,
                    maxTransfers: event_0.maxTransfers,
                    issued: event_0.issued,
                    redeemed:
                      ((t1) => {
                        if (t1 > 18446744073709551615n) {
                          throw new __compactRuntime.CompactError('zkticket.compact line 233 char 67: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                        }
                        return t1;
                      })(event_0.redeemed + 1n),
                    revenue: event_0.revenue,
                    proceedsClaimed: event_0.proceedsClaimed,
                    organizerHash: event_0.organizerHash,
                    status: event_0.status };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_3.toValue(0n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_3),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_4),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _transferTicket_0(context, partialProofData, ticketId_0, newOwnerHash_0) {
    const publicTicketId_0 = ticketId_0;
    __compactRuntime.assert(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_3.toValue(1n),
                                                                                                                  alignment: _descriptor_3.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(publicTicketId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'ticket not found');
    const ticket_0 = _descriptor_11.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_3.toValue(1n),
                                                                                                            alignment: _descriptor_3.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_0.toValue(publicTicketId_0),
                                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value);
    let tmp_0;
    __compactRuntime.assert((tmp_0 = ticket_0.eventId,
                             _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_3.toValue(0n),
                                                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)),
                            'event not found');
    let tmp_1;
    const event_0 = (tmp_1 = ticket_0.eventId,
                     _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_3.toValue(0n),
                                                                                                           alignment: _descriptor_3.alignment() } }] } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_0.toValue(tmp_1),
                                                                                                           alignment: _descriptor_0.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value));
    __compactRuntime.assert(!ticket_0.used,
                            'redeemed tickets cannot be transferred');
    let t_0;
    __compactRuntime.assert((t_0 = ticket_0.transfers,
                             t_0 < event_0.maxTransfers),
                            'transfer limit reached');
    __compactRuntime.assert(this._equal_7(this._ownerCommitment_0(this._localSecretKey_0(context,
                                                                                         partialProofData),
                                                                  ticket_0.eventId),
                                          ticket_0.ownerHash),
                            'ticket ownership proof failed');
    __compactRuntime.assert(!this._equal_8(newOwnerHash_0, ticket_0.ownerHash),
                            'new owner must be different');
    const tmp_2 = { eventId: ticket_0.eventId,
                    tier: ticket_0.tier,
                    ownerHash: newOwnerHash_0,
                    entryCommitment: new Uint8Array(32),
                    used: ticket_0.used,
                    transfers:
                      ((t1) => {
                        if (t1 > 255n) {
                          throw new __compactRuntime.CompactError('zkticket.compact line 251 char 16: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                        }
                        return t1;
                      })(ticket_0.transfers + 1n) };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_3.toValue(1n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(publicTicketId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(tmp_2),
                                                                                              alignment: _descriptor_11.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _claimEventProceeds_0(context, partialProofData, eventId_0, recipient_0) {
    const publicEventId_0 = eventId_0;
    __compactRuntime.assert(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_3.toValue(0n),
                                                                                                                  alignment: _descriptor_3.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(publicEventId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'event not found');
    const event_0 = _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                              partialProofData,
                                                                              [
                                                                               { dup: { n: 0 } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_3.toValue(0n),
                                                                                                          alignment: _descriptor_3.alignment() } }] } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_0.toValue(publicEventId_0),
                                                                                                          alignment: _descriptor_0.alignment() } }] } },
                                                                               { popeq: { cached: false,
                                                                                          result: undefined } }]).value);
    __compactRuntime.assert(this._equal_9(this._organizerCommitment_0(this._localSecretKey_0(context,
                                                                                             partialProofData)),
                                          event_0.organizerHash),
                            'organizer authorization failed');
    let t_0;
    __compactRuntime.assert((t_0 = event_0.revenue,
                             t_0 > event_0.proceedsClaimed),
                            'no proceeds to claim');
    let t_1, t_2;
    const claimable_0 = (t_1 = event_0.revenue,
                         (t_2 = event_0.proceedsClaimed,
                          (__compactRuntime.assert(t_1 >= t_2,
                                                   'result of subtraction would be negative'),
                           t_1 - t_2)));
    __compactRuntime.assert(this._unshieldedBalanceGte_0(context,
                                                         partialProofData,
                                                         this._nativeToken_0(),
                                                         claimable_0),
                            'contract balance is insufficient');
    this._sendUnshielded_0(context,
                           partialProofData,
                           this._nativeToken_0(),
                           claimable_0,
                           this._right_0(recipient_0));
    const tmp_0 = { name: event_0.name,
                    venue: event_0.venue,
                    dateLabel: event_0.dateLabel,
                    artworkUrl: event_0.artworkUrl,
                    startsAt: event_0.startsAt,
                    minAge: event_0.minAge,
                    ageCutoff: event_0.ageCutoff,
                    capacity: event_0.capacity,
                    generalPrice: event_0.generalPrice,
                    premiumPrice: event_0.premiumPrice,
                    maxTransfers: event_0.maxTransfers,
                    issued: event_0.issued,
                    redeemed: event_0.redeemed,
                    revenue: event_0.revenue,
                    proceedsClaimed: event_0.revenue,
                    organizerHash: event_0.organizerHash,
                    status: event_0.status };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_3.toValue(0n),
                                                                  alignment: _descriptor_3.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(publicEventId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_1(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_2(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_3(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_4(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_5(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_6(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_7(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_8(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_9(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
}
export function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()),
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    events: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(0n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(0n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'zkticket.compact line 64 char 1',
                                     'Uint<0..18446744073709551616>',
                                     key_0)
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(0n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'zkticket.compact line 64 char 1',
                                     'Uint<0..18446744073709551616>',
                                     key_0)
        }
        return _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(0n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_0.toValue(key_0),
                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_7.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    tickets: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(1n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(1n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'zkticket.compact line 65 char 1',
                                     'Uint<0..18446744073709551616>',
                                     key_0)
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(1n),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'zkticket.compact line 65 char 1',
                                     'Uint<0..18446744073709551616>',
                                     key_0)
        }
        return _descriptor_11.fromValue(__compactRuntime.queryLedgerState(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_3.toValue(1n),
                                                                                                      alignment: _descriptor_3.alignment() } }] } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_0.toValue(key_0),
                                                                                                      alignment: _descriptor_0.alignment() } }] } },
                                                                           { popeq: { cached: false,
                                                                                      result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_11.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get nextEventId() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_3.toValue(2n),
                                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    },
    get nextTicketId() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_3.toValue(3n),
                                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    }
  };
}
const _emptyContext = {
  currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({
  localSecretKey: (...args) => undefined,
  localBirthDate: (...args) => undefined,
  localEntrySecret: (...args) => undefined
});
export const pureCircuits = {
  organizerCommitment: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`organizerCommitment: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const sk_0 = args_0[0];
    if (!(sk_0.buffer instanceof ArrayBuffer && sk_0.BYTES_PER_ELEMENT === 1 && sk_0.length === 32)) {
      __compactRuntime.typeError('organizerCommitment',
                                 'argument 1',
                                 'zkticket.compact line 73 char 1',
                                 'Bytes<32>',
                                 sk_0)
    }
    return _dummyContract._organizerCommitment_0(sk_0);
  },
  ownerCommitment: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`ownerCommitment: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const sk_0 = args_0[0];
    const eventId_0 = args_0[1];
    if (!(sk_0.buffer instanceof ArrayBuffer && sk_0.BYTES_PER_ELEMENT === 1 && sk_0.length === 32)) {
      __compactRuntime.typeError('ownerCommitment',
                                 'argument 1',
                                 'zkticket.compact line 80 char 1',
                                 'Bytes<32>',
                                 sk_0)
    }
    if (!(typeof(eventId_0) === 'bigint' && eventId_0 >= 0n && eventId_0 <= 18446744073709551615n)) {
      __compactRuntime.typeError('ownerCommitment',
                                 'argument 2',
                                 'zkticket.compact line 80 char 1',
                                 'Uint<0..18446744073709551616>',
                                 eventId_0)
    }
    return _dummyContract._ownerCommitment_0(sk_0, eventId_0);
  },
  entryCommitment: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`entryCommitment: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const entrySecret_0 = args_0[0];
    const ticketId_0 = args_0[1];
    if (!(entrySecret_0.buffer instanceof ArrayBuffer && entrySecret_0.BYTES_PER_ELEMENT === 1 && entrySecret_0.length === 32)) {
      __compactRuntime.typeError('entryCommitment',
                                 'argument 1',
                                 'zkticket.compact line 88 char 1',
                                 'Bytes<32>',
                                 entrySecret_0)
    }
    if (!(typeof(ticketId_0) === 'bigint' && ticketId_0 >= 0n && ticketId_0 <= 18446744073709551615n)) {
      __compactRuntime.typeError('entryCommitment',
                                 'argument 2',
                                 'zkticket.compact line 88 char 1',
                                 'Uint<0..18446744073709551616>',
                                 ticketId_0)
    }
    return _dummyContract._entryCommitment_0(entrySecret_0, ticketId_0);
  },
  priceForTier: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`priceForTier: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const event_0 = args_0[0];
    const tier_0 = args_0[1];
    if (!(typeof(event_0) === 'object' && event_0.name.buffer instanceof ArrayBuffer && event_0.name.BYTES_PER_ELEMENT === 1 && event_0.name.length === 32 && event_0.venue.buffer instanceof ArrayBuffer && event_0.venue.BYTES_PER_ELEMENT === 1 && event_0.venue.length === 32 && event_0.dateLabel.buffer instanceof ArrayBuffer && event_0.dateLabel.BYTES_PER_ELEMENT === 1 && event_0.dateLabel.length === 32 && event_0.artworkUrl.buffer instanceof ArrayBuffer && event_0.artworkUrl.BYTES_PER_ELEMENT === 1 && event_0.artworkUrl.length === 128 && typeof(event_0.startsAt) === 'bigint' && event_0.startsAt >= 0n && event_0.startsAt <= 18446744073709551615n && typeof(event_0.minAge) === 'bigint' && event_0.minAge >= 0n && event_0.minAge <= 255n && typeof(event_0.ageCutoff) === 'bigint' && event_0.ageCutoff >= 0n && event_0.ageCutoff <= 4294967295n && typeof(event_0.capacity) === 'bigint' && event_0.capacity >= 0n && event_0.capacity <= 18446744073709551615n && typeof(event_0.generalPrice) === 'bigint' && event_0.generalPrice >= 0n && event_0.generalPrice <= 18446744073709551615n && typeof(event_0.premiumPrice) === 'bigint' && event_0.premiumPrice >= 0n && event_0.premiumPrice <= 18446744073709551615n && typeof(event_0.maxTransfers) === 'bigint' && event_0.maxTransfers >= 0n && event_0.maxTransfers <= 255n && typeof(event_0.issued) === 'bigint' && event_0.issued >= 0n && event_0.issued <= 18446744073709551615n && typeof(event_0.redeemed) === 'bigint' && event_0.redeemed >= 0n && event_0.redeemed <= 18446744073709551615n && typeof(event_0.revenue) === 'bigint' && event_0.revenue >= 0n && event_0.revenue <= 340282366920938463463374607431768211455n && typeof(event_0.proceedsClaimed) === 'bigint' && event_0.proceedsClaimed >= 0n && event_0.proceedsClaimed <= 340282366920938463463374607431768211455n && event_0.organizerHash.buffer instanceof ArrayBuffer && event_0.organizerHash.BYTES_PER_ELEMENT === 1 && event_0.organizerHash.length === 32 && typeof(event_0.status) === 'number' && event_0.status >= 0 && event_0.status <= 2)) {
      __compactRuntime.typeError('priceForTier',
                                 'argument 1',
                                 'zkticket.compact line 96 char 1',
                                 'struct EventRecord<name: Bytes<32>, venue: Bytes<32>, dateLabel: Bytes<32>, artworkUrl: Bytes<128>, startsAt: Uint<0..18446744073709551616>, minAge: Uint<0..256>, ageCutoff: Uint<0..4294967296>, capacity: Uint<0..18446744073709551616>, generalPrice: Uint<0..18446744073709551616>, premiumPrice: Uint<0..18446744073709551616>, maxTransfers: Uint<0..256>, issued: Uint<0..18446744073709551616>, redeemed: Uint<0..18446744073709551616>, revenue: Uint<0..340282366920938463463374607431768211456>, proceedsClaimed: Uint<0..340282366920938463463374607431768211456>, organizerHash: Bytes<32>, status: Enum<EventStatus, ACTIVE, PAUSED, CLOSED>>',
                                 event_0)
    }
    if (!(typeof(tier_0) === 'number' && tier_0 >= 0 && tier_0 <= 1)) {
      __compactRuntime.typeError('priceForTier',
                                 'argument 2',
                                 'zkticket.compact line 96 char 1',
                                 'Enum<TicketTier, GENERAL, PREMIUM>',
                                 tier_0)
    }
    return _dummyContract._priceForTier_0(event_0, tier_0);
  }
};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
