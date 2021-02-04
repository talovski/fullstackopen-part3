const { request, response } = require("express")
const express = require("express")
const morgan = require("morgan")
const app = express()
app.use(express.json())

morgan.token("logpost", (response, request) => {
    if (request.method === "POST") {
        return (console.log("Posted:", request.body))
    } return null
})

app.use(morgan("logpost"))

let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "89969021993",
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "89153482499",
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "89929921933",
    },
    {
      id: 4,
      name: "Mary Poppendieck",
      number: "99-22-44-218"
    }
  ]
  
app.get("/", (request, response) => {
    response.send("Hello world")
})
app.get("/api/persons", (request, response) => {
    response.json(persons)
})
app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})
app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.json(persons)
    
    response.status(204).end()
})

app.get("/api/info", (request, response) => {
    const time = new Date()
    const length = persons.length
    const info = `Phonebook has info about ${length} people, ${time}`
    response.send(info)
})

app.post("/api/persons", (request, response) => {
    const randomId = () => (Math.random() * 99999).toFixed(0)
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: "please, enter a name"
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: "please, enter a number"
        })
    }

    const alreadyExists = persons.some(person => person.name === body.name)
    if (alreadyExists) {
        return response.status(400).json({
            error: "this person is already in the phonebook"
        })
    }

    const person = {
        id: Number(randomId()),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)