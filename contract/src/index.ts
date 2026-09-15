import { CompiledContract } from '@midnight-ntwrk/compact-js';
import * as ZkTicketContract from '../managed/zkticket/contract/index.js';
import { createWitnesses } from './witnesses.js';

export * as ZkTicket from '../managed/zkticket/contract/index.js';
export * from '../managed/zkticket/contract/index.js';
export { createWitnesses, createZkTicketPrivateState } from './witnesses.js';
export type { ZkTicketPrivateState } from './witnesses.js';

export const CompiledZkTicketContract = CompiledContract.make(
  'zkticket',
  ZkTicketContract.Contract,
).pipe(
  CompiledContract.withWitnesses(createWitnesses()),
  CompiledContract.withCompiledFileAssets('./managed/zkticket'),
);
