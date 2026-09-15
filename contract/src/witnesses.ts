export type ZkTicketPrivateState = {
  readonly secretKey: Uint8Array;
  readonly birthDate: bigint;
  readonly entrySecret: Uint8Array;
};

export const createZkTicketPrivateState = (
  secretKey: Uint8Array,
  birthDate = 0n,
  entrySecret = new Uint8Array(32),
): ZkTicketPrivateState => ({ secretKey, birthDate, entrySecret });

export const createWitnesses = () => ({
  localSecretKey: ({ privateState }: { privateState: ZkTicketPrivateState }): [ZkTicketPrivateState, Uint8Array] =>
    [privateState, privateState.secretKey],
  localBirthDate: ({ privateState }: { privateState: ZkTicketPrivateState }): [ZkTicketPrivateState, bigint] =>
    [privateState, privateState.birthDate],
  localEntrySecret: ({ privateState }: { privateState: ZkTicketPrivateState }): [ZkTicketPrivateState, Uint8Array] =>
    [privateState, privateState.entrySecret],
});
