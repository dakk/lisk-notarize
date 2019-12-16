import sha256 from 'crypto-js/sha256';
import sha512 from 'crypto-js/sha512';
import { transfer } from '@liskhq/lisk-transactions';
import { APIClient } from '@liskhq/lisk-api-client';


export type HashAlgo = 'sha256' | 'sha512';

export abstract class NotarizeBase {
    private hashFunc: (data: string) => string;

    constructor(algo: HashAlgo = 'sha256') {
        switch (algo) {
            case 'sha256':
                this.hashFunc = sha256;
                break;
            case 'sha512':
                this.hashFunc = sha512;
                break;
            default:
                throw 'Invalid hash algorithm';
        }
    }

    abstract build(): { root: string; tree: string };

    protected hash(data: string) {
        return this.hashFunc(data);
    }

    async broadcast(opts: { network: 'test' | 'main', secret: string; secret2?: string; address?: string }) {
        const dbc = this.build();
        
        const txopt: any = {
            amount: '100',
            data: dbc.root,
            passphrase: opts.secret,
        };

        if ('address' in opts) {
            txopt.recipientId = opts.address;
        } else {
            if (opts.network == 'main')
                txopt.recipientId = '2324852447570841050L';
            else
                txopt.recipientId = '214676230899515903L';
        }

        if ('secret2' in opts)
            txopt.secondPassphrase = opts.secret2;

        const tx = transfer(txopt);
        const ac = opts.network == 'main' ? APIClient.createMainnetAPIClient() : APIClient.createTestnetAPIClient();
        const res = await ac.transactions.broadcast(tx);
        return res.data;
    }
}
