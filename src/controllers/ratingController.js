
const { successResponse, errorResponse } = require("../utils/response");
const logger = require("../utils/logger");
const ratingService = require("../services/ratingService");

exports.createRating = async (req, res) => {
  const { trip_id, rater_id, ratee_id, rating, comments } = req.body || {};
  try {
    const newRating = await ratingService.createRating(
      trip_id,
      rater_id,
      ratee_id,
      rating,
      comments
    );
    logger.logSuccess(`Created new rating with ID: ${newRating.id}`);
    successResponse(res, newRating, "Rating created successfully", 201);
  } catch (error) {
    logger.logError("Error creating rating", error);
    const status = error.status || 500;
    const message =
      status === 500 && process.env.NODE_ENV !== "development"
        ? "Internal server error"
        : error.message || "Error creating rating";
    errorResponse(res, message, status);
  }
};  

exports.getRatingByTripID = async (req, res) => {
  const tripId = parseInt(req.params.trip_id);
  try {
    const rating = await ratingService.getRatingByTripID(tripId);
    logger.logInfo(`Fetched rating for trip ID: ${tripId}`);
    successResponse(res, rating, "Rating fetched successfully");
  } catch (error) {
    logger.logError(`Error fetching rating for trip ID: ${tripId}`, error);
    if (error.message === "Rating not found") {
      errorResponse(res, "Rating not found", 404);
    } else {
      errorResponse(res, "Internal server error");
    }
  }
};

exports.getRatingsForDriver = async (req, res) => {
  const driverId = parseInt(req.params.driver_id);
  try {
    const ratings = await ratingService.getRatingsForDriver(driverId);
    logger.logInfo(`Fetched ratings for driver ID: ${driverId}`);
    successResponse(res, ratings, "Ratings fetched successfully");
  } catch (error) {
    logger.logError(`Error fetching ratings for driver ID: ${driverId}`, error);
    errorResponse(res, "Internal server error");
  }
};

exports.getRatingsForRider = async (req, res) => {
  const riderId = parseInt(req.params.rider_id);
  try {
    const ratings = await ratingService.getRatingsForRider(riderId);
    logger.logInfo(`Fetched ratings for rider ID: ${riderId}`);
    successResponse(res, ratings, "Ratings fetched successfully");
  } catch (error) {
    logger.logError(`Error fetching ratings for rider ID: ${riderId}`, error);
    errorResponse(res, "Internal server error");
  }
};

exports.getAverageRatingForDriver = async (req, res) => {
  const driverId = parseInt(req.params.driver_id);
  try {
    const averageRating = await ratingService.getAverageRatingForDriver(driverId);
    logger.logInfo(`Fetched average rating for driver ID: ${driverId}`);
    successResponse(res, { averageRating }, "Average rating fetched successfully");
  } catch (error) {
    logger.logError(`Error fetching average rating for driver ID: ${driverId}`, error);
    errorResponse(res, "Internal server error");
  }
};

exports.getAverageRatingForRider = async (req, res) => {
  const riderId = parseInt(req.params.rider_id);
  try {
    const averageRating = await ratingService.getAverageRatingForRider(riderId);
    logger.logInfo(`Fetched average rating for rider ID: ${riderId}`);
    successResponse(res, { averageRating }, "Average rating fetched successfully");
  } catch (error) {
    logger.logError(`Error fetching average rating for rider ID: ${riderId}`, error);
    errorResponse(res, "Internal server error");
  }
};