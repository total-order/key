import test from 'ava';

import {iterable} from '@total-order/iter';
import {increasing} from '@total-order/primitive';

import {repr, rel, eq, lt, gt} from './_fixtures.js';

import {key} from '#module';

const generator = key(iterable(increasing), function* (x) {
	yield x['🙀'] * x['🦿'];
	yield x['🤖'];
});

const macro = (t, compare, a, z, b) => {
	t.deepEqual(Math.sign(compare(a, b)), z);
};

macro.title = (title, compare, a, z, b) =>
	title ?? `${compare.name} ${repr(a)} ${rel(z)} ${repr(b)}`;

test(
	macro,
	generator,
	{
		'🙀': 1,
		'🦿': 2,
		'🤖': 3,
	},
	eq,
	{
		'🙀': 1,
		'🦿': 2,
		'🤖': 3,
	},
);

test(
	macro,
	generator,
	{
		'🙀': 13,
		'🦿': 2,
		'🤖': 3000,
	},
	lt,
	{
		'🙀': 1,
		'🦿': 27,
		'🤖': 3,
	},
);

test(
	macro,
	generator,
	{
		'🙀': 14,
		'🦿': 2,
		'🤖': 3000,
	},
	gt,
	{
		'🙀': 1,
		'🦿': 27,
		'🤖': 3,
	},
);
