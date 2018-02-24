const Benchmark = require('benchmark');
const {AVLTree, TreeError} = require('../index');

function getRandomInteger(n) {
  return Math.floor(Math.random() * n);
}

let deleteCount = 0;
let insertCount = 0;
const tree = new AVLTree({unique: true});
const initialTreeSize = 4000000;

console.log('Pre-populating tree with ' + initialTreeSize + ' keys');
for (insertCount = 0; insertCount < initialTreeSize; ++insertCount) {
  tree.insert(insertCount, 'Hello world');
}

if (initialTreeSize !== tree.getNumberOfKeys()) {
  throw new TreeError('Invalid tree size');
}

const suite = new Benchmark.Suite('AVL Tree Test')
  .add({
    'name': 'tree#insert',
    'fn': () => tree.insert(insertCount, 'Hello world ' + insertCount++)
  })
  .add({
    'name': 'tree#search',
    'fn': () => tree.search(getRandomInteger(insertCount))
  })
  .add({
    'name': 'tree#searchAfter',
    'fn': () => tree.searchAfter(getRandomInteger(insertCount))
  })
  .add({
    'name': 'tree#searchBefore',
    'fn': () => tree.searchBefore(getRandomInteger(insertCount))
  })
  .add({
    'name': 'tree#betweenBondus',
    'fn': () => {
      const query = {};

      const a = getRandomInteger(insertCount - 1);
      const b = getRandomInteger(insertCount - 1);

      query.$gte = Math.min(a, b);
      query.$lte = Math.max(a, b);

      tree.betweenBounds(query);
    }
  })
  .add({
    'name': 'tree#validate',
    'fn': () => tree.validateTree()
  })
  .add({
    'name': 'tree#delete',
    'fn': () => tree.delete(deleteCount++),
    'onCycle': () => {
      for (let i = 0; i < 10000; ++i) {
        tree.insert(insertCount++, null);
      }
    }
  });

console.log('Starting tests');
suite
  .on('cycle', (event) => {
    console.log('Tree height: ' + tree.getHeight() + ' - ' + String(event.target));
  })
  .on('complete', () => {
    console.log('Tests completed');
    console.log('Tree contains ' + tree.getNumberOfKeys() + ' keys');
    console.log('Tree height is: ' + tree.getHeight());
  })
  .run({'async': true});

