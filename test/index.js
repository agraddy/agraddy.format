var path = require('path');
process.chdir(path.dirname(__filename));
var tap = require('agraddy.test.tap')(__filename);

var mod = require('../');

tap.assert.equal(mod.money('1'), '$1.00', 'Should be equal.');
tap.assert.equal(mod.money(1), '$1.00', 'Should be equal.');
tap.assert.equal(mod.money('1', true), '$1', 'Should be equal.');
tap.assert.equal(mod.money(1, true), '$1', 'Should be equal.');
tap.assert.equal(mod.money(1000), '$1,000.00', 'Should be equal.');
tap.assert.equal(mod.money('1,000'), '$1,000.00', 'Should be equal.');
tap.assert.equal(mod.money('$1,000'), '$1,000.00', 'Should be equal.');
tap.assert.equal(mod.money('asdf') instanceof Error, true, 'Should create an error when not a valid number.');
