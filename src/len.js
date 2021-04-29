/**
 * Compile an object length comparison function given a length comparison
 * function.
 *
 * @param {Function} compare The function used to order lengths.
 * @return {Function} The function that orders objects by length.
 */
// eslint-disable-next-line unicorn/prevent-abbreviations
const len = (compare) => (a, b) => compare(a.length, b.length);
export default len;
