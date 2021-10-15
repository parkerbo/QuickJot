"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Notes",
			[
				{
					title: "Trip to San Francisco",
					content: "",
					userId: 1,
					notebookId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: "Reminders",
					content:
						"1. Call mom 2. Take out trash 3. Set up new cell phone plan",
					userId: 1,
					notebookId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: "Apartment Needs",
					content:
						"Microwave coffee maker laundry and dish detergent soap towels paper towels shampoo stand futon/couch groceries night stand lamp dresser",
					userId: 1,
					notebookId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				}
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Notes", null, {});
	},
};
