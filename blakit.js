'use strict';

const EventEmitter = require('events');

module.exports = (opt, cb) => {
	const storage = {};
	const log = [];
	const self = new EventEmitter();
	
	cb();

	self.get = (variable) => {
		return storage[variable];
	};

	self.set = (variable, newValue) => {
		let currentValue = self.get(variable);
		if (currentValue !== newValue) {
			let timestamp = Date.now();
			storage[variable] = newValue;
			log.push([timestamp, variable, newValue]);
			if (self.listenerCount(variable)) self.emit(variable, newValue, currentValue, timestamp);
		}
	};

	self.incr = (variable, increment) => {
		let currentValue = self.get(variable);
		if (typeof currentValue != 'number') currentValue = 0;
		if (typeof increment == 'undefined') increment = 1;
		let newValue = currentValue + increment;
		self.set(variable, newValue);
		return newValue;
	};

	return self;
}