export interface IVerifier {
  verify: (options?: any) => Promise<any>;
}

export interface ISigner {
  sign: (data: any, ...args: any[]) => any;
}

export abstract class AbstractJsonWebKey {
  abstract signer(): ISigner;
  abstract verifier(): IVerifier;
  abstract getId(): string;
  abstract getController(): string;
  abstract getPublicKey(): any;
  abstract getPrivateKey(): any;


  abstract toDIDDocument():any;
}
