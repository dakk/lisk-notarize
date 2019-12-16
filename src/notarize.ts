import { NotarizeBase, HashAlgo } from "./notarize_base";
import { readFile } from 'fs';

export class Notarize extends NotarizeBase {
    private data: string = null;

    constructor(algo: HashAlgo) {
        super(algo);
    }

    setData(data: string) {
        this.data = this.hash(data);
    }

    async setFile(path: string) {
        return new Promise((resovle, reject) => {
            readFile(path, (err, data) => {
                if (err || !data)
                    return reject(err);
                this.data = this.hash(data.toString());
                return resovle();
            });
        });
    }

    build() {
        if(!this.data) 
            throw 'no data';

        return { root: this.hash(this.data), tree: this.hash(this.data) };
    }
}