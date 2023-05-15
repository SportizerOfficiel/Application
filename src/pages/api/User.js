import * as UsersController from "../../../Databases/Controllers/UserController";
import Status from "@/Utils/Status";

/**
 * requêtes des utilisateurs sur l'api 
 */
export default async function userHandler(req, res) {
  const { method, body, query } = req;
  switch (method) {
    case "GET":
      if (query.id) {
        return await UsersController.getUserById({ id: query.id, res });
      } else {
        return await UsersController.getUsers({ res });
      }
      case "POST":
        if (query.login) {
          return await UsersController.login({ body, res });
        } else {
    
          return await UsersController.postUser({ body, res });
        }
    case "PUT":
      if (!query.id) {
        return Status.NotFound({ result: "Missing id in query string", res });
      }
      return await UsersController.putUserById({ id: query.id, body, res });
    case "DELETE":
      if (!query.id) {
        return Status.NotFound({ result: "Missing id in query string", res });
      }
      return await UsersController.deleteUserById({ id: query.id, res });
    default:
      return res.status(405).end();
  }
}
