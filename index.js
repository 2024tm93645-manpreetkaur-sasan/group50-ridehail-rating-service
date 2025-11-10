require("dotenv").config();
const express = require("express");
const app = express();

let ratingRoutes;
try {
  ratingRoutes = require("./src/routes/ratingRoutes");
} catch (e1) {
  try {
    ratingRoutes = require("./routes/ratingRoutes");
  } catch (e2) {
    console.error("Missing ratingRoutes: create src/routes/ratingRoutes.js or routes/ratingRoutes.js (module.exports = router)");
    throw e2;
  }
}

const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/v1/ratings", ratingRoutes);
app.get("/", (req, res) => {
  res.send("Rating Service is running");
});

app.listen(port, () => {
  console.log(`Rating Service running on http://localhost:${port}`);
});
