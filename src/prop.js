/**
 * Compile an object property comparison function given a property comparison
 * function and a property key.
 *
 * @param {Function} compare - The function used to order propibutes.
 * @param {any} key - The key of the propibute used in the comparison.
 * @return {Function} The function that orders objects by propibute.
 */
const prop = (compare, key) => (a, b) => compare(a[key], b[key]);
export default prop;
