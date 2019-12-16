import { NotarizeBase, HashAlgo } from "./notarize_base";
import { MerkleTree } from 'merkletreejs';
import { readFile } from 'fs';

export class NotarizeTree extends NotarizeBase {
    private tree: MerkleTree;
    private leaves: string[];

    constructor(algo: HashAlgo) {
        super(algo);
    }

    addData(data: string) {
        this.leaves.push(this.hash(data));
    }

    async addFile(path: string) {
        return new Promise((resovle, reject) => {
            readFile(path, (err, data) => {
                if (err || !data)
                    return reject(err);
                this.leaves.push(this.hash(data.toString()));
                return resovle();
            });
        });
    }

    build() {
        const tree = new MerkleTree(this.leaves, this.hash);

        return {
            root: tree.getRoot().toString('hex'),
            tree: tree.toTreeString()
        };
    }
}