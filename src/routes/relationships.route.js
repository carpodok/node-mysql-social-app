const router = require("express").Router();
const {
  getRelationships,
  addRelationships,
  deleteRelationships,
} = require("../controllers/relationships.controller");

const verifyAuth = require("../middlewares/verifyAuth");
const {
  getRelationshipsValidator,
  addRelationshipsValidator,
  deleteRelationshipsValidator,
} = require("../middlewares/validators/relationsships.validator");

router.get("/", getRelationshipsValidator, verifyAuth, getRelationships);
router.post("/", addRelationshipsValidator, verifyAuth, addRelationships);
router.delete(
  "/:userId",
  deleteRelationshipsValidator,
  verifyAuth,
  deleteRelationships
);

module.exports = router;
