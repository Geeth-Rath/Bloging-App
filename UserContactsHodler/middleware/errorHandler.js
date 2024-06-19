const { contants } = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case contants.VALIDATION_ERROR:
      res.json({
        title: "Validation error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case contants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case contants.FORBIDEN:
      res.json({
        title: "Fobbiden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case contants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
      case contants.SERVER_ERROR:
        res.json({
          title: "Internal server error",
          message: err.message,
          stackTrace: err.stack,
        });
        break;

    default:
      console.log("No error");
  }
};

module.exports = errorHandler;
