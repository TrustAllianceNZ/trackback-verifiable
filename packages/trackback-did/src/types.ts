
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = Record<string, any>

// TODO:: FILL
// https://datatracker.ietf.org/doc/html/rfc7517
export interface JSONWebKey {
  kty: string;
  use: string;
  key_ops: string;
  alg: string;
  kid: string;
  x5u: string;
}

export interface VerificationMethod {
  id: string;
  controller: string;
  type: string;
  publicKeyJwk?: JSONWebKey;
  // https://datatracker.ietf.org/doc/html/draft-multiformats-multibase-03
  publicKeyMultibase?: string;
}

export interface ServiceEndpoint {
  id: string;
  type: string;
  serviceEndpoint: string;
}

// https://www.w3.org/TR/did-core/#core-properties
export interface DIDDocument {
  '@context'?: string | string[];
  id: string;
  alsoKnownAs?: string[];
  controller?: string | string[];
  verificationMethod?: VerificationMethod[];
  service?: ServiceEndpoint[];

  authentication?: (string | VerificationMethod)[];
  assertionMethod?: (string | VerificationMethod)[];
  keyAgreement?: (string | VerificationMethod)[];
  capabilityInvocation?: (string | VerificationMethod)[];
  capabilityDelegation?: (string | VerificationMethod)[];
}

export interface DIDResolutionOptions extends AnyType {
  accept?: string
}

export interface DIDResolutionMetadata extends AnyType {
  contentType?: string
  error?: 'invalidDid' | 'notFound' | 'representationNotSupported' | string
}

export interface DIDDocumentMetadata extends AnyType {
  created?: string
  updated?: string
  deactivated?: boolean
  versionId?: string
  nextUpdate?: string
  nextVersionId?: string
  equivalentId?: string
  canonicalId?: string
}


export interface DIDResolutionResult {
  didResolutionMetadata: DIDResolutionMetadata;
  didDocument: DIDDocument | null;
  didDocumentMetadata: DIDDocumentMetadata;
}


export interface IDIDManager {
  
}