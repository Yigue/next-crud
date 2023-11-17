import { task } from "src/types.d";
import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const query = "SELECT * FROM tasks";

        const response = await conn.query(query);
        res.status(200).json(response.rows);
      } catch (error) {
        res.status(401).json({ error: "Error al obtener" });
        console.error(error);
      }

      break;
    case "POST":
      try {
        const { title, description } = req.body;
        const newTask = [title, description];

        const query =
          "INSERT INTO tasks(title,description)values ($1,$2) RETURNING *";

        const response = await conn.query(query, newTask);

        res.status(200).json({ fila: response.rows[0] });
      } catch (error) {
        res.status(401).json({ error: "Error de Creacion" });
        console.error(error);
      }

      break;

    default:
      res.status(400).json({ error: "metodo invalido" });

      break;
  }
}
