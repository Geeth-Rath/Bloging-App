const express = require("express");
const { getAllUser, getById , createUser, loginUser, currentUser, updateById, deleteById} = require("../controller/userController");
const router = express.Router();

router.route("/").get(getAllUser);
router.route("/register").post(createUser);
router.route("/login").post(loginUser)
router.route("/current").get(currentUser)
router.route("/:id").get(getById).put(updateById).delete(deleteById);

module.exports = router;