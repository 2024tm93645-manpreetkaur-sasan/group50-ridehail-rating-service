const e = require("express");
const ratingModel = require("../model/ratingModel");

exports.createRating = async (trip_id, rater_id, ratee_id, rating, comments) => {
  if (
    !trip_id ||
    !rater_id ||
    !ratee_id ||
    rating === undefined ||
    rating === null
  ) {
    const err = new Error(
      "trip_id, rater_id, ratee_id, and rating are required"
    );
    err.status = 400;
    throw err;
  }
  return ratingModel.createRating(
    trip_id,
    rater_id,
    ratee_id,
    rating,
    comments
  );
};

exports.getRatingByTripID = async (tripId) => {
  if (!tripId || Number.isNaN(Number(tripId))) {
    const err = new Error("Rating not found");
    err.status = 404;
    throw err;
  }
  const rating = await ratingModel.getRatingByTripID(tripId);
  if (! rating) {
    const err = new Error("Rating not found");
    err.status = 404;
    throw err;
  }
  return rating;
};

exports.getRatingsForDriver = async (driverId) => {
  if (!driverId || Number.isNaN(Number(driverId))) {
    const err = new Error("Invalid driver ID");
    err.status = 400;
    throw err;
  }
  return ratingModel.getRatingsForDriver(driverId);
};

exports.getRatingsForRider = async (riderId) => {
  if (!riderId || Number.isNaN(Number(riderId))) {
    const err = new Error("Invalid rider ID");
    err.status = 400;
    throw err;
  }
  return ratingModel.getRatingsForRider(riderId);
};          


exports.getAverageRatingForDriver = async (driverId) => {
  if (!driverId || Number.isNaN(Number(driverId))) {
    const err = new Error("Invalid driver ID");
    err.status = 400;
    throw err;
  }
 return ratingModel.getAverageRatingForDriver(driverId);
};

exports.getAverageRatingForRider = async (riderId) => {
  if (!riderId || Number.isNaN(Number(riderId))) {
    const err = new Error("Invalid rider ID");
    err.status = 400;
    throw err;
  }
  return ratingModel.getAverageRatingForRider(riderId);
};