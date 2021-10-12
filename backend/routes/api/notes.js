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

router.get(
	"/:id",
	asyncHandler(async function (req, res) {
		const note = await Note.findByPk(req.params.id);
		return res.json(note);
	})
);


module.exports = router;
