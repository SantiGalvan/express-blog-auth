const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts.js");
const deleteError = require("../middlewares/deleteError.js");
const auth = require("../middlewares/auth.js");

const multer = require("multer");
const uploader = multer({ dest: "public/imgs/posts" });

router.use(express.urlencoded({ extended: true }));

router.get("/", postsController.index);
router.post("/", auth.authenticate, uploader.single("image"), postsController.store);
router.get("/create", postsController.create);
router.delete("/:slug", auth.authenticate, auth.authenticateAdmin, deleteError, postsController.destroy);
router.get("/:slug", postsController.show);
router.get("/:slug/download", postsController.download);

module.exports = router;