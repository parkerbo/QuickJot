const express = require("express");
const asyncHandler = require("express-async-handler");
const { Notebook, Note } = require("../../db/models");
const router = express.Router();

router.get(
	"/:userId",
	asyncHandler(async (req, res) => {
		const userId = req.params.userId;
		const notebooks = await Notebook.findAll({
			where: {
				userId: userId,
			},
			order: [["createdAt", "ASC"]],
		});
		return res.json(notebooks);
	})
);

router.get(
	"/:notebookId/notes/:userId",
	asyncHandler(async (req, res) => {
		const notebookId = req.params.notebookId;
        const userId = req.params.userId;
		const notes = await Note.findAll({
			where: {
				notebookId: notebookId,
                userId: userId

			},
			order: [["updatedAt", "DESC"]],
		});
		return res.json(notes);
	})
);

module.exports = router;
