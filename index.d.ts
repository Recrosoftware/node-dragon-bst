declare module 'dragon-bst' {
  export interface AVLTreeQuery<K> {
    $gt?: K;
    $gte?: K;
    $lt?: K;
    $lte?: K;
  }

  export interface AVLTreeOptions<K, V extends any> {
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
  export class AVLTree<K, V extends any> {

    /**
     * AVLTree constructor.
     *
     * @param {AVLTreeOptions} options Optional. Tree configuration options.
     */
    constructor(options?: AVLTreeOptions<K, V>);

    /**
     * Check all conditions of this AVL Search tree:
     *  - Internal references
     *  - Nodes ordering and heights
     *  - Balance Factors
     */
    public validateTree(): void;

    /**
     * Get number of inserted keys.
     */
    public getNumberOfKeys(): number;

    /**
     * Get tree height.
     */
    public getHeight(): number;

    /**
     * Insert a new element.
     */
    public insert(key: K, value: V): void;

    /**
     * Delete a key or just a value associated to that key.
     *
     * @param key   The target key.
     * @param value Optional. If provvided delete only the value associated to that key that matches this paraneter.
     */
    public delete(key: K, value?: V): void;

    /**
     * Search for all data corresponding to a key.
     */
    public search(key: K): V[];

    /**
     * Get all data for a key between bounds.
     * Return it in key order.
     *
     * @param {AVLTreeQuery} query A query used to search the tree, to retrieve all data in the tree use {}.
     * @returns {[]} An array of found elements
     */
    public betweenBounds(query: AVLTreeQuery<K>): V[];

    /**
     * Execute a function on every node of the tree, in key order.
     *
     * @param {(key: K, data: V[]) => void} action
     */
    public executeOnEveryNode(action: (key: K, data: V[]) => void): void;
  }
}