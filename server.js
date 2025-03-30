const express = require("express");
const cors = require("cors");
const scanRoutes = require("./routes/scanRoutes");
const zapRoutes = require("./routes/zapRoutes");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/api", scanRoutes);
app.use("/api", zapRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
