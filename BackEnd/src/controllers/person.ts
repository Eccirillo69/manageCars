import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


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
    const { username } = req.params;

    const person = await prisma.person.findUnique({
      where: {
        username,
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
    const { username } = req.params;
    const { newUsername } = req.body;

    // Controllo dei dati in input
    if (!newUsername || newUsername.trim() === '') {
      return res.status(400).json({ message: "New username is missing or empty" });
    }

    const person = await prisma.person.findFirst({
      where: {
        username,
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
    const { username, status } = req.body;

    // Controllo dei dati in input
    if (!username || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (status !== "poor" && status !== "rich") {
      return res
        .status(400)
        .json({ message: "Lo status deve essere 'poor' o 'rich'" });
    }

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
        status: status,
      },
    });

    res.json(person);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};






