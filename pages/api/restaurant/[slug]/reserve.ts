import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function hanlder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, day, time, numberOfPeople } = req.query as {
    slug: string;
    day: string;
    time: string;
    numberOfPeople: string;
  };

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
  });

  if (!restaurant) {
    return res.status(400).json({
      errorMessage: "Invalid data provided",
    });
  }

  if (
    new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
    new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.open_time}`)
  ) {
    return res.status(400).json({
      errorMessage: "Restaurant is not open at that time",
    });
  }
  return res.json({ slug, day, time, numberOfPeople });
}

// http://localhost:3000/api/restaurant/kamasutra-indian-restaurant-and-wine-bar-niagara/reserve?day=2023-01-01&time=20:00:00.000Z&partySize=4
