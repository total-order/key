import test from 'ava';

import {increasing, decreasing} from '@total-order/primitive';

import {repr, rel, eq, lt, gt} from './_fixtures.js';

import {key, prop, len} from '#module';

const _increasingKey = key(increasing, (x) => x.length);
const _decreasingKey = key(decreasing, (x) => x.length);
const _increasingProp = prop(increasing, 'length');
const _decreasingProp = prop(decreasing, 'length');
const _increasingLength = len(increasing);
const _decreasingLength = len(decreasing);

const increasingKey = (a, b) => _increasingKey(a, b);
const decreasingKey = (a, b) => _decreasingKey(a, b);
const increasingProp = (a, b) => _increasingProp(a, b);
const decreasingProp = (a, b) => _decreasingProp(a, b);
const increasingLength = (a, b) => _increasingLength(a, b);
const decreasingLength = (a, b) => _decreasingLength(a, b);

const macro = (t, compare, a, z, b) => {
	t.deepEqual(Math.sign(compare(a, b)), z);
};

macro.title = (title, compare, a, z, b) =>
	title ?? `${compare.name} ${repr(a)} ${rel(z)} ${repr(b)}`;

const implementations = [
	{compare: increasingKey, lt, gt},
	{compare: decreasingKey, lt: gt, gt: lt},
	{compare: increasingProp, lt, gt},
	{compare: decreasingProp, lt: gt, gt: lt},
	{compare: increasingLength, lt, gt},
	{compare: decreasingLength, lt: gt, gt: lt},
];

for (const {compare, lt, gt} of implementations) {
	test(macro, compare, [], eq, []);
	test(macro, compare, [], lt, [0]);
	test(macro, compare, [0], gt, []);
	test(macro, compare, [0], eq, [0]);
	test(macro, compare, [0], eq, [1]);
	test(macro, compare, [1], eq, [0]);

	test(macro, compare, [1, 2], lt, [1, 2, 3]);
	test(macro, compare, [1, 3], lt, [1, 2, 3]);
	test(macro, compare, [1, 4], lt, [1, 2, 3]);

	test(macro, compare, [0, 6, 7, 8, 9], eq, [1, 6, 7, 8, 9]);
	test(macro, compare, [1, 6, 7, 8, 9], eq, [0, 6, 7, 8, 9]);

	test(macro, compare, [9, 8, 7, 6, 0], eq, [9, 8, 7, 6, 1]);
	test(macro, compare, [9, 8, 7, 6, 1], eq, [9, 8, 7, 6, 0]);

	test(macro, compare, [0, 6, 6, 6, 6], eq, [1, 7, 7, 7, 7]);
	test(macro, compare, [1, 6, 6, 6, 6], eq, [0, 7, 7, 7, 7]);

	test(macro, compare, [6, 6, 6, 6, 0], eq, [7, 7, 7, 7, 1]);
	test(macro, compare, [6, 6, 6, 6, 1], eq, [7, 7, 7, 7, 0]);
}
