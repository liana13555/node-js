const asyncWrapper = (controller) => { // для обработки ошибок всех контроллеров, чтобы не писать try catch
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

module.exports = {
  asyncWrapper,
};
