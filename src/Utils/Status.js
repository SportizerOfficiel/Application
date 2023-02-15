/**
 * Les différents status de renvoie
 */
const Success = ({ result, statusCode = 200, res }) => {
  return res.status(statusCode).json(result);
};
const NotFound = ({ result = "Not Found", statusCode = 404,res }) => {
  return res.status(statusCode).json(result);
};
const Error = ({ result = "Error", statusCode = 500,res }) => {
  return res.status(statusCode).json(result);
};

module.exports = {
  Success,
  Error,
  NotFound,
};
