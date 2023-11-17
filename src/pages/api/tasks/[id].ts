import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id } = req.query;


  switch (method) {
    case "GET":
      try {
        const query = "SELECT * FROM tasks WHERE id=$1";
        const values = [id];

        const response = await conn.query(query, values);
        res.status(200).json(response.rows);
      } catch (error) {
        res.status(401).json({ error: "Error al obtener" });
        console.error(error);
      }

      break;
    case "DELETE":
      try {
        const query = "DELETE FROM tasks WHERE id=$1 RETURNING * ";
        const values = [id];

        const response = await conn.query(query, values);
        if (response.rowCount == 0)
          res.status(401).json({ error: "La tarea ya esta Eliminada" });

        res.status(200).json({ error: "Tarea Elimindada exitosamente" });
      } catch (error) {
        res.status(401).json({ error: "Error al Borrar" });
        console.error(error);
      }

      break;
    case "PUT":
      try {
        const query =
          "UPDATE  tasks SET title=$2 ,description=$3  WHERE id=$1 RETURNING *   ";
        const { title, description } = req.body;
        const values = [id, title, description];
        const response = await conn.query(query, values);

        res.status(200).json(response.rows[0]);
      } catch (error) {
        res.status(401).json({ error: "Error al Actualizar" });
        console.error(error);
      }

      break;

    default:
      res.status(400).json({ error: "metodo invalido" });

      break;
  }
  res.status(200).json({ id: id });
}
