import {defaultCheckValueEquality, defaultCompareKeys, KeyMatcher, TreeError} from './common';


export interface AVLTreeQuery<K> {
  $gt?: K;
  $gte?: K;
  $lt?: K;
  $lte?: K;
}

export interface AVLTreeOptions<K, V> {
  /**
   * The initial key-value pair with which initialize tree.
   */
  initial?: { key: K, value: V },

  /**
   * If true trying to insert a key already present in the tree will result in an exception.
   */
  unique?: boolean;

  /**
   * Specify a custom function to compare keys.
   * It must accepts two arguments and return one between -1, 0, 1.
   */
  compareKeys?: (a: K, b: K) => -1 | 0 | 1;

  /**
   * Specify a custom function to check values equality.
   * It must accepts two arguments and return true or false.
   */
  checkValueEquality?: (a: V, b: V) => boolean;
}

/**
 * Self-balancing binary search tree using the AVL implementation
 */
export class AVLTree<K, V> {
  private avl: AVLTreeInternal<K, V>;

  /**
   * AVLTree constructor.
   *
   * @param {AVLTreeOptions} options Optional. Tree configuration options.
   */
  constructor(options?: AVLTreeOptions<K, V>) {
    this.avl = new AVLTreeInternal(options || {});
  }

  /**
   * Check all conditions of this AVL Search tree:
   *  - Internal references
   *  - Nodes ordering and heights
   *  - Balance Factors
   */
  public validateTree(): void {
    this.avl.validateTree();
  }

  /**
   * Get number of inserted keys.
   */
  public getNumberOfKeys(): number {
    return this.avl.getNumberOfKeys();
  }

  /**
   * Get tree height.
   */
  public getHeight(): number {
    return this.avl.getHeight();
  }

  /**
   * Insert a new element.
   */
  public insert(key: K, value: V): void {
    if (key === void 0) {
      throw new TreeError(`Cannot insert an undefined key.`);
    }
    if (value === void 0) {
      throw new TreeError(`Cannot insert an undefined value.`);
    }

    const avl = this.avl.insert(key, value);
    if (avl) {
      this.avl = avl;
    }
  }

  /**
   * Delete a key or just a value associated to that key.
   *
   * @param key   The target key.
   * @param value Optional. If provided delete only the value associated to that key that matches this paraneter.
   */
  public delete(key: K, value?: V): void {
    if (key === void 0) {
      throw new TreeError(`Cannot delete undefined key.`);
    }

    const avl = this.avl.delete(key, value);
    if (avl) {
      this.avl = avl;
    }
  }

  /**
   * Search for all data corresponding to a key.
   */
  public search(key: K): V[] {
    if (key === void 0) {
      throw new TreeError(`Cannot search undefined key.`);
    }

    return this.avl.search(key);
  }

  /**
   * Search for data coming right after a specific key.
   *
   * @param   key
   * @returns The data right after the key specified, or [] if no data found.
   */
  public searchAfter(key: K): V[] {
    if (key === void 0) {
      throw new TreeError(`Cannot search after undefined key.`);
    }

    return this.avl.searchAfter(key);
  }

  /**
   * Search for data coming right before a specific key.
   *
   * @param   key
   * @returns The data right before the key specified, or [] if no data found.
   */
  public searchBefore(key: K): V[] {
    if (key === void 0) {
      throw new TreeError(`Cannot search before undefined key.`);
    }

    return this.avl.searchBefore(key);
  }

  /**
   * Search for key coming right after a specific key.
   *
   * @param   key
   * @returns The key right after the specified one, or undefined if no keys are found.
   */
  public searchKeyAfter(key: K): K {
    if (key === void 0) {
      throw new TreeError(`Cannot search key after undefined key.`);
    }

    return this.avl.searchKeyAfter(key);
  }

  /**
   * Search for key coming right before a specific key.
   *
   * @param   key
   * @returns The key right  before the specified one, or undefined if no keys are found.
   */
  public searchKeyBefore(key: K): K {
    if (key === void 0) {
      throw new TreeError(`Cannot search key before undefined key.`);
    }

    return this.avl.searchKeyBefore(key);
  }

  /**
   * Return the smallest key from the tree
   *
   * @returns The smallest key, or undefined if the tree is empty
   */
  public getMinKey(): K {
    return this.avl.getMinKey();
  }

  /**
   * Return the greatest key from the tree
   *
   * @returns The greatest key, or undefined if the tree is empty
   */
  public getMaxKey(): K {
    return this.avl.getMaxKey();
  }

  /**
   * Get all data for a key between bounds.
   * Return it in key order.
   *
   * @param {AVLTreeQuery} query A query used to search the tree, to retrieve all data in the tree use {}.
   * @returns {[]} An array of found elements
   */
  public betweenBounds(query: AVLTreeQuery<K>): V[] {
    return this.avl.betweenBounds(query);
  }

  /**
   * Get all the keys between bounds.
   * Return it in key order.
   *
   * @param {AVLTreeQuery} query A query used to search the tree, to retrieve all the keys in the tree use {}.
   * @returns {[]} An array of found keys
   */
  public keysBetweenBounds(query: AVLTreeQuery<K>): K[] {
    return this.avl.keysBetweenBounds(query);
  }

  /**
   * Execute a function on every node of the tree, in key order.
   *
   * @param {(key: K, data: V[]) => void} action
   */
  public executeOnEveryNode(action: (key: K, data: V[]) => void): void {
    this.avl.executeOnEveryNode(action);
  }
}

class AVLTreeInternal<K, V> {
  private key: K;
  private data: V[];
  private height: number;

  private parent: AVLTreeInternal<K, V>;
  private left: AVLTreeInternal<K, V>;
  private right: AVLTreeInternal<K, V>;

  private unique: boolean;
  private compareKeys: (a: K, b: K) => -1 | 0 | 1;
  private checkValueEquality: (a: V, b: V) => boolean;

  constructor(options: AVLTreeOptions<K, V>) {
    this.parent = null;
    this.left = null;
    this.right = null;

    if (options.initial != null) {
      if (options.initial.key === void 0 || options.initial.value === void 0) {
        throw new TreeError('If initial value is provided key and value cannot be undefined');
      }
      this.key = options.initial.key;
      this.data = [options.initial.value];
      this.height = 1;
    } else {
      this.key = void 0;
      this.data = [];
      this.height = null;
    }

    this.unique = options.unique != null ? options.unique : false;
    this.compareKeys = options.compareKeys || defaultCompareKeys;
    this.checkValueEquality = options.checkValueEquality || defaultCheckValueEquality;
  }

  public validateTree(): void {
    // Empty tree
    if (this.key === void 0) {
      return;
    }

    if (this.parent != null) {
      throw new TreeError(`The root shouldn't have a parent`);
    }
    this.validateNode();
  }

  public getNumberOfKeys(): number {
    if (this.key === void 0) {
      return 0;
    }

    let toReturn = 1;
    if (this.left) {
      toReturn += this.left.getNumberOfKeys();
    }
    if (this.right) {
      toReturn += this.right.getNumberOfKeys();
    }
    return toReturn;
  }

  public getHeight(): number {
    return this.height;
  }

  public insert(key: K, value: V): AVLTreeInternal<K, V> {
    // Empty tree, insert as root
    if (this.key === void 0) {
      this.key = key;
      this.data = [value];
      this.height = 1;
      return this;
    }

    const insertPath: AVLTreeInternal<K, V>[] = [];
    let currentNode: AVLTreeInternal<K, V> = this;

    // Insert new leaf at the right place
    while (true) {
      const compared = this.compareKeys(key, currentNode.key);

      // Same key: no change in the tree structure
      if (compared === 0) {
        if (this.unique) {
          throw new TreeError(`Can't insert key '${key}', it violates the unique constraint`,
            {key: String(key), errorType: 'uniqueViolated'});
        } else {
          const presentIdx = currentNode.data.findIndex(d => this.checkValueEquality(d, value));
          if (presentIdx >= 0) {
            currentNode.data[presentIdx] = value;
          } else {
            currentNode.data.push(value);
          }
        }
        return this;
      }

      insertPath.push(currentNode);

      if (compared < 0) {
        if (!currentNode.left) {
          insertPath.push(currentNode.createLeftChild({initial: {key: key, value: value}}));
          break;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (!currentNode.right) {
          insertPath.push(currentNode.createRightChild({initial: {key: key, value: value}}));
          break;
        } else {
          currentNode = currentNode.right;
        }
      }
    }

    return this.rebalanceAlongPath(insertPath);
  }

  public delete(key: K, value?: V): AVLTreeInternal<K, V> {
    if (this.key === void 0) {
      return this;
    }

    const deletePath: AVLTreeInternal<K, V>[] = [];
    let currentNode: AVLTreeInternal<K, V> = this;

    // Either no match is found and the function will return from within the loop
    // Or a match is found and deletePath will contain the path from the root to the node to delete after the loop
    while (true) {
      // Key not found, no modification
      if (!currentNode) {
        return this;
      }

      const compared = this.compareKeys(key, currentNode.key);
      if (compared === 0) {
        break;
      }

      deletePath.push(currentNode);

      if (compared < 0) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    // Delete only a value (no tree modification)
    if (value !== void 0 && currentNode.data.length > 0) {
      currentNode.data = currentNode.data.filter(d => !this.checkValueEquality(d, value));
      if (currentNode.data.length > 0) {
        return this;
      }
    }

    // Delete a whole node

    // Leaf
    if (!currentNode.left && !currentNode.right) {
      if (currentNode === this) {
        // This leaf is also the root
        currentNode.key = void 0;
        currentNode.data = [];
        currentNode.height = null;

        return this;
      } else {
        if (currentNode.parent.left === currentNode) {
          currentNode.parent.left = null;
        } else {
          currentNode.parent.right = null;
        }
        return this.rebalanceAlongPath(deletePath);
      }
    }

    // Node with only one child
    if (!currentNode.left || !currentNode.right) {
      const replaceWith = currentNode.left ? currentNode.left : currentNode.right;

      if (currentNode === this) {   // This node is also the root
        replaceWith.parent = null;
        return replaceWith;   // height of replaceWith is necessarily 1 because the tree was balanced before deletion
      } else {
        if (currentNode.parent.left === currentNode) {
          currentNode.parent.left = replaceWith;
          replaceWith.parent = currentNode.parent;
        } else {
          currentNode.parent.right = replaceWith;
          replaceWith.parent = currentNode.parent;
        }

        return this.rebalanceAlongPath(deletePath);
      }
    }

    // Node with two children
    // Use the in-order predecessor (no need to randomize since we actively rebalance)
    deletePath.push(currentNode);
    let replaceWith = currentNode.left;

    // Special case: the in-order predecessor is right below the node to delete
    if (!replaceWith.right) {
      currentNode.key = replaceWith.key;
      currentNode.data = replaceWith.data;
      currentNode.left = replaceWith.left;

      if (replaceWith.left) {
        replaceWith.left.parent = currentNode;
      }
      return this.rebalanceAlongPath(deletePath);
    }

    // After this loop, replaceWith is the right-most leaf in the left subtree
    // and deletePath the path from the root (inclusive) to replaceWith (exclusive)
    while (true) {
      if (replaceWith.right) {
        deletePath.push(replaceWith);
        replaceWith = replaceWith.right;
      } else {
        break;
      }
    }

    currentNode.key = replaceWith.key;
    currentNode.data = replaceWith.data;

    replaceWith.parent.right = replaceWith.left;
    if (replaceWith.left) {
      replaceWith.left.parent = replaceWith.parent;
    }

    return this.rebalanceAlongPath(deletePath);
  }

  public search(key: K): V[] {
    if (this.key !== void 0) {
      let currentNode: AVLTreeInternal<K, V> = this;

      while (true) {
        const compared = this.compareKeys(key, currentNode.key);

        if (compared === 0) {
          return currentNode.data;
        } else if (compared > 0) {
          if (!currentNode.right) {
            break;
          }
          currentNode = currentNode.right;
        } else {
          if (!currentNode.left) {
            break;
          }
          currentNode = currentNode.left;
        }
      }
    }
    return [];
  }

  public searchAfter(key: K): V[] {
    if (this.key === void 0) {
      return [];
    }

    let currentNode: AVLTreeInternal<K, V> = this;

    while (true) {
      const compared = this.compareKeys(key, currentNode.key);

      if (compared === 0) {
        // if there's a right child, the next key will be there
        if (currentNode.right) {
          currentNode = currentNode.right;
          // within the right branch, traverse left until leaf
          while (currentNode.left) {
            currentNode = currentNode.left;
          }
          return currentNode.data;
        }

        // traverse up until you find a bigger key
        currentNode = currentNode.parent;
        while (currentNode) {
          if (this.compareKeys(key, currentNode.key) < 0) {
            return currentNode.data;
          }
          currentNode = currentNode.parent;
        }

        return [];
      }

      if (compared < 0) {
        if (!currentNode.left) {
          return currentNode.data;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          // traverse up until you find a bigger key
          currentNode = currentNode.parent;
          while (currentNode) {
            if (this.compareKeys(key, currentNode.key) < 0) {
              return currentNode.data;
            }
            currentNode = currentNode.parent;
          }
          return [];
        }
        currentNode = currentNode.right;
      }
    }
  }

  public searchBefore(key: K): V[] {
    if (this.key === void 0) {
      return [];
    }

    let currentNode: AVLTreeInternal<K, V> = this;

    while (true) {
      const compared = this.compareKeys(key, currentNode.key);

      if (compared === 0) {
        // if there's a left child, the previous key will be there
        if (currentNode.left) {
          currentNode = currentNode.left;
          // within the left branch, traverse right until leaf
          while (currentNode.right) {
            currentNode = currentNode.right;
          }
          return currentNode.data;
        }

        // traverse up until you find a smaller key
        currentNode = currentNode.parent;
        while (currentNode) {
          if (this.compareKeys(key, currentNode.key) > 0) {
            return currentNode.data;
          }
          currentNode = currentNode.parent;
        }
        return [];
      }

      if (compared < 0) {
        if (!currentNode.left) {
          // traverse up until you find a smaller key
          currentNode = currentNode.parent;
          while (currentNode) {
            if (this.compareKeys(key, currentNode.key) > 0) {
              return currentNode.data;
            }
            currentNode = currentNode.parent;
          }
          return [];
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          return currentNode.data;
        }
        currentNode = currentNode.right;
      }
    }
  }

  public searchKeyAfter(key: K): K {
    if (this.key === void 0) {
      return void 0;
    }

    let currentNode: AVLTreeInternal<K, V> = this;

    while (true) {
      const compared = this.compareKeys(key, currentNode.key);

      if (compared === 0) {
        // if there's a right child, the next key will be there
        if (currentNode.right) {
          currentNode = currentNode.right;
          // within the right branch, traverse left until leaf
          while (currentNode.left) {
            currentNode = currentNode.left;
          }
          return currentNode.key;
        }

        // traverse up until you find a bigger key
        currentNode = currentNode.parent;
        while (currentNode) {
          if (this.compareKeys(key, currentNode.key) < 0) {
            return currentNode.key;
          }
          currentNode = currentNode.parent;
        }

        return void 0;
      }

      if (compared < 0) {
        if (!currentNode.left) {
          return currentNode.key;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          // traverse up until you find a bigger key
          currentNode = currentNode.parent;
          while (currentNode) {
            if (this.compareKeys(key, currentNode.key) < 0) {
              return currentNode.key;
            }
            currentNode = currentNode.parent;
          }
          return void 0;
        }
        currentNode = currentNode.right;
      }
    }
  }

  public searchKeyBefore(key: K): K {
    if (this.key === void 0) {
      return void 0;
    }

    let currentNode: AVLTreeInternal<K, V> = this;

    while (true) {
      const compared = this.compareKeys(key, currentNode.key);

      if (compared === 0) {
        // if there's a left child, the previous key will be there
        if (currentNode.left) {
          currentNode = currentNode.left;
          // within the left branch, traverse right until leaf
          while (currentNode.right) {
            currentNode = currentNode.right;
          }
          return currentNode.key;
        }

        // traverse up until you find a smaller key
        currentNode = currentNode.parent;
        while (currentNode) {
          if (this.compareKeys(key, currentNode.key) > 0) {
            return currentNode.key;
          }
          currentNode = currentNode.parent;
        }
        return void 0;
      }

      if (compared < 0) {
        if (!currentNode.left) {
          // traverse up until you find a smaller key
          currentNode = currentNode.parent;
          while (currentNode) {
            if (this.compareKeys(key, currentNode.key) > 0) {
              return currentNode.key;
            }
            currentNode = currentNode.parent;
          }
          return void 0;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          return currentNode.key;
        }
        currentNode = currentNode.right;
      }
    }
  }

  public getMinKey(): K {
    if (this.key === void 0) {
      return void 0;
    }

    let currentNode: AVLTreeInternal<K, V> = this;
    while (true) {
      if (!currentNode.left) {
        return currentNode.key;
      }
      currentNode = currentNode.left;
    }
  }

  public getMaxKey(): K {
    if (this.key === void 0) {
      return void 0;
    }

    let currentNode: AVLTreeInternal<K, V> = this;
    while (true) {
      if (!currentNode.right) {
        return currentNode.key;
      }
      currentNode = currentNode.right;
    }
  }

  public betweenBounds(query: AVLTreeQuery<K>, lbMatcher?: KeyMatcher<K>, ubMatcher?: KeyMatcher<K>): V[] {
    if (this.key === void 0) {
      return [];
    }

    lbMatcher = lbMatcher || this.getLowerBoundMatcher(query);
    ubMatcher = ubMatcher || this.getUpperBoundMatcher(query);

    const lMatch = lbMatcher(this.key);
    const uMatch = ubMatcher(this.key);

    let toReturn: V[] = [];

    if (lMatch && this.left) {
      toReturn = toReturn.concat(this.left.betweenBounds(query, lbMatcher, ubMatcher));
    }
    if (lMatch && uMatch) {
      toReturn = toReturn.concat(this.data);
    }
    if (uMatch && this.right) {
      toReturn = toReturn.concat(this.right.betweenBounds(query, lbMatcher, ubMatcher));
    }

    return toReturn;
  }

  public keysBetweenBounds(query: AVLTreeQuery<K>, lbMatcher?: KeyMatcher<K>, ubMatcher?: KeyMatcher<K>): K[] {
    if (this.key === void 0) {
      return [];
    }

    lbMatcher = lbMatcher || this.getLowerBoundMatcher(query);
    ubMatcher = ubMatcher || this.getUpperBoundMatcher(query);

    const lMatch = lbMatcher(this.key);
    const uMatch = ubMatcher(this.key);

    let toReturn: K[] = [];

    if (lMatch && this.left) {
      toReturn = toReturn.concat(this.left.keysBetweenBounds(query, lbMatcher, ubMatcher));
    }
    if (lMatch && uMatch) {
      toReturn.push(this.key);
    }
    if (uMatch && this.right) {
      toReturn = toReturn.concat(this.right.keysBetweenBounds(query, lbMatcher, ubMatcher));
    }

    return toReturn;
  }

  public executeOnEveryNode(action: (key: K, data: V[]) => void): void {
    if (this.left) {
      this.left.executeOnEveryNode(action);
    }
    action(this.key, this.data);
    if (this.right) {
      this.right.executeOnEveryNode(action);
    }
  }

  private getLowerBoundMatcher(query: AVLTreeQuery<K>): KeyMatcher<K> {
    if (query.$gt == null && query.$gte == null) {
      return () => true;
    }

    if (query.$gt != null && query.$gte != null) {
      const compared = this.compareKeys(query.$gte, query.$gt);

      if (compared === 0) {
        return (key) => this.compareKeys(key, query.$gt) > 0;
      }

      if (compared > 0) {
        return (key) => this.compareKeys(key, query.$gte) >= 0;
      } else {
        return (key) => this.compareKeys(key, query.$gt) > 0;
      }
    }

    if (query.$gt != null) {
      return (key) => this.compareKeys(key, query.$gt) > 0;
    } else {
      return (key) => this.compareKeys(key, query.$gte) >= 0;
    }
  }

  private getUpperBoundMatcher(query: AVLTreeQuery<K>): KeyMatcher<K> {
    if (query.$lt == null && query.$lte == null) {
      return () => true;
    }

    if (query.$lt != null && query.$lte != null) {
      const compared = this.compareKeys(query.$lte, query.$lt);

      if (compared === 0) {
        return (key) => this.compareKeys(key, query.$lt) < 0;
      }

      if (compared > 0) {
        return (key) => this.compareKeys(key, query.$lt) < 0;
      } else {
        return (key) => this.compareKeys(key, query.$lte) <= 0;
      }
    }

    if (query.$lt != null) {
      return (key) => this.compareKeys(key, query.$lt) < 0;
    } else {
      return (key) => this.compareKeys(key, query.$lte) <= 0;
    }
  }

  private rebalanceAlongPath(path: AVLTreeInternal<K, V>[]): AVLTreeInternal<K, V> {
    // Empty tree
    if (this.key === void 0) {
      this.height = null;
      return this;
    }

    let newRoot: AVLTreeInternal<K, V> = this;
    let rotated: AVLTreeInternal<K, V>;

    // Rebalance the tree and update all heights
    for (let i = path.length - 1; i >= 0; --i) {
      const p = path[i];

      p.height = 1 + Math.max(p.left ? p.left.height : 0, p.right ? p.right.height : 0);
      if (p.balanceFactor() > 1) {
        rotated = p.rightTooSmall();
        if (i === 0) {
          newRoot = rotated;
        }
      }
      if (p.balanceFactor() < -1) {
        rotated = p.leftTooSmall();
        if (i === 0) {
          newRoot = rotated;
        }
      }
    }

    return newRoot;
  }

  private rightTooSmall(): AVLTreeInternal<K, V> {
    // Right is not too small, don't change
    if (this.balanceFactor() <= 1) {
      return this;
    }

    if (this.left.balanceFactor() < 0) {
      this.left.leftRotation();
    }
    return this.rightRotation();
  }

  private leftTooSmall(): AVLTreeInternal<K, V> {
    // Left is not too small, don't change
    if (this.balanceFactor() >= -1) {
      return this;
    }

    if (this.right.balanceFactor() > 0) {
      this.right.rightRotation();
    }

    return this.leftRotation();
  }

  private rightRotation(): AVLTreeInternal<K, V> {
    // No changes
    if (!this.left) {
      return this;
    }

    const q: AVLTreeInternal<K, V> = this;
    const p: AVLTreeInternal<K, V> = this.left;
    const b: AVLTreeInternal<K, V> = p.right;

    // Alter tree structure
    if (q.parent) {
      p.parent = q.parent;
      if (q.parent.left === q) {
        q.parent.left = p;
      } else {
        q.parent.right = p;
      }
    } else {
      p.parent = null;
    }
    p.right = q;
    q.parent = p;
    q.left = b;
    if (b) {
      b.parent = q;
    }

    // Update heights
    const ah = p.left ? p.left.height : 0;
    const bh = b ? b.height : 0;
    const ch = q.right ? q.right.height : 0;
    q.height = Math.max(bh, ch) + 1;
    p.height = Math.max(ah, q.height) + 1;

    return p;
  }

  private leftRotation(): AVLTreeInternal<K, V> {
    // No changes
    if (!this.right) {
      return this;
    }

    const p: AVLTreeInternal<K, V> = this;
    const q: AVLTreeInternal<K, V> = this.right;
    const b: AVLTreeInternal<K, V> = q.left;

    // Alter tree structure
    if (p.parent) {
      q.parent = p.parent;
      if (p.parent.left === p) {
        p.parent.left = q;
      } else {
        p.parent.right = q;
      }
    } else {
      q.parent = null;
    }
    q.left = p;
    p.parent = q;
    p.right = b;
    if (b) {
      b.parent = p;
    }

    // Update heights
    const ah = p.left ? p.left.height : 0;
    const bh = b ? b.height : 0;
    const ch = q.right ? q.right.height : 0;
    p.height = Math.max(ah, bh) + 1;
    q.height = Math.max(ch, p.height) + 1;

    return q;
  }

  private validateNode(): void {
    if (this.left) {
      if (this.left.parent !== this) {
        throw new TreeError('Parent pointer broken for key ' + this.key);
      }
      if (this.left.height == null) {
        throw new TreeError(`Undefined height for node '${this.left.key}'`);
      }
      this.left.executeOnEveryNode((key) => {
        if (this.compareKeys(key, this.key) >= 0) {
          throw new TreeError(`Tree with root '${this.key}' is not a binary search tree`);
        }
      });
    }

    if (this.right) {
      if (this.right.parent !== this) {
        throw new TreeError('Parent pointer broken for key ' + this.key);
      }
      if (this.right.height == null) {
        throw new TreeError(`Undefined height for node '${this.left.key}'`);
      }
      this.right.executeOnEveryNode((key) => {
        if (this.compareKeys(key, this.key) <= 0) {
          throw new TreeError(`Tree with root '${this.key}' is not a binary search tree`);
        }
      });
    }

    if (this.height == null) {
      throw new TreeError(`Undefined height for node '${this.left.key}'`);
    }

    const heightL = this.left ? this.left.height : 0;
    const heightR = this.right ? this.right.height : 0;
    if (this.height !== 1 + Math.max(heightL, heightR)) {
      throw new TreeError(`Height constraint failed for node '${this.key}'`);
    }

    if (Math.abs(this.balanceFactor()) > 1) {
      throw new TreeError(`Tree is unbalanced at node '${this.key}'`);
    }

    if (this.left) {
      this.left.validateNode();
    }
    if (this.right) {
      this.right.validateNode();
    }
  }

  private balanceFactor(): number {
    const heightL = this.left ? this.left.height : 0;
    const heightR = this.right ? this.right.height : 0;

    return heightL - heightR;
  }

  private createLeftChild(options: AVLTreeOptions<K, V>): AVLTreeInternal<K, V> {
    this.left = this.createSimilar(options);
    this.left.parent = this;
    return this.left;
  }

  private createRightChild(options: AVLTreeOptions<K, V>): AVLTreeInternal<K, V> {
    this.right = this.createSimilar(options);
    this.right.parent = this;
    return this.right;
  }

  private createSimilar(options: AVLTreeOptions<K, V>): AVLTreeInternal<K, V> {
    options.unique = this.unique;
    options.compareKeys = this.compareKeys;
    options.checkValueEquality = this.checkValueEquality;

    return new AVLTreeInternal(options);
  }
}
