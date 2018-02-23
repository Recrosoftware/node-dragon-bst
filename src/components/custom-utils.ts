export class TreeError extends Error {
  public metadata: { [key: string]: string | number | boolean };

  constructor(message: string)
  constructor(message: string, metadata: { [key: string]: string | number | boolean })
  constructor(message: string, metadata?: { [key: string]: string | number | boolean }) {
    super(message);

    this.metadata = {};

    if (metadata != null) {
      Object.keys(metadata).forEach(key => {
        this.metadata[key] = metadata[key];
      });
    }
  }
}

export type KeyMatcher<K> = (key: K) => boolean;

export function gerRandomInteger(n: number): number {
  return Math.floor(Math.random() * n);
}

/**
 * Return an array with the numbers from 0 to n-1, in a random order
 */
export function getRandomArray(n: number): number[] {
  const toReturn: number[] = [];
  for (let i = 0; i < n; ++i) {
    toReturn.push(i);
  }

  for (let i = toReturn.length - 1; i >= 0; --i) {
    const j = gerRandomInteger(i);

    const v = toReturn[i];
    toReturn[i] = toReturn[j];
    toReturn[j] = v;

  }

  return toReturn;
}

/*
 * Default compareKeys function will work for numbers, strings and dates
 */
export function defaultCompareKeys(a: any, b: any): -1 | 0 | 1 {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  if (a === b) {
    return 0;
  }

  throw new TreeError(`Couldn't compare elements (${a} - ${b})`, {a: a, b: b});
}

/**
 * Check whether two values are equal (used in non-unique deletion)
 */
export function defaultCheckValueEquality(a: any, b: any): boolean {
  return a === b;
}

export function append(array: any[], arrayToAppend: any[]): void {
  for (const toAppend of arrayToAppend) {
    array.push(toAppend);
  }
}
