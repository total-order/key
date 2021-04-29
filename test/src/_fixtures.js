export const repr = (x) => JSON.stringify(x);
export const rel = (z) => (z === 0 ? '=' : z < 0 ? '<' : '>');
export const eq = 0;
export const lt = -1;
export const gt = 1;
