"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Notes",
			[
				{
					title: "The Butterfly Effect",
					content:
						"This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test ",
					userId: 1,
					notebookId: 1,
				},
				{
					title: "Ways to pretend you know what you're doing",
					content: "GL lol",
					userId: 1,
					notebookId: 1,
				},
				{
					title: "This is a TEST",
					content: "This is the third note in the database",
					userId: 1,
					notebookId: 1,
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			"Notes",
			{
				username: { [Op.in]: ["DemoDillon", "FakeUser1", "FakeUser2"] },
			},
			{}
		);
	},
};
