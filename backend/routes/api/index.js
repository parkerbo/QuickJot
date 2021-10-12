const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const notesRouter = require("./notes.js")

router.use("/session", sessionRouter);
router.use("/notes", notesRouter)
router.use("/users", usersRouter);


module.exports = router;
