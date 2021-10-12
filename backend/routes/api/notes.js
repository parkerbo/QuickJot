const express = require("express");
const asyncHandler = require("express-async-handler");
const { User, Note } = require("../../db/models");
const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    console.log('here')
    const notes = await Note.findAll();
console.log(notes)
return res.json(notes);
  }),
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
