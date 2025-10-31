const e = require("express");
const pool = require("../config/db");

exports.createRating = async (trip_id, rater_id, ratee_id, rating, comments) => {
  const query =
    "INSERT INTO ratings (trip_id, rater_id, ratee_id, rating, comments) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const values = [trip_id, rater_id, ratee_id, rating, comments];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.getRatingByTripID = async (tripId) => {
  const query = "SELECT * FROM ratings WHERE trip_id = $1";
  const values = [tripId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.getRatingsForDriver = async (driverId) => {
  const query = "SELECT * FROM ratings WHERE ratee_id = $1";
  const values = [driverId];
  const result = await pool.query(query, values);
  return result.rows;
};

exports.getRatingsForRider = async (riderId) => {
  const query = "SELECT * FROM ratings WHERE ratee_id = $1";
  const values = [riderId];
  const result = await pool.query(query, values);
  return result.rows;
};

exports.getAverageRatingForDriver = async (driverId) => {
  const query =
    "SELECT AVG(rating) AS average_rating FROM ratings WHERE ratee_id = $1";
  const values = [driverId];
  const result = await pool.query(query, values);
  return result.rows[0].average_rating;
};

exports.getAverageRatingForRider = async (riderId) => {
  const query =
    "SELECT AVG(rating) AS average_rating FROM ratings WHERE ratee_id = $1";
  const values = [riderId];
  const result = await pool.query(query, values);
  return result.rows[0].average_rating;
};  