const express = require("express");
const apiRoutes = require("./src/routes/routes");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3005;

app.use(
    bodyParser.json()
);

app.use("/api/v1", apiRoutes);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
