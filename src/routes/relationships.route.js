const router = require("express").Router();
const {
  getRelationships,
  addRelationships,
  deleteRelationships,
} = require("../controllers/relationships.controller");

const verifyAuth = require("../middlewares/verifyAuth");

router.get("/relations", verifyAuth, getRelationships);
router.post("/relations", verifyAuth, addRelationships);
router.delete("/relations/:userId", verifyAuth, deleteRelationships);

module.exports = router;
