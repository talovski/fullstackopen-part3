const notesRouter = require('express').Router();
const Person = require('../models/person');

// Get all people
notesRouter.get('/', (request, response, next) => {
  Person.find({}).then((people) => {
    response.json(people.map((person) => person.toJSON()));
  });
});

// Find one person by id
notesRouter.get('/:id', (request, response, next) => {
  console.log('searching by id');
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Delete person by id
notesRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id).then((person) => {
    response.status(204).end();
  });
});

// Add person
notesRouter.post('/', (request, response) => {
  const { body } = request;
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((JSONedPerson) => {
      response.json(JSONedPerson);
    })
    .catch((error) => next(error));
});

// Update number of one person who is already in the phonebook
notesRouter.put('/:id', (request, response, next) => {
  const { body } = request;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson.toJSON());
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
