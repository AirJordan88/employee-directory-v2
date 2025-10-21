import { Router } from "express";
import employees from "#db/employees";

const router = Router();

/**
 * GET /employees
 * Sends the full list of employees
 */
router.get("/", (req, res) => {
  res.status(200).json(employees);
});

/**
 * POST /employees
 * Adds a new employee with the provided name in the request body
 * - 400 if name is missing/invalid
 * - 201 with the new employee if successful
 * - ID must be unique (use max+1 for simplicity)
 */
router.post("/", (req, res, next) => {
  try {
    const { name } = req.body ?? {};
    if (typeof name !== "string" || name.trim() === "") {
      return res.status(400).send("A valid 'name' is required.");
    }

    const newId =
      employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;

    const newEmployee = { id: newId, name: name.trim() };
    employees.push(newEmployee);

    res.status(201).json(newEmployee);
  } catch (err) {
    next(err);
  }
});

/**
 * IMPORTANT: define /random BEFORE /:id so "random" isn't treated as an ID
 * GET /employees/random
 * Sends a random employee
 */
router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.status(200).json(employees[randomIndex]);
});

/**
 * GET /employees/:id
 * Sends the employee with the given id, or 404 if not found
 */
router.get("/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const employee = employees.find((e) => e.id === id);

  if (!employee) {
    return res.status(404).send(`Employee with id ${id} not found`);
  }

  res.status(200).json(employee);
});

export default router;
