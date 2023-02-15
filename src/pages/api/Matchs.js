import * as MatchsController from "../../../Databases/Controllers/MatchsController"
import Status from "@/Utils/Status";

/**
 * requêtes des matchs sur l'api 
 */
export default async function handler(req, res) {
  const { method, body, query } = req;
  switch (method) {
    case "GET":
      if (query.id) {
        return await MatchsController.getMatchsById({ id: query.id, res });
      } else {
        return await MatchsController.getMatchs({ res });
      }
    case "POST":
      return await MatchsController.postMatchs({ body, res });
    case "PUT":
      if (!query.id) {
        return Status.NotFound({ result: "Missing id in query string", res });
      }
      return await MatchsController.putMatchsById({ id: query.id, body, res });
    case "DELETE":
      if (!query.id) {
        return Status.NotFound({ result: "Missing id in query string", res });
      }
      return await MatchsController.deleteMatchsById({ id: query.id, res });
    default:
      return res.status(405).end();
  }
}
