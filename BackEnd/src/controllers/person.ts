import { PrismaClient } from '@prisma/client'
import { trimAllFields } from './utils';

const prisma = new PrismaClient()

//GET ALL PERSONS
export const getAllPersons = async (req, res) => {
  try {
    const persons = await prisma.person.findMany({
      select: {
        id: true,
        username: true,
        created_at: true,
        status: true,
        cars: true,
      },
    });

    const formattedPersons = persons.map((person) => ({
      ...person,
      created_at: person.created_at.toISOString(),
    }));

    res.json(formattedPersons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//GET ALL CAR BY PERSON
export const getAllCarsByPerson = async (req, res) => {
  try {
    const trimmedParams = trimAllFields(req.params);
    const { username } = trimmedParams;

    const person = await prisma.person.findFirst({
      where: {
        username: {
          contains: username,
          mode: "insensitive"
        }
      },
      select: {
        cars: true,
      },
    });

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    res.json(person.cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// CHANGE USERNAME
export const changeUsername = async (req, res) => {
  try {
    const trimmedBody = trimAllFields(req.body);
    const trimmedParams = trimAllFields(req.params);
    const { username } = trimmedParams;
    const { newUsername } = trimmedBody;


    // Controllo dei dati in input
    if (!newUsername || newUsername.trim() === '') {
      return res.status(400).json({ message: "New username is missing or empty" });
    }

    const person = await prisma.person.findFirst({
      where: {
        username: username,
      },
    });

    if (!person) {
      return res.status(404).json({ message: "User not found" });
    }

    // Controlla se esiste già un'altra persona con il nuovo username
    const existingPerson = await prisma.person.findFirst({
      where: {
        username: newUsername,
      },
    });

    if (existingPerson) {
      return res.status(409).json({ message: "Username already in use" });
    }

    const updatedPerson = await prisma.person.update({
      where: {
        id: person.id,
      },
      data: {
        username: newUsername,
      },
    });

    res.json(updatedPerson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ADD PERSON
export const addPerson = async (req, res) => {
  try {
    const trimmedBody = trimAllFields(req.body);
    const { username, status, password, role } = trimmedBody;

    // Controllo dei dati in input
    if (!username || !status || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (status !== "poor" && status !== "rich") {
      return res
        .status(400)
        .json({ message: "Lo status deve essere 'poor' o 'rich'" });
    }

    // if (role !== "ADMIN" && role !== "USER") {
    //   return res
    //     .status(400)
    //     .json({ message: "Il ruolo deve essere 'ADMIN' o 'USER'" });
    // }

    // Check if the person with the given username already exists
    const existingPerson = await prisma.person.findFirst({
      where: {
        username: username,
      },
    });

    if (existingPerson) {
      return res.status(409).json({ message: "Person already exists" });
    }

    const person = await prisma.person.create({
      data: {
        username: username,
        password: password, // aggiunto il campo password
        role: "USER", // aggiunto il campo role
        status: status,
      },
    });

    res.json(person);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const searchPersons = async (req, res) => {
  try {
    const searchTerm = req.query.term;

    const persons = await prisma.person.findMany({
      where: {
        username: {
          contains: searchTerm,
        },
      },
      select: {
        id: true,
        username: true,
        created_at: true,
        status: true,
        cars: true,
      },
    });

    const formattedPersons = persons.map((person) => ({
      person,
      created_at: person.created_at.toISOString(),
    }));

    res.json(formattedPersons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
