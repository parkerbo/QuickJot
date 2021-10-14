"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Notebooks",
			[
				{
					title: "First Notebook",
					userId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: "Travel Plans",
					userId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: "First Notebook",
					userId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: "First Notebook",
					userId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
				return queryInterface.bulkDelete("Notebooks", null, {});
	},
};
