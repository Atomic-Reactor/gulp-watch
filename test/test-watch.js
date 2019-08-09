/* global describe, it */

const {join} = require('path');
const watch = require('..');
require('should');

function fixtures(glob) {
	return join(__dirname, 'fixtures', glob);
}

describe('watch', () => {
	it('should throw on invalid glob argument', () => {
		(function () {
			watch();
		}).should.throw();

		(function () {
			watch(1);
		}).should.throw();

		(function () {
			watch({});
		}).should.throw();
	});

	it('should return passThrough stream', done => {
		const stream = watch(fixtures('*.js'));
		stream.on('data', obj => {
			obj.should.be.eql(1);
			stream.on('end', done);
			stream.close();
		});
		stream.write(1);
	});
});
