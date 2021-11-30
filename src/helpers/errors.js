/* В Node.js есть встроенная ошибка 'new Error' - класс, к-рый принимает в параметр message.
Для API кастомизируем эту ошибку, дополним ее для большей информативности.
Поэтому нам нужно унаследоваться от него и запишем собственный класс для ошибок.
*/

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
};

class WrongParametersError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
};

module.exports = {
    ValidationError,
    WrongParametersError
}