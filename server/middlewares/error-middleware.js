const ApiError = require("../exceptions/api-error");

module.exports = function (err, req, res, _) {
  console.log(err)
  if (err instanceof ApiError)
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });

  return res.status(500).json({ message: "Not found error..." });
};
