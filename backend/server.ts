import express from "express";
import cors from "cors";
import weatherRoute from "./routes/weatherRoute.js";
import patientRoute from "./routes/patientRoute.js";

// We will create an express app
const app = express();

// The port that the express server will listen on
const PORT = 3000;

app.use(express.json());
app.use(cors());
// We define our first route
app.use("/api/weather", weatherRoute);
app.use("/api/patient", patientRoute);

// Start the express server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
