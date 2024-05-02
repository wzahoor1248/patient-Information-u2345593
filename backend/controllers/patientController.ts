import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { storeData } from "../helpers/helper.js";

/**
 * Create patient
 * @description Creates a patient
 * @param req the request object
 * @param res the response object
 */

export const createPatient = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error("Validation error", errors.mapped());
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const result = await storeData(body);
    res
      .status(200)
      .send({
        msg: "Patient created successfully",
        result: { ...result, ...body },
      });
  } catch (error) {
    // If there is an error, we will log it and send a 500 status code
    res.status(500).send("Error in fetching weather data");
  }
};
