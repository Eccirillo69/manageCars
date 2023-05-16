import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client";
import { trimAllFields } from "./utils";

const prisma = new PrismaClient();

// Controller di login
export const login = async (req, res) => {
  try {
    const trimmedbody = trimAllFields(req.body);
    const { username, password } = trimmedbody;

    if (!username || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const person = await prisma.person.findFirst({
      where: {
        username: username,
      },
    });

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    const isPasswordValid = password === person.password;

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create JWT payload
    const payload = {
      id: person.id,
      username: person.username,
      status: person.status,
      role: person.role, // Include the role in the JWT payload
    };

    // Sign the payload and create a JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    res.status(200).json({
      message: "Login successful",
      token: token, // Include the JWT token in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};