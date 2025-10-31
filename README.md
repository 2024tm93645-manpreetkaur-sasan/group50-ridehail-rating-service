# group50-ridehail-rating-service
Service to manage and streamline real-time ridehail driver and passenger ratings.

## Steps

- Run locally:
  - node index.js
- With Docker Compose:
  - docker-compose up --build

## Environment

- PORT (default 3001)

## Database schema

Ratings table  
Columns are: rating_id, trip_id, rater_id, ratee_id, rating, comments, created_at

Trips table  
Columns are: trip_id, rider_id, driver_id, pickup_zone, drop_zone, status, requested_at, distance_km, base_fare, surge_multiplier, total_fare

Drivers_snapshot table  
driver_id, name, phone, vehicle_type, vehicle_plate, is_active

## Ratings API

Base: http://localhost:3000/v1/ratings

- GET /v1/ratings

  - Description: List ratings (returns empty array if none)
  - Response: 200 { "data": [ ... ] }

- GET /v1/ratings/:trip_id

  - Description: Get rating for a trip
  - Response:
    - 200 { "data": {...} } if found
    - 404 { "error": "Rating not found" } if missing

- POST /v1/ratings

  - Description: Create a rating
  - Required JSON body:
    {
      "trip_id": 123,
      "rater_id": 1000,
      "ratee_id": 2000,
      "rating": 4,
      "comments": "driver was polite" // optional
    }
  - Responses:
    - 201 { "message": "Rating created successfully", "data": {...} }
    - 400 { "error": "trip_id, rater_id, ratee_id, and rating are required" }
    - 409 { "error": "Rating already exists for trip" } (if duplicate)

- GET /v1/ratings/driver/:driver_id

  - Description: Get all ratings received by a driver
  - Response:
    - 200 { "data": [ ... ] }
    - 400 { "error": "Invalid driver ID" } if id invalid

- GET /v1/ratings/rider/:rider_id

  - Description: Get all ratings received by a rider
  - Response:
    - 200 { "data": [ ... ] }
    - 400 { "error": "Invalid rider ID" } if id invalid

- GET /v1/ratings/driver/:driver_id/average

  - Description: Get average rating for a driver
  - Response:
    - 200 { "data": { "averageRating": 4.5 } }
    - 400 { "error": "Invalid driver ID" } if id invalid

- GET /v1/ratings/rider/:rider_id/average

  - Description: Get average rating for a rider
  - Response:
    - 200 { "data": { "averageRating": 4.2 } }
    - 400 { "error": "Invalid rider ID" } if id invalid
