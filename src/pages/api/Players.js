import * as PlayersController from "../../../Databases/Controllers/PlayersController"
import Status from "@/Utils/Status";

/**
 * Requêtes des joueurs sur l'api 
 */
export default async function handler(req, res) {
  const { method, body, query } = req;
  switch (method) {
    case "GET":
      if (query.id) {
        return await PlayersController.getPlayersById({ id: query.id, res });
      } else {
        return await PlayersController.getPlayers({ res });
      }
    case "POST":
      return await PlayersController.postPlayers({ body, res });
    case "PUT":
      if (!query.id) {
        return Status.NotFound({ result: "Missing id in query string", res });
      }
      return await PlayersController.putPlayersById({ id: query.id, body, res });
    case "DELETE":
      if (!query.id) {
        return Status.NotFound({ result: "Missing id in query string", res });
      }
      return await PlayersController.deletePlayersById({ id: query.id, res });
    default:
      return res.status(405).end();
  }
}
