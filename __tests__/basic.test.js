'use strict';

const { expect } = require('@jest/globals');
const Basic = require('../lib/middleware/basic/basic');
const { db, Users } = require('../lib/model');

let userInfo = {
	admin: { username: 'admin', password: 'password' },
};

beforeAll(async () => {
	await db.sync();
});
afterAll(async () => {
	await db.drop();
});

describe('Testing Server CRUD', () => {
	// Mock the express req/res/next that we need for each middleware call
	const req = {};
	const res = {
		status: jest.fn(() => res),
		send: jest.fn(() => res),
	};
	const next = jest.fn();

	it('Fails to login with a (user) with incorrect credentials', async () => {
		req.headers = {
			authorization: 'Basic YWRtaW46Zm9v',
		};

		return Basic(req, res, next).then(() => {
			expect(next).not.toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(403);
		});
	});
});
