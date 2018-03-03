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
