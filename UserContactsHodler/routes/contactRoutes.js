const express = require("express");
const router = express.Router();
const {
  getAllContact,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controller/contactController");

router.route("/").get(getAllContact).post(create);
router.route("/:id").get(getById).put(updateById).delete(deleteById);

module.exports = router;
