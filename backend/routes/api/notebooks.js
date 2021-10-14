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
			order: [["createdAt", "DESC"]],
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
			include: Notebook
		});
		return res.json(notes);
	})
);
router.get(
	"/current/:notebookId",
	asyncHandler(async (req, res) => {
		const notebookId = req.params.notebookId;
		const currentNotebook = await Notebook.findByPk(notebookId);
		return res.json(currentNotebook);
	})
);

router.post(
	"/",
	asyncHandler(async function (req, res) {
		const { title, userId } = req.body;
		const newNotebook = await Notebook.create({
			title: title,
			userId: userId,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		return res.json(newNotebook);
	})
);

router.put(
	"/:id",
	asyncHandler(async function (req, res) {
		const notebook = await Notebook.findByPk(req.params.id);
		const { title } = req.body;
		const newNotebook = await notebook.update({
			title: title,
		});
		return res.json(newNotebook);
	})
);

module.exports = router;
