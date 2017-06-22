'use strict';

let	expect = require('chai').expect,
    Blakit = require('../blakit.js');

describe('blakit', function()
{
	let blakit;
	
	it("should be able to initialise", (done) => {
		blakit = Blakit({}, done);
	});

	it("should be able to save a variable", () => {
		blakit.set('var', 1);
	});

	it("should be able to retrieve a variable", () => {
		expect(blakit.get('var')).to.equal(1);
	});

	it("should be able to increment a variable", () => {
		expect(blakit.incr('var')).to.equal(2);
	});

	it("should be able to observe a variable", (done) => {
		blakit.on('var', (newValue, oldValue) => {
			expect(oldValue).to.equal(2);
			expect(newValue).to.equal(3);
			done();
		});
		blakit.incr('var');
	});
});