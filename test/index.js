var path = require('path');
process.chdir(path.dirname(__filename));
var tap = require('agraddy.test.tap')(__filename);

var mod = require('../');

var input;
var output;

tap.assert.equal(mod.money('1'), '$1.00', 'Should be equal.');
tap.assert.equal(mod.money(1), '$1.00', 'Should be equal.');
tap.assert.equal(mod.money('1', true), '$1', 'Should be equal.');
tap.assert.equal(mod.money(1, true), '$1', 'Should be equal.');
tap.assert.equal(mod.money(1000), '$1,000.00', 'Should be equal.');
tap.assert.equal(mod.money('1,000'), '$1,000.00', 'Should be equal.');
tap.assert.equal(mod.money('$1,000'), '$1,000.00', 'Should be equal.');
tap.assert.equal(mod.money('asdf') instanceof Error, true, 'Should create an error when not a valid number.');

// uses mod.ltrim and mod.rtrim
tap.assert.equal(mod.trim('||asdf|', '|'), 'asdf', 'Should trim passed in character.');
tap.assert.equal(mod.trim('||asdf|', '|', '[', ']'), '[asdf]', 'Should trim passed in character.');
tap.assert.equal(mod.trim('||asdf|', '|', '', '!'), 'asdf!', 'Should trim passed in character.');
tap.assert.equal(mod.trim('||asdf|', '|', '**'), '**asdf**', 'Should trim passed in character.');
tap.assert.equal(mod.trim('asdf', '|', '**'), '**asdf**', 'Should trim passed in character.');

// uses mod.luntrim and mod.runtrim
tap.assert.equal(mod.untrim('asdf', '<p>', '</p>'), '<p>asdf</p>', 'Should add characters on either side.');

// equivalent to 'asdf||qwerty'.replace(/\|+/g, '<br>') - just easier to write
tap.assert.equal(mod.intrim('asdf||qwerty', '|'), 'asdfqwerty', 'Should replace characters.');
tap.assert.equal(mod.intrim('asdf||qwerty', '|', '<br>'), 'asdf<br>qwerty', 'Should replace characters.');

// alias for String.replace() - used for chaining
tap.assert.equal(mod.replace('abc', 'b', ''), 'ac', 'Should call String.replace().');

tap.assert.equal(mod.or(['one', 'two', 'three']), 'one, two, or three', 'Should comma separate by comma and last one should separate with oxford comma or.');
tap.assert.equal(mod.and(['one', 'two', 'three']), 'one, two, and three', 'Should comma separate by comma and last one should separate with oxford comma and.');

input = '|||one||two|three|';
output = mod.start(input).trim('|').intrim('|', '</li><li>').untrim('<li>', '</li>').end();
tap.assert.equal(output, '<li>one</li><li>two</li><li>three</li>', 'Should chain parse string.');





