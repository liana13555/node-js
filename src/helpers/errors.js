/* В Node.js есть встроенная ошибка 'new Error' - класс, к-рый принимает в параметр message.
Для API кастомизируем эту ошибку, дополним ее для большей информативности.
Поэтому нам нужно унаследоваться от него и запишем собственный класс для ошибок.
*/

class Nodejs33Error extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
};

class ValidationError extends Nodejs33Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
};

class WrongParametersError extends Nodejs33Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
};

class NotAuthorizedError extends Nodejs33Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
};

module.exports = {
  Nodejs33Error,
  ValidationError,
  WrongParametersError,
  NotAuthorizedError,
};
