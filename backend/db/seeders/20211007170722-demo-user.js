"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Users",
			[
				{
					email: "demo@user.io",
					username: "DemoDillon",
					hashedPassword: bcrypt.hashSync("password"),
				},
				{
					email: faker.internet.email(),
					username: "FakeUser1",
					hashedPassword: bcrypt.hashSync(faker.internet.password()),
				},
				{
					email: faker.internet.email(),
					username: "FakeUser2",
					hashedPassword: bcrypt.hashSync(faker.internet.password()),
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			"Users",
			{
				username: { [Op.in]: ["DemoDillon", "FakeUser1", "FakeUser2"] },
			},
			{}
		);
	},
};
