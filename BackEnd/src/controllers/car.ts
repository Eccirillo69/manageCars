import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// DELETE CAR
export const deleteCarByPlates = async (req, res) => {
  try {
    const { plates } = req.params;
    //CIAO COMMENTO GIT

    // Controllo dei dati in input
    if (!plates) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const car = await prisma.car
      .findFirst({
        where: {
          plates: plates,
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
    const { plates } = req.params;
    const { newPlates } = req.body;

    // Controllo dei dati in input
    if (!plates || !newPlates) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Controllo per evitare che le nuove targhe siano uguali a quelle vecchie
    if (plates === newPlates) {
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

    const updatedCar = await prisma.car.update({
      where: {
        id: car.id,
      },
      data: {
        plates: newPlates,
      },
    });

    res.json(updatedCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const addCar = async (req, res) => {
  try {
    const { model, plates, username } = req.body;

    // Controllo dei dati in input
    if (!model || !plates || !username) {
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
        plates: plates,
      },
    });

    if (existingCar) {
      return res.status(409).json({ message: "A car with the same plates already exists" });
    }

    const car = await prisma.car.create({
      data: {
        model: model,
        plates: plates,
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
    res.status(400).json({ message: "Errore Caricamento macchine" });
  }
};

