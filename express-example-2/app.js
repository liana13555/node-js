const express = require("express");

const products = require("./products");

const app = express();

// app.set("json spaces", 18);  
// Правильней исп-ть res.json() - из-за настроек в json и правильная работа с null


app.get("/products", (req, res) => {
    res.json(null);
    // res.send(null);
    // res.json({
    //     status: "success",
    //     code: 200,
    //     data: {
    //         result: products
    //     }
    // });
    res.json(products);
    // res.send(products);  // res.send() - предназначен больше для отправления разметки.
    // res.render("products", {name: "iPhone"} )  // для большой разметки, при исп-нии шаблонизаторов
});

app.listen(3001);