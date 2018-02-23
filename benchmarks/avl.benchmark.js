const Benchmark = require('benchmark');
const {AVLTree} = require('../index');

function getRandomInteger(n) {
  return Math.floor(Math.random() * n);
}

function getRandomArray(n) {
  const toReturn = [];
  for (let i = 0; i < n; ++i) {
    toReturn.push(i);
  }

  for (let i = toReturn.length - 1; i >= 0; --i) {
    const j = getRandomInteger(i);

    const v = toReturn[i];
    toReturn[i] = toReturn[j];
    toReturn[j] = v;
  }

  return toReturn;
}

console.log('Generating Random data');
const data = getRandomArray(5000000);

let i = 0;
const tree = new AVLTree({unique: true});
const initialTreeSize = Math.floor((data.length / 4) + getRandomInteger(data.length / 4));


console.log('Pre-populating tree with ' + initialTreeSize + ' keys');
for (i = 0; i < initialTreeSize; ++i) {
  tree.insert(data[i], 'Hello world');
}
console.log('Now tree contains ' + tree.getNumberOfKeys() + ' keys');

console.log('Configuring test');
const suite = new Benchmark.Suite('AVL Tree Test')
  .add('tree#insert', () => {
    tree.insert(data[i], 'Hello world ' + i);
    i++;
  })
  .add('tree#search', () => {
    tree.search(data[getRandomInteger(i - 1)]);
  })
  .add('tree#delete', () => {
    i--;
    tree.delete(data[i]);
  })
  .add('tree#betweenBondus', () => {
    const query = {};

    const a = data[getRandomInteger(i - 1)];
    const b = data[getRandomInteger(i - 1)];

    query.$gte = Math.min(a, b);
    query.$lte = Math.max(a, b);

    tree.betweenBounds(query);
  })
  .add('tree#validate', () => {
    tree.validateTree();
  });

console.log('Starting tests');
suite
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', () => {
    console.log('Tests completed');
    console.log('Tree contains ' + tree.getNumberOfKeys() + ' keys');
    console.log('Tree height is: ' + tree.getHeight());
  })
  .run({'async': true});

