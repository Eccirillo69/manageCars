import { PrismaClient } from "@prisma/client";
import { trimAllFields } from "./utils";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

// Controller di registrazione
export const registration = async (req, res) => {
  try {
    const trimmedbody = trimAllFields(req.body);
    const { username, password, status } = trimmedbody;

    console.log('Received data:', trimmedbody);

    if (!username || !password || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newPerson = await prisma.person.create({
      data: {
        username: username,
        password: password,
        status: status,
        role: "USER", // Set the role to "USER" by default
      },
    });

    // Generate JWT token
    const payload = jwt.sign(
      {
        id: newPerson.id,
        username: newPerson.username,
        status: newPerson.status,
        role: "USER", // Include the role in the JWT payload
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );

    res.status(201).json({ newPerson, payload });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};