const express = require("express");
const asyncHandler = require("express-async-handler");
const { User, Note } = require("../../db/models");
const router = express.Router();


router.get('/:userId', asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const notes = await Note.findAll({
        where: {
            userId: userId
        },
        order: [['updatedAt', 'DESC']]
    });
return res.json(notes);
  }),
);

router.delete(
	"/:id",
	asyncHandler(async (req, res) => {
		const note = await Note.findByPk(req.params.id);
        await note.destroy();
		return res.json(note);
	})
);

router.post(
	"/",
	asyncHandler(async function (req, res) {
        const {title, content, userId, notebookId} = req.body;
		const newNote = await Note.create({
            title: title,
            content: content,
            userId: userId,
            notebookId: notebookId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
		return res.json(newNote);
	})
);
router.get(
	"/:id",
	asyncHandler(async function (req, res) {
		const note = await Note.findByPk(req.params.id);
		return res.json(note);
	})
);
router.put(
	"/:id",
	asyncHandler(async function (req, res) {
        const note = await Note.findByPk(req.params.id);
        const {title, content} = req.body;
        const newNote = await note.update({
            title: title,
            content: content
        });
		return res.json(newNote);
	})
);

module.exports = router;
