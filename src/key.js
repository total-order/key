/**
 * Compile an object key comparison function given key comparison function and
 * a key function.
 *
 * @param {Function} compare The function used to order values.
 * @param {Function} callable The function that generates values used in the comparison.
 * @return {Function} The function that orders objects by value.
 */
const key = (compare, callable) => (a, b) => compare(callable(a), callable(b));
export default key;
