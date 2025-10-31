const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");

router.post("/", ratingController.createRating);
router.get("/:trip_id", ratingController.getRatingByTripID);
router.get("/driver/:driver_id", ratingController.getRatingsForDriver);
router.get("/rider/:rider_id", ratingController.getRatingsForRider);
router.get("/driver/:driver_id/average", ratingController.getAverageRatingForDriver);
router.get("/rider/:rider_id/average", ratingController.getAverageRatingForRider);

module.exports = router;