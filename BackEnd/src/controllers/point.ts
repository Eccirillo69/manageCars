import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createPoint = async (req, res) => {
  const { lat, lng, userId } = req.body;

  try {
    const point = await prisma.point.create({
      data: {
        latitude: lat,
        longitude: lng,
        person_id: userId
      },
    });

    res.json(point);
  } catch (error) {
    console.error(error); // Questa linea stamperà l'errore nel terminale/console
    res.status(400).json({ error: 'There was an error creating the point.' });
  }
};

export const deletePoint = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.point.delete({
      where: {
        id: Number(id)
      }
    });

    res.json({ message: 'Point deleted successfully' });
  } catch (error) {
    console.error(error); // Stampa l'errore effettivo
    res.status(400).json({ error: 'There was an error deleting the point.' });
  }
};

export const getAllPoints = async (req, res) => {
  try {
    const allPoints = await prisma.point.findMany({
      include: {
        person: true, // include the user object
      },
    });
    res.json(allPoints);
  } catch (error) {
    res.status(400).json({ error: 'There was an error retrieving the points.' });
  }
};

