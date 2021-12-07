const bcrypt = require('bcryptjs');

const password = 'passwors';

// console.log(bcrypt.genSaltSync(10));   /* Соль - дополнительные случайные символы, которые будут добавлены к хэшу */

const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
/* хэшируем пароль, но при использовании хэш таблиц пароль все еще можно взломать, поэтому используют соль и передаем ее вторым аргументом */
// console.log(hashPassword);

/* Как сравнить строку-пароль с хэшированной строкой */
const result1 = bcrypt.compareSync(password, hashPassword)  // возвращает true или false
console.log(result1);

const result2 = bcrypt.compareSync('passwort', hashPassword);
console.log(result2);


