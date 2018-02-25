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
     * If true inserting a piece of data already present for a specified key overwrite the old value.
     */
    uniqueValues?: boolean

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
     * Search for data coming right after a specific key.
     *
     * @param   key
     * @returns The data right after the key specified, or [] if no data found.
     */
    public searchAfter(key: K): V[];

    /**
     * Search for data coming right before a specific key.
     *
     * @param   key
     * @returns The data right before the key specified, or [] if no data found.
     */
    public searchBefore(key: K): V[];

    /**
     * Search for key coming right after a specific key.
     *
     * @param   key
     * @returns The key right after the specified one, or undefined if no keys are found.
     */
    public searchKeyAfter(key: K): K;

    /**
     * Search for key coming right before a specific key.
     *
     * @param   key
     * @returns The key right  before the specified one, or undefined if no keys are found.
     */
    public searchKeyBefore(key: K): K;

    /**
     * Return the smallest key from the tree
     *
     * @returns The smallest key, or undefined if the tree is empty
     */
    public getMinKey(): K;

    /**
     * Return the greatest key from the tree
     *
     * @returns The greatest key, or undefined if the tree is empty
     */
    public getMaxKey(): K;

    /**
     * Get all data for a key between bounds.
     * Return it in key order.
     *
     * @param {AVLTreeQuery} query A query used to search the tree, to retrieve all data in the tree use {}.
     * @returns {[]} An array of found elements
     */
    public betweenBounds(query: AVLTreeQuery<K>): V[];

    /**
     * Get all the keys between bounds.
     * Return it in key order.
     *
     * @param {AVLTreeQuery} query A query used to search the tree, to retrieve all the keys in the tree use {}.
     * @returns {[]} An array of found keys
     */
    public keysBetweenBounds(query: AVLTreeQuery<K>): K[];

    /**
     * Execute a function on every node of the tree, in key order.
     *
     * @param {(key: K, data: V[]) => void} action
     */
    public executeOnEveryNode(action: (key: K, data: V[]) => void): void;
  }

  export class TreeError extends Error {
    public metadata: { [key: string]: string | number | boolean };

    constructor(message: string);
    constructor(message: string, metadata: { [key: string]: string | number | boolean });
  }
}