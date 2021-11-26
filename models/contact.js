const { Schema, model } = require("mongoose");
const Joi = require("joi");

const codeRegexp = /^[0-9]{9}$/;

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
        // minLength: 2,
        // maxLength: 50
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    // price: {
    //     type: Number,
    //     required: [true, 'price must be exist'],  // аналог message
    //     min: 0.01,
    // },
    // active: {
    //     type: Boolean,
    //     default: true,
    // },
    // status: {
    //     type: String,
    //     enum: ["basic", "sale", "stock"],  // enum - один из вариантов
    //     default: "basic",
    // },
    // code: {
    //     type: String,
    //     required: true,
    //     unique: true,  // работает только с настроенными индексами
    //     match: codeRegexp,  //  В Mongoose регулярные выражения(шаблон строки) с помощью проверки match
    // },
}, { versionKey: false, timestamps: true });  // Убирают версию и позволяет добавить 2 настройки: когда был создан и когда последний раз изменился

const joiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
    // price: Joi.number().min(0.01).required(),
    // active: Joi.bool(),
    // status: Joi.string().valid("basic", "sale", "stock"),
    // code: Joi.string().pattern(codeRegexp),
})

const statusJoiSchema = Joi.object({
    favorite: Joi.boolean().required()
})

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    joiSchema,
    statusJoiSchema
};
