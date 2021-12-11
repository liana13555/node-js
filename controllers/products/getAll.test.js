const express = require("express");
const request = require("supertest");  // "supertest" используют для имитации запроса, обычно "supertest" импортируют под именем request

const getAll = require("./getAll");

const app = express();

app.get("/api/products", getAll);

describe("test getAll controller", () => {
    let server;
    beforeAll(() => server = app.listen(3001));  //   beforeAll() - функция, кот-я запускается до всех тестов
    afterAll(() => server.close());          //  afterAll() - после всех тестов

    test("getAll return products array", async () => {
        const response = await request(app).get("/api/products");  //  request(app).get("/api/products"); - в сервер 'app' направь get-запрос по этому: "/api/products" адресу
        // console.log(response.status);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        const [product] = response.body;
        expect(typeof product.id).toBe("string");
        expect(typeof product.name).toBe("string");
        expect(typeof product.price).toBe("number");
    });
})