const express = require("express");
const app = express();
const cors = require("cors");

//middleware

app.use(cors());
app.use(express.json());

//routes

app.use("/authentication", require("./routes/jwtAuth"));

app.use("/shop", require("./routes/shop"));

app.use("/ad", require("./routes/ad"));

app.use("/dashboard", require("./routes/dashboard"));


app.listen(5001, () => {
  console.log(`Server is starting on port 5001`);
});
