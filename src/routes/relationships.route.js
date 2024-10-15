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

router.get(
  "/relations",
  getRelationshipsValidator,
  verifyAuth,
  getRelationships
);
router.post(
  "/relations",
  addRelationshipsValidator,
  verifyAuth,
  addRelationships
);
router.delete(
  "/relations/:userId",
  deleteRelationshipsValidator,
  verifyAuth,
  deleteRelationships
);

module.exports = router;
