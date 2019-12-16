# Lisk Notarize
This library helps you to notarize and timestamp single documents or large sets of documents (with merkle trees), using the immutable lisk blockchain.

## Notarize a signle documents

```typescript
import { Notarize } from 'lisk-notarize';

const n = Notarize();
n.setFile('~/file1.txt');

const h = n.build();
console.log(`Root: ${h.root}`);

const txres = n.broadcast({
    network: 'testnet',
    secret: '...',
    secret2: '...'
});
```

## Notarize multiple documents

```typescript
import { NotarizeTree } from 'lisk-notarize';

const n = NotarizeTree();
n.addFile('~/file1.txt');
n.addFile('~/file2.txt');

const h = n.build();
console.log(`Root: ${h.root}, Tree: ${h.tree}`);

const txres = n.broadcast({
    network: 'testnet',
    secret: '...',
    secret2: '...'
});
```

# About
This software is developed by dakk lisk delegate.

# License
Copyright 2019-2020 Davide Gessa

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.