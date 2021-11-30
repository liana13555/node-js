const { ValidationError, WrongParametersError } = require('./errors');

const asyncWrapper = (controller) => { // для обработки ошибок всех контроллеров, чтобы не писать try catch
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

/* В 'catch' отлавливаем ошибку клиента, передаем ее в 'next' и переходим в 'errorHandler' */

const errorHandler = (error, req, res, next) => {  // Здесь обрабатываем ошибки
  if (
    error instanceof ValidationError ||
    error instanceof WrongParametersError
  ) {
    return res.status(error.status).json({ message: error.message })
  }
  res.status(500).json({ message: error.message });
};

module.exports = {
  asyncWrapper,
  errorHandler
};
