# DragonBST - a dependency-less <a href="http://en.wikipedia.org/wiki/AVL_tree" target="_blank">AVL</a> binary search tree

## Installation and tests
Package name is `@recrosoftware/dragon-bst`.
```bash
npm install @recrosoftware/dragon-bst
```

You can test with:
```bash
git clone https://github.com/Recrosoftware/node-dragon-bst.git dragon-bst
cd dragon-bst
npm install
npm test
```

## Usage
### Import module
```javascript
// ES6
import {AVLTree} from '@recrosoftware/dragon-bst';

// or ES5
var AVLTree = require('@recrosoftware/dragon-bst').AVLTree;
```

### Creating a tree
The AVLTree constructor accepts three optional parameters that allow you to:
- Enforce key-data uniqueness constrain
- Enforce data uniqueness constrain for data associated to a key
- Use a custom key comparison function
- Use a custom data equality checking function

#### Uniqueness
```javascript
// Creating an AVL binary search tree with enforced uniqueness
var tree = new AVLTree({ unique: true });

tree.insert(10, 'hello');
tree.insert(10, 'world'); // Will throw a TreeError
```

#### Data uniqueness
Defaults to `true`
```javascript
// Creating an AVL binary search tree with enforced data uniqueness (default)
var tree = new AVLTree();

tree.insert(10, 'hi');
tree.insert(10, 'hello');
tree.insert(10, 'hi');

tree.search(10);   // Equal to ['hi', 'hello']

// Creating an AVL binary search tree without enforced data uniqueness
tree = new AVLTree({ uniqueValues: false });

tree.insert(10, 'hi');
tree.insert(10, 'hello');
tree.insert(10, 'hi');

tree.search(10);   // Equal to ['hi', 'hello', 'hi]
```

#### Custom key comparison
The custom key comparison function is a function that accepts two keys as arguments and returns:
- -1 if the first key is lesser than the second
- 0 if the keys are equals
- 1 if the second key is greater than the first

**Note: the default key comparison function is capable to compare numbers, strings and dates but not numbers with strings, or strings with dates, etc.**

```javascript
function compareKeys (a, b) {
  if (a.age < b.age) { return -1; }
  if (a.age > b.age) { return 1; }

  return 0;
}

// Now we can use objects with an 'age' property as keys
var tree = new AVLTree({ compareKeys: compareKeys });

tree.insert({ age: 23 }, 'Mark');
tree.insert({ age: 47 }, 'Franck');
```

#### Custom value checking
The custom value checking function is a function that accepts two pieces of fata as arguments and returns true or false whether they are equals or not.

**Note: the default value checking function can compare strings, numbers and booleans**

```javascript
function checkValueEquality (a, b) {
  return a.length === b.length;
}

var tree = new AVLTree({ checkValueEquality: checkValueEquality });
tree.insert(10, 'hello');      // Now key 10 contains ['hello']
tree.insert(10, 'world');      // Now key 10 contains ['world']
tree.insert(10, 'howdoyoudo'); // Now key 10 contains ['world', 'howdoyoudo']

tree.delete(10, 'abcde');
tree.search(10);               // Returns ['howdoyoudo']
```

### Insert Elements
```javascript
// Creating an AVL binary search tree
var tree = new AVLTree();

// Inserting some data
tree.insert(15, 'some data for key 15');
tree.insert(12, 'something else');
tree.insert(18, 'hello');

// You can insert multiple pieces of data for the same key
// if your tree doesn't enforce a unique constraint
tree.insert(18, 'world');
```

### Search elements
Let's imagine that we have the following tree:
```javascript
var tree = new AVLTree();

tree.insert(0, 'A');
tree.insert(0, 'a');

tree.insert(1, 'B');
tree.insert(2, 'C');
tree.insert(3, 'D');
tree.insert(4, 'E');
tree.insert(5, 'F');
tree.insert(6, 'G');
tree.insert(7, 'H');
tree.insert(8, 'I');
tree.insert(9, 'J');
```

We can search for a single element in the tree by using:
```javascript
// Search data for a specific key
tree.search(0);      // Equal to ['A', 'a']
tree.search(6);      // Equal to ['G']
tree.search(11);     // Equal to []
```

We can search for a key or data that follows or precedes a certain key:

**Note: the keys' order is based on the `compareKeys` function provided in the options while creating the tree.**
```javascript
// Search data right after a specific key
tree.searchAfter(3); // Equal to ['E']
tree.searchAfter(9); // Equal to []

// Search data right before a specific key
tree.searchBefore(3); // Equal to ['C']
tree.searchBefore(0); // Equal to []

// Search the key right after a specified one
tree.searchKeyAfter(3); // Equal to 4
tree.searchKeyAfter(9); // Returns undefined

// Search the key right before a specified one
tree.searchKeyBefore(3); // Equal to 2
tree.searchKeyBefore(0); // Returns undefined
```

We can search for keys within bounds or data associated with those keys:

**Note: the keys' order is based on the `compareKeys` function provided in the options while creating the tree.**
```javascript
// Search between bounds with a MongoDB-like query
// $lt  -> Less than
// $lte -> Less than or equal
// $gt  -> Greater than
// $gte -> Greater than or equal

// Data is returned in key order
tree.betweenBounds({ $gte: 4, $lt: 7}); // Equal to ['E', 'F', 'G']
tree.betweenBounds({ $gt: 4, $lte: 6}); // Equal to ['F', 'G']

// You can search for all data by passing an empty query
tree.betweenBounds({}); // Equal to ['A', 'a', 'B' ... 'I', 'J']

// The same is can be applied to keys
tree.keysBetweenBounds({ $gte: 4, $lt: 7}); // Equal to [4, 5, 6]
tree.keysBetweenBounds({ $gt: 4, $lte: 6}); // Equal to [5, 6]

tree.keysBetweenBounds({}); // Equal to [0, 1 ... 8, 9]
```

### Delete elements
```javascript
var tree = new AVLTree();

tree.insert(10, 'hello');
tree.insert(10, 'how are you?');

tree.insert(17, 'I like pizza!');
tree.insert(22; '22');

// You can delete an entire key with
tree.delete(17);

// or just a single piece of data with
tree.delete(10, 'hello');
tree.search(10); // Equal to ['I like pizza!']

// Trying to delete some piece of data for a key that does not contain it will result in... nothing
tree.delete(22, 'some data');
tree.search(22); // Equal to ['22']
```
