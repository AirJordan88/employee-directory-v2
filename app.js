import express from "express";
import employeesRouter from "./routes/employees.js";

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Hello employees!");
});

// Mount all /employees routes on a separate router
app.use("/employees", employeesRouter);

// Catch-all error-handling middleware (must have 4 args)
app.use((err, req, res, next) => {
  // Optional: log for debugging
  // console.error(err);
  res.status(500).send("Internal Server Error");
});

export default app;
