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
tap.assert.equal(mod.money(-100), '$-100.00', 'Should be equal.');
tap.assert.equal(mod.money('asdf') instanceof Error, true, 'Should create an error when not a valid number.');

tap.assert.equal(mod.money('1', false, '£'), '£1.00', 'Should be equal.');

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
tap.assert.equal(mod.or(['one', 'two']), 'one or two', 'Should not use comma when two items for or.');
tap.assert.equal(mod.and(['one', 'two', 'three']), 'one, two, and three', 'Should comma separate by comma and last one should separate with oxford comma and.');
tap.assert.equal(mod.and(['one', 'two']), 'one and two', 'Should not use comma when two items for and.');

input = '|||one||two|three|';
// start: starts the chain
// trim: removes outside bars = one||two|three
// intrim: replaces inside bars = one</li><li>two</li><li>three
// untrim: add to front and back = <li>one</li><li>two</li><li>three</li>
// end: ends the chain
output = mod.start(input).trim('|').intrim('|', '</li><li>').untrim('<li>', '</li>').end();
tap.assert.equal(output, '<li>one</li><li>two</li><li>three</li>', 'Should chain parse string.');

tap.assert.equal(mod.number('1000'), '1,000.00', 'Should format number.');
tap.assert.equal(mod.number('1000', true), '1,000', 'Should return a whole number.');
tap.assert.equal(mod.number('-100'), '-100.00', 'Should handle negative numbers properly.');
tap.assert.equal(mod.number('-1000'), '-1,000.00', 'Should handle negative numbers properly.');


tap.assert.equal(mod.camelCase('one two three'), 'OneTwoThree', 'Should join and uppercase first letters.');
tap.assert.equal(mod.camelCase('one two three', false), 'oneTwoThree', 'Should join and uppercase first letters except for first word.');
tap.assert.equal(mod.camelCase('one_two_three'), 'OneTwoThree', 'Should join and uppercase first letters except for first word.');
tap.assert.equal(mod.camelCase('one_two_three', false), 'oneTwoThree', 'Should join and uppercase first letters except for first word.');
tap.assert.equal(mod.title('one two three'), 'One Two Three', 'Should uppercase first letters.');
tap.assert.equal(mod.underscore('one two three'), 'one_two_three', 'Should add underscores.');
tap.assert.equal(mod.underscore('one-two-three'), 'one_two_three', 'Should add underscores.');
tap.assert.equal(mod.start('one two three').title().underscore().end(), 'One_Two_Three', 'Should chain parse string.');

tap.assert.equal(mod.dash('one two three'), 'one-two-three', 'Should join with a dash.');
tap.assert.equal(mod.dash('one_two_three'), 'one-two-three', 'Should replace the underscores with dashes.');
