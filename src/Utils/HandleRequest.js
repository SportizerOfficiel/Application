/** @format */

const Status = require("./Status");
const HandleRequest =
  (fn) =>
  async ({ res, body = {}, id = "" }) => {
    try {
      const result = await fn({ body, id });
      return Status.Success({ result, res });
    } catch (error) {
      return Status.Error({ result: error.message, res });
    }
  };

module.exports = HandleRequest;
