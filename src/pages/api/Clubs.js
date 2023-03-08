import * as ClubsController from "../../../Databases/Controllers/ClubsController"
import Status from "@/Utils/Status";

/**
 * requêtes des clubs sur l'api 
 */
export default async function handler(req, res) {
  const { method, body, query } = req;
  switch (method) {
    case "GET":
      if (query.id) {
        return await ClubsController.getClubsById({ id: query.id, res });
      } else {
        return await ClubsController.getClubs({ res });
      }
    case "POST":
      return await ClubsController.postClubs({ body, res });
    case "PUT":
      if (!query.id) {
        return Status.NotFound({ result: "Missing id in query string", res });
      }
      return await ClubsController.putClubsById({ id: query.id, body, res });
    case "DELETE":
      if (!query.id) {
        return Status.NotFound({ result: "Missing id in query string", res });
      }
      return await ClubsController.deleteClubsById({ id: query.id, res });
    default:
      return res.status(405).end();
  }
}
