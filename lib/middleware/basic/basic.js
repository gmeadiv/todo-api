'use strict';

const base64 = require('base-64');

const { Users } = require('../../model');

const Basic = async (req, res, next) => {
	if (!req.headers.authorization) {
		return new Error('User not authorized');
	}

	let basic = req.headers.authorization.split(' ').pop();
	let [user, password] = base64.decode(basic).split(':');
	try {
		req.user = await Users.authenticateBasic(user, password);
		next();
	} catch (e) {
		res.status(403).send('Invalid Login', e);
	}
};

module.exports = Basic;
