
import { generateKeyPair } from 'jose/util/generate_key_pair'
import { exportJWK } from 'jose/key/export'
import { IX25519KeyPair } from '../types';
import type { KeyObject } from 'crypto'
import type { JWK } from 'jose/types';
import { CompactSign } from 'jose/jws/compact/sign';
import { compactVerify } from 'jose/jws/compact/verify'

const ALG = 'ECDH-ES+A256KW'

export class X25519KeyPair implements IX25519KeyPair {
    public id?: string;
    public controller?: string;
    public publicKey: KeyObject | CryptoKey;
    public privateKey: KeyObject | CryptoKey;
    public publicKeyJWK?: JWK;
    public privateKeyJWK?: JWK;

    constructor(options: {
        id?: string,
        controller?: string,
        publicKey: KeyObject | CryptoKey,
        privateKey?: KeyObject | CryptoKey,
        publicKeyJWK?: JWK,
        privateKeyJWK?: JWK
    }) {
        this.id = options.id;
        this.controller = options.controller;
        this.publicKey = options.publicKey;
        this.privateKey = options.privateKey;
        this.publicKeyJWK = options.publicKeyJWK;
        this.privateKeyJWK = options.privateKeyJWK;
    }

    static async generate(): Promise<X25519KeyPair> {
        const { publicKey, privateKey } = await generateKeyPair(ALG, { crv: 'X25519' })

        const privateKeyJWK: JWK = await exportJWK(privateKey)
        const publicKeyJWK = await exportJWK(publicKey)

        return new X25519KeyPair({
            publicKey,
            privateKey,
            privateKeyJWK,
            publicKeyJWK,
        })
    }


    async sign(data: string, { header = {}, alg = ALG }: { header: any, alg: string }) {
        const encoder = new TextEncoder();
        const payload = typeof data === 'string' ? data : JSON.stringify(data);

        const jws = await new CompactSign(encoder.encode(payload))
            .setProtectedHeader({ ...header, alg })
            .sign(this.privateKey);

        return jws;
    }


    async verify(jws: string, data: string): Promise<boolean> {
        const decoder = new TextDecoder()
        const { payload, protectedHeader } = await compactVerify(jws, this.publicKey)
        return (decoder.decode(payload) === data)
    }


}