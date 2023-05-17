import * as Seeder from "../../../Databases/Seeder"
import Status from "@/Utils/Status";

/**
 * requêtes des clubs sur l'api 
 */
export default async function handler(req, res) {
  const { method, body, query } = req;
  switch (method) {
    case "GET":
        return await Seeder.Seeder({ body:"", res });
    default:
      return res.status(405).end();
  }
}
