import { PrismaClient } from "@prisma/client";
import { trimAllFields } from "./utils";

const prisma = new PrismaClient();

// DELETE CAR
export const deleteCarByPlates = async (req, res) => {
  try {
    const trimmedParams = trimAllFields(req.params);
    const { plates } = trimmedParams;

    const upperPlates = plates.toUppercase();
    
    // Controllo dei dati in input
    if (!upperPlates) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const car = await prisma.car
      .findFirst({
        where: {
          plates: upperPlates,
        },
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      });

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    await prisma.car.delete({
      where: {
        id: car.id,
      },
    });

    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// CHANGE CAR BY PLATES
export const changeCarPlatesByPlates = async (req, res) => {
  try {
    const trimmedBody = trimAllFields(req.body);
    const trimmedParams = trimAllFields(req.params);
    const { plates } = trimmedParams;
    const { newPlates } = trimmedBody;

    const upperPlates = plates.toUpperCase();
    const upperNewPlates = newPlates.toUpperCase();
    
    
    // Controllo dei dati in input
    if (!upperPlates || !upperNewPlates) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Controllo per evitare che le nuove targhe siano uguali a quelle vecchie
    if (upperPlates === upperNewPlates) {
      return res.status(400).json({ message: "New plates cannot be the same as the current plates" });
    }

    const car = await prisma.car.findFirst({
      where: {
        plates: plates,
      },
    });

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

     // Controlla se esiste già un'altra persona con il nuovo username
     const existingCar = await prisma.car.findFirst({
      where: {
        plates: upperNewPlates,
      },
    });

    if (existingCar) {
      return res.status(409).json({ message: "PLATES already in use" });
    }

    const updatedCar = await prisma.car.update({
      where: {
        id: car.id,
      },
      data: {
        plates: upperNewPlates,
      },
    });

    res.json(updatedCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//ADD CAR
export const addCar = async (req, res) => {
  try {
    const trimmedBody = trimAllFields(req.body);
    const { model, plates, username } = trimmedBody;

    const upperPlates = plates.toUpperCase();

    // Controllo dei dati in input
    if (!model || !upperPlates || !username) {
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

    // Controllo se esiste già una macchina con le stesse targhe
    const existingCar = await prisma.car.findFirst({
      where: {
        plates: upperPlates,
      },
    });

    if (existingCar) {
      return res.status(409).json({ message: "A car with the same plates already exists" });
    }

    const car = await prisma.car.create({
      data: {
        model: model,
        plates: upperPlates,
        person: {
          connect: {
            id: person.id, // Usa l'id della persona trovata tramite lo username
          },
        },
      },
    });

    res.json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore Caricamento macchine" });
  }
};

