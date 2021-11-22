const express = require('express');
// const createError = require('http-errors');
const { NotFound } = require('http-errors');
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string().required()
});

const router = express.Router()

const contactsOperations = require("../../model/contacts");

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts
      }
    });
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   status: "error",
    //   code: 500,
    //   message: "Server error"
    // })
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.getContactById(id);
    if (!result) {
      throw new NotFound(`Contact with id=${id} not found!`);

      // throw createError(404, `Contact with id=${id} not found!`);

      // const error = new Error(`Contact with id=${id} not found!`);
      // error.status = 404;
      // throw error;

      // res.status(404).json({
      //   status: "error",
      //   code: 404,
      //   message: `Contact with id=${id} not found!`
      // });
      // return;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw new NotFound("missing required name field");
    }
    const result = contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { id } = req.params;
    const result = await contactsOperations.updateContactById(id, req.body);
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error);
  }
  res.json({ message: 'template message' })
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
    if (!result) {
      throw new NotFound(`Contact with id=${id} not found!`);
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
});


module.exports = router
