# TrackBack SDK for Verifiable Credentials & Presentations

This sdk handles for issuing and verifying verifying Credentials
and Presentations that adhere to W3C standards.

## Installation

```bash
yarn install
```

## Usage

### importing Verifiable Credentials

```javascript

import { VC } from '@trackback/vc'

```

### Validate Verifiable Credentials

```javascript

import { VC } from '@trackback/vc'

const vc = new VC();

const result = vc.validate({
                '@context': ['https://www.w3.org/2018/credentials/v1'],
                "type": ["VerifiableCredential"],
                "credentialSubject": {},
                "issuer": "did:trackback:issuer/1234"
            });

// true

```

### Verifiable Credentials create JWT

```javascript
import { JsonWebKey2020 } from '@trackback/key';
import { VC } from '@trackback/vc'

 
const vc = new VC();
const keyPair = await JsonWebKey2020.generate();

const credential = {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    "type": ["VerifiableCredential"],
    "issuanceDate": "2010-01-01T19:23:24Z",
    "credentialSubject": {},
    "issuer": "did:trackback:issuer/1234"
}
const jwt = await vc.issueJWT({ keyPair, credential })

```

### Verifiable Credentials validate JWT

```javascript
import { JsonWebKey2020 } from '@trackback/key';
import { VC } from '@trackback/vc'

 
const vc = new VC();
const keyPair = await JsonWebKey2020.generate();

const credential = {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    "type": ["VerifiableCredential"],
    "issuanceDate": "2010-01-01T19:23:24Z",
    "credentialSubject": {},
    "issuer": "did:trackback:issuer/1234"
}
const jwt = await vc.issueJWT({ keyPair, credential })

const result = await vc.verifyJWT(jwt, { keyPair, credential })

// true
```


## Presentation

### importing Verifiable Presentation

```javascript

import { VP } from '@trackback/vc'

```

### Verifiable Presentation create jwt

```javascript
import { JsonWebKey2020 } from '@trackback/key';
import { VP } from '@trackback/vc'

const vp = new VP();

const keyPair = await JsonWebKey2020.generate();

const presentation = {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    "type": ["VerifiablePresentation"],
    verifiableCredential: [{
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        "type": ["VerifiableCredential"],
        "credentialSubject": {},
        "issuer": "did:trackback:issuer/1234"


    }]
}

const jwt = await vp.issueJWT({ keyPair, presentation })


// jwt
```

### Verifiable Presentation validate jwt

```javascript
import { JsonWebKey2020 } from '@trackback/key';
import { VP } from '@trackback/vc'

const vp = new VP();

// example json web key
const key = {
    id: 'did:trackback:key:SBQyXxAUa41yrBP9YJ-mPsCtESFjmzbOIUrzGI3-oWs#SBQyXxAUa41yrBP9YJ-mPsCtESFjmzbOIUrzGI3-oWs',
    type: 'JsonWebKey2020',
    controller: 'did:trackback:key:SBQyXxAUa41yrBP9YJ-mPsCtESFjmzbOIUrzGI3-oWs',
    publicKeyJwk: {
        crv: 'Ed25519',
        x: 'VBB9DDDSl3IMPNGlx5f4h-NY2AVKpOMauKqVSm3LYcU',
        kty: 'OKP',
        alg: 'EdDSA'
    },
    privateKeyJwk: {
        crv: 'Ed25519',
        d: 'nVlVbr0cfTf0KxIfha2LsOt3x4G7rJ2mRc_TbYXsscY',
        x: 'VBB9DDDSl3IMPNGlx5f4h-NY2AVKpOMauKqVSm3LYcU',
        kty: 'OKP',
        alg: 'EdDSA'
    }
}

// import key
const keyPair = JsonWebKey2020.from(key);

const JWT = `eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsImtpZCI6ImRpZDp0cmFja2JhY2s6a2V5OlNCUXlYeEFVYTQxeXJCUDlZSi1tUHNDdEVTRmptemJPSVVyekdJMy1vV3MjU0JReVh4QVVhNDF5ckJQOVlKLW1Qc0N0RVNGam16Yk9JVXJ6R0kzLW9XcyJ9.eyJuYmYiOjE2MzQ2ODA2MDksInZwIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZVByZXNlbnRhdGlvbiJdLCJ2ZXJpZmlhYmxlQ3JlZGVudGlhbCI6W3siQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6e30sImlzc3VlciI6ImRpZDp0cmFja2JhY2s6aXNzdWVyLzEyMzQifV19fQ.mZLZIH-BOd3r72ryGEkfs7UBfIQ5_fSRchUo9h7DgIwd9L2BE3fhIviJW2X9YMIyEVeAi8C2Yz1m8ETT9pmHBw`

const presentation = {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    "type": ["VerifiablePresentation"],
    verifiableCredential: [{
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        "type": ["VerifiableCredential"],
        "credentialSubject": {},
        "issuer": "did:trackback:issuer/1234"
    }]
}

const result = await vp.verifyJWT(JWT, { keyPair, presentation })

// true
```