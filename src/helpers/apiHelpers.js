const asyncWrapper = (controller) => { // для обработки ошибок всех контроллеров
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

module.exports = {
  asyncWrapper,
};
