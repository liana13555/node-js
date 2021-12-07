const jwt = require("jsonwebtoken");

const SECRET_KEY = "25fdgmlksdb564dfs";

const payload = {
    id: '61a7dad544dce6922de568fe'
}

const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });   // expiresIn - время истечения токена
// console.log(token);

const decodeToken = jwt.decode(token)
// console.log(decodeToken);

try {
    // const result = jwt.verify(token, SECRET_KEY)
    // console.log(result);
    const result2 = jwt.verify(`${token}22`, SECRET_KEY)
} catch (error) {
    console.log(error.message);
}
