import {getRandomArray} from '../src/components/common';
import {AVLTree} from '../src/dragon-bst';


describe('AVL tree', () => {
  describe('Sanity checks', () => {
    it('Checking that all nodes heights are correct', () => {
      const tree = new AVLTree({initial: {key: 10, value: null}});
      const _tree = tree as any;

      tree.insert(5, null);
      tree.insert(15, null);
      tree.insert(3, null);
      tree.insert(8, null);
      tree.insert(13, null);
      tree.insert(18, null);
      tree.insert(7, null);
      tree.insert(6, null);

      tree.validateTree();
      const height = _tree.avl.height;
      _tree.avl.height = 6;
      expect(() => tree.validateTree()).toThrow();
      _tree.avl.height = height;

      tree.validateTree();
    });
  });
  describe('Insertion', () => {
    it('The root has a height of 1', () => {
      const tree = new AVLTree();
      const _tree = tree as any;

      tree.insert(10, 'root');
      expect(_tree.avl.height).toBe(1);
    });
    it('Insert at the root if its the first insertion', () => {
      const tree = new AVLTree();
      const _tree = tree as any;

      tree.insert(10, 'some data');
      tree.validateTree();

      expect(_tree.avl.key).toBe(10);
      expect(_tree.avl.data).toEqual(['some data']);
      expect(_tree.avl.left).toBeNull();
      expect(_tree.avl.right).toBeNull();
    });
    it('If uniqueness constraint not enforced, we can insert different data for same key', () => {
      const tree = new AVLTree();

      tree.insert(10, 'some data');
      tree.insert(3, 'hello');
      tree.insert(3, 'world');

      tree.validateTree();
      expect(tree.search(3)).toEqual(['hello', 'world']);

      tree.insert(12, 'a');
      tree.insert(12, 'b');

      tree.validateTree();
      expect(tree.search(12)).toEqual(['a', 'b']);
    });
    it('If uniqueness constraint is enforced, we cannot insert different data for same key', () => {
      const tree = new AVLTree({unique: true});

      tree.insert(10, 'some data');
      tree.insert(3, 'hello');
      expect(() => tree.insert(3, 'world')).toThrow();

      tree.validateTree();
      expect(tree.search(3)).toEqual(['hello']);

      tree.insert(12, 'a');
      expect(() => tree.insert(12, 'b')).toThrow();

      tree.validateTree();
      expect(tree.search(12)).toEqual(['a']);
    });
    it('Can insert 0 or the empty string', () => {
      let tree = new AVLTree();
      let _tree = tree as any;

      tree.insert(0, 'some data');

      tree.validateTree();
      expect(_tree.avl.key).toBe(0);
      expect(_tree.avl.data).toEqual(['some data']);

      tree = new AVLTree();
      _tree = tree as any;

      tree.insert('', 'some other data');

      tree.validateTree();
      expect(_tree.avl.key).toBe('');
      expect(_tree.avl.data).toEqual(['some other data']);
    });
    it('Auto-balancing insertions', () => {
      const tree1 = new AVLTree();
      const tree2 = new AVLTree();
      const tree3 = new AVLTree();

      // Balancing insertions on the left
      expect(tree1.getNumberOfKeys()).toBe(0);
      tree1.insert(18, null);
      expect(tree1.getNumberOfKeys()).toBe(1);
      tree1.validateTree();
      tree1.insert(15, null);
      expect(tree1.getNumberOfKeys()).toBe(2);
      tree1.validateTree();
      tree1.insert(13, null);
      expect(tree1.getNumberOfKeys()).toBe(3);
      tree1.validateTree();
      tree1.insert(10, null);
      expect(tree1.getNumberOfKeys()).toBe(4);
      tree1.validateTree();
      tree1.insert(8, null);
      expect(tree1.getNumberOfKeys()).toBe(5);
      tree1.validateTree();
      tree1.insert(5, null);
      expect(tree1.getNumberOfKeys()).toBe(6);
      tree1.validateTree();
      tree1.insert(3, null);
      expect(tree1.getNumberOfKeys()).toBe(7);
      tree1.validateTree();

      // Balancing insertions on the right
      expect(tree2.getNumberOfKeys()).toBe(0);
      tree2.insert(3, null);
      expect(tree2.getNumberOfKeys()).toBe(1);
      tree2.validateTree();
      tree2.insert(5, null);
      expect(tree2.getNumberOfKeys()).toBe(2);
      tree2.validateTree();
      tree2.insert(8, null);
      expect(tree2.getNumberOfKeys()).toBe(3);
      tree2.validateTree();
      tree2.insert(10, null);
      expect(tree2.getNumberOfKeys()).toBe(4);
      tree2.validateTree();
      tree2.insert(13, null);
      expect(tree2.getNumberOfKeys()).toBe(5);
      tree2.validateTree();
      tree2.insert(15, null);
      expect(tree2.getNumberOfKeys()).toBe(6);
      tree2.validateTree();
      tree2.insert(18, null);
      expect(tree2.getNumberOfKeys()).toBe(7);
      tree2.validateTree();

      // Balancing already-balanced insertions
      expect(tree3.getNumberOfKeys()).toBe(0);
      tree3.insert(10, null);
      expect(tree3.getNumberOfKeys()).toBe(1);
      tree3.validateTree();
      tree3.insert(5, null);
      expect(tree3.getNumberOfKeys()).toBe(2);
      tree3.validateTree();
      tree3.insert(15, null);
      expect(tree3.getNumberOfKeys()).toBe(3);
      tree3.validateTree();
      tree3.insert(3, null);
      expect(tree3.getNumberOfKeys()).toBe(4);
      tree3.validateTree();
      tree3.insert(8, null);
      expect(tree3.getNumberOfKeys()).toBe(5);
      tree3.validateTree();
      tree3.insert(13, null);
      expect(tree3.getNumberOfKeys()).toBe(6);
      tree3.validateTree();
      tree3.insert(18, null);
      expect(tree3.getNumberOfKeys()).toBe(7);
      tree3.validateTree();
    });
    it('Can insert a lot of keys and still get an AVLTree (sanity check)', () => {
      const tree = new AVLTree({unique: true});

      getRandomArray(10000).forEach(function (n) {
        tree.insert(n, 'some data');
      });
      tree.validateTree();
    });
  });
  describe('Search', () => {
    it('Can find data in an AVLTree', () => {
      const tree = new AVLTree();

      getRandomArray(100).forEach((n) => {
        tree.insert(n, 'some data for ' + n);
      });
      tree.validateTree();

      for (let i = 0; i < 100; ++i) {
        expect(tree.search(i)).toEqual(['some data for ' + i]);
      }
    });
    it('Can find data in an AVLTree with custom keys comparison', () => {
      function customCompareKey(a: { key: number }, b: { key: number }): -1 | 0 | 1 {
        if (a.key > b.key) {
          return 1;
        }
        if (a.key < b.key) {
          return -1;
        }
        return 0;
      }

      const tree = new AVLTree<{ key: number }, string>({
        unique: true,
        compareKeys: customCompareKey
      });

      getRandomArray(100).forEach((n) => {
        tree.insert({key: n}, 'some data for ' + n);
      });
      tree.validateTree();

      for (let i = 0; i < 100; ++i) {
        expect(tree.search({key: i})).toEqual(['some data for ' + i]);
      }
    });
    it('If no data can be found, return an empty array', () => {
      const tree = new AVLTree();

      getRandomArray(100).forEach((n) => {
        if (n !== 63) {
          tree.insert(n, 'some data for ' + n);
        }
      });

      tree.validateTree();

      expect(tree.search(-2).length).toBe(0);
      expect(tree.search(100).length).toBe(0);
      expect(tree.search(101).length).toBe(0);
      expect(tree.search(63).length).toBe(0);
    });
    it('Can search for data between two bounds', () => {
      const tree = new AVLTree();

      [10, 5, 15, 3, 8, 13, 18].forEach(function (k) {
        tree.insert(k, 'data ' + k);
      });

      expect(tree.betweenBounds({$gte: 8, $lte: 15})).toEqual(['data 8', 'data 10', 'data 13', 'data 15']);
      expect(tree.betweenBounds({$gt: 8, $lt: 15})).toEqual(['data 10', 'data 13']);
    });
    it('Bounded search can handle cases where query contains both $lt and $lte, or both $gt and $gte', () => {
      const tree = new AVLTree();

      [10, 5, 15, 3, 8, 13, 18].forEach(function (k) {
        tree.insert(k, 'data ' + k);
      });

      expect(tree.betweenBounds({$gt: 8, $gte: 8, $lte: 15})).toEqual(['data 10', 'data 13', 'data 15']);
      expect(tree.betweenBounds({$gt: 5, $gte: 8, $lte: 15})).toEqual(['data 8', 'data 10', 'data 13', 'data 15']);
      expect(tree.betweenBounds(
        {$gt: 8, $gte: 5, $lte: 15})).toEqual(['data 10', 'data 13', 'data 15']);

      expect(tree.betweenBounds({$gte: 8, $lte: 15, $lt: 15})).toEqual(['data 8', 'data 10', 'data 13']);
      expect(tree.betweenBounds({$gte: 8, $lte: 18, $lt: 15})).toEqual(['data 8', 'data 10', 'data 13']);
      expect(tree.betweenBounds({$gte: 8, $lte: 15, $lt: 18})).toEqual(['data 8', 'data 10', 'data 13', 'data 15']);
    });
    it('Bounded search can work when one or both boundaries are missing', () => {
      const tree = new AVLTree();

      [10, 5, 15, 3, 8, 13, 18].forEach(function (k) {
        tree.insert(k, 'data ' + k);
      });

      expect(tree.betweenBounds({$gte: 11})).toEqual(['data 13', 'data 15', 'data 18']);
      expect(tree.betweenBounds({$lte: 9})).toEqual(['data 3', 'data 5', 'data 8']);
    });
    it('Can search for keys between two bounds', () => {
      const tree = new AVLTree();

      [10, 5, 15, 3, 8, 13, 18].forEach((k) => {
        tree.insert(k, 'data ' + k);
      });

      expect(tree.keysBetweenBounds({$gte: 8, $lte: 15})).toEqual([8, 10, 13, 15]);
      expect(tree.keysBetweenBounds({$gt: 8, $lt: 15})).toEqual([10, 13]);
    });
    it('Bounded search for keys can handle cases where query contains both $lt and $lte, or both $gt and $gte', () => {
      const tree = new AVLTree();

      [10, 5, 15, 3, 8, 13, 18].forEach((k) => {
        tree.insert(k, 'data ' + k);
      });

      expect(tree.keysBetweenBounds({$gt: 8, $gte: 8, $lte: 15})).toEqual([10, 13, 15]);
      expect(tree.keysBetweenBounds({$gt: 5, $gte: 8, $lte: 15})).toEqual([8, 10, 13, 15]);
      expect(tree.keysBetweenBounds({$gt: 8, $gte: 5, $lte: 15})).toEqual([10, 13, 15]);

      expect(tree.keysBetweenBounds({$gte: 8, $lte: 15, $lt: 15})).toEqual([8, 10, 13]);
      expect(tree.keysBetweenBounds({$gte: 8, $lte: 18, $lt: 15})).toEqual([8, 10, 13]);
      expect(tree.keysBetweenBounds({$gte: 8, $lte: 15, $lt: 18})).toEqual([8, 10, 13, 15]);
    });
    it('Bounded search can work when one or both boundaries are missing', () => {
      const tree = new AVLTree();

      [10, 5, 15, 3, 8, 13, 18].forEach((k) => {
        tree.insert(k, 'data ' + k);
      });

      expect(tree.keysBetweenBounds({$gte: 11})).toEqual([13, 15, 18]);
      expect(tree.keysBetweenBounds({$lte: 9})).toEqual([3, 5, 8]);
    });
    it('Can find ascending ordered data in a AVL', () => {
      const tree = new AVLTree<number, { key: number, value: string }>();

      getRandomArray(100).forEach((n) => {
        tree.insert(n, {key: n, value: 'some data for ' + n});
      });

      tree.validateTree();

      let key = tree.getMinKey();
      expect(key).toEqual(0);

      for (let i = 1; i <= 100; ++i) {
        const next = tree.searchAfter(key);

        if (i === 100) {
          expect(next).toEqual([]);
        } else {
          expect(next.length).toBe(1);
          expect(next[0].key).toBe(i);
          expect(next[0].key).toBeGreaterThan(key);
          key = next[0].key;
        }
      }
    });
    it('Can find descending ordered data in a AVL', () => {
      const tree = new AVLTree<number, { key: number, value: string }>();

      getRandomArray(100).forEach((n) => {
        tree.insert(n, {key: n, value: 'some data for ' + n});
      });

      tree.validateTree();

      let key = tree.getMaxKey();
      expect(key).toBe(99);

      for (let i = 1; i <= 100; i++) {
        const next = tree.searchBefore(key);
        if (i === 100)
          expect(next).toEqual([]);
        else {
          expect(next.length).toBe(1);
          expect(next[0].key).toBe(99 - i);
          expect(next[0].key).toBeLessThan(key);
          key = next[0].key;
        }
      }
    });
    it('Can find ascending ordered key in a AVL', () => {
      const tree = new AVLTree<number, any>();

      getRandomArray(100).forEach((n) => {
        tree.insert(n, null);
      });

      tree.validateTree();

      let key = tree.getMinKey();
      expect(key).toEqual(0);

      for (let i = 1; i <= 100; ++i) {
        const next = tree.searchKeyAfter(key);

        if (i === 100) {
          expect(next).toBe(void 0);
        } else {
          expect(next).toBe(i);
          expect(next).toBeGreaterThan(key);
          key = next;
        }
      }
    });
    it('Can find descending ordered key in a AVL', () => {
      const tree = new AVLTree<number, any>();

      getRandomArray(100).forEach((n) => {
        tree.insert(n, null);
      });

      tree.validateTree();

      let key = tree.getMaxKey();
      expect(key).toBe(99);

      for (let i = 1; i <= 100; i++) {
        const next = tree.searchKeyBefore(key);
        if (i === 100)
          expect(next).toBe(void 0);
        else {
          expect(next).toBe(99 - i);
          expect(next).toBeLessThan(key);
          key = next;
        }
      }
    });
  });
  describe('Deletion', () => {
    it('Deletion does nothing on an empty tree', () => {
      const tree = new AVLTree();
      const _tree = tree as any;

      const treeU = new AVLTree({unique: true});
      const _treeU = treeU as any;

      expect(tree.getNumberOfKeys()).toBe(0);
      expect(treeU.getNumberOfKeys()).toBe(0);

      tree.delete(5);
      treeU.delete(5);

      expect(_tree.avl.key).toBe(void 0);
      expect(_treeU.avl.key).toBe(void 0);

      expect(_tree.avl.data).toEqual([]);
      expect(_treeU.avl.data).toEqual([]);

      expect(tree.getNumberOfKeys()).toBe(0);
      expect(treeU.getNumberOfKeys()).toBe(0);
    });
    it('Deleting a non-existent key doesnt have any effect', () => {
      const tree = new AVLTree();

      [10, 5, 3, 8, 15, 12, 37].forEach((k) => {
        tree.insert(k, 'some ' + k);
      });

      function checkTree() {
        [10, 5, 3, 8, 15, 12, 37].forEach((k) => {
          expect(tree.search(k)).toEqual(['some ' + k]);
        });
      }

      checkTree();
      expect(tree.getNumberOfKeys()).toBe(7);

      tree.delete(2);
      checkTree();
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(7);
      tree.delete(4);
      checkTree();
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(7);
      tree.delete(9);
      checkTree();
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(7);
      tree.delete(6);
      checkTree();
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(7);
      tree.delete(11);
      checkTree();
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(7);
      tree.delete(14);
      checkTree();
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(7);
      tree.delete(20);
      checkTree();
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(7);
      tree.delete(200);
      checkTree();
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(7);
    });
    it('Able to delete the root if it is also a leaf', () => {
      const tree = new AVLTree();
      const _tree = tree as any;

      tree.insert(10, 'hello');
      expect(_tree.avl.key).toBe(10);
      expect(_tree.avl.data).toEqual(['hello']);
      expect(tree.getNumberOfKeys()).toBe(1);

      tree.delete(10);
      expect(_tree.avl.key).toBe(void 0);
      expect(_tree.avl.data).toEqual([]);
      expect(tree.getNumberOfKeys()).toBe(0);
    });
    it('Able to delete leaf nodes that are non-root', () => {
      let tree: AVLTree<number, any> = null;

      // This will create an AVL tree with leaves 3, 8, 12, 37
      // (do a pretty print to see this)
      function recreateTree() {
        const tmpTree = new AVLTree<number, any>();

        [10, 5, 3, 8, 15, 12, 37].forEach((k) => {
          tmpTree.insert(k, 'some ' + k);
        });

        expect(tmpTree.getNumberOfKeys()).toBe(7);

        return tmpTree;
      }

      // Check that only keys in array theRemoved were removed
      function checkRemoved(theRemoved: number[]) {
        [10, 5, 3, 8, 15, 12, 37].forEach((k) => {
          if (theRemoved.indexOf(k) !== -1) {
            expect(tree.search(k).length).toBe(0);
          } else {
            expect(tree.search(k)).toEqual(['some ' + k]);
          }
        });

        expect(tree.getNumberOfKeys()).toBe(7 - theRemoved.length);
      }

      tree = recreateTree();
      tree.delete(3);
      tree.validateTree();
      checkRemoved([3]);

      tree = recreateTree();
      tree.delete(8);
      tree.validateTree();
      checkRemoved([8]);

      tree = recreateTree();
      tree.delete(12);
      tree.validateTree();
      checkRemoved([12]);

      // Delete all leaves in a way that makes the tree unbalanced
      tree = recreateTree();
      tree.delete(37);
      tree.validateTree();
      checkRemoved([37]);

      tree.delete(12);
      tree.validateTree();
      checkRemoved([12, 37]);

      tree.delete(15);
      tree.validateTree();
      checkRemoved([12, 15, 37]);

      tree.delete(3);
      tree.validateTree();
      checkRemoved([3, 12, 15, 37]);

      tree.delete(5);
      tree.validateTree();
      checkRemoved([3, 5, 12, 15, 37]);

      tree.delete(10);
      tree.validateTree();
      checkRemoved([3, 5, 10, 12, 15, 37]);

      tree.delete(8);
      tree.validateTree();
      checkRemoved([3, 5, 8, 10, 12, 15, 37]);
    });
    it('Able to delete the root if it has only one child', () => {
      let tree = new AVLTree();
      [10, 5].forEach(function (k) {
        tree.insert(k, 'some ' + k);
      });
      expect(tree.getNumberOfKeys()).toBe(2);
      tree.delete(10);
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(1);
      expect(tree.search(5)).toEqual(['some 5']);
      expect(tree.search(10).length).toBe(0);

      // Root has only one child, on the right
      tree = new AVLTree();
      [10, 15].forEach(function (k) {
        tree.insert(k, 'some ' + k);
      });
      expect(tree.getNumberOfKeys()).toBe(2);
      tree.delete(10);
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(1);
      expect(tree.search(15)).toEqual(['some 15']);
      expect(tree.search(10).length).toBe(0);
    });
    it('Able to delete non root nodes that have only one child', () => {
      let tree = new AVLTree();

      const firstSet = [10, 5, 15, 3, 1, 4, 20];
      const secondSet = [10, 5, 15, 3, 1, 4, 20, 17, 25];

      // Check that only keys in array theRemoved were removed
      function checkRemoved(set: number[], theRemoved: number[]) {
        set.forEach(function (k) {
          if (theRemoved.indexOf(k) !== -1) {
            expect(tree.search(k).length).toBe(0);
          } else {
            expect(tree.search(k)).toEqual(['some ' + k]);
          }
        });

        expect(tree.getNumberOfKeys()).toBe(set.length - theRemoved.length);
      }

      // First set: no rebalancing necessary
      firstSet.forEach((k) => {
        tree.insert(k, 'some ' + k);
      });

      expect(tree.getNumberOfKeys()).toBe(7);
      tree.validateTree();

      tree.delete(4);   // Leaf
      tree.validateTree();
      checkRemoved(firstSet, [4]);

      tree.delete(3);   // Node with only one child (on the left)
      tree.validateTree();
      checkRemoved(firstSet, [3, 4]);

      tree.delete(10);   // Leaf
      tree.validateTree();
      checkRemoved(firstSet, [3, 4, 10]);

      tree.delete(15);   // Node with only one child (on the right)
      tree.validateTree();
      checkRemoved(firstSet, [3, 4, 10, 15]);

      // Second set: some rebalancing necessary
      tree = new AVLTree();
      secondSet.forEach((k) => {
        tree.insert(k, 'some ' + k);
      });

      tree.delete(4);   // Leaf
      tree.validateTree();
      checkRemoved(secondSet, [4]);

      tree.delete(3);   // Node with only one child (on the left), causes rebalancing
      tree.validateTree();
      checkRemoved(secondSet, [3, 4]);
    });
    it('Can delete the root if it has 2 children', () => {
      let tree = new AVLTree();

      // No rebalancing needed
      [10, 5, 15, 3, 8, 12, 37].forEach((k) => {
        tree.insert(k, 'some ' + k);
      });
      expect(tree.getNumberOfKeys()).toBe(7);
      tree.delete(10);
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(6);
      [5, 3, 8, 15, 12, 37].forEach((k) => {
        expect(tree.search(k)).toEqual(['some ' + k]);
      });
      expect(tree.search(10).length).toBe(0);

      // Re-balancing needed
      tree = new AVLTree();
      [10, 5, 15, 8, 12, 37, 42].forEach((k) => {
        tree.insert(k, 'some ' + k);
      });
      expect(tree.getNumberOfKeys()).toBe(7);
      tree.delete(10);
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(6);
      [5, 8, 15, 12, 37, 42].forEach((k) => {
        expect(tree.search(k)).toEqual(['some ' + k]);
      });
      expect(tree.search(10).length).toBe(0);
    });
    it('Can delete a non-root node that has two children', () => {
      // On the left
      let tree = new AVLTree();
      [10, 5, 15, 3, 8, 12, 20, 1, 4, 6, 9, 11, 13, 19, 42, 3.5].forEach((k) => {
        tree.insert(k, 'some ' + k);
      });
      expect(tree.getNumberOfKeys()).toBe(16);
      tree.delete(5);
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(15);
      [10, 3, 1, 4, 8, 6, 9, 15, 12, 11, 13, 20, 19, 42, 3.5].forEach((k) => {
        expect(tree.search(k)).toEqual(['some ' + k]);
      });
      expect(tree.search(5).length).toBe(0);

      // On the right
      tree = new AVLTree();
      [10, 5, 15, 3, 8, 12, 20, 1, 4, 6, 9, 11, 13, 19, 42, 12.5].forEach((k) => {
        tree.insert(k, 'some ' + k);
      });
      expect(tree.getNumberOfKeys()).toBe(16);
      tree.delete(15);
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(15);
      [10, 3, 1, 4, 8, 6, 9, 5, 12, 11, 13, 20, 19, 42, 12.5].forEach((k) => {
        expect(tree.search(k)).toEqual(['some ' + k]);
      });
      expect(tree.search(15).length).toBe(0);
    });
    it('If no value is provided, it will delete the entire node even if there are multiple pieces of data', () => {
      const tree = new AVLTree();

      tree.insert(10, 'yes');
      tree.insert(5, 'hello');
      tree.insert(3, 'yes');
      tree.insert(5, 'world');
      tree.insert(8, 'yes');

      expect(tree.search(5)).toEqual(['hello', 'world']);
      expect(tree.getNumberOfKeys()).toBe(4);

      tree.delete(5);
      tree.validateTree();
      expect(tree.search(5).length).toBe(0);
      expect(tree.getNumberOfKeys()).toBe(3);
    });
    it('Can remove only one value from an array', () => {
      const tree = new AVLTree();

      tree.insert(10, 'yes');
      tree.insert(5, 'hello');
      tree.insert(3, 'yes');
      tree.insert(5, 'world');
      tree.insert(8, 'yes');

      expect(tree.search(5)).toEqual(['hello', 'world']);
      expect(tree.getNumberOfKeys()).toBe(4);

      tree.delete(5, 'hello');
      tree.validateTree();
      expect(tree.search(5)).toEqual(['world']);
      expect(tree.getNumberOfKeys()).toBe(4);
    });
    it('Removes nothing if value doesn\'t match', () => {
      const tree = new AVLTree();

      tree.insert(10, 'yes');
      tree.insert(5, 'hello');
      tree.insert(3, 'yes');
      tree.insert(5, 'world');
      tree.insert(8, 'yes');

      expect(tree.search(5)).toEqual(['hello', 'world']);
      expect(tree.getNumberOfKeys()).toBe(4);

      tree.delete(5, 'nope');
      tree.validateTree();
      expect(tree.search(5)).toEqual(['hello', 'world']);
      expect(tree.getNumberOfKeys()).toBe(4);
    });
    it('If value provided but node contains only one value, remove entire node', () => {
      const tree = new AVLTree();

      tree.insert(10, 'yes');
      tree.insert(5, 'hello');
      tree.insert(3, 'yes2');
      tree.insert(5, 'world');
      tree.insert(8, 'yes3');

      expect(tree.search(3)).toEqual(['yes2']);
      expect(tree.getNumberOfKeys()).toBe(4);

      tree.delete(3, 'yes2');
      tree.validateTree();
      expect(tree.search(3).length).toBe(0);
      expect(tree.getNumberOfKeys()).toBe(3);
    });
    it('Can remove the root from a tree with height 2 when the root has two children (special case)', () => {
      const tree = new AVLTree();

      tree.insert(10, 'maybe');
      tree.insert(5, 'no');
      tree.insert(15, 'yes');
      expect(tree.getNumberOfKeys()).toBe(3);

      tree.delete(10);
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(2);
      expect(tree.search(5)).toEqual(['no']);
      expect(tree.search(15)).toEqual(['yes']);
    });
    it('Can remove the root from a tree with height 3 when the root has two children (special case where the two children themselves have children)', () => {
      const tree = new AVLTree();

      tree.insert(10, 'maybe');
      tree.insert(5, 'no');
      tree.insert(15, 'yes');
      tree.insert(2, 'no');
      tree.insert(35, 'yes');
      expect(tree.getNumberOfKeys()).toBe(5);

      tree.delete(10);
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(4);
      expect(tree.search(5)).toEqual(['no']);
      expect(tree.search(15)).toEqual(['yes']);
    });
    it('Removing falsy values does not delete the entire key', () => {
      const tree = new AVLTree();

      tree.insert(10, 2);
      tree.insert(10, 1);
      expect(tree.search(10)).toEqual([2, 1]);

      tree.delete(10, 2);
      expect(tree.search(10)).toEqual([1]);

      tree.insert(10, 0);
      expect(tree.search(10)).toEqual([1, 0]);

      tree.delete(10, 0);
      expect(tree.search(10)).toEqual([1]);
    });
  });
  describe('Null keys and values', () => {
    it('Can use null as key and value', () => {
      function compareKeys(a: any, b: any) {
        if (a === null && b === null) {
          return 0;
        }
        if (a === null) {
          return -1;
        }
        if (b === null) {
          return 1;
        }

        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        if (a === b) {
          return 0;
        }

        throw Error('Cannot compare');
      }

      const tree = new AVLTree({compareKeys: compareKeys});

      tree.insert(2, null);
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(1);
      expect(tree.search(2)).toEqual([null]);
      expect(tree.search(null)).toEqual([]);

      tree.insert(null, 'hello');
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(2);
      expect(tree.search(2)).toEqual([null]);
      expect(tree.search(null)).toEqual(['hello']);

      tree.insert(null, 'world');
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(2);
      expect(tree.search(2)).toEqual([null]);
      expect(tree.search(null)).toEqual(['hello', 'world']);

      tree.insert(4, null);
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(3);
      expect(tree.search(2)).toEqual([null]);
      expect(tree.search(4)).toEqual([null]);
      expect(tree.search(null)).toEqual(['hello', 'world']);

      tree.delete(null, 'hello');
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(3);
      expect(tree.search(2)).toEqual([null]);
      expect(tree.search(4)).toEqual([null]);
      expect(tree.search(null)).toEqual(['world']);

      tree.delete(null);
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(2);
      expect(tree.search(2)).toEqual([null]);
      expect(tree.search(4)).toEqual([null]);
      expect(tree.search(null)).toEqual([]);

      tree.delete(2, null);
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(1);
      expect(tree.search(2)).toEqual([]);
      expect(tree.search(4)).toEqual([null]);
      expect(tree.search(null)).toEqual([]);

      tree.delete(4);
      tree.validateTree();
      expect(tree.getNumberOfKeys()).toBe(0);
      expect(tree.search(2)).toEqual([]);
      expect(tree.search(4)).toEqual([]);
      expect(tree.search(null)).toEqual([]);
    });
  });
  describe('Execute on every node (=tree traversal)', () => {
    it('Can execute a function on every node', () => {
      const tree = new AVLTree<number, any>();
      const keys: number[] = [];
      let executed = 0;

      tree.insert(10, 'yes');
      tree.insert(5, 'hello');
      tree.insert(3, 'yes2');
      tree.insert(8, 'yes3');
      tree.insert(15, 'yes3');
      tree.insert(159, 'yes3');
      tree.insert(11, 'yes3');

      tree.executeOnEveryNode(function (key) {
        keys.push(key);
        executed += 1;
      });

      expect(keys).toEqual([3, 5, 8, 10, 11, 15, 159]);
      expect(executed).toBe(7);
    });

  });

  // This test performs several inserts and deletes at random, always checking the content
  // of the tree are as expected and the binary search tree constraint is respected
  // This test is important because it can catch bugs other tests can't
  // By their nature, BSTs can be hard to test (many possible cases, bug at one operation whose
  // effect begins to be felt only after several operations etc.)
  describe('Randomized test (takes much longer than the rest of the test suite)', () => {
    const tree = new AVLTree<number, any>();
    const data: { [key: number]: any[] } = {};

    // Check a tree against a simple key => [data] object
    function checkDataIsTheSame(avlt: AVLTree<number, any>, data: { [key: number]: any[] }) {
      const avltDataElems: any[] = [];

      // avltDataElems is a simple array containing every piece of data in the tree
      avlt.executeOnEveryNode(function (key, data) {
        avltDataElems.push(...data);
      });

      // Number of key and number of pieces of data match
      expect(avlt.getNumberOfKeys()).toBe(Object.keys(data).length);
      expect(Object.keys(data).map(k => data[+k].length).reduce((t, v) => t + v, 0)).toBe(avltDataElems.length);


      // Compare data
      Object.keys(data).forEach((key) => {
        expect(avlt.search(+key)).toEqual(data[+key]);
      });
    }

    // Tests the tree structure (deletions concern the whole tree, deletion of some data in a node is well tested above)
    it('Inserting and deleting entire nodes', () => {
      // You can skew to be more insertive or deletive, to test all cases
      function launchRandomTest(nTests: number, proba: number) {
        for (let i = 0; i < nTests; ++i) {
          if (Math.random() > proba) {   // Deletion
            const possibleKeys: number[] = Object.keys(data).map(d => +d);

            let key: number;

            if (possibleKeys.length > 0) {
              key = possibleKeys[Math.floor(possibleKeys.length * Math.random())];
            } else {
              key = Math.floor(70 * Math.random());
            }

            delete data[key];
            tree.delete(key);
          } else {   // Insertion
            const key = Math.floor(70 * Math.random());
            const dataPiece = Math.random().toString().substring(0, 6);

            tree.insert(key, dataPiece);
            if (data[key]) {
              data[key].push(dataPiece);
            } else {
              data[key] = [dataPiece];
            }
          }

          // Check the tree constraint are still met and the data is correct
          tree.validateTree();
          checkDataIsTheSame(tree, data);
        }
      }

      launchRandomTest(1000, 0.65);
      launchRandomTest(2000, 0.35);
    });
  });
});
